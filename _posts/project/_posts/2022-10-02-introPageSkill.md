---
layout: single
title: "자기소개페이지 기능 소개"
categories: Project
sidebar_main: true
toc: true
toc_sticky: true
---

> **과제: 자기소개 페이지에 구현한 기능을 하나 선정하여 작성한 코드를 설명하기.**
>
> html과 css 모두 처음이였고 기초적인것밖에 공부하지못하여 무엇을 써야하나 고민했다
> 기초적이지만 꾸몄을때 팀원들이 반응이 좋았던 transform의 translate를 선택했다

아래는 제가 transform을 적용한 페이지와 코드이다.

![](https://velog.velcdn.com/images/kimsu10/post/090aca69-88fa-4173-9445-c824e44ec2ca/image.gif)

**HTML**

```html
<h1 class="main-comment">
  <i class="eng">Hello!</i> 안녕하세요!<br />
  <i class="eng">I'm SUJEONG.</i>
  <i class="highlight">자가지능<i class="back-h">김수정</i> </i> 입니다.<br />
</h1>
<p class="detail-comment">
  Think from various perspectives and Communicate.<br />
  I wanna be a <i class="highlight0">BACK-END </i> Developer who want to be
  with. <br />
  <i class="highlight1">다양하게 생각하고 소통하여 </i
  ><i class="highlight2">[함께 하고싶은 개발자] </i> 가 되고싶습니다.
</p>
```

**CSS**

```css
.highlight0:hover{
   font-family: 'Gugi', cursive;
   color: hotpink;
   background-color: whitesmoke;
   transform:translateX(17px) translateY(-200px) scale(4);
   border-style: none;
	transition-duration: 1s;
   border-radius: 10%;
```

- css에서 커서가 강조하고 싶은 글자에 올라왔을때 문장의 내용이 바뀌게 하고싶었기에 hover에 변형(transform)을 이용하여 문장을 덮게만들었다.  
  배경색은 뒤의 글자를 가리고 싶어서 배경색과 일치하게 입력하였고 강조하고 싶은 글자들을 hotpink색으로 통일했다.
- 글자가 부드럽게 움직이는것을 보여주기위해 transition-duration에 1초를 입력하였다.

페이지를 만들며 제가 궁금했던것은 translate와 transition이 어떻게 작용하는가였다.

# 1. transform

transform은 html의 요소를 움직이거나(translate),회전(rotate),기울기(skew),크기를 변경(scale) 할 수있고, 2D와 3D의 변형도 줄 수 있었는데, 아쉽게도 현재의 제실력으로는 translate와 scale밖에 사용할수 없었다.  
하지만 활용도가 참 다양하게 생각나서 나중에 써보고싶다.

# 2. translate()

translate는 요소를 x축, y축 또는 z축 방향으로 이동시킬때 사용합니다.

| transform: translate() |                       설명                        |
| :--------------------: | :-----------------------------------------------: |
|     translate(x,y)     | 요소를 수평으로 x만큼, 수직으로 y만큼 이동시킨다. |
|     translateX(x)      |        좌,우 수평으로 (x)만큼 이동시킨다.         |
|     translateY(y)      |        상,하 수직으로 (y)만큼 이동시킨다.         |
|     translateZ(z)      |    요소의 위치에서 Z축으로 (z)만큼 이동시킨다.    |
|   translate3d(x,y,z)   |      trnaslateX,Y,Z를 같이 사용한것과 같다.       |

![](https://velog.velcdn.com/images/kimsu10/post/9a3bc5a8-5ee8-454f-8744-8f8d851c480f/image.png)

제가 hover시 글자위치를 이동시키면서 의아했던점이 translateY의 이동방향이었다.  
수학시간에 배웠던 함수는 Y축의 +값은 위로, -값은 아래로였는데 translate함수는 반대였던 것이다.  
이는 요소는 기본적으로 화면(페이지)의 왼쪽상단이 기준이기때문에 top:0 이 기본값이되고, Y값에 50%를 입력할경우 0(상단)에서 50%아래로 내려가기때문에 아래로 절반이동한다  
100%면 화면 위쪽끝에서 아래쪽 끝으로 이동한다

```
Top:0 ------------
(요소)


Middle: 50% ------
(요소)


Bottom : 100% ----
(요소)
```

위에서 말했다시피 기본값은 화면의 좌측상단이며 부모요소가 있을경우에도 부모요소의 왼쪽상단이 기본으로 같다. 요소는 그 기준점에서 + 방향에 있는것이라 기준점(0)에 가까워지면 -가 된다.

![](https://velog.velcdn.com/images/kimsu10/post/c2cd5f90-c599-4518-8d4d-00347d2d1c3c/image.png)

위의 이미지는 그래도 y의 +값이 위로 갈 수 있지않나 생각이 들었을때, 화면의 왼쪽위의 점을 기준으로 왼쪽이나 위로 갈시 화면에 요소 뜨지 않기때문에 -라고 생각하면 이해가 쉽지않을까해서 그려보았다.

# 3. scale

scale은 요소를 확대하거나 축소하는데 사용됩니다. width,height를 사용하여 크기를 변경하는것과 똑같은거같지만, scale은 다른 요소에 영향을 미치지 않기때문에 정렬이 틀어지지 않는다.

| scale() | ()안의 숫자의 배율로 크기를 지정할 수 있다. |
| :-----: | :-----------------------------------------: |

# 4. transition

transition은 요소를 부드럽게 움직이게하거나 애니메이션의 속도,반복횟수 등을 조절 할수 있다.

### 1) transition의 속성

|      transition-ooo:       |                               설명                                |
| :------------------------: | :---------------------------------------------------------------: |
|      transition-delay      |                  이행 효과 지연(초)를 설정한다.                   |
|    transition-duration     |    이행효과가 몇초동안 실행될지 완료되는 시간(초)를 설정한다.     |
|    transition-property     | 이행효과의 대상 CSS속성의 이름을 설정한다.(color,poisition etc..) |
| transition-timing-function |                이행효과의 속도와 곡선을 설정한다.                 |

### 2) timing-fucnction

|   transition: ooo;    |                       설명                       |
| :-------------------: | :----------------------------------------------: |
|         ease          |        느린시작에서 가속후 다시 느려진다.        |
|        linear         | 처음부터 끝까지 같은 속도로 이행효과가 나타난다. |
|        ease-in        |           느린시작에서 점점 빨라진다.            |
|       ease-out        |          빠르게 시작해서 점점 느려진다           |
|      ease-in-out      |              처음과 끝이 느려진다.               |
| cubic-bezier(n,n,n,n) | 3차 배지어 함수에서 고유한 값을 정의할 수 있다.  |

<br/>
<br/>
<br/>
<br/>
<br/>

**댓글기능 다른거로 만들려고 준비중.**
{: .notice--warning}
