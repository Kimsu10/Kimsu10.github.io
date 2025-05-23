---
layout: single
title: "변환형 함수와 CASE 표현"
categories: Database
author_profile: true
sidebar_main: true
tag: [SQL, Basic]
toc: true
toc_sticky: true
---

SQLD 시험 대비 공부 정리
{: .notice--info}

# Oracle의 변환형 함수

## 1. TO_CHAR()

- 숫자형/날짜형을 문자형으로 변경

  ```sql
  SELECT to_char(123) FROM dual;  -- '123'

  -- TO_CHAR(sysdate, 포맷옵션)
  SELECT to_char(sysdate) FROM dual;  -- 2025/05/22
  SELECT to_char(sysdate, 'YYYY-MM-DD') FROM dual; -- 2025-05-22
   SELECT to_char(sysdate, 'hh mm ss') FROM dual;   -- 09 05 07
  SELECT to_date(sysdate, 'YYYY-MM-DD')  FROM dual; -- 0025-05-22 00:00:00.000
  ```

## 2. TO_NUMBER()

- 문자형을 숫자형으로 변경

  ```sql
  SELECT to_number('123') FROM dual;   -- 123
  ```

## 3. TO_DATE()

- 문자형을 날짜형으로 변경

  ```sql
  SELECT TO_DATE('2025-05-22', 'YYYY-MM-DD') FROM dual; -- 2025-05-22
  ```

---

# SQL Server의 변환형 함수

## 1. CAST()

- INC 표준 SQL

  ```sql
  SELECT CAST (expression AS data_type [(length)])

  SELECT
      -- 숫자를 무자료 변환
      cast(20 AS varchar(2)),

      -- 문자를 숫자로 변환
      cast('19.99', int), -- error
      cast('19.99', float),

      -- 날짜를 문자로 변환
      cast(getdate() AS varchar),

      -- 문자를 날짜로 변환
      cast( cast(getdata() AS char) as datetime)
  ```

## 2. CONVERT()

- SQL Server 전용 변환형 함수
- <u>옵션을 사용해서 다양한 스타일을 지정</u> 가능

  ```sql
  CONVERT (data_type [(length)], expression [, style])

  SELECT
      convert(varchar, 20)
      convert(int, '19.99') -- error
      convert(float, '19.99') -- 19.99
      convert(varchar, getdate(), 1)  -- 1은 시간만 나오는 옵션

      -- 문자를 날짜로 변환
      convert(datetime, cast(getdate() AS char))
   FROM dual;
  ```

---

## CASE 표현 (SQL)

- WHEN 칼럼명 = '조건값' == THEN '변환값'

  ```sql
  CASE WHEN 조건1 THEN 반환값1
       WHEN 조건2 THEN 반환값2
       ELSE 반환값3 -- 나머지
       END  -- 종료
  FROM 테이블명
  ```

## DECODE() 함수 (Oracle 전용)

- CASE보다 간단하지만, 단일 열(column)에 대한 조건만 처리

  ```sql
  decode(칼럼명, '조건값1', '변환값', '조건값2', '반환값2', ..., '기본값')
  ```

  | 항목      | `CASE`                            | `DECODE`               |
  | --------- | --------------------------------- | ---------------------- |
  | 표준 SQL  | ✅ 예                             | ❌ Oracle 전용         |
  | 비교 조건 | 복잡한 조건 가능 (`>`, `AND`, 등) | 단순 비교만 가능 (`=`) |
  | 가독성    | 좀 더 길지만 유연함               | 간결하지만 한정적임    |
