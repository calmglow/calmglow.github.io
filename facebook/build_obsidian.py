#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
parsed.json -> 옵시디안 월간 노트

대상: 본인이 쓴 글(상태 업데이트, 직장 이벤트)과 사진/캡션(게시물 사진 + 앨범).
링크 공유, 남의 게시물 공유, 릴스, 댓글은 제외한다.

기존 note/*.md 는 건드리지 않고 note/facebook/ 아래에만 생성한다.
"""

import json
import re
import shutil
from collections import defaultdict
from pathlib import Path

EXPORT_ROOT = Path("/Users/calmglow/facebook_content")
NOTE_ROOT = Path("/Users/calmglow/note")
OUT_DIR = NOTE_ROOT / "facebook"
RES_DIR = OUT_DIR / "_resources"

PARSED = Path(__file__).parent / "parsed.json"

OWN_TEXT = "최진호님이 상태를 업데이트했습니다."
PHOTO_RE = re.compile(r"새로운 사진 \d+장을 추가|사진을 공유했습니다|새 동영상 \d+개를 추가")
LIFE_EVENT_RE = re.compile(r"근무를 시작했습니다|퇴사|함께 있었습니다")

# 사진 게시물의 첫 줄에 앨범 이름이 붙는다
ALBUM_LABELS = {
    "사진", "휴대폰 업로드", "타임라인 사진", "프로필 사진", "커버 사진",
    "제목없는 사진첩", "iOS Photos", "모바일 업로드",
}


def dedupe_lines(body):
    """같은 문장이 두 번 실린 경우와 앨범 라벨 줄을 제거."""
    out = []
    seen = set()
    for line in body.split("\n"):
        line = line.strip()
        if not line:
            continue
        if not out and line in ALBUM_LABELS:
            continue
        if line in seen:
            continue
        seen.add(line)
        out.append(line)
    return "\n".join(out)


def classify(item):
    h = item["headline"]
    if item["source"] == "album":
        return "photo"
    if h == OWN_TEXT:
        return "own"
    if PHOTO_RE.search(h):
        return "photo"
    if LIFE_EVENT_RE.search(h):
        return "life"
    return None


def main():
    items = json.load(open(PARSED, encoding="utf-8"))

    kept = []
    for it in items:
        kind = classify(it)
        if not kind:
            continue
        it["kind"] = kind
        it["body"] = dedupe_lines(it["body"])
        kept.append(it)

    # 같은 사진이 게시물과 앨범 양쪽에 있다. 앨범 쪽 캡션이 깨끗하므로 앨범을 남기고
    # 게시물 캡션만 옮겨 붙인다. 업로드 시각과 게시 시각이 초 단위로 달라서
    # 날짜는 키로 쓸 수 없고 이미지 경로로만 짝을 찾는다.
    album_by_img = defaultdict(list)
    for it in kept:
        if it["source"] == "album":
            for s in it["images"]:
                album_by_img[s].append(it)

    drop = set()
    for it in kept:
        if it["source"] != "post" or not it["images"]:
            continue
        twins = [a for s in it["images"] for a in album_by_img.get(s, [])]
        if not twins:
            continue
        for a in twins:
            if it["body"] and it["body"] not in a["body"]:
                a["body"] = (a["body"] + "\n" + it["body"]).strip()
        drop.add(id(it))
    kept = [it for it in kept if id(it) not in drop]

    # 캡션이 앨범 쪽으로 넘어가면서 본문도 사진도 남지 않은 껍데기는 버린다
    kept = [it for it in kept
            if it["body"] or it["images"] or it["kind"] == "life"]

    # 이미지 복사
    RES_DIR.mkdir(parents=True, exist_ok=True)
    copied = {}
    for it in kept:
        names = []
        for src in it["images"]:
            srcp = EXPORT_ROOT / src
            if not srcp.exists():
                continue
            # 원본 파일명은 페이스북 미디어 ID뿐이라 검색도 정렬도 안 된다.
            # 출처와 날짜를 앞에 붙인다: fb.2016-03-24.<ID>.jpg
            name = "fb.%s.%s" % (it["date"][:10], srcp.name)
            dst = RES_DIR / name
            if name not in copied:
                shutil.copy2(srcp, dst)
                copied[name] = True
            names.append(name)
        it["image_names"] = names

    # 월별 그룹핑
    months = defaultdict(list)
    for it in kept:
        months[it["date"][:7]].append(it)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for ym, entries in sorted(months.items()):
        entries.sort(key=lambda x: x["date"], reverse=True)
        year, month = ym.split("-")
        lines = [
            "---",
            "created: %s-01T00:00:00+09:00" % ym,
            "tags: facebook journal",
            "title: facebook.%s.%s" % (year, month),
            "---",
            "",
            "# Facebook [[%s]].%s" % (year, month),
            "",
        ]
        for it in entries:
            d = it["date"]
            lines.append("%d월 %s일" % (int(month), d[8:10]))
            if it["kind"] == "life":
                lines.append("- (%s)" % it["headline"])
            for para in it["body"].split("\n"):
                if para.strip():
                    lines.append(para)
            for name in it["image_names"]:
                lines.append("![[./_resources/%s]]" % name)
            lines.append("")
        (OUT_DIR / ("%s.%s.md" % (year, month))).write_text(
            "\n".join(lines).rstrip() + "\n", encoding="utf-8"
        )

    stats = defaultdict(int)
    for it in kept:
        stats[it["kind"]] += 1
    print("항목: %d (own=%d, photo=%d, life=%d)" % (
        len(kept), stats["own"], stats["photo"], stats["life"]))
    print("월간 노트: %d개 -> %s" % (len(months), OUT_DIR))
    print("이미지: %d개 -> %s" % (len(copied), RES_DIR))

    # 블로그 후보: 본인이 쓴 긴 글
    cands = sorted(
        [i for i in kept if i["kind"] == "own"],
        key=lambda x: len(x["body"]), reverse=True,
    )
    out = Path(__file__).parent / "blog_candidates.json"
    out.write_text(json.dumps(cands, ensure_ascii=False, indent=1), encoding="utf-8")
    for t in (1000, 800, 600, 500, 400):
        print("  %d자 이상: %d건" % (t, sum(1 for c in cands if len(c["body"]) >= t)))


if __name__ == "__main__":
    main()
