---
title: "안드로이드 브라우저 User-Agent 이슈"
categories: [tech]
comments: true
description: "이제 웹사이트는 다양한 화면 크기를 지닌 클라이언트를 배려해야만한다. 비단 그것이 안드로이드냐 아이폰이냐 정도의 문제가 아니라스마트폰 수준의 크기냐 타블렛 수준의 크기냐 혹은 심지어 스마트 TV수준의 크기냐에 따라서도 웹사이트는 고려를 하지 않을 수없게 되었다. 웹사이..."
date: 2011-01-02 17:02
---

이제 웹사이트는 다양한 화면 크기를 지닌 클라이언트를 배려해야만한다. 비단 그것이 안드로이드냐 아이폰이냐 정도의 문제가 아니라스마트폰 수준의 크기냐 타블렛 수준의 크기냐 혹은 심지어 스마트 TV수준의 크기냐에 따라서도 웹사이트는 고려를 하지 않을 수없게 되었다.  


웹사이트는 결국 클라이언트의 HTTP 헤더를 보며 클라이언트에게 어울리는 화면 크기를 가늠해볼 수 밖에 없다.  


이를테면 안드로이드 폰인 넥서스 원의 User-Agent헤더의 값은 다음과 같다.  
  


Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; Nexus One Build/FRG83)AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1  
  


프로요 OS를 사용하는 WebKit기반의 브라우저로 웹사이트를 방문했다는 뜻인데, 이중에서 Mobile이라는 표시를 보며 웹사이트는 사이트의 컨텐츠를 Mobile에 맞게 가공하여 보내주게 된다.  


그런데 같은 안드로이드라 할지라도 프로요 기반의 갤럭시탭같은 경우에는 이 Mobile 표시가 없다.  
  


Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; device Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Safari/533.1  
  


즉, 다른 값은 다 동일하되 Mobile이라는 표시만을 삭제하여 웹사이트가 이 client가 비록 안드로이드 기반의 기기이지만 화면 크기는 일반 풀사이즈의 것을 원하고 있다는 것으로 간주할 수 있게 된다.  
  


원문: http://android-developers.blogspot.com/2010/12/android-browser-user-agent-issues.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+blogspot%2FhsDu+%28Android+Developers+Blog%29&utm_content=Google+Reader
