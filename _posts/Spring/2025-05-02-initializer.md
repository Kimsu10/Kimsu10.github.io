---
layout: single
title: "SpringBoot 초기세팅"
categories: Spring
author_profile: true
sidebar_main: true
tag: [SpringBoot, Swagger]
toc: true
toc_sticky: true
---

# 스프링부트 초기세팅

SpringBoot를 실행하기위한 파일들을 spring initializr에서 간단하게 생성할 수 있다

> [spring initializr 페이지로](https://start.spring.io/)

<br/>

## 1. 프로젝트 다운로드

- spring initializr 페이지에서 사용할 설정을 선택 후 generate를 눌러서 압축파일 다운로드

<p align="center">
  <img src="/assets/images/SpringBoot/1-1.png" width="95%"/>
</p>

- ADD DEPENENCIES에서 원하는 의존성을 추가하고 다운로드하면 버전에 맞게 설정

  > **자주 사용하는 Dependency**
  >
  > - ⭐️`SpringWeb` : 웹 서비스를 만든다면 필수! Spring MVC 패턴을 구현하는데 사용 (REST API서버에 필수)
  > - ⭐️ `Lombok` : Class에 getter, setter 등의 메소드들을 간단한 어노테이션(@)으로 지정하여 메소드를 컴파일때 자동 생성
  > - ⭐️ `MySQL Driver` : MySql의 드라이버를 자동으로 연결
  > - ⭐️ `JPA` : Spring에서 DB를 다루는 거의 표준 기술 (ORM)
  > - `Thymeleaf` : view 템플릿인 Thymleaf를 사용할 때 사용

<br/>

## 2. 압축 해제 및 의존성 확인

- 압축 해제 후 `setting.gradle`에서 <u>의존성을 확인하고 추가</u> 할 수 있다

  ```java
  // setting.gradle
  dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testRuntimeOnly 'org.junit.platform:junit-platform-launcher'

    //	웹 소켓(wss)
    implementation 'org.springframework.boot:spring-boot-starter-websocket'
    implementation 'org.webjars:stomp-websocket:2.3.3-1'

    // lombok - Getter/Setter같은 어노테이션 자동 적용
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok-mapstruct-binding:0.2.0'

    // JWT
    implementation 'com.auth0:java-jwt:3.12.0'

    // Hashing
    implementation 'org.springframework.security:spring-security-core:5.8.3'

    //Swagger
    implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.2.0'

    // MySQL
    implementation 'com.mysql:mysql-connector-j:8.0.31'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
  //	implementation 'mysql:mysql-connector-java:8.0.28'

    //JPA
    implementation 'org.springframework.boot:spring-boot-starter-jdbc'
  }
  ```

- Spring Initializr 등에서 생성된 프로젝트는 기본적으로 version = '0.0.1-SNAPSHOT'이 포함되지만, 명시되어 있지 않으면 Gradle은 unspecified로 간주한다
- 때문에 프로젝트 루트에서 `ls build/libs` 명령어를 실행하면, <u>아직 빌드를 하지 않았기 때문에 .jar 파일이 존재하지 않는다</u>
- `./gradlew build` 명령을 실행하면 `.jar 파일`이 생성된다

  > build/libs
  >
  > - Gradle 프로젝트에서 빌드 후 생성된 .jar 또는 .war 파일이 저장되는 기본 경로

<br/>

## 3. 빌드 실행하기

- `./gradlew build` 명령어를 실행하면, 설정된 버전 값에 따라 `build/libs` 경로에  
  `프로젝트이름-0.0.1-SNAPSHOT.jar` 파일이 생성되고 이를 확인할 수 있다

<p align="center">
  <img src="/assets/images/SpringBoot/1-3.png" width="95%"/>
</p>

- 내 경우 초기 프로젝트 설정과 달리 따로 추가한 의존성이 존재하여 빌드 초기화수 다시 build 하였다

  > **clean**
  >
  > - 이전 빌드 결과물을 삭제
  > - build/ 디렉토리를 지워서 캐시된 클래스 파일, jar 파일, 테스트 결과 등을 제거
  > - 목적: 이전 빌드의 흔적 없이 "깨끗한 상태"에서 새로 빌드

  > **build**
  >
  > - 프로젝트의 전체 빌드 작업을 실행
  > - 컴파일, 테스트, jar 생성, 리소스 처리 등 Gradle이 정의한 빌드 작업 전반이 포함된다

<br/>

## 4. SNAPSHOT.jar 파일 확인하기

<p align="center">
  <img src="/assets/images/SpringBoot/1-2.png" width="95%"/>
</p>

- 스프링 부트가 실행되면 jar 파일을 사용해서 실행된다

**추가. 스크립트를 통해 프로젝트 실행하기**

- 스프링부트를 실행하기위해 쉘스크립트 파일을 생성하였다

  > **.sh = Shell Script**
  >
  > - 셸에서 실행할 수 있는 명령어 모음
  > - 자동화, 초기 설정, 배포 스크립트 등에서 자주 사용

- 쉘 스크립트를 빌드로 사용하기위해 권한을 설정

  <p align="center">
    <img src="/assets/images/SpringBoot/1-4.png" width="95%"/>
  </p>

  ```java
  // start.sh

  echo "Build Project"    // Build Project 문구를 터미널에 출력

  ./gradlew clean build   // Gradle Wrapper를 이용해 프로젝트를 빌드

  echo "Start Server"     //Start Server 문구를 터미널에 출력

  cd ./build/libs         // build.gradle의 설정에 따라 생성된 .jar 파일이 위치한 build/libs 디렉토리로 이동

  java -jar chat-0.0.1-SNAPSHOT.jar //생성된 .jar 파일을 자바 명령어로 실행
  ```

### [추가] 쉘 스크립트로 빌드 실행

```
./스크립트명.sh
```

- 빌드 실행 후 서버가 실행된다

<p align="center">
  <img src="/assets/images/SpringBoot/1-5.png" width="95%"/>
</p>

- 에러 발생

<p align="center">
  <img src="/assets/images/SpringBoot/1-6.png" width="95%"/>
</p>

- **오류 발생 이유**

  - Spring Boot는 의존성(dependency)에 따라 자동 설정(autoconfiguration)을 시도한다
  - spring-boot-starter-data-jpa를 추가했지만 DB 설정을 하지 않았기 때문에 오류가 발생했다

## 5. yml 파일에 환경변수 설정하기

- `application.yml`에서 사용할 변수들을 설정

  ```yml
  server.port: 사용할 포트번호
  springdoc:
    swagger-ui:
      enabled: true
      operations-sorter: method
  spring:
    datasource:
      url: jdbc:mysql://localhost:3306/spring_chat
      username: 유저명
      password: '내비밀번호'
      driver-class-name: com.mysql.jdbc.Driver
    jpa:
      show-sql: true
  <!-- custom 환경 변수 -->
    token:
      secret-key: "SECRET"
      refresh-secret-key: "REFRESH_SECRET"
      token-time: 300
      refresh-token-time: 300
  ```

## 6. 서버 실행

```
./start.sh
```

<p align="center">
  <img src="/assets/images/SpringBoot/1-7.png" width="95%"/>
</p>

---

# 서버 실행시 겪었던 문제

## JDBC 초기설정 오류

DB 연결정보가 설정되지 않아서 발생

```bash
[org.hibernate.engine.jdbc.env.spi.JdbcEnvironment]
due to: Unable to determine Dialect without JDBC metadata
(please set 'jakarta.persistence.jdbc.url' for common cases or
'hibernate.dialect' when a custom Dialect implementation must be provided)
```

- 원인1: 환경변수 password의 값을 '비밀번호'로 설정하고 바꾸지 않음
- 원인2: DB에 테이블을 생성하지 않음
