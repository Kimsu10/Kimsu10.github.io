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
 
 - 티

    ```sql
    RENAME 기존테이블명 TO 새테이블명;

    -- 작성 예시시
    RENAME EMP TO EMPLOYEE;
    ```
## 2. 테이블 삭제 (DROP TABLE)

- 테이블과 관련된 데이터, 제약조건, 인덱스 등 모든 정보가 영구 삭제된다
- 삭제된 테이블은 복구 불가하다



    ```sql
    DROP TABLE 테이블명;

    DROP TABLE EMP
    ```

    > **주의 사항**  
    > - 다른 테이블이 외래키(FK)로 이 테이블을 참조하고 있다면 삭제 불가하다
    > - `CASCADE`:의존관계가 있는 제약 조건까지 함께 삭제할때 사용
    > ```sql
    > -- 참조 제약조건 무시하고 삭제 (CASCADE)
    > DROP TABLE 테이블명 CASCADE CONSTRAINTS;
    >```

---

# 칼럼 변경

- 


### 1. 컬럼 추가

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

    ```sql
    ALTER TABLE 테이블명 RENAME COLUMN 기존컬럼명 TO 새이름;

    -- 작성 예시시
    ALTER TABLE EMP RENAME COLUMN ENAME TO EMP_NAME;
    ```


### 3. 컬럼 데이터 타입 변경

    ```sql
    ALTER TABLE 테이블명 MODIFY (컬럼명 새로운_데이터타입);

    -- 작성 예시
    ALTER TABLE EMP MODIFY (SAL NUMBER(12,2));
    ```

### 4. 컬럼 삭제

    ```sql
    ALTER TABLE 테이블명 DROP COLUMN 컬럼명;

    -- 예시
    ALTER TABLE EMP DROP COLUMN EMAIL;
    ```


## 제약 조건 

### 1. 컬럼에 DEFAULT 값 추가/변경

    ```sql
    ALTER TABLE 테이블명 MODIFY 컬럼명 DEFAULT 기본값;

    -- 작성 예시
    ALTER TABLE EMP MODIFY SAL DEFAULT 1000;
    ```


### 2. 제약 조건 추가/삭제

- null 금지 

    ```sql
    ALTER TABLE EMP MODIFY 칼럼명 NOT NULL;

    -- 작성 예시
    ALTER TABLE EMP MODIFY EMAIL NOT NULL;
    ```

- null 허용 

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