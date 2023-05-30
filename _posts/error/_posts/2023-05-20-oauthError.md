---
layout: single
title: "Oauth에서 겪은 에러들"
categories: Error
tag: "nestjs"
sidebar_main: true
toc: true
toc_sticky: true
author_profile: true
---

# 구글로그인 오류

딱 들어가자마 나온것이 승인 차단이었다.

흠..invalid_request, missing redirect_uri..

![](https://velog.velcdn.com/images/kimsu10/post/1003bfd0-2409-4b08-9fa1-acce29a0c5de/image.png)

공식문서에서 찾아봐도 저 에러메세지는 찾지못했다.

음...대체 왜 차단되는거지.. 비밀번호랑 ID랑 콜백주소까지 제대로 적어두었는데..

일단 늦어서 기록만 해두자.

---

자고 일어나서 확인하니 너무 충격적이였다.

아래 코드에 원인이 있었다.

```js
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";

export class JwtGoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SCERET,
      callbackURL: process.env.GOOGLE_CALLBACK_URI,
      scope: ["email", "profile"],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return {
      nick: profile.displayName,
      email: profile.emails[0].value,
    };
  }
}
```

오타라는 이름의 원인이....

SCRECT....SECRET.......

![](https://velog.velcdn.com/images/kimsu10/post/d12536d0-e512-4f8b-b7a5-465212b262e5/image.png)

---

# 카카오 로그인 오류

![](https://velog.velcdn.com/images/kimsu10/post/44c6991a-a36a-492d-b9c0-9e3ab78384cc/image.png)

이번에는 카카오 로그인에서 에러가 났다.

아니...이 쉬운 방법이 다나와있는 소셜로그인을 두개 다 요청실패라니 나는대체..?

그래도 구글로그인에서 배운게 있다. 분명 기초적인 부분일테지..

![](https://velog.velcdn.com/images/kimsu10/post/fb599b3a-fa34-4097-b9db-441e7259827c/image.png)

카카오 strategy가 없다고 뜬다

![](https://velog.velcdn.com/images/kimsu10/post/4b2b0bdc-7ccd-45d7-9fd5-0045887299af/image.png)

provider가 왜 비어있을까?

![](https://velog.velcdn.com/images/kimsu10/post/da2b3ec1-97c8-48e0-a5c1-f9a8392736f0/image.gif)

아무튼 카카오 스트레터지를 추가하니 잘 작동하였다.

# 추가

구글이 첫 로그인 시도시 에러가나고 두번째부터는 잘받아오는데 이문제도 원인을 찾아야겠다.
