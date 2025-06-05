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
  - 프로그램ㅇ르 개발하면서 vue의 내부동작을 확인하기 좋다
  - `vue.js`

# CDN 사용

웹 페이지에 vue.js 라이브러리 파일을 포함하는 경우에는 CDN 사용을 권한다
CDN 사이트에서 제공하는 Vue.js 라이브러리 파일은 아래의 주소를 사용해 쉽게 웹페이지에 적용할 수 있다

> - unpkg.com
> - jsDelivr.com
> - cdnjs.com

# npm과 vue-cli 설치

ES6를 사용하거나 Vue.js를 쉽게 배포하기위해 번들링을 할 필요가 있다.  
이때 Node.js의 패키지 매니저인 npm으로 번들러를 설치해야한다.

<br/>

- vue.js는 Node.js를 기반으로 실행되는 자바스크립트 프레임워크이다

  > [Node.js 다운로드](https://nodejs.org/ko/download)
  >
  > - LTS(Long Term Support) 버전이 안정성이 높으므로 LTS를 추천
  > - Current는 최신버전으로 안정성이 낮다

## 1. Node.js 설치

- Node.js를 <u>설치하면 npm이 자동으로 함께 설치</u>된다

  > [Node.js 설치 방법]()

  > **Node.js**
  >
  > - 브라우저 외부에서 JavaScript를 실행할 수 있는 크로스 플랫폼 오픈 소스 런타임환경을 제공하는 프레임워크

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

> [visual studio 설치 방법]()
