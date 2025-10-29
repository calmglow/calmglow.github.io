---
title: Omarchy 설정 로그
categories: [dev]
comments: true
description: 너무나 초기 버전인 Omarcny 과연 지치지 않고 내 품에 안을 수 있을까?
image: https://calmglow.github.io/assets/img/omarchy_logo.png
---

![omarchy logo](https://calmglow.github.io/assets/img/omarchy_logo.png)

## 기본 설정
- 해상도 설정: ~/.config/hypr/monitors.conf 파일을 수정하면 되는데, 나는 일단 scale을 1로 설정하고 각 도구별로 font 크기등을 키우면서 사용한다. 터미널의 폰트크기 설정은 ~/.config/alacritty/alacritty.toml을 수정하면 된다.
- 설치한 지 하루 밖에 안지났는데 다음 날 'sudo pacman -Syu' 실행했더니 업그레이드 양이 장난이 아님. 그나마 이 PC가 Toy용이라서 다행이다. 아무리 봐도 이러다가 한번 갈아엎지 싶다.
- 하드웨어 가속이 잘 되는지 체크 필요하다. 
  - `lspci -k |grep -EA3 'VGA|3D`
  - opengl 가속 체크: `glxinfo | grep "direct rendering"`
  - vulkan 가속 체크: `vulkaninfo | grep "deviceName"`
  - 참고로 vulkan 드라이버 설치가 안되어 있어서 [link](https://www.siberoloji.com/arch-linux-howtos-install-and-configure-vulkan/) 보고 해결함.

## 단축키
- win+space와 win+alt+space로 앱 실행이나 os 메뉴 불러온다.
- win+x는 창 닫는 것이고, win+왼쪽 win+오른쪽 등으로 창 간 이동도 직관적임.
- win+enter 가 터미널 실행. 보통 우분투는 win+t 였는데 한참 헷갈림. 그 외에 win+shift+b가 브라우저
- 창을 겹쳐서 배치하는게 어려워서 한 공간에 여러 창을 배치하는 게 어려울 것 같음. 따라서 여러 space간 이동을 하게 될 듯. win+숫자로 space간 이동을 해야한다.
- 의외로 리눅스 환경에 익숙하지 않은 분들을 위해, 터미널에서 마우스로 선택해서 복사하거나 브라우저에서 복사한 것을 복붙하고 싶다면 ctrl+shift+c (복사), ctrl+shift+v(붙이기)를 알고 있으면 편하다.
- 자연스럽게 단축키를 많이 쓰게 하는 UX. [단축키페이지](https://learn.omacom.io/2/the-omarchy-manual/53/hotkeys)를 상당히 자주 들어가서 숙지해야할듯.

## 개발환경 설정
- 일단 기본적으로 nvm과 uv는 설치해야하는데 pacman으로 nvm을 설치했더니 path가 제대로 설정이 안되서 실패. [nvm 사이트](https://github.com/nvm-sh/nvm)가서 스크립트로 직접 실행하는 것이 빠르다.
- 힙한 리눅스라서 당연히 최소한 zsh일 줄 알고 신나게 .zshrc에 alias 등을 설정했는데 omarchy는 bash가 국룰. 바꾸는 것도 매우 어려움. 전체를 바꾸는 건 아니고 터미널 설정으로만 zsh로 변경 가능은 하나 굳이 zsh를 꼭 써야하는 건 아닌지라 국룰을 따르기로 함.
- vim은 없어도 neovim은 이미 설치가 되어있고 웬만한 plugin들도 설치가 되어 있어서 거의 그냥 쓰면 되는 수준인데 의외로 vscode는 안 깔려있다. sudo pacman -S vscode 로 설치하거나 Install 도구에서 설치하면 된다.
- claude-code 설치는 터미널에서 npm i -g @anthropic-ai/claude-code 실행하면 된다. 물론 nvm으로 미리 node설치는 완료해야겠지.

## 한글 설정
- 당근의 이경원님이라는 분의 [블로그](https://kyoungwon.me/development/2025/07/08/hyprland-korean-keyboard/)가 가장 잘 나와있다. 

----
- 이 글은 계속 업데이트됩니다. 마지막 업데이트 2025-10-28
