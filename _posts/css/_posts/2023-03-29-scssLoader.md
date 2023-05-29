---
layout: single
title: "SCSS loader"
categories: CSS
author_profile: true
sidebar_main: true
tags: [setting, css]
toc: true
toc_stickty: true
---

내가 기억하기로는 프론트분들이 싸스라고 했던거같은데 scss가 왜 sass인가 싶어서 검색해봤다.

# SCSS(SASS)란?

Syntactically Awesome StyleShee로 CSS의 단점(selector, 연산기능 등)을 보완하고 편의성을 높인 CSS 전처리기이다.  
전처리기는 CSS가 동작하기 전, 개발단계에서는 SCSS를 사용하고, 웹에서는 CSS로 변환해서 작동한다.

## .sass?

sass는 css의 전처리기로 해석되어 CSS로 컴파일되는 스크립트 언어이다.  
sass에서는 중괄호대신 들역쓰기를 사용하여 코드블록을 정의한다.

```scss
body
  font-family: Arial, sans-serif

.container
  background-color: $primary-color
  padding: 20px
```

## .scss?

(Sassy CSS)로 CSS가 호환되도록 Sass3에서 도입된 최신구문이다.  
SASS의 기능을 지원하면서도 중괄호, 세미콜론을 사용하여 CSS와 유사한 구문을 사용한다.

```scss
body {
  font-family: Arial, sans-serif;
}

.container {
  background-color: $primary-color;
  padding: 20px;
}
```

scss라는 폴더를 만들고 그안에 styles.scss라는 파일을 만들었다.  
그리고 body의 배경색을 빨강으로 주었다.

```scss
body {
  backgrround-color: $black;
}
```

그런데 $red같이 변수로 선언하는 문법은 css에 없기때문에 \_varaiables.scss라는 파일을 만들었고 이파일에 css처럼 red라는 색을 변수선언해주었다.

```scss
$red: black;
```

```scss
@import "./variables";
body {
  backgrround-color: $black;
}
```

클라이언트에게 보여줄 main.js로 이동해서 경로를 연결한뒤 설정한 webpack 명령어를 입력하면

![](https://velog.velcdn.com/images/kimsu10/post/26bab013-88ef-4148-a6ab-894a6eb8186c/image.png)

모듈이 없다고한다.

엥 왜없어..? 확인해보니 파일명을 잘못써었다. `_`가 없었..

![](https://velog.velcdn.com/images/kimsu10/post/39d34e12-8b12-4042-91e1-edb01637dc9b/image.png)

다시 돌려보니 module parse가 실패하였다고 적절한 loader를 쓰라고한다.

설정할때 옵션으로는 브라우저에 보여주는것이 목적이기때문에 세가지 옵션을 주어야한다.(이거 말투랑 설명좀 바꾸자)

첫번째 loader는 scss를 가져다가 일반적인 css로 변형하는 sass-loader이다.

[sass-loader](https://www.npmjs.com/package/sass-loader)

```
npm install sass-loader sass webpack --save-dev
```

두번째 loader는 폰트같은걸 불러올때 css에 유용하게 쓰기위한 css-loader이다.

css-loader는 @import와 ur()을 풀어내 해석해준다.

```
npm install --save-dev css-loader
```

3번째 loader는 변환한 css를 DOM에 주입하여 웹사이트에 적용시킬 style-loader이다.

```
npm install --save-dev style-loader
```

webpack.config.js로 이동해서 scss loader를 설정해주자.  
이때 조심해야할것은 webpackdms 역순으로 실행되기때문에 마지막으로 진행될 순서부터 적어줘야한다.

```js
 {
        test:/\.scss$/,
        use: ["styles-loader","css-loader","sass-loader" ]
      },
```

![](https://velog.velcdn.com/images/kimsu10/post/74b86e8d-7f77-443f-b4e2-df2eda0f80bf/image.png)

브라우저에 접속하면 아래처럼뜬다.

![](https://velog.velcdn.com/images/kimsu10/post/482b204f-59aa-40f6-968c-ebf1a9ff8944/image.png)

완성본은 아래의 길다란 내용을 가지고있다.

![](https://velog.velcdn.com/images/kimsu10/post/af265d5e-8ad4-4f5c-ac37-58e3652affb1/image.png)

내용이 너무긴데 style-loader가 어떤 css를 head에 주입한것을 js파일에 합쳐두었기때문이다.

이렇게 js와 css를 합쳐두면 브라우저에 css가 바로뜨지않고 자브스크립트가 로딩되는것을 기다려야하기때문에 분리하는것이 좋다.

style-loader를사용하지않고 MiniCssExtractPlugin을 사용하여 css를 분리하려한다.

## MiniCssExtractPlugin

> [**MiniCssExtractPlugin Docs**](https://webpack.js.org/plugins/mini-css-extract-plugin/)

### 설치방법

```
npm install --save-dev mini-css-extract-plugin
```

### 사용법

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

main.js의 폴더가 훨씬 짧아졌고 새롭게 main.css라는 파일이 생겼다.

![](https://velog.velcdn.com/images/kimsu10/post/67a815ae-4228-4912-8619-2e6214418ead/image.png)

![](https://velog.velcdn.com/images/kimsu10/post/77902cb2-cdeb-4105-aabf-2b345e78cdc8/image.png)

간단화하자면 main.js의 javascript코드를 babel로 처리하고 css를 추출한것이다.  
그리고 옵션을 주어 css와 js파일들을 따로 저장되게하였다.  
이제 pug에서 css파일을 연결하면 된다.

```
doctype html
html(lang="ko")
    head
        title #{pageTitle}
        link(rel="stylesheet" href="/static/css/styles.css")
```

근데 매번 webpack을 돌릴때마다 폴더들을 지워주기가 귀찮다.  
option으로 watch: true를주면 다시 refresh와 compile을 해주는것을 볼 수 있다.  
npm run dev와 npm run assets를 함꼐 실행해야 에러가 나지 않느다.

그런데 프론트엔드쪽 코드를 건드리면 백엔드가 자꾸 재시작되었다.

이런 문제점을 해결하기위해 nodemon이 몇몇 파일과 폴더들을 무시하도록 변경해야한다.

1.package.json에서 명령문을 작성하여 실행하거나 설정파일을 하나 생성해야한다.

nodemon에서 게빌지가 사용할 수 있는 설정파일을 제공하고있다.

[npm-nodemon](https://www.npmjs.com/package/nodemon)

```
{
  "verbose": true,
  "ignore": ["*.test.js", "**/fixtures/**"],
  "execMap": {
    "rb": "ruby",
    "pde": "processing --sketch={{pwd}} --run"
  }
}
```

위의 코드를 nodemon.json이라고 만들어주면 된다.

```
//nodemon.json
{
  "ignore": ["webpack.config.js", "src/client/*","assets/*"],
  "exec": "babel-node src/init.js"
}
```

그리고 package.json의 scripts를 nodemon만 써놓고 nodemon을 호출하면 자동으로 nodemon.json을 호출해준다.  
이제 백엔드서버가 자동으로 재실행되지 않는다.

추가로 aasets폴더는 gitignore에 추가해주자.

---

설정에서 사용할 수 있는 다른 property 는 clean: true 이다.  
clean은 결과물을 산출하는 폴더를 빌드하기전에 비워주는 역할을 한다.
