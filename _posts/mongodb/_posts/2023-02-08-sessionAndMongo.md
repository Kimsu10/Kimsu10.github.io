---
layout: single
title: "세션을 몽고디비에 연결하기"
categories: MongoDB
author_profile: true
sidebar_main: true
toc: true
toc_stickty: true
---

# 1. Session 설치하기

[express-session](https://www.npmjs.com/package/express-session)
`npm i express-session`을 입력하여 node.js에서 사용할 수 있도록 설치한다.
`const session = require('express-session')`을 입력하여 불러온다.
쿠키에 세션id만 저장되고, 세션데이터는 쿠키가아닌 서버에 저장된다.

# 2. MongDB 연결하기

[connect-mongo](https://www.npmjs.com/package/connect-mongo)

설치 명령어를 터미널에 입력한다.

```
npm install connect-mongo
yarn add connect-mongo
```

connect-mongo를 import해준다.

```js
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: "foo",
    store: MongoStore.create(options),
  })
);
```

mongoStore를 만들어야하는데, 나의 몽고DB의 URL을 가지고있는 configuration object를 만들어야한다.

```js
mongoose.connect("mongodb://127.0.0.1:27017/DB명");
```

session미들웨어는 store라는 하나의 옵션을 가지고있다.
세션은 기본적으로 서버메모리에 저장되는데 이 옵션을 사용하면 디폴트로 설정된것과 다른 store를 설정할 수 있다.

```js
app.use(
  session({
    secret: "HiKSJ!",
    resave: false,
    saveUninitialized: false,
    cookies: {
      maxAge: 20000,
    },
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/DB명" }),
  })
  //실제 배포할때는 url과 secret가 노출되게 올리면 안된다. 누가 DB URL로 연결할 수 있어 매우위험하다.
);
```

이제 세션이 몽고DB에 저장된다.

session authentication(인증)을 사용하면 문제가 생길수있어
resave와 saveUninitialized를 false로 주었다.

사이트에 접속해보면 방문하는 모든 사용자에대해 쿠키를 만들어주고 세션을 만든다.
즉 사용자에게 쿠키를 주고, 세션은 디비에 저장되는 것이다.
위의 옵션에 true를 줄경우
봇이나 비로그인 사용자가 방문했을때의 세션도 모두 디비에 저장되어 디비의 용량이커지요 유비비용도 많이내야해서 좋지않다.

로그인한 사용자의 세션만 저장하는것이 좋다.

`secret`는 사용자가 쿠키에 sign(백엔드에 쿠키를 줬다는것을 보여주기위해)할때 사용하는 string이다.
왜냐하면 session haijack이라는 공격이 있기때문이다. 누군가 나의 쿠키를 훔쳐 나인척하할 수 있기때문에 secret을 사용한다. secret에 사용한 string으 가지고 쿠키를 sign하고 나임을 증명할수 있다.
`Domain`은 이 쿠키를 반든 backend가 누구인지 알려준다.
브라우저는 도메인에따라 쿠키를 만들어주고 쿠키는 도메인에 있는 백엔드로만 전송된다.
페이스북의 쿠키는 페이스북.com으로 구글의 쿠키는 구글.com으로 간다.
쿠키에는 또한 세션 만료기간(expires)이있다.Max-Age는 세션이 만료되는 날짜를 알려준다. 쿠키가 얼마나 오래있을수 있는지 확일할 수 있으며, 값은 1/1000초(miliseconds) 단위로 쓴다.
`saveUninitialized`는 세션이 새로 생성되고, 수정된적이 없을때 초기화하지 않는것(uninitialized)이다.
그렇다면 세션을 어디서 수정할 수 잇냐면 컨트롤러에서 수정할 수있다.

```js
//세션에 정보 추가하기
req.session.loggedIn = true;
req.session.user = user;
//이 두줄로 세셜을 초기화할 수 있다.
```

이 설정은 세션을 수정할 때만 세션을 DB에 저장하고 쿠키를 넘겨준다.
backend가 로그인한 사용자에게만 쿠키를 주도록 설정했다는 뜻이다.

세션인증의 문제점은 DB에 저장하는것이기때문에 이렇게 설정하였다. 그러나 하나더 해결책이 있는데 바로 token 인증이다.
[11월에 token글쓴거 이전하고 링크넣기]()

---

Domain을 비공개로 하기위해서는 .env파일이 필요하다.
package.json과 같은 경로에 .env파일을 만들고 git에 노출되지 않도록 .env파일을 .gitignore에 입력해주자.
.env에는 노출되어서는 안되는API ket나 url을 등의 환경변수를 넣어준다.
여기에는 모든것을 대문자로 적어야한다.
![](https://velog.velcdn.com/images/kimsu10/post/32c2717f-539d-4251-8f83-3b9d6bd62c05/image.png)

DB가 .env에 접근하기위해서는 process.env.변수명을 써주면된다.

```js
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookies: {
      maxAge: 20000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
```

.env는 가급적 최상단에 놓아야한다.  
 그래서 package.json에서 설정한 시작파일의 가장위쪽에 dotenv를 불러왔다.

![](https://velog.velcdn.com/images/kimsu10/post/d6f67da8-cbc0-49ad-9c6b-7835967fdebb/image.png)

![](https://velog.velcdn.com/images/kimsu10/post/fd7701f1-fb4a-421e-bba5-fd3becc7389a/image.png)  
그런데 갑자기 서버가 켜지지않았다.
경로설정이나 불러오는 방법을 변경해보고 콘솔도 많이찍어보니 모든것이 undefined가 떴다.
.env에도 제대로 썼는데 잘 보니 .env파일이 src폴더내에 있었다.
.env파일을 package와 같은 경로에 두니 서버가 실행되었다.

(몇몇 파일들을 src밖에 만들어서 드래그로 옮겼었는데 그때 같이 옮겨버린것같다.
항상 경로를 잘 확인하자..)

![](https://velog.velcdn.com/images/kimsu10/post/68533172-3fd2-4e0e-96f0-808e2932b709/image.png)

이제 서버는 켜지는데 여전히 DB에서 에러가 났다.

![](https://velog.velcdn.com/images/kimsu10/post/6f3074a7-782d-4bb7-8c82-2ad321d3268e/image.png)

각 파일들에 console.log를 찍어보니 DB에서만 데이터가 아예 나오지 않았다.
![](https://velog.velcdn.com/images/kimsu10/post/582f6f71-f4b0-49bd-bfe4-3bfeb1d0e3e8/image.png)
아래 사진의 `db.js`의 옵션이 먹히지 않는것같아서 지워버렸고
![](https://velog.velcdn.com/images/kimsu10/post/4e855c00-bf9b-46a4-9453-25127219b76f/image.png)

잘실행 되는 것을 확인하였다.
![](https://velog.velcdn.com/images/kimsu10/post/3fa075d4-1aa0-4ad9-995f-dfcd3850571e/image.png)
