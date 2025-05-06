---
layout: single
title: "Java의 접근제어자"
categories: Java
tag: [Java, 면접]
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

# 접근제어자

- 외부에서 해당 멤버(필드, 메서드 등)에 <u>접근할 수 있는 범위를 제한하는 키워드</u>
- 접근 권한을 제어하여 `캡슐화(Encapsulation)`을 구현
- 잘 사용하면 코드의 보안성, 유지보수성, 재사용성을 높일 수 있다

| 접근 제어자     | 같은 클래스 | 같은 패키지 | 하위 클래스 | 다른 패키지           | 설명                                               |
| --------------- | ----------- | ----------- | ----------- | --------------------- | -------------------------------------------------- |
| **`public`**    | ✅          | ✅          | ✅          | ✅                    | 어디서든 접근 가능 (외부 접근 가능)                |
| **`protected`** | ✅          | ✅          | ✅          | ❌ (단, 상속 시 가능) | 같은 패키지 + 다른 패키지의 하위 클래스에서만 가능 |
| **`(default)`** | ✅          | ✅          | ❌          | ❌                    | 같은 패키지 내에서만 가능                          |
| **`private`**   | ✅          | ❌          | ❌          | ❌                    | 해당 클래스 내부에서만 가능 (외부 접근 불가)       |

---

## 1. 캡슐화(Encapsulation)

- '어떻게 구조화 할 것인가'에 대한 `설계 개념`  
  (접근제어자를 이용해 전체 구조를 짜는것이 목적)
- 데이터를 <u>하나의 클래스로 묶고</u>, <u>접근 제어자(public, private, protected)를 통해 외부 접근을 관리</u>하는것
- <u>getter/setter 메서드를 통해 안전하게 접근</u>

### 구현

- 필드를 <u>private으로 선언</u> → 외부 직접 접근 차단
- 필드에 접근할 수 있는 <u>getter, setter</u> 메서드 제공
- 필요 시, <u>유효성 검사(Validation)를 통해 비정상 값 차단</u>

  ```java
  public class Member {
    private String name;   // 외부에서 직접 접근 불가
    private int age;

    // Getter
    public String getName() {
        return name;
    }

    // Setter
    public void setName(String name) {
        this.name = name;
    }

    // 나이 유효성 검사 포함한 Setter
    public void setAge(int age) {
        if (age > 0) {
            this.age = age;
        }
    }

    public int getAge() {
        return age;
    }
  }
  ```

### 장점

- **데이터 보호** : 외부에서 직접 접근을 차단해 <u>잘못된 값 저장을 방지</u>
- **유지보수 용이** : 내부 구현 변경 시 외부 코드 영향 최소화
- **유효성 검사 가능** : setter에 조건을 걸어 <u>비정상 데이터 차단</u> 가능
- **객체지향 설계 원칙 준수** : OOP의 핵심 개념 중 하나로 코드 품질 향상에 기여

## 2. 은닉(Data Hiding)

- <u>객체의 내부 데이터(속성)이나 구현사항을 외부에서 직접 접근하지 못하도록 숨기는 것</u>

### 구현

- 보이지 않게 감추는것이 핵심이다

  ```java
  public class Account {
    private int balance;  // 은닉: 외부에서 직접 접근 불가

    public int getBalance() {
        return balance;  // 내부 메서드를 통해서만 접근 허용
    }

    public void deposit(int amount) {
        if (amount > 0) balance += amount;
    }
  }
  ```

### 장점

- **내부 데이터의 무결성 보호**
- **불필요한 정보 노출 방지**
- **시스템이 복잡해져도 외부와의 의존성 최소화**
- **잘못된 사용을 방지하고 코드 안정성 향상**

## 캡슐화 vs 은닉

| 항목     | **캡슐화 (Encapsulation)**                  | **은닉 (Data Hiding)**                     |
| -------- | ------------------------------------------- | ------------------------------------------ |
| **목적** | 데이터 + 메서드를 하나로 묶는 구조화된 설계 | 데이터 보호 및 외부로부터 정보 노출 최소화 |
| **초점** | 구조와 접근 방법                            | 보안성과 제한                              |
| **방법** | 클래스, 접근 제어자(public/private 등) 활용 | private, protected 등의 제한으로 정보 차단 |
| **결과** | 유지보수 용이, 코드 구조 개선               | 보안 향상, 실수 방지                       |
