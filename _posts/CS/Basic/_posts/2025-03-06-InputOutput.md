---
layout: single
title: "입출력과 변수"
categories: CS
tag: [정보처리기사]
sidebar_main: true
toc: true
toc_sticky: true
---

# 컴퓨터가 값을 받는 방법

## 표준 입출력

- 컴퓨터가 값을 입력받고 값을 출력하는 기본적인 방법/. 입력의 경우 보통 키보드 입력이 기본 소스로 사용되며, 사요자가 콘솔에서 입력한 값이 프로그램으로 전달된다.

- 표준 출력은 콘솔(터미널) 화면을 통해 출력하는것이 기본적인 방법이며, 프로그램이 실행된 후 겨과를 화면에 표시하는것을 말한다.

## 입출력 함수

프로그래밍 언어 환경을 설치하면 자동으로 내장되어있는 함수를 사용한다.

1. 입력받는 함수

2. 출력하는 함수

|               | C                                 | java               | Python                      |
| :------------ | :-------------------------------- | :----------------- | --------------------------- |
| 입력받는 함수 | scanf, gets, fgets(보안관련 안씀) | Scanner            | input                       |
| 출력하는 함수 | printf.puts                       | System.out.print() | System.out.println(), print |

파이썬의 input은 무조건 문자열로 들어온다.

---

## 프로그램의 시작점

C언어와 JAva 에서는 `main함수`에서 코드가 시작된다.
main이라는 부분을 먼저 찾고 그에 해당하는 블록부터 코드가 시작된다.

```c
int main(){
//시작점
}
```

```java
// JAVA
public class Main{
// 시작점
public static void main(String[] args){
System.out.print();
}
}
```

---

# 변수선언과 출력

## 1. 타입

### 원시 타입

| 언어   | 종류                                              |
| :----- | ------------------------------------------------- |
| C      | char, int, short, long, float, double             |
| JAVA   | byte, short, int, long, double, boolean           |
| Python | int, float, bool, str, bytes, set, list, dict ... |

📌 기억하기

| 숫자형 자료형 | 문자 자료형 | 복합 자료형    |
| :------------ | ----------- | -------------- |
| int(정수형)   | char        | struct         |
| float(소수)   | String      | class          |
| double(소수)  | str         | Array(or list) |

## 2. C, Java, Python 출력방법

### 개행시 주의

- C언어는 `\n` , Java는 `ln` , Python은 `자동 개행`

| C                            | Java                       | Python                             |
| ---------------------------- | -------------------------- | ---------------------------------- |
| printf(변수)                 | System.out.println(출력값) | print(출력값)                      |
| printf("%d", 숫자)           | System.out.print(출력값)   | a= 31                              |
| printf("%c", 문자) - 한 글자 | int a = 31                 | print(a) - 기본적으로 개행         |
| printf("%s", 문장)           | System.out.println(a)      | print(a, end="") - end에 옵션 가능 |
|                              | System.out.println(a)      | print(a)                           |
| 31                           | 31                         | 31                                 |
| 31                           | 31                         | 3131                               |
| 3131                         | 3131                       |

파이썬에는 int나 float이라는 단어가 없다.
파이썬은 단어에 저장되면, 언어가 알아서 타입을 지정해 주기 때문에 타입별 기능만 알면 된다.

---

### 정수형태 출력시 주의

int는 저장되는 모든 수를 정수로 표현한다.

```c
int a = 3.4;
float b = 3.4;
```

|       | C언어                                                   | Java                                             |
| ----- | ------------------------------------------------------- | ------------------------------------------------ |
|       | printf("%d\n", a);                                      | System.out.println(a);                           |
|       | printf("%d\n", b);                                      | System.out.println(b);                           |
| int   | 3: 오류는 안나나 소수점을 버려 버리고 정수값만 나타난다 | 컴파일 오류가 발생 : int 는 소수를 담을 수 없다  |
| float | 이상한 값이 출력                                        | Java는 double 을 쓰고 출력하면 정상값 3.4가 출력 |

---

### 변수, 출력 요약 및 주의

- **C언어**에서 소수형을 int에 담으면 **소수점 아래를 버린다**.

  - (ex. int number = 3.4) 는 number 가 3이라는 뜻

- C, Java, Python에서 출력할 때 "띄어쓰기"를 주의하자

- 모든 데이터 형태를 알 필요는 없다. 출력 형태만 외우자.

- "" 큰 따옴표 안에 \n이 있는 경우에는 개행(아래로 내림)한다.
