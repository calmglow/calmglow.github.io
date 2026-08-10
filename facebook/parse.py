#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Facebook HTML export 파서

your_facebook_activity 아래의 게시물/앨범 HTML을 읽어
중간 표현(JSON)으로 추출한다. 출력만 담당하고 분류는 하지 않는다.
"""

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

EXPORT_ROOT = Path("/Users/calmglow/facebook_content")
POSTS_HTML = EXPORT_ROOT / "your_facebook_activity/posts/your_posts__check_ins__photos_and_videos_1.html"
ALBUM_DIR = EXPORT_ROOT / "your_facebook_activity/posts/album"

SECTION_RE = re.compile(r'<section class="_a6-g".*?</section>', re.S)

# "8월 05, 2015 11:23:43 오후"
DATE_RE = re.compile(
    r'(\d{1,2})월\s*(\d{1,2}),\s*(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})\s*(오전|오후)'
)

# 본문이 아닌 잡음 줄들
NOISE_RE = re.compile(r'에 업데이트됨$|^업로드 IP 주소$|^\d{1,3}(\.\d{1,3}){3}$')


def parse_date(text):
    """한국어 날짜 문자열을 (iso, date, time) 튜플로 변환."""
    m = DATE_RE.search(text)
    if not m:
        return None
    month, day, year, hour, minute, sec, ampm = m.groups()
    hour = int(hour)
    if ampm == "오후" and hour != 12:
        hour += 12
    elif ampm == "오전" and hour == 12:
        hour = 0
    return "%s-%02d-%02d %02d:%02d:%02d" % (
        year, int(month), int(day), hour, int(minute), int(sec)
    )


class SectionParser(HTMLParser):
    """section 블록 하나에서 제목/본문/이미지/날짜/링크를 뽑는다."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.h2 = []
        self.texts = []          # (depth_class, text)
        self.images = []
        self.links = []
        self.date_raw = []
        self._stack = []         # 열려 있는 태그의 class 목록
        self._mode = None
        self._table = 0          # 촬영일/EXIF/업로드 IP 는 전부 <table> 안에 있다

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = a.get("class", "")
        self._stack.append((tag, cls))

        if tag == "table":
            self._table += 1
        if tag == "h2":
            self._mode = "h2"
        elif tag == "div" and "_a72d" in cls:
            self._mode = "date"
        elif tag == "img":
            src = a.get("src")
            if src:
                self.images.append(src)
        elif tag == "a":
            href = a.get("href")
            # 페이스북 permalink(dyi/l/)는 본문 링크가 아니다
            if href and "facebook.com/dyi/l/" not in href:
                self.links.append(href)

    def handle_endtag(self, tag):
        if self._stack:
            self._stack.pop()
        if tag == "table":
            self._table = max(0, self._table - 1)
        if tag in ("h2", "div"):
            self._mode = None

    def handle_data(self, data):
        text = data.strip()
        if not text:
            return
        if self._table and self._mode != "date":
            return
        if self._mode == "h2":
            self.h2.append(text)
        elif self._mode == "date":
            self.date_raw.append(text)
        else:
            self.texts.append(text)


def in_caption_context(_):
    return True


def extract_section(raw):
    p = SectionParser()
    p.feed(raw)

    headline = " ".join(p.h2).strip()
    date_iso = parse_date(" ".join(p.date_raw))

    # 본문: 잡음 제거 후 남은 텍스트
    body_lines = []
    for t in p.texts:
        if NOISE_RE.search(t):
            continue
        if t == headline:
            continue
        body_lines.append(t)

    # 링크 URL이 본문에 그대로 중복 등장하는 경우가 잦다 → 그대로 두되 표시
    body = "\n".join(body_lines).strip()

    return {
        "headline": headline,
        "date": date_iso,
        "body": body,
        "images": p.images,
        "links": p.links,
        "length": len(body),
    }


def load(path, source):
    html = path.read_text(encoding="utf-8")
    # <style> 안의 내용이 section 정규식에 걸리지 않도록 먼저 제거
    html = re.sub(r"<style.*?</style>", "", html, flags=re.S)
    out = []
    for raw in SECTION_RE.findall(html):
        item = extract_section(raw)
        item["source"] = source
        item["source_file"] = str(path.relative_to(EXPORT_ROOT))
        out.append(item)
    return out


def main():
    items = load(POSTS_HTML, "post")
    print("posts: %d" % len(items), file=sys.stderr)

    for f in sorted(ALBUM_DIR.glob("*.html")):
        album = load(f, "album")
        print("album %s: %d" % (f.name, len(album)), file=sys.stderr)
        items.extend(album)

    items.sort(key=lambda x: x["date"] or "")

    out = Path(__file__).parent / "parsed.json"
    out.write_text(json.dumps(items, ensure_ascii=False, indent=1), encoding="utf-8")
    print("total: %d -> %s" % (len(items), out), file=sys.stderr)

    missing = [i for i in items if not i["date"]]
    if missing:
        print("WARNING: 날짜 없는 항목 %d건" % len(missing), file=sys.stderr)


if __name__ == "__main__":
    main()
