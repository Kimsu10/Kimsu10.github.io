---
layout: single
title: "Java의 예외와 예외 클래스"
categories: Java
tag: [Java]
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

# 예외와 예외 클래스

## 1. 예외 개념

- 자바에서는 에러 이외에 예외(exception)라고 부르는 오류 존재
- 예외가 발생되면 프로그램은 바로 종료된다는 점에서 에러와 동일
- 예외 처리를 통해 계속 실행 상태 유지 가능
  - `일반 예외(Exception)`: 컴파일러가 예외 처리 코드 여부를 검사
  - `실행 예외(Runtime Exception)`: 컴파일러가 예외 처리 코드 여부를 검사하지 않는 예외
- 자바는 예외가 발생하면 예외 클래스로부터 객체 생성
  <img src="https://velog.velcdn.com/images/kimsu10/post/083e7438-7db1-485a-b8f5-9d252ed68233/image.png" width="400">

- 대표적인 예외 코드
  - **RuntimeException**
    - NullPointerException(NPE)
    - ArrayIndexOutOfBoundsException
    - NummberFormatException
  - **Exception**
    - ClassNotFoundException
    - InterruptedException

### 2. 예외 처리 코드

- <u>예외가 발생시 프로그램의 갑작스러운 종료를 막고 정상 실행을 유지할 수 있도록 처리</u>
- `try - catch - finally(필수아님)`
- 예외 발생 여부와 상관없이 <u>finally블록은 항상 실행됨</u>

    <img src="/assets/images/Java/1-1.png" width="400">
    
    ```java
        try {
          int n=10/0; //예외가 날 수도 있는 코드
          System.out.println(n);
        }
        catch(Exception e) { //예외 처리
          System.out.println("0으로 나눌 수 없다");
        }
        finally {
          System.out.println("끝");
        }
    → 0으로 나눌 수 없다. 끝 출력
    ```

- 예외출력 코드

1. `e.getMessage()` : 예외가 발생한 이유 리턴
2. `e.toString()` : 예외의 종류도 리턴
3. `e.printStackTrace()` : 예외가 어디서 발생했는지 추적한 내용까지 출력

### 예외 종류에 따른 처리

- catch 블록이 여러 개라 할지라도 `catch 블록은 단 하나만 실행`됨
- 처리해야 할 예외 클래스들이 상속관계에 있을 때는 하위 클래스 catch블록을 먼저 작성하고 상위 클래스 catch블록은 나중에 작성

  ```java
      String [] array = {"100","1oo"};

      for(int i=0; i<array.length; i++) {
        try {
          int value = Integer.parseInt(array[i]);
          //문자열을 정수로 바꿔라. 1oo은 정수로 못바꿈
          System.out.println(value);
        }
        catch(ArrayIndexOutOfBoundsException e) {
          //해당 문제가 아님
          System.out.println(e.getMessage());
        }
        catch(Exception e) {   //**상위 예외 클래스는 아래쪽에 작성**
          System.out.println("실행문제");
        }
      }
  ----------------------------------
  출력 100, 실행문제
  ```

## 3. 예외 넘기기

- 메소드 내부에서 예외가 발생할 때 `try - catch` 블록으로 예외 처리하는게 기본
- 메소드를 호출한 곳으로 예외 떠넘길 수 있음
  ```
  리턴타입 메소드명(매개변수,...) throws 예외클래스1, 예외클래스2,... {}
  ```
- `throws`는 메소드 선언부 끝에 작성
- throws가 붙어있는 메소드에서 해당 예외를 처리하지 않고 넘기면 <u>이 메소드를 호출하는 곳에서 예외를 받아 처리</u>한다

    <img src="https://velog.velcdn.com/images/kimsu10/post/f1b19a26-a951-4f12-8539-d9a99719ef8b/image.png" width="400">
    
    ```java
    public class Test {
      public static void main(String[] args) {
        try {
          findClass();
        } catch(ClassNotFoundException e) {
          System.out.println("예외 처리: "+e.toString());
        }
      }
      
      public static void findClass() throws ClassNotFoundException{
        Class.forName("jaca.lang.string2");
      }
    }
    --------------------------------------
    출력: 예외 처리: java.lang.ClassNotFoundException: jaca.lang.string2
    ```

- main()메소드에서도 throws 키워드를 사용해서 예외 떠넘기기 가능
- 결국 `JVM이 최종적으로 예외 처리`를 하게됨

  ```java
  class Num extends Exception{
    Num(){
      super("잘못된 값!");// 부모생성자 호출
    }
  }

  public class Test {
    static int in() throws Num{
      Scanner s = new Scanner(System.in);
      int n = s.nextInt();

      if(n < 0) {
        Num num = new Num();
        throw num;
      }
      return n;
    }

    public static void main(String[] args) {

      System.out.println("양수 입력");

      try {
        int n = in();
        System.out.println(n);
      }catch(Exception e) {
        System.out.println(e.getMessage());
      }

    }
  }
  ```

---

## 4. 사용자 정의 예외

- 통상적으로 <u>일반 예외는 Exception의 자식 클래스</u>로 선언
- <u>실행 예외는 RuntimeException의 자식 클래스</u>로 선언

```java
// p.480
public class InsufficientException extends Exception{  //일반예외로 선언
  public InsufficientException(){}
}
public class InsufficientException(String message){   //생성자 2개 선언
  super(message);
}
```

- **예외 발생시키기**

  - 자바에서 제공하는 표준 예외뿐만 아니라
  - 사용자정의 예외를 직접 코드에서 발생시키려면 throw 키워드와 함께 예외 객체를 제공하면 된다  
    <img src="https://velog.velcdn.com/images/kimsu10/post/6e52ae21-7510-4552-9edf-4b29712e0f99/image.png" width="400">

  - throw된 예외는 직접 try-catch블록으로 예외를 처리할 수 있지만,  
    대부분 메소드를 호출한 곳에서 예외를 처리하도록 throws 키워드로 예외를 떠넘긴다

- **throw와 throws 비교**

  - `throw` : 예외를 강제로 발생시킨 후, 상위 블럭이나 catch문으로 예외를 던진다(객체에 사용)
  - `throws` : 예외가 발생하면 상위메서드로 예외를 던진다.(떠넘기기) (박스단위에서 사용)

  ```java
  //throw
  void method{
    try{
    ...
    throw new Exception("예외메시지")'
    ...         ↓            ↓
    } catch(Exception e){    ↓
      String message = e.getMessage();
    }
  }
  ------------------------------------------
  //throws
  void method() throws Exception{
    ...                ↗
    throw new Exception("예외메시지");
    ...
  }
  ```

  ```java
  482
  class Account{
    private long balance;

    public Account() {}

    public long getBalance(){
      return balance;
    }

    public void deposit(int money){
      balance += money;
    }

    public void withdraw(int money) throws InsufficientException{ //호출한 곳으로 예외 떠넘김
      if(balance < money){
        throw new InsufficientException("잔고 부족: "+(money-balance)+"모자람");//예외발생
      }
      balance -= money;
    }
  }

  public class AccountExample {
    public static void main(String[] args) {
      Account account = new Account();
      //예금하기
      account.deposit(10000);
      System.out.println("예금액: "+account.getBalance()); //예금액: 10000 출력

      //출금하기
      try{
        account.withdraw(30000); //예외처리코드와 함께 withdraw() 메소드 호출
      } catch(InsufficientException){ //java.api에는 없음. 사용자정의 예외
        String message = e.getMessage();
        System.out.println(message); //잔고 부족: 20000 모자람 출력
      }
    }
  }
  ```

---

## 기출문제

- **5개 정수를 입력해서 총합을 구하기**  
  정수가 아닌 문자를 입력한 경우 해당 인덱스는 다시 정수를 입력하도록 구현하라

  ```java
      Scanner s = new Scanner(System.in);

      int n[] = new int[5];
      int cnt = 0;
      int sum = 0;

      //5개 정수 입력해서 총합
      while(cnt<5) {
        try {
          System.out.println((cnt+1)+"번째 정수");
          n[cnt]=s.nextInt(); //배열에 [0]부터 입력함 → 정수를 안쓸 경우
          //n[0], n[1], n[2], n[3], n[4]
          sum += n[cnt];
          cnt++;
        }
        catch(InputMismatchException e) {
          System.out.println("다시 입력하세요. 정수가 아닙니다.");
          s.next(); //잘못입력 시 앞 토큰 지워기
          continue;
        }
      }
      System.out.println("총합: "+sum);
  ```

  ***

- 기출문제 7번

  ```java
  class NotExistIdException extends Exception{
    public NotExistIdException() {}
    public NotExistIdException(String message) {
      super(message);
    }
  }

  class WrongPasswordException extends Exception{
    public WrongPasswordException() {}
    public WrongPasswordException(String message) {
      super(message);
    }
  }

  public class Test {
    public static void main(String[] args) {
      try {
        login("white","12345");
      }catch(Exception e) {
        System.out.println(e.getMessage());
      }
      try {
        login("blue","54321");
      }catch(Exception e) {
        System.out.println(e.getMessage());
      }
    }
    static void login(String id, String password) throws NotExistIdException, WrongPasswordException{
      //id가 blue가 아니라면 NotExistIdException을 발생시킴
      if(!id.equals("blue")) {
        throw new NotExistIdException();
      }
      //password가 12345가 아니라면 WrongPasswordException을 발생시킴
      if(!id.equals("12345")) {
        throw new WrongPasswordException();
      }
    }
  }
  ```

  ***

- **클래스 문제1: Rectangl**e  
  필드는 int 형 너비 (width)와 높이 (height)가 있고, 모두private으로 선언하라.  
  생성자는 구현하지 말고 메소드는 클래스에서 필요한 내용을 판단하여 구현하라.

      ```java
      class Rectangle{
        private int width, height;

        public void Rec() {
          Scanner s = new Scanner(System.in);
          System.out.println("가로세로 입력: ");
          width = s.nextInt();
          height = s.nextInt();
          System.out.println(width*height);
        }
      }

      public class Test {
        public static void main(String[] args) {
          Rectangle r = new Rectangle();
          r.Rec();
        }
      }
      //밑에 문제와 연계했어야함
      ```

- **클래스 문제2: Rectangle 클래스를 이용하는 응용프로그램**
  Main 메소드에서 키보드에서 사각형의 너비와 높이 값을 입력받는다  
  키보드 입력 값이 int 가 아닌 경우 예외처리를 하고, 유효한 값이 입력될 때까지 계속 입력 받게 한다  
  키보드 입력 값이 유효한 값인 경우 해당 내용을 갖는 Rectangle 객체를 만들고,  
   화면에 생성한 Rectangle 객체의 면적을 출력하고 프로그램을 종료한다

  ````java
  //정답
  class Rectangle{
  private int width, height;

        void setHeight(int h) {
          height = h;
        }
        void setWidth(int w) {
          width = w;
        }

        public void show() {
          System.out.println(width*height);
        }
      }

      public class Test {
        public static void main(String[] args) {

          Scanner s = new Scanner(System.in);
          int w,h;

          while(true) {
            try {
              System.out.println("너비 입력: ");
              w = s.nextInt();
              System.out.println("높이 입력: ");
              h = s.nextInt();
              break;
            } catch(InputMismatchException e){
              System.out.println("정수로 입력해주세요");
              s.next();
            }
          }
          Rectangle r = new Rectangle();
          r.setHeight(h); //너비값을 필드에 저장해야되기 때문에 → 초기화
          r.setWidth(w);
          r.show();
        }
      }
      ---------------------------------------------------
      //내가 입력
      class Rectangle{
        int width, height;

        public void Rec() {
          System.out.println(width*height);
        }
      }

      public class Test {
        public static void main(String[] args) {

          Rectangle r = new Rectangle();
          Scanner s = new Scanner(System.in);

          while(true) {
            try {
              System.out.println("가로세로 입력: ");
              r.width = s.nextInt();
              r.height = s.nextInt();
              r.Rec();
            } catch(InputMismatchException e){
              System.out.println("정수로 입력해주세요");
              s.next();
              continue;
            }
            if(r.width>0 && r.height >0) {
              break;
            }
          }
        }
      }
      ```

      ---

  ````

- **while과 예외처리문 활용**  
   5~10사이에 정수를 입력해서 그 수까지 있는 홀수를 더한 값 출력

  ```java
  class Calc{
    public int calculate(int n) {
      //1부터 n까지 홀수만 더한 값
      int sum = 0;
      for(int i=1; i<=n; i++) {
        if(i%2 == 0) {
          continue; //짝수 제외(뒤에 코드가 실행 안되니까)
        }
        sum += i;
      }
      return sum;
    }
  }

  public class Test {
    public static void main(String[] args) {

      Scanner s = new Scanner(System.in);
      //Calc 객체 생성
      Calc c = new Calc();
      int n;

      while(true) {
        try {					//try-catch는 wile(true)와 같이 자주 씀
          System.out.println("5~10 정수 입력");
          n = s.nextInt(); //정수 이외 입력 시 바로 catch로 넘어감(if가지도 않음)
          if(n>=5 && n<=10) {
            break;
          } //5~10까지 잘 입력했을 경우
          System.out.println("다시 입력"); //5~10까지 수가 아닐경우
        } catch(InputMismatchException e) {
          System.out.println("다시 입력");
          s.next();
        }
      }
      System.out.println(c.calculate(n));

    }
  }
  ```

- 무한루프 안에 두 정수를 입력 받아 합을 구하고, 실수를 입력하면 “실수는 안된다”라고 출력하고, 다시 두 정수를 입력받는 코드를 작성해라.

  ```
  실행 결과)
  두 정수 입력: 3 3.5
  실수는 안된다
  두 정수 입력: 3 5

  답: 8
  ```

  ```java
  Scanner s = new Scanner(System.in);

  while(true) {
    try {
      System.out.println("두 정수 입력: ");
      int a = s.nextInt();
      int b = s.nextInt();
      System.out.println("답: "+a+b);
      break;
    }catch(InputMismatchException e){
      System.out.println("실수는 안된다. 다시 입력");
      s.next();
    }
  }
  ```

  ***

- **정수를 입력받아 짝수이면 “짝수”, 홀수이면 “홀수” 라고 출력하라**
  정수를 입력하지 않은 경우에는 프로그램을 종료시켜라.(try-catch 사용)

  ````java
  Scanner s = new Scanner(System.in);

      while(true) {
        try {
          System.out.println("정수 입력: ");
          int a = s.nextInt();
          if(a%2==0) {
            System.out.println("짝수");
          }else {
            System.out.println("홀수");
          }
        }catch(InputMismatchException e){
          System.out.println("정수가 아닙니다. 프로그램 종료");
          break;
        }
      }
      ```
  ````
