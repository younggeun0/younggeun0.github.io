---
layout: post
title: SIST Project 02 - 1949
tags: [SISTProject]
excerpt: "👨‍💼👩‍💼 구인구직 Java 프로그램"
project: true
date: 2019-04-04
comments: true
---

# SIST Project 02 - 👨‍💼👩‍💼 구인구직 Java 프로그램

* [Github Repository](https://github.com/younggeun0/1949)
* **일 구하고 사람 구하고**
  * **개발자 구인구직 버티컬 서비스**
  * **JAVA SE CS 프로그래밍, Network, JDBC, Thread를 사용한 프로젝트**
  * 제작기간 한달 (2019.02.15~2019.03.15)


## 업무분장
  * **younggeun0**
    * 요구사항 정의, DB, UI, Class Diagram 설계, 관리자 구현
  * **gkwl7878**
    * 사용자 구현(구인글 조회, 구인글 상세정보, 구직자 조회, 주직자 상세정보)
  * **jeongmipark94**
    * 사용자 구현(로그인, 회원가입, 주소검색)
  * **hyewon0218**
    * 사용자 구현(아이디 찾기, 비밀번호 찾기, 회원정보 수정, 회원탈퇴)
  * **WABA82**
    * 사용자 구현(관심 구인글 조회, 구직자 지원현황, 관심 구직자 조회, 구인자 지원 현황)
  * **kimkunha**
    * 사용자 구현(기본 정보 관리, 회사 정보 관리)


## 프로젝트 간트차트

![간트차트](https://github.com/younggeun0/1949/blob/master/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_%EA%B0%84%ED%8A%B8%EC%B0%A8%ED%8A%B8_new.png?raw=true)

## Scope & Boundary

* [요구사항 명세서, 요구사항 정의서, 개발표준정의서](https://github.com/younggeun0/1949/tree/master/01.%EB%B6%84%EC%84%9D)

## UI 설계

* [UI 설계 png](https://github.com/younggeun0/1949/tree/master/02.%EC%84%A4%EA%B3%84/UI_png)

## DB 설계

* **ERD 논리모델**

<img src="https://github.com/younggeun0/1949/blob/master/02.%EC%84%A4%EA%B3%84/ERD_%EB%85%BC%EB%A6%AC%EB%AA%A8%EB%8D%B8(%ED%99%95%EC%A0%95).PNG?raw=true"/>

* **ERD 물리모델**

<img src="https://github.com/younggeun0/1949/blob/master/02.%EC%84%A4%EA%B3%84/ERD_%EB%AC%BC%EB%A6%AC%EB%AA%A8%EB%8D%B8(%ED%99%95%EC%A0%95).PNG?raw=true"/>

## 클래스 다이어그램

* **서버관리자**

![관리자](https://github.com/younggeun0/1949/blob/master/02.%EC%84%A4%EA%B3%84/class_diagrams/admin_class_diagram_0208%20-%20%EA%B0%9C%EB%B0%9C%EC%98%81%EC%97%AD%EA%B5%AC%EB%B6%84.png?raw=true)

* **사용자**

![사용자](https://github.com/younggeun0/1949/blob/master/02.%EC%84%A4%EA%B3%84/class_diagrams/user_class_diagram_0208%20-%20%EA%B0%9C%EB%B0%9C%EC%98%81%EC%97%AD%EA%B5%AC%EB%B6%84.png?raw=true)

## 테스트

* [단위테스트](https://github.com/younggeun0/1949/tree/master/03.%EA%B0%9C%EB%B0%9C/%EB%8B%A8%EC%9C%84%ED%85%8C%EC%8A%A4%ED%8A%B8)
* [통합테스트](https://github.com/younggeun0/1949/tree/master/04.%ED%85%8C%EC%8A%A4%ED%8A%B8)

## 시연(동영상)

* 영상은 비밀번호 `Aaa11!` 입력하면 재생가능 
* [관리자](https://vimeo.com/323655309 )
* [사용자 회원정보 수정, 탈퇴](https://vimeo.com/323629798)
* [아이디,비번 찾기](https://vimeo.com/323630097)
* [일반사용자](https://vimeo.com/323614169)
* [기업사용자](https://vimeo.com/323645877 )

## 시연 - 관리자

![관리자 시연](https://github.com/younggeun0/1949/blob/master/05.%EC%8B%9C%EC%97%B0/admin.gif?raw=true)

## 시연 - 일반사용자

![일반사용자 시연](https://github.com/younggeun0/1949/blob/master/05.%EC%8B%9C%EC%97%B0/ee_user.gif?raw=true)

## 시연 - 기업사용자

![기업사용자 시연](https://github.com/younggeun0/1949/blob/master/05.%EC%8B%9C%EC%97%B0/er_user.gif?raw=true)