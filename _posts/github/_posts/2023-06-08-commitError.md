---
layout: single
title: "github blog 잔디 안심어지는 문제"
categories: GitHub
tags: [Git, jekyll]
toc: true
toc_sticky: true
sidebar_main: true
---

깃허브 블로그에 글을 쓰고있는데 잔디가 안심어지는 문제가 있었는데  
이제서야 수정하는이유는  
공부하면서 만들었던 프로젝트용 레포를 지워버렸더니 텅 비어버려서..2,3월달은 펑펑 놀아버린 사람이 되었다

![](https://velog.velcdn.com/images/kimsu10/post/7e5bbe5b-1f06-490a-bee4-50624fe7ece6/image.png)

검색을 해보니 예상되는 주된이유는 아래의 두가지라고 한다

**1. email주소가 다르다**
**2. merge되는 브랜치가 master(main)이 아니다**

![](https://velog.velcdn.com/images/kimsu10/post/d718571e-1237-4203-8b98-73bd1d6fbebf/image.png)

하지만 내경우는 위의 2가지 이유때문은 아니였다

# 원인

- <u>Fork한 레포지토리는 잔디가 안심어진다</u>

![](https://velog.velcdn.com/images/kimsu10/post/6201222c-6333-4b53-a182-7b44d7a7d257/image.png)

유튜브보고 jekyll 테마를 포크한거라 안심어지는거였다  
그럼 이제 어떻게 해야할까?

# 해결

## 1. 새로운 repository 생성하기

![](https://velog.velcdn.com/images/kimsu10/post/a8ad6f54-3d5b-496e-9162-800dbb9bbadf/image.png)

## 2. 기존의 repository clone하기

글을 써왔던 깃허브 블로그의 레포지토리 주소를 복사한뒤

![](https://velog.velcdn.com/images/kimsu10/post/e54fdb4f-0dcc-48fb-8691-415322e0422b/image.png)

터미널에접속하여 데스크탑으로 이동해서 아래와 같이 입력해준다.

```
cd Desktop

git clone --bare repository address
```

그러면 데스크탑에 `블로그폴더명.git`이라는 폴더가 생성된다.

> ![](https://velog.velcdn.com/images/kimsu10/post/4af295a3-0975-44fa-9d07-0d8542675116/image.png)

## 3. 새로만든 repository 주소 복사

1번에 만들어둔 레포로들어가면 아래의 이미지처럼 주소를 복사할 수 있다.

![](https://velog.velcdn.com/images/kimsu10/post/174a480c-b514-431d-855d-4622fa46747a/image.png)

## 4. 터미널에서 clone한 .git 폴더로 이동

```
cd 블로그폴더명.git
```

## 5. push --mirror 복사한 새 repo 주소 입력

터미널에서 .git폴더로 이동했으면, 3번의 복사한 주소를 아래의 코드와 함께 입력한다.

```
git push --mirror 새 repository 주소
```

## 6. 로컬에 만들어둔 .git폴더 삭제

```
cd ..

rm -rf 폴더명.git
```

clone해둔 폴더를 지우고 커밋을 한번 남겨봤는데 아무일도 없었다.  
평소 github desktop앱으로도 커밋과 푸시를 해서 앱으로 커밋하고 푸시해봤는데 아무일도 없었다.  
앱을 다시살펴보니 현재브랜치가 leetcode였다.  
위의 이미지들에는 없는데 clone을 했을때 새로운 브랜치로 master 와 leetcode라는 브랜치가 생겼다고 떴었다.

![](https://velog.velcdn.com/images/kimsu10/post/6c899624-b55d-4b38-80fb-9b5e8b214cad/image.png)
(현재는 leetcode브랜치를 지워서 이미지에서는 categorySetting이다.)

![](https://velog.velcdn.com/images/kimsu10/post/c28d979a-82d1-4de3-ba87-2790b97661ab/image.png)

앱에서 브랜치를 master로 바꾸고 커밋해봤는데 여전히 아무일도 일어나지 않았다.

## 7. default branch 확인 및 변경

브랜치.. 별생각없이 지나갔는데  
확인을위해 새로만든 레포지토리에 세팅에 들어가서 확인해봤다.

확인해보니 Default branch가 master가 아니였다.  
맨위에 주된원인 2번인 merge는 main이나 master여야 한다는 문제가 여기서 발생했다.

![](https://velog.velcdn.com/images/kimsu10/post/2efaa530-a9b0-4c32-a6f9-59f3df39c484/image.png)

![](https://velog.velcdn.com/images/kimsu10/post/7fd2d5a3-93f5-4963-83b2-3b7ed2968c52/image.png)

마스터로 변경해주고 다시 커밋하고 푸시하니 잘 작동했다.

![](https://velog.velcdn.com/images/kimsu10/post/37fed9df-7a2f-47a4-859e-014adac42602/image.png)

![](https://velog.velcdn.com/images/kimsu10/post/bc92be73-62ee-420c-85ee-ae9da4b165ec/image.png)

근데 블로그도 생각보다 잘 안썼구나..
