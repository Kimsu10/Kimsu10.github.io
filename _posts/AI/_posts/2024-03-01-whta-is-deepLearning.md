---
layout: single
title: "DeepLearning"
categories: DeepLearning
tag: [AI]
sidebar_main: true
toc: true
toc_sticky: true
author_profile: true
---

- Deep Learning 의 이론적 기반이 되는 Neural Networks의 동작 원리와 학습 알고리즘을 설명 및 구현하기
- CNN, RNN, AutoEncoder 등 Deep Learning 분야에서 가장 많이 활용되는 Architecture의 구조와 동작, 학습 알고리즘을 이해하기
- 확률과 통계, 선형대수, Python, Regression, Machine Learning을 먼저 배워야한다.

# 인공지능의 발전 과정

동물이하는 간단한 학습정도는 기계도 할 수 있지않을까?

> **기계학습**
>
> “어떤 컴퓨터 프로그램이 T라는 작업을 수행한다.  
> 이 프로그램의 성능을 P라는 척도로 평가했을 때
> 경험 E를 통해 성능이 개선된다면
> 이 프로그램은 학습을 한다고 말할 수 있다”  
> -Mitchell(1977)

1. 인공지능의 탄생

컴퓨터가 등장함에따라 사람이 어려워하는 작업(계산)을 쉽게처리함으로써 컴퓨테ㅓ에대한 기대감이 커졌다.  
그 결과 간단하지만 반복적인 업무들을 컴퓨터가 대신 해줄 수있지 않을까라는 컴퓨터의 기대감에 인공지능이라는 분야가 등장하였다.(1950년대)

2. 지식기반의 방식

- 인공지능의 초기에는 Rule based(지식기반) 방식이 주를 이뤘다.

> **Rule-based**
>
> 미리 정의된 **규칙(Rules)**에 따라 특정 문제를 해결하는 방식을 말한다.

- 하지만 "온도가 30도 이상이면 에어컨을 켜라"라고 규칙을 정의하면 그 조건에 부합할때만 작동하고, 사람이 쉽게 인식하는 변화는 인식하지 못하는 한계가 있었다.

3. 기계학습

- 이러한 문제때문에 지식기반의 학습에서 기계 학습으로 전환되었다.

> **기계 학습**
>
> 데이터 중심의 접근방식

# 2. AI의 시대

## 1. AI

> Artificial Intelligence
>
> - Artificial intelligence (AI) is ntelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans.
> - 인간의 지능이 가지는 학습, 추리, 적응, 논증 따위의 기능을 갖춘 컴퓨터 시스템

![](/assets/images/AI/01-deepLearning.png)

## 2. Machine Learning

> **머신 러닝의 어려움**
>
> 전통적인 러닝 패러다임
> DataData → Human(전문가) → Rules/Logics(white box)
> 머신 러닝 패러다임
> DataData → Machine(컴퓨터) → Model(mostly Black box)

1. Feature engineering for Representation

- Domain(expert) Knowledge가 필수
- ex) 이미지의 representation을 잘 생성하기 위한
  Feature engineering 방법들(SIFT, HoG, etc)이 발전함

2. Feature engineering 필요 + 사람이 직접 수행, Domain Knowledge

- Raw input(강아지 이미지)을 컴퓨터가 알아볼 수 있도록 변형
- 특징을 엔지니어링
- 특징을 추출
- 에측 모델을 생성
- 강아지 99%

## 3. Deep Learning

‘Deep Learning’은 입력과 출력 사이에 여러 계층의 노드가 있는 신경망(Neural Networks)을 사용하는 것을 의미한다.

- Learn Representations from data

- raw data → visible layer(input pixels)
- Low Level representation → 1st hidden layer(deges)
  → 2nd hidden layer(corners and contours)
- High Level representation → 3rd hidden layer(object parts)
- Output(Prediction) → output(object identity)

---

- Deep Learning은 입력과 출력 사이에 여러 계층의 노드가 있는 신경망(Neural Networks)을 의미한다.
- Deep Learning은 일반적인 Machine Learning과 다르게 데이터를 기반으로 Representation을 학습하는 알고리즘이라 할 수 있다.
- Deep Learning은 Computer Vision, NLP 등
  다양한 분야에서 인간에 준하는 또는 인간을 넘어서는 Performance를 보이고 있다.

### Machine Learning vs Deep Learning

> Q. Deep Learning이 잘되나요?(Image, Text, 기타 특정 데이터들)
>
> 입력과 출력 사이의 여러 계층의 레이어들은
> 우리의 두뇌가 정보를 처리하는 것처럼 일련의 단계에서
> Feature 식별 및 처리(Feature engineering)를 수행하고
> Representation을 생성한다.
> 또한 Representation은 전문가가 설계한 것이 아니라
> 일반적인 학습 절차를 사용하여 raw data에서 학습
> • 하고자 하는 Task에 적합한 Representation을
> 모델이 만들어 주기 때문에 Deep Learning의 성능이 뛰어남

> Q. Multi layer Neural Networks은 아주 예전부터 있었는데 무엇이 달라졌나요?
> 데이터의 부족, 컴퓨팅 파워의 부족 등으로 인해 shallow 했던 Neural Networks이 Deep 해지면서 보다 많은 Task에서 Deep Learning 이 두각을 드러냄

Key of Deep Learning - ABC

- Algorithm
- Big Data
- Conputing Power

Computer Vision
분류 → 검출 → 분할

### Deep Learning Applications

1. NLP (자연어 처리)
   컴퓨터가 인간의 언어를 이해하고 생성하며, 조작할 수 있도록 해주는 인공지능(AI) 분야이다.  
   주로 텍스트나 음성 데이터를 다루며, 이를 통해 자연어를 처리하거나 분석한다.  
    흔히 '언어 입력(language in)'이라고도 불리며, 챗봇, 번역기, 음성 인식 시스템 등에 활용됩니다.

2. DALL·E 2
   DALL·E 2는 OpenAI에서 개발한 AI 모델로, 주어진 텍스트 설명을 기반으로 새로운 이미지를 생성할 수 있다.  
    예술 창작, 디자인, 콘텐츠 생성 등에 활용되며, 텍스트와 이미지를 자연스럽게 연결하는 기술의 대표적이다.

3. AlphaGO
   AlphaGO는 구글 딥마인드에서 개발한 인공지능 바둑 프로그램으로, 인간의 직관적인 사고 방식을 모방하여 복잡한 바둑 게임에서 높은 수준의 플레이를 펼쳤다.  
    이 프로그램은 딥러닝을 통해 자가 학습하며, 인간이 이해하기 어려운 전략을 사용해 이세돌 9단과 같은 세계적인 바둑 기사를 이긴 것으로 유명하다.

4. 영상의학(의료 이미지 분석)
   딥러닝은 의료 분야에서도 크게 기여하고 있다.  
   특히 영상의학에서는 방사선 촬영, MRI, CT 스캔 등의 의료 이미지를 분석하여 질병을 진단하거나 치료 방침을 제시하는 데 사용된다.  
   의료 AI 시스템은 인간이 놓칠 수 있는 미세한 병변도 잡아내어 더 정확한 진단을 내릴 수 있게 도와준다.

### DeepLearning 체험하기

eachable Machine
• 구글에서 제공하는 웹 기반 딥러닝 모델 생성 프로젝트
• https://teachablemachine.withgoogle.com/

Teachable Machine

- 이미지 분류 Deep Learning 모델 만들기
- 데이터 생성 : 분류하고 싶은 물체의 이미지를 생성
- 학습 : 주어진 데이터로 Neural Networks을 학습
- 예측 : 신규 이미지를 분류(확률값 확인)
