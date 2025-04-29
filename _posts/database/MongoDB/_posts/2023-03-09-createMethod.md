---
layout: single
title: "create()와 save()"
categories: MongoDB
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
tags: [MongoDB, mongoose, ORM, ODM]
---

코딩을하다가 비슷한 기능을 하는 두 메소드를 발견했다  
어떤때에 create를 쓰고 어떤때에 save를 쓰는건지 궁금해져서 알아보았다

> **create()와 save()**
>
> - MongoDB를 다루는 ODM(Object Document Mapper) 라이브러리인 Mongoose가 제공하는 자바스크립트 함수
> - Mongoose 모델(Model)에서 사용되며, 새로운 document를 DB에 저장하는 역할을 한다

# 1. 공통점

- 데이터베이스에 <u>새로운 데이터를 만드는</u> model 메서드

# 2. 차이점

## 1. create()

- <u>새로운 문서를 만들고 저장까지 한번에 처리</u>
- new Model(data) + save() 를 한 번에 처리
- 중간에 인스턴스를 따로 만들 필요 없이 바로 저장

  ```sql
  await User.create({ name: "Kim", age: 20 });
  ```

- <u>모델 생성과 저장을 한 번에 처리</u>할 수 있어, 코드를 간결하게 유지할 수 있다

  ```js
  //create() 사용
  const Join = async (req, res) => {
    await User.create({
      // 객체(인스턴스)를 생성함과 동시에 저장
      name,
      email,
      password,
    });
  };
  ```

## 2. save()

- <u>document 인스턴스를 먼저 만들고, 나중에 저장</u>
- 더 복잡한 로직 (ex. 저장 전에 추가 수정)이 필요할 때 쓰기 좋다

  ```sql
  const user = new User({ name: "Bob", age: 25 });
  await user.save();
  ```

- `save()` 메소드는 매개변수에따라 새 데이터를 만들(insert)거나 기존의 문서를 변경(update)하는 데 사용
- 전달된 문서에 필드가 포함되어있지않으면 `_id`를 넣어 `_id`라는 고유값의 필드를 만듦
- 이 `_id`필드를 사용하여 새로운 document를 만들거나 데이터를 덮어씌울 수 있다

  ```js
  //save() 사용
  const changePassword = async (req, res) => {
    const {
      session: {
        user: { _id },
      },
      body: { username, email },
    } = req;
    const user = await User.findById(_id); // 객체를 먼저 생성
    const { username, email } = req.body;
    await user.save(); // 후 저장
  };
  ```

---

save()와 create()를 사용할 경우, 개발자가 원하지 않던 데이터가 새로 생성될 수 있어 사용하지 않는 편이 좋다  
로그인을 한다고 가정했을때, 로그인시 필요한 id나 email이 없는데 save()를 쓴다면 회원가입을 하지않고 바로 새로운데이터가 생성되는 문제가 발생한다  
데이터를 삽입하는 메소드로는 `insert`도 있다.

`save`는 키값이 이미 collection에 존재한다면 update를 하나, `insert`는 에러를 출력하는 차이점이있다

추가로 MongoDB 4.2부터는 `db.collection.save()`는 더 이상 사용되지 않는다

`db.collection.insertOne()` 이나`db.collection.replaceOne()`을 사용하는것이 좋다

## 3. insert()

-`insert()`, `insertOne()`, `insertMany()` 모두 데이터를 삽입할 때 사용

- `insert()`: document와 <u>복수의 document 모두 삽입</u>이 가능
- `insertOne()`: <u>단일의 documnt만 삽입</u>이 가능  
  배열로 다수의 데이터를 삽입할 경우, insertMany()를 사용해야한다
- `insertMany()`는 <u>다수의 document만 삽입</u>이 가능

# 3. 다른 업데이트 방법

## 1. updateOne()

- `updateOne()` 메소드는 <u>지정된 필터와 일치하는 데이터베이스의 단일 문서를 업데이트</u>하는데 사용
- 필터 개체와 업데이트 개체라는 두 가지 인수를 사용한다
- 업데이트 작업의 결과를 나타내는 객체를 Promise타입으로 반환

## 2. updateMany()

- `updateMany()`메서드는 updateOne()과 유사하지만 지정된 필터와 일치하는 데이터베이스의 모든 문서를 업데이트

## 3. replaceOne()

- `replaceOne()`메서드는 지정된 필터와 일치하는 데이터베이스의 단일 문서를 바꾸는 데 사용
- 필터 개체와 교체 개체라는 두 가지 인수를 사용
- 대체 작업의 결과인 객체 Promise로 반환

---

## 정리

- `updateOne`, `updateMany`, `replaceOne`은 모두 존재하는 문서를 업데이트하는데 사용
- 반면에 `create`와 `save`는 새로운 문서를 만드는 데 사용
