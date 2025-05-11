---
layout: single
title: "MySQL과 ORACLE 문법 차이"
categories: Database
author_profile: true
sidebar_main: true
tag: [MySQL]
toc: true
toc_sticky: true
---

MySQL만 사용하다가 SQLD를 준비하면서 ORACLE을 공부하게 되었다
공부하면서 느낀 차이점을 기록해본다

# 1. CREATE 문

```sql
mysql> CREATE TABLE emp (
  -> EMPNO NUMBER(10),       -- ❌ MySQL에는 NUMBER 타입이 없음
  -> ENAME VARCHAR2(10),     -- ❌ MySQL에는 VARCHAR2도 없음
  -> SAL NUMBER(10,2),       -- ❌ 역시 NUMBER가 문제
  -> HIREDATE DATE
  -> );
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'NUMBER(10),
```

- 위의 문법은 Oracle SQL 문법으로 MySQL에서는 NUMBER 데이터 타입이 없다
- MySQL에서 사용하기 위해서 는 아래와 같이 바꿔야한다

```sql
CREATE TABLE emp (
  EMPNO INT,              -- 또는 INT(10)도 가능하지만 의미 없음
  ENAME VARCHAR(10),      -- VARCHAR2 → VARCHAR
  SAL DECIMAL(10,2),      -- NUMBER → DECIMAL(또는 NUMERIC)
  HIREDATE DATE
);
```

# 2. 연결 연산자

- ORACLE DB에서는 `||` (연결 연산자)를 사용해서 컬럼과 컬럼을 서로 연결해서 출력 가능
- MySQL의 경우 문자열을 연결해서 출력하기위해서는 `CONCAT()` 함수를 사용해야한다

```sql
-- MySQL에서 || 사용
SELECT ename || '의 월급은' || sal || '입니다' AS 월급정보 FROM emp;
+--------------+
| 월급정보       |
+--------------+
|            1 |
+--------------+

-- MySQL에서 CONCAT() 사용

SELECT CONCAT(ename, '의 월급은 ', sal, '입니다') AS 월급정보 FROM emp;
+-----------------------------------+
| 월급정보                        |
+-----------------------------------+
| kim의 월급은 8000.00입니다        |
+-----------------------------------+
```

# 3. 삭제시  존재 여부 무시시

- MySQL에서는 `DROP TABLE IF EXISTS 테이블명;`문으로 존재 여부를 무시하고 삭제 가능하다
- Oracle의 경우 IF EXISTS 를 지원하지 않는다

  ```sql
  BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE EMP';
  EXCEPTION
    WHEN OTHERS THEN
        IF SQLCODE != -942 THEN
          RAISE;
        END IF;
  END;
  ```
  - `-942`에러는 테이블이 존재하지 않을때 발생한다