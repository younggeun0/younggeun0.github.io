---
layout: post
title: 리눅스 폰트 설치
tags: [TIL, Linux]
excerpt: "TIL - Linux"
date: 2020-07-16
feature: https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/til/til.png?raw=true
comments: true
---
 
# 리눅스 폰트 설치

---

1. 폰트 설치할 `/usr/share/fonts/` 디렉토리 확인
2. 원하는 폰트를 `/usr/share/fonts/` 에 복사

```bash
# 3. 폰트 캐시 갱신 
fc-cache -vf
# -f(-force), -v(-verbose) option 
# fc-cache 없을 땐 apt install fontconfig 로 설치

# 4. 설치된 폰트 확인
fc-list
```

참고 [geeksforgeeks](https://www.geeksforgeeks.org/fc-cache-command-in-linux-with-examples/)