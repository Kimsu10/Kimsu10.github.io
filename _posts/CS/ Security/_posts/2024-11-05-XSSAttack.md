---
layout: single
title: "크로스 사이트 스크립팅(XSS)"
categories: Security
tag: [Web, 보안]
sidebar_main: true
toc: true
toc_sticky: true
---

# 크로스 사이트 스크립팅 공격(Cross-Site Scripting)

## 개념

- 웹사이트에 악성코드(JavaScript)를 삽입하여, 다른 사용자의 브라우저에서 해당 스크립트가 실행되도록 유도하는것
- 주로 입력값이 필터링되지 않거나, 출력 시 이스케이프 처리가 누락된 경우 발생
- 예: 사용자의 쿠키 탈취, 세션 하이재킹, 악성 동작 수행

## 종류

### 1. Stored(저장형) XSS

- 악성 스크립트가 서버에 저장되어, 여러 사용자에게 지속적으로 노출됨
- 예: 게시판 글, 댓글, 프로필 정보에 <script> 삽입

#### 대안 방법

**1. 이스케이프 HTML 문자**

- 출력 시 HTML, JavaScript 문맥에 맞게 특수문자 변환
- 예: `<` → `&lt;` , `>` → `&gt;` , `"` → `&quot`;
- 서버 또는 프레임워크에서 자동 제공되는 경우도 있다 (ex. Thymeleaf, Handlebars, React)

**2. 콘텐츠 보안 정책 구현 (CSP, Content Security Policy)**

- 스크립트 실행 위치와 소스를 제한하는 HTTP 응답 헤더
- 인라인 스크립트 및 외부 JS URL 제어 가능

```http
Content-Security-Policy: script-src 'self'
```

**3. 사용자 입력 필터링 및 검증**

- 입력 시점에서 <script>, onerror=, javascript: 등의 키워드 제거 또는 제한
- 화이트리스트 방식 권장 (허용할 태그만 허용)

**4. HttpOnly, Secure 플래그 설정**

- Set-Cookie에 HttpOnly를 추가하여 JS에서 쿠키 접근 차단
- Secure 플래그로 HTTPS 연결에서만 쿠키 전송

```http
Set-Cookie: sessionId=abcd1234; HttpOnly; Secure;
```

**5. 프레임워크의 보안 기능 활용**

- React, Vue, Angular 등은 기본적으로 출력 시 이스케이프 처리를 수행함
- 직접 innerHTML을 사용하거나 v-html을 쓸 경우에는 주의 필요

**6. WAF(Web Application Firewall) 설정**

- 웹 방화벽에서 XSS 공격 패턴을 탐지하고 차단 가능
- 예: `<script>`, `onmouseover=, eval()` 등의 패턴 차단

**7. 입력과 출력의 책임 분리**

- 저장할 때는 원본을 저장하고, 출력할 때만 안전하게 변환해서 보여주는 것이 안전

---

### 2. Reflected(반사형) XSS

- 악성 스크립트가 URL 또는 입력값에 포함되어 서버로 전송
- 서버가 이를 검증 없이 HTML에 반영하면서 사용자 브라우저에서 실행
- 주로 피싱 이메일, 단축 URL 등을 통해 사용자가 링크를 클릭하도록 유도

#### 대안 방법

**1. 출력 시 이스케이프 처리**

**2. 사용자 입력 검증 및 필터링**

- URL 파라미터, 폼 입력 등 모든 입력값에 대해 화이트리스트 검증 적용

**3. 콘텐츠 보안 정책(CSP) 적용**

- 인라인 스크립트, 외부 스크립트 제한으로 피해 축소
- 완벽한 방어는 아니지만 2차 피해 방지에 효과적

**4. URL 검증 및 리디렉션 처리**

- 리디렉션 대상 URL이나 동적 메시지 등은 반드시 검증 후 반영

**5. 예외: 서버에서 HTML 렌더링 시 주의**

- 템플릿 엔진을 사용하는 경우 (ejs, thymeleaf, jsp)에도 <%= input %>은 XSS 위험
- 항상 escape() 버전 사용 (<%= input %> → <%= fn:escapeXml(input) %> 등)

---

### 3. DOM 기반 XSS

- 스크립트가 서버가 아닌 브라우저(클라이언트)의 자바스크립트 동작에서 발생
- 클라이언트 측 JS 코드가 location.hash, document.URL 등에서 입력값을 받아 DOM을 조작할때 발생
- 서버가 관여하지 않기 때문에 WAF, 서버 필터링 등으로는 방어되지 않음

```js
const userInput = location.hash;
document.getElementById("output").innerHTML = userInput;
```

#### 대안 방법

**1. innerHTML 사용 지양**

- textContent 또는 innerText 사용
- 대체로 element.textContent = userInput 방식 사용 권장

**2. 사용자 입력에 대해 클라이언트 측 이스케이프 적용**

**3. DOMPurify 등 전문 XSS 방지 라이브러리 사용**

- DOMPurify 같은 라이브러리는 HTML 내용을 정제(sanitize)해 안전하게 만들어 줌

**4. 클라이언트 코드에서 입력값 검증**

- location.search, location.hash, document.referrer 등에서 값을 사용할 때는 반드시 검증 또는 필터링 후 사용

**5. CSP(Content Security Policy) 적용**

- 인라인 스크립트, eval(), 외부 스크립트 제한으로 DOM XSS의 피해를 줄일 수 있음

```http
Content-Security-Policy: default-src 'self'; script-src 'self'
```

**6. 이벤트 핸들러 동적 삽입 금지**

- JS 코드에서 element.setAttribute("onclick", "...") 또는 element.onclick = ... 등의 사용은 피해야 함

---

## 🗒️ 정리

사이트 스크립팅 공격은 사용자가 사이트의 페이지를 볼 때 공격자가 자바스크립트 코드를 주입하는 공격이다.  
일반적으로 데이터베이스, HTTP 요청, URI 조각에서 오는 동적 콘텐츠에 악의적인 자바스크립트를 주입한다.  
동적콘테츠의 HTML 제어 문자를 이스케이프 하고 인라인 자바스크립트를 실행하지 못하게 하는 콘테느 보안 정책을 설정하여 크로스사이트 스크립팅 공격을 방지할 수 있다.
