# 오래된 블로그를 markdown 문서로 변환하기
## 배경
- egloos라는 블로그 서비스에서 오랫동안 운영해온 나만의 블로그. calmglow.egloos.com 의 백업본이 현재 이 폴더의 파일들의 정체임
- 이것들을 다시 markdown형태로 변환하여 현재 운영중인 github.io의 내 블로그의 post형태로 변환해서 유지하고 싶음

## 대상
- calmglow.egloos.com/의 3014219.html 부터 4799567.html 까지의 html 문서들. 날짜순대로 순차적으로 파일 이름이 부여되어 있다.
- 모든 html 파일은 하나의 post를 표현하고 있다. 
- 제목, 날짜, 글 내용, 태그, 덧글들(작성자 이름, 작성시간, 작성글).
- 댓글에서 Yozz, 혹은 Calmglow라는 인물은 작성자 본인임

## 방법
- /Users/calmglow/blog/egloos/migration 폴더 혹은 ~/blog/egloos/migration/ 폴더에 모든 html파일을 변환하여 저장한다.
- 파일 이름은 "{Year}-{Month}-{Day}-{Title}.md" 이다. 예: "2011-11-05-선과 모터사이클 관리술.md"
- 각 댓글은 markdown format 중 '>' 를 이용한다.
- 내부 링크로 존재하는 이미지등은 해당 폴더의 이미지를 가져와서 ~/blog/egloos/assets/img/egloos/에 복사해야하며 markdown의 링크에서도 ![...](/assets/img/egloos/{파일이}) 으로 설정하면 된다.

## 순서
- html 문서를 확인하여 파싱 전략을 먼저 고민한다.
- sample은 4627990.html 으로 한다. 문서 내에 이미지, 댓글, 대댓글 까지 포함하고 있어 대표성을 가진다.
- sample로 먼저 잘 변환되는지 확인 후 나머지 파일들을 변환한다.
