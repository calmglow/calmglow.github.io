---
title: "자바7에서 달라진 점 (Project Coin을 중심으로)"
categories: [tech]
comments: true
description: "자바 버전 업데이트에 따른 IT사회에서의 관심은 예전만 못하다. 자바 개발자는 날이 갈수록 늘어가는데도 이런 낮은 관심의 이유는 무엇인지 잘 모르겠다. 아마도 이미 기존의 자바의 기능만으로도 큰 무리없이 개발이 가능해졌고, 성숙해졌기 때문이 아닐까 생각한다. 아무튼 자..."
date: 2011-04-25 16:39
---

자바 버전 업데이트에 따른 IT사회에서의 관심은 예전만 못하다. 자바 개발자는 날이 갈수록 늘어가는데도 이런 낮은 관심의 이유는 무엇인지 잘 모르겠다. 아마도 이미 기존의 자바의 기능만으로도 큰 무리없이 개발이 가능해졌고, 성숙해졌기 때문이 아닐까 생각한다.  


아무튼 자바 7에서 달라진 점을 다음과 같이 정리해보았다.  
  
Project Coin  


먼저 소개할 것은 Project Coin이다. 자바 7에 시도할 짜잘한 변화요소들을 결정하기 위한 프로젝트인데, 비록 소소하지만 그동안 없어서 불편했던 여러가지 것들이 이 프로젝트를 통해 자바 7에 반영되는 것 같다. 이 프로젝트를 통해 반영될 변화될 부분은 다음과 같다.  
  
swich문 안의 String처리  


다음 코드를 보면 이해가 쉬울 것이다. switch문에서 String문에 대하여 분기를 처리할 수 있게 되었다. 나름 꽤 편리한 기능이다.  


switch(myString) {  


case “one”: <블라블라>; break;  


case “red”: <블라블라>; break;  


default: <블라블라>;  


}  
  
개선된 제네릭 변수 선언문  


Generic기반 변수를 선언할 때 다음과 같이 보다 편하게 선언하는 게 가능해졌다. 이것도 그동안 자주 사용하면서 꽤 불편했던 것인데 가려운 곳을 잘 긁어주는 변화라고 볼 수 있을 듯.  
  


과거  


Map<String,MyType> foo = new Map<String,MyType>();  


자바7  


Map<String,MyType> foo = new Map<>();  
  
멀티 Catch문  


2개 이상의 예외상황에 대해 동시에 처리하는 것이 가능해졌다. 오호..  


try {  


blahblah  


} catch(Exception|Error a) {  


handle(a);  


}  
  
자동 자원 관리  


Groovy에서나 지원하던 거였는데, DB connection이나 그 외 자원들을 finally문등에서 해제 처리를 하지 못하여 그동안 발생했었던 장애현상을 해결할 수 있는 간단하지만 멋진 기능이 추가되었다.  
  


try(InputStream inFile = new FileInputStream(aFileName);  


OutputStream outFile = new FileOutputStream(aFileName)) {  


byte[] buf = new byte[BUF_SIZE];  


int readBytes;  


while ((readBytes = inFile.read(buf)) >= 0)  


inFile.write(buf, readBytes);  


}  
  


위의 예처럼 자원 관리가 필요한 부분에 대해서 try문의 괄호에 넣어주면 굳이 모든 처리가 끝나고 finally문에서 별도의 close를 처리하지 않아도 알아서 try문이 끝나는 시점에 해제를 해주는 것.  
  


그 외에 여러가지 달라진 점이 눈의 띄지만 가장 소소하면서도 흥미로운 몇가지를 소개해보았다.
