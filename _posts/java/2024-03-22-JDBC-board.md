---
layout: single
title: "JDBC - 게시판 만들기"
categories: Java
tag: [Java]
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

# 게시판 만들기

## 1. MySQL TABLE 생성

- 테이블: users
  ```sql
  create table users(
  userid varchar(20) primary key,
  username varchar(20) not null,
  password varchar(20)  not null,
  age int(3) not null,
  email varchar(40) not null);
  desc users;
  ```
- 테이블: boards
  ```sql
  create table boards(
  bno int primary key auto_increment, -- 자동 증가
  btitle varchar(20) not null,
  bcontent longtext not null,
  bwriter varchar(30) not null,
  bdate datetime default now(),
  bfilename varchar(50) null,
  bfiledata longblob null); -- binary large object(이미지나 오디오 같은걸 객체 형태로 넣음)
  ```

## 2. JDBC 연결

- JDBC를 이용해 이클립스 - 데이터베이스 연결 방법( import.java.sql.\*; )
  1. JDBC 드라이버 로드
  2. 데이터베이스와 연결
  3. SQL문 실행
  4. 데이터베이스와 연결 끊기
- 연결하는데 사용되는 java api

  - Connection: 데이터베이스와 연결
  - Statement: 질의, 갱신, 실행
  - ResultSet: 결과물

## 3. 데이터베이스와 연결

```java
  import java.sql.Connection;
  import java.sql.DriverManager;
  import java.sql.SQLException;

  public class Jdbc {

  	public static void main(String[] args) throws SQLException {

  		Connection conn = null;

  		try {
  			Class.*forName*("com.mysql.cj.jdbc.Driver");
  			//1. Class 클래스로 JDBC 드라이버를 로딩
  			//DriverManager에 등록됨 → 이거를 가지고 SQL과 연결

  			conn = DriverManager.getConnection(
  					"jdbc:mysql://localhost:3306/ksj", //URL
  					"root",							   //id
  					"1234"							   //pw
  					);
  			//connection은 인터페이스라 객체생성 불가, DriverManager 클래스로 상속받아야함
  			//2. Connection 객체 생성하여 데이터베이스와 연결이 이루어지도록 함

  			//3. sql문 실행

  		} catch(Exception e) {}
  		//4. 연결끊기
  		conn.close();
  	}
  }

```

- SQL문 포함시

  ```java
  import java.sql.Connection;
  import java.sql.DriverManager;
  import java.sql.PreparedStatement;
  import java.sql.SQLException;

  public class Jdbc {
  	public static void main(String[] args) throws SQLException {

  		Connection conn = null;

  		try {
  			Class.*forName*("com.mysql.cj.jdbc.Driver");
  			//1. Class 클래스로 JDBC 드라이버를 로딩
  			//DriverManager에 등록됨 → 이거를 가지고 SQL과 연결

  			conn = DriverManager.getConnection(
  					"jdbc:mysql://localhost:3306/ksj", //URL
  					"root",							   //id
  					"1234"							   //pw
  					);
  			//connection은 인터페이스라 객체생성 불가, DriverManager 클래스로 상속받아야함
  			//2. Connection 객체 생성하여 데이터베이스와 연결이 이루어지도록 함

  			//3. sql문 실행
  			//데이터베이스 'users' 테이블에 데이터 넣기
  			String sql = "INSERT INTO users(userid, username, password, age, email) "
  						+ "VALUES(?,?,?,?,?)"; //?: 바인드 변수. 매범 값이 바뀔 수 있기 때문에 미리 정해놓지 않음

  			//PreparedStatement 인터페이스, conn으로부터 함수호출해서 객체 생성
  			PreparedStatement pstmt = conn.prepareStatement(sql);

  			//값을 넣는 작업. set자료형(?적힌 순서, 데이터)
  			pstmt.setString(1, "com");
  			pstmt.setString(2, "tom");
  			pstmt.setString(3, "1234");
  			pstmt.setInt(4, 49);
  			pstmt.setString(5, "aa@naver.com");

  			//executeXXX: 쿼리문이 실행되기 위해 호출하는 매소드: 데이터베이스 갱신됨
  			int r = pstmt.executeUpdate();

  			System.out.println("갱신된 행 갯수: "+r); //업데이트됐나 확인

  			pstmt.close();
  		}catch(Exception e) {}
  		conn.close(); //4. 연결끊기
  	}
  }
  ```

### 연결방법 상세

1. 패키지 생성 → mysql JDBC 넣기

<p align="center">
  <img src="/assets/images/Java/15-1-1.png" width="400">
</p>
  2. Connection 클래스 객체 생성

```java
     - Connection conn = null;
     - Class.forName("com.mysql.cj.jdbc.Driver");
```

<p align="center">
		<img src="/assets/images/Java//15-1-2.png" width="400">
</p>

3. DriverManager을 통해 테이터베이스 연결

<p align="center">
  <img src="/assets/images/Java//15-1-3.png" width="400">
</p>

4. SQL문 작성

```java
   - String sql = “쿼리문”;
   - PreparedStatement pstmt = conn.prepareStatement(sql);
   - int r = pstmt.executeUpdate();
```

   <p align="center">
      <img src="/assets/images/Java//15-1-4.png" width="400">
   </p>

   <p align="center">
      <img src="/assets/images/Java//15-1-5.png" width="400">
   </p>

5. 연결 끊기

```java
   conn.close();
```

   <p align="center">
      <img src="/assets/images/Java//15-1-6.png" width="400">
   </p>

## 4. SQL 작성(데이터 삽입, 변경, 삭제)

- **데이터 삽입**

  ```sql
  INSERT INTO 테이블명 (열1, 열2, ...) VALUES (값1, 값2, ...);
  ```

  ```java
  package boards;

  import java.io.FileInputStream;
  import java.sql.Connection;
  import java.sql.DriverManager;
  import java.sql.PreparedStatement;
  import java.sql.ResultSet;
  import java.sql.SQLException;
  import java.sql.Statement;

  public class BoardInsert {
  	public static void main(String[] args) {

  		Connection conn = null;

  		try {
  			Class.forName("com.mysql.cj.jdbc.Driver");
  			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/ksj", "root", "1234");

  			String sql = "INSERT INTO boards (btitle, bcontent, bwriter, bdate, bfilename,bfiledata) "
  					+ "VALUES (?, ?, ?, now(), ?, ?)";

  			PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
  			// sql만 적으면 쿼리문 실행 준비
  			// 자동증가된 bno값 가져옴: Statement.RETURN_GENERATED_KEYS
  			pstmt.setString(1, "금요일");
  			pstmt.setString(2, "금요일입니다");
  			pstmt.setString(3, "juli");
  			pstmt.setString(4, "망곰"); // bdate는 now()로 들어가서 안넣어도됨
  			pstmt.setBlob(5, new FileInputStream("C://Users//bitcamp//Desktop/mang.jpg"));

  			int r = pstmt.executeUpdate();
  			System.out.println(r); // 갱신된 행의 개수

  			if (r == 1) {
  				ResultSet rs = pstmt.getGeneratedKeys(); // bno값
  				if (rs.next()) {
  					int bno = rs.getInt(1);// DB에서 컬럼값이 1임(첫번째 열) = bno
  					System.out.println("게시글 수 " + bno);
  				}
  				rs.close();
  			}
  			pstmt.close();
  			conn.close();
  		} catch (Exception e) {
  		}
  	}
  }
  ```

- **데이터 수정**

  ```sql
  UPDATE 테이블명
  SET 열1 = 값1, 열2 = 값2, ...
  WHERE 조건;
  ```

  ```java
  package boards;

  import java.io.FileInputStream;
  import java.sql.Connection;
  import java.sql.DriverManager;
  import java.sql.PreparedStatement;
  import java.sql.ResultSet;
  import java.sql.SQLException;
  import java.sql.Statement;

  public class BoardInsert {
  	public static void main(String[] args) {
  		Connection conn = null;
  		try {

  			String sql = new StringBuilder()
  					.append("UPDATE boards SET ")
  					.append("btitle= ?, ")
  					.append("bcontent= ?, ")
  					.append("bfilename= ?, ")
  					.append("bfiledata= ? ")
  					.append("WHERE bno= ?")
  					.toString();

  					PreparedStatement pstmt=conn.prepareStatement(sql);
  					pstmt.setString(1, "hi");
  					pstmt.setString(2, "hello");
  					pstmt.setString(3, "짱구.jpg");
  					pstmt.setBlob(4, new FileInputStream
  					("C://Users//bitcamp//Desktop/짱구.jpg"));
  					pstmt.setInt(5,1);

  					int r=pstmt.executeUpdate();
  					System.out.println("수정된 행 개수" + r);
  					pstmt.close();

  		} catch (Exception e) {
  		}
  	}
  }
  ```

- **데이터 삭제**

  ```sql
  DELETE FROM 테이블명
  WHERE 조건;

  ```

  ```java
  package boards;

  import java.io.FileInputStream;
  import java.sql.Connection;
  import java.sql.DriverManager;
  import java.sql.PreparedStatement;
  import java.sql.ResultSet;
  import java.sql.SQLException;
  import java.sql.Statement;

  public class BoardInsert {
  	public static void main(String[] args) {
  		Connection conn = null;
  		try {

  			Class.forName("com.mysql.cj.jdbc.Driver");
  			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/ksj", "root", "1234");

  			String sql = "DELETE FROM boards WHERE bno=?";

  			PreparedStatement pstmt = conn.prepareStatement(sql);
  			pstmt.setInt(1, 1);

  			int r=pstmt.executeUpdate();
  			System.out.println(r);

  			pstmt.close();

  		} catch (Exception e) {
  		}
  	}
  }
  ```

## 5. 정보조회

- TABLE에서 유저 정보를 가져와 콘솔에 출력

  1. 유저 정보를 받을 객체 생성(User 클래스 생성)- `getter`/`setter`

     ```java
     package boards;

     public class User {
     	private String userid;
     	private String username;
     	private String password;
     	private int age;
     	private String email;

     	public String getUserid() {
     		return userid;
     	}
     	public void setUserid(String userid) {
     		this.userid = userid;
     	}
     	public String getUsername() {
     		return username;
     	}
     	public void setUsername(String username) {
     		this.username = username;
     	}
     	public String getPassword() {
     		return password;
     	}
     	public void setPassword(String password) {
     		this.password = password;
     	}
     	public int getAge() {
     		return age;
     	}
     	public void setAge(int age) {
     		this.age = age;
     	}
     	public String getEmail() {
     		return email;
     	}
     	public void setEmail(String email) {
     		this.email = email;
     	}
     	@Override
     	public String toString() { //set한 값들을 문자로 변환
     		return userid+" "+username+" "+age;
     	}
     }
     //테이블에서 Users 정보를 가져온 후 콘솔에 출력하기를 원함
     ```

  2. SELECT 데이터베이스에서 정보 받기

     ```java
     package boards;

     import java.sql.Connection;
     import java.sql.DriverManager;
     import java.sql.PreparedStatement;
     import java.sql.ResultSet;
     import java.sql.SQLException;
     import java.sql.Statement;

     public class UserSelect {
     	public static void main(String[] args) throws SQLException {
     		//테이블에서 Users 정보를 가져온 후 콘솔에 출력하기를 원함

     		Connection conn = null;

     		try {
     			Class.forName("com.mysql.cj.jdbc.Driver");
     			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/ksj", "root", "1234");
     			//connection 객체 생성하여 데이터베이스와 연결

     			String sql ="SELECT *FROM users WHERE userid=?";

     			PreparedStatement pstmt = conn.prepareStatement(sql);
     			pstmt.setString(1, "com"); //userid가 com인 데이터 조회

     			//ResultSet : 반환값이 여러 개의 행인 경우에 쉽게 처리할 수 있게 설계된 클래스
     			ResultSet rs = pstmt.executeQuery(); //정보 가져와 ResultSet에 넣음
     			if(rs.next()) { //다음행이 있다면
     				User u = new User();
     				u.setUserid(rs.getString(1)); //1컬럼의 값을 get해서 Userid에 set함
     				//테이블에 저장되어 있는 userid값을 가져와서 User클래스에 userid라는 필드에 세팅함
     				//sysout해서 출력할 수도 있지만, 나중에 jsp에서 데이터를 받아서 저장해야할 때 이렇게 씀
     				u.setUsername(rs.getString("username")); //컬럼 수가 아니라 컬럼명을 적어도 됨
     				u.setPassword(rs.getString(3));
     				u.setAge(rs.getInt(4));
     				u.setEmail(rs.getString(5));

     				System.out.println(u.toString());
     			}
     			rs.close();
     			pstmt.close();
     		}catch(Exception e) {}
     		conn.close();
     	}
     }

     ```

- Board에서 게시물 정보를 가져와 콘솔에 출력

  1. 게시물 정보를 받을 객체 생성(User 클래스 생성)- getter / setter

     ```java
     package boards;

     import java.sql.Blob;
     import java.util.Date;

     public class Board {
     	private int bno;
     	private String btitle;
     	private String bcontent;
     	private String bwriter;
     	private Date bdate;
     	private String bfilename;
     	private Blob bfiledata;
     	public int getBno() {
     		return bno;
     	}
     	@Override
     	public String toString() {
     		return btitle+" "+bwriter;
     	}

     	public void setBno(int bno) {
     		this.bno = bno;
     	}
     	public String getBtitle() {
     		return btitle;
     	}
     	public void setBtitle(String btitle) {
     		this.btitle = btitle;
     	}
     	public String getBcontent() {
     		return bcontent;
     	}
     	public void setBcontent(String bcontent) {
     		this.bcontent = bcontent;
     	}
     	public String getBwriter() {
     		return bwriter;
     	}
     	public void setBwriter(String bwriter) {
     		this.bwriter = bwriter;
     	}
     	public Date getBdate() {
     		return bdate;
     	}
     	public void setBdate(Date bdate) {
     		this.bdate = bdate;
     	}
     	public String getBfilename() {
     		return bfilename;
     	}
     	public void setBfilename(String bfilename) {
     		this.bfilename = bfilename;
     	}
     	public Blob getBfiledata() {
     		return bfiledata;
     	}
     	public void setBfiledata(Blob bfiledata) {
     		this.bfiledata = bfiledata;
     	}
     }
     ```

  2. SELECT 데이터베이스에서 정보 받기 + boards 테이블에 있는 이미지 다른 폴더로 저장

     ```java
     package boards;

     import java.io.FileOutputStream;
     import java.io.InputStream;
     import java.io.OutputStream;
     import java.sql.Blob;
     import java.sql.Connection;
     import java.sql.DriverManager;
     import java.sql.PreparedStatement;
     import java.sql.ResultSet;
     import java.sql.SQLException;

     public class BoardSelect {
     	public static void main(String[] args) throws SQLException {
     		Connection conn = null;

     		try {
     			Class.forName("com.mysql.cj.jdbc.Driver");
     			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/ksj", "root", "1234");

     			String sql ="SELECT *FROM boards WHERE bno=?";
     			PreparedStatement pstmt = conn.prepareStatement(sql);
     			pstmt.setInt(1, 2); //bno값이 2인 테이블 데이터 다 가져옴

     			ResultSet rs = pstmt.executeQuery();
     			while(rs.next()) {
     				Board bo = new Board();
     				bo.setBno(rs.getInt(1));
     				bo.setBtitle(rs.getString(2));
     				bo.setBcontent(rs.getString(3));
     				bo.setBwriter(rs.getString(4));
     				bo.setBdate(rs.getDate(5));
     				bo.setBfilename(rs.getString(6));
     				bo.setBfiledata(rs.getBlob(7));

     				System.out.println(bo);

     				Blob b = bo.getBfiledata();
     				if(b!=null) { //이미지가 있는 경우
     					InputStream is = b.getBinaryStream(); //is에서 이미지 읽어드림
     					OutputStream os = new FileOutputStream("C://b/"+bo.getBfilename());
     					//C드라이버의 b폴더에 저장

     					is.transferTo(os); //is에서 읽어들인 이미지 복사하겠다
     					os.flush();
     					os.close();
     					is.close();
     				}
     			}
     			rs.close();
     			pstmt.close();
     		}catch(Exception e) {}
     		conn.close();
     	}
     }
     ```

## 6. 데이터 읽기

### ResultSet

- 구조: SELECT문에 기술된 컬럼으로 구성된 행의 집함

  ```java
  🗣 ResultSet rs = psmt.executeQuery();
  ```

- `ResultSet`: SELECT문에 기술된 컬럼으로 구성된 행의 집합
- `next()`: 첫 번째 데이터 행인 first행을 읽으면서 커서 이동, 반환형 boolean
  **n개 데이터 행일 경우**: `while(rs.next())`
  **1개 데이터 행일 경우**: `if(rs.next())`

  ```java
  🗣 boolean result = rs.next();
  ```

- 컬럼명(rs.getSrting(userid)) 또는 컬럼 순번(rs.getSrting(1))으로 읽을 수 있음
