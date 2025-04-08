---
layout: single
title: "MySQL Procedure와 Trigger "
categories: Database
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
---

# 3. 스토어드 프로시저·함수, 트리거

|                      | 스토어드 프로시저                 | 스토어드 함수                              |
| -------------------- | --------------------------------- | ------------------------------------------ |
| in/out               | 사용가능                          | 사용불가                                   |
| 반환                 | 별도 반환 구문X                   |
| (out파라미터로 가능) | returns로 반환                    |
| 호출                 | call                              | select                                     |
| select 문            | 안에 select문 사용 가능           | 안에서 집합 결과 반환하는 select 사용 불가 |
| 사용용도             | SQL문, 숫자 계산 등 다양하게 사용 | 계산을 통한 하나의 값 반환                 |

### 스토어드 프로시저(Stored Procedure)

- 저장 프로시저라고도 불림
- 쿼리문의 집합으로 어떠한 동작을 **일괄 처리하기 위한 용도로 사용**
- 특징
  1. 네트워크 부하를 줄여 MySQL 성능 향성
  2. 유지관리 간편
  3. 모듈식 프로그래밍 가능
  4. 보안 강화 편리
- 파라미터에 IN, OUT 등을 사용 가능
- 별도의 반환하는 구문이 없음 (꼭 필요하다면 여러 개의 OUT파라미터 사용해서 값 반환 가능)
- CALL로 호출, 안에 SELECT문 사용 가능
- 여러 SQL문이나 숫자 계산 등의 다양한 용도로 사용

- 쿼리 모듈화: 필요 시 호출, CALL 프로시저\_이름( ) 한 줄로 해결되는 편리함

    <img src="/assets/images//Database/5-1.png" width="400">

- 매개변수 사용(입력 매개 변수를 지정하는 형식)

  - **IN 입력*매개 변수*이름 데이터\_형식**
  - 입력 매개 변수가 있는 스토어드 프로시저 실행 방법: CALL 프로시저\_이름(전달 값);

```sql
-- 저장프로시저(SP. stored procedure)
-- 이 프로시저를 실행하면 학번이 같을 때 학년이 변경되는 프로시저
delimiter  //
create procedure test1(in v_stu_no int,
                        in v_stu_grade char(1)) -- in 2개니까 입력값 2개
begin
  update student
    set stu_grade=v_stu_grade
    where stu_no=v_stu_no; -- 프로시저 test1을 호출할때마다 begin안에 있는 함수 호출
end //
delimiter ;

select *from student where stu_no=20153075; -- 1학년 옥한빛

call test1(20153075,3);  -- 프로시저 호출(20153075학번 3학년으로 변경)
```

- 출력 매개 변수 지정 방법

  - **OUT 출력*매개 변수*이름 데이터\_형식**
  - 출력 매개 변수에 값 대입하기 위해 주로 **SELECT… INTO문** 사용

```sql
-- 학번을 입력하여 이름을 출력하는 프로시저 → 변수에 대입
delimiter  //
create procedure test2(in v_stu_no int,
                        out v_stu_name varchar(12))
begin
  select stu_name -- select ~ into 사용
  into v_stu_name
  from student
  where stu_no=v_stu_no; -- table에 있는 학번과 같은걸 찾음
end //
delimiter ;

call test2(20153075, @d_stu_name); -- v_stu_name을 변수 **@이름지정** 에 넣음
select @d_stu_name; -- 학번에 맞는 이름 호출
```

- 프로시저 안에 쿼리 여러개 사용

```sql
-- (학번, 과목번호가 일치하면) 학생의 점수를 임의 점수만큼 올리고
-- 그 결과를 출력하는 프로시저
delimiter  //
create procedure test3(in v_sub_no char(3),
                        in v_stu_no char(9),
                        inout v_enr_grade int)

begin -- 쿼리문으로 보고 여러개 넣어도 됨
  update enrol -- 성적을 증가시킴(학번, 과목이 같으면)
  set enr_grade = enr_grade + v_enr_grade
  where stu_no = v_stu_no and sub_no = v_sub_no;

  select enr_grade -- 학번, 과목 같으면 증가시킨 성적을 v_enr_grade에 저장
  into v_enr_grade
  from enrol
  where stu_no = v_stu_no and sub_no = v_sub_no;

end //
delimiter ;

set @d_enr_grade = 10;

call test3(102, 20153075, @d_enr_grade); -- 102번 과목을 듣는 20153075의 점수 10 상승
```

- 프로시저 함수 예제

  - IF ~ then 문

```sql
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

- case when then 문

```sql
delimiter //
create procedure pr3()
begin
  declare num int; -- 변수선언
  declare grade char(1); -- 변수선언
    set num = 80; -- 값 대입
case
  when num >=90 then
    set grade = 'A';
  when num >=80 then
    set grade = 'B';
  else
    set grade = 'F';
end case;
  select num,grade;
end //
delimiter ;

call pr3();
```

- while 반복문

```sql
delimiter //
create procedure pr4()
begin
  declare i int;
    declare sum int;
    set i=1;
    set sum=0;

    while(i<=10) do
    set sum=sum+i; -- java처럼 i++못하니 직접 적어줘야함
        set i=i+1;
  end while;

  select sum;
end //
delimiter ;

call pr4();
```

- select ~ into

```sql
delimiter //
create procedure pr5(in v_stu_no char(9))
begin
  declare v_stu_name varchar(12);
    select stu_name into v_stu_name
    from student
    where v_stu_no = stu_no;
    select v_stu_name from student;
end //
delimiter ;

call pr5(20131001);
```

- 예제: 신입사원 입력

  ```sql
  -- 사원번호, 사원이름, 사원직무, 상급자사원번호, 급여, 부서번호를 입력받아
  -- 사원 테이블에 삽입하는 프로시저를 작성해라

  delimiter //
  create procedure test4
  (in v_empno int,
  in v_ename varchar(10),
  in v_job varchar(9),
  in v_mgr int,
  in v_sal decimal(7,2),
  in v_deptno int)

  begin
  	insert into emp(empno, ename, job, mgr, sal, deptno)
    values(v_empno, v_ename, v_job, v_mgr, v_sal, v_deptno);

  end //
  delimiter //

  call test4(7882,'히히히','대리',7902,7000,20);
  ```

- 예제: 부서번호 변경

```sql
-- 부서번호를 변경하는 프로시저를 작성해라.
-- (emp 테이블에서) - update~set~where
-- (입력된 사원번호가 같을때 부서번호 변경해라)

delimiter //
create procedure test6(in v_empno int,
            in v_deptno int)
begin
  update emp
    set deptno = v_deptno
    where empno = v_empno;

end //
delimiter ;

set @d_emptno = 70;
call test6(7882,@d_emptno);
```

- 예제: 테이블의 모든 데이터 삭제

```sql
-- emp 테이블 복사해서 emp2 테이블 생성
create table emp2 as select *from emp;
select *from emp2;

-- emp2테이블의 모든 데이터 삭제시키는 프로시저 작성(all_del)
delimiter //
create procedure all_del() -- 모든 데이터 삭제니까 매개변수 필요없음
begin
  delete from emp2;
end //
delimiter ;

call all_del();

-- 삭제한 데이터를 다시 값 삽입(대량작업일땐 values대신 select)
insert into emp2 select *from emp;
```

- 예제: 이름 가운데에 M이 들어간 사원 삭제

```sql
-- 이름에 'M'이 들어간 사원들 다 삭제 프로시저(del_name)
delimiter //
create procedure del_name()
begin
  delete from emp2
    where ename like '%M%';
end//
delimiter ;

call del_name();

select *from emp2;
```

- 예제: 조건에 맞는 테이블 일부 데이터 가져와서 복사

```sql
-- emp2테이블에 있는 사원번호와 입력한(in) 사원번호가 같은
-- 사원의 이름과 월급, 직무를 검색하는 프로시저(search_pro)
delimiter //
create procedure search_pro(in v_empno int)
begin
    declare v_ename varchar(10);
    declare v_sal decimal(7,2);
    declare v_job varchar(9); -- 변수 선언

    select ename, sal, job
    into v_ename, v_sal, v_job
    from emp2
    where empno = v_empno; -- 사원번호 같을때 해당 내용 복붙

    select v_ename, v_sal, v_job; -- 확인
end //
delimiter ;

call search_pro(7499); -- 사원번호 검색
```

### 스토어드 함수(**Stored Function)**

- 파라미터에 IN, OUT 등을 사용할 수 없음: 모두 입력 파라미터로 사용
- returns문으로 반환받을 값을 줘야 함
- select로 함수 호출
- 반환값이 있을 때 사용, 일반적으로 프로시저를 더 많이 씀

<img src="/assets/images//Database/5-2.png" width="400">

```sql
-- 스토어드 함수 생성권한 사용
set global log_bin_trust_function_creators=1;

delimiter //
create function test5(v_enr_grade int) -- 함수에는 in을 쓰지 않음
				returns char

begin
		declare enr_score char; -- 변수 선언
    if v_enr_grade >= 90 then set enr_score:='A'; -- if~then절
    elseif v_enr_grade >= 80 then set enr_score:='B';
    elseif v_enr_grade >= 70 then set enr_score:='C';
    elseif v_enr_grade >= 60 then set enr_score:='D';
    else set enr_score:='F';
    end if;
    return enr_score;
end //
delimiter ;

select test5(75);
```

- 함수 예제

```sql
set global log_bin_trust_function_creators=1;

-- 급여가 제일 높은 사원이름 출력 함수
delimiter //
create function test6() -- 입력값이 없어도 됨
  returns varchar(50) -- 반환유형=varchar
begin
  declare v_ename varchar(50);
    select ename into v_ename
    from emp
    where sal=(select max(sal) from emp);
    return v_ename;
end //
delimiter ;

select distinct test6() from emp;
```

- 덧셈

```sql
-- 스토어드 프로시저 = 저장 프로시저: 반환형 없음
-- 스토어드 함수 = 저장 함수: 반환형이 있어야 함 return

delimiter //
create function addin(n1 int, n2 int) -- mode를 안씀(입력값=기본적으로 in)
  returns int
begin
  return n1+n2;
end //
delimiter ;

select addin(4,5) as '두수의 합';
```

### 커서

- 스토어드 프로시저 내부에 사용(잘안씀)
- 테이블에서 여러 개의 행을 쿼리한 후, 쿼리의 결과인 행 집합을 한 행씩 처리하기 위한 방식
  <img src="/assets/images//Database/5-3.png" width="400">

```sql
select *from enrol; -- 104번에 해당하는 데이터는 2개
delimiter //
create procedure test10()
begin
  declare v_stu_no char(9);
    declare v_sub_no char(3);
    declare v_enr_grade int;
    declare done int default 0;

  declare endOfRow boolean default false; -- 행의 끝 여부

    declare c1 cursor for select stu_no, sub_no, enr_grade -- ①커서 선언
                          from enrol where sub_no = 104;
                  -- where조건에 맞는 값을 select에 있는 열 데이터대로 읽겠다

  declare continue handler for not found set done=1;-- ②더이상 읽을 행이 없을 때 실행조건
    -- 더이상 읽을 행이 없으면 done=1

    open c1; -- ③ 커서열기
    li:loop -- 반복문 이름을 li로 선언
    fetch from c1 into v_stu_no, v_sub_no, v_enr_grade; -- ④커서에서 데이터 가져옴
        if done then leave li; -- 더이상 읽을 행이 없으면 li를 끝내라
        end if;
        select v_stu_no, v_sub_no, v_enr_grade; -- ⑤데이터 처리
        end loop;
        close c1; -- ⑥커서닫기
end //
delimiter ;

call test10; -- Result 탭으로 2개 나옴!
```

### 트리거(Trigger)

- 테이블에 DML문(Insert, Update, Delete 등) 이벤트가 발생될 때 작동
- IN, OUT 매개 변수를 사용할 수 없음

| trigger_time 종류 | 작동                                                          | 순서                                            |
| ----------------- | ------------------------------------------------------------- | ----------------------------------------------- |
| AFTER 트리거      | 테이블에 INSERT, UPDATE, DELETE 등의 작업이 일어났을 때 작동​ | 해당 작업 후(After) 작동                        |
| BEFORE 트리거     | BEFORE 트리거는 이벤트가 발생하기 전에 작동                   | • INSERT, UPDATE, DELETE 세 가지 이벤트로 작동​ |

<img src="/assets/images//Database/5-4.png" width="400">

- after 예제: Student테이블 업데이트 시 tmp_tbl테이블에 이벤트 발생시킴

```sql
delimiter //
create trigger tri1
after update
on student -- student테이블을 update한 후에
for each row -- 각 행에
begin -- 무조건 실행되는 쿼리문을 begin에 넣기
  insert into tmp_tbl values('aa',curdate(),'U');
end //
delimiter ;

update student
set stu_weight = stu_weight + 10;
select *from student;
select *from tmp_tbl;
```

- 트리거가 생성하는 임시 테이블

  - INSERT, UPDATE, DELETE 작업이 수행되면 **임시 사용 시스템 테이블**
  - **이름은 ‘NEW’와 ‘OLD’**
    <img src="/assets/images//Database/5-5.png" width="400">

- new 예제

```sql
-- 사원테이블에 사원이 추가될 때 5000보다 급여가 많으면
-- emp500 테이블에 입력된 사원번호,사원이름,입력된 날짜를 입력하는 트리거 작성
delimiter //
create trigger tri6
after insert
on emp -- 사원테이블에 사원이 추가될 때
for each row
begin
  if new.sal > 5000 then
  insert into emp500 values(new.empno, new.ename, now());
  end if;
end //
delimiter ;

select *from emp;
insert into emp values(1111, 'gildong', 'student', 7839,now(),5600,null,10);
insert into emp values(2222, 'gildong', 'student', 7839,now(),4600,null,10);
select *from emp500; -- sal이 5000이상인 1111, gildong, now()만 들어가게됨
```

- old 예제

```sql
delimiter //
create trigger tri5
after update
on student -- student 테이블에서 업데이트 일어난 후
for each row
begin
  if(old.stu_weight > 40.00) then
    insert into tmp_tbl values('aabb', curdate(),'A');
    end if;
end //
delimiter ;

update student set stu_name='김길동'
where stu_name ='옥한빛';

commit;

select *from tmp_tbl;
select *from student;
```

- old 예제: 삭제한 값 테이블에 복사

```sql
-- 부서테이블(dept)의 데이터 삭제 시 dept_del 테이블에
-- 삭제된 데이터를 저장하는 트리거 작성
delimiter //
create trigger del_tri
after delete
on dept
for each row
begin
    insert into dept_del
    values('user', now(), old.deptno, old.dname, old.loc); -- 삭제한 (예전)값 넣기 old.
end//
delimiter ;
delete from dept where deptno=10;
select *from dept;
select *from dept_del;
```

### 기출문제

- 스토어드 프로시저 작성

```sql
-- 5. 상품 정보(product)테이블에 가장 최근에 들어온 거래처 코드 정보를 검색해라(top-n질의)
select c_code from trade order by t_date desc limit 1;
-- 6. 상품을 삽입하는 프로시저를 생성해라.
-- call p_pro(‘403’, ’7.1채널 스피커’, 180000, ‘스피커’);
-- 완료되었다.
delimiter //
create procedure p_pro(in v_p_code char(3),
            in v_p_name varchar(30),
                        in v_p_cost int,
                        in v_p_group varchar(30))
begin
  insert into product(p_code, p_name, p_cost, p_group)
    values(v_p_code, v_p_name, v_p_cost, v_p_group);
end //
delimiter ;

select *from product;
call p_pro('403', '7.1채널 스피커', 180000, '스피커');
```

- 트리거

```sql
-- 상품 삭제 시(product테이블에서) product_del 테이블에 삽입이 이루어지는 트리거를 작성해라.
-- p_code , p_name , p_cost , p_group은 기존 product테이블에 있는 값으로 삽입해라.

delimiter //
create trigger tri_del
after delete
on product
for each row
begin
  insert into product_del(p_code , p_name , p_cost , p_group)
  values(old.p_code , old.p_name , old.p_cost , old.p_group);

end //
delimiter ;

delete from product where p_code='201';
select *from product;
select *from product_del;
```
