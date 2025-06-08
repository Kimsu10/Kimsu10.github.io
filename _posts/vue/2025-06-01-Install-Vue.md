---
layout: single
title: "Vue.js 개발환경 세팅"
categories: Vue
author_profile: true
sidebar_main: true
tag: [Vue]
toc: true
toc_sticky: true
---

vue.js 라이브러리는 배포용 버전과 개발용 버전의 파일을제공한다.

- **배포용**

  - vue.js의 라이브러리를 개발자가 알아볼 수 없도록 난독화와 압축을 함
  - 프로그램 개발을 완료하고 웹 어플리케이션을 공개할 때 사용
  - `vue.min.js`

- **개발용 버전**
  - 프레임워크 내부에서 발생하는 경고 및 디버그 모두를 모두 포함
  - 프로그램을 개발하면서 vue의 내부동작을 확인하기 좋다
  - `vue.js`

# CDN 사용

- 웹 페이지에 vue.js 라이브러리 파일을 포함하는 경우에는 CDN 사용을 권함
- Vue.js 라이브러리 파일은 아래의 주소를 사용해 쉽게 웹페이지에 적용할 수 있다

> - [unpkg.com](https://unpkg.com/)
> - [jsDelivr.com](https://www.jsdelivr.com/)
> - [cdnjs.com](https://cdnjs.com/)

# npm과 vue-cli 설치

Node.js의 패키지 매니저인 npm으로 번들러를 설치하면 ES6를 사용하거나 Vue.js를 쉽게 배포 할 수 있다

<br/>

- `vue.js`: <u>Node.js를 기반으로 실행되는 자바스크립트 프레임워크</u>

  > [Node.js 다운로드](https://nodejs.org/ko/download)
  >
  > - `LTS(Long Term Support)`: 버전이 안정성이 높으므로 LTS를 추천
  > - `Current`: 최신버전으로 안정성이 낮음

## 1. Node.js 설치

- Node.js를 <u>설치하면 npm이 자동으로 함께 설치</u>된다

  > **Node.js**
  >
  > - 브라우저 외부에서 JavaScript를 실행할 수 있는 크로스 플랫폼 오픈 소스 런타임환경을 제공하는 프레임워크
  > - [Node.JS 다운로드](https://nodejs.org/ko/download)

  <details>
    <summary>Node.JS 설치 방법</summary>
    <br/>
  1. 운영체제 및 사용할 버전을 선택해서 다운로드
     <img src="/assets/images/NodeJs/1-1.png" width="95%"/>

  2. 설치시 초콜리티 사용여부 설정
     <img src="/assets/images/NodeJs/1-2.png" width="95%"/>

  3. 노드 버전 및 설치 완료 확인
  <br/>
  <img src="/assets/images/NodeJs/1-3.png" width="50%"/>
  </details>

## 2. Vue CLI 설치

- npm을 사용해 Vue.js 를 설치하면 webpack, Browserigy 같은 모듈 번들러를 사용할 수 있으며, 대규모 웹 에플리케이션을 개발하기에도 좋다
- 아래의 npm 명령어로 vue.js를 설치 할 수 있다

  ```bash
  # 설치 명령어
  npm install -g @vue/cli

  # 설치 확인
  vue --version
  ```

  > - MacOS에서 Permission Denied가 발생한 경우 글로벌 옵션(-g)로인해 MacOS에서 보안상 막는 경우가 있다
  > - 이경우 sudo 명령어로 설치하고 비밀번호를 입력하면 된다
  >
  > ```bash
  > sudo npm install -g vue/cli
  > ```

## 3. VS code 설치

- vscode는 <u>소스코드를 작성하기위해서는 코드 에디터</u>이다

  <details>
  <summary>visual studio 설치 방법</summary>

    <p>
    1.  자신의 운영체제에 맞는 방법으로 다운로드
    <img src="/assets/images/NodeJs/1-4.png" width="95%">

    <br/>
    2. 사용시 설정
    <img src="/assets/images/NodeJs/1-5.png" width="95%"/>

    <br/>
    3. 컬러 테마 설정
    <img src="/assets/images/NodeJs/1-6.png" width="95%"/>
    <br/>
    <img src="/assets/images/NodeJs/1-7.png" width="95%"/>
    </p>

  </details>
