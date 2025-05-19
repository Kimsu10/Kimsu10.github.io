---
layout: single
title: "문자형 함수"
categories: Database
author_profile: true
sidebar_main: true
tag: [SQL, Basic]
toc: true
toc_sticky: true
---

SQLD 시험 대비 공부 정리
{: .notice--info}

> ✅ **DUAL**
>
> - 오라클에서 임시로 1개의 행을 반환하기 위해 제공하는 특수한 테이블
> - 일반적으로 SELECT문에서 테이블 없이 값을 조회하거나 계산식을 확인할 때 사용

# 1. 대/소문자 변환하기

- 데이터의 대/소문자가 불분명한경우 정확한 데이터 검색을 위해 사용한다

## Lower()

- 대문자를 소문자로 변경

  ```sql
  SELECT lower('SQL Developer') FROM dual;
  -- sql developer
  ```

## Upper()

- 소문자를 대문자로 변경

  ```sql
  SELECT upper('SQL Developer') FROM dual;
  -- SQL DEVELOPER
  ```

## ASCII()

- 영문 알파벳을 사용하는 대표적인 문자 인코딩
- 긴 문자열이 들어와도 <u>가장 첫글자 하나만</u> 인코딩

  ```sql
  SELECT ascii('ABC Developer') FROM dual;
  -- 65
  ```

## CHR()

- ascii 코드를 다시 문자로 인코딩

  ```sql
  SELECT chr(65) FROM dual; -- 오라클
  SELECT char(65) FROM dual; -- sql 서버
  -- A
  ```

---

# 2. 특정 문자열 잘라내기

## TRIM()

- <u>양쪽 끝</u>에서 공백 또는 지정한 문자를 <u>제거</u>

- **ORACLE의 TRIM()**

  ```sql
  TRIM([LEADING | TRAILING | BOTH] '제거할문자' FROM 문자열)

  -- 양쪽의 공백 제거
  SELECT TRIM('   Hello World   ') FROM dual;
  -- 'Hello World'

  -- 지정된 문자를 양쪽애서 제거
  SELECT TRIM('H' FROM 'HHHelloHH') FROM dual; -- BOTH 키워드 생략
  SELECT TRIM( BOTH 'H' FROM 'HHHelloHH') FROM dual;
  -- 'ello'

  -- 앞쪽의 특정 문자 제거
  SELECT TRIM(LEADING 'H' FROM 'HHHello') FROM dual;
  -- 'ello'

  -- 뒤쪽의 특정 문자 제거
  SELECT TRIM(TRAILING 'H' FROM 'HelloHHH') FROM dual;
  -- 'Hello'
  ```

  > - **SQL Server의 TRIM()**
  >
  > - 오라클처럼 LEADING, TRAILING 같은 키워드는 지원하지 않고 공백 제거만 가능
  >
  >   ```sql
  >   -- 공백만 제거(특정 문자 제거 불가)
  >   SELECT TRIM('   Hello World   ') -- 'Hello World'
  >
  >   SELECT REPLACE('HHHelloHH', 'H', '') -- 'ello'
  >   ```

## LTRIM/RTRIM()

- 문자열에서 순서 없이, 포함된 문자면 제거
- `LTRIM()`: 문자열의 왼쪽부터 제거할 "문자 목록(chars)"
- `RTRIM()`: 문자열의 오른쪽부터 제거할 "문자 목록(chars)"

  ```sql
  LTRIM(string, chars)

  SELECT
    LTRIM('      Hello')        -- Hello
    LTRIM('AAHello', 'A'),      -- Hello
    RTRIM('HelloAAA', 'A'),     -- Hello
    TRIM('x' FROM 'xxTextxx')   -- Text
  FROM dual;
  ```

- 모든 문자를 제거할 경우 `NULL`을 반환

  ```sql
  SELECT LTRIM('AAHello', 'AloHe') FROM dual; -- NULL
  ```

- ❗️왼쪽부터 제거를 시도하다가 제거대상이 아닌 문자를 만나는경우 제거가 멈춤!

  ```sql
  SELECT LTRIM('AAHello', 'Ao') FROM dual; -- Hello
  ```

  > 시험❗️  
  > SQL Server의 Ltrim은 2번째 인자로 제거 문자를 받지 못한다.  
  > 사실 업데이트되서 받지만 시험은 못받는걸로 해야함

## INITCAP()

- 문자열의 각 단어의 첫 글자를 대문자로, 나머지는 소문자로 변환

  ```sql
  INITCAP(문자열)

  SELECT INITCAP('sql developer') FROM dual;  --'Sql Developer'
  ```

- Oracle에서만 사용 가능 (SQL Server에는 기본적으로 없음, 따로 구현 필요)
- 공백 기준으로 단어를 구분하여 처리
- 숫자나 특수문자 이후 글자는 그대로 유지됨

  > SQL 서버에서는 LOWER, UPPER, SUBSTRING, CHARINDEX 등을 조합해서 사용

---

# 3. 특정 문자열 찾기

## SUBSTR()

- 문자열에서 <u>특정 위치의 문자를 추출</u>한다
- 시작위치만 인자로 줄 경우 시작위치부터 문자열의 끝까지 반환
- `-`를 사용해서 반대로 탐색 가능

  ```sql
  SUBSTR(문자열, 시작위치, 추출할 철자 수)

  SELECT ('SQL Devloper', 1, 3) FROM dual;  -- SQL
  ```

  > **SQL Sever**
  >
  > - `SUBSTRING(문자열, start, end)`: 3번째 인자 생략 불가
  > - `Left(문자열, n)`: 앞에서부터 n번째까지 출력
  > - `Right(문자열, n)`: 뒤에서부터 n번째까지 출력

## REPLACE()

- 문자열을 치환해주는 함수

  ```sql
  REPLACE(원본문자열, 찾을문자열, 바꿀문자열)

  SELECT REPLACE('SQL Developer', 'SQL', 'MySQL')
  FROM dual; -- MySQL Developer
  ```

## INSTR()

- 특정 문자열의 위치를 찾아서 출력

  ```sql
  INSTR(문자열, 찾는 문자)

  SELECT INSTR('SQL Developer', 'Q') FROM dual; -- 2
  ```

## LPAD/RPAD()

- 왼쪽/오른쪽에서부터 특정 문자열을 N개 만큼 채움
- 데이터 시각화에 유용함

  ```sql
  LPAD(문자열, 전체길이, 채울문자)

  SELECT
    LPAD('SQL',5, '*'),   -- **SQL
    RPAD('SQL',5, '*')    -- SQL**
  FROM dual;
  ```
