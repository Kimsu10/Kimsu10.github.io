---
layout: single
title: "테이블 구조 수정/삭제"
categories: Database
author_profile: true
sidebar_main: true
tag: [SQL, Basic]
toc: true
toc_sticky: true
---

SQLD 시험 대비 공부 정리
{: .notice--info}

# 테이블 구조 변경

- 테이블을 생성시 잘못 작성한 경우나 요구사항이 변경된경우 테이블의 구조를 변경할 필요가 있다
- 이 경우 `ALTER TABLE` 문을 사용하여 테이블의 구조를 변경할 수 있다

## 1. 테이블 이름 변경

- `RENAME` 명령어로 테이블명을 바꿀 수 있다

  ```sql
  RENAME 기존테이블명 TO 새테이블명;

  -- 작성 예시시
  RENAME EMP TO EMPLOYEE;
  ```

  > **테이블 명 변경시 주의 할 점**
  >
  > - 어플리케이션에서 기존의 테이블명을 사용하는지 확인하자!
  > - 기존의 테이블을 참조하는 view, procedure, trigger 가 있는지 확인하자!
  > - 참조관계의 제약조건을 확인하자!
  > - ⭐️ <u>테이블명을 바꾸기전에 백업하고 테스트 환경에서 먼저 사용하기</u>

## 2. 테이블 삭제 (DROP TABLE)

- <u>테이블과 관련된</u> 데이터, 제약조건, 인덱스 등 <u>모든 정보가 영구 삭제</u>된다
- 삭제된 테이블은 `복구 불가`하다

  ```sql
  DROP TABLE 테이블명;

  -- 작성 예시
  DROP TABLE EMP;
  ```

  > **주의 사항**
  >
  > - <다른 테이블이 이 테이블을 참조하고 있다면(FK) 삭제 불가
  > - ⭐️ `CASCADE`: 의존관계가 있는 제약 조건까지 함께 삭제할때 사용
  >
  >   ```sql
  >   -- 참조 제약조건 무시하고 삭제 (CASCADE)
  >   DROP TABLE 테이블명 CASCADE CONSTRAINTS;
  >   ```

<br/>

# 칼럼 변경

초기 프로젝트 단계에서 제약 조건이나 데이터타입을 변경하면서 가장 많이 사용했다.

### 1. 컬럼 추가

- 테이블에 새로운 컬럼을 추가

  ```sql
  -- 하나의 컬럼 추가
  ALTER TABLE 테이블명 ADD (컬럼명 데이터타입 [DEFAULT 값]);

  -- 여러 컬럼 한번에 추가
  ALTER TABLE 테이블명 ADD (
  컬럼명1 데이터타입,
  컬럼명2 데이터타입,
  ...
  );

  -- 작성 예시
  ALTER TABLE EMP ADD (EMAIL VARCHAR2(50));

  -- 작성 예시
  ALTER TABLE EMP ADD (
  PHONE VARCHAR2(20),
  ADDRESS VARCHAR2(100)
  );
  ```

### 2. 컬럼명 변경

- 기존 컬럼의 이름을 변경

  ```sql
  ALTER TABLE 테이블명 RENAME COLUMN 기존컬럼명 TO 새이름;

  -- 작성 예시시
  ALTER TABLE EMP RENAME COLUMN ENAME TO EMP_NAME;
  ```

  > MySQL에서는 `CHANGE` 문법을 사용하며, 데이터타입도 같이 명시해야 한다
  >
  > ```sql
  >   ALTER TABLE users CHANGE COLUMN name full_name VARCHAR(100);
  > ```

### 3. 컬럼 데이터 타입 변경

- 컬럼의 자료형(타입)을 바꿀때 사용

  ```sql
  ALTER TABLE 테이블명 MODIFY (컬럼명 새로운_데이터타입);

  -- 작성 예시
  ALTER TABLE EMP MODIFY (SAL NUMBER(12,2));
  ```

### 4. 컬럼 삭제

- 필요 없는 컬럼을 제거

  ```sql
  ALTER TABLE 테이블명 DROP COLUMN 컬럼명;

  -- 예시
  ALTER TABLE EMP DROP COLUMN EMAIL;
  ```

<br/>

## 제약 조건

[제약조건 정리글](https://kimsu10.github.io/database/Constraints/)

### 1. 컬럼에 DEFAULT 값 추가/변경

- `DEFAULT`: 컬럼에 기본값을 추가하거나 변경할 때 사용

  ```sql
  ALTER TABLE 테이블명 MODIFY 컬럼명 DEFAULT 기본값;

  -- 작성 예시
  ALTER TABLE EMP MODIFY SAL DEFAULT 1000;
  ```

### 2. 제약 조건 추가/삭제

- **1) null 금지**

  ```sql
  ALTER TABLE EMP MODIFY 칼럼명 NOT NULL;

  -- 작성 예시
  ALTER TABLE EMP MODIFY EMAIL NOT NULL;
  ```

- **2) null 허용**

  ```sql
  ALTER TABLE EMP MODIFY 컬럼명 NULL;

  -- 작성 예시
  ALTER TABLE EMP MODIFY EMAIL NULL;
  ```

  ### 3. 컬럼에 주석 추가

  ```sql
  COMMENT ON COLUMN EMP.SAL IS '주석 내용';

  -- 작성 예시
  COMMENT ON COLUMN EMP.SAL IS '직원의 급여';
  ```
