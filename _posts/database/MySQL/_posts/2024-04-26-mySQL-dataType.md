---
layout: single
title: "데이터 타입과 함수"
categories: Database
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
---

# 1. 데이터 타입

### 1. 숫자 데이터 타입

- DECIMAL을 제일 사용한다.

<img src="/assets/images//Database/2-1.png" width="400">

### 2. 문자 데이터 타입

  <img src="/assets/images//Database/2-2.png" width="400">

### 3. 날짜와 시간 타입

  <img src="/assets/images//Database/2-3.png" width="400">

### 기본 형식 및 함수

- 중복 제거: distinct
- 문자열 조건: like ‘% 또는 \_’
- 정보 포함/미포함 검색: in, not, not in, <>
- 정렬: order by (기본 오름차순, 내림차순 시 desc)
- 숫자:
  - 반올림: round(n, 반올림 자리 수(생략 가능)
  - abs(n): 양수로 변환
  - pow(a,b): a의 b승
  - truncate(n,m): n의 m번째 자리까지 나타내기
  - count
- 문자열
  - upper / lower : 대문자 / 소문자 변환
  - substr(str,n,m): str문자의 n번째부터 m개 문자 추출
  - lenght / char_lenght : 바이트 길이 / 문자 길이 추출
  - concat(str1,str2,…) / concat ws(문자,str1,str2,…) : 문자열 연결 / str문자들 사이에 문자 삽입
  - trim, ltrim, Rtrim: 공백 제거
  - lpad, Rpad(str1,n,str2): n의 길이가 되도록 str1의 오른쪽(왼쪽)에 str2글자 삽입
  - replace(a,b,c): a문장의 b문자를 c로 반환
  - instr(a,b): a문장에 있는 b문자의 위치 반환
- 자료형 변환
  - cate(A as T) : A를 T자료형으로 변환
  - conver(A,T) : A를 T자료형으로 변환
  - ifnull(a,b): a가 null이 아니면 a반환, null이면 b반환
  - nullif(a,b): 두개 값 비교해서 같으면 null, 다르면 a반환
- 날짜
  - date(t), time(t),timestemp(t), weekday: 연월일, 시분초, 연월일시분초, 요일
  - sysdate(), curdate(): 현재 연월일시분초, 현재 연월일
  - adddate(t, interval n day): t날짜를 n day만큼 증가
  - date_add(t, interval n month): t날짜를 n month만큼 증가
  - date_sub(t, interval n week): t날짜를 n week만큼 증가
  - date_format(t, ‘날짜형식’): t날짜를 ‘날짜형식’으로 변환(%y, %m, %d 등)
- group by
  - 무조건 from. where 뒤에 위치
  - group에 조건이 있는 경우 뒤에 having으로 조건 제공
- any, all, some
  - any: 하나만 만족 O, all: 모든 조건(그룹)들을 만족

### 주요 형식

- **DML :** **SELECT, INSERT, UPDATE, DELETE**
  - insert: 테이블에 값을 넣을 때
    - insert into 테이블명(열1, 열2..) //모든 열에 데이터를 넣을 경우 생략 가능
      values(값1, 값2…)
  - update: 기존 값 변경
    - update 테이블명
      set a = b //a값을 b로 변경
      where 조건
  - delete, truncate: 데이터 삭제
    - delete from ~
    - truncate table ~
- **DDL : CREATE, DROP, ALTER**
  - create: 생성
    - create table 테이블명~ : table 생성
  - drop: 테이블 또는 열 삭제
    - drop table 테이블명: 테이블 삭제
    - alter table 테이블명 drop 열명: 열 삭제
  - alter: 테이블 구조(열)변경
    - alter table 테이블명 modify 열명 열속성(int 등) : 테이블에 열 생성
- **DCL : GRANT, REVOKE, DENY**
  - 테이블 생성 시 데이터의 권한 부여, 제거 등
  - constraint: 키 제약조건
    - creat tabl 테이블명(
      테이블 구성 요소 생성
      constraint pk_a primary(foreign) key 열명);

---

### JOIN

- 내부조인
  - 이퀴조인(inner join): from 테이블1, 테이블2 where 테이블1.공통열 = 테이블2.공통열
  - 자연조인(natural join): from 테이블1 natural join 테이블2
  - join ~ using: from 테이블1 join 테이블2 using(공통열)
  - join ~ on: from 테이블1 join 테이블2 on 테이블1.공통열 = 테이블2.공통열
- 외부조인
  - left outer join: 왼쪽에 있는 테이블의 모든 결과를 가져온 후 오른쪽 테이블의 데이터를 매칭
  - right outer join: 오른쪽에 있는 테이블의 모든 결과를 가져온 후 왼쪽 테이블의 데이터를 매칭
- 셀프조인
  - 테이블1 as 별명1 join 테이블1 as 별명2
    on 별명1.열1 = 별명2.열2
- 뷰(view): 가상테이블 작성
  - create view 가상테이블명
    as select 데이터 선택
    from 테이블명
    where 조건이 있으면 적기
- from (부질의)
  - select 출력 데이터
    from(select 출력 또는 조건이 되는 데이터
    from 테이블명(join해줘도 됨)
    where 조건이 있으면 명시) 별명1 //반드시 별명 줘야함
    where 조건이 있으면 주기

---

### 스토어드 프로시저, 함수

- 프로시저

  ```sql
  delimiter  //
  create procedure 프로시저명(in 열명 속성, out 열명 속성, inout 열명 속성...)
  													-- 모두 사용가능, 입력받는 값이 없으면 안써도 됨
  begin
  	함수(일반적으로 쓰는 함수들 쓰면됨! select, insert, update 등등..
  end //
  delimiter ;

  call 프로시저명(create에서 썼던 입력값 형식에 맞는 데이터들 입력);
  ```

- 스토어드 함수

  ```sql
  -- 스토어드 함수 생성권한 사용
  set global log_bin_trust_function_creators=1;

  delimiter //
  create function 함수명(열명 속성) -- 함수에는 in을 쓰지 않음
  				returns 리턴값

  begin
  		원하는함수
  end //
  delimiter ;

  select 함수명(create에서 썼던 입력값 형식에 맞는 데이터 입력);
  ```

- 트리거

  - 테이블에 DML문(Insert, Update, Delete 등) 이벤트가 발생될 때 작동
  - after: 테이블1에 (update/insert/delete)중 하나 발생 시 테이블2에 (update/insert/delete) 중 하나의 함수를 발생시키겠다

  ```sql
  delimiter //
  create trigger 트리거명
  after (update/insert/delete) -- update/insert,delete 중 하나를 한 후에
  on 테이블1 -- 테이블1에서
  for each row -- 각 행에
  begin -- 무조건 실행되는 쿼리문을 begin에 넣기
    insert into 또는 update 또는 delete 함수 테이블2 -- 테이블2에 이렇게 적용
  end //
  delimiter ;

  -- 테이블1 실행
  (update/insert/delete) 테이블1
  ```

- after - new: 테이블1에 insert한 데이터 중 함수안에 지정한 new.열명에 맞는 데이터 같이 삽입

  ```sql
  delimiter //
  create trigger 트리거명
  after insert
  on 테이블1
  for each row
  begin
    if 조건 then
    insert into 테이블2 values(new.열명, new.열명...);
    end if;
  end //
  delimiter ;

  insert into emp values(테이블1에 넣을 데이터 열에 맞게 작성);
  ```

  - after - old: 테이블1에 있던 지워진 데이터를 values에 맞게 넣기

  ```sql
  delimiter //
  create trigger 트리거명
  after update
  on 테이블1
  for each row
  begin
    if(old.열명 > 조건) then
      insert into 테이블2 values(테이블2에 넣을 데이터 열에 맞게 작성);
      end if;
  end //
  delimiter ;

  테이블1 업데이트

  commit;
  ```
