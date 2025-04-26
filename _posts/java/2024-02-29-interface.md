---
layout: single
title: "⭐ Java의 인터페이스"
categories: Java
tag: [Java]
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

# ⭐ 인터페이스

### 클래스, 인터페이스 비교

- `class` : 필드, 생성자, 메소드
- `interface` : 필드 , 메소드 \*객체 생성 불가능
  - **상수값**: public, static, final 생략 되어 있음
  - **메소드**: public, abstract
  - 추상 메소드가 아닐 경우는 앞에 static, private, default를 적게 되면 메소드 구현 가능.{ }

---

## 1. 인터페이스 기본

상속으로 다형성 구현 가능 but 인터페이스를 이용해서 **다형성을 구현**하는 경우가 더 많음

### 1. 인터페이스 선언

- class 키워드 대신 `interface 키워드 사용`
- 접근제한자: `default, public 붙일 수 있음`
- 추상 클래스와 같이 `선언만 가능`
- 파일 만들 때 패키지 > interface 선택해서 만듦
- `default가 없으면 추상 클래스`

```java
public interface RemoteControl {
  public void turnOn();  //추상메소드로 인식 → abstract 안붙여도
  //앞에 default를 붙이면 추상 메소드가 아님 → 함수구현 가능
}
```

### 2. 구현 클래스 선언

- `인터페이스를 상속`받으려면 `implements` 사용

  ```java
  public interface RemoteControl {
    public void turnOn();  //추상메소드로 인식되어 함수구현 불가능
  }

  class Television **implements** RemoteControl{ //인터페이스를 상속받는 class
    @Override
    public void turnOn() {  //오버라이드로 함수 구현
      System.out.println("TV를 켭니다");
    }
  }
  ------------------------------------------------------------
  public class Test {
    public static void main(String[] args)  {
      RemoteControl rc;
      rc = new Television(); //RemoteControl rc = new Television(); 동일
      rc.turnOn(); //자식클래스에 오버라이딩 된 turnOn함수 실행
    }
  }
  ```

### 3. 상수 필드

- 인터페이스에 선언된 필드는 모두 public, static, final 특성을 같음
- public, static, final을 생략하더라도 자동적으로 컴파일 과정에서 붙게 됨

  ```java
  public interface RemoteControl{
    //[public static final] 타입 상수명 = 값;
    int ***MAX_VOLUME*** = 10; //public static final이 생략된 상태
    int ***MIN_VOLUME*** = 0;
  }
  ```

- 예제

  ```java
  interface Addin{
    public int add(int a, int b); //abstract 생략됨
    public int add(int a); //메소드 오버로드. 매개변수의 수가 다음
    default void pr() {  //default 키워드를 붙였으므로 추상X 기능구현 가능
      System.out.println("히히");
    }
  }

  class Add implements Addin{

    public int add(int a, int b) {
      return a+b;
    }
    public int add(int a) {
      int sum = 0;
      for(int i=0; i<a;i++) {
        sum += i;
      }
      return sum;
    }
  }

  public class Test {
    public static void main(String[] args) {
  //		Addin a = new Addin(); 인터페이스로부터 객체생성 불가능
      Add a = new Add();
      System.out.println(a.add(1, 4));
      System.out.println(a.add(10)); //1부터 10까지 합

    }
  }
  ```

---

## 2. 메소드 (4종류)

### 1. 추상 메소드(public abstract)

- 추상 메소드는 리턴 타입, 메소드명, 매개변수만 적고 중괄호`{}가 붙지 않음`
- public abstract를 생략하더라도 컴파일 과정에서 자동으로 붙음

### 2. 디폴트 메소드 (default)

- 인터페이스에서 완전한 실행 코드를 가진 디폴드 메소드 선언 가능
- 추상 메소드는 실행부{}가 없지만 디폴드 메소드는 `{} 있음`

### 3. 정적 메소드 (static)

- 정적 메소드는 `구현 객체가 없어도 인터페이스만으로 호출 가능`
- Static(정적 메소드)는 인터페이스명, 메소드명 으로 바로 호출 가능
- `함수 구현 가능`

```java
public interface RemoteControl{
  //상수 필드
  int ***MAX_VOLUME*** = 10; //public static final이 생략된 상태
  int ***MIN_VOLUME*** = 0;

  //추상 메소드
  void turnOn();
  void turnOff();
  void setVolume(int volume);

  //디폴트 인스턴스 메소드
  default void setMute(boolean mute){
    if(mute){
      System.out.println("무음 처리합니다");
      //추상 메소드 호출하면서 상수 필드 사용
      setVolume(***MIN_VOLUME***);
    }
    else{
        System.out.println("무음 해제합니다");
    }
  }
}

public class RemoteControlExample {
  public static void main(String[] args) {
    //인터페이스 변수 선언
    RemoteControl rc;

    //Television 객체를 생성하고 인터페이스 변수에 대입
    rc = new Television();   //구현객체 대입
    rc.turnOn();
    rc.setVolume(5);

    //디폴트 메소드 호출
    rc.setMute(true);
    rc.setMute(false);
  }
}
```

### 4. 프라이빗 메소드 (private)

- `인터페이스 외부에서 접근할 수 없음`
- private 메소드는 `디폴트 메소드 안에서만 호출 가능`

```java
// p.360 p.361
interface RemoteControl{
  //상수 필드
  int MAX_VOLUME = 10; //public static final이 생략된 상태
  int MIN_VOLUME = 0;

  //추상 메소드
  void turnOn();
  void turnOff();
  void setVolume(int volume);

  //디폴트 인스턴스 메소드
  default void setMute(boolean mute){
    if(mute){
      System.out.println("무음 처리합니다");
      //추상 메소드 호출하면서 상수 필드 사용
      setVolume(MIN_VOLUME);
    }
    else{
        System.out.println("무음 해제합니다");
    }
  }
}

class Television implements RemoteControl{
  private int volume;

  @Override
  public void turnOn() {
    System.out.println("Tv를 켭니다");
  }

  @Override
  public void turnOff() {
    System.out.println("Tv를 끕니다");
  }

  @Override
  public void setVolume(int volume) { //인터페이스 상수 필드를 이용해서 voulme필드의 값 제한
    if(volume > RemoteControl.MAX_VOLUME) {
      this.volume = RemoteControl.MAX_VOLUME;
    }else if(volume < RemoteControl.MIN_VOLUME) {
      this.volume = RemoteControl.MIN_VOLUME;
    }else {
      this.volume = volume;
    }
    System.out.println("현재 TV 볼륨: "+this.volume);
  }
}

public class ServiceExample {
  public static void main(String[] args) {
    //인터페이스 변수 선언과 구현 객체 대입
    Service service = new ServiceImpl();

    //디폴트 메소드 호출
    service.defaultMethod1();
    System.out.println();
    service.defaultMethod2();
    System.out.println();

  }
}
```

---

## 3. 인터페이스 상속

### 1. 다중 인터페이스 구현

- 상속은 다중상속이 안되지만, 구현 객체는 여러 개의 인터페이스를 implements할 수 있음

  ```java
  public class 구현클래스명 implements 인터페이스A, 인터페이스B{
    //모든 추상 메소드 재정의
  }
  ```

### 2. 인터페이스 상속

- 인터페이스도 다른 인터페이스 상속 가능
- 클래스와 달리 다중 상속 허용

  ```java
  public interface 자식인터페이스 extends 부모인터페이스1, 부모인터페이스2{...}
                  //자식이 인터페이스면 extends, 클래스면 implements
  ```

- 예제

  ```java
  interface A{
    public void funcA(); //추상 메소드
  }

  interface B{
    public void funcB(); //추상 메소드
  }

  interface C extends A,B{ //다중 상속
    public void funcC(); //추상 메소드
  }

  class D implements C{ //인터페이스는 개체상속 불가능이라 클래스도 만들어줘야 함
    @Override
    public void funcA() {
      System.out.println("funcA");
    };
    @Override
    public void funcB() {
      System.out.println("funcB");
    };
    @Override
    public void funcC() {
      System.out.println("funcC");
    };
  }

  public class Test {
    public static void main(String[] args) {
      D d1 = new D();
      A a1 = d1; //자식을 부모로 업캐스팅
      a1.funcA(); //"funcA" 문자열 출력

      B b1 = d1; //업캐스팅
      b1.funcB();

      C c1 = d1; //업캐스팅
      c1.funcA();
      c1.funcB();
      c1.funcC();
    }
  }
  ```

---

## 4. 타입 변환

- `자동 타입 변환` : 부모를 자식 객체로 타입 변환
  ```java
            ↓자동타입변환┐
  인터페이스 변수 = 구현객체;
  ```
- `강제 타입 변환` : 자식을 부모 객체로 타입 변환
  ```java
              ↓    강제타입변환     ┐
  구현클래스 변수 = (구현클래스) 인터페이스 변수;
  ```

---

## 5. 다형성

- 상속의 다형성과 마찬가지로 인터페이스 역시 다형성을 구현하기 위해 **재정의**와 **자동 타입 변환** 기능 이용
- 실무에서는 다형성 구현에 상속보단 인터페이스를 더 활용함

- 다중 상속 예시

  - 다중 상속일 때 인터페이스 2개 이상 있을 때 신경써야 함
  - `class A implements A,B` | `interface A extends interface A,B`

  ```java
  class Tv{
    public void on() {
      System.out.println("티비 켬");
    }
  }

  interface Computer{
    public void m();
  }

  class Com{
    public void m() {
      System.out.println("컴");
    }
  }

  //interface Ipad extends Computer(자식이 인터페이스인 경우)
  class Ipad extends Tv implements Computer{
    Com c = new Com(); //객체를 반드시 메인에만 만들 수 있는건 아님

    @Override
    public void m() {
      c.m();  //com에 있는 메소드 오버라이드 "컴" 출력
    }
    public void ip() {
      m();  //"컴"
      on(); //"티비 켬"
    }
  }

  public class Test {
    public static void main(String[] args) {
      Ipad i = new Ipad();
      Tv t = i; //up
      Computer c=i; //up

      i.ip();
    }
  }
  ```

## 매개변수의 다형성

- 매개변수 타입을 인터페이스로 선언하면 메소드 호출 시 다양한 구현 객체 대입 가능

<p align="center">
  <img src="https://velog.velcdn.com/images/kimsu10/post/757efabf-eb2e-48c8-886e-98fd36988edd/image.png" width="400">
</p>

- 예제

  ```java
  public interface Vehicle{
    void run();
  }
  --------------------------------
  public class Driver{
    void driver(Vehicle vehicle){
                //↑ 구현 객체가 대입될 수 있도록 매개변수를 인터페이스 타입으로 선언
      vehicle.run(); //인터페이스 메소드 호출
    }
  }
  --------------------------------
  public class Bus implements Vehicle{
    //추상 메소드 재정의
    @override
    public void run(){
      System.out.println("버스가 달립니다.");
    }
  }
  --------------------------------
  public class Taxi implements Vehicle{
    //추상 메소드 재정의
    @override
    public void run(){
      System.out.println("택시가 달립니다.");
    }
  }
  ----------------------------------
  public class DriverExample {
    public static void main(String[] args) {
      //Driver 객체 생성
      Driver d = new Driver();

      //Vehicle 구현 객체 생성
      Bus b = new Bus();
      Taxi t = new Taxi();

      //매개값으로 구현 객체 대입(다형성: 실행 결과가 다름)
      d.drive(b); //자동 타입 변환 → 오버라이딩 메소드 호출 → 다형성
      d.drive(t);
    }
  }
  ```

  ```java
  interface Food{
    public String name();
  }

  class Pizza implements Food{
    @Override
    public String name() {
      return "피자";
    }
  }
  class Steak implements Food{
    @Override
    public String name() {
      return "스테이크";
    }
  }

  public class Test {

    static void pr(Food f) {
      System.out.println(f.name()); //부모로 업캐스팅되며, 부모쪽 객체 무시, 오버라이딩된 객체 불러옴
    }

    public static void main(String[] args) {
      pr(new Pizza()); //Food f = new Pizza()
      pr(new Steak()); //Food f = new Steak()
    }
  }
  ```

---

## 기출문제

- main()를 보고 인터페이스를 작성해라.  
  (인터페이스명은 Re, 모든 메소들들을 인터페이스안에서 선언하고 show함수는 default로 설정,area는 abstract로 설정)

  ```java
  interface Re{
    default void show() {
      System.out.println("사각형!!");
    }
    int area();
  }

  class Rec implements Re{
    int a, b;
    public Rec(int a, int b) {
      this.a = a;
      this.b = b;
    }
    public int area() {
      return a*b;
    }
  }

  public class Test {
    public static void main(String[] args) {
      Re r =new Rec(10,20);
      r.show(); //"사각형!!" 출력
      System.out.println("면적" + r.area());
    }
  }
  ```

  ***

- interface를 상속받은 Calcu 클래스 작성. Main()에서 a,b에 대해 적절한 값을 설정해라

  ```java
  interface Cal{
    int total(int a, int b); //a부터 b까지의 합 리턴
    int big(int a, int b);  //a,b중 큰 값 리턴
  }

  class Calcu implements Cal{
    @Override
    public int total(int a, int b) {
      int sum = 0;
      for(int i=a; i <= b; i++) {
        sum += i;
      }
      return sum;
    }

    @Override
    public int big(int a, int b) {
      return a>b? a:b;
    }
  }

  public class Test {
    public static void main(String[] args) {
      Calcu c = new Calcu();
      System.out.println(c.total(2, 5));
      System.out.println(c.big(2, 5));
    }
  }
  ```

  ***

- Figure 인터페이스를 만들어 circle_area()에는 원면적, rec_area()에는 사각형 면적 출력

  ```java
  interface Figure{
    void circle_area();
    void rec_area();
  }

  class Circle implements Figure{
    int r;

    public Circle(int r){
      this.r = r;
    }

    public void circle_area() {
      System.out.println(3.14*r*r);
    }
    public void rec_area(){}  //상속받으면 추상 메소드 다 호출해줘야 함
  }

  class Rec implements Figure{
    int a,b;

    public Rec(int a, int b){
      this.a = a;
      this.b = b;
    }

    public void circle_area(){} //상속받으면 추상 메소드 다 호출해줘야 함
    public void rec_area() {
      System.out.println(a*b);
    }
  }

  public class Test {
    public static void main(String[] args) {

      Figure f1 = new Circle(5);
      Figure f2 = new Rec(2,5);
      f1.circle_area();
      f2.rec_area();

    }
  }
  ```

  ***

  - Interface를 상속받은 Calcu클래스를 작성해라. Main()에서 a,b에 대해 적절한 값을 설정해라.
    interface Cal{
    int total(int a, int b); //a부터 b까지의 합 리턴
    int big(int a, int b);} //a,b중 큰 값 리턴

    ```java
    interface Cal{
        int total(int a, int b); //a부터 b까지의 합 리턴
        int big(int a, int b);} //a,b중 큰 값 리턴

    class Calcu implements Cal{
      public int total(int a, int b) {
        return a+b;
      }
      public int big(int a, int b) {
        return a>b ? a:b;
      }
    }

    public class Test {
      public static void main(String[] args) {
        Calcu c = new Calcu();
        System.out.println(c.total(2, 3));
        System.out.println(c.big(2, 3));
      }
    }

    ```
