---
layout: single
title: "HTML 문서 구조"
categories: Html
sidebar_main: true
toc: true
toc_sticky: true
---

# HTML5 문서의 구조

- HTML의 문서의 의미를 잘 표현할 수 있도록 시맨틱 태그를 중심으로 구조를 설계한다

## 1. 시맨틱 태그 (Sementic Tag)

- <u>의미를 담고 있는 태그</u>
- `<header>`, `<section>`, `<article>`, `<footer>`, `<nav>` 태그 등
- 위치와 색, 모양은 자동으로 결정되지 않는다

| 태그              | 사용                                                       |
| ----------------- | ---------------------------------------------------------- |
| `<!DOCTYPE html>` | HTML5 문서 선언                                            |
| `<html>`          | 전체 문서 루트                                             |
| `<head>`          | 메타데이터 영역(브라우저에 보이지 않는 정보 보관)          |
| `<header>`        | 페이지나 섹션의 머리말 표현​                               |
| `<heading>`       | 페이지 제목, 페이지를 소개하는 간단한 설명                 |
| `<nav> `          | 하이퍼링크들을 모아 놓은 특별한 섹션​, 페이지 내 목차 생성 |
| `<main>`          | 문서의 주요 내용                                           |
| `<article>`       | 본문과 연관되어있는 독립적인 콘텐츠                        |
| `<aside>`         | 보조 콘텐츠 (페이지 사이드에 배치)                         |
| `<section>`       | 문서의 장(chapter, section) 혹은 절을 구성하는 역할        |
| `<footer>`        | 꼬리말 영역, 주로 저자나 저작권 정보                       |

- 일반 문서에 여러 장이 있듯이 웹 페이지에 여러 `<section>`가능
- 헤딩 태그(`<h1>~<h6>`)를 사용하여 절 혹은 섹션의 주제 기입​
- `<article>`에 담는 내용이 많은 경우 여러 `<section>` 둘 수 있다

### 시맨틱 인라인 태그

- `<mark>`, `<time>`, `<progress>` 등

  ```html
  <p>내일의 <mark>날씨</mark></p>
  시간<time>7:00</time><br />
  강수량<meter value="0.9">90%</meter><br />
  습도<progress value="7" max="10">진행상황</progress>
  ```

  <img src="/assets/images/Html/2-2.png" width="400">

---

## 2. 폼(form)

### 입력서식 <**input**>

- 웹 페이지에서 <u>사용자 입력을 받는</u> 폼
  - 로그인, 등록, 검색, 예약, 쇼핑 등
  - <u>입력서식 작성할 때 `<form>`태그로 감싸주는게 좋다</u>
- 폼 요소
  - 폼을 만드는 다양한 태그
  - `<input>`, `<textarea>`, `<select>` 등
  - `<label>`을 통해 입력서식과 텍스트 연결.(label for~ input id)
- **form 태그의 기본 구조와 속성**

  - `name`: 폼의 이름 지정
  - `action`: 폼 데이터를 처리할 웹 서버 응용프로그램의 이름
  - `submit`: 버튼이 눌리면 브라우저는 action에 지정된 웹 서버 응용프로그램 실행 요청
  - 웹 서버 응용프로그램은 Java, JSP, PHP, C/C++ 등 다양한 언어로 작성
  - `method`

    - <u>폼 데이터를 웹 서버로 전송할때 사용</u>
    - form태그의 autocomplete 속성을 이용하여 이전 입력 내용 자동완성 가능
    - 대표적인 전송 방식 : GET, POST

    <img src="/assets/images/Html//2-3.png" width="400">

    ```html
    <form>
      이름: <input type="text" value="" /><br />
      암호: <input type="password" value="" maxlength="4" /><br />
      메모장: <textarea cols="10" rows="5">메모하세요</textarea>
    </form>
    ```

## 3. 입력서식 태그

- submit, reset, button 생긴 것은 같지만 역할이 다름
- value 속성을 통해 선택한 값을 서버로 넘겨줌

### 1) check box

- submit하면 value값이 전송됨

### 2) radio button

- name속성 값이 같은 라디오 버튼들이 하나의 그룹 형성

```html
<input type="submit" value="전송" /><br />
<!--서버에 전송-->
<input type="reset" value="리셋" /><br />
<!--input에 작성한 데이터 삭제-->
<input type="button" value="버튼" /><br />
<!--기능 딱히 없음-->

<form>
  탕수육<input type="checkbox" value="1" /> 짬뽕
  <input type="checkbox" value="2" /> 크림새우<input
    type="checkbox"
    value="shrimp"
    checked
  />
  <input type="submit" value="전송" />
  <!--submit이 꼭 있어야 함-->
  <!--서버에 전송되는 값은 텍스트가 아닌 value값-->
</form>

<form>
  <input type="radio" name="a" value="1" />탕수육<br />
  <input type="radio" name="a" value="2" checked />짬뽕<br />
  <input type="radio" name="a" value="3" />새우<br />
  <input type="submit" value="전송" />
</form>
```

<img src="/assets/images/Html/2-5.png" width="400">

- 체크박스, 라디오 버튼 예제

  ```html
  <legend>상품선택</legend>
      <p><b>주문할 상품을 선택해주세요</b></p>
      <ul>
          <li>
              <input type="checkbox" value="">선물용 3kg<input type="number">개
          </li>
          <li>
              <input type="checkbox" value="">선물용 5kg<input type="number">개
          </li>
          <li>
              <input type="checkbox" value="">가정용 3kg<input type="number">개
          </li>
          <li>
              <input type="checkbox" value="">가정용 5kg<input type="number">개
          </li>
      </ul>

      <p><b>포장 선택</b></p>
      <ul>
          <li>
              <input type="radio" name="a">선물 포장<br>
          </li>
          <li>
              <input type="radio" name="a">선물 포장 안 함<br>
          </li>
      </ul>
  </fieldset>
  <fieldset>
      <legend>배송 정보</legend>
      <ul>
          <li>이름:<input type="text"></li>
          <li>배송 주소:<input type="text"></li>
          <li>메일 주소:<input type="email"></li>
          <li>연락처:<input type="tell"></li>
      </ul>
  </fieldset>
  ```

### 3) SELECT

- `size`: 화면에 표시할 드롭다운 항목의 개수 지정
- `multiple` : 드롭다운 목록에서 둘 이상의 항목을 선택

```html
<select name="food">
  <option value="1" selected>탕수육</option>
  <option value="2">새우</option>
  <option value="2">짬뽕</option>
</select>
```

<img src="/assets/images/Html/2-6.png" width="400">

### 4) 시간, 날짜 등

- type = “time”, “datetime”, “detatime-local” 등

<img src="/assets/images/Html/2-7.png" width="400">

### 5) 기타 태그

```html
<input type="color" />
<br />
<input type="date" value="2016-09-01" />
<input type="range" min="0" max="100" list="temperatures" />
<br />
<datalist id="temperatures">
  <option value="10" label="Low"></option>
  <option value="50" label="Medium"></option>
  <option value="90" label="High"></option>
</datalist>
```

<img src="/assets/images/Html/2-8.png" width="400">

### 6) **datalist**

- <u>데이터 목록을 가진 텍스트 입력 창</u>
- 리스트를 작성하는 태그
  - `<option>` 태그로 항목 하나 표현
  - ✅ select를 더 많이 씀  
    <br/>
    <img src="/assets/images/Html/2-9.png" width="400">

### 7) 히든필드 (type=”hidden”)

- 화면의 폼에는 보이지 않지만 <u>사용자가 입력을 마치면 폼과 함께 서버로 전송</u>되는 요소
- 사용자에게 굳이 보여 줄 필요는 없지만 관리자가 알아야 하는 정보는 히든 필드로 입력

```html
<input type="hidden" value="사이트를 통한 직접 로그인" />
<label for="uid">아이디: </label>
<input id="uid" type="text" />
<input type="submit" value="로그인" />
```

- 히든 필드를 사용해 사용자가 사이트에서 로그인하는 정보를 서버로 넘겨줌
- 로그인 시 입력한 정보와 함께 히든 필드의 내용이 서버로 함께 전송됨

### 8) 데이터 목록 <**datalist**>, <**option**>

- datalist의 경우 text 입력서식의 list 속성와 datalist <u>id를 같게</u> 제공해야 함
  ```html
  <label for="prod2">포장 여부</label>
  <input type="text" id="prod2" list="pack" />
  <datalist id="pack">
    <option value="package">선물 포장</option>
    <option value="no_package">포장 안 함</option>
  </datalist>
  ```
- 크롬 브라우저의 경우 value와 텍스트 내용이 함께 표시됨  
  <br/>
  <img src="/assets/images/Html/2-10.png" width="400">

### <button>

- type= “submit”, “reset”, “button”
- type을 지정하지 않으면 submit으로 간주

## 입력서식 속성

- `autofocus` : 자동으로 입력 커서를 갖다 놓음

```html
<aside>💡 기본형 <input type="”text”" autofocus required /></aside>
```

- `placeholder` : 힌트속성
- `readonly` : 읽기전용
- `required`: 필수 입력 필드 지정(미입력 시 필수 필드라고 정보가 뜸)

### 예제

- `input`,`label`, `fieldset` 활용

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>웹페이지 제목</title>
  </head>
  <body>
    <h1>회원 가입을 환영합니다</h1>
    <fieldset>
      <legend>사용자 정보</legend>
      <ul>
        <li>
          <label for="id">아이디</label>
          <input
            id="id"
            type="text"
            placeholder="4자~10자 사이, 공백없이"
            maxlength="10"
          />
        </li>
        <li>
          <label for="email">이메일</label>
          <input id="email" type="email" />
        </li>
        <li>
          <label for="pw">비밀번호</label>
          <input
            id="pw"
            type="password"
            placeholder="문자와 숫자, 특수 기호 포함"
          />
        </li>
        <li>
          <label for="pw2">비밀번호 확인</label>
          <input id="pw2" type="password" />
        </li>
      </ul>
    </fieldset>
    <fieldset>
      <legend>이벤트와 새로운 소식</legend>
      <input id="yes" type="radio" name="event" />
      <label for="yes">메일 수신</label>
      <input id="no" type="radio" name="event" checked />
      <label for="no">메일 수신 안 함</label>
    </fieldset>
    <input type="submit" value="가입하기" />
    <input type="button" value="취소" />
  </body>
</html>
```

---

## 실습

- 회원가입 form 만들기

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <style>
      .data {
        position: relative;
        left: 30px;
      }
      input {
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <h1>프런트엔드 지원서</h1>
    <p>
      HTML, CSS, 자바스크립트의 기술을 이해하고 실무 경험이 있는 분을 찾습니다.
    </p>
    <hr />
    <form action="">
      <h4>개인 정보</h4>
      <div class="data">
        <label for="uname">이름</label>
        <input type="text" id="uname" placeholder="공백 없이 입력하세요" />
        <br />
        <label for="tel">연락처</label>
        <input type="tel" id="tel" />
      </div>
      <h4>지원 분야</h4>
      <div class="data">
        <input type="radio" name="pront" id="op1" />
        <label for="op1">웹 퍼블리싱</label>
        <br />
        <input type="radio" name="pront" id="op2" />
        <label for="op2">웹 개발</label>
        <br />
        <input type="radio" name="pront" id="op3" />
        <label for="op3">개발 환경 개선</label>
      </div>
      <h4>지원 동기</h4>
      <textarea
        placeholder="본사 지원 동기를 간략히 써주세요"
        cols="60"
        rows="5"
      ></textarea>
      <br />
      <input type="submit" value="접수하기" />
      <input type="reset" value="다시 쓰기" />
    </form>
  </body>
</html>
```
