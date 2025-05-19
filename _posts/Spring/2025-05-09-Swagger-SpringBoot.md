---
layout: single
title: "Swagger 사용하기"
categories: Spring
author_profile: true
sidebar_main: true
tag: [SpringBoot, Swagger]
toc: true
toc_sticky: true
---

Swagger와 SpringBoot의 record를 사용한 API 문서 자동화
{: .notice--info}

<p>
이전까지는 Postman Documentation으로 API 문서를 작성했는데,<br/>
이번에 REST API를 만들면서 Swagger로 API 문서를 자동으로 생성해보고 싶었다<br/>  
</p>

> **서비스 로직**
>
> - controller : 클라이언트 요청을 받아 처리하는 API 엔드포인트를 담당
> - service : 비즈니스 로직을 처리하고, 데이터 흐름을 조정
> - model(DTO, Entity) : 요청과 응답에 사용되는 데이터 구조 정의. DB와 매핑되는 Entity도 포함

## 1. Swagger 라이브러리 추가

- Spring Boot 3 이상에서는 Swagger 대신 `springdoc-openapi`를 사용

  ```java
  // build.gradle
  dependencies {
      implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.3.0'
  }
  ```

## 2. record로 요청 객체 만들기

- Java 16부터 record를 사용한 DTO 선언으로 Swagger 문서를 쉽게 작성 가능
- class를 record로 선언하고,
- `@Schema`로 간단하게 Swagger 문서화를 할 수 있다

  - `@Schema`: Swagger UI에 설명과 예시값을 표시
  - `description`: 해당 필드나 클래스가 어떤 의미인지 설명

  ```java
  import io.swagger.v3.oas.annotations.media.Schema;
  import jakarta.validation.constraints.NotBlank;
  import jakarta.validation.constraints.NotNull;

  // 유저 생성 요청
  @Schema(description = "User 생성")
  public record CreateUserReq (
              @Schema(description = "유저 명")
              @NotNull
              @NotBlank
              String name,

              @Schema(description = "유저 비밀번호")
              @NotNull
              @NotBlank
              String password
  ){}
  ```

  ```java
  import io.swagger.v3.oas.annotations.media.Schema;

  // 유저 생성 응답
  @Schema(description = "유저 생성 response")
  public record CreateUserRes (
          @Schema(description = "성공 여부")
              String code
          ){}

  ```

## 3. 컨트롤러 작성

```java
@Tag(name="Auth API", description = "Auth API V1")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthControllerV1 {

    private final AuthService authService;

    @Operation(summary = "새로운 유저를 생성한다", description = "신규 유저 생성")
    @PostMapping("/create-user")
    public CreateUserRes createUser(@RequestBody
                                    @Valid
                                    CreateUserReq req) {
        return  authService.createUser(req);
    }
}
```

## 4. 서비스 작성

```java
import com.kimsu10.chat.domain.auth.model.request.CreateUserReq;
import com.kimsu10.chat.domain.auth.model.response.CreateUserRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    public CreateUserRes createUser(CreateUserReq req) {

        return new CreateUserRes(req.name());
    }
}
```

## 5. Swagger UI 접속

- 서버를 실행하고 브라우저에서 아래 주소로 접속하면 Swagger UI를 확인할 수 있다
- port번호는 yml 파일의 server 포트로 변경

  ```bash
   http://localhost:port번호/swagger-ui.html
  ```

  <p align="center">
    <img src="/assets/images/SpringBoot/2-1.png" width="96%"/> 
  </p>

---

## @Schema

- Swagger를 기반으로 한 문서 생성 도구로 클래스나 필드(속성)에 대한 메타데이터를 제공하는 어노테이션이다

- **주요 속성**

  | 속성           | 설명                             |
  | -------------- | -------------------------------- |
  | `description`  | 필드나 클래스의 설명             |
  | `example`      | Swagger UI에 표시될 예시 값      |
  | `required`     | 필수 항목 여부 (true / false)    |
  | `defaultValue` | 기본값                           |
  | `maxLength`    | 최대 길이                        |
  | `minLength`    | 최소 길이                        |
  | `type`         | 데이터 타입 (string, integer 등) |
  | `format`       | 포맷 (date, email, uuid 등)      |
