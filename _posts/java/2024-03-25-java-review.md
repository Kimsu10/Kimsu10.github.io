---
layout: single
title: "자바 복습"
categories: Java
tag: [Java, OOP]
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

# java 기초 정리

## 1. while

- while문 이용해서 정수 입력하여 평균 구하기, 0입력 시 종료

  ```java
  Scanner s = new Scanner(System.in);
  int sum = 0; int cnt = 0; int n;
  while((n=s.nextInt())!=0) {
  	sum+=n;
  	cnt++;
  }
  System.out.println(sum/cnt);

  //BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  //int n = Integer.parseInt(br.readLine());
  ```

## 2. 배열

- 배열 선언, for문, while문, 함수에 넣어 매개변수 활용, 객체배열 등
  ```java
  int arr[] = new int[3];
  int ary[] = {1,2,3};
  int ar[] = new int[] {1,2,3};
  ```
- 배열을 입력받아 최대값 구하기

  ```java
  public class Test {
  	public static void main(String[] args) {

  		Scanner s = new Scanner(System.in);
  		int ary[] = new int[5];
  		int max = 0;

  		for(int i=0; i<ary.length; i++) {
  			ary[i] = s.nextInt();
  			if(max < ary[i]) {
  				max = ary[i];
  			}
  		}
  		System.out.println(max);
  	}
  }
  ```

- for-each문으로 배열 출력

  ```java
  int n[] = {1,2,3,4,5};

  for(int a:n) {
  	System.out.println(a);
  }
  ```

- 함수 호출로 배열 작성
  ```java
  public class Test {
  	static int[] pr() { //저장공간과 동일한 반환형으로 작성해야함
  		int a[] = {1,2,3,4,5};
  		return a;
  	}
  	public static void main(String[] args) {
  		int ary[] = *pr*();
  		for(int i=0; i<ary.length; i++) {
  			System.out.println(ary[i]);
  		}
  	}
  }
  ```

## 3. 클래스

- 클래스 생성 기초

  ```java
  class A {
  	int a, b;

  	double area() {
  		return a * b;
  	}
  }

  public class Test {
  	public static void main(String[] args) {
  		A a = new A(); // 객체 생성
  		a.a = 3;
  		a.b = 4;
  		a.area();
  		System.out.println(a.area());

  		A b = new A(); // 객체의 개수는 상관 없음
  		b.a = 5;
  		b.b = 10;
  		b.area();
  		System.out.println(b.area());

  	}
  }
  ```

- 생성자 호출

  ```java
  class A {
  	int a, b;
  	double area() {
  		return a * b;
  	}
  	A() { // 매개변수가 없는 기본 생성자
  		a = 1; b = 2;
  		//this(10);으로 작성된 경우 A(int a)가 호출되어 (a,5) = 10*5가 실행됨
  	}
  	A(int a) {
  		this(a,5); //↓매개변수가 2개인 생성자 호출
  	}
  	A(int a, int b) { //생성자 오버로딩
  		this.a = a; this.b = b;
  	}
  }

  public class Test {
  	public static void main(String[] args) {
  		A a = new A();
  		System.out.println(a.area()); //2.0
  		A b = new A(4);
  		System.out.println(b.area()); //20.0
  		A c = new A(3, 4);
  		System.out.println(c.area()); //12.0
  	}
  }
  ```

- 클래스 안에 static 함수 호출

  ```java
  class A {
  	static int max(int a, int b) {
  		return a>b? a:b;
  	}
  }

  public class Test {
  	public static void main(String[] args) {
  		System.out.println(A.*max*(3, 5)); //5출력
  	}
  }
  ```

## 4. 상속

- 상속 기초

  ```java
  class A{
  	int n;
  	A(){
  		System.out.println("기본A");
  	}
  	A(int x){
  		this.n = n;
  		System.out.println("매개변수 하나A");
  	}
  }

  class B extends A{
  	B(int n){
  		super(n); //System.out.println("매개변수 하나A");
  	}
  }

  public class Test {
  	public static void main(String[] args) {
  		B b = new B(10);
  	}
  }
  ```

- **오버라이드**

  ```java
  class A{
  	A(){
  		System.out.println("기본A");
  	}
  	A(int n){
  		System.out.println("매개변수 하나A");
  	}
  	void pr() {
  		System.out.println("A");
  	}
  }

  class B extends A{
  	int n;
  	B(int n){
  		super(n); //System.out.println("매개변수 하나A");
  		this.n = n;
  	}
  	@Override
  	void pr() {
  		System.out.println("B");
  	}
  }

  public class Test {
  	public static void main(String[] args) {
  		A b = new B(10); //자식B를 부모A로 형변환
  		b.pr(); //오버라이드 된 함수 호출("B" 출력)
  	}
  }
  ```

- **오버라이드+동적바인딩**

  ```java
  class Shape { // 도형의 슈퍼 클래스
  	public void draw() {
  		System.out.println("Shape");
  	}
  }
  class Line extends Shape {
  	@Override
  	public void draw() { // 메소드 오버라이딩
  		System.out.println("Line");
  	}
  }
  class Rect extends Shape {
  	@Override
  	public void draw() { // 메소드 오버라이딩
  		System.out.println("Rect");
  	}
  }
  class Circle extends Shape {
  	@Override
  	public void draw() { // 메소드 오버라이딩
  		System.out.println("Circle");
  	}
  }

  public class Test {
  	static void pr(Shape p) {
  		p.draw(); //동적 바인딩 → 매개변수를 부모로, 자식을 업캐스팅함
  	}
  	public static void main(String[] args) {
  		Line line = new Line(); //Shape p = new Line();
  		pr(line); // Line의 draw() 실행. "Line" 출력
  		pr(new Shape()); // Shape의 draw() 실행. "Shape" 출력
  		pr(new Line()); // 오버라이딩된 메소드 Line의 draw() 실행. "Line"출력
  		pr(new Rect()); // 오버라이딩된 메소드 Rect의 draw() 실행. "Rect"출력
  		pr(new Circle()); // 오버라이딩된 메소드 Circle의 draw() 실행
  	}
  }
  ```

- **추상클래스, 메소드**

  ```java
  abstract class Calcu{
  	abstract int add(int a, int b);
  }

  class Cal extends Calcu{
  	@Override
  	int add(int a, int b) {
  		return (a+b);
  	}
  }

  public class Test {
  	public static void main(String[] args) {
  		Calcu c = new Cal();
  		System.out.println(c.add(4 ,6));//→ 자식 메소드 출력
  	}
  }
  ```

## 5. 인터페이스

- **인터페이스 상속**

  ```java
  interface PhoneInterface { // 인터페이스 선언
  	final int TIMEOUT = 10000; // 상수 필드 선언

  	void sendCall(); // 추상 메소드
  	void receiveCall(); // 추상 메소드

  	default void printLogo() { // default 메소드
  		System.out.println("** Phone **");
  	}
  }

  class SamsungPhone implements PhoneInterface { // 인터페이스 구현
  // PhoneInterface의 모든 메소드 구현
  	@Override
  	public void sendCall() {
  		System.out.println("띠리리리링");
  	}

  	@Override
  	public void receiveCall() {
  		System.out.println("전화가 왔습니다.");
  	}

  // 메소드 추가 작성
  	public void flash() {
  		System.out.println("전화기에 불이 켜졌습니다.");
  	}
  }

  public class Test {
  	public static void main(String[] args) {
  		SamsungPhone phone = new SamsungPhone();
  		phone.printLogo(); //** Phone **
  		phone.sendCall(); //띠리리리링
  		phone.receiveCall(); //전화가 왔습니다.
  		phone.flash(); //전화기에 불이 켜졌습니다.
  	}
  }
  ```

## 6. 문자열 출력

- `toString`

  ```java
  class Po{
  	int x,y;
  	Po(int x, int y){
  		this.x = x; this.y = y;
  	}
  	public String toString() {
  		return x+" "+y;
  	}
  }

  public class Test {
  	public static void main(String[] args) {
  		Po p = new Po(1,2);
  		System.out.println(p.getClass().getName()); //Po
  		//클래스 알아내기
  		System.out.println(p.hashCode()); //1365202186
  		System.out.println(p); //toString이 없다면 Po@515f550a출력, 있다면 1 2 출력
  	}
  }
  ```

- Object 클래스의 `equals` 활용

  ```java
  class Point {
  	int x, y;

  	public Point(int x, int y) {
  		this.x = x;
  		this.y = y;
  	}
  	@Override
  	public boolean equals(Object obj) {
  		Point p = (Point) obj; // obj를 Point 타입으로 다운 캐스팅
  		if (x == p.x && y == p.y)
  			return true;
  		else
  			return false;
  	}
  }

  public class Test {
  	public static void main(String[] args) {
  		Point a = new Point(2, 3);
  		Point b = new Point(2, 3);
  		Point c = new Point(3, 4);
  		if (a == b)
  			System.out.println("a==b");
  		if (a.equals(b))
  			System.out.println("a is equal to b"); //출력
  		if (a.equals(c))
  			System.out.println("a is equal to c");
  	}
  }
  ```

- **문자열 변환**

  ```java
  public class Test {
  	public static void main(String[] args) {

  		System.out.println(Integer.parseInt("28")); //문자 → 정수
  		System.out.println(Integer.valueOf("28"));  //문자 → 정수

  		System.out.println(Integer.toString(28));  //정수 → 문자

  		System.out.println(Integer.valueOf(10));
  		Integer i = Integer.valueOf(10); //(박싱)기본 정수 10을 정수형 객체로 변환
  		System.out.println(i.intValue()); //(언박싱)정수형 객체를 기본 정수값으로 변환

  		boolean b = 10 >3;
  		System.out.println(Boolean.toString(b));

  		//문자열을 false로 반환
  		System.out.println(Boolean.toString(b));
  		//true를 문자열 "true"로 변환
  		System.out.println(Boolean.parseBoolean("false"));
  		//문자열을 false로 변환

  		//실수형 3.12를 객체화
  		Double d = 3.14;

  		//d를 문자열 3.14로 변경
  		System.out.println(d.toString());
  		System.out.println(Double.toString(d)); //같은 코드

  		//문자열 "3.14"를 실수 3.14로 변경
  		System.out.println(Double.parseDouble("3.14"));
  		System.out.println(Double.valueOf("3.14"));
  	}
  }
  ```

## 7.제네릭

- **제네릭과 문자열**

  ```java
  public class Test {
  	public static void main(String[] args) {
  		Vector<Integer> v = new Vector<Integer>();
  		v.add(new Integer(4));
  		v.add(4);
  		v.add(0,9);
  		for(int i=0; i<v.size() ; i++) {
  			System.out.println(v.get(i));  //9 4 4 출력
  		}
  	}
  }
  ```

- **제네릭 메소드**

  ```java
  class Point {
     private int x, y;
     public Point(int x, int y) {
        this.x = x;
        this.y = y;

     public String toString() {
        return "(" + x + "," + y + ")";
     }
  }

  public class Test {
     public static void main(String[] args) {
        Vector<Point> v = new Vector<Point>();
        // 3 개의 Point 객체 삽입
        v.add(new Point(2, 3));
        v.add(new Point(-5, 20));
        v.add(new Point(30, -8));
        v.remove(1); // 인덱스 1의 Point(-5, 20) 객체 삭제
        // 벡터에 있는 Point 객체 모두 검색하여 출력
        for (int i = 0; i < v.size(); i++) {
           Point p = v.get(i); // 벡터의 i 번째 Point 객체 얻어내기
           System.out.println(p); // p.toString()을 이용하여 객체 p 출력
        }
     }
  }
  ```

## 8. 콜렉션

- `Iterator`를 이용한 출력

  ```java
  class Point {
     private int x, y;
     public Point(int x, int y) {
        this.x = x;
        this.y = y;
     }
     public String toString() {
        return "(" + x + "," + y + ")";
     }
  }

  public class Test {
     public static void main(String[] args) {
        Vector<Point> v = new Vector<Point>();
        // 3 개의 Point 객체 삽입
        v.add(new Point(2, 3));
        v.add(new Point(-5, 20));
        v.add(new Point(30, -8));
        v.remove(1); // 인덱스 1의 Point(-5, 20) 객체 삭제
        // 벡터에 있는 Point 객체 모두 검색하여 출력
        Iterator<Point> it = v.iterator();
        while(it.hasNext()) {
      	  System.out.println(it.next());
        }
     }
  }
  ```

- `HashMap` 객체 출력

  ```java
  import java.util.HashMap;
  import java.util.Iterator;
  import java.util.Map;
  import java.util.Set;

  public class Test {
     public static void main(String[] args) {

  	   Map<String, String> h = new HashMap<String, String>();
  	   h.put("aa", "123");
  	   h.put("bb", "1223");
  	   h.put("cc", "1323");

  	   Set<String> keys = h.keySet(); //키값 받아서 Set콜렉션에 담음(중복저장X)
  	   Iterator<String> it = keys.iterator();

  	   while(it.hasNext()) {
  		   String str = it.next(); //키값
  		   System.out.println(str);
  		   System.out.println(h.get(str));
  	   }

     }
  }
  ```

## 8. 입출력 스트림

- **콘솔에 입력한 글자를 파일에 저장**

  ```java
  import java.io.BufferedReader;
  import java.io.FileWriter;
  import java.io.IOException;
  import java.io.InputStreamReader;

  public class Test {
     public static void main(String[] args) throws IOException {
        //콘솔에 입력
        BufferedReader br=
              new BufferedReader(new InputStreamReader(System.in));
        //입력한 데이터 파일저장
        FileWriter f= null;
        int r;
        //EOF end of file
        try {
           f=new FileWriter("c.txt");
  				         //↓ EOF end of file
           while((r=br.read())!=-1) { //ctrl+z(파일의 끝) read의 반환형은 int. 문자열의 끝(-1)까지 읽음
              f.write(r);   //-1까지 입력한 r을 파일f에 저장하라
           }
           br.close();
           f.close();
        }catch(Exception e) {}
     }
  }
  ```

- **byte배열을 파일에 저장**

  ```java
  import java.io.FileOutputStream;
  import java.io.FileWriter;

  public class Test {
     public static void main(String[] args) {
  	   byte bb[] = {4,2,4,6,2,6};
  	   try {
  		   FileOutputStream f = new FileOutputStream("temp.txt"); //byte단위라 Filewrite안됨
  		   for(int i=0; i<bb.length; i++) {
  			   f.write(bb[i]);
  		   }
  	   }catch(Exception e) {}
     }
  }
  -----------아래도 가능-------------------------------------
  public class Test {
     public static void main(String[] args) {
  	   byte bb[] = {4,2,4,6,2,6};
  	   try {
  		   FileOutputStream f = new FileOutputStream("temp.txt");
  		   f.write(bb);
  	   }catch(Exception e) {}
     }
  }
  ```

- **저장한 byte배열 읽기**

  ```java
  import java.io.FileInputStream;

  public class Test {
     public static void main(String[] args) {
  	   byte bb[] = new byte[6];
  	   try {
  		   FileInputStream f = new FileInputStream("temp.txt");
  		   int n=0, r;
  		   while((r=f.read())!=-1) {
  			   bb[n] = (byte)r;
  			   n++;
  		   }
  		   for(int i=0;i<bb.length;i++) {
  			   System.out.println(bb[i]+" ");
  		   }
  	   }catch(Exception e) {}
     }
  }
  ```

## 9. 서버와 클라이언트 통신하기

- **서버측 코드**

  ```java
  import java.io.*;
  import java.net.*;
  import java.util.*;

  public class Test { //서버
  	public static void main(String[] args) {
  		BufferedReader in = null;
  		BufferedWriter out = null;
  		ServerSocket listener = null;
  		Socket socket = null;
  		Scanner scanner = new Scanner(System.in); // 키보드에서 읽을 scanner 객체 생성
  		try {
  			listener = new ServerSocket(9999); // 서버 소켓 생성
  			System.out.println("연결을 기다리고 있습니다.....");
  			socket = listener.accept(); // 클라이언트로부터 연결 요청 대기
  			System.out.println("연결되었습니다.");
  			in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
  			out = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
  			while (true) {
  				String inputMessage = in.readLine(); // 클라이언트로부터 한 행 읽기
  				if (inputMessage.equalsIgnoreCase("bye")) {
  					System.out.println("클라이언트에서 bye로 연결을 종료하였음");
  					break; // "bye"를 받으면 연결 종료
  				}
  				System.out.println("클라이언트: " + inputMessage);
  				System.out.print("보내기>>"); // 프롬프트
  				String outputMessage = scanner.nextLine(); // 키보드에서 한 행 읽기
  				out.write(outputMessage + "\n"); // 키보드에서 읽은 문자열 전송
  				out.flush(); // out의 스트림 버퍼에 있는 모든 문자열 전송
  			}
  		} catch (IOException e) {
  			System.out.println(e.getMessage());
  		} finally {
  			try {
  				scanner.close(); // scanner 닫기
  				socket.close(); // 통신용 소켓 닫기
  				listener.close(); // 서버 소켓 닫기
  			} catch (IOException e) {
  				System.out.println("클라이언트와 채팅 중 오류가 발생했습니다.");
  			}
  		}
  	}
  }
  ```

- **클라이언트측 코드**

  ```java
  import java.io.*;
  import java.net.*;
  import java.util.*;

  public class Test2 { //클라이언트
  	public static void main(String[] args) {
  		BufferedReader in = null;
  		BufferedWriter out = null;
  		Socket socket = null;
  		Scanner scanner = new Scanner(System.in); // 키보드에서 읽을 scanner 객체 생성
  		try {
  			socket = new Socket("localhost", 9999); // 클라이언트 소켓 생성. 서버에 연결
  			in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
  			out = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
  			while (true) {
  				System.out.print("보내기>>"); // 프롬프트
  				String outputMessage = scanner.nextLine(); // 키보드에서 한 행 읽기
  				if (outputMessage.equalsIgnoreCase("bye")) {
  					out.write(outputMessage + "\n"); // "bye" 문자열 전송
  					out.flush();
  					break; // 사용자가 "bye"를 입력한 경우 서버로 전송 후 실행 종료
  				}
  				out.write(outputMessage + "\n"); // 키보드에서 읽은 문자열 전송
  				out.flush(); // out의 스트림 버퍼에 있는 모든 문자열 전송
  				String inputMessage = in.readLine(); // 서버로부터 한 행 수신
  				System.out.println("서버: " + inputMessage);
  			}
  		} catch (IOException e) {
  			System.out.println(e.getMessage());
  		} finally {
  			try {
  				scanner.close();
  				if (socket != null)
  					socket.close(); // 클라이언트 소켓 닫기
  			} catch (IOException e) {
  				System.out.println("서버와 채팅 중 오류가 발생했습니다.");
  			}
  		}
  	}
  }
  ```
