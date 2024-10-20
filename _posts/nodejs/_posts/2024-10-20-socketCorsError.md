---
layout: single
title: "SocketIO CORS 에러"
categories: nodejs
tags: [NodeJs, WebSocket, SocketIO]
sidebar_main: true
toc: true
toc_sticky: true
---

웹소켓을 사용한 간단한 통신을 해보고 프로젝트를 시작했다.
JAVA 서버를 메인으로하고 React를 사용한 프론트엔드 서버와 NodeJs를 사용한 Socket 서버를 연결하면서 에러가 발생했다.
바로 CORS 에러!
![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbpSMdh%2FbtsKdMvqAMP%2F526e8kaUyQY49bwC0hWJU0%2Fimg.png)

원인은 socket에서 허용하는 origin 주소였다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDv8Yw%2FbtsKdGhM8BO%2FHW2qZLbtbQKe8AJG1mEBBk%2Fimg.png)

http://127.0.0.1:3000 이라는 주소를 http://localhost:3000을 추가해주니 모든에러가 사라졌다.

---

책을 보며 간단한 웹소켓을 만들어봤을때도 같은 문제가 발생했는데 대수롭지않게 넘겼다.

그런데 프로젝트를 시작하면서 이렇게 발목을 잡다니.. 발생했던 에러들은 잘 정리하고 가자..

정리
CORS 정책은 요청의 출처가 서버의 CORS 설정과 일치해야만 요청이 허용된다.

프론트에서는 localhost:4000으로 연결을 시도하는데 socket.io에서는 127.0.0.1:3000으로 설정해두었고,

localhost와 127.0.0.1은 브라우저에서 서로 다른 출처로 인식되기때문에 CORS 에러가 발생했다.

CORS 정의

CORS(Cross-Origin Resource Sharing) 정책은 웹 브라우저가 웹 페이지에서 자원을 요청할 때, 다른 출처의 자원에 대한 접근을 제어하는 메커니즘이다.

이 에러는 클라이언트와 서버가 서로 다른 출처에서 요청을 할 때 발생한다.

기서 "출처"는 프로토콜(예: http), 도메인(예: localhost), 포트(예: 3000)의 조합으로 정의된다.
