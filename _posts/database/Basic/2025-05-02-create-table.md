---
layout: single
title: "테이블 생성하기"
categories: Database
author_profile: true
sidebar_main: true
tag: [SQL, Basic]
toc: true
toc_sticky: true
---

SQLD 시험 대비 공부 정리
{: .notice--info}

# 1. 일반 테이블 생성하기

- 일반 테이블은 `CREATE TABLE 테이블명` 구문으로 생성할 수 있다
- `()` <u>안에 각 칼럼명과 데이터 타입을 지정</u>하여 테이블 구조를 정의한다.

```sql
CREATE TABLE emp (
    EMPNO INT,
    ENAME VARCHAR2(10), -- MySQL의 경우 VARCHAR2가 아니라 VARCHAR
    SAL DECIMAL(10,2),  -- 숫자 10자리 허용, 그중 2자리를 소수점으로 허용
    HIREDATE DATE,
    JOB VARCHAR2(10)
);

-- 실행 결과
+----------+---------------+------+-----+---------+-------+
| Field    | Type          | Null | Key | Default | Extra |
+----------+---------------+------+-----+---------+-------+
| EMPNO    | int           | YES  |     | NULL    |       |
| ENAME    | varchar2(10)   | YES  |     | NULL    |       |
| SAL      | decimal(10,2) | YES  |     | NULL    |       |
| HIREDATE | date          | YES  |     | NULL    |       |
| JOB      | varchar2(10)   | YES  |     | NULL    |       |
+----------+---------------+------+-----+---------+-------+
```

## 테이블 명

- 테이블명이나 컬럼명 작성시 아래의 규칙을 지켜야한다

> **테이블 생성시 규칙**
>
> - 반드시 문자로 시작
> - 이름의 길이는 30자 이하
> - `$`, `_`, `#` 의 특수문자만 사용 가능

## 컬럼 명

- 컬럼명 옆에 데이터의 유형을 기술해야한다

  | 데이터 유형 | 설명                                                                      |
  | ----------- | ------------------------------------------------------------------------- |
  | CHAR        | 고정길이 문자 데이터 (최대 길이 2000)                                     |
  | VARCHAR2    | 가변길이 문자 데이터 (최대 길이 4000)                                     |
  | LONG        | 가변길이 문자 데이터 (최대 2GB )                                          |
  | CLOB        | 문자 데이터 유형 (최대 4GB)                                               |
  | BLOB        | 바이너리 데이터 유형 (최대 4GB)                                           |
  | NUMBER      | 숫자 데이터 유형 (십진수: 최대 38자리, 소수점 이하 -84 ~ 127)             |
  | DATE        | 날짜 데이터 유형 (기원전 4712년 1월 1일 ~ 기원후 9999년 12월 31까지 허용) |

---

# 2. 임시 테이블 생성하기

- CREATE 와 TABLE 사이에 `GLOBAL TEMPORARY` 를 기술하여 <u>임시테이블을 생성</u>한다  
  (MySQL의 경우 TEMPORARY)
- 임시테이블은 <u>데이터를 영구 저장하지 않는다</u>

 

> **사용이유**
>
> **1. 중간 결과 저장**
>
> - 복잡한 쿼리의 중간 결과를 임시로 저장하여 처리할 때 유용
>
> **2. 세션 또는 트랜잭션 범위 데이터 처리**
>
> - 다른 사용자와 공유하지 않고, 현재 세션이나 트랜잭션 내에서만 데이터가 필요한 경우 사용
>
> **3. 성능 최적화**
>
> - 반복 계산 대신 임시로 저장해두면 성능이 개선 할 수 있다

- **데이터를 보관하는 주기를 결정 옵션**

| 옵션                        | 설명                                                                    |
| --------------------------- | ----------------------------------------------------------------------- |
| **ON COMMIT DELETE ROWS**   | 임시테이블에 데이터를 입력하고 <u>COMMIT 할때까지만</u> 데이터를 보관   |
| **ON COMMIT PRESERVE ROWS** | 임시테이블에 데이터를 입력하고 <u>세션이 종료될때까지</u> 데이터를 보관 |


- **ON COMMIT DELETE ROWS**

 ```sql
  -- 임시 테이블생성
  CREATE GLOBAL TEMPORARY TABLE EMP_temp (
  EMPNO NUMBER(10),
  ENAME VARCHAR2(10),
  SAL NUMBER(10))
  ON COMMIT DELETE ROWS;

  SELECT * FROM EMP_temp; -- 데이터 삽입후 조회시 데이터가 출력됨

  --데이터 삽입
  INSERT INTO EMP_temp VALUES ( 1, 'Kim', 3000);
  INSERT INTO EMP_temp VALUES ( 2, 'Lee', 2700);

  -- 커밋 후 데이터 조회
  commit;
  SELECT * FROM EMP_temp; -- 커밋
  ```

- **ON COMMIT PRESERVE ROWS**

```sql
-- 임시 테이블생성 -- COMMIT PRESEVE
CREATE GLOBAL TEMPORARY TABLE EMP_temp2 (
EMPNO NUMBER(10),
ENAME VARCHAR2(10),
SAL NUMBER(10))
ON COMMIT PRESERVE ROWS;

--데이터 삽입
INSERT INTO EMP_temp2 VALUES ( 1, 'Kims', 3000);
INSERT INTO EMP_temp2 VALUES ( 2, 'Lees', 2700);

-- 커밋화 데이터 조회
commit;
SELECT * FROM EMP_temp2; -- 커밋후에도 데이터가 남아있으나 세션 종료후 조회시 데이터가 사라짐
```

<br/>

## 임시 테이블(Temporary Table) vs 뷰(View)

- `임시테이블`: 데이터를 담는 실질적인 테이블
- `뷰(view)`: 테이블처럼 보이나 쿼리의 결과를 보여주는 가상의 테이블

  | 구분            | 임시 테이블                              | 뷰(View)                                 |
  | --------------- | ---------------------------------------- | ---------------------------------------- |
  | **정의**        | 일시적으로 데이터를 저장하는 테이블      | 실제 데이터를 저장하지 않는 가상 테이블  |
  | **데이터 저장** | 데이터를 **직접 저장**함                 | 데이터를 **저장하지 않고 쿼리로 보여줌** |
  | **수명**        | 보통 **세션 또는 트랜잭션 종료 시 삭제** | **영구적 객체** (DB에 정의로 남음)       |
  | **생성 시점**   | `CREATE TEMPORARY TABLE`                 | `CREATE VIEW`                            |
  | **사용 목적**   | 중간 결과 저장, 복잡한 계산 처리 등      | 복잡한 쿼리를 단순화, 재사용 목적        |
  | **수정 가능성** | 데이터 삽입, 수정, 삭제 가능             | 일반적으로 읽기 전용 (일부는 수정 가능)  |

---

## 오류 정리

```
SQL 오류: ORA-00947: 값의 수가 충분하지 않습니다 (not enough values)
```
- INSERT 구문에서 테이블의 열 개수에 맞지 않게 값이 부족할 때 발생