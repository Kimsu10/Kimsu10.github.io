---
layout: single
title: "Garbage Collector"
categories: Java
tag: [Java, 면접]
sidebar_main: true
author_profile: true
toc: true
toc_sticky: true
---

# GC(Garbage Collection, 가비지 컬렉션)

- 더 이상 <u>참조되지 않는 객체</u>를 <u>JVM이 자동으로 메모리에서 제거</u>하는 기능
- 자바 프로그래머는 명시적으로 free()나 delete()를 호출할 필요 없음

## GC의 처리 방법

**1. 객체 생성**

- `new` 키워드로 객체가 생성되면 `Heap` 메모리에 저장됨

**2. 참조가 끊김**

- 변수에서 객체에 대한 참조가 사라지면, 해당 객체는 "가비지"가 됨

**3. GC 실행**

- `JVM`이 <u>주기적으로 가비지 수집기(Garbage Collector)를 실행</u>
- 사용되지 않는 객체들을 <u>자동으로 제거하여 메모리 회수</u>

## GC의 영역

- JVM의 Heap 메모리는 Young 영역과 Old 영역으로 나뉜다
- 대부분의 객체는 Young 영역에서 생성되며, 자주 GC 대상이 된다

| 영역                  | 설명                                                   |
| --------------------- | ------------------------------------------------------ |
| Young                 | 새로 생성된 객체가 저장됨 (GC가 자주 발생함)           |
| Old (Tenured)         | 오래 살아남은 객체가 이동되는 곳 (GC가 덜 발생)        |
| Perm (또는 Metaspace) | 클래스 메타정보 저장 (Java 8부터는 Metaspace로 변경됨) |

## GC의 알고리즘

| GC 이름                        | 특징 및 사용처                                          | 장점                              | 단점                                  |
| ------------------------------ | ------------------------------------------------------- | --------------------------------- | ------------------------------------- |
| Serial GC                      | 단일 스레드로 동작하는 기본 GC (Client 환경, 소규모 앱) | 단순하고 Overhead 낮음            | 멀티코어 환경에서 비효율적            |
| Parallel GC (Throughput GC)    | 다중 스레드로 Young 영역 정리 (default for JVM)         | Throughput 높음, 빠른 처리        | STW(Stop-The-World) 시간이 길 수 있음 |
| CMS GC (Concurrent Mark-Sweep) | Old 영역을 동시에 청소 (병렬, 병행 처리)                | 멈춤 시간 최소화                  | Fragmentation 발생 가능복잡한 동작    |
| G1 GC (Garbage First)          | Java 9 이상 기본 GCHeap을 Region으로 나누어 관리        | STW 시간 짧음, 대용량 Heap에 적합 | 설정 및 동작 구조가 복잡              |
| ZGC (JDK 11~)                  | 초저지연 GC (10ms 이내 지연 목표)                       | 멈춤 시간 짧음 (몇 ms 수준)       | 상대적으로 낮은 Throughput            |
| Shenandoah GC (JDK 12~)        | 병행 Compact 지원                                       | 멈춤 시간 일정                    | CMS보다 메모리 사용량 많을 수 있음    |

--

## 요약

- GC는 더 이상 쓰이지 않는 객체를 자동으로 정리하여 메모리 누수를 방지
- JVM은 메모리 관리를 자동화해 개발자의 부담을 줄임
