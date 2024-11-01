---
layout: single
title: "MySQL 시작하기"
categories: Database
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
---

# MySQL 시작하기

### MySQL 다운로드

- [https://www.mysql.com/downloads/](https://www.mysql.com/downloads/) > [MySQL Community (GPL) Downloads »](https://dev.mysql.com/downloads/) >
  • [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
  <img src="/assets/images//Database/1-1.png" width="400">
- 설치방법
  <img src="/assets/images//Database/1-2.png" width="400">
  <img src="/assets/images//Database/1-3.png" width="400">
  <img src="/assets/images//Database/1-4.png" width="400">

### MySQL 설정

- 스키마 만들기(Name 작성 후 Apply 계속 누르면됨)
  <img src="/assets/images//Database/1-5.png" width="400">

- [ ] MySQL

  - 한줄 주석: \*주석내용 또는 -- 주석(--뒤에 한 칸 띄워야함)
  - 한줄 실행: ctrl +enter
  - 영역 실행: 드래그 + ctrl +enter
  - 만들어진 테이블 확인은 ‘dese 테이블명’ → SCHEMAS에서 확인하고 싶으면 새로고침!
  - constraint에서 ctrl+enter로 실행하면 table이 이미 만들어진 후이므로 전체 실행(ctrl+shift+enter)하면 이미 만들어진 table은 오류로 뜨게 됨
    <img src="/assets/images//Database/1-6.png" width="400">

  - 데이터 삽입은 insert into 테이블명 values(); 로
  - 열에 맞는 데이터를 ( , , ,)로 입력
  - 입력한 데이터를 드래그+번개모양 버튼 선택(드래그+ctrl+shift+enter도 됨)
    <img src="/assets/images//Database/1-7.png" width="400">

  - 데이터가 입력됐는지 확인하려면 Tables > 테이블 우클릭 > select Rows로 Result Grid 확인
    <img src="/assets/images//Database/1-8.png" width="400">

### 개요

- 데이터베이스: 데이터의 집합, 동시 접근 가능, 데이터 저장 공간 자체
- DB/DBMS 특징
  - 데이터 무결성(Integrity)
  - 데이터의 독립성
  - 보안
  - 데이터 중복 최소화
  - 응용프로그램 제작 및 수정 용이
  - 데이터 안전성 향상
- DBMS 분류: 계층형(변경이 까다로움) / 망형 / **관계형**
- 정보시스템 구축 절차: **1. 사용자 요구 분석 → 2. 설계** → 3. 구현 → 4. 테스트 → 유지보수
- DBMS 사용 이유
  - 수기 작성 → File System(데이터를 파일에 관리) → 데이터 조작·관리가 힘듬
  - DBMS를 통해 조작/관리: SQL로 데이터를 **CRUD**할 수 있음
  * C: create , R: Read , U: update, D: Delete
- DB주요 내용
  - 기본적인 쿼리문은 알고있어야 함
  - 조인 - 내부조인 : 보통 이퀴,join on을 쓰고 편하게는 natural join을 씀
  - 프로시저
  - 트리거
  - 데이터 모델링

### **데이터 모델링 5단계 순서**

- 현실세계에 존재하는 데이터를 DB로 옮기는 변환 과정

  ### **1. 요구사항 분석: 요구사항 정의서**

  | 상세                | 필요요건           |
  | ------------------- | ------------------ |
  | 엔티티 찾기(Entity) | 필요한 요건들 찾기 |

  학생: 학생ID, 이름, 주소
  학과: 교수명, 학과명
  성적: 학과성적, 과목 |
  | 속성 찾기(Attribute) | 필요한 요건의 상세 정보들 찾기
  아이디, 주소, 전화번호 |
  | 관계 찾기(Realation) | 1:다수 관계 , 다수:다수 , 1:1 등 관계
  ex) 학생과 수강의 관계 |

  - 요구사항 정의서 작성 예시
    <요구사항 정의서>

    1. 학생은 아이디, 학과, 학생명, 이메일, 전화번호, 주소, 학년으로 되어있다
    2. 학과는 학과 코드와 학과명으로 되어있다
    3. 한 학과에는 여러 학생이 있다
    4. 학생은 학과별로 관리한다
    5. 과목은 과목 번호, 과목명, 교수로 되어있다
    6. 한 명의 학생은 여러 과목을 수강 할 수 있고, 하나의 과목은 여러 학생이 들을 수 있다
    7. 학생은 수강 한 과목을 들을 수 있다
    8. 학생이 수강 할 때 수강 할 과목 수와 수강 날짜를 가지고 있다
       [객체관계 파악]
    9. 학생: 아이디, 학과, 학생명, 이메일, 전화번호, 주소, 학년
    10. 학과: 학과코드, 학과명
    11. 과목: 과목번호, 과목명, 교수
    12. 수강: 학생은 과목을 수강
    13. 관리: 학생은 학과별로 관리됨

    - 엔티티(테이블): 학생, 학과, 과목
    - 속성: 아이디, 학과, 학생명, 이메일, 전화번호, 주소, 학년 / 학과코드, 학과명 / 과목번호, 과목명, 교수
    - 관계: 수강, 관리 등
    - 요구사항 분석 예
      <img src="/assets/images//Database/1-9.png" width="400">

    - 테이블 정의서 예
      <img src="/assets/images//Database/1-10.png" width="400">

  ### **2. 개념적 모델링: ERD 그리기**(**ER 다이어그램 그리기: [Draw.IO](http://Draw.IO) 사이트 이용)**

  - 객체들 간의 대응관계(맵핑)

  ### **3. 논리적 모델링:** RM - pk(기본키 Primary Key), fk(외래키 Foreign Key) 결정

  - **[ERD Cloud](https://www.erdcloud.com/)**
  - 표 형식, 테이블 형식으로 표현
  - 관계 데이터 모델(RM)을 많이 사용
  - 데이터 타입, null 값 허용 여부, 제약조건, 기본키, 후보키, 외래키 등
  - 세부적으로 결정하고 결과를 문서화 시켜야 함

  ### **4. 물리적 모델링**: 테이블 정의서, PM

  - MySQL > Add Diagram - EER Diagram
    <img src="/assets/images//Database/1-11.png" width="400">

  - 포토폴리오 할 때 내는 부분!(논리적 모델링도 추가하긴 함. 요구사항 정의서는 서술식으로 적은 거 정도 추가)
  - 직접 만들지 않아도 MySQL에서 작성한 테이블과 관계도 확인 가능
    (Database > Reverse Engineer > next(비밀번호 입력)
    <img src="/assets/images//Database/1-12.png" width="400">

          <img src="/03. DATA BASE/00. img/1-13.png" width="400">

    **<물리적 모델링에서 구현 순서>**

  - Forward 엔지니어링: 모델링을 하면 테이블이 생성되면서 쿼리문이 만들어짐
  - Reverse 엔지니어링: 쿼리문을 만들어 테이블을 생성하면 모델링 됨(보통 이렇게 함)

  ### **5. DBMS 구현**

  - 쇼핑몰 데이터 베이스 예)
    <img src="/assets/images//Database/1-14.png" width="400">

### table 작성 예제

- 새로운 테이블 작성

  ```sql
  use sjh2;

  create table major(
  major_code int primary key auto_increment,
  major_name varchar(50));

  desc major;

  create table student(
  student_id int primary key auto_increment,
  student_name varchar(30),
  student_height decimal(5,2),
  major_code int);

  desc student;

  create table enrol(
  enrol_id int primary key auto_increment,
  enrol_name varchar(50),
  prof_code int,
  start_date date,
  end_date date);

  desc enrol;

  create table sutdent_enrol(
  id int not null unique,
  student_id int,
  enrol_code int,
  primary key(student_id, enrol_code));

  desc sutdent_enrol;

  create table prof(
  prof_code int primary key auto_increment,
  prof_name varchar(20),
  major_code int);

  desc prof;
  ```

- 테이블 생성 후 참조 키 추가

  ```sql
  -- add: 열 추가, 제약 조건 추가
  -- student에 있는 major 코드가 major 테이블에 있는 major_code를 참조
  alter table student
  add
  constraint fk_stu foreign key(major_code)
  references major(major_code); -- 연결이유: 무결성을 위해서

  alter table prof
  add
  constraint fk_prof foreign key(major_code)
  references major(major_code);
  ```

    <img src="/assets/images//Database/1-15.png" width="400">
