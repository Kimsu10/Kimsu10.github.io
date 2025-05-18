---
layout: single
title: "배열 관련 메소드"
categories: JavaScript
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
tags: ["javascript"]
---

자주 헷갈리는 배열 메스드 정리
{: .notice--info}

## 1. map

- 원본배열과 길이가 같은 새로운 배열을 생성할 때 사용한다

  ```js
  let result = a.map(
    function (v, i) {
      if (v % 2 == 0) return v;
    },
    [1, 2]
  );

  console.log(result);
  ```

## 2. filter ⭐️

- map과 달리 배열의 길이가 다른 새로운 배열을 생성
- 조건이 참인 경우의 원하는 원소만 선정해서 리턴

- **filter의 구조**

  ```js
  function filter(콜백함수, thisArg) {
    let list = [];
    for (let i = 0; i < a.length; i++) {
      if (콜백함수(a[i], i)) {
        list.push(a[i]); // 조건이 참일때 그 요소를 새로운 배열에 추가
      }
    }
  }
  ```

- **사용법**

  ```js
  let result = a.filter(
    function (v, i) {
      return v % 2 == 0;
    },
    [1, 2]
  );

  console.log(result);
  ```

<br/>

## 3. reduce ⭐️

- 원본배열의 원소의 누적된 값을 구할때 사용

- **reduce의 구조**

  ```js
  function reduce(콜백함수, value) {
    let result = value; // value로 초기값을 result에 저장

    for (let i = 0; i < a.length; i++) {
      // 콜백함수를 통해 이전 결과(result)와 현재 요소(a[i])를 누적 계산
      result = 콜백함수(result, a[i]);
    }

    return result; // 최종 누적 결과 반환
  }
  ```

- **사용법**

  ```js
  a = [1, 2, 3, 4, 5];
  result = a.reduce(function (acc, v) {
    return acc + v;
  }, 0);
  ```

## 4. forEach

- 콜백함수를 반드시 인자로 넘겨받아야하며, thisArg는 안받아도 가능

  ```js
  function forEach(콜백함수, thisArg) {
    // 콜백함수 안에서 this로 사용할 값(안써도 됨)
    for (let i = 0; i < a.length; i++) {
      콜백함수(a[i], i); // a[i] 값과 인덱스를 콜백 함수에 전달하여 실행
    }
  }

  a = [1, 2, 3, 4, 5];
  a.forEach(function (v, i) {
    console.log(v, i);
  });

  a.forEach(
    function (v, i) {
      console.log(v, i, this);
    },
    [1, 2]
  );
  ```
