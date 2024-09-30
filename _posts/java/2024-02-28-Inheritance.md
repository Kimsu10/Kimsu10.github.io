---
layout: single
title: "⭐ Java의 상속"
categories: Java
tag: [Java, OOP]
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

#  ⭐ 상속 

## 1. 개념

- 상속(Inheritance)
  - 부모가 자식에게 물려주는 행위
  - 이미 잘 개발된 클래스 재사용 및 중복 코드 줄여 개발 시간 단축화
  - 자식 클래스에서 부모 클래스 선택
  - `extends일 때는 다중 상속(여러 부모) 허용X`
      
      ```java
      public class A{
        int field1;
        void method1; {...}
      }
      public class B(자식 클래스) **extends** A(부모 클래스){
        int field2;
        void method2; {...}
      
        B b = new B();
        b.field1 = 10;   //A로부터 물려받은 필드와 메소드
        b.method1();
      
        b.field2 = "홍길동";  //B가 추가한 필드와 메소드
        method2();
      }
      ```
      
  - 예제
      
      ```java
      class XY{ //부모 클래스
        int a, b;
        
        void set(int a, int b) {
          this.a = a;
          this.b = b;
        }
        void show() {
          System.out.println(a+", "+b);
        }
      }
      
      class XYZ extends XY{  //부모: XY, 자식: XYZ
        //int a, b;는 부모 클래스에서 선언되어서 안해도 됨
        //부모에는 없지만 자식 클래스에서 필요한 자료 입력
        
        private String name;
        void setName(String a) {
          name = a;	
        }
        void pr() {
          show();
          System.out.println(name);
        
      }
      
      public class PP {
        public static void main(String[] args) {
          XY x = new XY();
          x.set(4,8); //set은 초기화 함수. 셋팅값이라 반환값 필요없음 void
          x.show(); //4,8출력
          
          XYZ y = new XYZ();  //자식객체 가져옴
          y.set(5, 8);  //부모객체에 있던 함수
          y.setName("xyz");
          y.pr();
        }
      }
      ```
        
- **부모 생성자 호출**
    - 부모 생성자의 맨 첫 줄에는 `숨겨져 있는 super()이 호출`됨
        
        ```java
        //자식 생성자 선언
        public 자식클래스(...){
          super(매개값, ...);
        }
        ```
        
    - `super()`는 컴파일 과정에서 자동 추가되는데, 이것은 부모의 기본 생성자를 호출한다
        
        ```java
        public class Phone{
          //필드 선언
          public String model;
          public String color;
        
          //기본 생성자 선언
          public Phone(){
            System.out.println("Phone() 생성자 실행");	
          }
        }
        
        public class SmartPhone extends Phone{  //라이브러리 클래스
          //자식 생성자 선언
          public SmartPhone(String model, String color){  //부모에서 생성된 필드 호출
            super();  //생략 가능(컴파일 시 자동 추가됨, Phone 생성자 호출)
            this.model = model;
            this.color = color;
            System.out.println("SmartPhone(String model, String color) 생성자 실행");	
          }
        }
        
        public class SmartPhoneExample{ //실행클래스
          public static void main(String[] args) {  
            //SmartPhone 객체 생성
            SmartPhone myPhone = new SmartPhone("갤럭시", "은색");
        
            //Phone으로부터 상속 받은 필드 읽기
            System.out.println("모델: "+myPhone.model);	
            System.out.println("색상: "+myPhone.color);	
          }
        }
        ```
        
    - 예제
        
        ```java
        class Person{
          private String name;
          
          Person(String name){
            this.name = name;
          }
          public void name() {  //함수는 기본적으로 private를 안씀
            System.out.println(name);
          }
        }
        
        //부모클래스 = 슈퍼클래스 = 상위클래스
        class Student extends Person{
          private String major;
          private String school;
          
          //자식 클래스 생성자 = 서브 클래스 = 하위 클래스
          Student(String name, String major, String school){
            super(name); //부모 생성자 호출, **반드시 작성해야 함**
            //this.name = name; 부모 클래스에서 생성자로 만들어져 있어서 객체로는X
            this.major = major;  //자식클래스 안에 있는 거니까 초기화
            this.school = school;
          }
          
          void show() {
            name();  //부모에 있는 함수
            System.out.println(major);
            System.out.println(school);
          }
        }
        
        public class Test {
          public static void main(String[] args) {
            Person p = new Person("길동"); //부모클래스 객체 생성
            p.name();  //길동 출력, 
            ~~p.show();~~  //**부모 클래스로부터 자식 클래스에 접근 불가**
            
            Student s = new Student("길동","컴퓨터","컴공");
            s.show(); //길동 컴퓨터 컴공 호출
            s.name(); //부모 객체에 있는거는 가능
            ~~s.name = "철수";~~ //불가능. **name이 private여서** 접근 불가
          }
        }
        
        ```
        
---

## 2 메소드 재정의 (오버라이딩)

- 부모 클래스의 모든 메소드가 자식 클래스에 맞게 설계되지 않았을 경우, 자식 클래스에서 재정의해서 사용해야 함

### 메소드 오버라이딩

- **부모 클래스의 메소드를 기각함(무시함)**
- 자식 클래스에서 재정의해서 부모 메소드는 숨겨지고, 자식 메소드가 우선적으로 사용됨
  1. 부모 메소드의 선언부(리턴타입, 메소드 이름, 매개변수)와 동일해야 함
  2. 접근 제한을 더 강하게 오버라이딩 할 수 없음(public → private 변경 불가)
  3. 새로운 예외를 throws할 수  없음
    
    ```java
    public class Calculator{
      //메소드 선언
      public double areaCircle(double r){
        System.out.println("Calculator객체의 areaCircle() 실행");
        return 3.14159 * r *r;
      }
    }
    
    public class Computer extends Calculator{
      //메소드 오버라이딩
      @override  //컴파일 시 정확이 오버라이딩 되었는지 체크해줌(생략가능)
      public double areaCircle(double r){ //부모 클래스의 메소드와 정확히 동일
        System.out.println("Computer객체의 areaCircle() 실행");
        return Math.PI * r * r;
      }
    }
    
    public class ComputerExample{
      public static void main(String[] args) {
      int r = 10;
    
      Calculator calulator = new Calculator(); //부모 객체 생성
      System.out.println("원 면적: "+Calculator.areaCircle(r)); //부모 메소드 실행
      //원 면적: 314.159 출력
    
      Computer computer = new Computer();  //자식 객체 생성
      System.out.println("원 면적: "+Computer.areaCircle(r)); //오버라이드 된 자식 메소드 실행
      //원 면적: 314,1592653589793 출력
    }
    ```
    


  >  **라이딩:** 상속 vs **로딩:** 생성자가 여러개 있는데 매개변수를 다르게 여러개 쓸 수 있음

- 오버라이딩 예제
    
    ```java
    class AAA{
      void ride() {
        System.out.println("오버라이딩 AAA");
      }
      void load() {
        System.out.println("오버로딩 AAA");
      }
    }
    
    class BBB extends AAA{
      void ride() {  //매개변수가 없는 똑같은 모양이라 오버라이딩
        System.out.println("오버라이딩 BBB");
      }
      void load(int n) { //매개변수가 다름. 이건 오버로딩
        System.out.println("오버로딩 BBB");
      }
    }
    
    public class PP {
      public static void main(String[] args) {
    
        AAA a = new AAA();
        a.ride();   //오버라이딩 AAA
        a.load();   //오버로딩 AAA
        
        BBB b = new BBB();
        b.ride();   //오버라이딩 BBB
        b.load(10); //오버로딩 BBB
        
      }
    }
    ```
    

- 오버로딩 예제
    
    ```java
    class Number {
      static void show(int n) {
        System.out.println(n);
      } // 함수명이 같을때
    
      void show(double n) { // 매개변수 타입, 매개변수 개수가 다르면 상관없음=>오버로딩
        System.out.println(n);
      }
    }
    public class Test {
      public static void main(String[] args) {
    
        Number n = new Number();
        n.show(3.14);
    
        Number.show(20);
    
      }
    }
    ```
    
---

## 3 부모 호출

### 3.1 부모 생성자 호출

- `부모 객체가 먼저 생성된 다음에 자식 객체 생성됨`
- super()로 부모 생성자 호출
- 예제(p334)
    
    ```java
    class Parent{
      public String nation;
      
      public Parent() {
        this("대한민국");  //3. 동일 생성자인 Parent()가 실행되어야 하는데 parent(매개변수)먼저 실행
        System.out.println("Parent() call");  //  ② 두번째 실행됨
      }
    
      public Parent(String nation) {  //4. ① 가장 먼저 실행됨
        this.nation = nation;
        System.out.println("Parent(String nation) call");
      }
    }
    
    class Child extends Parent{
      public String name;
      
      public Child() {       // 2. Child는 부모인 Parent에 속해있어서 Parent 먼저 실행
        this("홍길동");       //  ②까지 생성되고 자식에 동일한 생성자 Child()실행에 앞서 Child(매개변수)실행
        System.out.println("Child() call");  //7. ④ 가장 마지막에 출력
      }
      
      public Child(String name) {  //6. ③ Child() 출력 전 먼저 출력
        this.name = name;
        System.out.println("Child(String name) call");
      }
    }
    
    public class PP {
      public static void main(String[] args) {
        Child child = new Child();		//1. Child 메소드 실행
      }
    }
    -----------------------------------------------
    출력결과
    Parent(String nation) call
    Parent() call
    Child(String name) call
    Child() call
    ```
    

### 3.2 부모 메소드 호출

- 메소드를 재정의하면 부모 메소드의 일부만 변경된다 하더라도 중복된 자식 메소드도 가지고 있어야한다.(다 적어줘야함)
- 공동작업처리기법 사용: 
  super.부모메소드()로 호출 가능. 
  맨 첫줄에 적어줘야 하고 하나만 쓸 수 있음  

    
    ```java
    public class Airplane{
      //메소드 선언
      public void land(){
        System.out.println("착륙");
      }
    
      public void fly(){
        System.out.println("비행");
      }
    
      public void takeOff(){
        System.out.println("이륙");
      }
    }
    
    public class SupersonicAirplane extends Airplane{
      //상수 선언
      public static final int ***NORMAL*** = 1;  //상수로 선언되어 값 변경 불가
      public static final int ***SUPERSONIC*** = 2;
      //상태 필드 선언
      public int flyMode = ***NORMAL***;
    
      //메소드 재정의
      @override
      public void fly(){
        if(flyMode == ***SUPERSONIC***){
          System.out.println("초음속 비행");
        }else{
          super.fly();   //Airplane 객체의 fly()메소드 호출
        }
      }
    }
    
    public class SupersonicAirplaneExample{
      public static void main(String[] args) {
        SupersonicAirplane sa = new SupersonicAirplane();
        sa.takeOff();  //이륙
        sa.fly();      //비행            //↓static이라 객체생성 없이 바로 가져옴
        sa.flyMode = SupersonicAirplane.***SUPERSONIC***;  
        sa.fly();     //초음속비행
        sa.flyMode = SupersonicAirplane.***NORMAL***; 
        sa.fly();     //비행
        sa.land();    //착륙
      }
    }
    ```
    

- 예제
    
    ```java
    class Circle{
      private int r;      //필드(인스턴스 멤버)
      
      public Circle(int r) { //생성자
        this.r = r;
      }
      
      int get() {  //메소드. private로 설정되서 불러올 수 없는 r값을 불러옴
        return r;
      }
    }
    
    class NCircle extends Circle{
      String color;
      
      NCircle(int r, String c){
        super(r);   //부모 생성자를 호출하는 것(r을 호출하는 것 아님)
        color = c;
      }
      
      void show() {
        System.out.println("반지름"+get()+color+"색");
        **//부모클래스에서 r을 private로 설정해서 r으로 불러올 수 없음
        //따라서 r을 얻을 수 있는 get함수를 만들어서 함수로 값을 호출**
      }
    }
    
    public class PP {
      public static void main(String[] args) {
    
        NCircle n = new NCircle(10,"red");
        n.show();  //반지름 10 red색
    
      }
    }
    ```
    

### 4 final

- final 클래스: final키워드를 class 앞에 붙이면 최종적인 클래스이므로 더 이상 상속할 수 없는 클래스가 됨
    
    ```java
    public final class Member{
    }
    
    ~~public class Hello extends Member{~~  //불가능
    ~~}~~
    ```
    
- final 메소드: final키워드가 메소드 앞에 있으면 최종적인 메소드이므로 오버라이딩할 수 없음
    
    ```java
    public class Car{
      public final void stop{
      //필드 선언
      public int speed;
    
      //메소드 선언
      public void speedUp(){
        steed += 1;
      }
      
      //final 메소드
      public final void stop(){
        System.out.println("차를 멈춤");
        speed = 0;
      }
    }
    
    public class SprtsCar extends Car{
      @override
      ~~public final void stop{ //오버라이딩 할 수 없음!
        speed = 10;
      }~~
    }
    -----------------------------------
    public class SportsCar extends Car{
      @override
      public void speedUp(){
        speed += 10;
      }
    
      //오버라이딩 할 수 없음
      public void stop(){
        System.out.println("스포츠카를 멈춤");
        speed = 0;
      }
    }
    ```
    
---
## 5 protected 접근 제한자

- public과 default의 중간 쯤 해당하는 접근 제한
- 같은 패키지에서는 default처럼 접근 가능, 다른 패키지에서는 자식 클래스만 접근 허용
- 다른 패키지에서는 상속을 통해서만 사용 가능, 직접 객체를 생성해서 사용하는 것은 불가능

| 접근 제한자 | 제한 대상 | 제한 범위 |
| --- | --- | --- |
| protected | 필드, 생성자, 메소드 | 같은 패키지, 자식 객체만 가능 |

<img src="https://velog.velcdn.com/images/kimsu10/post/adad64ce-749f-4c34-bfe9-297324f08316/image.png" width="400">

---
## 6 타입변환(업,다운 캐스팅)

- 클래스의 타입 변환은 상속 관계에 있는 클래스 사이에서 발생

### **6.1 자동 타입 변환(업캐스팅)**

- 자식은 부모의 특징과 기능을 상속받기 때문에 부모와 동일하게 취급될 수 있음
    
    ```java
    부모타입 변수 = 자식타입 객체;
        └ ← 자동 타입 변환 ┘
    
    Cat cat = new Cat();
    Animal animal = cat;
    
    → Animal animal = new Cat(); 가능
    ```
    
- 바로 위의 부모가 아니더라도 상속 계층에서 상위 타입이면 자동 타입 변환 가능
    
    <img src="/02. JAVA/00. img/5-2.png" width="400">
    
- **자식 클래스에서 오버라이딩 된 메소드가 있다면 부모 메소드 대신 오버라이딩 된 메소드(자식 클래스)가 호출됨 ~ 다형성과 관련됨**

```java
class A{
}
cass B extends A{
}
cass C extends A{
}
cass D extends B{
}
cass E extends C{
}
public class Test {
  public static void main(String[] args) {
    B b = new B();
    C b = new c();
    D b = new D();
    E b = new E();

    A a1 = b;  //자동 타입 변환(상속 관계에 있음)
    A a2 = c;
    A a3 = d;
    A a4 = e;

    B b1 = d;
    C c1 = e;

    //B b2 = e;  //컴파일 에러(상속관계에 있지 않음)
    //C c2 = d;
  }
}
```

- 예제

```java
class Animal{
  String str;
  Animal(String str){
    this.str = str;
  }
  String ani() {
    return str;
  }
}

class Dog extends Animal{
  String str;
  
  Dog(String a, String b){
    super(a);  //부모의 생성자 this.str = str;의 값을 a에 저장
    str = b;
  }
  
  //오버라이드
  String ani() {
    return super.ani()+" "+str;
          //↑부모에 있는 str 호출
  }
}

public class Test {
  public static void main(String[] args) {
    Animal a1  = new Dog("강아지","푸들"); //업캐스팅
    System.out.println(a1.ani()); //강아지 푸들
  }
}
```

### **6.2 강제 타입 변환(다운캐스팅)**

- 자식 타입은 부모 타입으로 자동 변환되지만, 반대로 부모 타입은 자식 타입으로 자동 변환되지 않음
    
    ```java
            ┌ ← 강제 타입 변환 ┐
    자식타입 변수 = (자식타입) 부모타입 객체;
                  캐스팅 연산자 (클래스명을 적어줘야 함)
    ```
    
- 자식 객체가 부모 타입으로 자동 변환 후 다시 자식 타입으로 변환할 때만 강제 타입 변환을 사용할 수 있음
    
    ```java
    311 312
    
    public class Parent{
      //필드 선언
      public String filed1;
      //메소드 선언
      public void method1{
        System.out.println("Parent-method1()");
      }
      //메소드 선언
      public void method2{
        System.out.println("Parent-method2()");
      }
    }
    
    public class Child extends Parent{
      //필드 선언
      public String filed2;
      //메소드 선언
      public void method3{
        System.out.println("Parent-method3()");
      }
    }
    
    public class ChildExample{
      public static void main(String[] args) {
        //객체 생성 및 자동 타입 변환
        Parent parent = new Child();
    
        //Parent 타입으로 필드와 메소드 사용
        parent.field = "data1";
        parent.method1();  //Parent-method1() 출력
        parent.method2();  //Parent-method2() 출력
        /*
        parent.field2 = "data2";   //불가능 > 부모클래스로 형변환 됐기 때문
        parent.method3();          //불가능
        */
    
        //강제 타입 변환
        Child child = (Child) parent;
        
        //Child 타입으로 필드와 메소드 사용
        parent.field2 = "data2";   //가능  > 자식클래스로 다시 돌아와서
        parent.method3();          //가능
      }	
    }
    ```
    

- 예제
    
    ```java
    class Person{
      String name;
      String id;
      
      Person(String name){
        this.name = name;
      }
    }
    
    class Student extends Person{
      Student(String name){
        super(name); //this.name = name;		
      }
    
    }
    
    public class PP {
      public static void main(String[] args) {
        
        // Student s = new Student("길동"); //자식 객체만 생성시
        Person p = new Student("길동"); //upcasting(자동형변환)
        
        Student s = (Student)p; //downcasting(강제형변환)
        System.out.println(s.name);
      }
    }
    ```
    
    ```java
    class Fruit{
      String a;
      int b;
      
      Fruit(String a, int b){
        this.a = a; this.b = b;
      }
      void show() {
        System.out.println(a+" "+b);
      }
    }
    
    //Apple 클래스 구현하기
    class Apple extends Fruit{
      Apple(String a1, int b1){
        super(a1, b1);  //본인 매개변수 이름이랑 같이 넣어줘야 함
      }									//부모생성자가 호출되면서 a,b에 값이 초기화되어있음
    }
    
    public class PP {
      public static void main(String[] args) {
        Fruit f1 = new Apple("red",10); //자식을 부모쪽으로 형변환
        f1.show(); //red 10 출력
      }
    }
    ```
    
---
## 7 다형성

- 사용 방법은 동일하지만 실행 결과가 다양하게 나오는 성질
- 다형성을 구현하기 위해서는 자동 타입 변환과 메소드 재정의 필요

### 7.1 필드 다형성

- 필드 타입(사용방법)은 동일하지만, 대입되는 객체가 달라져서 실행 경과가 다양하게 나올 수 있음
    
    ```java
    public class Tire{
      //메소드 선언
      public void roll(){
        System.out.println("회전합니다.");
      }
    }
    
    public class HankookTire extends Tire{ //Tire자식객체 생성
      //메소드 재정의(오버라이딩)
      public void roll(){
        System.out.println("한국타이어가 회전합니다.");
      }
    }
    
    public class KumhoTire extends Tire{
      //메소드 재정의(오버라이딩)
      public void roll(){
        System.out.println("금호타이어가 회전합니다.");
      }
    }
    
    public class Car{
      //필드 선언
      public Tire tire;
    
      //메소드 선언
      public void run(){   //자식 객체가 아니므로 오버라이드 아님
        tire.roll();   //Tire필드에 대입된 객체의 roll() 메소드 호출
      }
    }
    
    public class CarExample{
      public static void main(String[] args) {
        //car 객체 생성
        Car myCar = new Car();
    
        //Tire객체 생성
        myCar.tire = new Tire();  //Car 클래스로부터 Tire에 접근
        myCar.run();   //회전합니다.
        
        //HankookTire객체 생성
        myCar.tire = new HankookTire();  //Tire tire = new HankookTire();
        myCar.run();   //한국타이어가 회전합니다.
        
        //KumhoTire객체 생성
        myCar.tire = new KumhoTire();   //Tire tire = new KumhoTire();
        myCar.run();   //금호타이어가 회전합니다.
      }
    }
    ```
    
- Car 클래스에는 Tire 필드가 선언되어 있음
- 먼저 Car 객체 생성 후 타이어를 장착하기 위해 HankookTire, KumhoTire 객체를 Tire 필드에 대입할 수 있음(자동타입변환 되니까)

### 7.2 매개변수 다형성

- 다형성은 필드보다는 메소드를 호출할 때 많이 발생
    
    
    ```java
    public class Vehicle{
      //메소드 선언
      public void run(){
        System.out.println("달립니다");
      }
    }
    ```
    
    ```java
    public class Taxi extends Vehicle{
      //메소드 선언
      public void run(){ //오버라이딩
        System.out.println("택시");
      }
    }
    ```
    
    ```java
    public class Bus extends Vehicle{
      //메소드 선언
      public void run(){ //오버라이딩
        System.out.println("버스");
      }
    }
    ```
    
    ```java
    public class Driver{
      //메소드 선언(클래스 타입의 매개변수를 가짐)
      public void drive(Vehicle vehicle){
        System.out.println();
      }
    }
    ```
    
    ```java
    public class DriverExample {
      public static void main(String[] args) {
        //Driver 객체 생성
        Driver driver = new Driver();
    
        //매개값으로 Bus 객체를 제공하고 driver() 메소드 생성
        Bus bus = new Bus(); //== Vehicle vehicle = new Bus(); 업캐스팅 - 자동형변환
        driver.drive(bus);  //driver.drive(new Bus());와 동일
    
        //매개값으로 Taxi 객체를 제공하고 driver() 메소드 호출
        Taxi taxi = new Taxi();
        driver.drive(taxi);  //driver.drive(new taxi());와 동일
      }
    }
    ```
    

### 7.3 객체 타입 확인(instanceof)

- 매개변수의 다형성에서 실제로 어떤 객체가 매개값으로 제공되었는지 확인
- 꼭 매개변수가 아니더라도 변수가 참조하는 객체의 타입을 확인하고자 할 때, instnceof 연산자 사용
    
    ```java
    public void method(Parent parent){
      if(parent instanceof Child){  //Parent 매개변수가 참조하는 객체가 Child인지 조사
        Child child = (Child) parent; //=Child가 Parent로부터 나온 객체인지 확인
        //Child 변수 사용
      }
    }
    ```
    
- 예제
    
    ```java
    class Fruit{  //부모클래스
      void fruit() {
        System.out.println("과일");
      }
    }
    
    class Apple extends Fruit{  //자식클래스
      void apple() {
        System.out.println("사과");
      }
    }
    
    class PineApple extends Fruit{ //자식클래스
      void pineApple() {
        System.out.println("파인애플");
      }
    }
    
    public class Test {
    
      static void pr(Fruit x) { 
        if(x instanceof PineApple) {
          // f.pineApple(); 불가능. 부모에서 자식으로 접근 불가
          ((PineApple) x).pineApple(); 
          //다운캐스팅할 때 클래스 명칭 적어줘야 함
        }
        else if(x instanceof Apple) {
          // x.pineApple(); 불가능. 부모에서 자식으로 접근 불가
          ((Apple) x).apple(); 
          //다운캐스팅할 때 클래스 명칭 적어줘야 함
        }
        else {
          x.fruit();  //①가장먼저 출력. 위에 2개 if가 false이므로
        }
      }
      
      public static void main(String[] args) {
        
        Fruit f = new Fruit();
        Apple a = new Apple();
        PineApple p = new PineApple();
        
        //객체.pr이면 클래스 안에 함수 작성, 없으니까 Static으로 작성
        pr(f); //Fruit f = new Fruit();로 호출됨/else 결과 출력
        pr(a); //Apple a = new Apple();로 호출됨/else if 결과 출력
        pr(p); //PineApple p = new PineApple(); 호출/ if 결과 출력
          
      }
    }
    --------------------------------------
    출력결과
    과일
    사과
    파인애플
    ```
    
---
## 8 추상클래스(실무에선 인터페이스를 더 자주 씀)

### 8.1 추상클래스

- 객체를 생성할 수 있는 클래스 = 실체 클래스
- 이 클래스들의 공통적인 필드나 메소드를 추출해서 선언 = 추상 클래스 (**부모역할**)
- 추상클래스는 **new 연산자를 사용해서 객체를 직접 생성 X**
- 클래스 선언에 abstract 키워드를 붙여야 함
    

>  public **abstract**  calss 클래스명 {필드,생성자,메소드}


### 8.2 추상 메소드

- 일반 메소드 선언과의 차이점: abstract 키워드가 붙고, 메소드 실행 내용인 중괄호{}가 없음
- 자식 클래스의 공통 메소드라는 것만 정의. 실행 내용을 저장하지 않음
    

  > abstract 리턴타입 메소드명(매개변수, …);

    
- 자식 클래스에서 반드시 재정의(오버라이딩)해서 실행 내용을 채워야 함
    
    ```java
    328 329
    
    public abstract class Animal{
      //메소드 선언
      public void breath(){
        System.out.println("숨을 쉽니다");
      }
      //추상 메소드 선언
      public abstract void sound();
    } 
    
    public class Dog extends Animal{
      @override
      public void sound(){
        System.out.println("멍멍");
      }
    }
    
    public class Cat extends Animal{
      @override 
      public void sound(){
        System.out.println("야옹");
      }
    }
    
    public class AbstractMethodExample {
      public static void main(String[] args) {
        Dog dog = new Dog();
        dog.sound();   //멍멍
    
        Cat cat = new Cat();
        cat.sound();   //야옹
    
        //매개변수의 다형성
        animalSound(new Dog());   //자동 타입변환
        animalSound(new Cat());   //   ↓
      }                           //   ↓
      public static void animalSound(Animal animal){
        animal.sound();  //재정의된 메소드 호출
      }
    }
    ```
    

- 예제
    
    ```java
    abstract class Car{  //추상클래스. new로 객체 생성 불가능
      String name;  //필드
      
      void run() {  //일반적인 메소드
        System.out.println("차가 움직인다");
      }
      abstract void stop(); 
      //추상 메소드(빈 껍데기 함수. 구현할 수 없고 선언만 할 수 있음)
    }
    
    //추상 클래스 안에는 일반적인 메서드, 추상 메서드 둘 다 가능
    //하지만. 추상 메서드는 반드시 추상 클래스 안에 있어야 함!!
    
    class Cars extends Car{ //추상클래스를 상속받아 객체 생성 가능
      @Override
      void stop() {
        System.out.println("차가 멈춘다");
      }
    }
    
    public class Test {
      public static void main(String[] args)  {
        
        Cars c = new Cars(); //객체 생성 → 생성자 호출
        c.run();   //메소드 호출
        c.stop();
        
      }
    }
    ```
    
    ```java
    abstract class Ca{
      abstract int add(int a, int b);
      abstract double avg(int a[]); //선언만 하고
    }
    
    class Cal extends Ca{ //구현은 추상클래스 상속받아서 해야 함
      
      int add(int a, int b) {
        return a+b;		
      }
      
      double avg(int a[]) { //배열 평균
        //for-each문으로  //int a[] = new int[]{1,2,3};
        int sum = 0;
        for(int k:a) { //a배열(1,2,3)이 int k에 들어감
          sum +=k;
        }
        return ((double)sum/a.length);
      }
    }
    
    public class Test {
      public static void main(String[] args)  {
        
        Cal c = new Cal();
        System.out.println(c.add(3,7));
        System.out.println(c.avg(new int[] {1,2,3}));
    
      }
    }
    ```
    
---
## 9 객체 배열

- 객체를 저장할 수 있는 공간(타입: 클래스)
    
    ```java
    class Circle{
      int r;
    
      Circle(int r){
        this.r = r;
      }
      
      double area() {
        return r*r*3.14;
      }
    }
    
    public class Test {
      public static void main(String[] args)  {
        
        Circle [] arr = new Circle[4]; //객체 배열 및 생성
        //Circle c = new Circle();로 객체 생성 안하고 new Circle[]로 생성
        
        //객체 4개를 생성해서 배열위치에 저장
        for(int i=0; i<arr.length;i++) {
          arr[i] = new Circle(i); //객체 4개 생성해서 배열위치에 저장. 
                                  //for문안에 객체를 반드시 생성해야 함
          System.out.println(arr[i].area());
        }
    
      }
    }
    
    -------------------------
    0.0, 3.14, 12.56, 28.26 출력
    ```
    
    ```java
    //인덱스 하나에 2개의 값 저장
    class Song{
      String singer, title;
      
      Song(String singer, String title){
        this.singer = singer;
        this.title = title;
      }	
    }
    
    public class Test {
      public static void main(String[] args)  {
        
        Scanner s = new Scanner(System.in);
        
        Song so[] = new Song[2]; //객체배열 생성
        
        for(int i =0; i<2; i++) {
          System.out.println("가수");
          String singer = s.next();
          System.out.println("제목");
          String title = s.next();
          
          so[i] = new Song(singer, title); //객체를 반드시 생성해야 함
          //하나의 인덱스 안에 값이 두개(singer, title) 들어감
        }
        for(int i=0;i<2;i++) {
          System.out.println(so[i].singer+" "+so[i].title);
        }
    
      }
    }
    ```
    
    ```java
    //추상객체 활용 객체 배열 생성
    abstract class Circle{
      protected double r;  //같은 패키지에서 접근 가능
      
      Circle(double r){
        this.r = r;
      }
      abstract double get();
    }
    
    class Cir extends Circle{
      Cir(double r){
        super(r);
      }
      
      @Override
      double get() {
        return r;
      }	
    }
    
    public class Test {
      public static void main(String[] args)  {
        
        Scanner s = new Scanner(System.in);
        
        //객체 5개 배열 생성. Circle
        Circle c[] = new Circle[5]; //추상클래스라 객체 생성은 불가능
        
        for(int i=0; i<c.length; i++) {
          double r = s.nextDouble();
          c[i] = new Cir(r); //객체 생성
        //Circle c[] = new Cir(r)로 적을수도 있음(upcasting)
    
          System.out.println(c[i].get());
        }
      }
    }
    ```
    
    ```java
    //for-each문을 활용
    class Num{
      int n;
      
      Num(int n){
        this.n = n;
      }
      
      int get() {
        return n;
      }
    }
    
    public class Test {
      public static void main(String[] args)  {
        
        Num[] arr = new Num[] {new Num(1),  //객체 생성코드(값 초기화)
                    new Num(2),
                    new Num(3)};
        //int [] arr ={1,2,3}; 객체배열은 객체가 블어가야 함 
        
        for(Num n:arr) {  //for -each문에서 기존 배열은 오른쪽으로 들어감
          System.out.println(n.get()); //1,2,3 출력
        }		
      }
    }
    ```
    
---
## 기출문제

- 부모 클래스 호출 활용
    
    ```java
    //하나의 클래스에서 가져올 때
    class XYZ {
      int a,b;
      String c;
      
      XYZ(int a, int b, String c){
        this.a = a;
        this.b = b;
        this.c = c;
      }
      
      void setxy(int a1, int b1) {
        a = a1;
        b = b1;
      }
      
      void setcolor(String c1) {
        c = c1;
      }
      void show() {
        System.out.println(a+" "+b+" 색은"+c);
      }
      
    }
    
    public class Test {
      public static void main(String[] args)  {
        
        XYZ xyz= new XYZ(10,10, "red");
        xyz.setxy(20,30);
        xyz.setcolor("blue"); 
        xyz.show();
        
      }
    }
    ------------------------------------------------------
    //부모 클래스에서 상속받아서 가져올 때
    class XY {
      private int x, y;
    
      XY(int x, int y) {
        this.x = x;
        this.y = y;
      }
    
      int getx() {
        return x;
      }
    
      int gety() {
        return y;
      }
    
      protected void move(int x, int y) {
        this.x = x;
        this.y = y;
      }
    }
    
    class XYZ extends XY{
      String z;
      
      XYZ(int x, int y,String z){
        super(x,y);
        this.z = z;
      }
      
      void setxy(int x, int y) {
        super.move(x,y);
      }
      void setcolor(String z) {
        this.z=z;
      }
      void show() {
        System.out.println(getx()+", "+gety()+"인 "+z+"색!");
                        //private여서 x,y값을 그냥 못가져옴! 메소드로 가져옴
      }	
    }
    
    public class Test {
      public static void main(String[] args) {
        XYZ xyz = new XYZ(10, 10, "red");
        xyz.setxy(20, 30);
        xyz.setcolor("blue");
        xyz.show();
      }
    }
    ```
    
    ---
- [객체 배열]부모객체 PhoneNum을 두고 학교/직장의 두 경우 중 선택하여 폰 번호 저장
    
    ```java
    package kr.co.bit;
    
    import java.util.Scanner;
    
    class PhoneNum{  //부모클래스
      String name;
      String phone;
      
      PhoneNum(String n, String p){
        name = n;
        phone = p;
      }
      
      void show() {
        System.out.println("이름: "+name);
        System.out.println("번호: "+phone);
      }	
    }
    
    class School extends PhoneNum{ //자식클래스1
      String major;
      
      School(String n, String p, String major){
        super(n,p);
        this.major = major;
      }
      
      @Override
      void show() {
        super.show();  //System.out.println("이름: "+name);
                      //System.out.println("번호: "+phone);	
        System.out.println("전공: "+major);
      }
    }
    class Worker extends PhoneNum{ //자식클래스2
      String grade;
      
      Worker(String n, String p, String g){
        super(n,p);
        grade = g;
      }
      
      @Override
      void show() {
        super.show();  //System.out.println("이름: "+name);
                      //System.out.println("번호: "+phone);	
        System.out.println("직급: "+grade);
      }
    }
    
    class Arr{  //메인에서 쓰는 클래스
      PhoneNum[] arr; //객체 배열
      int n;
      
      Arr(int n){ //생성자 역할: 초기화 작업
        arr = new PhoneNum[n]; //객체 배열 생성. == PhoneNum[] arr = new PhoneNum[5];
        n=0;
      }
      void add(PhoneNum p) {
        arr[n++] = p;  //친구 추가
      }
      //arr[]에 저장
      void friend(char ch) {
        Scanner s = new Scanner(System.in); //블럭 안에서만 효력. main()에서 다시 선언해야 함
        System.out.println("이름: ");
        String name = s.next();
        System.out.println("번호: ");
        String num = s.next();
        
        switch(ch) {
        case 'A':
          System.out.println("전공: ");
          String major = s.next();
          add(new School(name, num, major)); //arr 배열에 추가
          //== PhoneNum p = new School((name, num, major). 업캐스팅
          break;
        case 'B':
          System.out.println("직급: ");
          String grade = s.next();
          add(new Worker(name, num, grade));
          //== PhoneNum p = new Worker((name, num, major). 업캐스팅
          break;
        }
      }
      void all() {
        for(int i=0;i<n;i++) {
          arr[i].show();
        }
      }
    }
    
    public class Test {
      public static void main(String[] args)  {
        Arr ar = new Arr(5); //객체 배열 5개
        
        while(true) {
          System.out.println("A. 학교 친구");	
          System.out.println("B. 직장 친구");	
          System.out.println("C. 종료");	
          System.out.println("D. 출력");
          System.out.println("문자입력");
          
          Scanner s = new Scanner(System.in);
          char c = s.next().charAt(0); //A~D중 하나 입력
          
          switch(c) {
          case 'A': //문자 A를 입력했으면
            ar.friend(c);
            break;
          case 'B': //문자 B를 입력했으면
            ar.friend(c);
            break;
          case 'C': //문자 C를 입력했으면 while(true)종료
            System.out.println("종료");
            return; //break를 쓰면 switch만 종료됨. return은 함수 자체를 종료함
          case 'D': //문자 D를 입력했으면
            ar.all();
          }
        }
      }
    }
    ```
    
    ---
- 추상클래스
    
    ```
    다음 main()를 보고 추상 클래스와추상메소드 작성해라.
    (total 함수는 배열 값(1,2,3,4,5) 총합 리턴받는 함수)

    main(){
      Ab c=new Cd();
      System.out.println(c.total(new int []{1,2,3,4,5}));
    }

    ```
    
    ```java
    abstract class Ab{
      abstract int total(int[] arr);
    }
    
    class Cd extends Ab{
      public int total(int[] arr) {
        int sum = 0;
        for(int i : arr) {
          sum += i;
        }
        return sum;
      }
    }
    
    public class Test {
      public static void main(String[] args) {
        Ab c=new Cd();
        System.out.println(c.total(new int []{1,2,3,4,5}));
      }
    }
    ```
    
    ---
- [객체배열] main() Prob1: main()에서 인원수를 입력 받아 인원수를 Profile에 대한 객체 배열 개수로 설정한다. 이름과 아이디도 입력 받아 객체 배열에 저장한 후 출력해라.
    
    ```java
    //다음 class를 보고 코드를 작성해라.
    
    class Profile{
      String name,id;
      Profile(String name, String id){
        this.name=name; this.id=id;
      }
      String getname(){ return name;}
      String getid(){ return id;}
    }
    -------------------------------------
    public class Test {
      public static void main(String[] args) {
        
        Scanner s = new Scanner(System.in);
        
        int n = s.nextInt();
        Profile arr [] = new Profile[n];
        
        for(int i=0; i<n; i++) {
          System.out.println("name");
          String name = s.next();
          System.out.println("id");
          String id = s.next();
          
          arr[i] = new Profile(name,id);
        }
        
        for(int i=0; i<n; i++) {
          System.out.println(arr[i].name+" "+arr[i].name);
        }
        
      }
    }
    --------------------------------------------
    //다른방법
        
        Scanner sc = new Scanner(System.in);
    
        int num = sc.nextInt();
    
        Profile[] p = new Profile[num];
        for (int i = 0; i < p.length; i++) {
          System.out.println("이름, 아이디 입력 :");
          p[i] = new Profile(sc.next(), sc.next());
        }
    
        for (Profile a : p) {
          System.out.println("이름: " + a.getname() + "id: " + a.getid());
        }
    
    ```
    
    ---
- 추상클래스, 객체배열과 객체에 저장된 값 호출
    
    ```java
    abstract class Profile{  //추상 클래스
      abstract void add(String name, String id); //추상 메소드
      abstract String check(String id);
    }
    
    class Person{
      String name, id;
      Person(String n, String i){
        name = n; id = i;
      }
      public String getName() {
        return name;
      }
      public String getId() {
        return id;
      }
    }
    
    class Per extends Profile{
      Person [] arr; //객체 배열 선언
      int n;
      
      Per(int n){ //생성자
        arr = new Person[n]; //배열 생성하고 있음
      }
      @override
      void add(String name, String id) {
        arr[n] = new Person(name,id); //객체 생성 코드
        n++;
      }
    @override
      String check(String id) {
        for(int i=0; i<n ; i++) {
          if(id.compareTo(arr[i].getId())==0){ //compareTo:비교. 문자열이 같으면 0 리턴
            return arr[i].getName();
          }
        }
        return null;
      }
    }
    
    public class Test {
      public static void main(String[] args) {
    
        Profile p = new Per(5); //업캐스팅
        p.add("현옥","123"); //aet[0].name arr[0].id
        p.add("예준","456"); //aet[1].name arr[1].id
        p.add("태경","344"); //aet[2].name arr[2].id
        
        System.out.println(p.check("123"));
        System.out.println(p.check("456"));
        System.out.println(p.check("456"));
    
      }
    }
    -------------------------------------------------
    출력: 현욱, 예준, 예준
    ```
    
    ---
- 객체타입 확인 예제
    
    ```java
    class Person{}
    class Student extends Person{}
    class Entertainer extends Person{}
    class Singer extends Entertainer{}
    
    public class Test {
    
      static void pr(Person p) {
        if(p instanceof Person) {
          System.out.println("사람");
        }
        if(p instanceof Student) {
          System.out.println("학생");
        }
        if(p instanceof Entertainer) {
          System.out.println("연예인");
        }
        if(p instanceof Singer) {
          System.out.println("가수");
        }
      }
    public static void main(String[] args) {	
        pr(new Student());         //Person p=new Student();  사람 학생
        pr(new Entertainer());     //Person p=new Entertainer(); 사람 연예인
        pr(new Singer());          //Person p=new Singer(); 사람 연예인 가수 
          // ↑p가 Singer가 됐을때 static 수식처럼 person, student 등과 같은 타입인지 확인
      }
    }
    ```
    
    ---
- 1차원 정수 배열[5]을 생성하여 리턴하는 make()를 작성해라.
    
    ```
    main(){
    
    int arr[];
    arr=make();
    
      for(int i=0;i<arr.length;i++){
    
        System.out.println(arr[i] + “ “); 
    
      }
    }
    
    -------------------------------------------------
    실행결과) 0 1 2 3 4 출력
    ```
    
    
    
    ```java
    public class Test {
      
      static int[] make() {
        int arr[] = new int[5];
        for(int i=0; i<5; i++) {
          arr[i] = i;
        }return arr; //배열명만 적으면 됨!
      }
      
      public static void main(String[] args) {
        
        int arr[];
        arr=make();
        for(int i=0;i<arr.length;i++){
        System.out.println(arr[i] + " ");}
        
      }
    }
    --------------------------------------------------
    다른 답
    static int[] make() {
      int arr[] = new int[] (0,1,2,3,4);
      return arr;
    }
    ```
    
    ---
- Main()을보고코드를작성해라.(c는 1~5까지 합, d는 1~10까지 합)
    
    ```
    int a[]={1,2,3,4,5};
    int b[]={6,7,8,9,10};
    int c=add(a,5);
    int d=add(a,5,b);
    
    System.out.println(c);
    System.out.println(d);
    ```

    
    ```java
    public class Test {
      
      static int add(int arr[],int b) {
        int sum = 0;
        for(int i=0; i<b; i++) {
          sum += arr[i];
        }
        return sum;
      }
      static int add(int arr1[],int b,int arr2[]) {
        int sum1 = 0;
        for(int i=0; i<b; i++) {
          sum += arr1[i] + arr2[i];
        }
        return sum;
      }
      
      public static void main(String[] args) {
        int a[]={1,2,3,4,5};
        int b[]={6,7,8,9,10};
        int c=add(a,5);
        int d=add(a,5,b);
    
        System.out.println(c);
        System.out.println(d);
      }
    }
    ```
    
    ---
- 3개의 Circle 객체 배열을 만들고 x, y, r값을 읽어 3개의 Circle객체를 만들어 show()함수에서 다 출력해라.
    
    ```
    class Circle{
    
    private double x,y;
    private int r;
    
      Circle(double x, double y, int r){
        this.x=x; this.y=y; this.r=r; 
      }
    
      void show(){
        System.out.println(x + “ “ +y + “ “ +r);
      }
    
    }

    --------------------------------------------------
    실행결과)
      x,y,r : 1.0 1.0 4
      x,y,r : 2.5 3.5 6
      x,y,r : 4.2 1.2 4 
    ```

   
    
    ```java
    class Circle {
      private double x, y;
      private int r;
    
      Circle(double x, double y, int r) {
        this.x = x;
        this.y = y;
        this.r = r;
      }
    
      void show() {
        System.out.println(x + " " + y + " " + r);
      }
    }
    
    public class Test {
      public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        Circle[] c = new Circle[3]; //배열 생성
        
        for(int i=0; i<3; i++) {
          System.out.println(i+1+"번 배열 입력");
          //double x = s.nextDouble();
          //double y = s.nextDouble();
          //int z = s.nextInt();
          //c[i]=new Circle(x,y,z); 이렇게도 가능
    
          c[i]=new Circle(s.nextDouble(), s.nextInt());
        }
        
        for(int i=0; i<3; i++) {
          System.out.print("x,y,t : ");
          c[i].show();
        }
    
        /*for(Circle c2:2){  //for-each문 가능
            c2.show(); 
          }*/
      }
    }
    ```