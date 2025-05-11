---
layout: single
title: "제약조건 (Constraint)"
categories: Database
author_profile: true
sidebar_main: true
tag: [SQL, Basic]
toc: true
toc_sticky: true
---

SQLD 시험 대비 공부 정리
{: .notice--info}

## 재약조건을 사용하는 이유

<u>데이터베이스 내의 일관성과 정확성을 유지하기위해</u> 사용한다

- **외래키 제약 조건**
  - 참조 무결성을 보장하여 부모 테이블 행이 삭제 되지않도록하며, 참조 무결설을 위반하는 연산을 방지한다
- **데이터 유효성 검사**
  - 특정컬럼이 고유값을 가지거나 빈값을 가지지 않도록 할 수 있다
- **성능 향상**
  - 효율적인 쿼리를 실행하여 성능을 향상시킬 수 있다

## 종류

| 제약조건      | 설명                                  |
| ------------- | ------------------------------------- |
| `NOT NULL`    | 컬럼에 null 저장 불가                 |
| `UNIQUE`      | 값의 중복 허용하지 않음               |
| `PRIMARY KEY` | `NOT NULL + UNIQUE`, 테이블의 고유 키 |
| `FOREIGN KEY` | 다른 테이블의 키 참조                 |
| `CHECK`       | 값의 조건 설정 (예: SAL > 0)          |

## 제약조건 추가/삭제/수정

### 1. 제약조건 추가

- **1) PRIMARY KEY 추가**

  ```sql
  ALTER TABLE EMP ADD CONSTRAINT PK_EMP PRIMARY KEY (EMPNO);
  UNIQUE 추가
  ```

- **2) FOREIGN KEY 추가**

  ```sql
  ALTER TABLE EMP ADD CONSTRAINT FK_DEPT FOREIGN KEY (DEPTNO)
  REFERENCES DEPT(DEPTNO);
  CHECK 제약조건 추가
  ```

- **3) UNIQUE 추가**

  ```sql
  ALTER TABLE EMP ADD CONSTRAINT UQ_ENAME UNIQUE (ENAME);
  ```

- **4) CHECK 제약조건 추가**

  ```sql
  ALTER TABLE EMP ADD CONSTRAINT CK_SAL CHECK (SAL > 0);
  ```

<br/>

### 2. 제약조건 삭제

- 제약조건 명을 확인 후 삭제 가능하다

  > **제약조건명 확인**
  >
  > - **CONSTRAINT_TYPE**
  >
  > - `P` : Primary Key
  > - `R` : Foreign Key
  >
  > ```sql
  > SELECT CONSTRAINT_NAME, CONSTRAINT_TYPE
  > FROM USER_CONSTRAINTS
  > WHERE TABLE_NAME = '테이블명';
  > ```

- **제약 조건 삭제**

  - ❌ DROP TABLE 시 테이블 삭제!!
  - ✅ ALTER TABLE ~ DROP CONSTRAINT !!

  ```sql
  ALTER TABLE EMP DROP CONSTRAINT 제약조건이름;
  ```

- **제약조건까지 함께 삭제**

  ```sql
  DROP TABLE 테이블명 CASCADE CONSTRAINTS;
  ```

<br/>

### 3. 제약조건 수정

- Oracle에서 PK나 FK 제약조건을 수정(modify)하는 명령어는 없다
- <u>제약조건 삭제하고 다시 생성</u>해야한다

- **1) 기존의 제약 조건 삭제**

  ```sql
  ALTER TABLE 테이블명 DROP CONSTRAINT 제약조건이름;
  ```

- **2. Primary Key 다시 추가**

  ```sql
  ALTER TABLE 테이블명 ADD CONSTRAINT 제약조건이름 PRIMARY KEY (컬럼명);

  -- 작성 예시 (PK)
  ALTER TABLE EMP ADD CONSTRAINT EMP_PK PRIMARY KEY (EMPNO);
  ```

- **3. Foriegn Key 다시 추가**

  ```sql
  ALTER TABLE 자식테이블명
  ADD CONSTRAINT 제약조건이름
  FOREIGN KEY (자식컬럼)
  REFERENCES 부모테이블(부모컬럼);

  -- 작성 예시 (FK)
  ALTER TABLE EMP
  ADD CONSTRAINT EMP_DEPT_FK
  FOREIGN KEY (DEPTNO)
  REFERENCES DEPT(DEPTNO);
  ```

### 4. 제약조건을 이름 없이 자동 생성

- Oracle이 자동으로 이름을 부여한다

  ```sql
  ALTER TABLE EMP ADD PRIMARY KEY (EMPNO);
  ```
