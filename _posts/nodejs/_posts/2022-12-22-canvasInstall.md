---
layout: single
title: "npm i canvas ERR:1"
categories: Error
tags: [NodeJs, NPM, ERROR]
sidebar_main: true
toc: true
toc_sticky: true
---

크롤링과 스크린샷이 작동하는것까지 확인하고 이제 원하는 정보가 있는곳에 canvas를 이용할 때가 왔다.
![](https://velog.velcdn.com/images/kimsu10/post/ecab4109-2a8e-4653-8e3e-fcd16c6b657c/image.png)  
그래서 canvas를 설치하려고 `npm install canvas` 입력했다.

# 1. npm ERR: code1

![](https://velog.velcdn.com/images/kimsu10/post/3fe9b5b2-1542-49f6-9def-db0d98947a2a/image.png)

.....? 이렇게 많은 빨간글씨는 처음봤다. 현재 node버전과 npm 버전(알아볼게있어서 입력해둠)
![](https://velog.velcdn.com/images/kimsu10/post/8a4987e0-2c4b-4cad-b43f-918d05fb2443/image.png)

> ## node-gyp가 뭐지
>
> node-gypNode.js용 네이티브 애드온 모듈을 컴파일하기 위해 Node.js로 작성된 크로스 플랫폼 명령줄 도구입니다. 여기에는 이전에 Chromium 팀에서 사용했던 gyp-next 프로젝트의 공급업체 사본이 포함되어 있으며 Node.js 기본 애드온 개발을 지원하도록 확장되었습니다.
> Node.js 자체를 빌드하는 데 사용 되지 node-gyp않습니다.by npm공식문서

좀더 찾아보니 GYP(generate your project)는 빌드 자동화 도구로 파이썬으로 작성된 빌드 시스템이라고한다.
nodegyp는 에드온을 컴파일하는 도구로 컴퓨터에서 컴파일 해야한다.
그래서 `npm install -g node-gyp`를 입력하여 설치해보았다. 효과는 없었다.

> # 첫번째 시도: node-gyp 재설치

에러 메세지에 뜨는 가장 많은 단어가 node-gyp였다.
그래서 지우고 다시 깔아보았는데 변하는 것은 없었다.
![](https://velog.velcdn.com/images/kimsu10/post/f5218eb2-bba5-4fd3-94af-a4e6cc9a50dc/image.png)
분명 설치는 되어있는데 사용할 수 없단말이지..

> # 두번째 시도: node 버전 낮추기

버전을 낮추면 작동하는것들이 생각보다 많은것같다.
설치가 안되던 내 node 버전은 18.12였고 15로 낮추니 설치가 되었다.
근데 굳이 버전을 낮추고 싶지않아어서 이것 저것 시도해보았다.

> # 세번째 시도 : 공식사이트

[NPM canvas readme](https://www.npmjs.com/package/canvas?activeTab=readme)
그 다음으로 시도해 본것은

1. `brew install pkg-config cario pango libpng jpeg giflib librsvg`를 입력.

![](https://velog.velcdn.com/images/kimsu10/post/d310660a-4e96-4625-a841-5054d7d0c264/image.png)

사진에보면 'xcode-select --install'을 입력하여 설치하라고한다. 설치해주자.

2. `xcode-select --install`을 입력.
   xcode는 npm공식문서에서 macOS가 10.15버전 이상인경`xcode-select --install`을 입력하여 `Xcode Command Line Tools`를 실행가능하게 만들어야한다고 쓰여있었다.
3. `brew doctor` 을 입력.

![](https://velog.velcdn.com/images/kimsu10/post/79cb15e3-647f-4092-8174-cecdff3cc645/image.png)

4. 설치된 canvas 를 지우기
   canvas삭제: `npm uninstall canvas`

   ![](https://velog.velcdn.com/images/kimsu10/post/3a540912-ba57-49fe-80c6-76dbc0a86d3b/image.png)

5. npm audit fix 실행  
   `npm audit fix` 입력했으나 나는 안먹혀서 `npm audit fix --force`

![](https://velog.velcdn.com/images/kimsu10/post/edc6558d-9c11-4603-b2a7-0be694dc5264/image.png)

![](https://velog.velcdn.com/images/kimsu10/post/d37440b9-3144-478b-ae19-2eca89f5e135/image.png)

6. canvas 재설치: `npm install canvas`

   ![](https://velog.velcdn.com/images/kimsu10/post/33d0a30a-307b-4b04-b364-caba06bd1f0d/image.png)

7. 결과 확인
   ![](https://velog.velcdn.com/images/kimsu10/post/6fed2703-ad30-45fa-a524-4f6629d2d996/image.png)
   잘 설치되었다.

매번 느끼는거지만 에러와 공식사이트를 잘 읽어보면 해결되는거같다.
