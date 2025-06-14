---
layout: single
title: "Vue의 인스턴스"
categories: Vue
author_profile: true
sidebar_main: true
tag: [Vue]
toc: true
toc_sticky: true
---

- 뷰의 인스턴스는 뷰 패키지의 구조와 기능을 뷰 어플리ㅣ케이션에서 사용할 수 있게하는 진입점이다

  > **인스턴스(Instance)**
  >
  > - 클래스의 실체화된 객체
  > - class가 객체를 생성하기위한 탬플릿이라면, instance는 해당 클래스의 실제 객체를 의미한다

## 인스턴스 생성 및 접근

- 인스턴스를 통해 특정 클래스의 상태를 확인 가능
- 클래스에 정의된 속성과 메서드를 호출하여 동작 수행이 가능

  ```js
  class Person {
    // Person 클래스는 name과 age 속성, introduce 메서드를 가진다
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }

    introduce() {
      console.log(`Hello, my name is ${this.name}.`);
    }
  }

  // Person 클래스의 인스턴스 생성
  const person1 = new Person("Kim", 30);

  // 생성된 인스턴스에 접근
  console.log(person1.name);
  person1.introduce();
  ```

- app.mount 함수를 사용하여 인스턴스 진입점 생성

```js
import { createApp } from "vue"; // 뷰 패키지에서 createApp() 함수를 가져옴
import App from "./App.vue";
import router from "./router";

const app = createApp(App); // 인스턴스 생성

app.use(router);

app.mount("#app"); // mount 함수로 생성된 인스턴스를 HTML DOM과 연결
```

### 인스턴스의 초기설정을 담은 객체를 전달

- data, method, render라는 속성을 **인스턴스 구성요소**라 한다

  ```js
  import { createApp, h } from "vue";

  import router from "./router";

  const app = createApp({
    data() {
      return {
        message: "Hello World",
      };
    },
    methods: {
      reverse() {
        this.message = this.message.split("").reverse().join("");
      },
    },
    render() {
      return h("div", [
        h("p", this.message),
        h("button", { onClick: this.reverse }, "Reverse"),
      ]);
    },
  }).mount("#app");

  app.use(router);
  ```

  > **h**
  >
  > - `h`는 Vue에서 공식적으로 제공하는 함수 이름으로, 그 자체가 Vue의 Virtual DOM을 만들기 위한 핵심 유틸리티 함수이다
  > - createElement()의 줄임말
  >
  > ```js
  > h(tag, props, children);
  > ```
  >
  > > - tag: "div", "p", "button" 등의 HTML 태그나 Vue 컴포넌트
  > > - props: class, onClick, style 등의 속성들 (옵션)
  > > - children: 문자열, 다른 h() 호출들, 배열 등 (옵션)
