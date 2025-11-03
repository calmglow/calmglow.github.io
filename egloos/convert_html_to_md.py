#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Egloos HTML to Markdown Converter
egloos 블로그 HTML 파일을 Jekyll markdown 형식으로 변환
"""

import os
import re
import shutil
from pathlib import Path
from bs4 import BeautifulSoup
from datetime import datetime
import html


class EgloosConverter:
    def __init__(self, base_dir, output_dir, assets_dir):
        self.base_dir = Path(base_dir)
        self.output_dir = Path(output_dir)
        self.assets_dir = Path(assets_dir)
        self.error_log = []

    def convert_file(self, html_path):
        """단일 HTML 파일을 Markdown으로 변환"""
        try:
            with open(html_path, 'r', encoding='utf-8') as f:
                content = f.read()

            soup = BeautifulSoup(content, 'html.parser')

            # 1. 제목 추출
            title = self._extract_title(soup)
            if not title:
                raise ValueError("제목을 찾을 수 없습니다")

            # 2. 날짜 추출
            date = self._extract_date(soup)
            if not date:
                raise ValueError("날짜를 찾을 수 없습니다")

            # 3. 카테고리 추출
            category = self._extract_category(soup)
            categories = self._map_category(category)

            # 4. 본문 추출
            post_content = self._extract_content(soup, html_path)

            # 5. Description 생성 (본문 첫 150자)
            description = self._generate_description(post_content)

            # 6. 첫 번째 이미지 추출 (front matter용)
            first_image = self._extract_first_image(soup, html_path)

            # 7. 댓글 추출
            comments = self._extract_comments(soup)

            # 8. Markdown 생성
            markdown = self._generate_markdown(
                title, date, categories, description,
                first_image, post_content, comments
            )

            # 9. 파일 저장
            output_filename = self._generate_filename(date, title)
            output_path = self.output_dir / output_filename

            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(markdown)

            return output_path

        except Exception as e:
            error_msg = f"Error converting {html_path}: {str(e)}"
            self.error_log.append(error_msg)
            print(f"❌ {error_msg}")
            return None

    def _extract_title(self, soup):
        """제목 추출"""
        title_elem = soup.find('h2', class_='entry-title')
        if title_elem:
            a_tag = title_elem.find('a')
            if a_tag:
                return a_tag.get('title', a_tag.get_text().strip())
        return None

    def _extract_date(self, soup):
        """날짜 추출"""
        date_elem = soup.find('abbr', class_='published')
        if date_elem:
            date_str = date_elem.get('title', '')
            # "2011/09/27 09:16" 형식
            try:
                return datetime.strptime(date_str, '%Y/%m/%d %H:%M')
            except:
                pass
        return None

    def _extract_category(self, soup):
        """카테고리 추출"""
        cat_elem = soup.find('span', class_='post_title_category')
        if cat_elem:
            a_tag = cat_elem.find('a')
            if a_tag:
                return a_tag.get_text().strip()
        return None

    def _map_category(self, category):
        """카테고리를 front matter 값으로 매핑"""
        if category == "Art and Life":
            return "[life]"
        else:
            return "[tech]"

    def _extract_content(self, soup, html_path):
        """본문 추출 및 이미지 처리"""
        content_elem = soup.find('div', class_='post_content entry-content')
        if not content_elem:
            return ""

        # hentry 내부의 실제 콘텐츠 찾기
        hentry = content_elem.find('div', class_='hentry')
        if not hentry:
            return ""

        # 불필요한 요소 제거 (주석, RDF 등)
        from bs4 import Comment, NavigableString

        # HTML 주석 제거
        for comment in hentry.find_all(string=lambda text: isinstance(text, Comment)):
            comment.extract()

        # RDF, script 등 불필요한 태그 제거
        for tag in hentry.find_all(['script', 'iframe', 'style']):
            tag.decompose()

        # RDF 태그 제거 (namespace 포함)
        for tag in hentry.find_all():
            if tag.name and ('rdf' in tag.name.lower() or tag.name.startswith('rdf:')):
                tag.decompose()

        # 불필요한 span 및 숨겨진 요소 제거
        for tag in hentry.find_all('span', class_='copyright_entry'):
            tag.decompose()
        for tag in hentry.find_all(style=lambda value: value and 'display:none' in value):
            tag.decompose()
        for tag in hentry.find_all(style=lambda value: value and 'display: none' in value):
            tag.decompose()

        # 이미지 처리
        for img in hentry.find_all('img'):
            img_src = img.get('src', '')
            new_src = self._process_image(img_src, html_path)
            img['src'] = new_src

        # HTML을 텍스트로 변환
        content_text = self._html_to_markdown(hentry)

        return content_text.strip()

    def _process_image(self, img_src, html_path):
        """이미지 경로 처리 및 파일 복사"""
        # 외부 URL인 경우 (http://, https://)
        if img_src.startswith('http://') or img_src.startswith('https://'):
            return img_src

        # 상대경로인 경우
        if img_src.startswith('../'):
            # 실제 파일 경로 찾기
            html_dir = Path(html_path).parent
            img_path = html_dir / img_src
            img_path = img_path.resolve()

            if img_path.exists():
                # 파일명 추출
                img_filename = img_path.name

                # assets 디렉토리에 복사
                dest_path = self.assets_dir / img_filename
                self.assets_dir.mkdir(parents=True, exist_ok=True)

                if not dest_path.exists():
                    shutil.copy2(img_path, dest_path)

                # Jekyll 경로 반환
                return f"/assets/img/egloos/{img_filename}"
            else:
                # 파일이 없으면 원본 그대로
                print(f"⚠️  이미지 파일을 찾을 수 없습니다: {img_src}")
                return img_src

        return img_src

    def _html_to_markdown(self, element):
        """HTML 요소를 Markdown으로 변환"""
        result = []
        prev_was_text = False

        for child in element.children:
            if child.name is None:
                # 텍스트 노드
                text = str(child).strip()
                if text:
                    # 이전이 div였고 현재가 텍스트면 개행 추가
                    if result and not prev_was_text:
                        result.append('\n\n')
                    result.append(text)
                    prev_was_text = True
            elif child.name == 'div':
                # div는 단락으로 처리 (두 번 개행)
                inner = self._html_to_markdown(child)
                if inner.strip():
                    # 이전에 내용이 있으면 개행 추가
                    if result and prev_was_text:
                        result.append('\n\n')
                    result.append(inner.strip() + '\n\n')
                    prev_was_text = False
            elif child.name == 'br':
                result.append('  \n')  # Markdown 줄바꿈
                prev_was_text = False
            elif child.name == 'img':
                src = child.get('src', '')
                alt = child.get('alt', '')
                result.append(f"\n![{alt}]({src})\n\n")
                prev_was_text = False
            elif child.name in ['p']:
                inner = self._html_to_markdown(child)
                if inner.strip():
                    if result and prev_was_text:
                        result.append('\n\n')
                    result.append(inner.strip() + '\n\n')
                    prev_was_text = False
            else:
                # 기타 태그는 내부 텍스트만
                inner = self._html_to_markdown(child)
                if inner.strip():
                    result.append(inner)

        return ''.join(result)

    def _generate_description(self, content):
        """본문에서 description 생성 (첫 150자)"""
        # 줄바꿈, 이미지 등 제거
        clean_content = re.sub(r'!\[.*?\]\(.*?\)', '', content)
        clean_content = re.sub(r'\s+', ' ', clean_content).strip()

        if len(clean_content) > 150:
            return clean_content[:150] + "..."
        return clean_content

    def _extract_first_image(self, soup, html_path):
        """본문의 첫 번째 이미지 추출 (front matter용)"""
        content_elem = soup.find('div', class_='post_content entry-content')
        if not content_elem:
            return None

        hentry = content_elem.find('div', class_='hentry')
        if not hentry:
            return None

        img = hentry.find('img')
        if img:
            img_src = img.get('src', '')
            return self._process_image(img_src, html_path)

        return None

    def _extract_comments(self, soup):
        """댓글 추출"""
        comments = []
        comment_list = soup.find('ul', class_='comment_list')

        if not comment_list:
            return comments

        for li in comment_list.find_all('li', recursive=False):
            comment = self._parse_comment(li)
            if comment:
                comments.append(comment)

        return comments

    def _parse_comment(self, li_elem):
        """개별 댓글 파싱"""
        # 작성자
        writer_elem = li_elem.find('span', class_='comment_writer')
        if not writer_elem:
            return None
        writer = writer_elem.get_text().strip()

        # 작성시간
        datetime_elem = li_elem.find('span', class_='comment_datetime')
        datetime_str = datetime_elem.get('title', '') if datetime_elem else ''

        # 댓글 내용
        # comment_id 찾기
        comment_id = None
        for div in li_elem.find_all('div'):
            div_id = div.get('id', '')
            if div_id.startswith('comment_'):
                comment_id = div_id
                break

        content = ''
        if comment_id:
            content_elem = li_elem.find('div', id=comment_id)
            if content_elem:
                # br 태그를 줄바꿈으로
                for br in content_elem.find_all('br'):
                    br.replace_with('\n')
                content = content_elem.get_text().strip()

        # 대댓글 여부
        is_reply = 'comment_reply' in li_elem.get('class', [])

        return {
            'writer': writer,
            'datetime': datetime_str,
            'content': content,
            'is_reply': is_reply
        }

    def _generate_markdown(self, title, date, categories, description,
                          first_image, content, comments):
        """Markdown 문서 생성"""
        lines = []

        # Front matter
        lines.append('---')
        lines.append(f'title: "{title}"')
        lines.append(f'categories: {categories}')
        lines.append('comments: true')
        lines.append(f'description: "{description}"')
        if first_image:
            lines.append(f'image: "{first_image}"')
        lines.append(f'date: {date.strftime("%Y-%m-%d %H:%M")}')
        lines.append('---')
        lines.append('')

        # 본문
        lines.append(content)
        lines.append('')

        # 댓글
        if comments:
            lines.append('---')
            lines.append('')
            lines.append('## 댓글')
            lines.append('')

            for comment in comments:
                # 일반 댓글: '> ', 대댓글: '>> '
                indent = '>> ' if comment['is_reply'] else '> '
                lines.append(f"{indent}**{comment['writer']}** · _{comment['datetime']}_")
                lines.append(f"{indent}")

                # 댓글 내용 (각 줄마다 indent 추가)
                content_lines = comment['content'].split('\n')
                for line in content_lines:
                    lines.append(f"{indent}{line}")
                lines.append('')

        return '\n'.join(lines)

    def _generate_filename(self, date, title):
        """파일명 생성: {Year}-{Month}-{Day}-{Title}.md"""
        # 날짜 부분
        date_str = date.strftime('%Y-%m-%d')

        # 제목을 파일명으로 (특수문자 제거)
        safe_title = re.sub(r'[^\w\s가-힣-]', '', title)
        safe_title = re.sub(r'\s+', '-', safe_title)

        return f"{date_str}-{safe_title}.md"

    def convert_all(self, start_file='3014219.html', end_file='4799567.html'):
        """모든 HTML 파일 변환"""
        html_dir = self.base_dir / 'calmglow.egloos.com'

        if not html_dir.exists():
            print(f"❌ 디렉토리를 찾을 수 없습니다: {html_dir}")
            return

        # HTML 파일 목록
        html_files = sorted(html_dir.glob('*.html'))

        # 파일명에서 숫자만 추출하여 범위 필터링
        start_num = int(re.search(r'\d+', start_file).group())
        end_num = int(re.search(r'\d+', end_file).group())

        filtered_files = []
        for f in html_files:
            match = re.search(r'(\d+)\.html$', f.name)
            if match:
                num = int(match.group(1))
                if start_num <= num <= end_num:
                    filtered_files.append(f)

        print(f"📝 총 {len(filtered_files)}개 파일 변환 시작...")

        success_count = 0
        for html_file in filtered_files:
            print(f"🔄 변환 중: {html_file.name}")
            result = self.convert_file(html_file)
            if result:
                success_count += 1
                print(f"✅ 완료: {result.name}")

        print(f"\n{'='*50}")
        print(f"✅ 성공: {success_count}/{len(filtered_files)}")
        print(f"❌ 실패: {len(self.error_log)}")

        if self.error_log:
            print(f"\n에러 로그:")
            for error in self.error_log:
                print(f"  - {error}")


def main():
    # 경로 설정
    base_dir = Path.home() / 'blog' / 'egloos'
    output_dir = base_dir / 'migration'
    assets_dir = base_dir / 'assets' / 'img' / 'egloos'

    # 출력 디렉토리 생성
    output_dir.mkdir(parents=True, exist_ok=True)

    # 변환기 생성
    converter = EgloosConverter(base_dir, output_dir, assets_dir)

    # 전체 변환 실행
    print("🚀 전체 HTML 파일 변환을 시작합니다...")
    print(f"📂 입력: {base_dir / 'calmglow.egloos.com'}")
    print(f"📂 출력: {output_dir}")
    print(f"🖼️  이미지: {assets_dir}")
    print("")

    converter.convert_all()


if __name__ == '__main__':
    main()
