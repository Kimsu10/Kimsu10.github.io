---
layout: single
title: "브라우저 해킹"
categories: question
tag: [Web, hacking]
sidebar_main: true
toc: true
toc_sticky: true
---

1. Kali 리눅스 다운로드

[Kali 사이트](https://www.kali.org/get-kali/#kali-platforms)

Kali 리눅스는 해커들을 위해 제작된 리눅스 운영체제로, 공격 보안 전문 연구팀이 보안을 유지한다.
다양한 해킹도구와 보안이 미리 설치되어있으며 전부 무료이다.

2. 컴퓨터에 Kali 가상 컨테이너 설치

> 가상 컨테이너
>
> 현재 운영체제를 덮어쓰지않고 컴퓨터에 다른 운영체제를 설치할 수 있는 hosting 환경

아래의 오라클 사이트에서 버츄얼 박스를 운영체제에 맞춰 다운로드하자
[Oracle Virtual Box](https://www.virtualbox.org/wiki/Downloads)

CPU 나 메모리를 변경하기 위해서는 구동 중인 kali linux를 종료 후 설정이 가능하다

kali linux를 실행하면 ID와 PW를 입력하라고 뜨는데 kali/kali 가 디폴트이다.

2-2. 한글 설치하기

처음 칼리를 설치하면 한글이 지원되지않기때문에 한글 폰트를 설치 해야한다.

```
sudo apt update
sudo apt upgrade
```

한글 폰트 설치

```
sudo apt install -y fcitx-lib*
sudo apt install -y fcitx-hangul
sudo apt install -y fonts-nanum*
```

재부팅

```
sudo reboot
```

3. MetaSploit 프로엠워크 열기

4. 메타스플로잇에서 취약점 찾아보기
   해킹은 ASCII-art 소로만 달성할 수 있다.

대상 웹사이트에서 metasploit 명령줄에서 WMAP 유틸리티를 실행하고 취약점을 찾을 수 있는지 확인한다.

5. 메타스플로잇 데이터베이스에서 취약점을 이용할 수 있는 익스플로잇을 선택한다.
