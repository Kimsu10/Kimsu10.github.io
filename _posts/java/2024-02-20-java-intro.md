---
layout: single
title: "Java 환경 구축"
categories: Java
tag: Java
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

네이버 클라우드 캠프 수업과 이것이 자바다를 읽고 정리하였습니다.

## 1. 개발환경 구축

- JDK 다운로드 : [https://www.oracle.com/kr/java/technologies/downloads/#java17](https://www.oracle.com/kr/java/technologies/downloads/#java17) + 변수설정(내 PC > 고급설정 > 환경변수 추가 > path에 bin 위치 추가 후 가장 위로 배치)
- 이클립스 다운로드: [https://www.eclipse.org/downloads/packages/release/2021-12/r](https://www.eclipse.org/downloads/packages/release/2021-12/r)

## 2. 자바 기초

```jsx
자바 소스 파일(Hello.java)
→ javac 명령어(컴파일)
→ 바이트 코드 파일(Hello.class) *개발 완료된 자바 프로그램 형태
→ java 명령어, 운영체제별 JVM 구동
```

- `소스 파일(.java) 작성 후 컴파일` 해야 한다.(이것이 자바다 p13~)
- java 명령어는 JDK와 함께 설치된 자바 가상 머신(java Virtual Machine, JVM)을 구동시켜 바이트 코드 파일을 완전한 기계어로 번역, 실행

<aside>
⭐️ JDK = JVM + 개발에 필요한 도구

</aside>

- **바이트코드 파일**은 운영체제와 상관없이 모두 동일한 내용으로 생성,
  **자바 가상 머신**은 운영체게별로 다름(윈도우용JVM / 맥용JVM)

<aside>
⭐️ JRE(자바 실행환경, Java Runtime Environment) = JVM + 표준 클래스 라이브러리

</aside>

## 3. 이클립스

- File > new > project > java project > 파일 생성(p20~26)
  생성된 파일의 src 우클릭 > new > class (Name의 첫 글자는 대문자로, public static 체크)
  인코딩 설정(p23) / window > ptrferences > general > workspace > other: UTF-8
- sysout 작성 후 ctrl+space = System.out.println();
- F11로 실행

### 3.1 규칙

- class 생성: 숫자로 시작X, 공백 포함X, 소스파일 명과 대소문자가 완전히 일치해야 함, 대문자로 시작해야 함
- mail()의 메소드 블록으로 실행. 실행 진입점(entry point)라고 부름
- 주석: 한줄(//…), 범위(/_…_/)
