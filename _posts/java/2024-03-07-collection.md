---
layout: single
title: "⭐ 컬렉션 자료구조"
categories: Java
tag: [Java]
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

# 컬렉션 프레임워크

- 자료구조(Data Structure)를 바탕으로 객체들을 효율적으로 추가, 삭제, 검색할 수 있도록 관련된 인터페이스와 클래스들이 java.utill 패키지에 존재
- 3가지: `List`, `Set`, `Map`

<p align="center">
  <img src="/assets/images/Java//11-1.png" width="400">
</p>

- `List` = 배열과 비슷함. 가변길이를 가짐

  | 인터페이스            | 분류                                    | 특징                             | 구현 클래스 |
  | --------------------- | --------------------------------------- | -------------------------------- | ----------- |
  | Collection            | List                                    | - 순서 유지하고 저장             |
  | - 중복 저장 가능      | ArrayList, Vector, LinkedList           |
  | Collection            | Set                                     | - 순서 유지하지 않고 저장        |
  | - 중복 저장 안됨      | HashSet, TreeSet                        |
  | Map                   | Map                                     | - 키와 값으로 구성된 엔트리 저장 |
  | - 키는 중복 저장 안됨 | HashMap, Hashtable, TreeMap, Properties |

## 1. List 컬렉션

- 객체를 인덱스로 관리
- 객체를 저장하면 인덱스가 부여됨(순서 유지)
- 인덱스로 객체를 검색, 삭제 할 수 있음(중복 저장 가능)

  | 기능      | 메소드                         | 설명                                      |
  | --------- | ------------------------------ | ----------------------------------------- |
  | 객체 추가 | boolean add(E e)               | 주어진 객체를 맨 끝에 추가                |
  |           | void add(int index, E element) | 주어진 인덱스에 객체를 추가               |
  |           | set(int index, E element)      | 주어진 인덱스의 객체를 새로운 객체로 바꿈 |
  | 객체 검색 | boolean contains(Object o)     | 주어진 객체가 저장되어 있는지 여부        |
  |           | E get(int index)               | 주어진 인덱스에 저장된 객체를 리턴        |
  |           | isEmpty()                      | 컬렉션이 비어 있는지 조사                 |
  |           | int size()                     | 저장되어 있는 전체 객체 수를 리턴         |
  | 객체 삭제 | void clear()                   | 저장된 모든 객체를 삭제                   |
  |           | E remove(int index)            | 주어진 인덱스에 저장된 객체를 삭제        |
  |           | boolean remove(Object o)       | 주어진 객체를 삭제                        |

### 1) ArrayList

- List 컬렉션에서 가장 많이 사용되는 클래스
- `가변길이`((제한 없이 객체를 추가할 수 있다))로 일반 배열과 차이점이 있다
- List컬렉션은 객체 자체를 저장하는 것이 아닌 <u>객체의 `번지(참조 주소)`를 저장</u>

- **특징**

  - 내부적으로는 배열로 데이터를 관리
  - 인덱스를 기반으로 빠른 검색이 가능
  - 중간 삽입/삭제는 느릴 수 있다 (LinkedList보다 비효율적)

  ```java
  import java.util.ArrayList;
  import java.util.List;

  class Board{
  	private String subject;
  	private String content;
  	private String writer;

  	public Board(String s, String c, String w) {
  		subject = s;
  		content = c;
  		writer = w;
  	}

  	public String getSubject(){return subject;}
  	public void setSubject(String subject) {this.subject = subject;}
  	public String getContent(){return content;}
  	public void setContent(String content) {this.content = content;}
  	public String getWriter(){return writer;}
  	public void setWriter(String writer) {this.writer = writer;}
  }

  public class Test {
  	public static void main(String[] args) {
  		//ArrayList 컬렉션 생성
  		List<Board> list = new ArrayList<>();

  		//객체 추가
  		list.add(new Board("제목1", "내용1", "글쓴이1"));
  		list.add(new Board("제목2", "내용2", "글쓴이2"));
  		list.add(new Board("제목3", "내용3", "글쓴이3"));
  		list.add(new Board("제목4", "내용4", "글쓴이4"));
  		list.add(new Board("제목5", "내용5", "글쓴이5"));

  		//저장된 총 객체 수 얻기
  		int size = list.size();
  		System.out.println("총 객체 수: "+size);  //5 출력

  		//특정 인덱스의 객체 가져오기
  		Board board = list.get(2); //.get(n) = 주어진 인덱스에 저장된 객체 리턴(3번째)
  		System.out.println(board.getSubject()+" "+board.getContent()+" "+board.getWriter());

  		//모든 객체를 하나씩 가져오기
  		for(int i=0;i<list.size();i++) {
  			Board b = list.get(i);
  			System.out.println(b.getSubject()+" "+b.getContent()+" "+b.getWriter());
  		}

  		//객체 삭제
  		list.remove(2); //2번 인덱스를 삭제하면 3번 인덱스가 2번으로 변경됨
  		list.remove(2);

  		//향상된 for문으로 모든 객체를 하나씩 가져오기
  		for(Board b:list) {
  			System.out.println(b.getSubject()+" "+b.getContent()+" "+b.getWriter());
  		}
  	}
  }
  ```

  ```java
  public class Test {
  	public static void main(String[] args) {
  		//List Interface → <>
  		ArrayList<String> a = new ArrayList<String>();
  		a.add("화연"); //(new String("화연")) 가능. 객체이기 때문
  		a.add("승민");
  		a.add("승빈");
  		a.add("승빈"); //순서 유지, 중복 저장 가능

  		for(int i=0; i<a.size();i++) {
  			System.out.println(a.get(i)); //ArrayList에 있는 함수 get, add 사용
  		} //출력: 화연 승민 승빈 승빈
  	}
  }
  ```

  ```java
  class Profile{
  	String id;
  	int age;
  	Profile(String i, int a){
  		id = i;
  		age = a;
  	}
  }
  public class Test {
  	public static void main(String[] args) {
  		ArrayList<Profile> a = new ArrayList<Profile>(); //클래스명이 들어가도 됨

  		//arraylist에다 값 임의 값 3개 입력
  		a.add(new Profile("aa",12));  //[0]
  		a.add(new Profile("bb",17));  //[1]
  		a.add(new Profile("cc",15));  //[2]

  		for(int i=0;i<a.size();i++) {
  			Profile p = a.get(i);
  			System.out.println(p.id+" "+p.age);
  		}// 출력 aa 12  bb 17  cc 15
  	}
  }

  ```

  ```java
  public class Test {
  	public static void main(String[] args) {

  		ArrayList<String> a = new ArrayList<String>();
  		Scanner s = new Scanner(System.in);

  		for(int i=0; i<3; i++) {
  			a.add(s.next()); //입력한 문자열을 리스트에 삽입
  		}
  		for(int i=0; i<a.size(); i++) {
  			System.out.println(a.get(i));
  		}

  		int max = 0;
  		//piano computer java → 글자 길이를 셈
  		for(int i=1;i<a.size();i++) {
  			if(a.get(max).length() < a.get(i).length()) {
  				max = i;
  			}
  		}
  		System.out.println("글자가 제일 긴 문자: "+a.get(max));
  	}
  }
  ```

  <br/>

### 2) LinkedList

- ArrayList와 사용 방법 동일하나 내부 구조가 다르다
- 객체들을 <u>인접 객체를 체인처럼 연결</u>해서 관리 (Node 기반 구조)
- 빈번한 객체 삭제와 삽입이 일어나는 곳에서는 ArrayList보다 성능이 좋다
- 하지만 잘 사용하지 않는다 (개념만 알아두자)

  | 항목           | ArrayList                 | LinkedList                         |
  | -------------- | ------------------------- | ---------------------------------- |
  | 내부 구조      | 배열 (Array)              | 노드(Node) 체인 구조               |
  | 검색 속도      | 빠름 (인덱스로 바로 접근) | 느림 (앞에서부터 순차적으로 탐색)  |
  | 삽입/삭제 속도 | 느림 (배열 복사 필요)     | 빠름 (노드 연결만 수정)            |
  | 메모리 사용량  | 적음                      | 더 많음 (노드 연결 정보 추가 저장) |
  | 사용 상황      | 검색이 빈번할 때          | 삽입/삭제가 빈번할 때              |

  <br/>

### 3) Vector

- ArrayList와 동일한 내부 구조(배열기반, 멀티스레드가 아니면 같은 기능)
- 멀티 스레드 환경에서는 여러 스레드가 동시에 접근할 때 Vector가 더 안전
- Vector은 동기화된 메소드로 구성되어 있어 멀티 스레드가 동시에 Vector() 메소드 실행 불가
- 동기화 비용 때문에 단일 스레드 환경에서는 ArrayList보다 성능이 떨어진다

```java
public class Test {
	public static void main(String[] args) {

		Vector<Integer> v = new Vector<Integer>();

		v.add(new Integer(5));
		v.add(5);
		v.add(10);
		v.add(0,20); //인덱스 0에 20을 넣겠다 "위치 지정"

		System.out.println("백터 개수"+v.size()); //출력: 4

		for(int i=0; i<v.size(); i++) {
			System.out.println(v.get(i));
		} //출력: 20 5 5 10

	}
}
```

```java
import java.util.List;
import java.util.Vector;

class Board{
	private String subject;
	private String content;
	private String writer;

	public Board(String s, String c, String w) {
		subject = s;
		content = c;
		writer = w;
	}

	public String getSubject() {return subject;}
	public void setSubject(String s) {subject = s;}
	public String getContent() {return content;}
	public void setContent(String c) {content = c;}
	public String getWriter() {return writer;}
	public void setWriter(String w) {writer = w;}
}

public class Test {
	public static void main(String[] args) {

		//Vactor 컬렉션 생성
		List<Board> list = new Vector<>();

		//작업 스레드 객체 생성
		Thread threadA = new Thread(){
			@Override
			public void run(){
				for(int i=1; i<=1000 ; i++) { //객체 1000개 추가
					list.add(new Board("제목"+i, "내용"+i,"글쓴이"+i));
				}
			}
		};

		//작업 스레드 객체 생성
		Thread threadB = new Thread(){
			@Override
			public void run(){
				for(int i=1001; i<=2000 ; i++) { //객체 1000개 추가
					list.add(new Board("제목"+i, "내용"+i,"글쓴이"+i));
				}
			}
		};

		//작업 스레드 실행
		threadA.start();
		threadB.start();

		//작업 스레드들이 모두 종료될 때 까지 메인 스레드를 기다리게 함
		try {
			threadA.join();
			threadB.join();
		}catch(Exception e) {}

		//저장된 총 객체 수 얻기
		int size = list.size();
		System.out.println("총 객체 수: "+size); //출력: 2000
		System.out.println();

	}
}
```

  <br/>

### 4) iterator(List, Set 모두 사용)

- 반복자를 얻어 객체를 하나씩 가져옴
- 컬렉션에서는 for문으로 객체를 하나씩 가져오지 않고 iterator 사용

  | 리턴타입 | 메소드명  | 설명                                         |
  | -------- | --------- | -------------------------------------------- |
  | boolean  | hasNext() | 가져올 객체가 있으면 true 리턴, 없으면 false |
  | E        | next()    | 컬렉션에서 하나의 객체를 가져옴              |
  | void     | remove()  | next()로 가져온 객체를 Set 컬렉션에서 제거   |

  ```java
  while(iterator.hasNext()){
  	E e = interatior.next();
  }
  ```

  ```java
  public class Test {
  	public static void main(String[] args) {

  		ArrayList<Integer> list = new ArrayList<Integer>();
  		list.add(53);
  		list.add(4);
  		list.add(3);

  		Iterator<Integer> it = list.iterator(); //꼭 들어가야함!
  													//↑객체명.iterator();

  		while(it.hasNext()) { //hasNext() 가져올 값이 있는가
  			int n = it.next(); //다음 데이터를 n에 대입
  			System.out.println(n);
  		}//출력: 53 4 3

  	}
  }

  ```

## 2. Set 컬렉션

- List 컬렉션과 달리 Set 컬렉션은 <u>저장 순서 유지X</u>
- 객체를 <u>중복 저장 불가</u>
- 하나의 null 값 만 저장 가능
- 수학의 집합에 비유 됨(순서 상관X 중복 허용X)
- 인덱스(순서)로 관리하지 않기 때문에 인덱스를 매개 값으로 갖는 메소드 없음

  | 기능              | 메소드                     | 설명                                       |
  | ----------------- | -------------------------- | ------------------------------------------ |
  | 객체 추가         | boolean add(E e)           | 객체를 성공적으로 저장 true                |
  | 중복 객체면 flase |
  | 객체 검색         | boolean contains(Object o) | 주어진 객체가 저장되어 있는지 여부         |
  |                   | isEmpty()                  | 컬렉션이 비어있는지 조사                   |
  |                   | Iterator<E> iterator()     | 저장된 객체를 한 번씩 가져오는 반복자 리턴 |
  |                   | int size()                 | 저장되어 있는 전체 객체 수 리턴            |
  | 객체 삭제         | void clear()               | 저장된 모든 객체를 삭제                    |
  |                   | boolean remove(Object o)   | 주어진 객체를 삭제                         |

### HashSet

- Set 컬렉션 중 <u>가장 많이 사용</u>됨
- 동일한 객체를 <u>중복 저장하지 않음</u>
- 다른 객체라도 `hashCode()`메소드의 <u>리턴값이 같고</u>, `equals()`메소드가 <u>true를 리턴</u>하면 `동일한 객체로 판단`하고 `중복 저장하지 않음`
- Set 컬렉션은 인덱스로 객체를 검색해 가져오는 메소드 없다  
  ➔ 대신 iterator(반복자)를 통해 객체를 한 개씩 반복해서 가져옴

  1. for문 이용
  2. iterator() 메소드 사용: 반복자를 얻어 객체를 하나씩 가져옴

     ```java
     public class Test {
     	public static void main(String[] args) {
     		//HashSet 컬렉션 생성
     		Set<String> set = new HashSet<String>();

     		//객체 추가 4개값 Set에 저장
     		set.add("Java");
     		set.add("JDBC");
     		set.add("JSP");
     		set.add("Spring");

     		//객체를 하나씩 가져와 처리
     		Iterator<String> it = set.iterator();
     		while(it.hasNext()) {
     			//객체를 하나 가져오기
     			String element = it.next();
     			System.out.println(element);
     			if(element.equals("JSP")){
     				//가져온 객체를 컬렉션에서 제거
     				it.remove();
     			}
     		}

     		//객체 제거
     		set.remove("JDBC");

     		//객체를 하나씩 가져와 처리
     		for(String element : set) {
     			System.out.println(element);
     		}
     	}
     }
     ------------------------------------
     Java JSP JDBC Spring Java Spring
     ```

     ```java
     class Num{
     	int n;

     	Num(int n){this.n = n;}

     	//이 메소드 없으면 it.next()가 코드로 출력됨!
     	public String toString() {
     		return n+" "; //int인데 String으로 들어가려면 " " 붙여줘야함
     	}
     }

     public class Study {
     	public static void main(String[] args) {
     		Set<Num> h = new HashSet<Num>();
     											//↑앞에 <Num>넣어서 HashSet()으로 적어도 O.
     		h.add(new Num(30));
     		h.add(new Num(60));
     		h.add(new Num(40));
     		h.add(new Num(60)); //hashCode와 equals가 없으면 중복저장 판단 못함

     		Iterator<Num> it = h.iterator();
     		while(it.hasNext()) {
     			System.out.println(it.next());
     		}
     	}
     }
     -------------------------------------------------------
     40 60 60 30
     ```

## 3. Map 컬렉션

- <u>키와 값으로 구성</u>된 엔트리 객체 저장
- `키`는 <u>중복 저장 불가</u>지만 `값`은 <u>중복 저장 가능</u>

<p align="center">
  <img src="/assets/images/Java/11-2.png" width="400">
</p>

- HashMap을 자주 사용
- 키로 객체들을 관리. 키를 매개값으로 하는 메소드가 많음

  | 기능      | 메소드                              | 설명                                                          |
  | --------- | ----------------------------------- | ------------------------------------------------------------- |
  | 객체 추가 | v put(K Key, V value)               | 키와 값을 추가, 저장되면 값 리턴                              |
  | 객체 검색 | boolean containsKey(Object key)     | 키가 있는지 여부                                              |
  |           | boolean containsValue(Object value) | 값이 있는지 여부                                              |
  |           | set<Map.Entry<K,V>> entrySet()      | 키와 값의 쌍으로 구성된 모든 Map.Entry 객체를 Set에 담아 리턴 |
  |           | V get(Object Key)                   | 키의 값 리턴                                                  |
  |           | boolean isEmpty()                   | 컬렉션이 비어있는지 여부                                      |
  |           | Set<K> KeySet()                     | 모든 키를 Set 객체에 담아 리턴(키 집합)                       |
  |           | int size()                          | 저장된 키의 총 수 리턴                                        |
  |           | Collection<V> values()              | 저장된 모든 값 Collection에 담아 리턴                         |
  | 객체 삭제 | void clear()                        | 모든 Map.Entry(키와 값) 삭제                                  |
  |           | V remove(Object key)                | 주어진 키와 일치하는 Map.Entry 삭제, 삭제가 되면 값 리턴      |

### 1) HashMap

- `키(key)`로 사용할 객체가 hashCode() 메소드의 리턴값이 같고 equals() 메소드가 true를 리턴할 경우, **동일 키로 보고 중복 저장 X**

  ```java
  Map<String, Integer> map = new HashMap <String, Integer> ();
  Map<String, Integer> map = new HashMap <> ();
  ```

  ```java
  public class Test {
  	public static void main(String[] args) {
  		HashMap<Integer, String> h = new HashMap<>();

  		h.put(1, "수정"); //맵에 키, 값 삽입
  		h.put(2, "지현");
  		//p656
  		System.out.println(h.get(1)); //key값이 1인 값(value) 찾기. 수정
  		System.out.println(h.get(2)); //지현 출력
  	}
  }
  ```

  ```java
  public class Test {
  	public static void main(String[] args) {
  		HashMap<String, String> h = new HashMap<>();

  		h.put("물", "water");
  		h.put("커피", "coffe");
  		h.put("티", "tea");

  		Set<String> keys=h.keySet(); //p656 키들의 집합(물, 커피, 티)
  		//↑ 키들은 중복되면 안되니까 Set으로 받음

  		Iterator<String> it = keys.iterator(); //키 반복자를 이용

  		while(it.hasNext()) {
  			String a = it.next(); //a에 키 값 저장
  			String b = h.get(a); //키에 맞는 value값이 나옴
  			System.out.println(a+" "+b); //순서유지 안됨
  		}
  	}
  }
  ```

  ```java
  public class Test {
  	public static void main(String[] args) {
  		//Map 컬렉션 생성
  		Map<String, Integer> map = new HashMap<>();

  		//객체 저장
  		map.put("신용권", 85);
  		map.put("홍길동", 90);
  		map.put("동장군", 80);
  		map.put("홍길동", 95); //키가 같으면 가장 마지막에 저장한 값(value)만 저장
  		System.out.println("총 Entry 수: "+map.size()); //출력:3

  		//키로 값 얻기
  		String key = "홍길동";
  		int value = map.get(key); //키를 매개값으로 값을 리턴
  		System.out.println(key+": "+value); //출력:홍길동: 95

  		//키 Set 컬렉션을 얻고, 반복해서 키와 값을 얻기
  		Set<String> keySet = map.keySet(); //키를 반복하기 위해 반복자를 얻음
  		Iterator<String> keyIt = keySet.iterator();
  		while(keyIt.hasNext()) {
  			String k = keyIt.next();
  			Integer v = map.get(k);
  			System.out.println(k+": "+v);
  		}

  		//엔트리 Set 컬렉션을 얻고, 반복해서 키와 값을 얻기
  		Set<Entry<String, Integer>>entrySet = map.entrySet();
  		Iterator<Entry<String, Integer>> entryIt = entrySet.iterator();
  		while(entryIt.hasNext()) {
  			Entry<String, Integer> entry = entryIt.next();
  			String k = entry.getKey();
  			Integer v = entry.getValue();
  			System.out.println(k+": "+v);
  		}

  		//키로 엔드리 삭제
  		map.remove("홍길동");
  		System.out.println("총 Entry 수: "+map.size());
  	}
  }
  ```

### 2) Hashtable

- Map에서 제일 안쓰임(HashMap을 더 많이 씀)
- HashMap과 동일한 내부 구조
- 동기화된 메소드로 구성, 멀티 스레드가 동시에 Hashtable의 메소드 실행 X
- 멀티 스레드 환경에서도 안전하게 객체를 추가, 삭제 가능

## 4. 검색 기능을 강화시킨 컬렉션

- TreeSet : 중복 없이 정렬된 데이터를 저장할 때 사용
- TreeMap :

### 1) TreeSet

- <u>이진 트리(binary tree)</u> 기반 Set 컬렉션
- 한 노드는 최대 2개 노드를 가질 수 있다
- 부모보다 작은 값은 왼쪽 자식 노드에, 높은건 오른쪽 자식 노드에 저장  
  ➔ 정렬된 상태로 데이터가 저장(오름차순)

<p align="center">
  <img src="/assets/images/Java/11-3.png" width="400">
</p>

| 리턴타입   | 메소드      | 설명                                |
| ---------- | ----------- | ----------------------------------- |
| E(Element) | first()     | 제일 낮은 객체 리턴                 |
| E          | last()      | 제일 높은 객체 리턴                 |
| E          | lower(E e)  | 주어진 객체보다 바로 아래 객체 리턴 |
| E          | higher(E e) | 주어진 객체보다 바로 위 객체 리턴   |

### 2) TreeMap

- <u>이진 트리(binary tree) 기반</u> Map 컬렉션
- TreeSet과 차이점
  - TreeSet은 "값" 만 저장
  - TreeMap은 "키(key) + 값(value)" 을 묶음(Entry) 으로 저장
- 엔트리 저장시 키를 기준으로 정렬되어 저장(오름차순)
- 부모보다 낮은건 왼쪽, 높은건 오른쪽 자식 노드에 저장

## 5. Comparable과 Comparator

### 1) Comparable

- TreeSet에 저장되는 객체와 TreeMap에 저장되는 **키 객체는 저장과 동시에 오름차순 정렬**
- 어떤 객체든 정렬X. **객체가 Comparable 인터페이스를 구현**하고 있어야 함
- Integer, Double, String 타입은 모두 Comparable 구현하고 있어 상관X
- `사용자 정의 객체` ➔ 직접 Comparable 인터페이스를 구현하고, compareTo() 메소드를 오버라이딩해야 함
- **Comparable인터페이스에는 compareTo() 메소드가 정의되있어야 함(정수값 리턴)**

  | 리턴 타입      | 메소드         | 설명                                                                                               |
  | -------------- | -------------- | -------------------------------------------------------------------------------------------------- |
  | int            | compareTo(T o) | 주어진 객체와 같으면 0 <br> 적으면 음수 <br> 크면 양수 리턴 <br> (=> 이 값으로 정렬 방향이 결정됨) |
  | → 매개변수 1개 |                |                                                                                                    |

  - 예제

    ```java
    import java.util.Iterator;
    import java.util.TreeSet;

    class Pro implements Comparable<Pro>{ //implements Comparable<T>가 있어야 함
    	String a; int b;

    	Pro(String a, int b){
    		this.a = a; this.b= b;
    	}

    	void show() {
    		System.out.println(a+" "+b);
    	}
    	@Override
    	public int compareTo(Pro p) { //Comparable 인터페이스에 있는 메소드 반드시 오버라이드
    		if(b > p.b) { //객체 안의 2개의 값을 비교(Set이라 순서는 없음). 작은게 먼저나오도록!
    			return 1; //매개변수로부터 b값이 작으면 양수(부등호가 반대면 내림차순이 됨)
    		}else if(b < p.b){ //텍스트여도 정렬 가능. ㄱㄴㄷ or abc순으로 정렬됨
    			return -1;
    		}else {
    			return 0;
    		}
    	}
    }

    public class Test {
    	public static void main(String[] args) {
    		TreeSet<Pro> t = new TreeSet<Pro>();
    		t.add(new Pro("cc", 128));
    		t.add(new Pro("aa", 123));
    		t.add(new Pro("bb", 125));

    		Iterator<Pro> it = t.iterator();
    		while(it.hasNext()) {
    			it.next().show();  //정수값 오름차순 출력
    		}
    	}
    }
    ```

### 2) Comparator

- 원칙적으로 TreeSet과 TreeMap에 저장할 객체는 Comparable(비교기능O)을 구현해야 함
- 비교 기능이 없는 Comparable 비구현 객체를 저장할 수도 있긴 함
- TreeSet과 TreeMap을 생성할 때는 비교자(Comparator)를 다음과 같이 제공하면 됨

  ```java
  TreeSet<E> treeSet = new TreeSet<E>( new ComparatorImpl() );
  																							↕ 비교자
  TreeSet<K,V> treeMap = new TreeMap<K,V>( new ComparatorImpl() );
  ```

  | 리턴 타입      | 메소드              | 설명                                                                                                  |
  | -------------- | ------------------- | ----------------------------------------------------------------------------------------------------- |
  | int            | compare(T o1, T o2) | 주어진 객체와 같으면 0 리턴 <br> 주어진 객체보다 적으면 음수 리턴 <br> 주어진 객체보다 크면 양수 리턴 |
  | → 매개변수 2개 |                     |

|

### 5. LIFO와 FIFO 컬렉션

- `LIFO`: Last In First Out. <u>후입선출 (stack)</u>
- `FIFO`: Firsy In First out. <u>선입선출 (queue)</u>

---

## 기출문제

- ArrayList에 0~100사이의 임의의 정수 10개를 삽입하고 모두 출력해라. 출력할때는 Iterator인터페이스를 사용해서 출력해라.

  ```java
  mport java.util.ArrayList;
  import java.util.Iterator;
  import java.util.List;

  public class Test {
  	public static void main(String[] args) {

  		ArrayList<Integer> list = new ArrayList<>();

  		for(int i=0; i<10; i++) {
  			list.add((int)(Math.random()*101));
  		}

  		Iterator<Integer> it = list.iterator();

  		while(it.hasNext()) {
  			System.out.println(it.next());
  		}

  	}
  }
  ```

- HashSet에 Person객체를 저장한다. 학번이 같으면 동일한 Person객체라 판단하고 중복 저장이 되지 않도록 하게 코드를 작성해라.

  ```java
  class Person {
  	int num;
  	String name;

  	Person(int num, String name) {
  		this.num = num;
  		this.name = name;
  	}

  	public int hashCode() {
  		return num;
  	}

  	public boolean equals(Object obj) {
  		Person per = (Person) obj;
  		if (per.num == this.num) {
  			return true;
  		} else {
  			return false;
  		}
  	}
  }

  public class Test {
  	public static void main(String[] args) {
  		Set<Person> s = new HashSet<Person>();

  		s.add(new Person(12, "홍길동"));
  		s.add(new Person(23, "김길동"));
  		s.add(new Person(12, "이길동"));

  		Iterator<Person> it = s.iterator();

  		while (it.hasNext()) {
  			Person p = it.next();
  			System.out.println(p.num + " " + p.name);
  		}
  	}
  }

  ```

- Map만들어 이름, 나이 저장해서 이름과 일치하는 나이 출력해라.

  ```java
  public class Test {
  	public static void main(String[] args) {

  		Scanner s = new Scanner(System.in);

  		HashMap<String, Integer> m = new HashMap<>();
  		System.out.println("입력할 사람의 수");
  		int n = s.nextInt();

  		for(int i=0; i<n; i++) {
  			System.out.println("이름과 나이 입력");
  			String name = s.next();
  			int age = s.nextInt();
  			m.put(name, age);
  		}

  		Set<String> keys = m.keySet();

  		Iterator<String> it = keys.iterator();

  		while(it.hasNext()) {
  			String a = it.next();
  			int b = m.get(a);
  			System.out.println(a+" "+b);
  		}
  	}
  }
  ```

- HashMap을 이용한 id,pw 입력, 로그인

  ```java
  public class Test {
  	public static void main(String[] args) {
  		HashMap<String, String> h = new HashMap<>();

  		h.put("jy","123");
  		h.put("sy","234");
  		h.put("yj","345");

  		Scanner s = new Scanner(System.in);

  		while(true) {
  			System.out.println("id, pw 입력");
  			String id = s.next();
  			String pw = s.next();

  			if(!h.containsKey(id)) {  //key값이 있는지 boolean값으로 return
  			//  ↑내가 입력한 id가 해시맵에 없는 경우
  				System.out.println("id가 존재하지 않습니다");
  				continue; //다시 입력하도록
  			}else { //id가 해시맵에 있는 경우
  				if(!h.get(id).equals(pw)) { //id를 기준으로 pw 가져옴. pw가 틀릴경우
  					System.out.println("비밀번호가 일치하지 않습니다");
  				}else { //id, pw 모두 맞음
  					System.out.println("로그인");
  					break;
  				}
  			}
  		}
  	}
  }

  ```

- 단어 찾는 HashMap 작성

  ```java
  public class Test {
  	public static void main(String[] args) {
  		//HashMap<문자열, 문자열> 객체 생성
  		HashMap<String, String> h = new HashMap<String, String>();

  		h.put("computer","컴퓨터");
  		h.put("coffe","커피");
  		h.put("cream","크림");

  		//키값들을 set에 받아오겠다
  		Set<String> key = h.keySet();

  		//Iterater 객체 생성
  		Iterator<String> it = key.iterator();
  		while(it.hasNext()) {
  			String k = it.next(); //computer
  			String v = h.get(k); //컴퓨터
  			System.out.println(k+" "+v);
  		}

  		Scanner s = new Scanner(System.in);

  		for(int i=0;i<3;i++){
  			System.out.println("찾을 단어는?");
  			String str = s.next(); //키에 해당하는 영문자 작성
  			String str2 = h.get(str);
  			if(str2==null) {
  				System.out.println(str+"은 없는단어");
  			}else{
  				System.out.println(str2);
  			}
  		}
  	}
  }
  ```

- Set<Map.Entry<K, V>> 사용 예제

  ```java
  public class Test {
  	public static void main(String[] args) {
  		Map<Integer, Double> m = new HashMap<>();

  		m.put(2,4.5);
  		m.put(3,3.5);
  		m.put(4,4.5);

  		Set<Map.Entry<Integer, Double>> s = m.entrySet();
  		for(Map.Entry<Integer, Double> m1 : s) {
  			System.out.println(m1.getKey()); //.getKey() = key값 얻는 함수
  			System.out.println(m1.getValue());
  		}
  	}
  }
  ```

- HashMap으로 이름과 나이를 입력 받아 3명의 값을 저장한다.
  저장한 후 나이가 가장 많은 사람의 이름을 출력해라

  ````java
  public class Test {
  public static void main(String[] args) {
  Scanner s = new Scanner(System.in);
  int max = 0;
  String maxName="";

      		Map<String, Integer> m = new HashMap<>();

      		for(int i=0; i<3; i++) {
      			System.out.println("이름과 나이 입력");
      			String name = s.next();
      			int age = s.nextInt();
      			m.put(name, age);
      		}

      		//나이 값 가져옴 → 나이 = value, key값에 맞게 가져와야 함
      		Set<String> key = m.keySet(); //name값 이름만 담음
      		Iterator<String> it = key.iterator();

      		while(it.hasNext()) {
      			String name = it.next();
      			if(max < m.get(name)) {
      				max = m.get(name);
      				maxName = name;
      			}
      		}
      		System.out.println(maxName);
      	}
      }
      ---------------------------------------------
      //while문 좀 다르게
      while(it.hasNext()) {
      	String name = it.next(); //이름
      	int age = m.get(name); //이름에 맞는 나이

      	if(max < age)) {
      		max = age;
      		maxName = name;
      			}
      		}
      ```

  ````

- main(){
  int[][] ary=new int[3][3];
  high(ary,3,3);
  }주고 정수 입력 받아high라는 함수 안에서 입력한 수 중 최대 값 구해라.

  ```java
  public class Test {

  	static void high(int ary[][], int a, int b) {
  		Scanner s = new Scanner(System.in);
  		int max = 0;

  		for(int i=0;i<a;i++) {
  			for(int j=0;j<b;j++) {
  				ary[i][j] = s.nextInt();
  				if(max < ary[i][j]) { //for대신 max = Math.max(max, ary[i][j]);으로 해도 됨
  					max = ary[i][j];
  			}
  		}
  		System.out.println(max);
  	}

  	public static void main(String[] args) {
  		int[][] ary=new int[3][3];
  		high(ary,3,3);
  	}
  }
  ```

- ArrayList에“one”,”two”,”three”를 저장한다. 저장 후 Iterator로 반복한 후(while) “three”라는 단어가 보이면(comepareTo 함수 사용) 삭제해라.

  ```java
  public class Test {
  	public static void main(String[] args) {
  		ArrayList<String> a = new ArrayList<>();
  		a.add("one");
  		a.add("two");
  		a.add("three");

  		Iterator<String> it = a.iterator();

  		while(it.hasNext()) {
  			String b = it.next();
  			if(b.compareTo("three")==0) {
  				it.remove();
  			}
  		}
  		System.out.println(a);
  	}
  }
  ```

- HashMap에 (1,”one”),(2,”two”),(3,”three”)를 저장하여 키, 값을 다 출력한다. 출력 후, 1을 입력하면 one, 2를 입력하면 two, 3을 입력하면 three가출력될수있게끔코드를작성해라.

  ```java
  public class Test {
  	public static void main(String[] args) {

  		Scanner s = new Scanner(System.in);
  		HashMap<Integer, String> m = new HashMap<>();

  		m.put(1, "one");
  		m.put(2, "two");
  		m.put(3, "three");

  		Set<Integer> key = m.keySet();
  		Iterator<Integer> it = key.iterator();

  		while(it.hasNext()) {
  			int num = it.next();
  			String str = m.get(num);
  			System.out.println(num+" "+str);
  		}

  		System.out.println("숫자 입력");
  		int n = s.nextInt();
  		System.out.println(m.get(n));

  	}
  }

  ```
