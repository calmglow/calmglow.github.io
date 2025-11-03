---
title: "Composite Business Services(CBS)에 대하여"
categories: [tech]
comments: true
description: "손정의의 '감성의 승리' 중에서 그의 발명에 대한 지론을 보면 다음과 같다. 발명에는 세 가지 패턴밖에 없다는 것입니다. 하나는 문제 해결법입니다. 세상에 어떤 문제가 있다면 그것을 해결하면 되는 것입니다. 둘째 수평적 사고법입니다. 이것은 둥근 것을 사각으로 해 본..."
image: "http://www.ibm.com/"
date: 2007-03-10 23:50
---

손정의의 '감성의 승리' 중에서 그의 발명에 대한 지론을 보면 다음과 같다.

"발명에는 세 가지 패턴밖에 없다는 것입니다. 하나는 문제 해결법입니다. 세상에 어떤 문제가 있다면 그것을 해결하면 되는 것입니다. 둘째 수평적 사고법입니다. 이것은 둥근 것을 사각으로 해 본다든지, 하얀 것을 빨갛게 해 본다든지, 큰 것을 작게 만들어 본다든지, 어쨌든 다른 방향으로 생각하면 됩니다. 셋째는 조합법입니다. 예를 들어 라디오와 카세트를 조합하면 카세트 라디오가 되고, 오르골(자명금)과 시계를 조합하면 자명시계가 됩니다. 그런 조합법입니다. 그런 식으로 자기 나름대로 패턴화하는 방법을 발견해서, 그것을 파고들어가는 것이죠. 이렇게 하면 아주 쉽게 발명의 힌트가 자꾸자꾸 나옵니다. 자신의 창조력을 자극하는 것이죠"

그가 발견한 발명의 패턴 중 마지막은 '조합법'인데 이 조합법이 IT기술에서 화두가 되고 있다. 바로 매쉬업이라는 단어로 말이다. 먼저 매쉬업에 대한 여러 사람들의 정의를 살펴보자.

"업체들이 제공하는 공개된 기능들을 조합하여 새로운 서비스를 만들어 내거나, 자신의 서비스 기능을 더욱 풍부하게 발전 시키는 것을 매쉬업 이라고 하는데 (원래는 DJ가 2개 이상의 곡을 섞어서 하나로 만드는 것을 지칭하는 단어였다고 한다 :웹 2.0 경제학 - 김국현에서 발췌)"

"It is sometimes created as a critique or commentary on an existing work or product. The tactic owes much to previous recombinant forms including: content repurposing, most notably byKenneth Angerin his 1963 filmScorpio Rising; DJ mixing andculture jamming.

Content used in mashups is typically sourced from a third party via a public interface orAPI, although some in the community believe that only cases where public interfaces are not used count as mashups. Other methods of sourcing content for mashups includeWeb feeds(e.g.RSSorAtom) andJavaScript.

Many people are experimenting with mashups using Google, eBay, Amazon, AOL, Windows Live, and Yahoos APIs. Wikipedia에서 발췌"

"Mash-ups란 두개 혹은 그 이상의 곡을 섞는다는 뜻의 힙합(hip-hop) mixes라는 속어이다. 이들이 요즘 던지는 캐치 프레이즈는 바로 세개의 M(3Ms)이다: "Mix, Match, & Mutate" (섞어라, 서로 맞춰라, 그리고 변형시켜라). http://gatorlog.com/mt/archives/002316.html 에서 발췌"

이 렇게 웹 분야에서 매쉬업이라는 것이 붐을 일으키게 된 것은 ProgrammableWeb으로서의 웹의 진화에 힘입은 바가 크다고 할수 있겠다.즉 표준 기반으로 웹에서의 컨텐츠가 가공되고 제어할수 있는 환경이 제공되면서 이러한 서비스에 대해 재사용에 대한 욕구가 커지게 된 것이다. 매쉬업이라고 하니 상당히 새로운 개념인것 같지만 사실 이미 IT업계에서 재사용성을 높이기 위한 인터페이스, 프로토콜의 표준화에 대한 노력은 어제 오늘의 일이 아니지 않은가? Web 2.0 시대에 오게 되면서 B2C분야와 P2P분야에서 웹이 스스로 프로그래밍 가능한 인프라스트럭쳐로서 발전하게 되면서 이러한 붐을 타게된 것이라고 생각하면 사실 지금의 이러한 현상이 경험있는 IT엔지니어들 입장에서는 그렇게 놀랄만한 일로만 볼 것도 아닐 것 같다.

그런데 좀 더 이 현상을 IT엔지니어 입장에서 살펴보면 한가지 특징을 발견할수 있다. 흔히들 재사용 가능한 비즈니스 의미를 지닌 메소드에 대해서 컴포넌트라는 용어를 쓰지만 누구도 이 웹의 Open API를 이용한 서비스들에 대하여 컴포넌트라는 용어를 쓰지는 않는다. 왜냐하면 이것이 실제로 내부적으로는 컴포넌트라고 불리는 어떠한 구현물이라할 지라도 그것을 사용하는 사용자나 비즈니스적인 의미에서 보았을 때는 Open API에서 제공되는 것은 단지 서비스이지 컴포넌트의 관점에서 바라볼 필요는 없기 때문이리라.

어 찌되었건간에 이러한 IT 자산들의 통신 표준화에 힘입어 이제 조금씩 서비스라는 용어의 대중화(?)가 진행되고 있다. 그 와중에 매쉬업이라는 단어와 유사한 용어가 SOA혹은 엔터프라이즈 세계에도 쓰이고 있다. 바로 Composite Application 혹은 Composite Business Service라는 용어다.

웹서비스 기술이 어느 정도 엔터프라이즈에서 적용하는데 있어 만족할만한 수준이 되고 이것을 넘어 SOA 및 ESB가 서서히 엔터프라이즈 진영에서 힘을 얻어가자 기업 입장에서 더이상 기존의 컴포넌트 수준에서 IT자산을 꾸역꾸역 만들어가는 단계를 벗어나 기업의 통일된 표준 인터페이스로서 이러한 IT자산을 서비스로 바라볼 수 있는 고지에 있는 현 시점에서 당연히 웹2.0의 매쉬업 흐름과 유사하게 기업 IT자산의 재활용성 측면을 진지하게 고려할 수 있게 된 것이다.

그냥 막연히 서비스라고 하니까 엔지니어나 아키텍트나 비즈니스 전문가가 서로 다른 관점에서 서비스를 바라보는 난처한 상황에 직면하고 IT관점의 서비스와 별도로 Business Service라는 용어를 점차 사용하기 시작하였으며 이러한 비즈니스 서비스들의 의미있고 가치있는 결합의 형태가 바로 Composite Application 혹은 Composite Business Service라고 할 수 있겠다.

예를 들어 다음 그림처럼 소매금융업종의 대출관련 업무의 Composite형태를 살펴보자.

![](http://www.ibm.com/)

기업의 IT자산들이 서로 엮여서 새로운 가치있는 비즈니스 서비스를 만들어내었다. 즉 Composite Business Service는 기업의 어떤 문제나 일을 수행하는 데 있어 필요한 여러 서비스들의 컴포넌트 묶음이다. 그러나 단순한 묶음이 아니라 '동적'인 묶음이다. 필요에 따라 얼마든지 묶음의 형태가 변화하는 것이 가능하다.

사실 이 Composite Business Service의 정의를 이렇게 내렸지만 이 새로와 보이는 개념에 대한 보다 명확한 요건에 대한 설명이 필요하다. 즉, 어떤게 Composite Business Service로서 이름 붙일 수 있겠느냐 하는 것이다.

이 Composite Business Service(CBS)의 가장 큰 특징은 Loosely coupling의 극대화라고 할 수 있게다. 이제까지 이 느슨한 연결의 정의는 다양하게 쓰였다고 볼 수 있겠으나 CBS에서 말하고 있는 느슨한 연결의 특징은 'Who'와 'How' 그리고 'What'에 대해 극대화된 느슨한 연결을 지향한다는 점이다. 즉 어떠한 사용자가 이 서비스를 사용하느냐에 대해서 추상화 및 비즈니스 정의화 하고 이 서비스를 어떻게 사용할 지그 행위에 대해서 역시 추상화하며 이 서비스가 최종적으로 어떤 구체적인 서비스를 사용할 지에 대해 다시 추상화하여 이 세가지의 요건을 충족시킬때 CBS라는 비즈니스 서비스가 탄생할수 있다고 보는  것이다.

이러한 CBS의 개념이 최근에 여러 컨설턴트나 벤더등에서 회자되기 시작하면서 또 다른 비전을 제시해주고 있는 것으로 보인다.

참고문서: http://www-128.ibm.com/developerworks/webservices/library/ws-soa-composite 외 다수
