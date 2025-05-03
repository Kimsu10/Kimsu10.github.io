---
layout: single
title: Git 저장소 생성 및 복제
comments: true
categories: GitHub
tag: [Git]
toc: true
toc_sticky: true
---

git은 작성된 모든 소스코드의 변경사항을 관리한다  
git은 이런 변경사항을 `repository`라는 전용저장소에 저장한다

repository의 동작방식은 아래와 같다

생성과정 이미지 넣기
<img src="/assets/"/>

# git 저장소

- 외적으로 폴더와 비슷하나 내부적으로 별도의 숨겨진 폴더(.git)가 존재한다
- 이 <u>숨겨진 폴더에는 버전관리시스템(VCS)에 필요한 파일 변경 이력을 기록</u>한다
- 즉, 저장소는 프로젝트의 모든 개정(revision)과 히스토리를 가진 데이터베이스

- 일반적인 폴더

  <img src="/assets/images/GithubImage/2-1.png" width="500px"/>

- 깃 저장소

  <img src="/assets/images/GithubImage/2-2.png" width="500px"/>

## 1. 저장소 생성하기

처음 프로젝트를 실행할때는 로컬에서 명령어를 실행하여 저장소를 생성한다

- git bash 또는 termial을 열고 아래의 명령어를 입력

  ```bash
  mkdir 폴더명
  cd 폴더명
  ```

  <p align="center">
  <img src="/assets/images/GithubImage/2-3.png" width="500px"/>
  </p>

## 2. 초기화

- 저장소를 생성하면 우선 `초기화(init)`를 해야한다
- 최기화는 <u>.git 폴더가 추가</u>되며 <u>깃 저장소로 변경</u> 되는것을 말한다
- `git init`을 사용하여 일반폴더를 깃 저장소 폴더로 변경된다

  ```bash
  # 폴더 결로 내
  git init

  # 폴더 경로 밖
  git init 경로명
  ```

  <p align="center">
  <img src="/assets/images/GithubImage/2-4.png" width="500px"/>
  </p>

### 초기화 확인

- 숨겨진 폴더를 확인하여 초기화 여부를 확인할 수 있다

**파일 목록 출력 - 리눅스 명령어**

- `ls`: 파일 목록을 출력 (숨겨진 파일 확인 불가)
- `ls -a`: 숨긴 파일(이름이 .으로 시작하는 파일)의 <u>이름까지만</u> 출력
- `ls -al`: 숨긴 파일의 <u>파일의 이름, 권한, 소유자, 파일 크기, 수정 날짜 등 추가 정보까지</u> 출력

> ⛔️ 저장소 복사시 주의사항
>
> - 저장소를 통째로 복사하는 경우 .git 폴더까지 같이 복사해야한다
> - .git 폴더를 가져오지 않고 다른 폴더로 복사하거나 다운받으면, Git은 해당 디렉토리를 버전 관리 중인 저장소로 인식하지 못한다
> - 이후 git init이나 다른 Git 명령어를 쓰면, 새 Git 저장소로 인식해서 전체 파일을 전부 새로 커밋해야 할 변경 사항으로 봄
> - git status 했을 때 수천 개의 파일이 전부 "추적되지 않음(untracked)" 또는 "변경됨(modified)"으로 뜨게 된다

## 3. 레포지토리 생성

- 자신의 GitHub 계정으로 로그인하고 새로운 레포지토리를 생성한다

<p align="center">
  <img src="/assets/images/GithubImage/2-5.png" width="500px"/>
</p>

- 레포지토리가 생성되면 원격저장소 주소와 명령문, 설명을 알려준다

<p align="center">
<img src="/assets/images/GithubImage/2-6.png" width="500px"/>
</p>

## 4. 원격 레포지토리와 연결

### 1. git 명령어로 연결

```bash
git remote add origin 원격저장소 주소

# 연결 확인
git remote -v
```

---

# Git 저장소 복제

- 외부에 있는 기존의 프로젝트를 기반으로하는 저장소를 생성할때 저장소를 복제한다
- 대표적으로 `GitHub`, `BitBucket` 같은 호스팅 사이트가 있다

## 공개 저장소

- Git 호스팅 서비스는 Public 저장소와 Private 저장소를 지원한다
-

<p align="center">
<img src="/assets/images/GithubImage/2-7.png" width="500px"/>
</p>

**1. Download Zip 다운로드**

- 공개된 소스코드를 다운로드
- 해당 `코드의 최종 복사본`을 가져오는것이지 이력까지 받아오는것은 아니다

**2. Git의 저장소를 복제**

- `최종 코드 + 모든 이력`을 받아옴
- 코드의 일부를 변경하여 기여하는것이 가능

  ```bash
  git clone 원격저장소URL 새폴더명
  ```

- git clone 명령어로 저장소를 복제하면 깃은 자동으로 깃 서버에 연결된다
- .git 폴더에서 레포지토리 이력을 관리하기 때문에 복제된 폴더명을 변경해도 된다

---

# 소스트리와 연결

---

> **터미널(Terminal)**
>
> - 텍스트로 명령어를 입력할 수 있는 대화창
> - git bash, CMD, powershell 등

> **mkdir 명령어**
>
> - make directory
> - 터미널(쉘)에서 폴더롤 생성하는 명령어

> **cd 명령어**
>
> - change directory
> - 디렉터리를 이동하는 명령어
