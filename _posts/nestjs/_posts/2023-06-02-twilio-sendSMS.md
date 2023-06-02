---
layout: single
title: "twilio로 문자 인증하기"
categories: Nestjs
sidebar_main: true
toc: true
toc_sticky: true
---

![](https://velog.velcdn.com/images/kimsu10/post/82ebef84-c0aa-4d86-8975-430b1e482544/image.mp4)

팀원분이 email이아닌 핸드폰번호로 회원가입하는 기능을 만들어보고 싶어하셨다.  
그래서 "한번 해보죠!"라고 자신있게 말했는데 생각보다 막히는 구간이 많았다.  
핸드폰 번호 인증하기가 그 첫번째 구간이였다.

일단 문자 인증서비스를 어디를 이용할까 찾아보았고  
네이버와 twilio를 고민했는데 횟수(무료)도 많고 저렴한 twilio를 선택했다.

> [twilio Docs](https://www.twilio.com/docs)
>
> 들어가보면 원하는 서비스를 단계별로 잘 설명해두었다.  
> ![](https://velog.velcdn.com/images/kimsu10/post/9d0eda5a-6e6a-47f8-8fbc-3fa15d40fc93/image.png)

# Twilio 사용하기

## 1. 회원가입 후 로그인하기

로그인하면 아래의 이미지처럼 step(과정)과 사용언어별로 코드를 알려준다.

![](https://velog.velcdn.com/images/kimsu10/post/57c87e02-ac7c-4edf-938a-6741e9332edd/image.png)

## 2. Account SID

로그인해서 들어온 콘솔화면의 아래쪽을 보면 account Sid와 auth Token 있다.  
벌써 기억이 가물가물한데 핸드폰번호 인증을 하고 발급됬던거 같다.

![](https://velog.velcdn.com/images/kimsu10/post/a9a15b30-3185-418e-8403-07070e322bd6/image.png)

## 3. 전화번호 구입하기

아래의 이미지대로 들어가서 전화번호를 구입해야한다.

![](https://velog.velcdn.com/images/kimsu10/post/b60a5475-a834-45cc-b525-1420fe72b22d/image.png)

(참고로 한국 번호 없음...일본은 있는데 비싸다..)  
어느나라번호든 국외발신은 의심부터할거같아서  
저렴한 곳 중 독일이랑 미국을 고민하다 미국번호로 선택하였다.

구매하면 액티브 넘버에서 확인 가능하다.

![](https://velog.velcdn.com/images/kimsu10/post/01aa1bc5-b53f-48e3-9216-d6ee53e0f9a1/image.png)

이미지 오른쪽의 코드를 복붙해서 사용하면 테스트메세지를 보낼수 있다.

![](https://velog.velcdn.com/images/kimsu10/post/39105c69-2c86-4933-bddc-6b847cb7825a/image.png)

단순히 테스트 메세지만 오기때문에 추가로 내가 더 작성해야한다.  
그래도 문자오는거 보면 신남.

```js
client.messages
  .create({
    from: "구입한 번호",
    to: "문자받을 번호",
    body: "문자 내용",
  })
  .then((message) => console.log(message.sid))
  .done();
```

![](https://velog.velcdn.com/images/kimsu10/post/e74cd713-ccc9-4091-a940-d4a7aeda66de/image.jpeg)

바디에 뭘 넣어야할지 몰라서 what 넣었더니 저렇게 왔다.

## 4. 서비스 SID 생성하기

아래 이미지의 create를 눌러 프로젝트(서비스)를 만들면 서비명과 서비스sid가 생성된다.

![](https://velog.velcdn.com/images/kimsu10/post/6909f8a2-3c19-4ff9-a1f7-97a57ccf6dfc/image.png)

사용할 서비스 이름을 적고 사용할 인증서비스를 체크하자.

![](https://velog.velcdn.com/images/kimsu10/post/be7f7bc0-f603-4e57-8832-b4c30f9e0fac/image.png)

이제 생성된 service SID, auth Token, account SID를 사용해서 코드를 작성하면된다.

물론 그전에 프로젝트 폴더에 twilio를 설치해야한다.

## 5. VScode에 설치하기

아래의 코드를 터미널에 입력하면 twilio의 서비스를 사용할 수 있다.

```js
//npm instalation
npm install --save nestjs-twilio
//yarn instalation
yarn add nestjs-twilio
```

진짜 코드가 정리가 잘되어있어서 아래의 코드로 바로 사용하면 된다.

> **일반 메세지 보내기** >![](https://velog.velcdn.com/images/kimsu10/post/dbb0183d-356a-41f8-ae4b-ebf1d7141f62/image.png)

내가 Nestjs로 프로젝트한다고해서 어려울뿐...

```js
@Injectable()
export class SMSService {
  private readonly twilioClient: Twilio;
  private readonly verifySid: string;
  private readonly twilioService: TwilioService;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
    this.twilioClient = require('twilio')(accountSid, authToken);

   async sendMessage({ phoneNumber }): Promise<void> {
   return this.twilioService.client.messages
     .create({
       body: "가입성공.",
       from: process.env.TWILIO_PHONENUMBER,
     //내 1달러 전화번호는 소중하니까 비밀(?)이다.
       to: phoneNumber.replace('0', '+82'),
         //전화번호가 invalid한 유형이라고떠서 바꿔줌.
     })
     .then((message) => console.log(message));
	}
 catch(err) {
   console.log(err);
 	}
  }
}
```

이렇게 일반 메세지를 만들고 좋아했는데,  
생각해보니 문자인증이 아니라 단순한 메세지를 보내고 있잖아?  
여기서 바로 랜덤한 인증코드만들고 보내준값이랑 일치하게하면 되지않나라는 생각이들었고 바로 body에 랜덤으로 만든 6자리 숫자조합을 해서 보내보았다.

```js
function verificationCode() {
  const length = 6;
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * 10);
    code += randomNum.toString();
  }
  return code;
}

const code = verificationCode();
```

뭔가 3줄로 썼었던거같은데.. 기억이안난다.

아무튼 재밌어서 이리저리 바꿔서 보내봄.

![](https://velog.velcdn.com/images/kimsu10/post/13b18c88-298a-487c-9729-bccae2a5e50f/image.jpeg)

이렇게 만들어서 보내주는것도 작동이 되지만,
twilio에서 직접해주는게 보안상으로 더 좋다고 생각해서서 위의 코드는 지우고 twilio verify 서비스를 이용하기로 했다.

```js
//twilio의 예시코드
import twilio from 'twilio';

export class Twilio {
  private client: twilio.Twilio;
  private accountSid = process.env.TWILIO_ACCOUNT_SID;
  private authToken = process.env.TWILIO_AUTH_TOKEN;
  private verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  constructor() {
    this.client = twilio(this.accountSid, this.authToken);
  }

  sednVerificationCode(options: { to: string }) {
    return this.client.verify.v2
      .services(this.verifyServiceSid)
      .verifications.create({ to: options.to, channel: 'sms' });
  }
  checkVerificationCode(options: { to: string; code: string }) {
    return this.client.verify.v2
      .services(this.verifyServiceSid)
      .verificationChecks.create({ to: options.to, code: options.code });
  }
}
```

이 예제 코드를 변경해서 썼는데 에러가 빠방빠방 터졌다.  
 `.` 찍고 안의 함수들 하나씩 써보면서 만들었다.  
 ~~너무어려워...~~

그래도 만들고나니 브라우저에서 자유롭게 설정할 수 있어서 편리했다.

![](https://velog.velcdn.com/images/kimsu10/post/9891c3fa-9a17-4d15-a432-e520750f20bd/image.png)

유효시간이나 경고, 알림같은 다양한 기능들이있는데 한글이 안되는게 아쉽다.  
(아닌가 되는데 내가 못찾은걸수도..?)

![](https://velog.velcdn.com/images/kimsu10/post/e272c19c-b6c1-4bf9-bbc9-0091f608eb9c/image.jpeg)

# 테스트 영상

아직 더 고민하고 나눠야할 부분이 보이지만 잘 작동한다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/-pqD6x9acII" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

# 느낀점

지금까지 프로젝트 3개를 하면서 외부 API파트는 한번도 사용해본적이 없었다.

학원에서 듣기로는 쉽다고 나와있는대로 하면 된다고했었는데 나는 너무 헷갈렸음..

Nestjs를 공부하면서 만들다보니 시행착오도 많았고 너무 어려웠다.

예제코드들을 다돌려보고나서야 사이트가 정리가 잘되어있다는 것을 느꼈다.

```
공식문서를 더 자주 꼼꼼히 보자.
```

```
블로그를 바로바로 쓰자.
```
