---
layout: single
title: "MySQL 권한 문제"
categories: Database
author_profile: true
sidebar_main: true
toc: true
toc_sticky: true
---

mysql workbench UI문제를 해결하니 스키마 생성시 3680 에러가 발생하였다.

```
ERROR 3680 (HY000): Failed to create schema directory 'DB명' (errno: 2 - No such file or directory)
```

stackoverflow에 나온방법과 구글링을 해보니 가장 간단한 방법은 재설치였는데, 재설치하지않고 방법을 찾아보았다.

## 원인 찾기

### 1. 설치 확인

아래의 brew 명령어를 쳐서 설치된 mysql 이 뜬다면 설치된것이다.

```bash
brew list | grep mysql

> mysql
> mysqlworkbench
```

### 2. 서버 실행 중인지 확인

```bash
 brew services list
```

<img src="/assets/images/DataBase/mysql/00.png"/>
서버가 실행되고 있지않았다.

```bash
brew services stop mysql

mysql.server start

brew services restart mysql
```

mysql 서버가 종료된건가싶어서 재실행해보았으나 여전히 같은 문제가 발생하였다.

### 3. 디렉토리 확인

```sql
mysql -u root -p -e "SHOW VARIABLES LIKE 'datadir';"

Enter password:
+---------------+--------------------------+
| Variable_name | Value                    |
+---------------+--------------------------+
| datadir       | /opt/homebrew/var/mysql/ |
+---------------+--------------------------+

ls -ld /opt/homebrew/var/mysql/

> drwxr-xr-x  24 sj  admin  768 12 17 22:26 /opt/homebrew/var/mysql/

sudo chown -R _mysql:_mysql /opt/homebrew/var/mysql/

Password:

> 왜 아무일도 안일어나는것인가?

 ps aux | grep mysql

sj               72556   0.1  0.1 412230944  13072   ??  S    161224  198:55.67 /opt/homebrew/opt/mysql/bin/mysqld --basedir=/opt/homebrew/opt/mysql --datadir=/opt/homebrew/var/mysql --plugin-dir=/opt/homebrew/opt/mysql/lib/plugin --log-error=Kims-2.local.err --pid-file=Kims-2.local.pid
sj               72397   0.0  0.0 410596592     16   ??  S    161224    0:00.02 /bin/sh /opt/homebrew/opt/mysql/bin/mysqld_safe --datadir=/opt/homebrew/var/mysql
sj               55414   0.0  0.0 410724048   1344 s017  S+    4:29PM   0:00.00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn --exclude-dir=.idea --exclude-dir=.tox --exclude-dir=.venv --exclude-dir=venv mysql
```

경로를 모두 확인해보았는데 내가 볼때 문제가 없었다.
하지만 다시 서비스를 종료하고 재실행해보니 다른 문제가 발생하였다

### 4. 원인: Permission denied

```bash
mysql.server start

> 실행 결과
Starting MySQL
./opt/homebrew/Cellar/mysql/9.2.0/bin/mysqld_safe: line 653: /opt/homebrew/var/mysql/Kims-2.local.err: Permission denied
Logging to '/opt/homebrew/var/mysql/Kims-2.local.err'.
/opt/homebrew/Cellar/mysql/9.2.0/bin/mysqld_safe: line 144: /opt/homebrew/var/mysql/Kims-2.local.err: Permission denied
/opt/homebrew/Cellar/mysql/9.2.0/bin/mysqld_safe: line 199: /opt/homebrew/var/mysql/Kims-2.local.err: Permission denied
/opt/homebrew/Cellar/mysql/9.2.0/bin/mysqld_safe: line 916: /opt/homebrew/var/mysql/Kims-2.local.err: Permission denied
/opt/homebrew/Cellar/mysql/9.2.0/bin/mysqld_safe: line 144: /opt/homebrew/var/mysql/Kims-2.local.err: Permission denied
 ERROR! The server quit without updating PID file (/opt/homebrew/var/mysql/Kims-2.local.pid).
```

MySQL이 /opt/homebrew/var/mysql/에 로그 파일을 쓰려고 하는데 `접근 권한이 없어서` 서버가 죽는것이 문제였다.

## 해결

### 1. datadir 디렉토리의 권한 수정

MySQL이 파일을 쓸 수 있게 `디렉토리` 전체 `소유자를 변경`하였다.

```sql
sudo chown -R $(whoami) /opt/homebrew/var/mysql
```

`$(whoami)` 명령은 **현재 로그인된 사용자 이름으로 자동으로 치환**해준다.  
mysql이 어떤 유저로 실행되는지 아라고싶다면 아래의 명령어를 입력하면 된다.

```bash
ps aux | grep mysqld
```

만약 mysqld 앞에 **\_mysql**이 있으면 → MySQL은 \_mysql 사용자로 실행 중

만약 사용자 이름이 **자신의 이름**(Kims-2)이면 → 그 사용자 계정으로 실행 중

다시 서버를 재실행하니 오랜기간 자주 보았던 그 문구가 뜬다.

```bash
(base) Kims-2➜  ~  ᐅ  mysql -u root -p

> 실행 결과
Enter password:
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)
```

### 2. 비밀번호 재설정

**1. 서버를 중지한다**

```bash
brew services stop mysql

mysql.server stop
```

**2. 비밀번호 없이 서버 안전 모드 실행**

```
sudo mysqld_safe --skip-grant-tables &

> 실행 결과
> [1] 90825
> [1]  + 90825 suspended (tty output)  sudo mysqld_sage               --skip-grant-tables
```

**3. 비밀번호 없이 root 계정으로 로그인**

```
mysql -u root
```

**4 비밀번호 초기화**

```sql
FLUSH PRIVILEGES;

ALTER USER 'root'@'localhost' IDENTIFIED BY '새비밀번호';

> 실행 결과
> Query OK, 0 rows affected, 1 warning (0.00 sec)

```

**5. 서버 재시작**

```
// mysql 나가기
exit

// 안전 모드 서버 종료
sudo killall mysqld

// mysql 재실행
brew services start mysql

```

**6. 비밀번호를 사용해서 로그인**

```sql
mysql -u root -p
```

<img src="/assets/images/DataBase/mysql/01.png"/>

성공!

---

항상 macOS의 MySQL Shell로만 작업하다가 Workbench를 공부하면서 다양한 문제를 마주했다.  
처음에는 단순한 경로 문제로 생각했지만, 실제로는 권한 문제였고, 이를 해결하는 과정에서 chown, whoami 같은 리눅스 명령어를 직접 활용해볼 수 있었다.  
새삼 리눅스가 실제 문제 해결에 얼마나 유용한지 제대로 공부해야할 필요성을 느꼈다.
