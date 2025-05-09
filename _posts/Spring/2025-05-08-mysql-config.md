---
layout: single
title: "MySQL Config 설정하기"
categories: SpringBoot
author_profile: true
sidebar_main: true
tag: [SpringBoot, 설정]
toc: true
toc_sticky: true
---

서버가 실행 후 기타 추가 설정 파일 작성하기
{: .notice--info}

# 프로젝트 구조

```bash
├── build.gradle
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
├── settings.gradle
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── kimsu10
│       │           └── chat
│       │               └── ChatApplication.java
│       └── resources
│           ├── application.properties
│           └── application.yml
└── start.sh
```

## 1. 폴더 생성

- `~Application.java`와 <u>동일한 경로에 도메인 및 설정 관련 폴더를 생성</u>해야 한다.

<p align="center">
  <img src="/assets/images/SpringBoot/1-8.png"/>
</p>

- `/domain/repository`: JPA Entity 및 Repository 클래스 위치
- `/domain/auth`: JWT 인증 관련 API 클래스 위치

## 2. 트랜잭션 CONFIG

- config 폴더를 생성하고, MySQLConfig.java 파일을 생성
- `@Configuration` 어노테이션을 통해 <u>스프링 설정 클래스임을 명시</u>하면, `application.yml`의 <u>설정 값을 참조할 수 있다</u>

  ```yml
  # application.yml
  spring:
  datasource:
    url: jdbc:mysql://localhost:3306/DB명
    username: 유저명
    password: "비밀번호"
    driver-class-name: com.mysql.jdbc.Driver
  ```

- 이 설정을 기반으로 `@Value` 어노테이션을 활용해 <u>값을 주입</u>한다

  ```java
  import org.springframework.beans.factory.annotation.Value;
  import org.springframework.context.annotation.Bean;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.jdbc.datasource.DataSourceTransactionManager;
  import org.springframework.transaction.PlatformTransactionManager;
  import org.springframework.transaction.annotation.EnableTransactionManagement;
  import org.springframework.transaction.support.TransactionTemplate;


  import javax.sql.DataSource;

  @Configuration
  @EnableTransactionManagement
  public class MySQLConfig {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    @Value("${spring.datasource.driver-class-name}")
    private String driverClassName;

    // 트랜잭션 매니저 빈 등록
    @Bean
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean
    public TransactionTemplate transactionTemplate(PlatformTransactionManager transactionManager) {
        return new TransactionTemplate(transactionManager);
    }

    // 커스텀 트랜잭션 등록
    @Bean(name = "createUserTransactionManager")
    public PlatformTransactionManager createUserTransactionManager(DataSource dataSource) {
        DataSourceTransactionManager manager = new DataSourceTransactionManager();
        // 추가 설정이 필요한 경우 여기에 작성 - manager.사용할 메서드
        return manager;
    }
  ```

  > `@Value`: application.yml의 설정 값을 주입받음 (Lombok의 @Value ❌)  
  > `@Bean`: 의존성 주입을 위한 메서드 정의 시 사용하며, 스프링이 관리하는 빈으로 등록된다

- 이렇게 설정해두면 트랜잭션이 필요한 서비스 로직에서 빈 주입을 통해 트랜잭션 제어가 가능하다
- 또한, 복수의 트랜잭션 매니저가 필요한 경우 이름을 명시해 구분하여 사용할 수 있다

## 3. CORS 설정

- 애플리케이션이 다른 도메인에서 리소스를 요청할 때 보안 정책으로 인해 발생하는 문제를 해결하기 위해 설정
- 대부분의 서버에서 동일하게 설정을 사용하기때문에 커스텀하게 바꿀 필요는 없다

  > 공부용으로 설정한것이라 모든 경로를 허용하였으나, <u>실무에서는 꼭 필요한 경로에만 허용하자!</u>

  ```java
  import org.springframework.context.annotation.Configuration;
  import org.springframework.web.servlet.config.annotation.CorsRegistry;
  import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

  @Configuration
  public class WebConfig implements WebMvcConfigurer {

      @Override
      public void addCorsMappings(CorsRegistry registry) {
          // 모든 경로에대해서 허용
          registry.addMapping("/**")
                  .allowedOriginPatterns("http://localhost:*") // 로컬호스트의 모든 요청 허용
                  .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용 메서드
                  .allowedHeaders("*")    // 모든 헤더를 허용
                  .allowCredentials(true) // 자격증명 허용
                  .maxAge(3600);  // preflight 요청 캐시 시간
      }
  }
  ```

## 4.웹소켓 설정

- 클라이언트/서버간 <u>실시간 양방향 통신이 가능</u>한 **웹소켓(WebSocket)** 설정

  ```java
  import lombok.RequiredArgsConstructor;
  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.context.annotation.Configuration;
  import org.springframework.web.socket.config.annotation.EnableWebSocket;
  import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
  import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

  @Configuration
  @EnableWebSocket
  @RequiredArgsConstructor    // 자동으로 bean 주입
  public class WssConfig implements WebSocketConfigurer {

      @Autowired
      // 후에 웹소켓 작업시 추가

      @Override //WebSocketConfigurer 인터페이스의 메서드를 구현
      public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(null,"/ws/v1/chat") // 웹소켓 핸들러 등록
                .setAllowedOrigins("*");        // 모든 오리진 허용 (실무에선 특정 도메인만 허용 권장)
      }
  }
  ```

- `@EnableWebSocket`: 스프링에서 WebSocket 기능 활성화
- `@RequiredArgsConstructor`: final 필드를 대상으로 생성자를 만들어 <u>자동으로 의존성 주입</u>
- `WebSocketConfigurer`: registerWebSocketHandlers() 메서드를 통해 <u>웹소켓 핸들러 등록을 가능하게 하는 인터페이스</u>
- `chatWebSocketHandler`: 실무에선 TextWebSocketHandler를 상속한 클래스가 주입되며, <u>메시지 수신/전송 로직을 담당</u>
- `setAllowedOrigins()`: <u>도메인의 웹소켓 요청을 허용하는 설정</u>(보안을 위해 실무에선 제한해야한다)
