#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
note/facebook/*.md 를 기존 note/YYYY.MM.md 저널에 날짜 순서대로 병합한다.

- 같은 날짜가 이미 있으면 그 날의 기존 내용 아래에 이어 붙인다
- 없는 날짜는 그 파일의 기존 정렬 방향(대개 내림차순)에 맞는 자리에 넣는다
- 각 페이스북 항목 끝에 #facebook 을 붙인다
- 이미지는 res/ 로 옮기고 링크를 ![[res/...]] 로 바꾼다

기본은 staging 모드다. --apply 를 줘야 실제 note 를 고친다.
"""

import argparse
import re
import shutil
import sys
from pathlib import Path

NOTE = Path("/Users/calmglow/note")
FB_DIR = NOTE / "facebook"
FB_RES = FB_DIR / "_resources"
RES = NOTE / "res"

# 줄 전체가 "3월 24일" 인 경우만 날짜 헤더로 본다.
# "3월22일에 밋업을 진행합니다" 같은 본문 줄이 헤더로 오인되면
# 문단 한가운데에 글이 끼어들기 때문에 느슨하게 잡지 않는다.
# 헤더 뒤에 본문이 붙어버린 예전 기록 24줄은 앵커로 쓰지 않고 넘어간다.
HEADER_RE = re.compile(r"^\s*(\d{1,2})월\s*(\d{1,2})일\s*$")
FB_HEADER_RE = re.compile(r"^(\d{1,2})월 (\d{2})일$")
EMBED_RE = re.compile(r"^!\[\[")

TAG = "#facebook"


def parse_fb(path):
    """페이스북 월간 노트를 [(일, [본문 줄])] 로 읽는다. 파일 내 순서를 유지한다."""
    lines = path.read_text(encoding="utf-8").split("\n")
    # frontmatter 와 머리말을 건너뛴다
    entries = []
    cur = None
    for line in lines:
        m = FB_HEADER_RE.match(line)
        if m:
            if cur:
                entries.append(cur)
            cur = (int(m.group(2)), [])
            continue
        if cur is None:
            continue
        if line.strip():
            cur[1].append(line)
    if cur:
        entries.append(cur)
    return entries


def to_res(line):
    return line.replace("![[./_resources/", "![[res/")


def tagged(body):
    """항목 끝에 #facebook 을 붙인다. 마지막 줄이 이미지면 다음 줄에 둔다."""
    out = [to_res(b) for b in body]
    if not out:
        return out
    if EMBED_RE.match(out[-1]):
        out.append(TAG)
    else:
        out[-1] = out[-1] + " " + TAG
    return out


def header_positions(lines):
    """[(줄번호, 일)] 목록."""
    return [(i, int(m.group(2)))
            for i, line in enumerate(lines)
            for m in [HEADER_RE.match(line)] if m]


def direction(days):
    """내림차순이면 -1, 오름차순이면 1. 판단이 안 서면 내림차순."""
    if len(days) < 2:
        return -1
    down = sum(1 for a, b in zip(days, days[1:]) if a >= b)
    up = sum(1 for a, b in zip(days, days[1:]) if a <= b)
    return 1 if up > down else -1


def block_end(lines, start, heads):
    """start 헤더가 차지하는 구간의 끝(다음 헤더 직전, 뒤쪽 빈 줄 제외)."""
    nxt = len(lines)
    for i, _ in heads:
        if i > start:
            nxt = i
            break
    end = nxt
    while end > start + 1 and not lines[end - 1].strip():
        end -= 1
    return end


def merge_month(target_lines, fb_entries, month):
    lines = list(target_lines)

    for day, body in fb_entries:
        block = tagged(body)
        if not block:
            continue
        heads = header_positions(lines)
        days = [d for _, d in heads]
        same = [i for i, d in heads if d == day]

        if same:
            # 같은 날짜의 마지막 블록 끝에 이어 붙인다
            at = block_end(lines, same[-1], heads)
            lines[at:at] = [""] + block
        else:
            dirn = direction(days)
            at = None
            for i, d in heads:
                if (dirn == -1 and d < day) or (dirn == 1 and d > day):
                    at = i
                    break
            if at is None:
                # 맨 끝. 뒤쪽 빈 줄을 넘겨 붙인다
                at = len(lines)
                while at > 0 and not lines[at - 1].strip():
                    at -= 1
                lines[at:at] = ["", "%d월 %d일" % (month, day)] + block
            else:
                lines[at:at] = ["%d월 %d일" % (month, day)] + block + [""]
    return lines


def new_month_file(ym, fb_entries, month):
    year, mm = ym.split(".")
    out = [
        "---",
        "created: %s-%s-01T00:00:00+09:00" % (year, mm),
        "tags: journal facebook",
        "title: %s" % ym,
        "---",
        "",
        "# Journal [[%s]].%s" % (year, mm),
        "",
    ]
    # 같은 날 글이 여럿이면 날짜 헤더 하나 아래로 묶는다
    # (기존 저널에 병합할 때는 헤더를 다시 찾으므로 저절로 묶인다)
    last_day = None
    for day, body in fb_entries:
        block = tagged(body)
        if not block:
            continue
        if day != last_day:
            out.append("%d월 %d일" % (month, day))
            last_day = day
        out.extend(block)
        out.append("")
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="실제 note 를 고친다")
    ap.add_argument("--stage", default=None, help="staging 출력 폴더")
    args = ap.parse_args()

    if not args.apply and not args.stage:
        print("--stage <dir> 또는 --apply 중 하나가 필요하다", file=sys.stderr)
        return 1

    stage = Path(args.stage) if args.stage else None
    if stage:
        stage.mkdir(parents=True, exist_ok=True)

    created = merged = 0
    for fb in sorted(FB_DIR.glob("*.md")):
        ym = fb.stem
        month = int(ym.split(".")[1])
        entries = parse_fb(fb)
        target = NOTE / ("%s.md" % ym)

        if target.exists():
            lines = merge_month(target.read_text(encoding="utf-8").split("\n"),
                                entries, month)
            merged += 1
        else:
            lines = new_month_file(ym, entries, month)
            created += 1

        text = "\n".join(lines).rstrip() + "\n"
        (stage / ("%s.md" % ym) if stage else target).write_text(text, encoding="utf-8")

    print("병합 %d개, 신규 %d개%s" % (merged, created, " (staging)" if stage else ""))

    if args.apply:
        RES.mkdir(exist_ok=True)
        moved = 0
        for img in sorted(FB_RES.iterdir()):
            if img.is_file():
                shutil.move(str(img), str(RES / img.name))
                moved += 1
        print("이미지 %d개 -> res/" % moved)
    return 0


if __name__ == "__main__":
    sys.exit(main())
