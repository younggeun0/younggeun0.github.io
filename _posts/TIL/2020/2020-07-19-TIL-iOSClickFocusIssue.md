---
layout: post
title: iOS 브라우저에서 input type=button인 경우 click해도 focus가 생기지 않는 문제
tags: [TIL, iOS]
excerpt: "TIL - iOS"
date: 2020-07-19
feature: https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/til/til.png?raw=true
comments: true
---
 
* iOS 브라우저에서 input type=button인 경우 click해도 focus가 생기지 않는다.
  * 브라우저별로 다르긴 하나 일반적으로 `<button>`을 클릭하면 button element로 focus가 이동을 한다.
  * 그러나 현재 iOS 브라우저(Safari, Chrome)에서는 focus가 가지지 않는다. (아래 mdn 참고)
* iOS 브라우저에서도 click되었을 때 focus를 주기 위해서는 아래 코드처럼 강제로 focus를 줄 수 있다.

```html
<script>
$(function() {
    $("#get-focused").click(function() {
        this.focus();
    });
});
</script>

<!-- 클릭하면 포커스가 생김  -->
<input type="button" value="focus test!" id="get-focused"></input>
<!-- 클릭해도 포커스가 생기지 않음 -->
<input type="button" value="focus test2" ></input>
```

![0719_01](https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/til/2020/0719_01.jpg?raw=true)

참고
* [StackOverflow](https://stackoverflow.com/questions/42758815/safari-focus-event-doesnt-work-on-button-element)
* [mdn - button element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus)
