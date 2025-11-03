---
title: "WBSF(Websphere Business Service Fabric)와 IT의 미래"
categories: [tech]
comments: true
description: "Fabric 은 2002년도에 설립된 Webify라는 회사에서 만든 제품으로서 IT를 활용한 biz agility를 목적으로 만들어졌다.이 제품은CBS(CompositeBusinessService) 라는 각 industry별로 특화된 기 정의된 SOA 자산등을 활용한 ..."
date: 2007-03-10 21:01
---

Fabric

은 2002년도에 설립된 Webify라는 회사에서 만든 제품으로서 IT를 활용한 biz agility를 목적으로 만들어졌다.이 제품은CBS(CompositeBusinessService) 라는 각 industry별로 특화된 기 정의된 SOA 자산등을 활용한 비즈니스 컴포넌트를 활용하여 비즈니스 업무를 컴포넌트화 하는 것을 강조하고 있다. 2006년에 IBM으로 인수되면서 WBSF라는 이름(WebSphere Business Service Fabric)으로 core엔진은 바뀌었고 CBS자산들은 industry CBS라는 이름으로 명칭을 유지하게 되었다.

SOA 의 장점이라고 하면 흔히들 time to market을 들고 governance한 비즈니스 환경을 강조하지만 실제로 SOA를 기업에서 갑자기 적용하려면 수많은 시간과 노력과 비용이 소모된다. 그렇게 해도 어떠한 것이 진정 SOA의 value이며 자기들이 이룬 것이 정말 이전에 비해 더 나은 time to market 가치를 이루었다고 확신하기에는 많은 어려움이 따른다. IT벤더와 컨설팅업체들은 기술적인 value와 경험적인 value를 줄 수 있다고 장담하지만 그들에게 한 회사의 장기 전략을 맡기는 것이 너무나 부담될 뿐더러 정작 중요한 것은 자기들이 자기들의 비즈니스 업무에 대하여 IT화하는 데 있어서 기업의 장기 전략이나 기업 자산들을 제대로 꿰뚫고할수 있는 역량을 가진 사람이 기업내에 그리 많지 않다는 것이다.즉, SOA로 나아감에 있어 기업의 입장에서 부담이 되는 것은 IT적인 전문가나 제품을 넘어서 비즈니스에 대한 IT화에 대한 부담이고 정량화되고 잘 모델링된 업무이다.

Fabric은 SOA환경에서 각 industry별로 공통되어 자주 쓰이는 여러 비즈니스 서비스들을 엮어놓은 비즈니스 서비스 컴포넌트들을 제공한다. 단순히 비즈니스 모델링이나 메타데이타만 제공하는 것이 아니라 그것이 운영되고 관리되고 재 설계될 수 있는 IT환경까지도 아예 제공해준다. 즉 SOA로 차근차근 가기 힘든 고객들에게 원샷 원킬로 모든 필요한 부분들을 biz 부터 IT까지 아울러서 제공하는 종합선물 세트라고 볼 수 있겠다.

아무튼 이 Fabric은 내부적으로는 WebSphere Application Server, WebSphere Process Server, WebSphere Integration Developer, WebSphere Registry and Repository등을 포함하고 있으며 이것에 더하여 풍부한 Governance를 위한 기능을 내장하고 있다. 윈도우에서 한번 돌릴려고 하면 추천 사양이 ram은 기본이 3GB라고 한다.

이 Fabric이 당장에 국내 기업에서 적용될 수 있을지 아니면 이 제품이 먼 미래에 새로운 이름으로 인기몰이를 할 지 그것은 알 수 없겠으나 적어도 이 Fabric등은 우리의 5년 앞의 Enterprise의 모습을 보여준다는 측면에서 매우 의미가 있다. 이제는 IT의 IT비즈니스 업무도 컴포넌트화 되어가는 것이다. 이를테면 어느 대부호가 국내 국민은행같은 큰 규모의 은행을 갑자기 온라인으로 만들고자 한다면 타 은행이 몇십년에 걸쳐서 이룩한 IT자산을 이러한 Fabric등의 제품을 가져와서 금새 구축할 수 있는, 메뉴판에서 비즈니스를 고르면 IT가 금새 만들어주는 그런 세상. 그렇게 먼 미래의 모습이라고만 단정할 수는 없다고 생각한다. 적어도 Enterprise업계에서 밥벌어먹고 있는 개발자라면 혹은 운영자라면 한번쯤 이러한 enterprise업계에서 벌어지고 있는 변화의 흐름에 관심을 가져보는 것이 좋지 않을까?

---

## 댓글

> **경욱** · _2007/03/13 15:44_
> 
> 보험업계라고 보면 IAA for SOA가 비슷한 내용이라고 볼 수 있을까?

> **Yozz** · _2007/03/13 16:41_
> 
> 예. IAA보다 조금 더 구체화된, 런타임에서의 운영 개발 환경으로 보이네요. 제가 IAA for SOA를 잘은 몰라서리..
