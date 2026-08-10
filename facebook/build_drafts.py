#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
선별한 페이스북 글을 Jekyll 초안으로 변환해 drafts/ 에 넣는다.

후보는 400자 이상 본인 작성 글 52건을 모두 읽고 고른 것이다.
SELECTED의 키는 blog_candidates.json에서의 날짜(YYYY-MM-DD)다.
"""

import json
from pathlib import Path

BLOG = Path(__file__).resolve().parent.parent
CAND = Path(__file__).parent / "blog_candidates.json"
OUT = BLOG / "drafts"

# "YYYY-MM-DD HH:MM:SS": (슬러그, 제목, 카테고리)
# 같은 날 글이 여럿이라 날짜만으로는 구분되지 않는다
SELECTED = {
    "2026-05-28 16:45:34": ("나는-왜-기술을-공유하지-않게-되었나", "나는 왜 기술을 공유하지 않게 되었나", "tech"),
    "2023-10-28 20:23:21": ("생성형-AI와-스타트업", "생성형 AI와 스타트업에 대한 생각", "tech"),
    "2023-01-27 16:37:36": ("WebRTC와-함께한-10년", "WebRTC와 함께한 10년", "life"),
    "2025-06-09 17:04:25": ("AI와-함께-앱을-만든-반년", "AI와 함께 앱을 만든 반년", "tech"),
    "2020-08-14 07:36:25": ("코드는-속이지-않는다", "코드는 속이지 않는다", "tech"),
    "2021-07-09 22:46:20": ("모든-일이-중요하다고-말하지-마라", "모든 일이 중요하다고 말하지 마라", "tech"),
    "2022-09-29 00:33:33": ("PO를-맡은-지-10개월", "PO를 맡은 지 10개월", "tech"),
    "2015-12-08 11:12:28": ("아침-한-시간-반", "아침 한 시간 반", "life"),
    "2024-12-31 17:33:19": ("감수성", "메말라가는 감수성에 대하여", "life"),
    "2016-02-28 22:27:28": ("구로동을-떠나며", "구로동을 떠나며", "life"),
    "2015-07-31 12:26:54": ("내가-사랑했던-기술들", "내가 사랑했던 기술들", "tech"),
    "2023-11-08 23:40:50": ("싸한-느낌", "직접 코딩을 해보면 느껴지는 싸한 느낌", "tech"),
}


def description(body):
    first = body.split("\n")[0].strip()
    if len(first) < 20 and "\n" in body:
        first = body.split("\n")[1].strip()
    return first[:90]


def main():
    cands = json.load(open(CAND, encoding="utf-8"))
    by_date = {c["date"]: c for c in cands}

    OUT.mkdir(exist_ok=True)
    made = 0
    for stamp, (slug, title, cat) in SELECTED.items():
        item = by_date.get(stamp)
        date = stamp[:10]
        if not item:
            print("없음: %s" % stamp)
            continue
        body = item["body"]
        # 첫 줄이 제목 구실을 하면 본문에서 덜어낸다
        lines = body.split("\n")
        if len(lines[0]) <= 40 and not lines[0].startswith("-"):
            lines = lines[1:]
        body = "\n".join(lines).strip()

        text = "\n".join([
            "---",
            'title: "%s"' % title,
            "categories: [%s]" % cat,
            "comments: true",
            'description: "%s"' % description(item["body"]).replace('"', "'"),
            "date: %s" % item["date"][:16],
            "---",
            "",
            body,
            "",
        ])
        (OUT / ("%s-%s.md" % (date, slug))).write_text(text, encoding="utf-8")
        made += 1
    print("초안 %d건 -> %s" % (made, OUT))


if __name__ == "__main__":
    main()
