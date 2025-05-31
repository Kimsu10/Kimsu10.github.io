---
layout: single
title: "REST 방식으로 API 설계하기"
categories: Spring
author_profile: true
sidebar_main: true
tag: [SpringBoot, REST API]
toc: true
toc_sticky: true
---

RESTful API를 연습하면서 간단하게 정리한 글
{: .notice--info}

> SpringBoot는 개발자들이 쉽게 REST API를 구현할 수 있도록 `@RestController`, `ResponsEntity` 등 다양한 기능을 제공한다.  
> SpringBoot를 사용하기위해서는 JDK 17 버전 이상을 사용해야 한다.

# REST API 구현하기

- 사용할 빌드 도구는 `Gradle`
- 간단한 REST API를 만들기위해서 Spring Initializer에서 `Web Service`, `Lombok`, `Spring Boot DevTools`를 추가하고 다운르드
- 생성된 프로젝트는 기본적으로 `Tomcat을 내장`하며, `8080 포트`로 동작한다
- 프로젝트는 프로젝트 내에 생성된 Application의 `main() 메서드`를 통해 프로젝트를 실행한다

> **@(annotation)**
>
> - 스프링의 Bean으로 생성되고 관리된다

## Controller

- `@RestController`를 사용하여
-

## DTO

- @Data
- 프론트측으로 전달하려는 데이터를 의미

## Service

- `@RequiredArgsConstructor`: Lombok의 어노테이션으로 생성자를 생성

---

# 실행 흐름

1.  main() 함수 실행
2.  설정된 Gradle이 프로젝트를 빌드
3.  내장된 Tomcat 서버가 / 경로로 프로젝트를 실행
4.  나머지는 Spring MVC 구조 내에서 실행

# 의존성 주인(Dependency Injection)

- 객체와 다른객체가 연결될때 외부에서 필요한 객체를 찾아서 연결해주는것
