---
layout: single
title: "SpringBoot"
categories: Spring
author_profile: true
sidebar_main: true
tag: [SpringBoot, 면접]
toc: true
toc_sticky: true
---

> **Spring Boot**
>
> - 기존의 복잡한 설정없이 Spring 애플리케이션을 개발할 수 있도록 도와주는 프레임워크

# SpringBoot의 구조와 특징

## 1. 의존성 주입 (Dependency Injection)

- 객체 간의 의존성을 직접 생성하지 않고,  
  ⭐️ <u> Spring 컨테이너가 객체를 대신 생성 및 주입</u>

- **사용 방법**

  - **등록**:`@Component`, `@Service`, `@Repository`, `@Controller` 등
  - **주입**: `@Autowired`, `@Inject`, `@RequiredArgsConstructor` 등

  ```java
  @Service
  public class UserService {
      private final UserRepository userRepository;

      @Autowired  // 또는 생성자 주입 (권장)
      public UserService(UserRepository userRepository) {
          this.userRepository = userRepository;
      }
  }
  ```

## 2. 자동 설정 (Auto Configuration)

- 기본 스프링 프레임워크와 달리 WAR 파일을 만들거나, xml 설정을 할 필요없이,  
  `@SpringBootApplication`에 포함된 `@EnableAutoConfiguration`이 대부분의 **설정을 자동으로 처리**

- **예시**
  - **웹 서버**: Tomcat 자동 설정
  - **JPA**: DataSource, EntityManager, Hibernate 자동 설정
  - **Security**: 기본 로그인 페이지 제공

## 3. Starter

- 특정한 기능을 사용하기위한 의존성 묶음으로, 개발자가 설정하지 않아도 된다

  | Starter 이름                   | 설명                               |
  | ------------------------------ | ---------------------------------- |
  | `spring-boot-starter-web`      | Spring MVC + Embedded Tomcat       |
  | `spring-boot-starter-data-jpa` | Spring Data JPA + Hibernate        |
  | `spring-boot-starter-security` | Spring Security                    |
  | `spring-boot-starter-test`     | JUnit, Mockito 등 테스트 도구 포함 |

  ```java
  dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
  }
  ```

## 4. application.properties / application.yml

- 어플리케이션 설정을 구성하는 파일
- 환경 설정, DB 연결, 포트 번호, 로깅 수준 등을 설정

  ```properties
  server.port=8081
  spring.datasource.url=jdbc:mysql://localhost:3306/test
  spring.jpa.hibernate.ddl-auto=update
  ```

## 5. 내장 서버 (Embedded Server)

- Spring Boot는 `Tomcat`, `Jetty`, `Undertow`를 <u>내장</u>
- `.jar` 파일로 <u>실행하면 서버가 자동으로 구동</u>

  ```java
  java -jar my-app.jar
  ```

<br/>

## 6. 스프링과 스프링 부트

- **Spring Boot**: 간단한 웹 프로젝트, 빠르게 REST API 생성
- **Spring Framework**: 세밀한 설정이 필요하거나, 레거시 시스템 통합

  | 항목            | **Spring Framework (전통적인 스프링)**       | **Spring Boot**                   |
  | --------------- | -------------------------------------------- | --------------------------------- |
  | **설정**        | 대부분 수동 설정 (`xml`, `Java Config`) 필요 | 자동 설정 (Auto Configuration)    |
  | **시작 복잡도** | 프로젝트 구조 설정과 환경 설정이 복잡        | 간단한 설정만으로 바로 실행 가능  |
  | **서버 구동**   | 외부 톰캣 필요 (war 파일)                    | **내장 Tomcat** 포함 (jar로 실행) |
  | **의존성 관리** | 필요한 라이브러리 하나하나 추가              | **Starter 의존성**으로 쉽게 관리  |
  | **실행 방식**   | 배포 → 외부 서버에 올려서 실행               | `java -jar`로 바로 실행           |
  | **목표**        | 유연하고 세밀한 설정 중심                    | **빠른 개발, 간편한 배포** 중심   |
