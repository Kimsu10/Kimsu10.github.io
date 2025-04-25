---
layout: single
title: "Java의 연산자, 조건문, 반복문"
categories: Java
tag: [Java]
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

## 1.연산자

### 1.1 부호/증감 연산자

- 정수타입 연산 결과는 int 타입

  ```jsx
  int x = -100;
  x= -x;
  System.out.println(x); //100

  byte b = 100;
  int y = -b;
  System.out.println(y); //-100
  ```

  | 연산식   |          | 설명                                               |
  | -------- | -------- | -------------------------------------------------- |
  | ++       | 피연산자 | 피연산자의 값을 1 증가시킴                         |
  | —        | 피연산자 | 피연산자의 값을 1 감소시킴                         |
  | 피연산자 | ++       | 다른 연산을 수행한 수에 피연산자의 값을 1 증가시킴 |
  | 피연산자 | —        | 다른 연산을 수행한 수에 피연산자의 값을 1 감소시킴 |

- 예제

  ```jsx
  int a=5, b;
  b=a++; // 대입 후 1증가. 연산자가 뒤에 왔으니 a에 5 대입 후 1 증가시킴
  System.out.println(b); //5
  System.out.println(a); //6

  b=++a; // 대입 후 1증가. 연산자가 뒤에 왔으니 a에 5 대입 후 1 증가시킴
  System.out.println(b); //7

  int x = 1;
  int y = 1;
  int result1 = ++x + 10; // 순서: x를 1 증가 → 2 + 10
  int result2 = y++ + 10; // 순서:  1 + 10   → y를 1 증가

  ★ 대입 연산 시에 주의해야 함
  ```

### 1.2 산술 연산자

- +: 더하기 , - : 뺄셈, \*: 곱셉, /: 나눗셈, **%: 나머지**
  ```jsx
  byte v1 = 10;
  byte v2 = 4;
  int result1 = v1 % v2; // 10/4
  System.out.println(result1); // 2
  ```

### 1.3. 오버플로우, 언더플로우

- 오버플로우: 타입이 허용하는 최대 값을 벗어나는 것. 최대값을 벗어나면 최소값으로 변함(byte 127 초과 시 -128로 됨)
- 언더플로우: 타입이 허용하는 최소값을 벗어나는 것. 최소값을 벗어나면 최대값이 됨

### 1.4 비교 연산자

| 구분     | 연산식     | 설명                                   |
| -------- | ---------- | -------------------------------------- |
| 동등비교 | ==         | 두 피연산자 값이 같은지 검사           |
|          | !=         | 두 피연산자 값이 다른지 검사           |
| 크기비교 | > 또는 <   | 피연산자1이 큰지(작은지) 검사          |
|          | >= 또는 <= | 피연산자1이 크거나(작거나) 같은지 검사 |

- 예외사항: 0.1f == 0.1은 false! float과 double의 정밀도 차이가 있음.
  → true가 되려면 float으로 강제 타입 변환해야 함 (0.1f == (float) 0.1)
- 문자열 비교 시 ==이 아닌 equals(), !equals() 사용

### 1.5 논리연산자

| 구분               | 연산식        | 설명                                                           |
| ------------------ | ------------- | -------------------------------------------------------------- | ------ | --- | ------------------------------------ |
| AND(논리곱)        | `&&` 또는 `&` | 피연산자 모두가 `true`일 경우만 `true`                         |
| OR(논리합)         | `             |                                                                | `또는` | `   | 피연산자 중 하나만 `true`이면 `true` |
| XOR(배타적 논리합) | `^`           | 피연산자 하나가 `true`, 다른 하나가 `false`인 경우만 `true`    |
| NOT(논리 부정)     | `!`           | 피연산자의 논리 값을 바꿈 (`true` → `false`, `false` → `true`) |

```jsx
System.out.println("a" > "b"); //false. 유니코드 a=65, b=60
System.out.println(4 >= 2); //true
System.out.println(4 == 4); //true
System.out.println(4 != 4); //false
System.out.println(2 > 3 && 3 == 3); // false && true = false
System.out.println(2 > 3 || 3 == 3); // false || true = true
```

### 1.6 비트논리 연산자

- 기호를 하나만 씀(&, |, ^, ~)

### 1.7 비트이동 연산자

| 연산식 | 설명                                   |
| ------ | -------------------------------------- |
| a << b | 정수 a의 각 비트를 b만큼 왼쪽으로 이동 |

오른쪽 빈자리는 0으로 채움
a x 2b와 동일한 결과가 됨 |
| a >> b | 정수 a의 각 비트를 b만큼 오른쪽으로 이동
왼쪽 빈자리는 최상위 부호 비트와 같은 값으로 채움
a / 2b와 동일한 결과가 됨 |
| a >>> b | 정수 a의 각 비트를 b만큼 오른쪽으로 이동
왼쪽 빈자리는 0으로 채움 |

### 1.8 대입 연산자(p102 중요)

```jsx
int result = 0;
result += 10; // result = result + 10;
result -= 5; // result = result -5 = 10 - 5
result *= 3; // result = result * 3 = 5*3 = 15
result /= 5; // result = result / 5 = 15*5 = 3
result %= 3 // 0
```

### 1.9 삼항(조건) 연산자

- ? 앞에 조건식이 참인지 거짓인지 판단하여 값을 출력
- ? 앞이 true인 경우 첫번째 연산식 실행 / false인 경우 :뒤에 연산식 실행

<img src="https://velog.velcdn.com/images/kimsu10/post/2268e36e-d8c2-4f2a-8c11-ffce8ae2aad9/image.png" width="400">

```jsx
int a=3, b=5;
System.out.println((a>b)?(a-b):(a+b)); // 8

int score = 85;
char grade = (score > 90) ? 'A' : ( (score > 80) ? 'B' : 'C' );
System.out.println(score + "점은" + grade + "등급입니다.");
// 85점은 B등급입니다.
```

### 1.10 연산의 방향과 우선순위

<img src="https://velog.velcdn.com/images/kimsu10/post/b25ba975-b890-4ac1-b0d8-b7079da76b5c/image.png" width="400">

## 2. 조건문과 반복문

| 조건문     | 반복문               |
| ---------- | -------------------- |
| if. switch | for, while, do-while |

## 조건문

### 2.1 if문

- if(조건식){ 실행문 } : 조건식이 true면 실행문 실행, false면 if문을 넘어감
- if문 안에 실행문이 하나밖에 없으면 {}를 생략할 수 있음(왠만하면 그냥 다 적어라)

  ```jsx
  int score = 93;

  		if(score>=90) {
  			System.out.println("점수가 90보다 큽니다");
  			System.out.println("등급은 A입니다");
  		}
  		if(score<90)
  			System.out.println("점수가 90보다 작습니다");
  			System.out.println("등급은 B입니다");  // 중괄호가 없으므로 if문에 영향X

  		// 점수가 90보다 큽니다 등급은 A입니다 등급은 B입니다
  ```

- **else**:
  if(조건식){실행문} else {실행문} → 조건식이 false면 else 뒤에 실행문 실행

  ````jsx
  int score = 85;

      		if(score>=90) {
      			System.out.println("점수가 90보다 큽니다");
      			System.out.println("등급은 A입니다");
      		} else {     // 위 조건의 반대. else엔 조건식 넣으면 안됨
      			System.out.println("점수가 90보다 작습니다");
      			System.out.println("등급은 b입니다");
      		}
      // 점수가 90보다 작습니다
      // 등급은 b입니다
      ```

  ````

- **else if**:
  조건이 더 추가되면 사이에 넣으면 됨(조건식 필요), 반드시 else로 끝나지 않아도 됨.
  else if로 끝나도 됨
  앞에 if 또는 else if 문 내용에 종속되므로 위에 조건이 거짓일 때만 사용(종속되지 않으려면 새로운 if문으로 시작하면 됨)

  ```jsx
    int a=10, b=4;

    if(a==10) {  //참이기 때문에 밑부분 조건 확인함
      System.out.println("A");
    } else if(a<b) { //a != 10 && a<b, 앞의 if 내용의 반대가 포함됨
      System.out.println("B");
    } else if(a>b) { //a != 10 && a<b
      System.out.println("C");
    } // 결국 출력값은 A
  ```

- Scanner와 if문 결합 예제

  ```jsx
      Scanner sc = new Scanner(System.in);
      System.out.println("점수 입력해!!");

      int kor = sc.nextInt(); //점수를 입력해 변수 kor에 저장
      char grade; // 문자를 입력하겠다는 변수선언

      if(kor>=90) { //입력한 점수에 대한 조건확인
        grade = 'A';  // 점수가 90보다 크면 grade에 A 문자 입력
      }
      else if(kor>=80) {
        grade='B';
      }
      else if(kor>=70) {
        grade='C';
      }
      else
        grade='F';
      System.out.println("학점"+grade);

    ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ삼항조건으로 변경 시 --------------------

    int score = 75;
    char grade = (score >= 90) ? 'A' : ((score >=80) ? 'B' : ((score >=70) ? 'C' : 'D') );
    System.out.println("점수가"+grade+"입니다.");
    // 점수가C입니다.
  ```

- double과 int 활용 및 if 예제

  ```jsx
    int total = 300;
    double avg = total/3.0;
    System.out.println(avg); // 3으로 나눌 경우 100.0 double로 자동 형변환

    int total1 = 95;
    double avg1 = total1/4.0;  // 4로 나눌 경우 23.0, 4.0으로 나눌 경우 23.75
    System.out.println(avg1);

    if(avg>=90) {
      System.out.println("A");
    }
    else if(80<=avg && avg<90) {  //논리연산자(논리곱), 둘다 만족해야 참
      System.out.println("B");
    } // A출력
  ```

- Math.random(): 반환형 double 타입의 난수를 발생

  ```jsx
    1. 기본
    0.0 <= Math.random() < 1.0

    2. int로 형변환
    0 < = (int)Math.random() < 1

    3. Start 지정
    int num = (int)Math.random() + start(숫자);

    4. 1부터 45 숫자 중 하나 랜덤 추출
    int num = (int)(Math.random()*45) + 1;
    → (0+1) < (int)(Math.random()*45) + 1; < (1*45)+1
  ```

  ```jsx
  //1부터 100까지 난수 발생
    int num = (int)(Math.random()*100) + 1;
    System.out.println(num);

    if(num%5==0) { //5로 나눴을 때 나머지가 0이면
      System.out.println("5의 배수");
    }
    else if(num%10==0) {
      System.out.println("10의 배수");
    }
    else {
      System.out.println("위 조건 다 아님");
    }
  // 랜덤 98, 위 조건 다 아님 출력
  ```

- 중첩: 선행 조건이 true여야 중첩된 if문 작동

  ```jsx
  int a=20, b=10;

  if(a<10) { // 거짓이라 안쪽 if문 확인 안함
    if(b>=0) {
    b=1;
    }
    else {
      b=-1;
    }
  }
  System.out.println(a+" "+b); // 20 10 출력
  ```

  ```jsx
  int age=25, kg=60;
      char size;

    if(age<20) {
      if(kg<50) {
        size='s';
      }
      else if(kg<60) {
        size='M';
      }
      else {
        size='L';
      }
    }
    else { //age>=20이 조건이 됨
      if(kg<60) {
        size='s';
      }
      else if(kg<70) {
        size='M';
      }
      else {
        size='L';
      }
    }

    System.out.println(size);
    //M사이즈
  ```

  ```jsx
  Scanner sc = new Scanner(System.in);
      System.out.println("점수 입력");
      int score=sc.nextInt();

      System.out.println("학년 입력");
      int y = sc.nextInt();

      if(score>=60) {
        if(y!=4) { //4학년이 아니면 합격
          System.out.println("합격");
        }
        else if(score>=70) { //4학년이면서 70점 이상이면 합격
          System.out.println("합격");
        }
        else { //4학년이면서 70점 미만일때 불합격
          System.out.println("블합격");
        }

      }
      else { //60점 미만일때
        System.out.println("불합격");
      }
  ```

### 2.2 switch문

- if문은 true, false밖에 없어서 else if 반복 시 코드가 복잡해짐
- switch문은 변수 값에 따라 실행문 결정
- ->{} 형식으로도 쓸 수 있으나 콜론(:) 형식을 더 많이 씀
  ```jsx
  switch (변수) {
    //변수는 문자(char), 문자열(String), 정수(int).(논리연산자 >,< 등 사용 불가)
    case 값1:
      break; // 반복문 탈출(꼭 써야함)
    case 값2:
    case 값3: // 값2 또는 값3일 경우
      break;
    default: //else와 같음. 위 case가 모두 포함 안될 경우
  }
  ```
- 예제

  ```jsx
    Scanner sc = new Scanner(System.in);
    System.out.println("무슨 요일이죠?");

    String day=sc.next(); //문자열 입력

    switch(day) {
    case"월요일":  // 문자열은 큰 따옴표"" 사용
      System.out.println("월");
      break;
    case"수요일":
      System.out.println("수");
    case"목요일":
      System.out.println("목");
      break;
    } //수요일 다음 break가 없으므로 "수요일"입력 시 수,목 출력
  ---------------------------------------------------------------
  Scanner sc = new Scanner(System.in);
    System.out.println("글자 입력");

    char ch = sc.next().charAt(0); //문자(한글자) 입력

    switch(ch) {
    case'm':  // 문자는 작은 따옴표''사용
      System.out.println("movie");
      break;
    case's':
      System.out.println("sing");
      break;
    default:
      System.out.println("etc");
      break;
    }
  ```

## 반복문

### 2.3 for문

- 1.초기화식, 2.조건시기, 3. 실행문, 4.증감식 1~4단계 반복

  ```jsx
  for(1.초기화식; 2.조건식; 4.증감식){
  								3.실행문;  //조건식이 true인 경우 실행
  }//조건식이 false인 경우(for문 종료)
  -------------------------------------------------------
  for(int i=1; i<=10; i++) { //1. 1부터 2. 10까지, 3. 1씩 증가
    System.out.println(i);
  }
  // 1,2,3,4,5,6,7,8,9,10

  for(int i=1; i<=10; i+=2) { //1. 1부터 2. 10까지, 3. 2씩 증가
  		System.out.println(i);
  } //1,3,5,7,9
  ```

- for과 if 중첩

  ```jsx
  for(int i=1; i<=100; i++) {   //선행조건 1~100
      if(i%5==0 && i%6==0) {  //5의배수이고 6의 배수(30배수)
        System.out.println(i);
      }
    } // 30,60,90
  ---------------------------------------------------------
  for(int i=1; i<=15; i++) {
      System.out.print("*");
    }
  //***************

  for(int i=1; i<=15; i++) {
    System.out.print("*");
    if(i%5==0) {
      System.out.println(); //enter
    }
  }
  //*****
  *****
  *****
  ```

- 연산자 사용

  ```jsx
  int sum = 0 ; // sum을 먼저 선언해줘야하고, 1부터 합을 보려면 0으로 선언

  for(int i=1; i<=100; i++) {
    if(i%2==0) {
    sum+=i; //sum=sum+i
    }
  }
  System.out.println(sum); // 2550 출력
  ```

- Scanner와 함께

  ```jsx
    Scanner sc=new Scanner(System.in);

    System.out.println("몇단?");
    int dan=sc.nextInt();

    for(int i=9; i>=1; i--) { //역순으로 곱함
        System.out.println(dan+"*"+i+"="+dan*i);
    }
    //몇단?
    3
    3*9=27
    3*8=24
    3*7=21
    3*6=18
    3*5=15
    3*4=12
    3*3=9
    3*2=6
    3*1=3
  ```

### 2.3.2 for문 중첩

- 바깥 for문 기준, 바깥 for문 실행 후 중첩된 for문 지정횟수만큼 반복하고 다시 바깥 for문으로 돌아옴

  ```jsx
  *****
  *****
  ***** 만들기

  for(int i=0; i<3; i++) { //3행
    for(int j=0; j<5; j++) { //5행
      System.out.print("*");
    }
    System.out.println();
  }
  ```

  ```jsx
  i=0 j=0  *
  i=0 j=1  *
  i=0 j=2  *
  i=0 j=3  *
  i=0 j=4  *
  \n
  i=1 j=0
  ...
  > System.out.print("*")로 한 행에 별 출력, println();으로 줄바꿈
  ```

- 예제

  ```jsx
  *     i=0 j=0 → 0은 범위를 뜻함
  **    i=1 j=1 (0,1)
  ***   i=2 j=2 (0,1,2)
  ****  i=3 j=3 (0,1,2,3)
  ***** i=4 j=4 (0,1,2,3,4)
        > j=i+1

  for(int i=0; i<5; i++) { //5행
  		for(int j=0; j<i+1; j++) { //가변적인 열
  			System.out.print("*");
  		}
  		System.out.println();
  }

  ▶ 열이 가변적일 때 행을 기준으로 공통수식을 뽑아 조건식에 넣음
  ▶ 행 변수(i)를 이용해 열 변수(j) 값이 나오도록 공통수식을 뽑음
  ```

  ```jsx
  ***** i=0 j=5 (0,1,2,3,4)
  ****  i=1 j=4 (0,1,2,3)
  ***   i=2 j=3 (0,1,2)
  **    i=3 j=2 (0,1)
  *     i=4 j=1

  for(int i=0; i<5; i++) { //5행
  		for(int j=0; j<5-i; j++) { //가변적인 열
  			System.out.print("*");
  		}
  		System.out.println();
  }

      *
     **
    ***
   ****
  *****

  for(int i=0; i<5; i++) { //5행
    for(int j=0; j<4-i; j++) { //가변적인 열
      System.out.print(" "); //공백
    }
    for(int j=0; j<i+1;j++) {
      System.out.print("*");
    }
    System.out.println();
  }

  --------------◀ 모양---------------
  for(int i=0; i<9; i++) {
      if(i<5) {
        for(int j=0;j<4-i;j++) {
          System.out.print(" ");
        }
        for(int j=0;j<i+1;j++) {
          System.out.print("*");
        }

      }
      else {
        for(int j=0;j<i-4;j++) {
          System.out.print(" ");
        }
        for(int j=0;j<9-i;j++) {
          System.out.print("*");
        }
      }
      System.out.println();
    }

  --------------트리모양 숫자---------------

      1      i=0  j=1 (i=행, j=글자수)
     123     i=1  j=3
    12345    i=2  j=5
   1234567   i=3  j=7
  123456789  i=4  j=9
             → j = (2*i) +1

  for(int i=0; i<5; i++) {
  	for(int j=0; j<4-i;j++) {
  		System.out.print(" ");
  	}
  	int n=1; // n=1을 for문 보다 먼저 시작하면 n++ 영향을 계속 받음
  	for(int j=0; j<(2*i)+1;j++) { //처음 시작 i=0)
  		System.out.print(n);
  		n++;
  }
  System.out.println();

  -------------아스키코드 활용 문자 출력---------------------
  System.out.println("한 문자 입력");
  Scanner s = new Scanner(System.in);

  char ch = s.next().charAt(0); //c=아스키코드 99

  int n=(int)ch; // 내가 입력한 문자를 정수로 강제형변환 함

  for(int i=97; i<=n; i++) {   //i범위= 97~99(n값)
  		for(int j=i; j<n; j++) {   //j범위= 97,98
  			char c=(char)j;          //97=a, 98=b
  			System.out.print(c);
  		}
  		System.out.println();
  }
  ```

### 2.4 while문

- 조건식이 true인 경우 계속 반복, false인 경우 반복 중지

  ```jsx
  초기식

  while(1. 조건식){
  			2. 실행문;  //조건식이 true인 경우 실행
  }
  ```

- 예제

  ```jsx
  int sum =0;
  int i = 1; // 초기값

    while(i<=100) {
      sum += i;
      i++;
    }

  		System.out.println("1~"+(i-1)+"합: "+sum);
  // 1~100합: 5050
  -----------------------------------------------
  int i = 1; //초기값

    while(i<=100) {
      if(i%2==0 && i%3==0) { //6의 배수
        System.out.println(i);
        //i++; 이 이곳에 있는 경우 if문이 맞지 않으므로 작동x
      }
      i++; //if문과 상관없이 1씩 증가해라
    }
  ```

- 무한반복

  ```jsx
  Scanner sc = new Scanner(System.in);
  boolean run = true;  // while문의 조건식을 위한 변수 선언
  int speed = 0;

  while(run) {  // true값이기 때문에 "무한반복"

    System.out.println("------------");
    System.out.println("1. 증속 | 2. 감속 | 3. 중지");
    System.out.println("------------");
    System.out.println("선택: ");  // 여기까지 메뉴 생성

    String StrNum = sc.nextLine();

    if(StrNum.equals("1")) {  // String은 ==로 같음 표현X equals 사용
      speed++;
      System.out.println("현재속도 = "+speed);
    } else if(StrNum.equals("2")) {
      speed--;
      System.out.println("현재속도 = "+speed);
    } else if(StrNum.equals("3")) {
      run = false;  // while문의 조건식을 false로 만듬
    }
  }

  	System.out.println("프로그램 종료");
  ----------------------------------------------------------
  Scanner s = new Scanner(System.in);

    while(true) { //무한루프
      //무한루프 멈춤 제어문자 -> break
      System.out.println("이름 입력");
      String name=s.next();

      //문자열 비교는 == 아닌 equals함수
      if(name.equals("지현")) {
        break; //무한루프 종료
      }
    }
  ```

- Scanner 사용

  ```jsx
  int sum=0, n=100;

    Scanner s = new Scanner(System.in);

    while(n!=0) { //0을 입력할 경우 끝
      System.out.println("입력해라");
      n=s.nextInt();
      sum+=n;
    }

    System.out.println(sum); //지금까지 입력한 값 모두 합

    s.close();

  //입력해라
  2
  입력해라
  5
  입력해라
  2
  입력해라
  0
  9
  ```

### 2.5 do-while

- while과 비슷하나, 블록 내부를 먼저 실행(실행문)하고 조건을 나중에 확인
- 최초 1번은 실행되는 차이가 있음
- 마지막 while에 ; 붙여야함

  ```jsx
  do{
  	 1. 실행문;        //최초실행
  } while(2.조건식);   //조건식이 true인 경우 1. 실행문, false인 경우 종료
  ------------------------------------
  int n=1;

  do{
  	System.out.println(n);
  	n++;
  } while(n<0);
  // while의 n<0이 맞지 않아 false지만 최초 1회 실행되어 출력값: 1
  -------------------------------------
  1~20까지 누적 합
  int n=1;
  int sum = 0;

  do {
  	sum += n;  //sum=sum+n;
  	n++;
  }while(n<=20);
  System.out.println(sum);
  ```

- Scanner 활용

  ```jsx
  System.out.println("메세지를 입력해주세요");
  System.out.println("프로그램을 종료하려면 q를 입력하세요");

  Scanner s = new Scanner(System.in);
  String inputString;

  do {
    System.out.println(">");
    inputString = s.nextLine();
  }while(!inputString.equals("q"));

  System.out.println();
  System.out.println("프로그램 종료");
  ---------------------------------------------------
  String str;
  Scanner s = new Scanner(System.in);

  do {
  System.out.println("문자열 입력");
  str = s.next();

    if(str.equals("exit")) {
      System.out.println("프로그램 종료");
    }
    else {
      System.out.println(str);
    }
  }while(!str.equals("exit"));
  ```

### 2.6 break문

- for, while, do-while 종료 시 사용
- if문과 같이 사용되어 for, while 종료(조건문 종료X 반복문을 종료하는 것)

### 2.7 continue문

- 블록내부에서 continue문 실행 시 for 문의 증감식 또는 while, do-while 조건식으로 바로 이동
- 증감식, 조건식에서 제외시키고 싶은 경우 사용
  ```jsx
  for(int i=1; i<=10; i++) {   //1부터 10까지
      if(i%2 != 0) {         // 홀수 제외. 나머지가 0이 아닌 경우
        continue;            // for의 증감식 반복
      }
      System.out.print(i + " ");
    } // 2 4 6 8 10
  ```
- 예제

```jsx
Scanner s = new Scanner(System.in);
System.out.println("점수 5개 입력");
int sum=0;

for(int i=1; i<=5; i++) { //횟수
  int n=s.nextInt();    //5번 입력됨
  if(n<0) { //입력한 값이 음수인 경우
      continue; //제외(올라가서 반복문 다시실행)
  }else {
    sum+=n;
  }
}

System.out.println(sum);
// 1 2 3 4 5 입력 시 10
// -1 2 3 4 5 입력 시 14
```

## **기출문제**

```jsx
4번: while문과 Scanner의 nextLine() 메소드를 이용하여 작성

Scanner sc = new Scanner(System.in);
  boolean run = true;

  while(run) {  // true값이기 때문에 "무한반복"

    System.out.println("------------");
    System.out.println("1. 예금 | 2. 출금 | 3. 잔고 | 4. 종료");
    System.out.println("------------");
    System.out.println("선택: ");
    String a = sc.nextLine();

    if(a.equals("1")) {
      System.out.println("예금액: ");
      int b = sc.nextInt();
    }else if(a.equals("2")) {
      System.out.println("출금액: ");
      int b = sc.nextInt();
    }else if(a.equals("3")) {
      System.out.println("잔고: ");
      int b = sc.nextInt();
    }else if(a.equals("4")) {
      System.out.println("프로그램 종료");
    }break;

  }
```

```jsx
//1. 50+11.8  의 결과를 소수점을 버리고 출력해라.
System.out.printf("%d\n", (int)(50+11.8));

//2. 0~30까지 중에서 5의 배수를 제외하고 출력해라(무한반복문과 break, continue를 다 사용)
int n = -1;

while(true) {
	n++;
	if(n%5 ==0 && n!=0) { //0을 제외안하면 0도 안나와버림
		continue;  //5의 배수일때 n++를 반복하니까 제외됨
	}
	if(n>30) {
		break;
	}
	System.out.println(n);
}
```

```java
  // while 문을 이용하여 정수를 여러 개 입력받고 평균 출력
  //(0이 입력되면 입력이 종료됨)

  Scanner s = new Scanner(System.in);
  int sum = 0;
  int cnt = 0;
  System.out.println("숫자를 입력하세요.평균를 보려면 0을 입력하세요.");

  while(true) {
    int n = s.nextInt();

    if(n==0) {
      break;
    }
    else {
      ++cnt;
      sum+=n;
    }
  }
  System.out.println((double)sum/cnt);
```

```java
// 1~10까지 짝수만 더하기

1. while문

  int i = 0, sum =0;
  while(i<10) {
    i=i+2;
    sum += i;
  }
  System.out.println(sum);

2. while(true), break 사용

  int i = 0, sum =0;
  while(true) {
    if(i>=10) {
      break;
    }
    i=i+2;
    sum += i;
  }
  System.out.println(sum);

3. do-while 사용

  int i = 0, sum =0;
  do{
    i++;
    if(i%2!=0) { // 홀수제외
      continue;
    }
    sum+=i;
  }while(i<10);
  System.out.println(sum);
```

```java
//구구단의 짝수단만 출력하면서 해당되는 단의 범위까지
//(2단은 2*2, 4단은 4*4, 6단은 6*6, 8단은 8*8)출력해라.(break)

  int i = 2;

  while (true) {
    for (int j = 1; j <= i; j++) {
      System.out.println(i + "x" + j + "=" + (i * j));
    }
    System.out.println();
    i += 2;
    if (i == 10){
      break;
    }
  }
----------------------------------------------------------
  for(int i=1; i<=9;i++) {
    for(int j=1;j<=i;j++) {
      if(i%2!=0) { //2의 배수가 아니면 탈출
        break;     //for문 탈출. 중첩일 경우 가장 가까운 for문 탈출
      }
      System.out.printf("%d*%d=%d\n",i,j,i*j);
    }
    System.out.println();
  }
```
