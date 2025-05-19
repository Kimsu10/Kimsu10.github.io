---
layout: single
title: "SQL 기본용어 정리"
categories: Database
author_profile: true
sidebar_main: true
tag: [SQL, Basic]
toc: true
toc_sticky: true
---

SQLD 시험 대비 공부 정리
{: .notice--info}

# 1. **테이블 구조**

<p align="center">
 <img src="/assets/images/DataBase/oracle/3-1.png" width="95%"/>
</p>

# 2. 데이터 유형

- 오라클(Oracle)과 SQL Server는 데이터 타입 명칭에 약간 차이가 있다

  | 유형         | ORACLE                  | SQL SERVER                              | 설명                                                                                                                                |
  | ------------ | ----------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
  | CHARACTER(s) | `CHAR(n)`               | `CHAR(n)`                               | 고정 길이 문자열<br> 1바이트(기본 길이)<br> 지정한 길이보다 짧으면 나머지를 공백으로 채움                                           |
  | VARCHAR(s)   | `VARCHAR2(n)`           | `VARCHAR(n)`                            | 가변 길이 문자열<br> 실제 입력한 길이만큼 저장됨                                                                                    |
  | NUMERIC      | `NUMBER(p,s)`           | `NUMERIC(p,s)` 또는 `DECIMAL(p,s)`      | 정수, 실수의 숫자 데이터. <br> 오라클은 NUMBER[(p[,s])] 형식으로 지정 <br>`p`는 전체 자릿수(유효숫자),<br> `s`는 소수점 이하 자릿수 |
  | DATETIME     | `DATE` 또는 `TIMESTAMP` | `DATETIME`, `DATE`, `TIME`, `DATETIME2` | 날짜 및 시간 정보를 저장 <br> Oracle의 `DATE`는 1초 단위 시간까지 포함 <br> SQL Server는 ㄴ3.3ms 단위 관리                          |

- 고정길이를 가지는 CHAR 보다 가변 기이를 가지는 VARCHAR를 사용하는것을 권장한다

# 3. 연산자

## 일반 관계 연산자

- 관계 대수의 연산 중 두 개 이상의 릴레이션(테이블) 간의 결과를 조합하거나 비교하는 연산자

  | 연산자       | SQL 문                        | 설명                                                                   |
  | ------------ | ----------------------------- | ---------------------------------------------------------------------- |
  | UNION        | `UNION`                       | **합집합**<br> 두 SELECT 결과를 합침<br> 중복은 제거됨                 |
  | INTERSECTION | `INTERSECT`                   | **교집합** <br>두 SELECT 결과를 합침<br> 중복은 제거됨                 |
  | DIFFERENCE   | `EXCEPT`(오라클)/`MINUS`(SQL) | **차집합** <br>첫 SELECT 결과에서 두 번째 SELECT 결과에 없는 값만 반환 |
  | PRODUCT      | `CROSS JOIN`                  | **카티션 곱** <br>두 테이블의 모든 조합을 반환<br> (모든 행 × 모든 행  |

## 순수 관계 연산자

- 단일 릴레이션에서 원하는 데이터(행 또는 열)를 추출하거나, 조건에 따라 필터링하는 기본적인 연산자

  | 연산자       | SQL 문      | 설명                                                                                                                                                             |
  | ------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | SELECT       | `WHERE`     | <u>조건부 튜플 선택</u><br> 주어진 조건에 맞는 **행(row)**만 선택<br> 관계 대수의 σ(시그마) 연산에 해당                                                          |
  | PROJECT      | `SELECT`    | <u>열(column) 추출</u><br> 특정 열만 선택해서 반환<br> 관계 대수의 π(파이) 연산에 해당                                                                           |
  | NATURAL JOIN | `여러 JOIN` | <u>동일한 이름을 가진 열을 기준으로 자동 조인</u><br> SQL에서 명시적으로 NATURAL JOIN 키워드를 쓰거나, INNER JOIN + USING/ON으로 유사하게 구현 가능<br>          |
  | DIVIDE       | 사용 ❌     | 모든 조건을 만족하는 항목 선택<br> 관계 대수에만 존재하는 연산으로, SQL에서는 직접 제공되지 않음<br> 보통 GROUP BY + HAVING 또는 NOT EXISTS 등으로 복잡하게 구현 |
