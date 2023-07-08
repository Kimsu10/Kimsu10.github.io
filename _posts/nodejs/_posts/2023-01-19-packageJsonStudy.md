---
layout: single
title: "package.json 공부"
categories: Nodejs
author_profile: true
sidebar_main: true
tag: [setting, npm, json]
toc: true
toc_sticky: true
---

학원에서 `npm init`을 치고 그냥 시키는대로만 만들고 말았는데
혼자서 공부하다보니 package.json의 중요성을 느끼고 공부해보았다.

# 1. package.json이란?

nodejs로 서버를 만들때 가장 처음으로 만들어보는 파일.
이라고만하면 면접은 탈락이겠지..
package.json은 node의 프로젝트 루트에 존재하는 파일로 프로젝트와 관련된 메타데이터를 보유하고있는 문서파일이라고 보면된다.

# 2. package.json 만들기

package.json을 만드는 방법에는 두가지가 있다.

### (1) npm init / yarn init

이 방법을 사용하려면 npm이 필요한데 node를 설치하면 npm은 자동적으로 설치되기때문에 node가 시스템에 설치되어 있어야 한다.
위 방법은 컴퓨터에 간단한 정보만 입력해주면 자동으로 json파일을 만들어주기때문에 안정적이고 편리하다.

### (2) 수동으로 직접만든다.

`touch package.json`이나 새파일로 만들어서 하나하나 수동 기입하는 방법이다. 내 손이 컴퓨터보다 정확할 수는 없어서 오타가생길수 있어 비추천한다.

## ✡︎1. name

```js
{"name": "projectName"
```

이름 속성은 package.json의 필수로 프로젝트의 이름을 적는다.
이름을 정할때는 규칙이 있는데

- 소문자여야한다.
- 한 단어여야하나 `-`,`_` 을 포함 할 수 있다.
- 그러나 `_` 나 `.`으로 시작하면 안된다.
  ![](https://velog.velcdn.com/images/kimsu10/post/d89f8868-f854-4015-9515-c9a3c80f4852/image.png)

## 2. version

```js
"version": "1.0.0",
```

버전은 내가 만드는 프로젝트의 현재 모듈버전으로 시작할때는 1.0.0일 것이다.

## 3. description

```js
"description": "",
```

설명은 프로젝트에대한 정보를 적으면된다. 적고싶지 않으면 적지 않아도 된다.

## ✡︎4. main

```js
"main": "index.js",
```

메인은 다른 사람이 나의 프로젝트를 사용할때 어플리케이션의 시작점 역할을 하는 파일을 말한다. `index.js`나 `app.js`를 많이 쓴다.

---

## ✡︎5. scripts

```js
"scripts": {
        "test": "DOTENV_CONFIG_PATH=.env.test jest --setupFiles=dotenv/config",
        "test:coverage": "DOTENV_CONFIG_PATH=.env.test jest --setupFiles=dotenv/config --coverage",
        "start": "nodemon server.js",
        "lint": "eslint ./server"
    },
```

스크립트는 어플리케이션의 빌드,테스트,린트같은 작업을 수행하는데 사용할 수 있다.
자바스크립트 객체처럼 `{"키":"값"}`로 쓰며, 여러개를 나열해서 쓸 수도 있다.
터미널에 `npm run scriptname`을 쳐서 실행할 수 있다.
경로와 파일이름을 다르게 적으면 npm 실행시 에러가 발생하니 잘 확인해야한다.

---

## 6. repository

```js
 "repository": {
        "type": "git",
        "url": "git+https://github.com/projectRepositoryUrl.git"
    },
```

저장소는 어플리케이션의 사용중인 버전을 제어하기위해 버전 제어 시스템과 저장소의 url을 지정한다.

## 7. keyword

```js
"keywords": [],
```

프로젝트를 좀더 쉽게 식별하기위해 또는 쉽게 찾을 수 있게해주는 단어들을 적는 곳이다.

## 8. author

```js
"author": "",
```

이 프로젝트의 소유자/기여자들을 적는다.

## 9. license & private

```js
"license": "ISC",
"private": true,
```

> **license**: 저작권표시
>
> **ISC**:  
>  위의 저작권 표시 및 이 허가 표시가 모든 사본에 표시되는 한, 어떤 목적으로든 이 소프트웨어를 유료 또는 무료로 사용, 복사, 수정 및/또는 배포할 수 있는 권한이 부여됩니다.소프트웨어는 "있는 그대로" 제공되며 작성자는 상품성 및 적합성에 대한 모든 묵시적 보증을 포함하여 이 소프트웨어와 관련된 모든 보증을 부인합니다. 어떤 경우에도 작성자는 특별, 직접, 간접 또는 결과적 손해 또는 사용, 데이터 또는 이익의 손실로 인해 발생하는 모든 손해에 대해 책임을 지지 않습니다.
>
> **MIT**:  
> 이 소프트웨어 및 관련 문서 파일("소프트웨어")의 사본을 얻는 모든 사람에게 사용, 복사, 수정, 병합 권한을 포함하여 제한 없이 소프트웨어를 제한 없이 처리할 수 있는 권한이 무료로 부여됩니다. , 소프트웨어 사본을 게시, 배포, 서브라이선스 및/또는 판매하고 소프트웨어를 제공받은 사람이 그렇게 할 수 있도록 다음 조건에 따라 허용합니다. 위의 저작권 표시 및 이 허가 표시는 소프트웨어의 모든 사본 또는 상당 부분에 포함되어야 합니다. 소프트웨어는 상품성, 특정 목적에의 적합성 및 비침해성에 대한 보증을 포함하되 이에 국한되지 않고 명시적이든 묵시적이든 어떠한 종류의 보증 없이 "있는 그대로" 제공됩니다. 어떤 경우에도 작성자나 저작권 보유자는 소프트웨어 또는 소프트웨어의 사용 또는 기타 거래로 인해 또는 이와 관련하여 발생하는 계약, 불법 행위 또는 기타 행위에 관계없이 청구, 손해 또는 기타 책임에 대해 책임을 지지 않습니다.

**private**:  
기본적으로 false이지만 남에게 보이고싶지않다면 true로 적어 비공개로 할 수 있다.

## 10. bugs

```js
    "bugs": {
        "url": "https://github.com/projectRepositoryUrl/issues"
    },
```

프로젝트의 문제를 보고할수 있는 위치 또는 페이지이다.

## 11. homepage

```js
"homepage": "https://github.com/projectRepositoryUrl#readme",
```

홈페이지는 해당 어플리케이션 또는 패키지의 시작(landing) 페이지를 지정한다.

---

드디어 이 글을 쓰게된 목적 dependencies다.

## ✡︎12. dependencies

의존성 또는 종속성이라 부르며 어플리케이션이 작동하는데 필수적인 모듈이나 패키지 목록을 나타낸다.
설치명령어: `npm i` or `npm i 패키지이름`

```js
"dependencies": {
        "axios": "^1.1.3",
        "bcrypt": "^5.1.0",
        "cors": "^2.8.5",
        "dbmate": "^1.0.3",
        "dotenv": "^16.0.3",
        "express": "^4.18.2",
        "jsonwebtoken": "^8.5.1",
        "morgan": "^1.10.0",
        "mysql2": "^2.3.3",
        "typeorm": "^0.3.10"
    },
```

## ✡︎13. dev-dependencies

어플리케이션이 작동하는데 필수적이지는 않으나 개발자들이 좀더 편하게 작업하기위한 모듈/패키지 목록을 말한다. 여기있는 목록을 설치하지않으면 에러가난다.
설치명령어: `npm i 패키지이름 --save-dev` or `npm install 패키지이름 -D`

```js
"devDependencies": {
        "jest": "^29.3.1",
        "supertest": "^6.3.1"
    }
}
```

---

## ❗️공부하게된 이유

pakage.json은 이 프로젝트에대한것들을 적은 문서이기때문에 dependencies로 설치할것을 dev-로 설치했을경우 json파일에서 지우고 다시 적어 수정하여 사용 할 수 있다.  
프로젝트때 다른 팀원이 한것을 pull해왔을때 버전을 바꾸고 npm i를 해보았으나 에러가 발생하는 경우가있었다.  
이는 package-lock.json때문이였는데 lock.json에서 의존성에있는 목록들의 버전을 해쉬로 바꿔 보관하고 있기 때문에 부스러기들이 남아있어 버전 충돌이 난 것이였다.  
때문에 잘못 설치한 경우 `npm uninstall 패키지이름`을 입력하여 데이터를 날려주고 다시 설치해주는것이 좋다고 생각한다.  
추가로 스크립트를 안닫거나 `,`때문에 에러도 많이나서 잘 확인해야한다.
