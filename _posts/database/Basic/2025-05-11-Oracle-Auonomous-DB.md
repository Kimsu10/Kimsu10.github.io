---
layout: single
title: "Mac에서 Oracle Autonomous DB 사용하기"
categories: Database
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
---

데스크탑(Window)에 Oracle DB를 사용하고 있었는데, MacBook에서 사용하고싶어 방법을 찾아보았다.

> 1. Oracle Autonomous Database 사용(클라우드 방식)
> 2. Docker를 사용해서 Oracle DBMS를 직접 설치해서 사용 (로컬 개발용)

당장 시험이 2주 남은 시점에서 Docker를 설정하고 공부하기에는 시간이 부족하므로 클라우드 방식을 선택했다

# Oracle Autonomous Database

- <u>Oracle Cloud에서 제공하는 managed DB를 사용하는 방식</u>(Oracle이 공식지원)
- 설치할 필요 없이 바로 클라이언트에 접속 가능하다 (인터넷 연결 필요)

## 설치 하기

우선 Oracle Autonomous Database에 접속하기 위해서 DBeaver를 설치해야한다

> [DBeaver 다운로드 페이지](https://dbeaver.io/download/)  
> 자신의 운영체제에 맞게 다운르도

### 1. DBeaver 다운로드

- 오픈소스로 개발된 DB 클라이언트 툴로, 데이터베이스 접근을 도와준다
- 또한 SQL 실행, 데이터 확인/수정, 스키마 탐색, ERD 생성 등을 지원

  <p align="center" >
    <img src="/assets/images/DataBase/oracle/dbeaver.png" width="95%"/>
  </p>

### 2. 보안 설정

Autonomous DB는 보안을 위해 기본적으로 SSL 암호화 연결을 요구하는데, Oracle Wallet을 사용해서 해결 할 수 있다

- **Oracle Cloud Wallet**
  - Oracle Autonomous Database(자율 운영 DB)에 안전하게 접속하기 위한 인증 파일 모음  
    (보안 접속 정보와 인증서가 들어 있는 ZIP 파일)
    - DB 주소 자동 관리 (IP 대신 서비스명)
    - SSL 인증서 제공 → 신뢰된 접속 보장
    - 암호/인증키 자동 적용 → 수동 입력 필요 없음

> [클라우드 전자지갑으로 DB 이용하기](https://velog.io/@lakebear/%EC%98%A4%EB%9D%BC%ED%81%B4-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%A0%84%EC%9E%90%EC%A7%80%EA%B0%91%EC%9C%BC%EB%A1%9C-DB-%EC%9D%B4%EC%9A%A9%ED%95%98%EA%B8%B0)  
> 위 블로그 글을 보고 wallet을 설정하고 다운로드 (아이디, 비번 기억하기)  
> 다운로드시 별도의 경로를 생성하고 해당 경로에 압축을 해제하자

### 3. OJBDC 설치

- Dbeaver로 Oracle 연결 시 내부적으로 ojdbc를 사용한다
- Oracle JDBC 드라이버는 <u>자바 애플리케이션이 Oracle 데이터베이스와 연결</u>할 수 있도록 해주는 <u>중간 다리</u> 역할을 해준다

  | 역할        | 설명                                                                                 |
  | ----------- | ------------------------------------------------------------------------------------ |
  | DB 연결     | Java 코드에서 `DriverManager.getConnection(...)` 등을 사용할 때 Oracle DB와 연결해줌 |
  | SQL 실행    | `Statement`, `PreparedStatement`를 통해 SQL을 보내고 결과를 받게 해줌                |
  | 데이터 처리 | ResultSet으로 받은 결과를 Java 객체로 처리 가능하게 해줌                             |

> [OJDBC 다운로드 페이지](https://www.oracle.com/kr/database/technologies/appdev/jdbc-downloads.html)  
> 자신이 사용할 oracle 버전에 맞게 다운로드  
> wallet과 같은 경로에 압축해제

- ojdbc 버전 종류

  | 드라이버 이름 | Oracle 버전             |
  | ------------- | ----------------------- |
  | `ojdbc6.jar`  | Java 6, Oracle 11g      |
  | `ojdbc7.jar`  | Java 7, Oracle 12c      |
  | `ojdbc8.jar`  | Java 8, Oracle 18c/19c  |
  | `ojdbc11.jar` | Java 11+ 대응 최신 버전 |

<p align="center" >
  <img src="/assets/images/DataBase/oracle/ojdbc1.png" width="95%"/>
</p>

- 나는 oracle 19c를 사용하므로 ojdbc8을 다운로드

<p align="center" >
  <img src="/assets/images/DataBase/oracle/ojdbc2.png" width="95%"/>
</p>

## 4. Dbeaver 실행

- **왼쪽 상단의 `+` 버튼을 클릭후 `Oracle`을 선택**

<p align="center" >
  <img src="/assets/images/DataBase/oracle/dbeaver2.png" width="95%"/>
</p>

- **DB 연결 설정하기**

  <p align="center" >
    <img src="/assets/images/DataBase/oracle/dbeaver3.png" width="95%"/>
  </p>

  - JDBC URL Template에 wallet을 압축 해제한 경로를 아래와같이 작성한다

  ```bash
  jdbc:oracle:thin:@sqld_high?TNS_ADMIN=/Users/생성한폴더경로/Wallet파일명
  ```

  - username, password는 wallet의 관리자계정과 비밀번호를 입력

- **Driver 세팅**

  - 기존에 설정되어있는 라이브러리들을 모두 삭제

  <p align="center" >
    <img src="/assets/images/DataBase/oracle/dbeaver4.png" width="95%"/>
  </p>

  - `Add Folder` 클릭후 경로에 설치해둔 `ojdbc폴더`를 추가한다

  <p align="center" >
    <img src="/assets/images/DataBase/oracle/dbeaver5.png" width="95%"/>
  </p>

- **Test Connection**

  - 세팅후 왼쪽 하단의 `Test Connection`으로 테스트를 실행해서 `Connected`가 뜨면 연결 성공!

<p align="center" >
  <img src="/assets/images/DataBase/oracle/dbeaver6.png" width="95%"/>
</p>

## 스크립트 작성

- 연결이 성공하면 Dbeaver의 좌측에 아래 이미지와 같이 뜰 것이다
- ORCl -> SQL 편집기 -> 새 SQL 편집기 클릭

<p align="center" >
  <img src="/assets/images/DataBase/oracle/dbeaver7.png" width="95%"/>
</p>

- 생성된 스크립트에 `ORCL > Wallet 계정명` 이 뜬다면 잘 설정된 것이다

  <p align="center" >
    <img src="/assets/images/DataBase/oracle/dbeaver8.png" width="95%"/>
  </p>

<br/>

이제 실습 환경 구성 끝!

<br/>

## 용어 정리

### 1. ATP/ADW

- Oracle Cloud에서 제공하는 **Autonomous Database(자율 운영 데이터베이스)**의 두 가지 유형

  | 용어      | **ATP**                                             | **ADW**                                           |
  | --------- | --------------------------------------------------- | ------------------------------------------------- |
  | 정식 명칭 | Autonomous Transaction Processing                   | utonomous Data Warehouse                          |
  | 설명      | **트랜잭션 처리**에 최적화된 자율 운영 DB           | **데이터 분석/집계**에 최적화된 자율 운영 DB      |
  | 사용 목적 | OLTP (온라인 트랜잭션 처리) — 웹, 모바일 앱, ERP 등 | OLAP (온라인 분석 처리) — BI, 리포트, 데이터 분석 |
  | 특징      | 빠른 응답속도, 대량 동시 처리에 적합                | 복잡한 쿼리, 대규모 집계 처리에 강함              |
  | 설정      | 더 빠른 커밋, 낮은 지연시간                         | 자동 인덱싱, 파티셔닝 최적화                      |
  | 사용 예   | 쇼핑몰 결제 시스템, 로그인 처리 등                  | 매출 분석, 사용자 행동 분석 등                    |

### 2. OCI/OCL

- **"OCL"**이라고 줄여 말할 때는 Oracle Cloud 또는 **Oracle Cloud Infrastructure (OCI)**를 의미한다

  | 약어    | 정식 명칭                   | 설명                                                            |
  | ------- | --------------------------- | --------------------------------------------------------------- |
  | **OCI** | Oracle Cloud Infrastructure | Oracle의 공식 클라우드 플랫폼 (AWS, Azure처럼 IaaS + PaaS 포함) |
  | **OCL** | ❗ 비공식 표현              | 일반적으로는 "Oracle Cloud"를 잘못 줄여 쓴 것일 수 있음         |
