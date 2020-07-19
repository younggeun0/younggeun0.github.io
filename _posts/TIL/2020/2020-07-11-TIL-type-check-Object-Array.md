---
layout: post
title: Object 또는 Array 타입 확인 방법
tags: [TIL, JS]
excerpt: "TIL - JavaScript"
date: 2020-07-11
feature: https://github.com/younggeun0/younggeun0.github.io/blob/master/_posts/img/til/til.png?raw=true
comments: true
---
 
# Object 또는 Array 타입 확인 방법

---

* Object와 Array만 타입만 체크할 때 사용 가능

```javascript
isArray = function(a) {
    return (!!a) && (a.constructor === Array);
};
console.log(isArray(        )); // false
console.log(isArray(    null)); // false
console.log(isArray(    true)); // false
console.log(isArray(       1)); // false
console.log(isArray(   'str')); // false
console.log(isArray(      {})); // false
console.log(isArray(new Date)); // false
console.log(isArray(      [])); // true

isObject = function(a) {
    return (!!a) && (a.constructor === Object);
};

console.log(isObject(        )); // false
console.log(isObject(    null)); // false
console.log(isObject(    true)); // false
console.log(isObject(       1)); // false
console.log(isObject(   'str')); // false
console.log(isObject(      [])); // false
console.log(isObject(new Date)); // false
console.log(isObject(      {})); // true
```

* 사용자가 생성자를 정의해 만든 Object인 경우는 체크가 안됨

```javascript
var user = new User(); // user.constructor === User
```

* `!!a`를 한 이유는 `null` 또는 `undefined`은 [거짓같은 값(falsy value)](https://developer.mozilla.org/ko/docs/Glossary/Falsy)으로 if문에서 동작하지만 `true`,`false`로 기록되기 위함

```javascript
var a = null;
a && a.constructor === Array; // null

var b = undefined;
b && b.constructor === Array; // undefined
```

참고 : [StackOverflow](https://stackoverflow.com/questions/8834126/how-to-efficiently-check-if-variable-is-array-or-object-in-nodejs-v8)

