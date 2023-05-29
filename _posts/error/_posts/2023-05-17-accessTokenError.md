---
layout: single
title: "AccessToken에서 겪은 오류"
categories: Error
tag: "nestjs"
sidebar_main: true
toc: true
toc_sticky: true
author_profile: true
---

서버를 켜니 아래와 같은 오류가 떴다.

![](https://velog.velcdn.com/images/kimsu10/post/bfd75e92-aee3-485b-8d77-bca464fa61f6/image.png)

'분명 문자열로 리턴될텐데 왜 void 나 any를 하라고하지?'' 생각하며 any로 바꿨다.

서버를 켜보니 오류는 사라졌는데 포스트맨으로 요청을 보내면 아무것도 반환되지않았다.

로그인 코드는 확실하게 작동하는것을 확인했으니 문제는 getAccessToken쪽인데

다시보니 return을 안썼었다.

값이 리턴되는게 없으니 void를쓰라고 뜬거였고 string을 썼을때 에러가 났던것이였다.

![](https://velog.velcdn.com/images/kimsu10/post/b9cff457-0b2f-471f-a01e-150529d7e0a2/image.png)

기초적인거지만 이렇게 또 하나 배워간다.

![](https://velog.velcdn.com/images/kimsu10/post/5859c9fd-0f82-4477-af5a-f3da0c53566b/image.png)

엑세스토큰 값 받기 성공이다 ㅎㅎ
