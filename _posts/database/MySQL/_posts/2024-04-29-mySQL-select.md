---
layout: single
title: "MySQL SELECT 문 "
categories: Database
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
---

# 1. SELECT문

## 1) select (데이터 추출)

- 데이터 추출:

```sql
select 열이름 from 테이블 이름;
```

- 중복 제거:

```sql
select **distinct** 열이름 from 테이블 이름;
```

- 열 이름 설정:

```sql
열이름 **as** 변경할 이름
```

- 두 개 이상 열 합치기:

```sql
**concat**(열1, 열2)
```

<img src="/assets/images//Database/3-1.png" width="400">

```sql
use sjh;

select *from student; -- *로 모든 데이터 추출
select *from subject;
select *from enrol;

-- 데이터 추출 select로 colume명, fome 다음에 table명
 select stu_no, stu_name from student; -- 학번이랑 이름만 뜸
 select stu_dept from student;

 -- 중복제거(distrinct)
 select distinct stu_dept from student; -- 중복된 학과 제거하여 뽑기
 select distinct stu_grade, stu_class from student;

 -- 원하는 별명(alias)으로 데이터 가져오기
 -- 학번, 과목번호, 성적 출력          ↓성적에 10씩 더해서 출력(연산 가능)
 select stu_no, sub_no, enr_grade+10 from enrol;
 select stu_no as ID, stu_no as name from student; -- 필드명이 바껴서 추출됨

 -- 두 개 이상의 열을 합쳐서 검색
select stu_dept, stu_name from student;  -- 학생테이블에 있는 학과, 학생 이름 추출
select concat(stu_dept, stu_name) as 학과성명 from student;

select concat(stu_dept,' ',stu_name,'입니다') as 학과명
from student; -- 한줄뒤에 작성해도 됨
```

---

## 2) where

- 조회하는 결과에 특정한 조건 줘서 원하는 데이터만 보고 싶을 때 사용
- SELECT 필드이름 FROM 테이블이름 WHERE 조건식;

  ```sql
  -- where절 사용
  select stu_name, stu_dept, stu_grade, stu_class
  from student
  where stu_dept='컴퓨터정보'; -- 학과가 컴퓨터정보 일 때만 추출

  -- and 연산자 사용
  select stu_name, stu_dept, stu_grade, stu_class
  from student
  where stu_dept='컴퓨터정보' and stu_grade=2; -- 컴퓨터정보인 2학년 학생 정보
  ```

---

## 3) limit

- 원하는 만큼 데이터 추출

  ```sql
  -- 원하는 만큼만 데이터를 가져오기
  select *
  from student
  limit 5; -- 5개만 출력

  select *from student;
  select *
  from student limit 1,5; -- 인덱스 1부터 5개
  ```

---

## 4) BETWEEN… AND와 IN( ) 그리고 LIKE

&emsp; **(1) BETWEEN… AND**

- 데이터가 숫자로 구성되어 있어 연속적인 작업일 때 사용

  ```sql
  -- WHERE **BETWEEN… AND** 범위 조건
  select *
  from student
  where stu_weight between 60 and 70;

  select *
  from student
  where stu_no between 20140001 and 20149999;
  ```

---

&emsp; **(2) LIKE**

- `%`: 0개 이상 문자 (김% = 김으로 시작만 하면 한글자도 상관없음)
- `\_`: 1개 이상 문자 (김% = 김으로 시작하는 1개 이상의 문자여야 함)

```sql
-- LIKE 이용
select stu_no, stu_name, stu_dept
from student
where stu_name like '김%'; -- 성이 김씨인 학생 추출

select stu_no, stu_name, stu_dept
from student
where stu_name like '_수%'; -- 앞글자가 하나 와야하고 두번째 글자에 수만 있으면 됨

select *
from student
where stu_no like '2014%'; -- 2014로 시작하는 모든 학번
```

&emsp; **(3) IN( ):**

- 정보 포함 검색

&emsp; **(4) not, not in, <>:**

- 정보 제외 검색

```sql
-- IN 사용하여 특정 조건 정보 추출
SELECT stu_no, stu_name, stu_dept
FROM student
WHERE stu_dept IN('컴퓨터정보', '기계');

-- not으로 특정정보 제외 정보 추출
SELECT *
FROM student
WHERE not stu_dept='컴퓨터정보';

SELECT *
FROM student
WHERE stu_dept not in('컴퓨터정보');

SELECT *
FROM student
WHERE stu_dept<>('컴퓨터정보');

SELECT *
FROM student
WHERE stu_height >= 170;
```

---

## 5) null값 찾기

```sql
-- null 값 존재 여부
SELECT stu_no, stu_name, stu_height
FROM student
WHERE stu_height is null; -- null인 경우만 추출

SELECT stu_no, stu_name, stu_height
FROM student
WHERE stu_height is not null; -- null인 경우 제외 추출
```

---

## 6) ORDER

```sql
SELECT Name, height FROM userTbl ORDER BY height DESC, name ASC;
```

- 원하는 순서대로 정렬하여 출력
- 기본적으로 오름차순 (ASCENDING) 정렬
- 내림차순 (DESCENDING) 으로 정렬(열 이름 뒤에 DESC 적어줄 것)
- ORDER BY 구문을 혼합해 사용하는 구문도 가능

```sql
-- 순서화(정렬)
SELECT stu_no, stu_name
FROM student
ORDER BY stu_no; -- 오름차순

SELECT stu_no, stu_name
FROM student
ORDER BY stu_no desc; -- 내림차순

-- 별칭이 붙어있는 열을 기준으로 정렬
SELECT stu_no, stu_name, stu_dept, stu_weight-5 as target
FROM student
ORDER BY target; -- 뒤에 asc 생략가능(디폴트 오름차순)

-- 열의 순서번호 이용하여 정렬
SELECT stu_no, stu_name, stu_dept, stu_weight-5 as target
FROM student
ORDER BY 4; -- 열의 순서 4번째(stu_weight-5) 기준 정렬

SELECT stu_no, stu_name, stu_dept, stu_weight-5 as target
FROM student
ORDER BY stu_weight-5; -- order by에 연산 넣어도 됨

-- 두 개 이상의 열 정렬
SELECT stu_no, stu_name, stu_dept, stu_weight-5 as target
FROM student
ORDER BY stu_dept, target; -- 앞에 적은 열 먼저 정렬, 그 이후 두번째 열 정렬

SELECT stu_no, stu_name, stu_dept, stu_weight-5 as target
FROM student
ORDER BY stu_dept desc, target desc; -- 내림차순은 각 열마다 적어줘야 함
```

- top-n 질의
  - 위에서부터 n명 추출
  - order by로 정렬하고 limit으로 n명 정함
- from에 테이블 지정 안하고 부질의로 가져올 경우 as 별명을 붙여줘야 함(from으로 가져다놔도 됨)

```sql
select stu_no, stu_name, stu_height
from(select stu_no, stu_name, stu_height
    from student
    where stu_height is not null
    order by stu_height desc limit 5) as sub; -- 키순서 5명 뽑음
    -- from뒤에 테이블명 없이 부질의로 할 경우 as로해서 별칭을 줘야 에러가 안남!

-- 가장 최근에 입사한 3명 사원번호, 사원이름, 입사일 검색
select empno, ename, hiredate
from(select empno, ename, hiredate
    from emp
    where hiredate is not null
    order by hiredate desc limit 3) as b;

-- 위와 같지만 부질의 사용 안할 경우
select empno, ename, hiredate
from emp
where hiredate is not null
order by hiredate desc limit 3;

-- 부서별 평균 급여가 가장 큰 부서2개의 부서 이름 검색(2개 테이블 join해야 함)
select dname
from(select dname, avg(sal)
    from emp, dept
    where emp.deptno = dept.deptno
    group by dname
    order by 2 desc limit 2)as sub;
```

---

## 7) 사칙연산

&emsp; (1) 기본적인 사칙연산 가능

```sql
-- 사칙연산
SELECT 1+2;
SELECT 3*(2+4)/2, 'hi';
SELECT 10%3; -- 나머지 연산도 가능

-- 문자열에 사친연산을 하는 경우 0으로 인식
SELECT 'AB'+3; -- AB=0으로 인식해서 3이 출력됨
SELECT 'AB'*3; -- 0*3=0

SELECT true,false; -- 1,0 출력
SELECT true is true;
SELECT 2+4=6 or 2*4=8; -- 둘다 참이니까 1(true) 출력
SELECT 'B' = 'b'; -- 참(1). mysql의 기본 사칙 연산자는 대소문자 구분X

SELECT 10 BETWEEN 15 and 20; -- 10은 15와 20사이에 없으니 0(false) 출력
SELECT 'apple' not between 'banana' and 'computer'; -- 사전순으로 판단. not이 맞으니 1

SELECT 1+2 in(2,3,4);
SELECT 'hi' in (1,true,'hi'); -- ()안에 해당 글자가 들어있는가 판단
```

---

## 8) 함수

&emsp; **(1) round 함수**

- round는 첫째자리 반올림,
- 0은 정수 출력
- 1은 소수점 첫째자리 반올림
- -1은 1의자리 반올림

```sql
-- round 함수(반올림)
select round(345.678), round(345.678,0),
round(345.678,1), round(345.678,-1); -- MySQL에서 from dual으로 함수 제공(생략가능)

select abs(1),abs(-1),abs(3-10); -- 양수(+)로 변경
select pow(2,3), power(5,2), sqrt(16); -- pow, power는 a의 b승 / sqrt는 루트

select truncate(1234.5678,1), -- 소수점 첫째 자리까지 나타냄
truncate(1234.5678,2), -- 소수점 둘째 자리까지 나타냄
truncate(1234.5678,-1); -- 일의 자리 버림
```

&emsp; **(2) 문자열 관련 함수**

```sql
select upper('korea'); -- 대문자로 변경
select lower('KOREA'); -- 소문자로 변경

-- substr 문자열 추출
select substr('ABCDEFGH',3), -- 3위치부터 뒤에 다 출력 CDEFGH
substr('ABCDEFGH',3,2), -- 3위치부터 2개 글자 출력 CD
substr('ABCDEFGH',-4), -- 뒤에서부터 4글자 EFGH
substr('ABCDEFGH',-4,2); -- EF

-- 문자열 길이 측정
select length('ABCDEFGH'), -- 문자열 바이트 길이 8
char_length('ABC'); -- 문자열 문자 길이 3 / 영어는 상관 없음

select length('안녕하세요'), char_length('안녕하세요'); -- 15, 5 출력 한글일땐 결과가 다름

-- concat 함수로 문자열 연결
select concat('hello', ' ', '2024', '03', '13'), -- 문자열 연결 hello 20240313
concat_ws('-',2024,3,13,'PM'); -- 괄호 안에 내용이 첫번째 매개변수로 붙여짐 2024-3-13-PM

-- concat에 ltrim 공백 제거
select concat('|', ltrim(' hello'),'|'), -- left trim(공백제거)
concat('|', Rtrim(' hello    '),'|'), -- right trim 오른쪽 공백 제거
concat('|', trim('   hello    '),'|'); -- trim 양쪽 공백 제거

-- lpad(S,N,P) : S가 N이 될 때 까지 P를 왼쪽에 이어붙음
select lpad('AB',5,'#'), -- ###AB
Rpad('ABC',5,'@'); -- ABC@@

-- replace(S,O,N) : S에 있는 문자 O를 N으로 변경
select replace('버거킹에서 버거킹 햄버거 먹었다','버거킹','맘스터치');

-- instr(S, s) : S중 s의 첫 위치 반환
select instr('ABCDE','ABC'), -- 1출력
instr('ABCDE','BC'); -- 2출력
```

&emsp; **(3) 자료형 변환**

```sql
-- cate(A as T) : A를 T자료형으로 변환
select
'01' = '1',  -- 문자열 01이랑 1이 같은가? false(0)
cast('01'as decimal) = cast('1' as decimal); -- 01과 1을 정수로 바꿨을 때 같은가? true(1)

-- conver(A,T) : A를 T자료형으로 변환
select
'01' = '1',  -- 0 출력
convert('01',decimal) = convert('1',decimal); -- 1출력
```

&emsp; **(4) 날짜함수**

```sql
select date(now()); -- 현재 연월일
select time(now()); -- 현재 시분초
select timestamp(now()); -- 현재 연월일시분초
select sysdate(); -- 현재 연월일 시분초
select curdate(); -- 연월일

select adddate(now(), interval 1 day); -- 오늘 기준 다음날 출력
select date_add(now(), interval 1 month); -- 오늘 기준으로 다음달 출력(adddate랑 같음)
select date_sub(now(), interval 1 week); -- 오늘 기준 일주일 전 출력

-- 월 0, 화 1, 수 2, 목 3, 금 4, 토 5, 일 6
-- adddate(date, interval) : date 기준 interval만큼 날짜 이동
select weekday(curdate()); -- 오늘이 수요일이라 2가 뜸
select adddate(curdate(), -weekday(curdate())) as monday;
-- 2024/03/13 수요일 에서 오늘날짜를 뺌(2 빼기) = 3/11 출력, 이번주 월요일
select adddate(curdate(), weekday(curdate())+1);
-- 2024/03/13 수요일 에서 오늘날짜+1 더함(3 더하기) = 3/16 출력, 이번주 토요일
select adddate('2024-02-20', weekday('2024-02-20'));
-- 2/20은 화요일이라 weekday로 더해지면 2/21 출력
select date_add('2010-12-31',interval 1 day); -- 2011-01-01 출력

select curdate(), curtime(), now();

-- 날짜형식(포멧팅)
select empno, ename, cast(hiredate as char),
date_format(hiredate, '%Y-%m') as 입사년월
from emp;
```

&emsp; **(5) ifnull / nullif 함수**

```sql
-- ifnull/nullif 함수
-- ifnull(수식1, 수식2) : 수식1이 null이 아니면 수식1 반환, null이면 수식2 반환
select ifnull(stu_height,0) from student; -- null이면 0으로 반환

-- nullif(인수1, 인수2) : 두개 값 비교해서 값이 같으면 null 반환, 같지 않으면 인수1 반환
select ifnull(nullif('A','A'),'널값');
--     ifnull(null,'널값'); 두개 값이 같아서 null로 반환됨
```

&emsp; **(6) count**

```sql
-- count : null은 포함X
select count(*), count(stu_height) from student;
select count(stu_dept) from student;
select count(stu_dept), count(distinct stu_dept) from student; -- 중복 제거 안하면 행의 수 다셈
```

---

## 9) GROUP BY 및 HAVING

&emsp; **(1) GROUP BY**

- 그룹으로 묶어줌. 집계 함수(Aggregate Function) 함께 사용

<img src="/assets/images//Database/3-2.png" width="400">

```sql
-- group by
select stu_dept, count(*) from student group by stu_dept; -- 학과와 학과의 인원 수(count)
select stu_dept, count(*) from student where stu_weight >=50 group by stu_dept; -- group by 위치!

select stu_dept, format(avg(stu_weight) ,0)from student group by stu_dept; -- null값이 포함된 경우 계산이 잘  안됨
select stu_dept, stu_grade, count(*) from student group by stu_dept, stu_grade; -- 전공과 학년으로 그룹함
```

&emsp; **(2) HAVING**

- 반드시 group by 다음에 나와야 함
- group으로 묶은 거에 조건 존재!

```sql
-- having
select stu_grade, format(avg(stu_height),1)
from student
where stu_dept='기계'
group by stu_grade -- avg랑 group은 같이 써야함!
having (avg(stu_height))>=160;
---------------------------------------
학과는 기계학과이면서, 학년별로 평균키가 160이상인 편균 키 값 출력

			 기계
1학년 평균키가 160 이상
2학년 평균키가 160 이상  > 2,3학년은 평균키가 160 이상이 안되서 출력이 안됨
3학년 평균키가 160 이상
--------------------------------------------
select stu_dept, max(stu_height)
from student
group by stu_dept
having max(stu_height) >=175; -- 최대키가 175 이상인 학과만 출력함
```

&emsp; **(3) ROLLUP**

---

## 10) ANY/ALL/SOME, 서브쿼리(SubQuery, 하위쿼리)

&emsp; **(1) 서브쿼리**

- 쿼리문 안에 또 쿼리문이 들어가 있는 것

&emsp; **(2) ANY/ALL/SOME**

- ANY
- ALL
- SOME

```sql
-- 부질의(서브쿼리)
-- 옥성우 학생의 키
select stu_height from student where stu_name ='옥성우';

-- 옥성우 학생보다 키 큰 학생의 이름 출력
select stu_name from student where stu_height > 172;

-- 한번에 작성
select stu_name
from student
where stu_height >
(select stu_height from student where stu_name ='옥성우');

-- 박희철 학생과 몸무게가 같은 학생(본인 이름은 제외)
select stu_name
from student
where stu_weight =
(select stu_weight from student where stu_name ='박희철')
and stu_name<>'박희철';

-- 평균 키보다 큰 학생의 정보 출력
select *
from student
where stu_height > (select avg(stu_height) from student);

-- 학과별 평균키라는 그룹이 형성되어 all 없이 작동 x
select *
from student
where stu_height > all(select avg(stu_height) from student group by stu_dept);
-- all : 서브쿼리의 모든 결과값을 만족시켜야 함
-- 학과별 키의 평균은 3개가 나옴
-- all이 없으면 실행안됨

-- any는 하나만 만족해도 됨
select *
from student
where stu_height > any(select avg(stu_height) from student group by stu_dept);

-- in : where에 조건 추가
select *
from student
where stu_class
in(select stu_class from student
where stu_dept='컴퓨터정보') -- 컴퓨터 정보가 포함된 반 ABC 출력
and stu_dept<>'컴퓨터정보'; -- 근데 컴퓨터 정보는 빼고

```

---

# DML, DDL, DCL

- 간단 정리
  - **DML :** **SELECT, INSERT, UPDATE, DELETE**
  - **DDL : CREATE, DROP, ALTER**
  - **DCL : GRANT, REVOKE, DENY**
- **DML (Data Manipulation Language)**

## 1. DML

- **데이터 조작** 언어
- 데이터를 조작(선택, 삽입, 수정, 삭제)하는 데 사용되는 언어
- SQL문 중 **SELECT, INSERT, UPDATE, DELETE**가 이 구문에 해당
- 트랜잭션 (Transaction)이 발생하는 SQL도 이 DML에 속함
  - 테이블의 데이터를 변경(입력/수정/삭제)할 때 실제 테이블에 완전히 적용하지 않고, 임시로 적용시키는 것
  - **취소 가능!**
- **INSERT문**

  - 테이블에 값을 넣음
  - INSERT INTO… SELECT 구문 사용

  ```sql
  -- 테이블 복사
  create table a_enrol
  as -- 뒤에 정보들을 담음
  select *  -- 모든 정보 선택
  from enrol -- enrol테이블로부터
  where stu_no < 20150000; -- 2015이전 학번만 복사해서 새로운 테이블 생성

  select *from a_enrol;

  -- 데이터 삽입
  insert into a_enrol(sub_no, stu_no, enr_grade)
  values(108, 20151062,92);

  -- 개수와 필드에 맞게 값 넣으면 필드 생략 가능
  insert into a_enrol values(109, 20151063,95);

  -- 모든 필드가 아닌 값을 넣을 경우 필드명을 넣어줘야함(없는 필드값은 null로 삽입)
  insert into a_enrol(sub_no, stu_no)
  values(110, 20152088);

  select *from a_enrol;

  -- 다른 테이블의 정보중 일부를 복사 붙여넣기
  insert into a_enrol
  select *from enrol
  where stu_no like '2015%';

  select *from a_enrol;
  ```

- update

  - 기존에 입력되어 있는 값 변경하는 구문
  - WHERE절 생략 가능하나 테이블의 전체 행의 내용 변경

  ```sql
  -- 과목번호가 104번인 성적을 10더함
  update a_enrol
  set enr_grade=enr_grade+10
  where sub_no=(select sub_no from subject where sub_name='시스템분석설계');
  ```

- DELETE FROM(데이터 삭제)

  - 일부 데이터만 삭제할 경우 사용
  - truncate 또는 delete 사용 가능

  ```sql
  -- 삭제
  delete from a_enrol where stu_no = 20130001;

  -- a_enrol 모든 데이터 삭제(truncate, delete 사용 가능)
  truncate table a_enrol;
  delete from a_enrol;

  -- 테이블은 남아있지만 데이터가 없음(모든 튜플을 삭제했기 때문)
  select *from a_enrol;
  ```

- 활용기출

  ```sql
  -- 학생테이블로부터 학년이 1 또는 2학년인 조건들만 복사하여 student1 테이블을 생성한다.
  create table student1
  select *
  from student
  where stu_grade =1 or stu_grade =2;

  -- 과목테이블을 복사하여 subject1 테이블을 생성한다.
  create table subject1
  select *
  from subject;

  -- 수강테이블을 복사하여 enrol1 테이블을 생성한다.
  create table enrol1
  select *
  from enrol;

  -- 다 한 후 복사된 테이블의 내용을 확인한다.
  select *from student1;
  select *from subject1;
  select *from enrol1;

  -- 학번 20101059, 이름 조병준, 학과 컴퓨터정보, 학년 1, 반B, 키 164, 몸무게 70인남학생이 추가되었다.
  insert into student1 values(20101059, '조병준', '컴퓨터정보', 1, 'B', 'M', 164, 70);

  -- 학번 20102038, 이름 남지선, 학과 전기전자, 학년 1, 반C, 여학생이 추가되었다.
  insert into student1 (stu_no, stu_name, stu_dept, stu_grade, stu_class, stu_gender)
  values(20102038, '남지선', '전기전자', 1, 'C', 'F');

  -- Student1 테이블에 학생 테이블의 3학년 학생들 데이터를 입력하라.
  insert into student1
  select * from student where stu_grade =3;
  ```

- 예제

  ```sql
  -- 20153088 학생이 자퇴함
  delete from student1 where stu_no = 20153088;
  select *from student1;

  -- 과목번호 112, 과목이름 자동화시스템, 교수명 김종민, 3학년 기계 추가
  insert into subject1 values(112,'자동화시스템','고종민',3,'기계');
  select *from subject1;

  -- 과목번호 110이 501로 변경
  update subject1
  set sub_no = 501
  where sub_no = 110;
  ```

- 데이터 수정 예제

  ```sql
  select *from subject1;
  select *from student1;
  select *from enrol1;

  -- 과목번호 101이 폐강됨
  delete from subject1 where sub_no = 101;

  -- enrol1 테이블에서 subject1에 없는 과목번호를 999로 변경
  update enrol1
  set sub_no = 999
  where sub_no not in (select sub_no from subject1);

  -- enrol1에서 과목번호 999 삭제
  delete from enrol1 where sub_no=999;

  -- insert update delete → commit 해줘야함! 여러가지 프로그램으로 돌리면 반영 안될 수 있음
  commit;
  ```

## 2. DDL (Data Definition Language)

- 테이블 수정(vs DML: 데이터 수정)
- **CREATE, DROP, ALTER** 구문
- DDL은 트랜잭션 발생시키지 않음
  - 되돌림(ROLLBACK)이나 완전적용(COMMIT) 사용 불가
  - DDL문은 실행 즉시 MySQL에 적용
- CREATE: 생성
- DROP: 테이블 또는 열 삭제
- ALTER: 테이블 구조변경

```sql
create table t_tbl(
t_empno int(4) not null, -- 데이터가 꼭 있어야하는 경우 not null 적어줌. pk가 있으니 안적어도됨
t_ename varchar(40),
t_job varchar(9),
t_mgr int(4),
t_hirdfate date,
t_sal decimal(7,2),
t_com decimal(7,2),
t_deptno int(2),
primary key(t_empno)); -- pk: 기본키

-- 부서번호 20인 데이터만 뽑아 t_tbl 삽입
insert into t_tbl
select *
from emp
where deptno=20;

select *from t_tbl;

-- alter : 테이블 구조 변경
-- t_tbl에 성별 열 삽입 - char(1)
alter table t_tbl
add(t_gender char(1));

desc t_tbl; -- 성별 열이 생겼음을 확인

-- 성별 열의 varchar(10)으로 변경
alter table t_tbl modify t_gender varchar(10);
desc t_tbl; -- t_gender가 varchar(10)으로 변경됨

alter table t_tbl drop t_gender;
desc t_tbl;  -- t_gender 열이 삭제됨 확인
```

- **DCL (Data Control Language)**
  - 데이터 제어 언어
  - 사용자에게 어떤 권한을 부여하거나 빼앗을 때 주로 사용하는 구문
  - **GRANT/REVOKE/DENY** 구문
- 테이블 작성
  ```sql
  create table customer(
  cust_id int not null auto_increment, -- 숫자 자동 증가
  cust_name varchar(10) not null,
  phone varchar(20) not null unique,
  regi_date datetime default now(), -- 기본값=현재값
  addr_code varchar(3) not null,
  primary key(cust_id), -- primary key 앞에 constraint 작성 가능(보통 생략)
  foreign key(addr_code) references addr(addr_code)); -- addr테이블에 있는 addr_code 참조
  ```

### constraint 제약조건

- 데이터베이스의 상태가 항상 만족해야 할 기본 규칙

  1. 키 제약 조건: 테이블에서 각 튜플을 유일하게 식별할 수 있는 수단(기본키)

     ```sql
     create table t_tbl(
     t_empno int(4),
     t_ename varchar(40),
     t_job varchar(9)
     constraint p_k primary key(t_empno));
     ```

  2. 무결성 제약 조건: 기본키에 있는 속성값들은 어떠한 경우에도 null값을 가질 수 없다

     - NOT NULL: 열에 NULL값 허용하지 않음
     - UNIQUE KEY: 열 또는 열 조합이 유일성을 가져야 함
     - PRIMARY KEY: 열에 NULL 허용 안되고 유일성을 가져야 함(not null, unique)
     - FOREIGN KEY: 다른 테이블에 참조하는 튜플에 값이 있어야 함

     ```sql
     create table t_tbl(
     t_empno int(4) not null, -- 열 옆에 적어서 사용
     t_ename varchar(40) unique,
     t_job varchar(9) primary key;
     t_mgr int(4),
     constraint p_k primary key(t_empno));
     ```

- DML, DDL, DCL 작성 예제

  ```sql
  use sjh;
  SET SQL_SAFE_UPDATES = 0;

  -- 1. 20 또는 30인 부서번호만 사원(emp)테이블에서 복사하여 emp1테이블을 생성해라.
  create table emp1
  as
  select *
  from emp
  where deptno = 20 or deptno = 30;

  -- 2. dept 테이블을 복사하여 dept1테이블을 생성해라.
  create table dept1
  as
  select *
  from dept;

  -- 3. salgrade테이블을 복사하여 salgrade1테이블을 생성해라.
  create table salgrade1
  as
  select *
  from salgrade;

  -- 4. 각각의 테이블을 확인한다.
  select *from emp1;
  select *from dept1;
  select *from salgrade1;

  -- 5. 사원번호 7401, 사원이름 HOMER, 급여 1300, 부서번호 10인 사원이 오늘 입사하였다.
  insert into emp1(empno, ename, sal, deptno)
  values (7401, 'HONER', 1300, 10);

  -- 6. 사원번호 7323, 사원이름 BRANDA, 부서번호 30, 사원번호 7499와 동일한 급여를 받는 사원이 입사하였다. (부질의)
  insert into emp1(empno, ename, sal, deptno)
  select 7323, 'BRANDA', 30, sal from emp1 where empno = '7499';

  -- 7. 사원(emp)테이블에서 부서번호가 10인 데이터를 emp1테이블에 삽입해라.
  insert into emp1
  select *from emp where deptno = 10;

  -- 8. 사원번호 7369의 사원직무를 ANALYST로 바꾸어라.
  update emp1
  set job='ANALYST'
  where empno = 7369;

  -- 9. 부서번호 20인 직원들의 급여를 10% 감하라.
  update emp1
  set sal = sal * 0.9;

  -- 10. 모든 사원의 급여를 +100 증가시켜라
  update emp1
  set sal = sal + 100;

  -- 11. 지역이 DALLAS인 사원들의 급여를 10감하라. (부질의)
  update emp1
  set sal = sal -10
  where deptno not in(select deptno from dept where loc="dallas");

  -- 12. 사원번호 7499가 퇴사하였다.
  delete from emp1 where empno=7499;

  -- 13. 부서번호 50, 부서이름 ‘PLANNING’, 지역 ‘MIAMI’가 추가되었다.
  insert into dept1
  values (50, 'PLANNING', 'MIAMI');

  -- 14. 부서번호가 40인 부서가 60으로 변경되었다.
  update dept1
  set deptno = 50
  where deptno = 40;

  -- 15. Dept1 테이블에 없는 부서번호들을 갖고 있는 사원들의 부서번호를 99로 변경하라. (부질의)
  update emp1
  set deptno = 99
  where deptno not in (select deptno from dept1);

  -- 16. JONES, JOSH, CLARK가 30번 부서로 바뀌었다.
  update emp1
  set deptno = 30
  where ename = 'jones' or ename = 'josh' or ename = 'clark';

  -- 17. 커미션이 null인 데이터를 0으로 바꾸어라.
  update emp1
  set comm = 0
  where comm is null;

  -- 18. Emp1 전체 테이블의 데이터를 삭제하라.
  delete from emp1;
  ```

  - alter 예제

  ```sql
  -- 1. 상품 정보(product)테이블에 열 이름이 ‘비고’ 라는 열을 varchar2(20)으로 삽입해라.
  alter table product
  add(비고 varchar(20));
  -- 2. 1번에서 삽입한 열이 상품 정보(product)테이블에 삽입되었는지 확인해라.
  desc product;
  -- 3. 상품 정보(product)테이블에 ‘비고’ 열의 구조를 char(3)으로 변경해라.
  alter table product modify 비고 char(3);
  -- 4. 상품코드 401에 대한 거래내역 뷰(v_trade)를 만들어라.
  create view v_trade
  as select *from trade where p_code=401;
  ```

- 참고:
  Error Code: 1175인 경우 UPDATE 에 대해서 안전 모드로 되어있어서 SAFE MODE 를 꺼주면 됨
  `sql
SET SQL_SAFE_UPDATES = 0;
`

### 변수선언

- 변수선언: @변수명 = 값;

  ```sql
  -- 변수선언
  set @var1=10;
  set @var2=20;

  select @var2;
  select @var1 + @var2; -- 연산가능
  select @var1 from emp; -- emp 테이블에 띄움
  ```

- 프로시저 안에서 변수 선언: declare

  ```sql
  -- procedure과 IF문
  delimiter //
  create procedure pr1()
  begin
  	if 5 = 5 then
  		select '5는 5와 같다';
  	end if; -- if랑 for문은 끝날때 end if / end for문명 해줘야함
  end //
  delimiter ;

  call pr1();

  -- 프로시저 + 변수선언 IF
  delimiter //
  create procedure pr2()
  begin
  	declare num int; -- 변수 선언, procedure밖이면 @로 변수선언
      set num = 100; -- 변수에 값 대입
      if num = 100 then
  		select '100이다';
  	else
  		select '100이아니다';
  	end if;
  end //
  delimiter ;

  call pr2();
  ```
