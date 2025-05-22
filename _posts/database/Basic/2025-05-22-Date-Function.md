---
layout: single
title: "날짜형 함수"
categories: Database
author_profile: true
sidebar_main: true
tag: [SQL, Basic]
toc: true
toc_sticky: true
---

SQLD 시험 대비 공부 정리
{: .notice--info}

# 날짜 출력

## 1. SYSDATE()

- Oracle에서 현재 **시스템의 날짜와 시간**을 반환하는 기본 제공 함수
- 타입: `DATE`

  ```sql
  SELECT SYSDATE FROM dual;
  ```

  | SYSDATE    |
  | ---------- |
  | 2025-05-22 |

  > **SQL Server의 경우**
  >
  > ```sql
  > SELECT DATEPART(YEAR, GETDATE()),
  > GETDATE()
  > FROM dual
  >
  > -- 축약버전
  > DATE(GETDATE())
  > MONTH(GETDATE())
  > YEAR(GETDATE())
  > ```

## 2. EXTRACT()

- 날짜 타입에서 연도, 월, 일, 시, 분 등 특정 값을 추출
- 반환값: `NUMBER`

  ```sql
  SELECT
  EXTRACT(YEAR FROM SYSDATE) AS year,
  EXTRACT(MONTH FROM SYSDATE) AS month,
  EXTRACT(DAY FROM SYSDATE) AS day
  FROM dual;
  ```

  | EXTRACT(YEARFROMSYSDATE) | EXTRACT(MONTHFROMSYSDATE) | EXTRACT(DAYFROMSYSDATE) |
  | ------------------------ | ------------------------- | ----------------------- |
  | 2025                     | 05                        | 22                      |

  > SQL Server의 경우
  >
  > ```sql
  > SELECT DATEPART(YEAR, GETDATE()),
  > GETDATE()
  > FROM dual
  >
  > -- 축약버전
  > DATE(GETDATE())
  > MONTH(GETDATE())
  > YEAR(GETDATE())
  > ```

## 3. TO_NUMBER(TO_CHAR(date_expr, format))

- Oracle: 날짜를 숫자로 바꾸기위해, 먼저 문자열로 바꾼 다음 숫자로 변환
- TO_CHAR() : 날짜 → 문자열 (다양한 포맷을 지정 가능)
- TO_NUMBER() : 문자열 → 숫자

  ```sql
  SELECT
  to_char(SYSDATE, 'YYYY'),
  NUMBER(to_char(SYSDATE, 'YYYY')),
  to_char(SYSDATE, 'MM'),
  to_char(SYSDATE, 'DD')
  FROM dual;
  ```

  |                                  | 결과  | SYSDATE    |
  | -------------------------------- | ----- | ---------- |
  | TO_CHAR(SYSDATE, 'YYYY')         | 2025  | 2025-05-22 |
  | NUMBER(TO_CHAR(YEARFROMSYSDATE)) | 2,025 | 2025-05-22 |
  | TO_CHAR(SYSDATE, 'MM')           | 05    | 2025-05-22 |
  | TO_CHAR(SYSDATE, 'DD')           | 22    | 2025-05-22 |

# 날짜 연산

- 날짜 간의 차이, 날짜 더하기/빼기, 특정 날짜 추출

## Oracle

- `+`, `ADD_MONTHS`, `INTERVAL`

  ```sql
  SELECT
    TO_DATE('2025-05-22', 'YYYY-MM-DD')+1 AS ADD_DATE,
    TO_DATE('2025-05-22', 'YYYY-MM-DD')+1/24 AS ADD_HOUR,
    TO_DATE('2025-05-22', 'YYYY-MM-DD')+1/24/60 AS ADD_MIN,
    TO_DATE('2025-05-22', 'YYYY-MM-DD')+1/24/60/(60/59) AS ADD_SEC
  FROM dual;
  ```

  | 설명     | 결과                    |
  | -------- | ----------------------- |
  | ADD_DATE | 2025-05-23 00:00:00.000 |
  | ADD_HOUR | 2025-05-22 01:00:00.000 |
  | ADD_MIN  | 2025-05-22 00:01:00.000 |
  | ADD_SEC  | 2025-05-22 00:00:59.000 |

## SQL Server

- `DATEADD()`

  ```sql
  SELECT DATEADD(DAY, 7, GETDATE());
  SELECT DATEADD(MONTH, 2, GETDATE());

  -- ⭕️
  CONVER(DATETIME, '2025-05-22')+1
  -- ❌
  CONVER(DATETIME, '2025-05-22')+1/24
  -- ⭕️
  DATEADD(hour, 1m CONVER(DATETIME, '2025-05-22'))
  ```

## MySQL

- `DATE_ADD()`

  ```sql
  -- 7일 더하기
  SELECT DATE_ADD(NOW(), INTERVAL 7 DAY);
  -- 2개월 더하기
  SELECT DATE_ADD(NOW(), INTERVAL 2 MONTH);
  ```
