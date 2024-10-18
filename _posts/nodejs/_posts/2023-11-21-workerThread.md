---
layout: single
title: "NodeJs는 동기일까 비동기일까"
categories: Nodejs
tags: NodeJs
sidebar_main: true
toc: true
toc_sticky: true
---

면접을 보고오면 항상 새로운것을 배워서 오는것같다.
면접스터디에서도 nodejs는 싱글쓰레드일까 멀티쓰레드일까에대해 논의한적이있었는데
왜 나는 싱글쓰레드 기반으로 알고있었을까..

# Nodejs는 무슨 쓰레드일까?

Node.js는 본래 이벤트 루프와 비동기 I/O를 활용하여 싱글 쓰레드 기반으로 동작해왔습니다. 이 구조 덕분에 여러 작업을 동시에 처리하는 것처럼 보일 수 있었지만, 실제로는 자바스크립트 코드 자체는 싱글 쓰레드에서 실행되었습니다.

Node.js 12버전부터는 worker_threads 모듈이 안정화되어 진정한 멀티쓰레딩을 지원하게 되었습니다. 이는 단순히 이벤트 루프를 이용해 비동기적으로 작업을 처리하는 것과는 다릅니다. worker_threads를 사용하면 다음과 같은 방식으로 멀티쓰레딩을 구현할 수 있습니다:

Worker Threads: 이 모듈은 메인 스레드와는 별개의 백그라운드 스레드에서 자바스크립트 코드를 실행할 수 있게 합니다. 각 워커 스레드는 독립적인 V8 인스턴스를 가지며, 이는 완전히 별개의 실행 환경을 의미합니다.

데이터 공유: 워커 스레드는 메인 스레드와 데이터를 공유할 수 있습니다. 이는 SharedArrayBuffer와 같은 공유 메모리 객체를 통해 이루어집니다.

메시지 패싱: 워커와 메인 스레드 간에는 메시지 패싱을 통해 통신할 수 있습니다. 이는 이벤트 기반의 메시지 전달 시스템을 사용하여 이루어집니다.

다음은 간단한 예제입니다:

```javascript
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
// 메인 스레드
const worker = new Worker(\_\_filename);
worker.on('message', message => console.log('Received from worker:', message));
worker.postMessage('Hello, worker!');
} else {
// 워커 스레드
parentPort.on('message', message => {
console.log('Received from main:', message);
parentPort.postMessage('Hello, main!');
});
}
```

이 예제에서 보듯이, 메인 스레드는 워커 스레드를 생성하고, 메시지를 주고받으면서 서로 통신합니다.

따라서, Node.js 12 버전부터는 worker_threads 모듈 덕분에 진정한 멀티쓰레딩을 사용할 수 있게 되었으며, 이는 이전의 싱글 쓰레드 기반의 이벤트 루프 모델과는 확실히 구별되는 기능입니다.

## worker Thread
