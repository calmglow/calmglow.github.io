---
title: "일정한 주기로 우분투팁을 Indicator로 보여주는 애플릿"
categories: [tech]
comments: true
description: "러시아의 Alexandr Gudulin이라는 소년(?)이 며칠전 만든 간단한 리눅스(Gnome용)용 Indicator . 일정한 시간마다 아래 그림처럼 우분투의 팁을 보여준다. 근데 이 우분투 팁은 사실 /usr/bin/ubuntu-server-tip 프로그램을 실행해..."
image: "/assets/img/egloos/ubuntutips-applet-0.1.2.html"
date: 2011-01-30 19:58
---

러시아의 Alexandr Gudulin이라는 소년(?)이 며칠전 만든 간단한 리눅스(Gnome용)용 Indicator

.  


일정한 시간마다 아래 그림처럼 우분투의 팁을 보여준다.  
  

![](/assets/img/egloos/ubuntutips-applet-0.1.2.html)

  
  


근데 이 우분투 팁은 사실 /usr/bin/ubuntu-server-tip 프로그램을 실행해서 나온 결과를 보여주는 것일뿐.  


그래서 이 프로그램뿐만 아니라 표준출력으로 무언가를 출력하는 프로그램이면 뭐든지 실행해서 값을 데스크탑에 예쁘게 뿌려주는 기능을 추가로 넣어봤다.  


주말에 한시간 정도 걸려서 내가 그전에 원했던 기능을 직접 만들어보는 재미가 쏠쏠하다.  
  
ubuntu-tips-applet_0.1.2_1.deb  
  


그나저나 라이센스가 GPL이지만 소스공개를 굳이 할 필요는 없을듯해서 Alexandr라는 소년에게 내가 고친 소스들과 자원파일을 보내고 감사의 말을 전했다. 이게 바로 오픈소스의 힘이겠지.  
  


추가.  


Alexandr가 고맙다며 gtk-apps.org에 helpers_list에 넣어준다는 답신을 보내주었다. 재밌구먼..

---

## 댓글

> **하스수** · _2011/01/31 09:50_
> 
> 일반적으로는
> 요청하면 보내주겠다는 약속으로도 GPL을 충족시킬 수 있습니다.
> 
> 그때 누가 이메일로 보내주세요~ 하면 보내주기만 하면 되는거죠 ㅎ

>> **Calmglow** · _2011/01/31 11:22_
>> 
>> 아하.. 그렇군요. 감사합니다!!!
