---
layout: single
title: "WebSocket"
categories: Error
tags: [NodeJs, WebSocket]
sidebar_main: true
toc: true
toc_sticky: true
---

# WebSocket

웹소켓을 사용하여 무언가를 개발했다고하면 항상 socket.IO를 사용했다고 한다.  
하지만 **socket.IO**는 웹소켓을 활용한 라이브러리로 **웹소켓 자체는 아니다**.

그럼 `웹소켓`이란 무엇일까?

기존의 `단방향 통신의 문제를 개선`하고, 서버와 클라이언트가 `실시간으로 데이터를 주고받을 수 있도록 설계`된 `양방향 통신 프로토콜`이다.

우선 기존의 단방향 통신에 대해 알아보자.

---

### 0. 단방향 통신

단방향 통신은 주기적으로 서버에 업데이트가 있는지 확인 요청을 보내고, 업데이트 된 내용이 있다면 내용을 가져오는 단순한 방식이다.

대표적으로 `Polling(폴링)` 이 있다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F3GPib%2FbtsJ9vhOhsf%2FFRnXG2YneKVczMvgJuOHZK%2Fimg.png)

---

### 1. Web Socket

웹소켓은 `HTML5에서 추가`된 `실시간 양방향 데이터 전송 기술`로, HTTP와 달리 `WS 프로토콜을 사용`한다.

HTTP 프로토콜과 PORT를 공유할 수 있어 다른 PORT에 연결할 필요가 없으며,
`일단 웹소켓 연결`이 이루어지면 그 이후로는 `계속 연결된 상태`이기 때문에 따로 업데이트 요청을 보낼 필요가 없다.

업데이트 할 내용이 있다면 서버는 바로 클라이언트에 알린다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Flkbkc%2FbtsKbDLZWy1%2F0bdofTxCzLuXvajwykl3xK%2Fimg.png)

---

### 2. SSE(Server Sent Event)

WebSocket 처럼 `처음 한번만 연결`하면 서버가 클라이언트에 `지속적으로 데이터를 보내는` SSE라는 기술도 등장하였는데,

서버에서 데이터를 보내주기만 하면되는 `단방향 통신`에서 사용하면 좋다.

`EventSource`라는 객체를 사용하며 웹소켓과 달리 클라이언트에서 서버로 데이터를 보낼 수 없는 단방향 통신다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbonY3Y%2FbtsJ9KGeAEy%2FgypiQSGxXMYVM7gAGKx2A0%2Fimg.png)

---

## 정리

### 1. 단방향 통신

단방향 통신은 `우편으로 소식을 주고받는것`과 같다.  
서버에 새로운 소식이 있는지 확인하기위해 우편을 보내야 하고, 그때그때 응답을 받아야 한다.

이때문에 정보가 지연될 수 있어 실시간 소통이 어렵다는 한계가 있다.

### 2. 양방향 통신

양방향 통신은 `전화 통화`와 같다.  
한쪽이 말을 하면, 다른 쪽이 즉시 응답할 수 있다.  
실시간으로 상호작용할 수 있어 정보의 즉각적인 전송이 가능하다.

---

## ws 모듈로 웹소켓 통신하기

> **ws module**
>
> Node.js 환경에서 WebSocket 프로토콜을 구현하기 위한 경량 라이브러리  
> 브라우저 호환성이 좋으며 비동기적으로 처리하여 양방향 통신 가능

&nbsp;

### 1. package.json 작성

package.json에 내가 사용할 라이브러리들을 추가하고 설치한다.

```js
  "devDependencies": {
    "nodemon": "^3.1.7"
  },
  "dependencies": {
    "cookie-parser": "^1.4.7",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "express-session": "^1.18.1",
    "morgan": "^1.10.0",
    "ws": "^8.18.0"
  }
```

&nbsp;

### 2. index.js 작성

```js
import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
console.log(port);

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// HTTP 서버 생성
const server = http.createServer(app);

// WebSocket 서버
const wss = new WebSocketServer({ server });

// WebSocket 연결 이벤트 핸들러
wss.on("connection", (ws) => {
  console.log("✅ client connected WebSocket");

  ws.on("message", (message) => {
    // 받은 데이터
    console.log(`📥  get : ${message}`);
    // 보낼 데이터
    ws.send(`${message}`);
  });

  ws.on("close", () => {
    console.log("🔌 : client disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("WebSocket is running");
});

server.listen(port, () => {
  console.log(`✅ servcer is listening on http://localhost:${port}`);
});
```

&nbsp;

### 3. HTML 작성

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WSS Test</title>
  </head>
  <body>
    <h1>WebSocket Test</h1>
    <button id="connectBtn">웹소켓 연결하기</button>
    <input type="text" id="messageInput" placeholder="입력" />
    <button id="sendBtn">메세지 보내기</button>
    <ul id="messages"></ul>

    <script>
      let socket;

      // WebSocket 연결
      document.getElementById("connectBtn").addEventListener("click", () => {
        socket = new WebSocket("ws://localhost:4000");

        socket.onopen = () => {
          console.log("✅ WebSocket connection established");
          const messageList = document.getElementById("messages");
          const li = document.createElement("li");
          li.textContent = "✅ Connected to WebSocket server";
          messageList.appendChild(li);
        };

        socket.onmessage = (e) => {
          console.log("📥 Received from server:", e.data);
          const messageList = document.getElementById("messages");
          const li = document.createElement("li");
          li.textContent = `📥 Server: ${e.data}`;
          messageList.appendChild(li);
        };

        socket.onclose = () => {
          console.log("🔌 WebSocket connection closed");
          const messageList = document.getElementById("messages");
          const li = document.createElement("li");
          li.textContent = "🔌 Connection closed";
          messageList.appendChild(li);
        };
      });

      // 메시지 전송
      document.getElementById("sendBtn").addEventListener("click", () => {
        const messageInput = document.getElementById("messageInput");
        const message = messageInput.value;
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(message);
          console.log("📤 Sent:", message);
          messageInput.value = "";
        }
      });
    </script>
  </body>
</html>
```

&nbsp;

### 4. 서버실행 & 브라우저 접속

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F3XsA7%2FbtsKbmw467D%2FwShnBYjPv73lkkRjsxQIFk%2Fimg.png)
&nbsp;

### 5. 웹 소켓 연결

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdwzyO9%2FbtsKbBAGsHn%2FyiWHcurettEHO3QrSt5Q21%2Fimg.png)
&nbsp;

### 6. 메세지 보내기

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGO8nH%2FbtsKaP1wQrP%2FcbuREPRi6DAahYXR1OLr51%2Fimg.png)
&nbsp;

### 7. 연결 종료

브라우저를 종료하면 연결이 해제된다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F7BZLp%2FbtsKaOOlhFZ%2FLaVSr5YBjufymlTJhFuCVK%2Fimg.png)
