---
layout: single
title: "Java의 참조타입(배열)"
categories: Java
tag: [Java]
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

# 참조타입

- <u>객체(object)의 주소를 참조</u>하는 타입
- 기본 타입과 참조 타입으로 분류됨

  | 타입     | 특징(저장값 차이 존재)         | 종류                                  |
  | -------- | ------------------------------ | ------------------------------------- |
  | 기본타입 | 값 저장                        | 정수 5개, 실수 2개, 논리 1개          |
  | 참조타입 | 객체가 생성된 메모리 번지 저장 | 배열, 열거, 클래스, 인터페이스 총 4개 |

- 생성된 객체는 `힙(Heap)` 영역에 저장됨
- `null`로 초기화 가능
- 참조타입의 **==, !=**는 실제 값이 아닌 <u>메모리 주소값을 비교</u>

  ```java
    String name1 = "홍길동"
    String name2 = new String("홍길동")
  ```

  ```
  📌 참조가 같지 않음
  name1 != name2
  ```

- 객체 상관 없이 내부 문자열만 비교할 경우 **equals** 사용

  ```java
  String name3 = new String("홍길동")
  String name4 = new String("홍길동")
  ```

  ```
  📌 문자열이 같음
  name3.equals("name4")
  ```

---

### 1. 배열

- 많은 양의 값을 다루는데 효율적이다

  <img src="https://velog.velcdn.com/images/kimsu10/post/cbb2a3cc-7d4c-4b75-bebc-e3b6752dd458/image.png" width="400">

- 연속된 공간에 값 나열
- 각 값에 인덱스 부여

---

```
  타입[] 변수;
  or
  타입 변수[];
```

**선언 방법**

```java
  1. int[] arr ={4,5,6};
  2. int[] arr;
    arr = new int[]{4.5.6};
  3. int arr = new int[]{4,5,6};
```

- 타입=기본타입(8가지)
  - 대괄호가 중간에 오는 걸 기본으로 씀
- 보통 반복문(for)과 함께 사용

  ```java
  int []arr = {3,4,2,3,4};  //배열선언(int [])과 초기화(arr = {})

  System.out.println(arr[0]); // 3, 인덱스는 0부터 시작
  System.out.println(arr[1]); // 4
  System.out.println(arr[2]); // 2
  ---------------------------------------
  int []arr = {55,44,57,89,22};  //배열선언(int [])과 초기화(arr = {})

  for(int i=0;i<arr.length;i++) {  //.length 배열의 길이. 5미만으로 0부터 시작
  	System.out.println(arr[i]);
  }
  // 55,44,57,89,22 5개 값 모두 출력
  ```

---

- 예제

  ```java
  //배열 변수 선언과 배열 생성
  String[] season = {"spring","summer","fall","winter"};

  //배열의 항목값 읽기
  System.out.println(season[0]);  //spring
  System.out.println(season[1]);  //summer
  System.out.println(season[2]);  //fall
  System.out.println(season[3]);  //winter

  //인덱스 1번 항목값 변경
  season[1] = "여름";
  System.out.println(season[1]);  //여름으로 변경됨

  //배열 변수 선언과 배경 생성
  int[] scores = {83, 90, 87};

  //총합과 평균 구하기
  int sum = 0;
  for(int i=0;i<3;i++) {    // i<3은 i<scores.length로 변경 가능
  	sum += scores[i];
  }
  System.out.println(sum);  // 260

  double avg = (double) sum/3;
  System.out.println(avg);  // 86.66666
  ```

---

### 2. new 연산자로 배열 생성

- 값의 목록은 없지만 향후 값들을 저장할 목적으로 <u>미리 배열 생성 가능</u>

  ```
  타입[ ] 변수 = new 타입 [길이(데이터 개수)];
  ```

  ```java
  //1. 정수 5개를 저장할 배열
  int a[] = new int[5];

  //2. 실수 10개 저장할 배열
  double[] b = new double[10]; // [] 위치 상관 없음

  //3. 배열요소 수가 3개인 int 배열
  int c[] = new int[3];

  //4. 인덱스의 최대값이 4인 char혈 배열(0~4)
  char d[] = new char[5];
  ```

- **데이터 타입**

  - `초기값`

    - 0 또는 false.
    - 참조타입인 경우 null

    <img src="https://velog.velcdn.com/images/kimsu10/post/62afc4b3-484c-4d22-895b-333265304268/image.png" width="400">

- **데이터 입력 받아 저장하기**

  ```java
  Scanner s=new Scanner(System.in);

  System.out.println("실수 5개 입력");

  double arr[] = new double[5];  //8byte * 5 = 40byte 가능

  for(int i=0;i<arr.length;i++) { //배열은 0부터 시작하므로 i=0으로 시작
  	arr[i] = s.nextDouble();
  	System.out.println(arr[i]);
  }
  ```

- 예

  ```java
  //5개의 정수를 입력할 배열을 생성하여 총합을 출력

    Scanner s = new Scanner(System.in);

    int[] arr = new int[5];
    int sum = 0;

    for(int i=0; i<arr.length; i++) {
      arr[i]=s.nextInt();
      sum += arr[i];
    }
    System.out.println(sum);
  ```

  ```java
  //최대값 출력(for문 이용)

    int[] array = {1,5,3,8,2};
    int max = 0;   // 최대값 0으로 일단 설정

    for(int i=0;i<array.length;i++) {
      if(max < array[i]) {  //0이랑 첫번째 배열(array[0])과 확인
        max=array[i];       //비교해서 최대 값을 max에 저장ㅉ
      }
    }

    System.out.println(max);

  //입력한 값 중에 최대 구하기

  Scanner s = new Scanner(System.in);
    int[] array = new int[5];
    int max = 0;   // 최대값 0으로 일단 설정

    for(int i=0;i<array.length;i++) {
      array[i]=s.nextInt();
      if(max < array[i]) {  //0이랑 첫번째 배열(array[0])과 확인
        max=array[i];     //비교해서 최대 값을 max에 저장
      }
    }

    System.out.println("최대값: "+max);
  ```

  ```java
  // 1 2 3 5 8 13 21 34 55 89 (피보나치 수열. 인접한 수끼리 더하기)

    int arr[] = new int[10];

    arr[0]=1;
    arr[1]=2;

    for(int i=0; i<8; i++) {
      arr[i+2]=arr[i]+arr[i+1];
    }

    for(int i=0; i<arr.length; i++) {
      System.out.println(arr[i]);
    }
  ```

---

### 3. 향상된 for문

- 카운터 변수와 증감식을 사용 X
- 항목의 개수만큼 반복한 후 자동으로 for문을 빠져나옴
- for-each문이라고도 함

  ```java
  for( 2.타입변수 : 1.배열){
          3. 실행문;
  }
  ```

  - 1의 배열을 2. 타입변수에 넣어 3. 실행문 진행 후 다시 1.배열로 돌아감

  ```java
  //for-each문 활용
  String str[] = {"컴퓨터", "자바", "DB"};

  for(String s:str) {     //세미콜론 아니고 콜론을 씀
    System.out.println(s);
  }

  //배열 변수 선언과 배열 생성
  int[] scores = {95,71,84,93,87};
  //배열 항목 전체 합 구하기
  int sum = 0;
  for(int score:scores) {
  sum = sum + score;
  }
  System.out.println("점수총합: "+sum); //430

  //배열 항목 전체 평균 구하기
  double avg = (double) sum/scores.length;
  System.out.println("점수평균: "+avg);   //86.0
  ```

- 예제

  ```java
    Scanner s = new Scanner(System.in);

    System.out.println("정수 10개 입력");
    int arr[] = new int[10];

    for(int i=0; i < arr.length; i++) {
      arr[i] = s.nextInt();
    }
    for(int k=0; k < arr.length; i++) {
      if(arr[k]%7!=0) {
        continue;
      }
      System.out.println(arr[i]);
    }
  ------------for each문 활용-------------------
    Scanner s = new Scanner(System.in);

    System.out.println("정수 10개 입력");
    int arr[] = new int[10];

    for(int i=0; i < arr.length; i++) {
      arr[i] = s.nextInt();
    }
    for(int k:arr) {
      if(k%7==0 & k!=0) {
        System.out.println(k);
      }
    }
  ```

---

### 4. 다차원 배열

**1) 인덱스가 2개 이상 존재**

```java
//다차원 배열
  int [][] a = new int [2][3];
                      // 행 열
  int [][] d = { {1,2,3},{4,5,6}}; //{}안에 인덱스별 입력.
  int [][] e = { {1,2,3},
                {4,5,6}};  ////{}안에 인덱스별 입력. ,기준 줄바꿈 가능

//1차원 배열
  int [] b = new int[5];
  int [] c = {1,2,3,4,5}; // 1차원 배열 초기화
```

**2) 행열**

```java
  int arr[][] = { {1,2,3,4},{5,6,7,8}}; // 2행 4열

  System.out.println(arr[0][0]); //1
  System.out.println(arr[0][1]); //2
  System.out.println(arr[0][2]); //3
  System.out.println(arr[0][3]); //4

  System.out.println(arr[1][0]); //5
  System.out.println(arr[1][1]); //6
  System.out.println(arr[1][2]); //7
  System.out.println(arr[1][3]); //8

-----중첩 for 문을 이용하여 나타내기-------
  int arr[][] = { {1,2,3,4},{5,6,7,8} }; // 2행 4열

  for(int i=0;i<2;i++) {  //행의 범위
    for(int j=0; j<4; j++){
      System.out.println(arr[i][j]);
    }
  }
```

**3) 열이 가변적인 경우**

- 열의 수가 일치하지 않을 때 행,열의 수 구하기 (배열.length)

  ```java
  int arr[][] = { {1,2,3,4},{5,6,7} }; // 행은 2개 고정이지만 열은 x

  System.out.println(arr.length); //행의개수

    for(int i=0;i<2;i++) {  //행의 범위
      for(int j=0; j<arr[i].length; j++){
        System.out.println(arr[i][j]);
      }
    }
  ```

- 예제

  ```java
    //2차원 배열 생성
    int scores[][] = { {80,90,96},{76,88} }; // 행은 2개 고정이지만 열은 x

    //배열의 길이
    System.out.println("1차원 배열 길이(반의 수): "+scores.length); //2
    System.out.println("2차원 배열 길이(학생 수): "+scores[0].length); //76
    System.out.println("2차원 배열 길이(학생 수): "+scores[1].length); //88

    //첫 번째 반의 세번째 학생의 점수 읽기
    System.out.println("scores[0][2]: "+scores[0][2]);  //96

    //두 번째 반의 두번째 학생의 점수 읽기
    System.out.println("scores[1][1]: "+scores[1][1]);  //88

    //첫 번째 반의 평균 점수 구하기
    int class1Sum=0;
    for(int i=0; i<scores[0].length;i++) {
      class1Sum += scores[0][i];
    }
    double class1Avg = (double) class1Sum / scores[0].length;
    System.out.println("첫 번째 반의 평균 점수: "+class1Avg); //86.666

    //전체 학생 평균 점수
    int totalStudent = 0;
    int totalSum = 0;
    for(int i=0; i<scores.length; i++) {        //반의 수만큼 반복
      totalStudent += scores[i].length;       //반의 학생 수만큼 합산
      for(int k=0; k<scores[i].length;k++) {  //해당 반의 학생 수만큼 반복
        totalSum += scores[i][k];           //학생 점수 합산
      }
    }
    double totalAvg = (double) totalSum / totalStudent;
    System.out.println("전체학생의 평균 점수: "+totalAvg);  //86.0
  ```

---

- p199 (문제 8번)

```java
  int[][] array = {
      {95,86},
      {83,92,96},
      {78,83,93,87,88}
  };

  int sum = 0;
  int totalSum = 0;

  for(int i=0; i<array.length; i++) {
    sum += array[i].length;
    for(int k=0; k<array[i].length; k++) {
      totalSum += array[i][k];
    }
  }
  System.out.println(totalSum);
  System.out.println((double)totalSum/sum);
```

---

### 5. new 연산자로 다차원 배열 생성

- **인덱스 생성 및 0(또는 null)으로 초기화**

  ```
  int[ ][ ] scores = new int[2][3];
  ```

- **열 길이가 다를 경우**
  ```java
  int [][] scores = new int [2][]; //열을 비워둠
  scores[0] = new int[3];  //첫 번째 반의 학생 수가 3명
  scores[1] = new int[2];  //두 번째 반의 학생 수가 2명
  ```
- **2차원 배열일 때 행, 열 길이 구하기**

  - `행` : 배열명.length
  - `열` : 배열명[행].length

- 예제

  ```java
    //각 반의 학생 수가 3명으로 동일할 경우 점수 저장을 위한 2차원 배열 생성
    int[][] mathScores = new int[2][3];
    //배열 항목 초기값 출력
    for (int i=0; i<mathScores.length;i++) {           //반의 수만큼 반복
      for (int k=0; k<mathScores[i].length;k++) {    //해당 반의 학생 수만큼 반복
        System.out.println("mathScores["+i+"]["+k+"]");
      }
    }
    System.out.println();

    //배열 항목 값 변경
    mathScores[0][0] = 80;
    mathScores[0][1] = 83;
    mathScores[0][2] = 85;
    mathScores[1][0] = 86;
    mathScores[1][1] = 90;
    mathScores[1][2] = 92;
    //전체 학생의 수학 평균 구하기
    int totalStudent = 0;
    int totalMathSum = 0;
    for(int i=0; i<mathScores.length; i++) {  //반의 수만큼 반복
      totalStudent += mathScores[i].length;  //반의 학생 수 합산
      for(int k=0; k<mathScores[i].length; k++) {  //해당 반의 학생 수만큼 반복
        totalMathSum += mathScores[i][k];        //학생 점수 합산
      }
    }
    double totalMathAvg = (double) totalMathSum / totalStudent;
    System.out.println("전체 학생의 수학 평균 점수: "+totalMathAvg); //86.0

    //각 반의 학생 수가 다를 경우 점수 저장을 위한 2차원 배열 생성
    int[][] englishScores = new int[2][];
    englishScores[0] = new int[2];
    englishScores[1] = new int[3];

    //배열 항목 초기값 출력
    for(int i=0; i<englishScores.length; i++) {  //반의 수만큼 반복
      totalStudent += englishScores[i].length;  //반의 학생 수 합산
      for(int k=0; k<englishScores[i].length; k++) {  //해당 반의 학생 수만큼 반복
        System.out.println("englishScores["+i+"]["+k+"]");
      }
    }
    System.out.println();

    //배열 항목 값 변경
    englishScores[0][0] = 90;
    englishScores[0][1] = 91;
    englishScores[1][0] = 92;
    englishScores[1][1] = 93;
    englishScores[1][2] = 94;
    //전체 학생의 영어 평균 구하기
    totalStudent = 0;   //위에서 변수 선언을 했기 때문에 초기화만 함
    int totalEnglishSum = 0;
    for(int i=0; i<englishScores.length; i++) {  //반의 수만큼 반복
      totalStudent += englishScores[i].length;  //반의 학생 수 합산
      for(int k=0; k<englishScores[i].length; k++) {  //해당 반의 학생 수만큼 반복
        totalEnglishSum += englishScores[i][k];        //학생 점수 합산
      }
    }
    double totalEnglishAvg = (double) totalEnglishSum / totalStudent;
    System.out.println("전체 학생의 수학 평균 점수: "+totalEnglishAvg); //92.0
  ```

- 예제

  ```java
    //하나의 문자 5행 5열 구조
    char arr[][] = new char[5][5];

    //실수형 5행 2열 구조
    double a[][] = new double[5][2];

    //한 행으로 할땐 new int[][] 빼도 됨
    int c[][] = new int[][]{ {1,2,3,},{4,5,6} };
    int d[][] = { {1,2,3,},{4,5,6} };

    for(int i=0; i<2; i++) {
      for(int j=0; j<3; j++) {
        System.out.println(c[i][j]);
      }
    }

    //for each 구문은 1차원 배열만 가능
    int e[] = {4,5,6};
    for(int s:e) {
      System.out.println(s);
    }

    //실수형 2차원 배열 2행 3열을 생성해 실수값을 입력해서 입력한 값을 다 출력
    double arr[][] = new double[2][3];
    Scanner s = new Scanner(System.in);

    for(int i=0; i<arr.length; i++) { //행의 범위 .length = 행의 갯수, 2
      for(int j=0; j<arr[i].length; j++) { //i가 늘어날때마다 열의 갯수 셈
        arr[i][j]=s.nextDouble();  // 입력한 값을 i행 j열에 저장
        System.out.println(arr[i][j]);
      }
    }
  ```

  ```java
  //행열 바꿔 저장
    int arr[][] = { {1,2,3,4},{5,6,7,8}}; //2행 4열

    int arr1[][] = new int [4][2]; //4행 2열

    //arr의 데이터를 arr1에 복사(위치는 다름 > 그림으로 그려서 확인)
    for(int i=0;i<2;i++) {
      for(int j=0; j<4; j++) {
        arr1[j][i] = arr[i][j];  //행열을 바꿔 대입
      }
    }
    for(int i=0;i<arr1.length;i++) {
      for(int j=0;j<arr1[i].length;j++) {
        System.out.print(arr1[i][j]+" ");
      }
      System.out.println();
    }
  ---------------------
    결과
    1 5
    2 6
    3 7
    4 8

  //다차원 배열 출력
    String s[][] = { {"JAVA"},
            {"C","C++"},
            {"html","css","python"}};

    for(int i=0; i<s.length; i++) {
      for(int j=0; j<s[i].length; j++) {
        System.out.println(s[i][j]);
      }
    }
  ```

  ```java
  // 1. 3행 4열의정수형 배열을 생성하여 0~9 범위의정수를 랜덤하게 저장한다.

    저장후 2차원 배열과 합을 출력해라.
    실행결과) 5 4 1 5
    0 5 3 5
    7 8 1 4
    합은 48

    int[][] arr = new int[3][4];

    for (int i = 0; i < arr.length; i++) {
      for (int j = 0; j < arr[i].length; j++) {
        arr[i][j] = (int) (Math.random() * 10);
      }
    }

    int sum = 0;
    for (int i = 0; i < arr.length; i++) {
      for (int j = 0; j < arr[i].length; j++) {
        sum += arr[i][j];
        System.out.print(arr[i][j] + " ");
      }
      System.out.println();
    }
    System.out.println("합은 " + sum);
  ```

  ```java
  // 정답을 판별하는 문제

    Scanner s = new Scanner(System.in);

    String arr[][] = { {"book","책"},{"water","물"},{"note","노트"}};  //3행 2열

    for(int i=0; i<arr.length; i++) {  // i = 0,1,2
      System.out.println(arr[i][0]+"을 한글로");
      String str = s.next();

      if(str.equals(arr[i][1])) {
        System.out.println("정답입니다");
      }
      else {
        System.out.println("틀렸습니다");
      }
    }
  ```

---

### 6. 문자열(String) 메소드

#### 1) split()

- 문자열 `분리` 메소드
- 배열함수 식으로 써야한다
- String a[] **배열로 리턴!**

```java
// .split 메소드 활용
  String str="오늘은 금요일, 공부하고 티비봄!!";

  String a[]=str.split(","); //.split ()기준으로 문자를 구분
  System.out.println(a[0]);  // ,기준으로 나뉘어져 배열에 들어감
  System.out.println(a[1]);  // 공부하고 티비봄!! 이 나뉘어짐

  for(String b:a) { //for(변수:배열명}
    System.out.println(b); //for에 안넣고 출력하면 저장된 스택 번호가 나옴
  }
```

#### 2) substring(n, m)

- `추출` 메서드
- <u>n 이상 m 미만(공백포함)</u>
- 끝 인덱스를 안적으면 n부터 끝까지 출력

  ```java
    String str="오늘은 금요일, 공부하고 티비봄!!";

    String a= str.substring(4, 7);
    //인덱스 4부터 6까지 출력
    System.out.println(a);  //금요일
  ```

#### 3) replace("a", "b")

- 문자열 `대체` 메서드
- a를 b로 대체

  ```java
    String str="오늘은 금요일, 공부하고 티비봄!!";

    String b= str.replace("공부", "study");  // 대체
    System.out.println(b);  // 오늘은 금요일, study하고 티비봄!!
  ```

#### 4) concat("a")

- 문자열 `연결`
- 기존 문자열에 a 문자열 추가

  ```java
    String str="오늘은 금요일, 공부하고 티비봄!!";

    String str1 = str.concat("내일은 토요일"); //문자열 연결
    System.out.println(str1); //오늘은 금요일, 공부하고 티비봄!!내일은 토요일
  ```

#### 5) charAt(n)

- 문자 `추출`
- 문자열에 <u>특정 위치(n, 0부터 시작함)의 한 단어 추출</u>

  ```java
    String str="9506241230123";
    char sex = str.charAt(6);  //1
    switch (sex) {
    case '1':
    case '3':
      System.out.println("남자입니다");
      break;
    case '2':
    case '4':
      System.out.println("여자입니다");
      break;
    }
  ```

#### 6) length

- String 클래스의 메서드로 `문자열 길이`를 반환
- 배열이 아닌 문자열에 쓰이는 메소드 (공백 포함)
- 포함되지 않은 경우 -1을 리턴

```java
  String str="9506241230123";
  int length = str.length();
  if(length==13) {
    System.out.println("주민등록번호 자릿수가 맞습니다");
  }else {
    System.out.println("주민등록번호 자릿수가 틀립니다");
  }
```

#### 7) indexOf("")

- 문자열 내에서 <u>특정 문자나 문자열이 `처음 등장하는 위치(인덱스)`를 반환</u>
- 해당 문자가 어느 위치에서 시작되는지 찾기
- 인덱스는 0부터 시작
- 못 찾으면 -1 반환

```java
  String str="자바 프로그래밍";
  int index = str.indexOf("프로그래밍");
  if(index==-1) {
    //포함되지 않은 경우
  }else {
    //포함된 경우
  }
```

#### 8) contains("")

- 문자열에 <u>존재하는 문자 찾기</u>
- 해당 문자의 존재여부에 따라 true, false로 반환(blooean으로 선언)

  ```java
    String subject = "자바 프로그래밍";

    int location = subject.indexOf("프로그래밍");
    System.out.println(location);            //3출력
    String substring = subject.substring(location);
    System.out.println(substring);           //프로그래밍 출력

    location = subject.indexOf("자바");
    if(location != -1) {
      System.out.println("자바와 관련된 책이군요"); //출력
    } else {
      System.out.println("자바와 관련없는 책이군요");
    }

    boolean result = subject.contains("자바");
    if(result) {
      System.out.println("자바와 관련된 책이군요"); //출력
    } else {
      System.out.println("자바와 관련없는 책이군요");
    }
  ```

---

### 7 배열 복사

- 배열의 길이 늘리기

  ```java
    //길이 3인 배열
    int [] oldarr = {1,2,3};

    //길이 5인 배열
    int [] newarr = new int[5];

    //배열 항목 복사
    for(int i=0; i<oldarr.length; i++) {
      newarr[i] = oldarr[i];
    }

    //배열항목 출력
    for(int i=0; i<newarr.length; i++) {
      System.out.print(newarr[i] + ", ");
    }
    //1, 2, 3, 0, 0,
  ```

- **System의 `arraycopy()` 메소드 사용**

  ```java
    //길이 3인 배열
    String [] oldarr = {"Java","array","copy"};

    //길이 5인 배열
    String [] newarr = new String[5];

    //배열 항목 복사
    System.arraycopy(oldarr, 0, newarr, 0, oldarr.length);

    //배열항목 출력
    for(int i=0; i<newarr.length; i++) {
      System.out.print(newarr[i] + ", ");
    }
    //출력: Java, array, copy, null, null,
  ```

---

### 8. 열거타입

- 요일(월~일), 계절(봄~겨울)과 <u>같이가 한정된 값</u>을 가진다
- 변수가 아닌 <u>상수값</u>
- 알파벳 <u>대문자로 작성</u>
- 열거 타입 변수에 열거 상수 대입 = 열거타입.열거상수

- 예제

  ```java
  import java.util.Calendar;  //java.utill 패키지에 있는 Calendar를 import

  public class Test01 {

    ublic static void main(String[] args) {

      //Week 열거 타입 변수 선언
      Week today = null;      // Week타입 변수 today 선언

      //Calendar 얻기
      Calendar cal = Calendar.getInstance(); //컴퓨터 날짜 및 시간 정보 cal 대입
                                              // Calendar에 넣기
      //오늘의 요일 얻기(1~7)
      int week = cal.get(Calendar.DAY_OF_WEEK); //일(1)~토(6) 숫자를 week변수 대입

      //숫자를 열거 상수로 변환해서 변수에 대입
      switch(week) {
      case 1: today = Week.SUNDAY; break;
      case 2: today = Week.MONDAY; break;
      case 3: today = Week.TUESDAY; break;
      case 4: today = Week.WEDESDAY; break;
      case 5: today = Week.THURSDAY; break;
      case 6: today = Week.FRIDAY; break;
      case 7: today = Week.SATURDAY; break;
      }

      //열거 타입 변수를 사용
      if(today == Week.SUNDAY) {
        System.out.println("일요일에는 교회를 갑니다");
      }else {
        System.out.println("공부를 합니다.");
      }
    }
  }
  ```

---

### 9. 배치

- <u>앞뒤의 수를 비교</u>하여 지정한 수식(크거나 작거나)대로 `순서 교환`

```java
// 1사이클
3 2 1 6 5 → 0번과 1번 비교 (3,2)
2 3 1 6 5 → 0이 1보다 크니까 교환
2 1 3 6 5 → 1번이 2번보다 크니까 교환
2 1 3 6 5 → 2번이 3번보다 작으니까 안움직임
2 1 3 5 6 → 3번이 4번보다 크니까 교환

// 2사이클
1 2 3 5 6 → 교환 완료
```

```java
  int arr[] = {3,2,1,6,5};

  for(int i=0; i<4; i++) {
    int temp;
    for(int j=i+1;j<5;j++) {
      if(arr[i] > arr[j]) {
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp; //두개값 교환
      }
    }
  }
  for(int i=0; i<arr.length;i++) {
    System.out.print(arr[i]+" ");
  }
//출력: 1 2 3 5 6
```

### 10. 기출문제

```java
  Scanner s = new Scanner(System.in);
  int cnt = 0;
  int sum = 0;

  System.out.println("------------");
  System.out.println("1. 학생수 | 2. 점수입력 | 3. 점수리스트 | 4. 분석 | 5. 종료");
  System.out.println("------------");
  System.out.println("선택> 1");
  System.out.print("학생수> ");
  int a = s.nextInt();
  int student[] = new int[a];

  while(true) {
    for(int i=2; i<6; i++) {
      System.out.println("------------");
      System.out.println("1. 학생수 | 2. 점수입력 | 3. 점수리스트 | 4. 분석 | 5. 종료");
      System.out.println("------------");
      System.out.println("선택> "+i);
      switch(i) {
      case 2:
        for(int k=0; k<a; k++){
          System.out.print("scores["+k+"]> ");
          student[k] = s.nextInt();
          sum += student[k];
        } break;
      case 3:
        for(int k=0; k<a; k++) {
          System.out.println("scores["+k+"]: "+student[k]);
        } break;
      case 4:
        int max = 0;
        for(int j=0; j<a; j++) {
          if(max < student[j]) {
            max = student[j];
          }
        }
        System.out.println("최고 점수: "+max);
        System.out.println("평균 점수: "+(double)sum/a);
        break;
      case 5:
        System.out.println("프로그램 종료");
        break;
      }
    }
    break;
		}
```

---

- 다음 main함수를 보고 반환형을 String값으로 주고 출력해라.

  ```
    main(){
      System.out.println(show(‘$’ , 10));
      }

      $$$$$$$$$$ 이렇게 출력
  ```

  ```java
  public class Test02 {

  	static String show(char a, int b) {
  		String str="";
  		for(int i=0;i<b;i++) {
  			str += a; //str = str + a; $= $+$ ....
  		}
  		return str;
  	}
  	public static void main(String[] args) {
  		System.out.println(show('$', 10));
  	}
  }

  ```

---

- "공부는 어렵지만, 재밌네요"라는 문자열을 str에 저장한 후,
  ","를 기준으로 문자열을 구분해보고, 인덱스 6에 있는 한 글자를 출력, "공부는" 출력

  ````java
  public class Test {
  public static void main(String[] args) { // main메소드 선언
  String str = "공부는 어렵지만, 재밌네요.";

          String a[] = str.split(",");

          for(String b : a) {
            System.out.println(b);
          }

          System.out.println(str.charAt(6));
          System.out.println(str.substring(0,3));
        }
      }
      ```

      ```java
      class Member{
      	private String name;
      	private String id;
      	private String  pqssword;
      	int age;

      	Member(String name, String id){
      		this.name=name;
      		this.id=id;
      	}
      }
      public class Test02 {
      	public static void main(String[] args) {
      		Member user1 = new Member("홍길동", "hong");
      	}
      }

      ```
  ````

---

- 다섯명의 학생의 점수를 입력하여 유효점수와 평균 출력하는 프로그램
  유효점수는 최고점과 최저점을 제외한 점수이며 평균은 유효점수로 계산해라.
  (for-if문 중첩, contine사용)

  ````java
  //5명의 학생 점수를 입력하는 경우
  Scanner s = new Scanner(System.in);
  int score[] = new int[5]; //5개의 정수 넣을 수 있는 배열
  int sum = 0;
  double avg;
  int max, min;
  System.out.println("5명 점수 입력");

        for(int i=0; i<score.length; i++) {
          score[i] = s.nextInt();
        }

        max = min = score[0];
        for(int i=1; i<score.length; i++) {
          if(max < score[i]) {
            max = score[i];
          }
          if(min > score[i]) {
            min = score[i];
          }
        } //최고, 최저를 구함

        System.out.println("유효 점수");
        for(int i=0; i<score.length; i++) {
          if(score[i]==max || score[i]==min) {
            continue;  //최고, 최저 제외
          }else {
            sum += score[i];  //else없이해도 값이 나옴
          }
          System.out.print(score[i]+" ");
        }
        System.out.println();
        System.out.println(sum/3.0);

      ----------------------------------------------------------
      //학생수를 임의로 입력할 경우
        Scanner s = new Scanner(System.in);
        System.out.println("학생수: ");
        int n = s.nextInt();
        int scores[] = new int[n];
        System.out.println(n+"명의 학생 점수 입력 : ");
        int sum = 0;

        for(int i=0; i<n; i++) {
          int score = s.nextInt();
          scores[i] = score;
        }

        int max=scores[0], min=scores[0];
        for(int i=1; i<n; i++) {
          if(max < scores[i]) {
            max = scores[i];
          }
          if(min > scores[i]) {
            min = scores[i];
          }
        }

        System.out.print("유효점수: ");
        for(int i=0; i<n; i++) {
          if(scores[i]==max || scores[i]==min) {
            continue;
          }
          sum += scores[i];
          System.out.print(scores[i]+" ");
        }
        System.out.println();
        System.out.print("평균: "+(double)sum/(n-2));
      ```
  ````

---

- 정수 10개를 무작위로 입력하여 오름차순으로정렬시켜서 출력해라.

  ```java
    Scanner s = new Scanner(System.in);
    int arr[] = new int[10];

    for (int i = 0; i < arr.length; i++) {
      arr[i] = s.nextInt();
    }
    for (int i = 0; i < arr.length; i++) {
      for (int j = i+1; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          int n = arr[i];
          arr[i] = arr[j];
          arr[j] = n;
        }
      }
    }
    for (int i = 0; i < arr.length; i++) {
      System.out.print(arr[i] + " ");
    }

  ```

  ***

  - 이러한 모양 출력해라

  ```
       0          i=1행, j=3 공백
      012         i=2행, j=2 공백
     01234        i=3행, j=1 공백
    0123456       i=4행, j=0 공백
  ```

  ```java

    for(int i=0; i<4; i++) {
      for(int j=0; j<3-i; j++) {
        System.out.print(" ");
      }
      int n=0;
      for(int j=0; j<(2*i)+1;j++) {
        System.out.print(n);
        n++;
      }
      System.out.println();
    }
  ```

  ***

- 배열 안에서 제일 높은 점수를 리턴받는 get함수를작성해라.

  ```
  main(){
    int[][] grade = { {55, 60, 65}, {85, 90, 95} };
    int high;
    high= get(grade);
  }

  System.out.println("가장 높은 점수는 " + high+ "점 입니다.") };
  ```

  ```java
  static int get(int [][]a) {
    int max = a[0][0];

    for(int i=0; i<a.length; i++) {
      for(int j=0; j<a[i].length; j++) {
        if(max < a[i][j]) {
          max = a[i][j];
        }
      }
    }
    return max;
  }
  ```

  ***

- 두 개 배열에서 영어단어를 입력받아 한글을 출력하는 프로그램

  "stop"을 입력하면 프로그램을 종료시켜라. (while(true), equals() 사용)

  ```
  실행결과) 영어 단어 입력: book
  책
  영어 단어 입력: stop

  String eng[]={"student","book","future","note"};
  String kor[]={"학생","책","미래","노트"};
  ```

  ```java
    Scanner s = new Scanner(System.in);

    String word;
    String eng[]={"student","book","future","note"};
    String kor[]={"학생","책","미래","노트"};

    while(true){
      System.out.println("영어 단어 입력: ");
      word = s.nextLine();
      for(int i=0; i<eng.length;i++) {
        if(eng[i].equals(word)) {
          System.out.println(kor[i]);
        }
      }
      if(word.equals("stop")) {
        break;
      }
  ```
