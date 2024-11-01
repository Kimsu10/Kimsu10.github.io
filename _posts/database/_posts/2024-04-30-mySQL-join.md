---
layout: single
title: "MySQL JOIN 문 "
categories: Database
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
---

# 2. Join

- 상호 관련성을 갖는 2개 이상의 테이블로부터 새로운 테이블을 생성하는데 사용

### 내부 조인(INNER JOIN)

- 가장 많이 사용되는 조인. 일반적인 join이라고 부름
- 두 테이블을 이을 수 있는 공통 필드가 중요

    <img src="/assets/images//Database/4-1.png" width="400">

- 종류

  - 교차조인(cross join) : 테이블의 모든 행이 각각 한번씩 조인되어 모든 경우의 수 조합
  - **이퀴조인(inner join)** : where절에서 **=연산자 사용 (제일 많이 씀)**
  - **자연조인(natural join)** : **natural join 앞뒤로** 합칠 테이블 명 적어줌(제일 편함! 근데 길어지면 사용하기 좋지 않음)
  - join ~ using
  - join ~ on

  ```sql
  -- 교차조인
  -- 테이블의 모든 행이 각각 한번 씩 조인되어 모든 경우의 수 조합됨
  select student.*, enrol.*
  from student
  cross join enrol;

  -- inner join(equi join) : 공통된 필드가 있어야함
  select student.stu_no, stu_name, stu_dept, enr_grade -- stu_no라고만 하면 어느 테이블거인지 모름! 테이블 명시해야 함
  from student , enrol
  where student.stu_no = enrol.stu_no; -- 두 테이블에 같은 필드가 있는 경우

  select stu.stu_no, stu_name, stu_dept, enr_grade -- 바뀐 테이블명 적용
  from student stu , enrol en  -- 테이블 명을 바꿔서 사용 가능
  where stu.stu_no = en.stu_no; -- 바뀐 테이블명 적용

  -- 자연조인
  select stu.stu_no, stu_name, stu_dept, enr_grade
  from student stu natural join enrol;

  -- using 조인
  select stu.stu_no, stu_name, stu_dept, enr_grade
  from student stu join enrol using(stu_no);

  -- join on
  select stu.stu_no, stu_name, stu_dept, enr_grade
  from student stu join enrol en on stu.stu_no = en.stu_no;
  ```

- 예제

  ```sql
  -- 과목번호 101번을 수강하고 있는 학생의 학번과 이름 출력
  select s.stu_no, stu_name  -- 공통된 열인 stu_no는 테이블 지정해줘야 함
  from student s, enrol e    -- 테이블 명 단축어 지정
  where s.stu_no = e.stu_no and sub_no =101; -- equls join과 101번 과목번호 찾기

  -- 학생테이블과 수강테이블을 natural join
  select *
  from student natural join enrol;

  -- 과목이름과 학번, 점수 검색(natural join)
  select sub_name, stu_no, enr_grade
  from subject natural join enrol;

  -- 과목이름과 학번, 점수를 검색해라(join using)
  select sub_name, stu_no, enr_grade
  from subject join enrol using (sub_no);

  -- 점수가 70점 이상인 학생 이름 검색(equi join)
  select stu_name, enr_grade
  from student s, enrol e
  where s.stu_no = e.stu_no and enr_grade >=70;

  -- 점수가 60점 이상인 학생 이름 검색(join using)
  select stu_name, enr_grade
  from student s join enrol e using(stu_no)
  where enr_grade >=60;

  -- 점수가 70점 이하인 학생 이름 검색(natural join)
  select stu_name, enr_grade
  from student natural join enrol
  where enr_grade < 70;

  -- 강종영 교수가 강의하는 과목을 수강하는 학생의 이름(**3개의 테이블 join**해야함)
  select stu_name
  from student s, enrol e, subject su
  where su.sub_no = e.sub_no
  	and e.stu_no = s.stu_no
  	and sub_prof='강종영';

  -- 컴퓨터개론을 수강하는 학생들의 학번과 이름을 검색하라(equi join)
  select s.stu_no, stu_name
  from student s, enrol e, subject su
  where s.stu_no = e.stu_no
  	and e.sub_no = su.sub_no
      and sub_name = "컴퓨터개론";
  ```

### 외부 조인(OUTER JOIN)

- 조인의 조건에 만족되지 않는 행까지도 포함시키는 것
- 한 쪽에는 데이터가 있고, 한 쪽에는 데이터가 없는 경우 데이터가 있는 쪽 테이블의 내용을 모두 출력
- ‘왼쪽 테이블의 것은 모두 출력되어야 한다’ 고 해석하면 이해 쉬움
  <img src="/assets/images//Database/4-2.png" width="400">

- **left outer join**: 왼쪽에 있는 테이블의 모든 결과를 가져온 후 오른쪽 테이블의 데이터를 매칭
- **right outer join**: 오른쪽에 있는 테이블의 모든 결과를 가져온 후 왼쪽 테이블의 데이터를 매칭

```sql
-- 내부조인(equi join, natural join 등)
select *
from student natural join enrol; -- 공통적이지 않은 필드 정보는 합쳐지지 않음

-- 외부조인(outer join): 서로의 테이블에 공통되지 않은 데이터도 합쳐짐

-- right join: 오른쪽 테이블 기준으로 왼쪽 테이블 합침
select a.*, sub_name
from enrol a right outer join subject b
on a.sub_no = b.sub_no; -- subject에 없는 정보(sub_no, stu_no 등)는 null로 채워짐

-- left join: 왼쪽 테이블 기준으로 오른쪽 테이블 합침
select a.*, sub_name
from enrol a left outer join subject b
on a.sub_no = b.sub_no; -- enrol에 있는 데이터 기준으로 맞춰져서 subject에 없는 결과 안합쳐짐
```

### SELF JOIN

- 자기 자신의 테이블을 조인함

```sql
select a.empno as 사원번호, a.ename as 사원이름,
b.empno as 상급자사원번호, b.ename as 상급자이름
from emp a join emp b
on a.mgr = b.empno;
```

<img src="/assets/images//Database/4-3.png" width="400">

- 자신의 테이블을 두번 선언할 때 두번 다 별명(as 별명)을 제공해야 함

### 뷰(view)

- 가상테이블
- 저장장치 내에서 물리적으로 존재하지 않음(기본 테이블에서 유도된 테이블)
- 사용자에게는 있는 것처럼 간주됨
- 일시 작업에서 사용

  ```sql
  -- 뷰 생성(임시적 사용)
  create view v_student1
  as select *from student where stu_dept='컴퓨터정보';
  desc v_student1;

  -- 뷰 조인
  create view v_enrol1
  as select b.sub_name, a.sub_no, stu_no, enr_grade
  from enrol a, subject b
  where a.sub_no = b.sub_no;
  select *from v_enrol1;
  ```

- 예제

  ```sql
  --  사원테이블로부터 20번 부서의 사원들로 이루어져있는 뷰 생성(v_emp20)
  create view v_emp20
  as select *
  from emp where deptno = 20;

  -- 사원번호, 사원이름, 부서이름을 가지는 뷰(v_emp_dept) 생성
  create view v_emp_dept
  as select empno, ename, dname
  from emp e, dept d
  where e.deptno = d.deptno;
  ```

### 기출문제

- 복합 예제

```sql
-- 김종헌 학생의 평균 점수보다 높은 점수를 가진 학생의 학번과 이름을 검색해라.
select stu_no, stu_name
from enrol natural join student
where enr_grade>(select avg(enr_grade)
from student natural join enrol where stu_name="김종헌");

-- 김인중 학생의 평균 점수보다 낮은 점수를 가진 학생의 학번과 이름을 검색해라.
select distinct stu_no, stu_name
from enrol natural join student
where enr_grade<(select avg(enr_grade) from enrol natural join student
where stu_name="김인중");

-- 전체 학생의 평균 점수보다 높은 점수를 가진 학생의 학번, 이름, 과목이름, 점수를 검색해라.
select stu_no, stu_name, sub_name, sub_prof, enr_grade
from student natural join subject natural join enrol
where enr_grade>(select avg(enr_grade) from enrol);

-- 점수가 각 학과 학생들의 평균 점수보다 높은 학생의 학번을 검색해라.
select e.stu_no
from enrol e natural join student s
where enr_grade >
all(select avg(enr_grade) from enrol natural join student group by stu_dept);

-- 기계과의 최고 점수 학생보다 최고 점수가 높은 학과의 학과명과 점수를 검색해라.
select stu_dept, max(enr_grade) from student natural join enrol
where enr_grade >
(select max(enr_grade) from enrol natural join student where stu_dept="기계")
group by stu_dept;

-- 다른 방법
select s.stu_dept, max(enr_grade)
from student s, enrol e
where s.stu_no=e.stu_no
group by stu_dept
having max(enr_grade) >
     (select max(enr_grade) from student natural join enrol where stu_dept='기계');


-- 컴퓨터정보과 학생들의 평균 점수를 구해 학생들의 학번과 이름 평균 점수를 성적 순으로 검색해라.
select stu_no, stu_name, avg(enr_grade)
from student natural join enrol
where stu_dept="컴퓨터정보"
group by stu_no
order by avg(enr_grade); -- order by 3 으로 적어도 됨(추출하는 필드번호)

-- 시스템분석설계 과목을 수강한 학생들의 학번, 이름, 점수를 성적 순으로 검색해라.
select stu_no, stu_name, enr_grade
from student natural join enrol natural join subject
where sub_name="시스템분석설계"
order by enr_grade;

-- 2과목 이상 수강한 학생들의 학번, 이름, 수강과목 수를 수강과목이 많은 순으로 검색해라.
select stu_no, stu_name, count(stu_no)
from student natural join subject natural join enrol
group by stu_no
having count(stu_no) > 1
order by count(stu_no);

-- 1과목을 수강한 학생들의 학번, 이름을 학과별 학번 순으로 검색해라.
select stu_no, stu_name, count(stu_no)
from student natural join subject natural join enrol
group by stu_no
having count(stu_no) = 1
order by count(stu_no);

-- 컴퓨터개론과 시스템분석설계 과목을 수강하는 학생의 학번, 이름을 학번순으로 검색해라.
select stu_no, stu_name
from student natural join subject natural join enrol
where sub_name="컴퓨터개론" or sub_name="시스템분석설계" -- where sub_name in("컴퓨터개론" ,"시스템분석설계")
order by stu_no;
```

- 기본 예제

```sql
-- ADAMS 사원이 근무중인 부서 이름 검색(equi join)
select dname from dept d, emp e
where d.deptno = e.deptno and ename="ADAMS";

-- 급여가 2000이상인 사원들의 사원명과 지역 검색(natural join)
select ename, loc
from emp e natural join dept d
where sal >= 2000;

-- 이퀴조인으로 변경
select ename, loc
from emp e, dept d
where e.deptno= d.deptno and sal >= 2000;

-- 급여가 1000이상 2000이하인 사원들의 사원번호, 사원이름, 부서이름을 사원번호 순으로 검색(join using)
select empno, ename, dname
from emp e join dept d using(deptno)
where sal between 1000 and 2000
order by empno;

-- 사원직무가 salesman이면서 chicago 지역에 근무 중인 사원명을 검색
select ename
from emp natural join dept
where job="salesman" and loc="chicago";

-- new york이나 dallas지역에 근무하는 사원들의 사원번호, 사원이름을 사원번호 순으로 검색(equi join)
select empno, ename
from dept d, emp e
where d.deptno = e.deptno
and loc = "new york" or loc ="dallas"
order by empno;

-- natural join으로 변경
select empno, ename
from dept d natural join emp e
where loc = "new york" or loc ="dallas"
order by empno;

-- 부서 이름이 accounting 이거나 지역이 chicago인 사원의 사원번호, 사원이름(equi join)
select empno, ename
from dept d, emp e
where e.deptno= d.deptno and(dname="accounting" or loc="chicago");
```

- 복합예제(서점)

```sql
-- 14. 도서를 가격순으로 검색하고, 가격이 같으면 이름순으로 검색해라.
select * from book order by price, bookname;
-- 15. 도서를 가격의 내림차순으로 검색해라. 가격이 같다면 출판사의 오름차순으로 검색해라.
select * from book order by price desc, bookname;
-- 16. 고객이 주문한 도서의 총 판매액을 구해라.
select sum(saleprice) from orders;
-- 17. 2번 김선해 고객이 주문한 도서의 총 판매액을 구해라.
select sum(saleprice) from orders where custid =2;
-- 18. 고객이 주문한 도서의 총 판매액, 평균값, 최저가, 최고가를 구해라.
select sum(saleprice), avg(saleprice), min(saleprice), max(saleprice)
from orders;
-- 19. 서점의 도서 판매 건수를 구해라.
select count(*) from orders;
-- 20. 고객별로 주문한 도서의 총 수량과 총 판매액을 구해라.
select count(*), sum(saleprice) from orders group by custid;
-- 21. 가격이 8000원 이상인 도서를 구매한 고객의 고객별 주문 도서의 총 수량을 구해라.
-- 단, 두 권 이상 구매한 고객만 구해라.
select custid, count(*)
from orders
where saleprice >= 8000
group by custid
having count(custid)>1;

-- 3개 테이블을 연결할 경우, from 안에 부질의
select custid, count(*) as BUY
from (select ord.custid, ord.bookid, ord.saleprice, bk.bookname,
			bk.price, cust.name
		from orders ord, book bk, customer cust
        where ord.bookid = bk.bookid -- 이퀴조인
        and ord.custid = cust.custid -- 이퀴조인
        and bk.price >- 8000) AA -- 별칭(AA) 줘야함! 판매가가 아닌 책값 기준 8천원 이상
group by custid
having count(*) >=2;

-- 22. 고객과 고객의 주문에 관한 데이터를 모두 보여라.
select name, orderid, custid, bookid, saleprice
from customer natural join orders;
-- 23. 고객과 고객의 주문에 관한 데이터를 고객번호 순으로 정렬하여 보여라.
select *
from customer c natural join orders o
order by c.custid;
-- 24. 고객의 이름과 고객이 주문한 도서의 판매가격을 검색해라.
select *
from customer c, orders o
where c.custid = o.custid;
-- 25. 고객별로 주문한 모든 도서의 총 판매액을 구하고, 고객별로 정렬해라.
select name, sum(saleprice)
from customer c, orders o
where c.custid = o.custid
group by name
order by name;
------------------------------------------------------------------------
-- 26. 고객의 이름과 고객이 주문한 도서의 이름을 구해라.
select name, bookname
from customer natural join orders natural join book;
 -- 이너조인 사용시
select name, bookname
from orders ord
inner join customer cust on cust.custid = ord.custid
inner join book bk on bk.bookid = ord.bookid;

-- 27. 가격이 20000원인 도서를 주문한 고객의 이름과 도서의 이름을 구해라.
select name, bookname
from customer natural join orders natural join book
where price = 20000;
-- 28. 도서를 구매하지 않은 고객을 포함하여 고객의 이름과 고객이 주문한 도서의 판매가격을 구해라.
select name, bookname, price
from customer c natural join orders o right outer join  book b
on b.bookid = o.bookid;
-- 29. 가장 비싼 도서의 이름을 구해라.
select bookname from book where price = (select max(price) from book);
-- 30. 도서를 구매한 적이 있는 고객의 이름을 검색해라.
select name
from orders o natural join customer c
group by custid
having count(o.custid) > 0;
```

- 부질의, 문자열, 날짜 update 등

```sql
-- 31. 비트아이티에서 출판한 도서를 구매한 고객의 이름을 보여라.
select name
from book natural join orders natural join customer
where publisher ='비트아이티';

**-- ★부질의, 중요 32. 출판사별로 출판사의 평균 도서 가격보다 비싼 도서를 구해라.**
select bk.bookname, bk.price, bk_avg.publisher, bk_avg.avg_price
from book bk,
			(select publisher, avg(price) as avg_price -- 출판사별 평균가격
			from book
			group by publisher) bk_avg -- 출판사이름과 평균가격의 이름 bk_avg
where bk.publisher = bk_avg.publisher -- bk와 bk_avg 테이블을 join함
	  and bk.price > bk_avg.avg_price; -- 출판사별 평균 도서가격보다 큰 경우

-- 33. Book테이블에 새로운 도서 ‘공학 도서’를 삽입해라.
-- 공학 도서는 더샘에서 출간했으며 가격을 40000원이다.
insert into book values(11, '공학 도서', '더샘', 40000);
-- 34. Book테이블에 새로운 도서 ‘공학 도서’를 삽입해라. 공학 도서는 더샘에서 출간했으며 가격은 미정이다.
insert into book(bookid, bookname, publisher) values(12, '공학 도서', '더샘');
-- 35. Customer테이블에서 고객번호가 5인 고객의 주소를 ‘서울시 서초구’로 변경해라.
update customer
set address = '서울시 서초구'
where custid = 5;

**-- 36. Customer테이블에서 박승철 고객의 주소를 김선해 고객의 주소로 변경해라.**
-- update customer set address = (select address from customer where name="김선해") where name = "박승철";
						-- **mysql에서 update, delete를 자기 자신 테이블에서 할 경우 오류**
update customer as cust -- 셀프조인 할 경우 별명을 줘야 함
join customer as cust2 on cust2.name = '김선해'
set cust.address = cust2.address
where cust.name = '박승철';

-- 37. 아이티에서 출판한 도서의 제목과 제목의 글자수를 확인해라.
select bookname, char_length(bookname) from book where publisher = '아이티';
-- 38. 23서점의 고객 중에서 같은 성(이름 성)을 가진 사람이 몇 명이나 되는지 성별 인원수를 구해라.
select substr(name,1,1), count(substr(name,1,1))
from customer
group by substr(name,1,1);

select sung, count(*)
from (select substr(name,1,1) as sung
	from  customer) A **-- from뒤에 부질의는 별명필수!**
group by sung;

-- 39. 23서점은 주문일로부터 10일 후 매출을 확정한다. 각 주문의 확정일자를 구해라.
select adddate(orderdate, interval 10 day) from orders;
select orderdate, (orderdate+10) from orders; -- '-'의 형식없이 더해짐

-- 40. 23서점이 2022년 5월 7일에 주문받은 도서의 주문번호, 주문일, 고객번호, 도서번호를 모두 보여라.
-- 주문일은 ‘yyyy-mm-dd요일’형태로 표시한다.
select orderid, date_format(orderdate, '%Y-%m-%d%a'), custid, bookid
from orders
where orderdate = '2022-05-07';
```

- 함수 등

```sql
-- 41. 이름, 전화번호가 포함된 고객목록을 보여라. 단, 전화번호가 없는 고객은 ‘연락처없음’으로 표시해라.
select name, ifnull(phone,'연락처없음') from customer;

-- 42. 평균 주문금액 이하의 주문에 대해 주문번호와 금액을 보여라.
select orderid, saleprice
from orders
where saleprice < (select avg(saleprice) from orders);

-- 43. 각 고객의 평균 주문금액보다 큰 금액의 주문 내역에 대해 주문번호, 고객번호, 금액을 보여라.
select orderid, custid, saleprice
from orders
where saleprice <= all(select avg(saleprice) from orders group by custid);

-- 44. 서울시에 거주하는 고객에게 판매한 도서의 총판매액을 구해라.
select sum(saleprice)
from orders natural join customer
where substr(address,1,3) ='서울시';

select sum(saleprice)
from orders
where custid in(select custid from customer	where address like "서울%");

select sum(saleprice)
from orders ord, customer cust
where ord.custid = cust.custid and address like '서울%';

-- 45. Customer테이블에서 고객번호가 5인 고객을 삭제해라.
delete from customer where custid = 5;
```
