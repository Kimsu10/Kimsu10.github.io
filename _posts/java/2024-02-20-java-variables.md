---
layout: single
title: "Java의 변수"
categories: Java
tag: [Java]
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

# 변수

- 변수를 선언할때는 메모리 공간확보를 한 후 데이터값을 변수명에 넣을 수 있다.
- 변수명에는 규칙이 존재한다.

  - 변수명은 `문자(알파벳)`나 `밑줄(_)` 또는 `달러기호($)`로 `시작`해야한다.
  - 이후에는 숫자를 사용할 수 있다.
  - `첫 글자는 소문자로 시작`하는 것이 `관례`이지만, 대문자로 시작할 수도 있다.
  - 자바는 유니코드를 지원하므로 한글 변수명도 사용할 수 있다(but 권장되지 않음.). → 한글 사용x

- 첫 번째 글자는 문자, 소문자로 시작함, 한글 사용x

## 1. 자료형

| 값의 분류         | 기본타입(8가지)                                                             |
| ----------------- | --------------------------------------------------------------------------- |
| 정수(n)           | byte(1byte), char(2), short(2), int(4), long(8, 숫자뒤에 `L`을 적어줘야 함) |
| 실수(n.n)         | double, float(소수점이 있으면 숫자뒤에 f를 넣어야함)                        |
| 논리(true, false) | boolean                                                                     |

## 2. 문자형

- `char` : <u>한 글자</u>만 들어가며 값은 `작은 따옴표(’)`로 감싸야함

```
ex) char var1 =’A’;
```

- `string` : <u>문자열</u>로 들어가며 값은 `큰 따옴표(”)`로 감싸야함. calss 이다

## 3. 문자열 타입

| 이스케이프 문자 |                          |
| --------------- | ------------------------ |
| \t              | 출력 시 탭만큼 띄움      |
| \n              | 출력 시 줄바꿈(라인피드) |
| \” , \‘ . \\    | “, ‘, \문자 포함         |
| \r              | 출력 시 캐리지 리턴      |

```jsx
  System.out.println(a +" " + b + d);
  //변수명과 문자열 출력
  //더하는 사이에  " " 공백 추가 시 숫자끼리 더하지 않고 문자열로 나열됨

  //""안에 텍스트 입력 시 텍스트가 더해져 나옴
  String name="홍길동";
  int age=20;

  System.out.println(name + "의 나이는 " + age + "살이다");
  //길동의 나이는 20살이다
```

# 타입 변환

## 1. 자동 타입 변환

- 값의 허용 범위가 작은 타입이 큰 타입으로 대입될 때 발생
- `byte(1)` < `short(2) , char(2)` < `int(4)` < `long(8)` < `float(4)`(실수는 정수형보다 메모리가 큼) < `double(8)`

  ```jsx
  //자동 타입 변환
  byte byteValue = 10;
  //1byte
  int intValue = byteValue;
  //4byte
  System.out.println("intValue: "+intValue);
  //intValue: 10

  char charValue = '가';
  intValue = charValue;
  System.out.println("가의 유니코드: "+intValue );
  //가의 유니코드: 44032

  intValue = 50;
  long longValue = intValue;
  System.out.println("longValue: "+longValue);
  //longValue: 50

  longValue = 100;
  float floatValue = longValue;
  System.out.println("floatValue: "+floatValue);
  //floatValue: 100.0

  floatValue = 100.5F;
  double doubleValue = floatValue;
  System.out.println("doubleValue: "+doubleValue);
  //doubleValue: 100.5
  ```

## 2. 강제 타입 변환(캐스팅)

- 큰 허용 범위를 작은 허용 범위로 쪼개어 저장
- 작은 허용 범위 타입 = (작은 허용 범위 타입) 큰 허용 범위 타입

```jsx
//강제 타입 변환
int var1 = 10; //4byte
byte var2 = (byte) var1; //1byte
//큰 공간에 있는 값을 작은 공간으로 옮긴다
// => 강제로 형변환해야함

System.out.println(var2);
// 강제 타입 변환 후에 10이 그대로 유지

  long var3 = 300;
  int var4 = (int) var3;
  System.out.println(var4);
  // 강제 타입 변환 후에 300이 그대로 유지

  int var5 = 65;
  char var6 = (char) var5;
  System.out.println(var6);
  //'A'가 출력

  double var7 = 3.14;
  int var8 = (int) var7;
  System.out.println(var8);
  //3이 출력
```

## 3. 연산식에서 자동 타입변환

- 정수 타입 변수가 산술 연산식에서 피연산자로 사용되면  
  int 타입보다 작은 <u>byte, short 타입의 변수는</u>  
  <u>int 타입으로 자동 타입 변환</u>되어 연산을 수행함

```jsx
byte a1 = 3;
int b1 = 3;
int c1 = a1 + b1; //a1이 자동으로 큰 타입 int로 변환됨
---------------------------------------------------------
byte x = 10;
byte y = 20;
~~byte result = x + y;~~ //컴파일 에러
int result = x + y;
----------------------------------------------------------
int a = 10;
double b = 3.3;
~~int r = a + b;~~ // 에러
int r = a + (int)b;
System.out.println(r);
----------------------------------------------------------
int eng = 100;
int kor = 95;

double avg = (eng+kor)/2;
//원래는 97.5여야 하는데 int로 나뉜값(97)이 자동으로 double이 되며 97.0이 됨
System.out.println("평균: "+avg); //평균: 97.0

double avg = (eng+kor)/2.0;
//허용범위가 큰 2.0으로 나눌 경우 강제 형태 변환이 되어 제대로 계산됨
System.out.println("평균: "+avg); //평균: 97.5
-----------------------------------------------------------
byte b=127;
byte c=100;

System.out.println(b+c); // 227

System.out.println(10/4); //2
System.out.println(10.0/4); //2.5
System.out.println((byte)(b+c)); //-29, byte형으로 강제타입변환
System.out.println((int)2.8+1.8); //3.8
System.out.println((int)(2.8+1.8)); //4
```

## 4. 변수 사용 범위

- main() 메소드 블록에는 다른 중괄호 {}블록 사용 가능
- 조건문(if), 반복문(for, while) 사용시 중괄호{}안에서만 변수 사용 가능

## 5. 콘솔로 변수값 출력

```java
 System. out . println(리터럴 또는 변수);
```

- `ln` :시스템으로 출력하는데 괄호 안의 내용을 출력하고 행을 바꿈

> **printf**

```java
printf(”형식문자열”, 값1 , 값2 (형식문자열에 제공될 값)…)
```

- 형식문자열에선 `%`와 `conversion(변환 문자)` 필수 작성
- 변환문자 종류: `d`(정수), `f`(실수), `s`(문자열)
  ```jsx
  System.out.printf("이름: %s", "김자바");  → 이름: 김자바
  System.out.printf("나이: %d", 25);        → 나이: 25
  ```
- 포함될 값이 2개 이상인 경우 순번(argument_index$)을 포함시켜야 함

```
1$=첫번째 값, 2$= 두번째 값
```

```java
System.out.printf("이름: %1$s, 나이: %2$d", "김자바", 25);
→ 이름: 김자바, 나이 25

```

| 형식화된 | 문자열  | 설명                                              | 출력상태           |
| -------- | ------- | ------------------------------------------------- | ------------------ |
| %d       | 123     | 정수                                              |
| %6d      | 123     | 6자리 정수 (오른쪽 정렬, 왼쪽 공백)               | \_ \_ \_ 123       |
| %-6d     | 123     | 6자리 정수 (왼쪽 정렬, 오른쪽 공백)               | 123\_ \_ \_        |
| %06d     |         | 왼쪽 빈자리 공백 6자리 정수                       | 000123             |
| %10.2f   | 123.456 | 소수점 이하 2자리, 전체 10자리, 오른쪽 정렬       | 123.46             |
| %-10.2f  | 123.456 | 소수점 이하 2자리, 전체 10자리, 왼쪽 정렬         | 123.46             |
| %010.2f  | 123.456 | 소수점 이하 2자리, 전체 10자리, 왼쪽 빈자리 0채움 | 0000123.46         |
|          |         | 오른쪽 빈자리 공백                                | 123.46 \_ \_ \_ \_ |
|          |         | 왼쪽 빈자리 0채움                                 | 0000123.46         |
| %s       | abc     | 문자열                                            | abc                |
| %6s      |         | 6자리 문자열, 왼쪽 빈자리 공백                    | \_ \_ \_ abc       |
| %-6s     |         | 6자리 문자열, 오른쪽 빈자리 공백                  | abc \_ \_ \_       |
| \t       |         | 탭(tab)                                           | → (들여쓰기)       |
| \n       |         | 줄바꿈                                            | (줄바꿈)           |
| %%       |         | 문자열                                            | %                  |

```jsx
int age=30;
double ki=177.7;
String name="jack";
char grade='A';

System.out.printf("%d %f %s %c", age, ki, name, grade);
//30 177.700000 jack A
```

### 5.6 키보드 입력 데이터를 변수에 저장

- 키보드로부터 입력된 데이터를 읽고 변수에 저장하는 가장 쉬운 방법

  ```java
  import java.util.Scanner;  //선언 필요

  Scanner scanner = new Scanner(System.in);
  //class   객체   연산자 class         필수입력string(매게변수)
  int i = sc.nextInt();
  ```

### 5.7 자동 타입 변환

```java
  byte result1 = 10+20;                  //컴파일 단계에서 연산
  System.out.println("result1: "+result1);

  byte v1 = 10;
  byte v2 = 20;
  int result2 = v1 + v2;                 //int 타입으로 변환 후 연산
  System.out.println("result2: "+result2);

  byte v3 = 10;
  int v4 = 100;
  long v5 = 1000L;
  long result3 = v3 + v4 + v5;          //long 타입으로 변환 후 연산
  System.out.println("result3: "+result3);

  char v6 = 'A';
  char v7 = 1;
  int result4 = v6 + v7;
  System.out.println("result4: "+result4); //int 타입으로 변환 후 연산
  System.out.println("result4: "+(char)result4);

  int v8 = 10;
  int result5 = v8 / 4;
  System.out.println("result5: "+result5); //정수 연산의 결과는 정수

  int v9 = 10;
  double result6 = v9 / 4.0;
  System.out.println("result6: "+result6); //double 타입으로 변환 후 연산

  int v10 = 1;
  int v11 = 2;
  double result7 = (double) v10 / v11;
  System.out.println("result7: "+result7); //double 타입으로 변환 후 연산
```

- 예재
- [https://docs.oracle.com/javase/8/docs/api/](https://docs.oracle.com/javase/8/docs/api/) 자바 api로 사용가능한 매소드 확인

```java
package test;

import java.util.Scanner;

public class Test04 {

	public static void main(String[] args) {

  System.out.println("이름과 점수를 입력해주세요");

  Scanner sc = new Scanner(System.in);
  //입력을 받기 위해서 반드시 Scanner객체를 생성해야함
  //import java.util.Scanner; 해줘야함

  System.out.println("이름: ");
  String name=sc.next();
  //이름을 입력하여 변수 name에 대입한다

  System.out.println("점수: ");
  int com=sc.nextInt();

  System.out.println(name+" " +com);

	}
}
```

```bash
이름과 점수를 입력해주세요
이름:
홍길동
점수:
80
홍길동 80
```

```jsx
System.out.println("이름과 점수를 입력해주세요");

Scanner sc = new Scanner(System.in);
//입력을 받기 위해서 반드시 Scanner객체를 생성해야함
//import java.util.Scanner; 해줘야함

System.out.println("두 점수입력");
int a=sc.nextInt();
int b=sc.nextInt();

System.out.println("평균: "+(a+b)/2.0);
```

```bash
이름과 점수를 입력해주세요
두 점수입력
2
3
평균: 2.5
```

```jsx
System.out.println("이름과 점수를 입력해주세요");

Scanner sc = new Scanner(System.in);
//입력을 받기 위해서 반드시 Scanner객체를 생성해야함
//import java.util.Scanner; 해줘야함

System.out.println("학점(A.B.C.F) 입력");
char grade=sc.next().charAt(0);// 하나의 문자열 입력
System.out.println(grade);
```

```bash
이름과 점수를 입력해주세요
학점(A.B.C.F) 입력
A
A
```
