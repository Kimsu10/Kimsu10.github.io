---
layout: single
title: "정보 누출(Information Leak)"
categories: Security
tag: [Web, 보안]
sidebar_main: true
toc: true
toc_sticky: true
---

# 정보 누출 (Information Leak)

- 시스템이 의도치 않게 민감한 정보를 외부에 노출하는 보안 취약점
- 이 정보는 공격자에게 시스템의 구조, 사용자 정보, 또는 취약점을 파악할 수 있는 단서를 제공

## 예시

1. 오류 메시지를 통한 누출

- 백엔드에서 에러가 발생했을 때, 전체 스택 트레이스를 그대로 사용자에게 보여주는 경우

```bash
java.lang.NullPointerException at com.example.MyService.getUser(MyService.java:42)
```

➜ 이를 통해 서버의 언어(Java), 구조, 클래스 이름 등을 파악할 수 있음

2. 디버그 정보 노출

- 개발 중 사용하던 console.log, debug=true, 디버깅 툴이 프로덕션 환경에 그대로 남아있는 경우

3. URL에 민감한 정보 포함

```perl
https://example.com/reset-password?token=abc123
```

➜ 누군가 이 URL을 공유하거나 로그에 남기면 토큰 유출 위험

4. 의도치 않은 파일 접근

- 잘못된 서버 설정으로 .git 폴더, .env, 설정 파일, 백업 파일 등이 외부에서 접근 가능한 경우

5. API 응답 정보 과다

- API 응답에 사용자 비밀번호 해시, 내부 ID, DB 스키마 정보 등이 포함된 경우

## 대처 방안

1. 불필요한 서버 식별 헤더 제거

- 서버가 자동으로 추가하는 Server, X-Powered-By 같은 헤더는 정보 누출의 원인이 될 수 있다
- 예

```bash
Apache: ServerTokens Prod / ServerSignature Off
Express: app.disable('x-powered-by')
```

2. 깔끔한 URL 사용

- url에서 파일 접미사(.php, .asp, .jsp)를 사용않기

```bash
 /user/profile ✅
 /user/profile.php ❌
```

3. 일반 쿠키 매개 변수 사용

- HttpOnly, Secure, SameSite 속성 설정
- 쿠키에 민감한 정보(패스워드 등) 저장 금지

4. 클라이언트측 오류 보고 사용하지 않기

- 클라이언트 측 오류(예: 콘솔 로그, alert로 뜨는 디버그 정보)는 노출을 최소화

5. 자바스크립트 파일 최소화 또는 난독화

- 난독화는 완전한 보안책은 아니지만 보안 레이어 중 하나로 유용

6. 클라이언트 측 파일 최소화

- 클라이언트에 불필요한 개발용 파일, 디버깅 파일, 예비 기능 관련 스크립트 등이 포함되지 않도록 관리

---

> **OWASP Top 10**
>
> - 웹 보안에서 가장 흔한 취약점 목록.
> - 정보 노출은 A06:2021 "Vulnerable and Outdated Components"나 A01:2021 "Broken Access Control" 등과 연관 있다

> **Security Misconfiguration**
>
> - 잘못된 설정으로 인해 정보가 노출되는 경우
