---
layout: single
title: "Session과 Cookie"
categories: Html
sidebar_main: true
toc: true
toc_stickty: true
---

# 1. Sessions

> [npm express-session 사이트](https://www.npmjs.com/package/express-session)

세션이란 백엔드와 브러우저 간에 어떤 활동을 헀는지 기록 또는 기억으로 브라우저와 백엔드사이의 메모리(히스토리)이다.  
예를들어 내가 어떤 사이트에 로그인 중이라면 현재 사용하고있는 브라우저와 백엔드사이에 세션이 존재하고있다.(세션이 없으면 다시로그인해야한다.)  
세션이 작동하려면 백엔드와 브라우저가 서로에대한 정보를 가지고 있어야한다.  
왜냐하면 로그인페이지에서 HTTP요청을 하면 요청이처리되고 연결이 끝나게되는데 그이후로는 백엔드도 브라우저도 아무것도 할 수 없게된다.  
요청이처리되고 브라우저도 서버도 누가요청을 보냈는지 잊어버리게되는데 이것을stateless라고 한다.

> [**stateless공부글**](https://kimsu10.github.io/nodejs/Authentication&Authorization/#1-statelsess-server)  
> stateless란 연결이 한번 되었고 끝나서 둘사이에 연결 state가 없는것이다.

때문에 서버는 어떤 유저인지 알필요가 있다.

# 2. Cookies

유저가 웹사이트에 처음 방문했을때 이상한 텍스트를 백엔드로 보내준다.

![](https://velog.velcdn.com/images/kimsu10/post/24e834cd-f331-4927-ae89-705ba9106091/image.png)

내가 원하든 원하지 않든 브라우저를 새로고침할때마다 백엔드에서는 쿠키를 받고있다.  
브라우저가 알아서 백엔드로 쿠키를 보내도록 되어있어서 새로고침을 할때마다 자동으로 생성된다.

```js
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});
```

![](https://velog.velcdn.com/images/kimsu10/post/bd44a6f6-1faf-4133-851d-cb4f6a19c6bc/image.png)

```js
app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});
```

백엔드가 기억하고있는 세션을 보고싶다면 위의 코드를 쳐보면 된다.

![](https://velog.velcdn.com/images/kimsu10/post/cb1e6b4e-011a-4513-87f2-c82af12121db/image.png)

첫 방문때는 아무것도 나오지 않았으나 두번째 방문때는 백엔드가 나의 접속을 기억하고 있었다.  
세션id가 있으면 세션 object에 정보를 추가할 수 있다.

![](https://velog.velcdn.com/images/kimsu10/post/d4da7964-14f3-4bd7-a409-3d583760d9aa/image.png)

쿠키에는 세션id값이 들어가있다.  
위에 빨간색으로 네모칸을 친것이 브라우저를통해들어간 유저를 백엔드가 구분하는 id이다.  
백엔드에 요청을 보낼때마다 이 id를 같이 보내줘야한다.

재밌는게 또다른 브라우저로 같은 사이트에 들어가면 저코드가 바뀐다.  
세션과 세션id는 브라우저를 기억하는 방식중 하나로 다른 브라우저로 같은 사이트에 들어가면 저 코드가 바뀌는것을 확인할 수 있다.

```js
app.get("/random", (req, res, next) => {
  return res.send(`${req.session.id}`);
});
```

위 코드의 url을 마음대로 설정하고 들어가보면 페이지마다 다른 세션id가뜨게된다.  
서버가 브라우제에게 세션아이디를 준다.

세션미들웨어가 있다면 express가 알아서 그 브라우저를 위한 세션id를 만들고 브라우저에 보내준다.  
브라우저는 쿠키에 그 세션id를 저장하고 express에서도 그 세션을 세션 DB에 저장한다.  
세션DB에있는 id와 쿠키에있는 id가 같도록 말이다.  
그러면 브라우저가 해당 PORT의 모든 url에 요청을 보낼때마다 세션id를 요청할 것이다.  
이제 백엔드는 DB에서 id를 검색하여 어떤 유저가 어떤브라우저에서 요청을 보냈는지 알 수 있다.
