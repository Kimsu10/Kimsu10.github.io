---
layout: single
title: "크로스 사이트 스크립팅 공격"
categories: Basic
tag: [Web, 보안]
sidebar_main: true
toc: true
toc_sticky: true
---

# 크로스 사이트 스크립팅 공격

## 개념

## 종류

### 1. Stored Cross Site Scripting Attack

#### 대안 방법

##### 1. 이스케이프 HTML 문자

##### 2. 콘텐츠 보안 정책 구현

### 2. Reflected Cross Site Scripting Attack

#### 대안 방법

##### 1.HTTP 요청에서 동적 콘텐츠 회피

### 3. DOM 기반 크로스 사이트 스크립팅 공격

#### 대안 방법

##### 1. URI 조각에서 동적 콘첸츠 회피

---

## 🗒️ 요약

사이트 스크립팅 공격은 사용자가 사이트의 페이지를 볼 때 공격자가 자바스크립트 코드를 주입하는 공격이다.  
일반적으로 데이터베이스, HTTP 요청, URI 조각에서 오는 동적 콘텐츠에 악의적인 자바스크립트를 주입한다.  
동적콘테츠의 HTML 제어 문자를 이스케이프 하고 인라인 자바스크립트를 실행하지 못하게 하는 콘테느 보안 정책을 설정하여 크로스사이트 스크립팅 공격을 방지할 수 있다.
