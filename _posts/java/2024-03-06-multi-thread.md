---
layout: single
title: "Java의 Multi Thread"
categories: Java
tag: [Java]
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

실무에서는 스레드를 잘 안쓴다고 한다

> `스레드(thread)`
>
> - 코드의 실행 흐름

- 하나의 프로세스가 두 가지 이상의 작업을 처리할 수 있는 이유는 멀티 스레드의 존재 때문이다

# 1. 멀티스레드 개념

- `멀티 스레드` : 하나의 프로세스 안에 **여러 개의 스레드(실행 흐름)**가 존재하는 것

<p align="center">
  <img src="/assets/images/java/9-1.png" width="400">
</p>

- `멀티 프로세스`
  - <u>서로 독립적</u>이므로 하나의 프로세스에서 <u>오류가 발생해도 다른 프로세스에 영향X</u>  
    (ex.워드 프로그램이 죽어도 엑셀은 정상 동작)
- `멀티 스레드`

  - <u>스레드들은 하나의 프로세스 자원(메모리 등)을 공유</u>한다
  - <u>프로세스 내부에 생성</u>되기 때문에 <u>하나의 스레드가 예외를 발생시키면 프로세스가 종료되므로 다른 스레드에게 영향</u>을 미침
  - JVM에서는 하나의 스레드가 치명적인 예외를 발생시키면 프로세스 전체가 종료될 수 있다

- 사용처
  - 멀티 스레드는 데이터를 분할해서 **병렬로 처리하는 곳**에서 사용
  - 안드로이드 앱에서 네트워크 통신을 하기 위해 사용
  - 다수의 클라이언트 요청을 처리하는 서버 개발

# 2. 메인, 작업 스레드

## 메인 스레드

- 모든 <u>자바 프로그램은 메인 스레드가 main() 메소드를 실행하며 시작</u>됨

<p align="center">
  <img src="/assets/images/java/9-2.png" width="400">
</p>

- `싱글 스레드`: 메인 스레드 종료 시 프로세스 종료
- `멀티 스레드`: 실행 중인 스레드가 하나라도 있으면 프로세스 종료X

## 작업 스레드와 실행

- 먼저 몇 개의 작업을 병렬로 실행할지 결정하고 각 작업별 스레드를 생성해야 함
- 자바 프로그램은 메인 스레드가 반드시 존재. 메인 작업 이외의 추가적인 작업 수만큼 프레드를 생성하면 됨

<p align="center">
  <img src="/assets/images/java/9-3.png" width="400">
</p>

1. **Thread 클래스로 직접 생성**

   - Thread 클래스로부터 작업 스레드 객체를 직접생성하려면 Runnable 구현 객체를 매개값으로 갖는 생성자를 호출하면 됨

     ```java
     Thread thread = new Thread(Runnable target);

     class Rask implements Runnable{
     	@override
     	public void run(){실행코드}
     }
     ```

   - Runnable 구현 클래스는 작업 내용 정의
   - Runnable 구련 객체 생성 후 Thread 생성자 매개값으로 Runnable 객체를 전달해야 함
     ```java
     Runnable task = new Task();
               └-----------------┐↓
     Thread thread = new Thread(task);
     ```

2. **Thread 자식 클래스로 생성**

## Thread 클래스 상속

- 작업 스레드 객체가 생성되었다고 바로 실행되는건X
- 실행하려면 스레드 객체의 start() 메소드를 호출해야 함

  ```java
  class Th extends Thread{ //Thred는 java.api에 있음(상속받아서 씀)
  	String name;

  	Th(String n){
  		name = n;
  	}

  	@Override
  	public void run() { //start 메소드를 호출시키면 run메소드 실행됨
  		for(int i=0; i<10; i++) {
  			System.out.println(name);
  			try {
  				sleep(1000); //1초 단위로 실행됨(100이면 0.1초임)
  			}
  			catch(Exception e) {}
  		}
  	}
  }
  public class Test {
  	public static void main(String[] args) {
  		Th t = new Th("스레드1");
  		Th t2 = new Th("스레드2"); //하나의 main()프로세스 안에 멀티 스레드

  		t.start(); //스레드 작동 시작(JVM에 의해 스케줄되기 시작함)
  		t2.start(); // t > t2 순서대로 작동하는건X. JVM스케줄에 따라 알아서 됨
  	}
  }
  ```

## Runnable(인터페이스)로 부터 구현

- Runnable: 스레드가 작업 실행 시 사용하는 인터페이스

  ```java
  class Th implements Runnable{ //Runnable은 java.api에 있는 인터페이스
  	String name;

  	Th(String n){
  		name = n;
  	}

  	@Override
  	public void run() { //start 메소드를 호출시키면 run메소드 실행됨
  		for(int i=0; i<10; i++) {
  			System.out.println(name);
  			try {
  				Thread.sleep(1000); //1초 단위로 실행됨(100이면 0.1초임)
  			}
  			catch(Exception e) {}
  		}
  	}
  }
  public class Test {
  	public static void main(String[] args) {
  		Th t = new Th("스레드1");
  		//t.start안됨. start는 Thread에 있고 이건 Runnable임
  		Thread t1 = new Thread(t);
  		t1.start();
  	}
  }
  ```

# 3. 스레드 이름, 상태

## 스레드 이름

- 작업 스레드는 자동적으로 ‘Thread-n’의 이름을 가짐
- 다른 이름을 설정하고 싶으면 Thread 클래스의 setName() 메소드 사용
  ```java
  Thread.setName("스레드 이름");
  ```

## 스레드 상태

- 스레드 객체를 생성(NEW)하고 start() 메소드를 호출하면 곧바로 실행되는것 X = 실행대기(RUNNABLE) 상태
- 실행 스레드는 run() 메소드를 모두 실행하기 전에 스케줄링에 의해 다시 실행 대기 상태로 돌아갈 수 있음
- 일시정지는 에러상태인 것과 같으므로, 보통 try-catch와 같이 씀

<p align="center">
  <img src="/assets/images/java/9-4.png" width="400">
</p>

| 구분                                                | 메소드                                                              | 설명                                                                                                              |
| --------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 일시                                                | sleep                                                               |
| (long millis)                                       | 주어진 시간 동안 스레드를 일시 정지 상태로 만듬.                    |
| 주어진 시간이 지나면 자동적으로 실행 대기 상태가 됨 |
| 정지로                                              | join()                                                              | join() 메소드를 호출한 스레드는 일시 정지 상태가 됨. 실행 대기 상태가 되려면 join() 메소드를 가진 스레드가 종료됨 |
| 보냄                                                | wait()                                                              | 동기화 블록 내에서 스레드를 일시 정지 상태로 만듦                                                                 |
| 일시 정지에서                                       | interrupt()                                                         | 일시 정지 상태일 경우, InterruptedException을 발생시켜 실행 대기 상태 또는 종료 상태로 만듬                       |
| 벗어남                                              | notiify()                                                           |
| notifyAll()                                         | wait()메소드로 인해 일시 정지 상태인 스레드를 실행 대기 상태로 만듬 |
| 실행대기로 보냄                                     | yield                                                               | 실행 상태에서 다른 스레드에게 실행을 양보하고 실행 대기 상태가 됨                                                 |

- wait()과 notiify(), notifyAll()은 Object 클래스 메소드
- 그 외에는 Thread 클래스 메소드

## 주어진 시간 동안 일시 정지(sleep)

- Thread 클래스의 정적 메소드인 sleep() 이용
- 밀리세컨드(1/1000)단위로 시간을 줌(1초 = sleep(1000))

## 다른 스레드의 종료를 기다림(join)

- 스레드는 다른 스레드와 독립적으로 실행
- 하나의 스레드 작업이 종료된 후 그 결과값을 받아 처리해야 하는 경우 join() 메소드 제공
- ThreadA가 ThreadB의 join() 메소드를 호출하면 ThreadA는 ThreadB가 종료할 때 까지 일시 정지 상태가 됨(끼어들 수 없음)

  ```java
  class SumThread extends Thread{
  	private long sum;

  	public long getSum() {
  		return sum;
  	}

  	public void setSum(long sum) {
  		this.sum = sum;
  	}

  	@Override
  	public void run() {
  		for(int i=1; i<=100; i++) {
  			sum+=i;
  		}
  	}
  }

  public class Study {
  	public static void main(String[] args) {

  		SumThread sumThread = new SumThread();
  		sumThread.start();
  		try {
  			sumThread.join(); //sumThread 계산 전까지 main 스레드 일시 정지!
  		}catch(InterruptedException e) {} //일시 정지에 대한 Exception
  		System.out.println("1~100 합: "+sumThread.getSum());

  	}
  }
  ```

## 다른 스레드에게 실행 양보(yield)

- 다른 스레드에게 실행을 양보하고(무의미하게 반복하지 말고) 자신은 실행 대기 상태로 가는 것

- 예제

  ```java
  class Student extends Thread{ //스레드는 main과 Thread가 있음
  	String name;
  	Sh sh;

  	Student(String n, Sh s){
  		name = n;
  		sh = s;
  	}

  	@Override
  	public void run() {
  		for(int i=1; i<3; i++) {
  			try {
  				sh.add();
  				sleep(500);
  			}catch(InterruptedException e) {}
  		}
  	}
  }

  class Sh{ //start안했으니까 일반 클래스
  	private int num = 0;

  	public void add() {
  		int n = num;
  		Thread.*yield*(); //양보. 안넣어도 됨. student 스레드가 실행되고 있을 때 메인 스레드 호출X
  		n+=10;
  		num = n;
  		System.out.println(num);
  	}
  }

  public class Test {
  	public static void main(String[] args) {

  			Sh sh = new Sh();
  			Student th1 = new Student("jack",sh);
  			Student th2 = new Student("tom",sh);
  			th1.start();
  			try {
  				th1.join(); //th1이 실행될 때 th2가 실행될 수 없다
  				th2.join(); //스레드로부터 객체를 여러개 생성할 때 반드시 넣어야함(결과 이상하게 나올 수 있음)
  			}catch(Exception e){} //InterruptedException로 넣어도 됨
  			th2.start();
  		}
  }
  ---------------------------------------------
  10 20 30 40 //2개의 다른 스레드가 실행됐는데도 값이 유지되면서 더해짐
  ```

# 4. 스레드 동기화

- 멀티 스레드는 하나의 객체를 공유해서 작업할 수도 있음
- 데이터가 쉽게 변경될 수 있기 때문에 의도했던 것과 다른 결과가 나올 수 있음
- 스레드가 사용 중인 객체를 다른 스레드가 변경할 수 없도록 스레드 작업이 끝날 때까지 객체에 잠금을 걸음
- 자바는 동기화(synchronized) 메소드와 블록 제공

<p align="center">
  <img src="/assets/images/java/9-5.png" width="400">
</p>

## 동기화 메소드 및 블록 선언

- 동기화 메소드는 synchronized라는 키워드를 붙여야 함(인스턴스, 정적 다 가능)
  ```java
  public **synchronized** void method(){//단 하나의 스레드만 실행하는 영역}
  ```
- 예제

  ```java
  class Cal{
  	private int memory;

  	public int getMemory(){
  		return memory;
  	}

  	public synchronized void setMemory1(int memory){ //동기화 메소드
  		this.memory = memory; //메모리값 저장
  		try{
  			Thread.sleep(2000); //2초간 일시정지
  		}catch(InterruptedException e){}
  		System.out.println(Thread.currentThread().getName()+": "+this.memory);
  	}
  	public void setMemory2(int memory){ //일반 메소드
  		synchronized(this) {
  			this.memory = memory; //메모리값 저장
  			try{
  				Thread.sleep(2000); //2초간 일시정지
  			}catch(InterruptedException e){}
  			System.out.println(Thread.currentThread().getName()+": "+this.memory);
  		}
  	}
  }
  ---------------------------------------------------------------------
  class User1 extends Thread{
  	private Cal cal;

  	public User1() { //스레드 이름 변경
  		setName("User1");
  	}

  	public void setCal(Cal cal) { //외부에서 공유 객체인 Cal 받아 필드에 저장
  		this.cal = cal;
  	}

  	@Override
  	public void run(){
  		cal.setMemory1(100); //동기화 메소드 호출, 동기화 메소드
  	}
  }
  ---------------------------------------------------------------------
  class User2 extends Thread{
  	private Cal cal;

  	public User2() { //스레드 이름 변경
  		setName("User2");
  	}

  	public void setCal(Cal cal) {
  		this.cal = cal;
  	}

  	@Override
  	public void run(){
  		cal.setMemory2(50); //동기화 메소드 호출, 일반 메소드
  	}
  }
  ---------------------------------------------------------------------
  public class Study {
  	public static void main(String[] args) {
  		Cal cal = new Cal();

  		User1 user1 = new User1();
  		user1.setCal(cal);
  		user1.start();

  		User2 user2 = new User2();
  		user2.setCal(cal);
  		user2.start();
  	}
  }

  ```

  ```java
  class Share{
  	synchronized void pr(String str) {
  		for(int i=0; i<str.length();i++) {
  			System.out.print(str.charAt(i));
  		}
  		System.out.println();
  	}
  }

  class Th extends Thread{
  	Share s;
  	String [] str;

  	Th(Share s, String[] str){
  		this.s = s;
  		this.str = str;
  	}

  	@Override
  	public void run() {
  		for(int i=0; i<str.length;i++) {
  			s.pr(str[i]); //공유하고 있는 함수
  		}
  	}
  }

  public class Test {
  	public static void main(String[] args) {

  		Share s = new Share();
  		String eng[] = {"java","study","db","spring","jsp"};
  		String kor[] = {"자바","공부","디비","스프링","제이에스피"};

  		Th t1 = new Th(s,eng);
  		Thread t2 = new Th(s,kor); //업케스팅 형태

  		t1.start();
  		t2.start();

  	}
  }
  -----------------------
  //void pr(String str) 인 경우
  java자바
  공부
  study
  디비
  스프db
  spring
  j링          ← 문자 사이에 끼어듬
  제이에스피s
  //synchronized void pr(String str)인 경우
  java
  study     ←순서대로는 아니지만 문자 사이에 끼어들진 않음
  자바       ←순서대로 하려면 join
  공부
  디비
  스프링
  제이에스피
  db
  spring
  jsp
  ```

## wait()과 notify()를 이용한 스레드 제어(잘 안씀)

- 두 개의 스레드를 교대로 번갈아가면 실행할 때 사용
- 한 스레드가 작업을 완료하면 notify() 메소드를 호출해서 일시 정지 상태에 있는 다른 스레드를 실행 대기 상태로 만듬 → 자신은 두 번 작업하지 않도록 wait() 메소드를 호출하여 일시정지 상태로 만듬
- 이 두 메소드는 동기화 메소드 또는 동기화 블록 내에서만 사용할 수 있음

<p align="center">
  <img src="/assets/images/java/9-6.png" width="400">
</p>

```java
class WorkObject{
	public synchronized void methodA() {
		Thread thread = Thread.currentThread();
		System.out.println(thread.getName()+": methodA 작업실행");
		notify();  //다른 스레드를 실행 대기 상태로 만듦
		try {
			wait(); //자신의 스레드는 일시 정지 상태로 만듦
		}catch(InterruptedException e) {}
	}

	public synchronized void methodB() {
		Thread thread = Thread.currentThread();
		System.out.println(thread.getName()+": methodB 작업실행");
		notify();  //다른 스레드를 실행 대기 상태로 만듦
		try {
			wait(); //자신의 스레드는 일시 정지 상태로 만듦
		}catch(InterruptedException e) {}
	}
}
//-----------------------------------------------------
class ThreadA extends Thread{
	private WorkObject wo;

	public ThreadA(WorkObject wo) { //공유 작업 객체를 받음
		setName("ThreadA"); //스레드 이름 변경
		this.wo = wo;
	}

	@Override
	public void run() {
		for(int i=0;i<3;i++) {
			wo.methodA(); //동기화 메소드 호출
		}
	}
}
//-----------------------------------------------------
class ThreadB extends Thread{
	private WorkObject wo;

	public ThreadB(WorkObject wo) { //공유 작업 객체를 받음
		setName("ThreadB"); //스레드 이름 변경
		this.wo = wo;
	}

	@Override
	public void run() {
		for(int i=0;i<3;i++) {
			wo.methodB(); //동기화 메소드 호출
		}
	}
}
//-----------------------------------------------------
public class Study {
	public static void main(String[] args) {
		WorkObject wo = new WorkObject();

		ThreadA thA = new ThreadA(wo);
		ThreadB thB = new ThreadB(wo);

		thA.start();
		thB.start();
	}
}
------------------------------------------------------
ThreadA: methodA 작업실행
ThreadB: methodB 작업실행
ThreadA: methodA 작업실행
ThreadB: methodB 작업실행
ThreadA: methodA 작업실행
ThreadB: methodB 작업실행
```

```java
class Cook { // 요리쓰레드
	String food;
	boolean send = false;

	void set(String f) {
		food = f; // 초기화 코드
		send = true;
		// synchronized void pr()
		synchronized (this) {
			notifyAll(); // 일시정지된 스레드 실행대기로 만듬, synchronized 안에 있어야함
		}   //↑Chef 클래스에 대한 함수
	}

	String get() {
		if (send == false) { // 음식 도착안했으면
			try {
				synchronized (this) { //this=Cook객체
					wait(); // 손님이 기다림
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return food;
	}
}

class Chef extends Thread { // 요리사. 다 일시정지 상태임. notifyAll로 깨워짐
	Cook c;

	Chef(Cook c) {
		this.c = c;
	}

	public void run() {
		c.set("음식");
	}
}

class Custumer extends Thread {
	Cook c;

	Custumer(Cook c) {
		this.c = c;
	}

	public void run() {
		System.out.println(c.get());
	}
}

public class Test {
	public static void main(String[] args) {

		Cook co = new Cook();
		Custumer c1 = new Custumer(co);
		Custumer c2 = new Custumer(co);
		Chef c3 = new Chef(co);

		try {
			c1.start();
			c2.start();
			Thread.sleep(1000);
			c3.start();

			c1.join();
			c2.join();
			c3.join();
		} catch (Exception e) {
		}
	}
}
```

# 5. 스레드 안전종료, 스레드 풀

## interrupt() 메소드

- 스레드에 인터럽트 신호를 보내는 것
- 스레드가 `sleep()`, `wait()`, `join()` 같은 일시 정지 상태에 있을 때 interrupt()가 호출되면  
  → InterruptedException 예외를 발생시켜 스레드를 깨운다
- 이를 통해 스레드를 안전하게 종료하거나 중단 제어할 수 있다

  ```java
  class PrintThread extends Thread{
  	public void run() {
  		try {
  			while(true) {
  				System.out.println("실행 중");
  				Thread.sleep(1); //InterruptedException 발새할 수 있도록 일시정지
  			}
  		}catch(InterruptedException e) {}
  		System.out.println("리소스 정리");
  		System.out.println("실행 종료");
  	}
  }
  public class Study {
  	public static void main(String[] args) {
  		Thread thread = new PrintThread();
  		thread.start();

  		try {
  			Thread.sleep(1000);
  		} catch(InterruptedException e) {}

  		thread.interrupt(); //interrupt함수 호출
  	}
  }
  ```

---

## 스레드 풀

- 작업 처리에 사용되는 스레드를 제한된 개수만큼 정해 놓고 작업 큐에 들어오는 작업들을 스레드가 하나씩 맡아 처리하는 방식

<p align="center">
  <img src="/assets/images/java/9-7.png" width="400">
</p>

---

# 기출문제

- 2번

  ```java
  class MovieThread extends Thread{
  	@Override
  	public void run() {
  		for(int i=0;i<3;i++) {
  			System.out.println("동영상을 재생합니다");
  			try {
  				Thread.sleep(1000);
  			}catch(InterruptedException e) {}
  		}
  	}
  }

  class MusicRunnable implements Runnable{
  	@Override
  	public void run() {
  		for(int i=0;i<3;i++) {
  			System.out.println("음악을 재생합니다");
  			try {
  				Thread.sleep(1000);
  			}catch(InterruptedException e) {}
  		}
  	}
  }

  public class Test {
  	public static void main(String[] args) {

  			Thread thread1 = new MovieThread();
  			thread1.start();

  			Thread thread2 = new Thread(MusicRunnable());//에러남. 해결해야 함.Thread에 대한 클래스 넣어줘야 함
  			thread2.start();

  		}
  }
  ```

- Thread 클래스와 Runnable 예제

  ```java
  class Movie implements Runnable{
  	String str;

  	Movie(String s){
  		str = s;
  	}

  	@Override
  	public void run() {
  		for(int i=0; i<10; i++) {
  			System.out.println(str);
  		}
  	}
  }

  public class Test {
  	public static void main(String[] args) {

  			Music m = new Music("음악재생");
  			m.start();

  			Movie m1= new Movie("영화재생");
  			Thread t = new Thread(m1);
  			t.start(); //인터페이스이므로 m1.start 불가능

  			try {  //빼고 돌려도 됨
  				m.join(); //Mesic 스레드 일시정지 > 실행대기 상태가 되려면 다음꺼가 실행될때까 실행대기
  				t.join(); //Movie 스레드 일시정지 >
  			}
  			catch(Exception e) {}

  		}
  }
  ```

- Main()를 보고 “쓰레드1”을 출력해라.

  ```
  	Main(){
  	Th t=new Th(“쓰레드 1”);
  	Thread th=new Thread(t);
  	th.start();
  ```

  ```java
  class Th implements Runnable{
  	String str;

  	Th(String s){
  		str = s;
  	}

  	public void run() {
  		System.out.println(str);
  	}
  }
  ```

- Main()를 보고 클래스 작성해라. (0~10까지 1초동안 잠을 잔 후 깨워라)

  ```java
  class Timer extends Thread{
  	public void run() {
  		Toolkit toolkit = Toolkit.getDefaultToolkit();
  		for(int i=1; i<=10;i++) {
  			toolkit.beep();
  			try {
  				Thread.sleep(1000);
  			}catch(InterruptedException e) {}
  		}
  	}
  }

  public class Test {
  	public static void main(String[] args) {

  		Timer t = new Timer();
  		t.start();
  	}
  }
  -------------------------------------------------
  정답
  class Timer extends Thread{
  	public void run() {
  		for(int i=1; i<=10;i++) {
  			System.out.println(i);
  			try {
  				Thread.sleep(1000);
  			}catch(InterruptedException e) {
  				e.printStackTrace(); //예외처리: 정지
  				}
  		}
  }
  ```

- 다음 코드를 보고 AThread클래스를 작성해라.두 쓰레드가 충돌하지 않게 join()도 활용해라.
  class Total{
  int sum;
  Total(){
  sum=0; }
  void total(int n){
  sum+=n; }
  int get(){
  return sum; }
  }
  main(){
  Total t=new Total();
  AThread a=new AThread(t, 1, 50); //1275
  AThread b=new AThread(t, 51, 100); //2050
  a.start(); b.start(); }

  ```java
  class AThread extends Thread{
  	int a,b;
  	Total t;

  	AThread(Total t, int a, int b){
  		this.t = t;
  		this.a = a;
  		this.b = b;
  	}

  	public void run() {
  		for(int i=a; i<=b; i++) {
  			t.total(i);
  		}
  		System.out.println(t.get());
  	}


  }

  class Total {
  	int sum;

  	Total() {
  		sum = 0;
  	}

  	void total(int n) {
  		sum += n;
  	}

  	int get() {
  		return sum;
  	}
  }

  public class Test {
  	public static void main(String[] args) {
  		Total t = new Total();
  		AThread a = new AThread(t, 1, 50); // 1275
  		AThread b = new AThread(t, 51, 100); // 5050
  		a.start();
  		try {
  			a.join();  //안멈춰주면 b도 같이 실행되서 둘다 결과가 5050이 되버림
  			b.join();
  		}catch(InterruptedException e) {}
  		b.start();
  	}
  }
  ------------------------------------------------------------
  //main()을 다르게 처리할 경우
  public class Study {
  	public static void main(String[] args) throws InterruptedException{
  										//  ↑try catch대신 throws 활용(예외 던지기, 미루기)
  		Total t = new Total();
  		AThread a = new AThread(t, 1, 50); // 1275
  		AThread b = new AThread(t, 51, 100); // 5050
  		a.start();
  		a.join();  //join메소드를 호출한 스레드를 일시 정지 상태로 만듦
  		b.start();
  		b.join();
  	}
  }
  ```

- 다음 main함수를 보고 작성해라.

  ```
  main(){
  	Thread th1=new MovieThread();
  	th1.start();
  	Thread th2=new Thread(new MusicThread());
  	th2.start();
  }
  ```

  ```java
  class MovieThread extends Thread{
  	String a;

  	public void run() {
  		for(int i=1; i<=3; i++) {
  			System.out.println("영화를 재생합니다");
  		}
  	}
  }

  class MusicThread implements Runnable{
  	String a;

  	public void run() {
  		for(int i=1; i<=3; i++) {
  			System.out.println("음악 재생합니다");
  		}
  	}
  }

  public class Test {
  	public static void main(String[] args) {
  		Thread th1=new MovieThread();
  		th1.start();

  		Thread th2=new Thread(new MusicThread());
  		th2.start();
  	}
  }

  	---------------------
  	영화를 재생합니다.영화를 재생합니다. 영화를 재생합니다.
  	음악을 재생합니다. 음악을 재생합니다. 음악을 재생합니다.
  	(th2가 먼저 나올수도 있음, 세번씩 출력)

  ```
