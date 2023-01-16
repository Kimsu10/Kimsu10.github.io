---
layout: single
title: "React npm i 에러"
tag: [react, nodejs]
sidebar_main: true
toc: true
toc_sticky: true
author_profile: true
---

학원에서 작업했던 프로젝트들을 리펙토링하기위해 프론트쪽 작업물을 클론해왔다.
프론트분들이 React를 사용하여서 react를 인스톨하고 npm start를 눌렀는데
![](https://velog.velcdn.com/images/kimsu10/post/f382d02d-cf96-4027-b852-980e1d454310/image.png)

리엑트 스크립트 라이브러리를 못 찾는다고 한다.
이 에러는 다른 프론트분들도 같은 에러가 났었고 이유를 찾아보니 리엑트v17이상부터 나타나는 문제였다.
리엑트 17이상에서는 peerDependency로 추가하지 않은 모듈은 npm설치를 할때 오류가 발생하는 것이라고 한다.
그런데 조금더 구글링해보니 peerDependency문제는 NPM v3~v6까지는 경고만 뜨고 자동적으로 설치되었으나 npm7부터는 차단되었다고한다. 때문에 npm7부터 발생하는 문제라고도..(리엑트17이상이냐.. npm7이냐.. 둘다냐..)

> npm설치 전후의 peer deps를 환인 하는 방법은 `npm info name-of-module peerDependencies`를 입력하면된다.

## 실패1: rm -rf nodemodule 후 다시 npm i

npm install이 안되는거같은데 `rm -rf node_modules`를하고 `npm i`를 해보았다.
![](https://velog.velcdn.com/images/kimsu10/post/c7ac80af-744c-4555-a2c0-f245fe233cfe/image.png)

혹시나 싶어서 해봤는데 역시나 안된다.

## 실패2. npm i global react-scripts

![](https://velog.velcdn.com/images/kimsu10/post/fd9af2ea-c851-47da-9946-860aa51f00f5/image.png)
세이브 버전도 안됨.
![](https://velog.velcdn.com/images/kimsu10/post/8cfbb449-4337-4ce7-a8ae-3b56592108da/image.png)

## 실패3. 버전을 17미만으로 낮추기

react16.8.0이 된다는 글을 보고 버전을 낮추어 보았다.
`npm install react@^16.8.0 react-dom@12.8.0` 입력 후 `npm i`
![](https://velog.velcdn.com/images/kimsu10/post/46380fd2-edb2-40cf-af0f-9ddba6049e66/image.png)
실패...계속해서 의존성 문제가 생긴다면 `--force` 명령어나 `--legacy-peer-deps` 명령어를 입력하라고한다.
force명령어는 많이봤는데 --legacy--peer-deps는 처음봤는데 둘다 강제로 설치한다고한다.

> # force & legacy-peer-deps의 차이점

### 1. -force

force의 경우 충돌을 우회하며 필요한경우 패키지의 의존성을때문에 추가적인 패키지를 설치한다.

### 2. --legacy-peer-deps

위 명령어는 어떤 버전으로도 롤백하지않으며 peer dependencies를 자동적으로 설치하지 않는다. 즉, 충돌하는것을 무시하고 그냥 설치한다는 것이다.

## 실패4. npm i --ignore-peer-deps

peer dependency문제라고 생각해서 무시하고 설치해봤는데 안되었다..

## 성공1. npm i -f

![](https://velog.velcdn.com/images/kimsu10/post/f0b7de71-648c-4e69-81ad-f540f6aac633/image.png)

## 성공2. npm i --legacy-peer-deps

![](https://velog.velcdn.com/images/kimsu10/post/7dde8ee9-9111-4472-a0f4-991631260abd/image.png)

방법은 강제 설치뿐인것인가..일단 서버가 돌아가서 나중에 더 알게되면 추가 작성해야겠다.
