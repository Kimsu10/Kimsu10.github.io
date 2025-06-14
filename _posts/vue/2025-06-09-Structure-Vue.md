---
layout: single
title: "Vue 어플리케이션의 기본 구조"
categories: Vue
author_profile: true
sidebar_main: true
tag: [Vue]
toc: true
toc_sticky: true
---

뷰 어플리케이션이 생성되면 아래와 같은 폴더와 파일이 생성된다

<p align="center">
<img src="/assets/images/Vue/1-6.png" width="95%"/>
</p>

여기서 어플리케이션을 실행하는데 중요한 파일이 4가지 있다

## package.json

- 어플리케이션에서 사용하는 `기본 정보`, `의존성 모듈`, `스크립트 명령어`를 가진 파일
- 프로그램을 생성한 시점의 버전 정보를 가지고있다

  ```json
  {
    "name": "vue-project",
    "version": "0.0.0",
    "private": true,
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "vue": "^3.5.13",
      "vue-router": "^4.5.0"
    },
    "devDependencies": {
      "@vitejs/plugin-vue": "^5.2.3",
      "@vitejs/plugin-vue-jsx": "^4.1.2",
      "vite": "^6.2.4",
      "vite-plugin-vue-devtools": "^7.7.2"
    }
  }
  ```

  | 키              | 의미                                                                                                                                                                                                                     |
  | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | name            | 어플리케이션의 이름을 나타내는 문자열                                                                                                                                                                                    |
  | version         | 어플리케이션의 버전을 [major].[mirror].[patch]로 나타내는 문자열<br>major: 하위 호환성이 없는 변경사항이 있을때 증가 <br> minor: 기능이 추가되거나 변경사항이 있을때 증가 <br> patch: 버그나 작은 수정사항이 있을때 증가 |
  | private         | 어플리케이션의 공개여부를 나타내는 논리 값 <br> 공개 저장소에 배포하지 않음 <br> 공익 목적이 아니라면 true로 설정                                                                                                        |
  | script          | 어플리케이션을 빌드, 실행하는 명령어를 등록                                                                                                                                                                              |
  | dependencies    | 어플리케이션 실행시 필요한 의존성 모듈을 정의<br> 어플리케이션 배포 및 서비스 환경에서 사용                                                                                                                              |
  | devDependencies | 어플리케이션 개발시 필요한 의존성 모듈을 정의                                                                                                                                                                            |

  <br/>

## Vue 어플리케이션의 실행 과정

- npm run dev → index.html → main.js → App.vue
  <br/>

## index.html

- <u>개발 서버 실행시 index.html 파일을 서버에 로드</u>
- 이 html 파일의 기본언어는 영어이다

  ```html
  <!DOCTYPE html>
  <!-- HTML 파일의 기본언어를 한국어로 변경 -->
  <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vite App</title>
    </head>
    <body>
      <!-- id 속성값이 app인 HTML 요소를 root 요소로 지정 -->
      <div id="app"></div>
      <!-- main.js 모듈을 불러오고 어플리케이션에서 사용할 패키지와 코드를 실행 -->
      <script type="module" src="/src/main.js"></script>
    </body>
  </html>
  ```

  <br/>

## main.js

- index.html에서 main.js 파일을 불러오면 뷰 어플리케이션 코드가 실행
- main.js는 <u>뷰 어플리케이션을 초기화하고 구성하는 역할</u>을 한다

  ```js
  import "./assets/main.css"; // main.css 파일을 불러와 컴포넌트에 스타일을 적용

  import { createApp } from "vue"; // vue 패키지에서 함수를 가져옴
  import App from "./App.vue"; // App.vue 파일을 불러와서 root 컴포넌트가 된다
  import router from "./router"; // Vue 애플리케이션에 라우터 기능을 추가하기 위해 router 모듈을 불러옴

  const app = createApp(App); // createApp() 함수로 뷰 어플리케이션의 인스턴트를 생성

  app.use(router);

  app.mount("#app");
  ```

<br/>

## App.vue

- 확장자가 .vue인 파일을 뷰에서는 `SFC`(Single File Conponent), `컴포넌트` 라고 한다
- 여러개의 컴포넌트가 생성되면 App.vue 파일이 root 컴포넌트의 역할을 한다

  > **root component**
  >
  > - 컴포넌트중에서 뷰 어플리케이션이 최초로 진입하는, 가장 상위에 있는 컴포넌트
  > - 트리 구조처럼 하위 컴포넌트로 뻗어나가는 형태로 구현

<br/>

## Vue 컴포넌트의 구조

- Vue의 기본구조에서 App.vue는 SFC 파일이다

<p align="center">
<img src="/assets/images/Vue/1-7.png" width="95%"/>
</p>

<br/>

## SFC

- SFC 파일에는 뷰 어플리케이션의 인스턴스 설정 정보가 들어있다
- 인스턴스 생성시 SFC 파일을 createApp() 함수의 매개변수로 전달  
  ➔ SFC 파일의 설정정보를 가져와 인스턴스를 생성한다

#### SFC의 구조

- SFC는 Vue의 특별한 파일형태로, 확장자가 vue인 단일 구성 요소이다

  > **단일구성요소**
  >
  > - 하나의 파일에 인스턴스 구성 요소와 관련한 모든 코드가 포함되는 형식
  > - 아래의 형식처럼 HTML, CSS, JS 를 한 파일안에 작성 할 수 있다
  >
  > ```js
  > <script>
  > export default {}
  > </script>
  > <template></template>
  > <sylte></sylte>
  > ```

- SFC는 `<script>`,`<template>`, `<style>` 태그로 영역을 구분한다

  | 영역     | 설명                                                                                                                                            |
  | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
  | script   | SFC 파일에 사용할 로직을 JS 로 작성 <br> export default 키워드로 객체를 내보냄 <br> Options API(뷰에 객체를 작성할때 지켜야하는 문법 규칙) 사용 |
  | template | HTML 코드를 작성하는 영역별도의 영역으로 분리                                                                                                   |
  | style    | template 영역에 작성한 요소에 CSS 스타일을 적용하기 위해 사용<br> 뷰에서만 적용되는 CSS 범위에 따른 구분은 따로 배워야함                        |
