---
layout: single
title: "숫자형 함수"
categories: Database
author_profile: true
sidebar_main: true
tag: [SQL, Basic]
toc: true
toc_sticky: true
---

SQLD 시험 대비 공부 정리
{: .notice--info}

> **모듈러 연산자 (%)**
>
> 나눗셈 후 나머지를 구한다

# 소수점 및 절대값 관련 함수

## 1. CEIL()

- 소수점 이하가 있으면 무조건 값을 `올림` (올림 연산)

  > SQL Server에서는 CEILING()

  ```sql
  SELECT CEIL(4.2) AS Result;     -- 5
  SELECT CEILING(-4.2) AS Result; -- -4
  ```

## 2. ROUND()

- 지정한 자릿수까지 `반올림`
- `-`를 넣어서 한칸더 이동이 가능

  > SQL Server에서는 자릿수에 0을 넣으면 정수로 반올림, 음수를 넣으면 해당 자리에서 반올림

  ```sql
  SELECT ROUND(123.456, 2) AS RoundedValue;  -- 123.46
  SELECT ROUND(123.456, 0) AS RoundedValue;  -- 123
  SELECT ROUND(123.456, -1) AS RoundedValue; -- 120 (10의 자리 반올림)
  ```

## 3. FLOOR()

- 소수점 이하를 모두 `버림` (내림 연산)

  ```sql
  SELECT FLOOR(4.9) AS Result;     -- 4
  SELECT FLOOR(-4.9) AS Result;    -- -5
  ```

## 4. TRUNC()

- 소수점을 `자름`

  ```sql
  -- Oracle
  TRUNC(123.123, 2); -- 123.12
  ```

  > SQL Server: ROUND()

## 4. ABS()

- `절대값`을 반환 (부호 제거)

  ```sql
  SELECT ABS(-10) AS Result;  -- 10
  SELECT ABS(10) AS Result;   -- 10

  ```

## 5. SIGN()

- `수의 부호`를 나타냄

  ```sql
  SELECT SIGN(-20) AS Result;  -- -1
  SELECT SIGN(0) AS Result;    -- 0
  SELECT SIGN(15) AS Result;   -- 1
  ```

  <br/>

# 나머지/나눗셈 관련 함수

## 1. MOD()

- `나머지`를 반환

  > Oracle: MOD()만 사용 가능
  > SQL Server: % 만 사용 가능
  > MySQL: %, MOD() 둘 다 사용

  ```sql
  MOD(a, b)

  SELECT 10 % 3;         -- 1
  SELECT MOD(10, 3);     -- 1
  ```

- **MOD(a, b)** 는 대부분 수학적인 모듈러(modulo) 연산으로 처리한다
  (부호는 피제수(a) 를 기준으로)

- **%** 는 일부 DBMS에서 나머지(remainder) 연산처럼 처리되며,  
  부호는 피제수(a) 를 기준으로 하기도 하고 제수(b) 를 기준으로 하기도한다

  | DBMS           | `MOD(-10, 3)` | `-10 % 3` | 설명                                           |
  | -------------- | ------------- | --------- | ---------------------------------------------- |
  | **MySQL**      | `2`           | `-1`      | `MOD(a, b)`는 수학적 모듈러, `%`는 나머지 연산 |
  | **Oracle**     | `2`           | ❌ 오류   | `%` 문법 오류                                  |
  | **SQL Server** | ❌ 없음       | `-1`      | `MOD()` 없음, `%`는 나머지                     |

## 2. 나눗셈 함수

- Oracle/SQL Server: `FLOOR(a / b)`
- MySQL: `DIV()`로 정수 나눗셈을 수행하며 소수점 이하를 버림

  ```sql
  SELECT 10 DIV 3 AS Result;  -- 3
  ```

  <br/>

# 삼각함수

## 1. SIN()

- 사인 값을 반환 (입력은 라디안 단위)

  ```sql
  SELECT SIN(PI()/2) AS SinValue;  -- 1
  ```

## 2. COS()

- 코사인 값을 반환

  ```sql
  SELECT COS(0) AS CosValue;       -- 1
  ```

## 3. TAN()

- 탄젠트 값을 반환

  ```sql
  SELECT TAN(PI()/4) AS TanValue;  -- 1
  ```

  <br/>

# 지수 및 로그 함수

## 1. EXP()

- 거듭제곱(지수) 값을 반환 (exponential, a^x)

  ```sql
  SELECT EXP(1) AS ExpValue;       -- 2.7182818...
  ```

## 2. POWER()

- 거듭제곱을 계산

  ```sql
  POWER(base, exponent)

  SELECT POWER(2, 3) AS PowerValue;  -- 2의3승인 8
  ```

## 3. SQRT() ⭐️

- 제곱근(루트)을 계산

  ```sql
    SELECT SQRT(16) AS SqrtValue;     -- 루트 16의 값 4
  ```

## 4. LOG()

- MySQL / Oracle: LOG(x, base) → 임의의 밑을 가진 로그
- SQL Server: LOG(x) → 자연로그 (ln)  
   LOG10(x) → 상용로그 (log₁₀)

  ```sql
  --  MySQL
  SELECT LOG(100, 10) AS Log10;     -- log10의 100은 log10의 10제곱이니까 2
  ```

## 5. LN()

- 자연로그 (logₑ)

  ```sql
  SELECT LN(EXP(1)) AS LnValue;    -- 1
  ```

  > SQL Server는 Ln() 함수가 없다
