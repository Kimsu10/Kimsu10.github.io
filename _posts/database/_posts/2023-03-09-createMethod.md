---
layout: single
title: "create()와 save()"
categories: Database
author_profile: true
sidebar_main: true
toc: true
toc_stickty: true
tags: [MongoDB, mongoose, ORM, ODM]
---

mongoose로 클론코딩을하다가 비슷한 기능을 하는 두 메소드를 발견했다.  
어떤때에 create를 쓰고 어떤때에 save를 쓰는건지 궁금해져서 알아보았다.

# 1. 공통점

두 메서드 모두 데이터베이스에 새로운 데이터를 만드는 model 메서드이다.

# 2. 차이점

## 1. create()

- `create()` 메소드는 save()와 달리, 새로운 document를 만들어 데이베이스에 바로 저장한다.
- 모델 생성과 저장을 한 번에 처리할 수 있어, 코드를 간결하게 유지할 수 있다.
- create()를 호출할때 생성할 객체르 전달 하면 된다.

```js
//create() 사용
const Join = async (req, res) => {
  await User.create({
    name,
    email,
    password,
  });
};
```

## 2. save()

- `save()` 메소드는 매개변수에따라 새 데이터를 만들(insert)거나 기존의 문서를 변경(update)하는 데 사용할 수 있다.
- save메소드에 전달된 문서에 필드가 포함되어있지않으면 `_id`를 넣어 `_id`라는 고유값의 필드를 만든다.
- 이 `_id`필드를 사용하여 새로운 document를 만들거나 데이터를 덮어씌울 수 있다.

```js
//save() 사용
const changePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { username, email },
  } = req;
  const user = await User.findById(_id);
  const { username, email } = req.body;
  await user.save();
};
```

save()와 create()를 사용할 경우, 개발자가 원하지 않던 데이터가 새로 생성될 수 있어 사용하지 않는 편이 좋다고 한다.

로그인을 한다고 가정했을때, 로그인시 필요한 id나 email이 없는데 save()를 쓴다면 회원가입을 하지않고 바로 새로운데이터가 생성될 것이다.

데이터를 삽입하는 메소드로는 `insert`도 있다.

`save`는 키값이 이미 collection에 존재한다면 update를 하나, `insert`는 에러를 출력하는 차이점이있다.

추가로 MongoDB 4.2부터는 `db.collection.save()`는 더 이상 사용되지 않는다고한다.

`db.collection.insertOne()` 이나`db.collection.replaceOne()`을 사용하라고 한다.

## 3. insert()

-`insert()`, `insertOne()`, `insertMany()` 모두 데이터를 삽입할 수 있다.

- `insert()`의 경우 단일 document와 복수의 document 모두 삽입이 가능하다.
- `insertOne()`은 단일의 documnt만 삽입이 가능하다.  
  배열로 다수의 데이터를 삽입할 경우, insertMany()를 사용해야한다.
- `insertMany()`는 다수의 document만 삽입이 가능하다.

# 3. 다른 업데이트 방법

## 1. updateOne()

- `updateOne()` 메소드는 지정된 필터와 일치하는 데이터베이스의 단일 문서를 업데이트하는데 사용된다.
- 필터 개체와 업데이트 개체라는 두 가지 인수를 사용합니다.
- 업데이트 작업의 결과를 나타내는 객체를 Promise타입으로 반환한다.

## 2. updateMany()

- `updateMany()`메서드는 updateOne()과 유사하지만 지정된 필터와 일치하는 데이터베이스의 모든 문서를 업데이트한다.

## 3. replaceOne()

- `replaceOne()`메서드는 지정된 필터와 일치하는 데이터베이스의 단일 문서를 바꾸는 데 사용된다.
- 필터 개체와 교체 개체라는 두 가지 인수를 사용한다.
- 대체 작업의 결과인 객체 Promise로 반환한다.

`updateOne`, `updateMany`, `replaceOne`은 모두 존재하는 문서를 업데이트하는데 사용되는 메서드이다.  
반면에 `create`와 `save`는 새로운 문서를 만드는 데 사용된다.
