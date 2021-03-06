---
layout: post
title: 리눅스 시스템 지역, 언어 설정 확인
tags: [TIL, Linux]
excerpt: "TIL - Linux"
date: 2020-07-15
feature: https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/til/til.png?raw=true
comments: true
---
 
# 리눅스 시스템 지역, 언어 설정 확인 

---

* locale은 환경적 변수들(언어, 지역, 문자열 인코딩 설정)을 정의
  * 시간, 날짜 형식과 한 주의 첫번째 요일, 숫자, 통화 등 형식에 영향을 끼침

```bash
$ locale

# 결과
LANG=en_US.UTF-8
LANGUAGE=en_US
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=


$ localectl

# 결과
System Locale: LANG=en_US.UTF-8
               LANGUAGE=en_US
    VC Keymap: n/a
   X11 Layout: us
    X11 Model: pc105
```

참고 [TecMint](https://www.tecmint.com/set-system-locales-in-linux/)