---
layout: single
title: "네트원크 입출력"
categories: Java
tag: [Java]
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

# 1. 네트워크 기초

## 서버와 클라이언트

- 프로그램들은 네트워크에 컴퓨터가 연결된 경우 실제로 데이터를 주고받는 행위를 한다
- `서버(server)`: 서비스를 제공하는 프로그램
- `클라이언트(client)`: 서비스를 요청하는 프로그램

## IP와 Port 번호

- `IP 주`소: 네트워크 상에서 유일하게 식별 될 수 있는 컴퓨터 주소
  숫자로 된 주소는 기억하기 어려우므로 www.naver.com과 같은 문자열로 구성된 도메인 이름으로 바꿔 사용
- `Port 번호`: 운영체제가 관리하는 서버 프로그램의 연결 번호
  - 웹 서버(80), FTP 서버(21), DBMS(1521)

# 2. IP 주소 얻기

- `InetAddress`를 이용하면 <u>로컬 컴퓨터의 IP 주소를 얻을 수 있음</u>

  ```java
  import java.net.InetAddress;
  import java.net.UnknownHostException;

  public class Test {
  	public static void main(String[] args) {

  		try {
  			InetAddress local = InetAddress.getLocalHost();
  			System.out.println("내 컴퓨터 IP 주소: "+local.getHostAddress());

  			InetAddress[] iaArr = InetAddress.getAllByName("www.naver.com");
  			for(InetAddress remote : iaArr) {
  				System.out.println("www.naver.com IP 주소: "+remote.getHostAddress());
  			}
  		}catch(UnknownHostException e) {
  				e.printStackTrace();
  			}
  	}
  }
  -------------------------------------------
  내 컴퓨터 IP 주소: 192.168.0.24
  www.naver.com IP 주소: 223.130.200.236
  www.naver.com IP 주소: 223.130.192.248
  www.naver.com IP 주소: 223.130.192.247
  www.naver.com IP 주소: 223.130.200.219
  ```

# 3. TCP 네트워킹

## TCP/IP 프로토콜(전송제어 프로토콜)

- TCP는 연결형 프로토콜로, 상대방이 연결된 상태에서 데이터를 주고받음

  ```
   클라이언트 연결 요청 → 서버가 연결 수락 → 통신회선 고정 → 데이터가 고정 회선을 통해 전달(Stream을 통해 전달)
  ```

- 두 시스템 간에 데이터가 손상없이 안전하게 전송(신뢰전송)되도록 하는 통신 프로토콜TCP에서 동작하는 응용프로그램 (전송 실패 시 알림이 옴)  
  ex) e-mail, FTP, 웹(HTTP) 등

- 특징: `연결형 통신`
  - <u>한 번 연결 후 계속 데이터 전송 가능</u>
  - <u>보낸 순서대로 받아</u> 응용프로그램에게전달
  - 단점: <u>느림</u> → 재생이 필요한 경우 UDP 사용
- 자바는 TCP 네트워킹을 위해 `java.net 패키지`에서 `ServerSocket`과 `Socket 클래스` 제공

  - `ServerSocket`: <u>클라이언트의 연결을 수락</u>하는 서버 쪽 클래스
  - `Socket`: 클라이언트에서 연결 요청할 때 + 클라이언트와 서버 양쪽에서 데이터를 주고 받을 때 사용되는 클래스

    <p align="center">
    <img src="/assets/images/Java/14-1.png" width="400">
    </p>

    - ServerSocket 생성 시 바인딩 할 Port 번호 지정 필요
    - ServerSocket은 accept() 메소드로 연결 수락, 통신용 Socket 생성(메세지를 보내고자)

## TCP 서버

- TCP 서버 프로그램 개발 과정

  1.  ServerSocket 객체 생성

      ```java
      ServerSocket serverSocket = new ServerSocket(50001);
      //또는 port바인딩을 위해 bind()메소드 호출
      ServerSocket serverSocket = new ServerSocket();
      ServerSocket.bind(new InetSocketAddress(50001)); //ip주소, 포트번호 연결
      ```

  2.  **ServerSocket이 생성되었다면 연결 요청 수락을 위해 accept() 메소드 실행**
      accep()는 클라이언트가 연결 요청하기 전까지 블로킹
      `java
Socket socket = serverSocket.accept(); //socket에 저장
`
  3.  서버 종료

      ```java
      serverSocket.close();
      ```

## TCP 클라이언트

- **클라이언트가 서버에 연결 요청을 하려면 Socket 객체를 생성할 때 생성자 매개값으로 서버 IP주소와 Port번호를 제공하면 됨**

```java
Socket socket = new Socket("IP", 50001);
```

## 입출력 스트림으로 데이터 주고 받기

- 클라이언트가 연결요청(connect())을 하고 서버가 연결 수락(accept())했다면, 양쪽의 Socket 객체로부터 각각 입력 스트림(InputStream)과 출력 스트림(OutputStream)을 얻을 수 있음

 <p align="center">
<img src="/assets/images/Java/14-2.png" width="400">
</p>

- 상대에게 데이터 보낼 때 byte[] 배열 생성 → 매개값으로 OutputStream의 write() 메소드 호출하는 방법
  ```java
  String data = "보낼 데이터";
  byte[] Byte = data.getBytes("UTF-8");
  OutputStream os = socket.getOutputStream();
  os.write(bytes);
  os.flush();
  ```
- (더 자주쓰는 방법) 문자열을 간편하게 보낼 경우 보조 스트림(DataOutputStream)을 연결
  ```java
  String data = "보낼 데이터";
  DataOutputStream dos = new DataOutputStream(socket.getOutputStream());
  os.writeUTF(data);
  os.flush();
  ```

# 3. 소켓 프로그래밍

- **소켓을 이용한 서버 클라이언트 통신 프로그램의 전형적인 구조**

  <p align="center">
  <img src="/assets/images/Java/14-3.png" width="400">
  </p>

- **소켓이 만들어지는 과정(3-way handshake)**

  <p align="center">
  <img src="/assets/images/Java/14-4.png" width="400">
  </p>

### 과정 상세

1.  **(Server)** : 서버소켓 생성

    ```java
    import java.io.IOException;
    import java.net.ServerSocket;

    public class Server {
    	public static void main(String[] args) {
    		ServerSocket serverSocket = null;

    		try {
    			serverSocket = new ServerSocket(9999); //서버소켓 객체 생성(포트번호만 적어둠)
    			System.out.println("서버 기다리는 중..."); //서버는 Client가 요청하기 전까지 기다림
    		}catch(IOException e) {
    			e.printStackTrace();
    		}
    	}
    }
    ```

2.  **(Client)** : Client에서 서버 ip, port 번호로 접속 시도

    ```java
    import java.net.Socket;

    public class Client {
    	public static void main(String[] args) {
    		try {
    			Socket socket = new Socket("127.0.0.1",9999); //ip주소, 포트번흐
    			System.out.println("연결 성공!!"); //서버가 수락해야 연결됨
    		}catch(Exception e) {
    			e.printStackTrace();
    		}
    	}
    }
    ```

3.  **(Server)** : ServerSocket(accept)
4.  **소켓 생성** Socket

    ```java
    import java.io.IOException;
    import java.net.ServerSocket;
    import java.net.Socket;

    public class Server {
    	public static void main(String[] args) {

    		ServerSocket serverSocket = null;

    		try {
    			serverSocket = new ServerSocket(9999); //1. 서버소켓 생성
    			System.out.println("서버 기다리는 중...");
    		}catch(IOException e) {
    			e.printStackTrace();
    		}

    		while(true) {
    			try {
    				Socket socket = serverSocket.accept(); //3. 클라이언트 요청 수락, 4. 소켓생성
    				System.out.println("클라이언트와 연결 성공!!");
    			}catch(IOException e) {
    				e.printStackTrace();
    			}
    		}
    	}
    }
    ```

5.  **(Client)** : 메세지 보내기

- DataOutputStream dos = new DataOutputStream(out);

  ```java
  import java.io.DataOutputStream;
  import java.io.OutputStream;
  import java.net.Socket;
  import java.util.Scanner;

  		public class Client {
  			public static void main(String[] args) {

  				try {
  					Socket socket = new Socket("127.0.0.1",9999); //2. 서버에게 연결 요청
  					System.out.println("연결 성공!!"); //서버가 수락해야 연결됨

  					Scanner s = new Scanner(System.in);
  					String msg = s.nextLine(); //키보드에 메세지 입력

  					//데이터 전송, 읽어오기 위해 socket 필요!
  					OutputStream out = socket.getOutputStream(); //소켓에서 메세지를 얻음(get)
  					DataOutputStream dos = new DataOutputStream(out);
  					dos.writeUTF(msg);
  				}catch(Exception e) {
  					e.printStackTrace();
  				}
  			}
  		}
  ```

6.  **(Server)** : 메시지 읽기 및 보내기
    DataInputStream dis = new DataInputStream(in);

    ````java
    import java.io._;
    import java.net._;

        public class Server {
        	public static void main(String[] args) {

        		ServerSocket serverSocket = null;

        		try {
        			serverSocket = new ServerSocket(9999); //1. 서버소켓 생성
        			System.out.println("서버 기다리는 중...");
        		}catch(IOException e) {
        			e.printStackTrace();
        		}

        		while(true) {
        			try {
        				Socket socket = serverSocket.accept(); //3. 클라이언트 요청 수락
        													   //4. 소켓생성
        				System.out.println("클라이언트와 연결 성공!!");

        				//클라이언트가 보낸 메세지 읽기
        				InputStream in = socket.getInputStream();
        				DataInputStream dis = new DataInputStream(in);
        				String msg = dis.readUTF();

        				//서버에서 클라이언트로 메세지 보내기
        				OutputStream out = socket.getOutputStream(); //소켓에서 메세지를 얻음(get)
        				DataOutputStream dos = new DataOutputStream(out);
        				dos.writeUTF(msg+"서버가 보내요~");

        				//끝내기. 마지막꺼부터 닫하줌
        				dos.close();
        				dis.close();
        				socket.close();
        				System.out.println("소켓닫음");
        			}catch(IOException e) {
        				e.printStackTrace();
        			}
        		}
        	}
        }
        ```

    ````

7.  **(Client)** 서버에서 보낸 메세지 읽기

    ```java
    import java.io.*;
    import java.net.Socket;
    import java.util.Scanner;

    public class Client {
    	public static void main(String[] args) {
    		try {
    			Socket socket = new Socket("127.0.0.1",9999); //2. 서버에게 연결 요청
    			System.out.println("연결 성공!!"); //서버가 수락해야 연결됨

    			Scanner s = new Scanner(System.in);
    			String msg = s.nextLine(); //키보드에 메세지 입력

    			//데이터 전송, 읽어오기 위해 socket 필요!
    			OutputStream out = socket.getOutputStream(); //소켓에서 메세지를 얻음(get)
    			DataOutputStream dos = new DataOutputStream(out);
    			dos.writeUTF(msg);

    			//서버에서 전송한 메세지 읽고 출력
    			InputStream in = socket.getInputStream();
    			DataInputStream dis = new DataInputStream(in);
    			System.out.println(dis.readUTF());

    			//끝내기
    			dis.close();
    			dos.close();
    			socket.close();
    			System.out.println("소켓닫음");
    		}catch(Exception e) {
    			e.printStackTrace();
    		}
    	}
    }

    ```

- 실행(이클립스, 관리자모드 cmd에서 확인 가능)

1.  관리자모드 cmd 실행 후 폴더에 접근
    (폴더 경로는 패키지가 들어있는 폴더 우클릭 → Properties 선택 시 확인가능)

<p align="center">
<img src="/assets/images/Java/14-5.png" width="400">
</p>

2.  서버와 클라이언트 연결
    서버 기다리는 중.. 다음에 java client 실행 시 클라이언트와 연결 성공!!이 뜸

<p align="center">
<img src="/assets/images/Java/14-6.png" width="400">
</p>

3.  메세지 주고받기

<p align="center">
<img src="/assets/images/Java/14-7.png" width="400">
</p>

### 과정2

 <p align="center">
<img src="/assets/images/Java/14-8.png" width="400">
</p>

- **server**

  ```java
  import java.io.InputStream;
  import java.io.InputStreamReader;
  import java.io.OutputStream;
  import java.net.InetSocketAddress;
  import java.net.ServerSocket;
  import java.net.Socket;

  public class Server2 {
  	public static void main(String[] args) {
  		//1. 서버소켓 객체생성
  		ServerSocket ser = null;
  		try {
  			ser = new ServerSocket();
  			ser.bind(new InetSocketAddress("localhost",5001));
  										//  ↑ 2. 서버소켓과 서버소켓이 연결된 ip주소와 포트번호
  			while(true) {
  				System.out.println("연결기다리는 중..");

  				Socket so = ser.accept(); //5. 연결요청을 수락하며 소켓 생성

  				//7. client에서 보낸 메세지 읽기
  				byte[] b = null;
  				String msg = null;

  				InputStream in = so.getInputStream();
  				b=new byte[100];
  				int r = in.read(b);
  				msg=new String(b,0,r,"UTF-8"); //메세지 바이트 배열 읽기(b배열을 0부터 r까지)
  				System.out.println("데이터 받기 성공"); //바이트 배열을 문자열로 바꿈

  				//8. 클라이언트에게 메세지 보내기
  				OutputStream os = so.getOutputStream();
  				msg = "Hi Client";
  				b=msg.getBytes("UTF-8");
  				os.write(b);
  				System.out.println("데이터 보내기 성공");

  				//9. 종료
  				os.close();
  				in.close();
  				so.close();
  				ser.close();
  			}
  		}catch(Exception e) {}
  	}
  }
  ```

- client

  ```java
  import java.io.InputStream;
  import java.io.OutputStream;
  import java.net.InetSocketAddress;
  import java.net.Socket;

  public class Client2 {
  	public static void main(String[] args) {
  		//3. 소켓생성
  		Socket s = null;

  		try {
  			s = new Socket();
  			System.out.println("연결 요청");
  			s.connect(new InetSocketAddress("localhost",5001)); //4.연결
  			System.out.println("연결 성송");

  			//6. 서버에 메세지 보내기(배열 사용 or DataOutputStream)
  			byte[]b = null;
  			String msg = null;

  			OutputStream os = s.getOutputStream(); //Stream은 바이트 단위라 byte로 변환해서 넣어야함
  			msg = "Hi Server";
  			b=msg.getBytes("UTF-8"); //문자열 → byte
  			os.write(b);
  			System.out.println("데이터 보내기 성공");

  			//9. Server에서 보낸 메세지 읽기
  			InputStream in = s.getInputStream();
  			b=new byte[100];
  			int r = in.read(b);
  			msg=new String(b,0,r,"UTF-8"); //메세지 바이트 배열 읽기(b배열을 0부터 r까지)
  			System.out.println("데이터 받기 성공"); //바이트 배열을 문자열로 바꿈

  			//10.종료
  			in.close();
  			os.close();
  			s.close();
  		}catch(Exception e) {}
  	}
  }
  ```

### 4. UDP 네트워킹 (User Datagram Protocol)

- TCP와 함께 대표적인 전송 계층 프로토콜
- `비연결형(Connectionless) 통신` : 데이터를 보내기 전에 연결을 설정하지 않고 바로 전송
- <u>패킷(Packet, datagram) 단위</u>로 데이터를 전송

- **특징**

  - TCP보다 데이터 전송 속도가 빠름: 연결을 맺고(3handshake) 확인(ACK) 하지않고 바로 전송
  - 신뢰성 X: 전송한 데이터가 유실되거나 순서가 바뀌어도 보장 하징낳음(재전송X, 수신여부 확인X)
  - 적은 오버헤드: 신뢰성이 없는 단순한 구조
  - 순서를 보장하지 않음
  - 신속한 전송이 중요한 경우 사용

- **TCP와 UDP 비교**

  | 항목      | TCP                                    | UDP                      |
  | --------- | -------------------------------------- | ------------------------ |
  | 연결 방식 | 연결형(Connection-oriented)            | 비연결형(Connectionless) |
  | 신뢰성    | 데이터 신뢰성 보장 (재전송, 순서 보장) | 신뢰성 보장 안함         |
  | 속도      | 느림 (신뢰성 보장 과정 필요)           | 빠름                     |
  | 오버헤드  | 큼                                     | 작음                     |
  | 사용 예시 | 웹, 파일 전송(FTP), 이메일(SMTP)       | 스트리밍, 게임, DNS      |

### 5. 서버의 동시 요청 처리

실제 서비스를 제공하는 서버에는 여러 클라이언트가 동시에 접속해서 요청한다  
 이때 서버가 요청을 하나씩 처리하면 병목 현상이 발생한다  
 이를 해결하기위해 여러 요청을 동시에 처리하는 서비스가 필요하다

- **동시 요청 처리 흐름**

  ```
  1. 클라이언트들이 서버로 요청을 보냄
  2. 서버는 요청을 스레드나 스레드 풀을 이용해 비동기적으로 처리
  3. 클라이언트는 응답을 기다리거나, 서버가 처리 완료되면 결과를 받아감
  ```

| 방법                          | 설명                                                          |
| ----------------------------- | ------------------------------------------------------------- |
| 멀티 스레드 (Multi-threading) | 요청마다 새로운 스레드를 만들어 동시에 처리                   |
| 스레드 풀 (Thread Pool)       | 스레드를 매번 새로 만드는 대신, 미리 만들어둔 스레드를 재사용 |
| Non-blocking I/O (NIO)        | 입출력 대기 없이 처리. 하나의 스레드로 많은 연결 관리 가능    |
| 비동기 처리 (Asynchronous)    | 요청을 보내고 결과가 나올 때까지 기다리지 않고 다음 작업 수행 |

**1) 멀티스레드 방식**

- 요청이 들어오면 스레드를 하나 생성해서 요청을 처리
- 빠르게 동시처리 가능하지만, 스레드가 많아지면 메모리 낭비 + 관리 어려움

  ```java
  Socket socket = serverSocket.accept(); // 요청 수락
  Thread thread = new Thread(new RequestHandler(socket));
  thread.start();
  ```

**2) 스레드 풀 방식**

- 미리 정해진 스레드들을 풀(pool)로 관리
- 새 요청이 들어오면 빈 스레드를 할당해서 처리
- 스레드를 만들고 없애는 비용을 줄이고, 서버 자원을 효율적으로 사용

  ```java
  ExecutorService executorService = Executors.newFixedThreadPool(10); //최대 10개 스레드를 사용
  executorService.submit(new RequestHandler(socket));
  ```

**3) Non-blocking/NIO 방식**

- 한 스레드가 여러 연결을 감시(select) 하면서, 이벤트가 있을 때만 처리
- 서버 스케일이 훨씬 잘된다 (수천, 수만 연결을 관리할 수 있음)
- Java에서는 java.nio.channels 패키지로 구현

### 6. JSON 데이터 형식 (JavaScript Object Notation)

- `JSON`: <u>데이터를 저장</u>하거나 <u>서버와 클라이언트간에 데이터를 주고받을때 사용</u>하는 `데이터 교환 형식`
- `키-값` 쌍을 기반으로 하는 텍스트 기반 데이터 포맷
- 객체는 `{}`, 배열은 `[]`로 표현

- **JSON 규칙**

| 요소                            | 설명                       | 예시                            |
| ------------------------------- | -------------------------- | ------------------------------- |
| 데이터는 키-값 쌍               | "key" : "value" 형태       | "name": "Kim"                   |
| 데이터는 쉼표로 구분            | 여러 쌍을 나열할 때 , 사용 | "name": "Kim", "age": 25        |
| 중괄호 {}로 객체 표현           | 여러 데이터를 하나로 묶음  | { "name": "Kim", "age": 25 }    |
| 대괄호 []로 배열 표현           | 여러 개의 값 저장          | [ "apple", "banana", "cherry" ] |
| 문자열은 반드시 "큰따옴표" 사용 | 작은따옴표(' ') ❌         | "city": "Seoul"                 |

### 7. TCP 채팅 프로그램

- 채팅 서버와 클라이언트

   <p align="center">
  <img src="/assets/images/Java/14-9.png" width="400">
  </p>

|클래스 | 용도|
|ChatServer | - 채팅 서버를 실행하는 클래스 <br>- ServerSocket을 생성하고 5001 포트에 바인딩 <br>- 클라이언트 연결을 수락하고, 각 클라이언트마다 SocketClient를 생성|
|SocketClient | - 클라이언트 1명과 1:1로 통신하는 클래스|
|ChatClient | - 채팅 클라이언트를 실행하는 클래스 <br>- ChatServer에 연결 요청 <br>- SocketClient와 1:1로 통신|

### TCP 채팅 프로그램 코드 예시

- [서버] ChatServer

```java
import java.io.*;
import java.net.*;
import java.util.*;

public class ChatServer {

	HashMap clients; //Client정보 담아두는 공간

	ChatServer() {
		clients = new HashMap(); // 같은 이름의 사용자 접근 막음
		Collections.synchronizedMap(clients); // 통신용 SocketClient를 관리하는 동기화된 Map콜렉션
	}

	public void start() {
		ServerSocket serverSocket = null;
		Socket socket = null;
		try {
			serverSocket = new ServerSocket(9999); // 1번 작업, 포트번호 9999
			System.out.println("서버 기다림");

			while (true) {
				socket = serverSocket.accept(); // 2번 작업
				System.out.println(socket.getInetAddress() + " " + socket.getPort()+" connect!"); // ip주소 출력
				ServerReceiver thread = new ServerReceiver(socket); // Receiver 클래스 생성해야 함, public void run이 있어야 함
				thread.start(); // class Receiver extends Thread
			}
		} catch (Exception e) {e.printStackTrace();}
	}

	void sendAll(String msg) { // 브로드캐스팅 기능
		Iterator iterator = clients.keySet().iterator(); // 키값(name)
		while (iterator.hasNext()) {
			try {
				DataOutputStream out = (DataOutputStream) clients.get(iterator.next()); // 다운캐스팅
				out.writeUTF(msg);
			} catch (Exception e) {e.printStackTrace();}
		}
	}

	public static void main(String[] args) {
		new ChatServer().start(); // start함수 쓰면 스레드사용
	}

	class ServerReceiver extends Thread {
		Socket socket;
		DataInputStream in;
		DataOutputStream out;

		ServerReceiver(Socket socket) {
			this.socket = socket;
			try {
				in = new DataInputStream(socket.getInputStream());
				out = new DataOutputStream(socket.getOutputStream());
			} catch (Exception e) {e.printStackTrace();}
		}

		@Override
		public void run() {
			String name = "";
			try {
				name = in.readUTF(); // 클라이언트 쪽에서 보낸 메세지 읽기
				if (clients.get(name) != null) { // 같은 이름 존재
					out.writeUTF("이미 이름 있음: " + name);
					out.writeUTF("다른이름으로 다시 연결!");
					System.out.println(socket.getInetAddress()+": "+socket.getPort()+"disconnect!");
					in.close();
					out.close();
					socket.close();
					socket = null;
				} else { //같은 이름이 존재하지 않는 경우
					sendAll("#"+name +"이 들어왔습니다");
					clients.put(name, out);
					while (in != null) {
						sendAll(in.readUTF());
					}
				}
			} catch (IOException e) { e.printStackTrace();}
			finally {
				if(socket!=null) {
					sendAll("#"+name+"exit!");
					clients.remove(name);
					System.out.println(socket.getInetAddress()+" "+socket.getPort()+"연결해제됨");
				}
			}
		}

	}
}

```

- [클라이언트] ChatClient

```java
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.net.Socket;
import java.util.Scanner;

public class ChatClient {
	public static void main(String[] args) {
		try {
			Socket socket = new Socket("127.0.0.1",9999);
			Scanner scanner = new Scanner(System.in);
			System.out.println("이름: ");
			String name = scanner.nextLine();

			Thread sender = new Thread(new Sender(socket,name));
			Thread receiver = new Thread(new Receiver(socket));

			sender.start();
			receiver.start();
		}catch(Exception e){e.printStackTrace();}
	}

	static class Sender extends Thread{ //데이터 보냄 Dataout
		Socket socket;
		String name;
		DataOutputStream out;

		Sender(Socket socket,String name){
			this.socket = socket;
			this.name = name;
			try {
				out = new DataOutputStream(socket.getOutputStream());
			}catch(Exception e) {e.printStackTrace();}
		}

		@Override
		public void run() {
			Scanner s = new Scanner(System.in);
			try {
				if(out != null) //보낼 데이터가 있음
					out.writeUTF(name);
				while(out!=null) {
					String msg = s.nextLine();
					if(msg.equals("stop"))
						break;
					out.writeUTF("("+name+") "+msg);
				}
				out.close();
				socket.close();
			}catch(Exception e) {e.printStackTrace();}
		}
	}

	static class Receiver extends Thread{ //데이터 보냄 Data in
		Socket socket;
		DataInputStream in;

		Receiver(Socket socket){
			this.socket = socket;
			try {
				in = new DataInputStream(socket.getInputStream());
			}catch(Exception e) {e.printStackTrace();}
		}

		@Override
		public void run() {
			while(in!=null) {
				try {
					System.out.println(in.readUTF());
				}catch(Exception e) {e.printStackTrace();}
				break;
			}
			try {
				in.close();
				socket.close();
			}catch(Exception e) {e.printStackTrace();}
		}
	}
}

```

- 중첩 클래스, 멀티스레드 구성된 상태임

 <p align="center">
  <img src="/assets/images/Java/14-10.png" width="400">
</p>

- 실행화면

 <p align="center">
  <img src="/assets/images/Java/14-11.png" width="400">
</p>

※ Scanner 입력받을 때 에러가 나는 경우

```java
//Scanner s = new Scanner(System.in); 가 에러나는 경우도 있음
BufferedReader b = new BufferedReader(new InputStreamReader(System.in));
int n=Integer.parseInt(b.readLine()); //문자열→정수로 언박싱
```
