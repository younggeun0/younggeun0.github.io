---
layout: post
title: jQuery handler preventDefault와 return false 차이
tags: [TIL, jQuery]
excerpt: "TIL - jQuery"
date: 2020-07-10
feature: https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/til/til.png?raw=true
comments: true
---
 
# jQuery handler preventDefault와 return false 차이

---

* jQuery event handler 함수에서 `return false`를 하면 `event.preventDefault()`와 `event.stopPropagation()`이 같이 적용됨
  * `event.preventDefault()`는 기본 이벤트 핸들러가 동작하는 것만 막는다
  * 단, jQuery가 아닌 일반 event handler 함수에서 `return false`를 하면 버블링이 발생한다

```javascript
$('a').click(function (e) {
    // custom handling here
    e.preventDefault();
});

$('a').click(function () {
    // custom handling here
    return false;
});
```

참고 : [StackOverflow](https://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false)

