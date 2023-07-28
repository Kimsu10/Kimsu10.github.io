---
layout: single
title: "컴포넌트 분리하기"
categories: React
toc: true
toc_sticky: true
---

리엑트 4일차인데 어제만든 컴포넌트중 하나를 분리하는 과제를 받았다.
useState 와 props를 사용해서 분리하라는데 너무 어렵다.

```
🔨 과제 가이드
- src > pages > Product > components 폴더에 ColorButton 폴더를 생성해주세요
- 생성한 ColorButton 폴더에 ColorButton.js 파일과 ColorButton.scss 파일을 생성해주세요
- [Assignment 3-1]에서 구현했던 Color.js에서 colorButton을 분리해 ColorButton 컴포넌트로 구현해주세요
- Color.scss에서 적용된 스타일도 분리해서 ColorButton.scss에 입력해주세요
- 생성한 컴포넌트를 Color 컴포넌트에서 import 해주세요
- 총 3개의 ColorButton 컴포넌트를 사용하고 props로 각각 다른 데이터를 전달해서 다른 UI가 나오도록 구현해주세요
- 아래의 예시 영상과 동일하게 동작하도록 구현해주세요
- 모든 작업이 완료되면 Assignment3-4 : ColorButton 컴포넌트 분리 라는 커밋 메세지를 남기고 PR을 올려주세요
```

읽어보고 느끼점은 '? 컴포넌트가 왜 3개지?'였다.  
일단 어제 배운 state와 props를 사용해서 분리하면 될꺼같은데 감이 10정도? 온 듯.  
내가볼때 아래의 코드는 이미 한몸인데 분리하라니..!

```jsx
//분리해야할 코드
import React, { useState } from "react";
import "./Color.scss";

const Color = () => {
  let [textColor, setTextColor] = useState("red");

  return (
    <div className="color">
      <span className="colorText">
        색상 :
        <div className={`selected ${textColor}`} />
        {textColor}
      </span>
      <div className="colorHandler">
        <button
          className="colorButton white"
          onClick={() => {
            setTextColor("white");
          }}
        />
        <button
          className="colorButton red"
          onClick={() => {
            setTextColor("red");
          }}
        />
        <button
          className="colorButton yellow"
          onClick={() => {
            setTextColor("yellow");
          }}
        />
      </div>
    </div>
  );
```

계속 생각하면서 적어보니 처음과 끝이 살짝 보이는거같았다.  
근데 중간을 모르겠어서 그냥 다 쳐 봤다.  
종이에적어보고 해본 첫 시도는 일단 배열로 만들어서 보내자였다.

# 📝 생각 정리

## 0. 목적이 뭐지?

컴포넌트는 기능을 재사용하기위해 사용한다.  
분리해서 다른곳에서도 쓸 수 있게하는것이 목적이다.  
그럼 뭐가 부모요소고 뭐가 자식요소일까?

## 1. 뭘 분리해야할까?

그럼 위의 코드에서 어떤걸 재사용하는걸까?  
내가볼때는 버튼.  
버튼이 3개니까 3개로 분리해서 3개의 color컴포넌트를 사용하라는게 아닐까?

```jsx
  <div className="colorHandler">
        {/* 버튼을 따로 분리해서 안에 텍스트와 프롭스를 주입 */}
        {/* 아마 여기에<Button>이 빠지고 </Button> <ColorButton />이 들어올듯?*/}
        <ColorButton textColor="red" setTextColor={setTextColor} />
  {/* <button
          className="colorButton white"
          onClick={() => {
            setTextColor("white");
          }}
        /> */}
```

여기까지는 맞는거같다.

## 2. 어떤 데이터를 줘야할까?

이다음으로 생각한건 부모요소에서 어떤 데이터를 줘야할지였다.  
확실한건 버튼이 동작하기위해서는 변수명과 set함수 모두 써야한다는것이다.  
그래서 일단 부모요소의 버튼태그를 전부 가지고와서 생각해봤다.

```jsx
//parent
const Color = () => {
  let [textColor, setTextColor] = useState("red");
```

```jsx
//child
import React, { useState } from "react";
import "./ColorButton.scss";

const ColorButton = ({ textColor, setTextColor }) => {
  return (
    <button
      className="colorButton red"
      onClick={() => {
        setTextColor("red");
      }}
    />
  );
};

export default ColorButton;
```

보니까 일단 state명을 우선 맞춰야겠다고 생각했다.  
근데 클래스네임이 두개가있는데 하나만 가져오면 어떻게되지?  
뭉개지나? 괜찮나 싶어서 안가져와봤다.

```jsx
return (
  <button
    className={`${textColor}`}
    onClick={() => {
      setTextColor(textColor);
    }}
  />
);
```

결과는 깨진다.

![](https://velog.velcdn.com/images/kimsu10/post/1af21664-8142-418f-a1c5-bc9a8d5284ed/image.png)

누르면 색은바뀌지만 박스가 너무작다..ㅋ  
두 클래스명을 다가져오니 정상적으로 작동하였다.

![](https://velog.velcdn.com/images/kimsu10/post/2202a774-9474-41e9-9a9a-2af8b76f5a87/image.png)

## 3. 어떻게 사용하지?

이건 이미 생각하고있던거여서 쉽다. 고 생각했다.^^;  
일단 세가지 색이 필요하니까 컴포넌트 세개를 불러왔다.  
그런데 빨간색만이나왔다.

![](https://velog.velcdn.com/images/kimsu10/post/c4ab81ad-7d10-45b3-bbc0-ba0703776707/image.png)

왜지?  
코드를 확인하니 텍스트 컬러가 red로 되어있었다.

```jsx
<div className="colorHandler">
  <ColorButton textColor="red" setTextColor={setTextColor} />
  <ColorButton textColor="red" setTextColor={setTextColor} />
  <ColorButton textColor="red" setTextColor={setTextColor} />
</div>
```

이걸 다 하드코딩으로 해도되지만 다른방법이 해보고 싶었다.

**시도 1. 배열**

state안에 배열로 넣고 순서대로 부르는 방식을 생각했다.

```jsx
const [textColor, setTextColor] = useState(["white", "red", "yellow"])

<button>{textColor[0]}<button>
```

....🤔
막상 쓰고나니 이게 하드코딩이랑 뭐가다르지 싶어졌다.

state는 값을 직접적으로 조종하면 안된다고알고있었기에 새로운 배열로 선언해서 만들어주고  
 배열안의 요소들을 순회하여 버튼의 기능이 리턴하도록 map함수를 사용하였다.

```jsx
const Color = () => {
  const [textColor, setTextColor] = useState("white");

  const colors = ["white", "red", "yellow"];

  colors.map((ele, idx) => {
    return <ColorButton textColor={textColor} setTextColor={setTextColor} />;
  });

  return ()

```

3개의 컴포넌트가 있던 자리에 이걸 놓고 실행하니 잘 작동헀다.

---

# 😼결과물

```jsx
//ColorButton.js
import React, { useState } from "react";
import "./ColorButton.scss";

const ColorButton = ({ textColor, setTextColor }) => {
  return (
    <button
      className={`colorButton ${textColor}`}
      onClick={() => {
        setTextColor(textColor);
      }}
    />
  );
};

export default ColorButton;
```

```jsx
import React, { useState } from "react";
import ColorButton from "../ColorButton/ColorButton";
import "./Color.scss";

const Color = () => {
  const [textColor, setTextColor] = useState("white");

  const colors = ["white", "red", "yellow"];

  return (
    <div className="color">
      <span className="colorText">
        색상 :
        <div className={`selected ${textColor}`} />
        {textColor}
      </span>
      <div className="colorHandler">
        {colors.map((ele, idx) => {
          return <ColorButton textColor={ele} setTextColor={setTextColor} />;
        })}
      </div>
    </div>
  );
};

export default Color;
```

---

## 🤔

개념만 들었을때는 쉽다고 생각했는데
막상 작성하려니 손도 머리도 멈춰버렸다.
그래서 차근차근 단계를 생각하면서 해보니 어느샌가 원하는대로 작동하는게 정말 희열을 느낌
위에는 과정을 3가지만 적었는데 실제로 했을때는 6가지쯤 더 고려했었다.

결과만을 내기보다 과정이 중요하다는게 이런 느낌이구나라는걸 처음 느껴봤다.
