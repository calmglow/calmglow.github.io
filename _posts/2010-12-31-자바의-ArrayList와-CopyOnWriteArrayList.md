---
title: "자바의 ArrayList와 CopyOnWriteArrayList"
categories: [tech]
comments: true
description: "자바에는 크게 다음 4개의 List인터페이스의 구현체가 있다. VectorArrayListLinkedListCopyOnWriteArrayList 다른 것들은 자바 초창기때부터 있었기 때문에 어느정도 그 차이점을 알겠는데 ArrayList와 CopyOnWriteArray..."
date: 2010-12-31 16:57
---

자바에는 크게 다음 4개의 List인터페이스의 구현체가 있다.  
VectorArrayListLinkedListCopyOnWriteArrayList  


다른 것들은 자바 초창기때부터 있었기 때문에 어느정도 그 차이점을 알겠는데 ArrayList와 CopyOnWriteArrayList는 그 차이를 잘 모르는 경우가 많다.  


일단, ArrayList는 스레드에 안전하게 설계되지 않았다. 그 덕분에 빠르기는 하지만 스레드 처리에 민감한 경우 Vector를 쓰거나 ArrayList를 쓰면서 synchroized를 적절하게 사용해야만 했다. 그러나 이러한 방식은 각각의 스레드가 과도하게 혹은 필요 이상으로 이 synchronized에 따라 멈추거나 기다려야만 하는 상황을 유발시키므로 성능에 안좋은 영향을 미치기도 한다.  


따라서 이러한 경우의 해결방법 중의 하나가 바로 CopyOnWriteArrayList이다. CopyOnWriteArrayList는 딱 한가지특징만을 제외하면 ArrayList와 동일하다. CopyOnWriteArrayList의 컨텐츠를 읽기 위해 어딘가에 전달할때 CopyOnWriteArrayList는 컨텐츠를 복사해서 전달한다. 따라서 CopyOnWriteArrayList를 쓰는 다양한 스레드에서 안심하고 읽을수 있다. 물론 CopyOnWriteArrayList는  주로 많은 수의 스레드는 주로  List를 읽고 소수의 스레드나 메소드내에서만 해당 List를 수정하는 경우에 유리할 것이다.  
  


참고자료:  


http://www.ibm.com/developerworks/java/library/j-5things4.html  


http://techvivek.wordpress.com/2009/08/29/difference-between-arraylist-and-copyonwritearraylist/

---

## 댓글

> **xeraph** · _2010/12/31 18:43_
> 
> 이게 내장이었군요 하나 배우고 갑니다 ㅎㅎ

>> **calmglow** · _2010/12/31 23:12_
>> 
>> 그러게요. 요즘 나오는 자바를 넘 우습게보다 가끔 큰 코다치네요. ㅎ

> **캐빈** · _2011/01/05 14:08_
> 
> 이런게 있었구나.. 좋은 정보 쌩스
> 걔를 썼을때 복사에 따르는 오버헤드 및 Object Garbage 와 ArrayList synchronize 를 통한 오버헤드 비교가 궁금해지네 :)
