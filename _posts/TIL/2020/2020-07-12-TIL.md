---
layout: post
title: JSP 파일로 JS 파일 캐시 지우기
tags: [TIL, JS, JSP]
excerpt: "TIL - JavaScript, JSP"
date: 2020-07-12
feature: https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/til/til.png?raw=true
comments: true
---
 
# JSP 파일로 JS 파일 캐시 지우기

---

* JS 변경 후 캐시 때문에 변경 내용이 반영이 안될 때
  * JSP 에서 script태그 src값에 현재 시간(`System.currentTimeMills()`)을 쿼리 스트링으로 추가하면 캐시를 막을 수 있음

```html
<SCRIPT language="JavaScript" src="js/OZServiceHandler.js?a=<%=System.currentTimeMillis()%>"></SCRIPT>
```

