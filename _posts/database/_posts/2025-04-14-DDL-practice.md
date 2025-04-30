---
layout: single
title: "DDL 명령어 연습"
categories: Database
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
---

# Q1. 아래의 요구사항에 만족하는 테이블 <student> 를 정의하는 SQL문 작성하기

> - `id(문자 5), name (문자 10), 'sex (문자 1)', 'phone (문자 20)' 속성을 가진다.
> - 'id' 속성은 기본키이다.
> - 'sex' 속성은 'f' 또는 'm' 값만 갖도록 한다.(계약조건명 :sex_ck)
> - 'id'는 <teacher> 테이블의 'teacher_id'를 참조한다.(제약조건명: id_fk)

## 작성한 코드

```sql
CREATE TABLE student (
  id CHAR(5) PRIMARY KEY,
  name CHAR(10),
  sex CHAR(1),
  CONSTRAINT sex_ck CHECK (sex IN ('f', 'm')),
  FOREIGN KEY id_fk REFERENCES teacher(teacher_id)
);
```

<details>
<summary>정답</summary>
<pre><code class="code-block"> 
CREATE TABLE student (
  id CHAR(5) PRIMARY KEY,
  name CHAR(10),
  sex CHAR(1),
  CONSTRAINT sex_ck CHECK (sex IN ('f', 'm')),
  CONSTRAINT id_fk FOREIGN KEY (id) REFERENCES teacher(teacher_id)
);
</code></pre>

- <u>외래키도 제약사항</u>이라 앞에 CONSTRAINT가 붙어야한다!

</details>

# Q2.
