---
layout: single
title: "데이터 입력"
categories: Database
author_profile: true
sidebar_main: true
tag: [SQL, Basic]
toc: true
toc_sticky: true
---

SQLD 시험 대비 공부 정리
{: .notice--info}

# INSERT

- 테이블에 <u>새로운 데이터를 입력할 때</u>는 `INSERT`문을 사용한다.

  - `숫자`: 그대로 기술
  - `문자&날짜`: 싱글 쿼테이션마크(`''`)로 둘러줌

- `VALUES ()`에는 <u>데이터를 컬럼명 순서대로 기술</u>해야한다.

  ```sql
  INSERT INTO 테이블명 (컬럼1, 컬럼2, ...) VALUES (값1, 값2, ...);

  -- 작성 예시
  INSERT INTO EMP VALUES (1, 'KIM', 3000, '2025-05-01');
  ```

- **()를 쓰지않는 경우**

  - <u>전체 컬럼의 데이터를 모두 입력</u>해야하며, <u>테이블의 컬럼 순으로 기술</u>해야한다

  ```sql
  INSERT INTO EMP VALUES (컬럽1의 값, 컬럼2의 값, ...);

  -- 작성 예시
  INSERT INTO EMP VALUES (1, 'KIM', 3000, '2025-05-01');

  INSERT INTO EMP (EMPNO, ENAME) VALUES (2, 'JEONG'); -- 이경우 나머지 칼럼은 암묵적 NULL 값 입력
  ```

- **실행 결과**

    <p align="left">
        <img src="/assets/images/DataBase/oracle/2-1.png"/>
    </p>

## NULL 입력 방법

### 1. 암묵적 NULL 입력

- <u>컬럼 값 생략시 자동으로</u> `NULL` 이 들어간다

  ```sql
  INSERT INTO EMP (EMPNO, ENAME, SAL) VALUES (1, 'KIM', 3000);
  ```

### 2. 명시적 NULL 입력

- **NULL 값 입력**

  ```sql
  INSERT INTO EMP (EMPNO, ENAME, SAL, EMAIL) VALUES (2, 'LEE', 2800, NULL);
  ```

- **싱글쿼테이션 마크('') 입력**

  ```sql
  INSERT INTO EMP (EMPNO, ENAME, SAL, EMAIL)
  VALUES (3, 'PARK', 2500, '');
  ```

  > 📌 **싱글쿼테이션마크('') 를 NULL 로 사용시 주의점**
  >
  > - **Oracle의 경우** ' '(빈 문자열)을 **NULL로 간주**  
  >   (`'' == NULL`)
  > - **MySQL의 경우** ' '(빈 문자열)은 그 자체로 **값이 있는 문자열로 간주**  
  >   (`'' != NULL`)
  >
  >   | DB         | `''` 처리        | `''` = `NULL` |
  >   | ---------- | ---------------- | ------------- |
  >   | **Oracle** | NULL로 처리      | ✅ 예         |
  >   | **MySQL**  | 빈 문자열로 처리 | ❌ 아니오     |

## 날짜 입력 방법

### 1. 기본 날짜 입력 (TO_DATE)

- `TO_DATE()`함수는 <u>문자열을 날짜로 변환하는 함수</u>이다
- TO_DATE('날짜문자열', '포맷') 의 형식을 가지며 날짜 포맷은 다양하게 설정 가능하다

  ```sql
  INSERT INTO EMP (EMPNO, ENAME, SAL, HIREDATE)
  VALUES (1, 'KIM', 3000, TO_DATE('2024/05/10', 'YYYY/MM/DD'));
  ```

  | 포맷                      | 설명        | 예시                                                     |
  | ------------------------- | ----------- | -------------------------------------------------------- |
  | `'YYYY/MM/DD'`            | 2024/05/10  | TO_DATE ('2024/05/10', 'YYYY/MM/DD')                     |
  | `'YYYY-MM-DD'`            | 2024-05-10  | TO_DATE ('2024-05-10', 'YYYY-MM-DD')                     |
  | `'DD-MON-YYYY'`           | 10-MAY-2024 | TO_DATE ('10-MAY-2024', 'DD-MON-YYYY')                   |
  | `'YYYYMMDD'`              | 20240510    | TO_DATE ('20240510', 'YYYYMMDD')                         |
  | `'DD/MM/YYYY HH24:MI:SS'` | 날짜 + 시간 | TO_DATE ('10/05/2024 14:30:00', 'DD/MM/YYYY HH24:MI:SS') |

### 2. SYSDATE: 현재 날짜/시간 입력

- `SYSDATE`는 <u>시스템의 현재 날짜와 시간을 반환</u>한다

  ```sql
  -- 현재 시각 저장
  INSERT INTO EMP (EMPNO, ENAME, SAL, HIREDATE)
  VALUES (2, 'LEE', 3200, SYSDATE);
  ```

### 3. 기본값으로 날짜 설정

- `DEFAULT SYSDATE`시 데이터 입력 시 <u>날짜를 생략해도 자동으로 현재 날짜가 삽입</u>된다

  ```sql
  ALTER TABLE EMP MODIFY (HIREDATE DATE DEFAULT SYSDATE);
  ```

### 4. 시간까지 입력하기

- `HH24`: 24시간제
- `HH`: 12 시간제

  ```sql
  TO_DATE('2024-05-10 13:45:00', 'YYYY-MM-DD HH24:MI:SS')
  ```

### 5. 날짜 출력 포맷 변경

- `TO_CHAR()`: 날짜를 문자열로 출력할 때 사용한다

  ```sql
  SELECT TO_CHAR(HIREDATE, 'YYYY-MM-DD HH24:MI:SS') FROM EMP;
  ```
