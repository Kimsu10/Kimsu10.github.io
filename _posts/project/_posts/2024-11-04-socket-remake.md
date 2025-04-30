---
layout: single
title: "소켓을 사용한 퀴즈 다시 만들기"
categories: project
tag: [React, Node.js, Socket.io]
sidebar_main: true
toc: true
toc_sticky: true
---

Socket.io를 사용해서 실시간 시험 매칭을 만들었는데, 아무리 생각해도 사용자가 없을 거 같다.  
그래서 좀 더 간단한 실시간 퀴즈를 생각하고 팀원과 논의하였고, 새로운 아이디어로 가기로 했다.  
기존의 코드를 모두 지우고 다시 생각해보자.

## 생각 정리

### 구현 방법

- 1. 브라우저의 URL이 바뀌면 소켓은 연결을 끊고 새로운 Socket을 연결한다.
     ➔ 세션 정보를 유지할 필요성

  - 1. 토큰을 사용해서 사용자를 기억
  - 2. Cookie로 사용자 정보를 제공

  ➔ 사용자 재입장 가능 및 타인 접속 불가하게 만들기
  <br/>

- 2. 기존의 랜덤한 문제들을 통일화해야함 ⭐️

  - 1. 방 생성시 roomName과 owner, 문제 전송
    - 목데이터로 10개의 문제를 먼저 불러오기  
      ➔ 어떻게? 방생성시의 페이지에는 과목 선태뿐인데
      ➔ 유저가선택한 정답과 문제의 정답을 서버에서 비교한다?  
      ➔ 프로젝트 목표와 어긋나기시작함
  - 2. 방 생성시 roomName과 owner, 문제개수 정보만 전송하기
    - 문제를 보여주는것과 정답처리를 프론트에서 담당
    - 유저가 정답을 맞추면 event를 보내고 받아오게하기
    -

- 3. 게임이 종료되었을때 보여줄 결과 데이터는 어떻게 할까
  - 1. 데이터베이스에 저장
       ➔ 계속 필요한 데이터 : 사용자 EXP, 승리 수, 패배 수
  - 2. Socket.IO 서버의 메모리에 저장
       ➔ 메모리 초기화시 데이터가 사라지니까 일시적으로 보여줄 데이터 : 랭킹 1-3위

### UserFlow 생각

- **방장**

  - 1. Node.js의 Socket 서버에 접속
  - 2. 과목을 선택하고 방을 생성 ➔ /quiz/:roomname 으로 이동후 대기상태
  - 3. 매칭 취소 클릭시 방삭제
  - 3. 원하는 인원 입장시 시작하기 클릭시 문제 컴포넌트로 변경

- **참여자**

  - 1. Socket 서버에 접속
  - 2. roomname을 입력해서 대기방에 입장  
       (고민: 대기방 목록이 있어야하지 않을까? ➔ 그럼 DB에 room 테이블을 사용&대기페이지 필요)
  - 3. 방장이 게임 시작시 문제 컴포넌트로 변경

- **공통** : 게임 진행 및 점수 관리
  - 1. 한문제 풀고 정답과 정답자 Modal로 보여주기
    - 문제 푸는 시간은 20초 | 정답자와 문제는 5초 보여주기 ➔ Socket 이벤트로 관리
    - rooms객체에 username과 저장해가면서 게임을 진행
    - 시간 경과시 다음문제 시작
  - 2. 다 풀면 Winner 1인과 2,3등 보여주기
    - token의 유저정보를 사용해서 User 테이블의 win,lose 카운트와 EXP 추가 (PATCH)
    - 게임 종료시 방삭제

## 단계별 구현 코드

### 1. 방생성

```js
// front
const handleRoomCreation = () => {
  const roomId = Math.random().toString(36).substring(2, 10);
  const token = sessionStorage.getItem("accessToken");

  console.log("방 생성:", roomId);
  setRoomName(roomId);

  socketRef.current.emit("createRoom", {
    roomName: roomId, // 방 아이디
    selectedName: selectedImage, // 선택한 과목
    token: token, // 방장의 토큰
  });

  navigate(`/1on1/${selectedImage}/${roomId}`); // 대기방 페이지로 이동
};
```
