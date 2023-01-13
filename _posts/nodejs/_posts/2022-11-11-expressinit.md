---
layout: single
title: "Express 초기환경세팅"
author_profile: true
sidebar_main: true
categories: Nodejs
---

# 1. EXPRESS 설치

> 1.  설치 방법

프로젝트를 진행할 폴더를 만들고 해당 경로로 진입한다.

```
mkdir myapp
cd my app
```

`npm init -y` 명령어를 사용하여 작업할 어플리케이션에 `package.json`파일을 생성한다.
`-y`를 입력하지 않으면 다양한 내용을 입력하도록 요구하기때문에 `-y`명령어를 통해서 디폴트 값으로 제공하는 기본 설정 값을 남겨두었다.

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "app.js", //index.js -> app.js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

메인이 되는 파일의 명칭은 app.js로 변경하였다.

```
npm install express
```

npm 명령어로 express를 설치하여 배포용으로 쓰일 패키지임을 명시하는 `package.json`파일 안의 "dependency list"에 저장한다.

# 2. nodemon

nodemon은 node에서 코드수정이 일어났을때 수정사항이 서버에 자동으로 반영될수 있도록 자동으로 서버를 켜주는 패키지이다.

> 1. 설치 방법

npm을 사용하여 nodemon을 설치한다.
npm install 뒤에 `-g`를 붙임으로써 global 변수로 nodemon을 설치 할 수 있다.

```
npm install nodemon
npm install -g nodemon
```

설치 후 package.json 내부의 npm script start 명령어 란에 아래와 같이 새롭게 nodemon을 경유하여 app.js 를 실행한다는 의미의 명령어(`nodemon app.js`)를 추가해주면 `npm start` 명령어 만으로 nodemon을 실행할 수 있다.

```
"scripts":{
"start" : "nodemon app.js"
```

nodemon은 디렉토리를 계속해서 모니터링하며 변경사항이 있을때만다 스크립트를 다시 시작한다.
서버를 종료하지 않고 수동으로 재시작 하는 방법은 서버가 실행중인 터미널 창에 `rs`를 입력하는 것이다.

> rs 이미지 넣기

# 3.CORS(Cross-Origin Resource Sharing)

현재의 웹 브라우저는 동일한 출처의 주체끼리만 통신하게 하여 보안성을 향상시키기위한 SOP(Same Origin Policy)정책 때문에 서로 다른 출처의 http통신을 막아두었다.
하지만 백엔드와 프론트 서버가 서로 다른 도메인에서 운용되는 현재의 3세대 웹 서비스 환경에서 동일한 출처에서만 리소스를 주고 받을수 없는것이 현실이다.
여기서 CORS를 사용하는 이유가 나타난다.
CORS를 통해 서로 다른 두개의 origin/domain끼리 데이터를 주고받게 설정하여 필요한 경우에 통신할수 있다.

> 설치방법

```
npm install cors
```
