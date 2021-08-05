---
layout: post
title: 한 PC에 여러 개의 git 계정 설정하는 방법
tags: [TIL, git]
excerpt: "TIL - git"
date: 2021-08-05
feature: https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/til/til.png?raw=true
comments: true
---
 
## 한 PC에 여러 개의 git 계정 설정하는 방법

회사에서 개인 github 레포에 push를 하면 회사 계정으로 기록되는 문제가 있어 방법을 찾아봄

### 설정 순서

1. 회사, 개인 SSH Key 생성
2. git 저장소(github, gitlab 등) 계정에 구분을 위한 SSH 키 값 등록(회사 계정, 개인 계정 키 값 다르게)
3. git client 에서 사용할 SSH Key 선택
4. git global 설정은 회사 계정으로 설정 유지, 개인 레포에만 git name과 email을 재설정
5. 이제 회사에서 개인 레포에 push를 해도 개인 계정으로 push가 됨

---

### 참고
* [How To Work With Github and Multiple Accounts](https://code.tutsplus.com/tutorials/quick-tip-how-to-work-with-github-and-multiple-accounts--net-22574)
* [StackOverFlow - Multiple github accounts on the same computer?](https://stackoverflow.com/a/67551599/9171850)
