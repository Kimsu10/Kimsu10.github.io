---
layout: single
title: "초기설정(0)"
categories: Nodejs
author_profile: true
sidebar_main: true
tag: [setting, git, json, npm]
toc: true
toc_stickty: true
---

# 1. 프로젝트를 진행 할 폴더를 만든다

```
맥북: mkdir 폴더명
윈도우: 새폴더
```

# 2. github에 연결하기

### 1. 폴더 경로에 `git init` 입력.

### 2. 깃허브로 이동하여 새 레포지토리를 만든다.

![](https://velog.velcdn.com/images/kimsu10/post/1170f6a3-450a-423f-806d-386f239f39de/image.png)

### 3.만들어진 레포의 url을 복사.

![](https://velog.velcdn.com/images/kimsu10/post/32dde695-a29f-4f93-98be-e5a23a25968d/image.png)

### 4. `git remote add origin [레퍼지토리 URL]`

잘연결됬는지 확인하고 싶다면 `git remote -v`를 입력하면된다.
처음 폴더를 만들었을때 위 명령어를 입력하면 비어있으나 복사한 url을 연결하였다면 아래의 사진처럼 뜰 것이다.
![](https://velog.velcdn.com/images/kimsu10/post/222bca0f-85f7-4227-9ff3-818654b040b8/image.png)

## 3. package.json을 만들기

`touch package.json`으로 만들수도 있지만 수동으로 만들면 에러가 날 가능성이 높으므로 npm을 써서 만들자.

> ### json(JavaScript Obnect Notation)이란?
>
> 제이슨은 프로그래머가 파일에 정보를 저장하기 위해서만든 방식중 하나로 데이터를 교환하기 쉬워 많이 사용하는 표현식이다. JS를 통해 json의 내용을 JS의 객체로 변환하며, 단순한 데이터 포맷으로 데이터를 표시하는 방법이다.

nodejs에서 이름은 무조건 package.json이여야한다.
`touch package.json`으로 만들수도 있으나 에러날 수 있으므로 다른방법으로 만들었었다.

## 4. npm init

`npm init`을 하면 package.json파일 만드는것을 도와준다.
갑자기 내게 입력을 요구하는게 당황스러워서 망설여지겠지만 package.json안의 내용은 언제든지 고칠 수 있으므로 편하게 쓰면된다.

```js
package name: (패키지이름)
version: (1.0.0)
description: 어떤 패키지인지 설명쓰는곳//안써도 됨
entry point: (index.js) <-다른 사람들이 패키지를 다운받았을때 시작지점(main)이 되는 파일
test command: 복사한 레퍼지토리 페이지
keyword:
author: 제작자
license: (ISC)
```

순으로 작성하면 완성되었냐며Is this OK?(Yes)라고 뜬다. enter키를 누르면 아래의 사진처럼 만들어준다.
![](https://velog.velcdn.com/images/kimsu10/post/67f3b066-16ab-480d-a655-e2bf16c5ad11/image.png)

> ### scripts란?
>
> scripts: 실행하고싶은 것

![](https://velog.velcdn.com/images/kimsu10/post/7389512f-23ed-459e-804e-1db5675d2546/image.png)

## 5. index.js만들기

`touch index.js`를 입력하거나 화면왼쪽상단의 ![](https://velog.velcdn.com/images/kimsu10/post/c4c2dcc6-1c0a-447a-bed1-06e7f76311a1/image.png)을 눌러 index.js파일을 만들어주자.

node index.js로 index파일을 실행 할 수 있지만 npm을 사용는것이 훨씬 편리하다.

```
package.json에 "scripts":{
	"사용하고싶은 말": "node index.js

```

`npm run 사용한말`를 치면 node index.js를 입력한것과 같은 결과물이 나온다.
반드시 프로젝트 폴더 경로에서 사용해야한다. 폴더내에 package.json이 없거나 json 파일이 있지만 프로젝트 폴더 밖에서 npm을 실행하면 모듈이 없다며 작동하지 않는다.
`ls`를 쳐보면 내가 경로에 있는지 확인할 수 있다.
