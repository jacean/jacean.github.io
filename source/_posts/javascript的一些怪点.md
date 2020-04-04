---
title: javascript的一些怪点
date: 2016-06-30 23:53:10
tags:
    - javascript
categories:
    - 前端
---
## null作为对象却不是实例

```
typeof null==='object'   ->true
```
可以看到，null确实是一个对象，可它是一个完全没有意义的对象，没有任何属性和方法。
我们还知道，*所有对象都是Object的实例*，那么null是吗？

<!--more-->
```
null instanceof Object   ->false
```

可以看到，null不是Object的实例，没有值的它不能作为任何对象的实例。

所以，__*尽管null是一个对象，但它并不被看作是对象的实例。*__

而null作为一个没有值得对象，用它来使用Object.create实例对象的时候，将覆盖对象的\_\_proto\_\_属性。

```
function objectTest() {
    var o1 = {};   
    var o6 = Object.create(Object.prototype);
    var o7 = Object.create(null);
}
```
调试后可以看到这样的结果在scope中
```
 Local Return value:undefined
    o1:Object 
        __proto__:Object    
    o6:Object
        __proto__:Object
    o7:Object
        No Properties 
```

可以看到O1、O6都是自带了\_\_proto\_\_属性的，O7是自定义null为prototype来创建对象，所以就没有此属性。

## NaN作为数字却不能自等

```
//NaN的类型确确实实是number数字
typeof NaN==='number'
//true

//NaN又确确实实不等于NaN
NaN==NaN
//false

//要判断是不是NaN只能使用isNaN()方法
isNaN(NaN)
//true
```

## 空数组是真值但却不等于true

判断是不是真值，if一下。
```
if(new Array()){
    console.log("[] is true");
}else{
    console.log("[] is false");
}                       //[] is true
```
通过if的判断可以看出来空数组[]是真值，但是
```
console.log([]==true);  //false
if ([]==true) {
    console.log("[] is true");
}else{
    console.log("[] is false");
}                       //false
```
也就是说作为真值的[]==false。

有点懵圈，来梳理一下。
我们知道，在js中，我们可以通过if的逻辑判断条件来区分真值/假值，所以可以得到6个假值，分别是：
> false,undefined,null,0,"",NaN

那么除此之外的就都是真值了。可以这样理解：
在javascript中，所有非布尔值都有一个内置的布尔标志，在进行布尔比较的时候，js就会调用这个布尔标志。
如上假值，在进行布尔比较的时候，会临时的转变成false。

但是，并不是说真值就等于true。即在==和!=这类比较运算中，真值不一定等于true。
比较运算最后都会转到number/string值的隐式转换。
> ECMA规范    ToPrimitive ( input [ , PreferredType ] )
1. Assert: Type(O) is Object.
2. Assert: Type(hint) is String and its value is either "string" or "number".
3. If hint is "string", then
    - Let methodNames be « "toString", "valueOf" ».
4. Else,
    - Let methodNames be « "valueOf", "toString" ».
5. For each name in methodNames in List order, do
    - Let method be ? Get(O, name).
    - If IsCallable(method) is true, then
        - Let result be ? Call(method, O).
        - If Type(result) is not Object, return result.
6. Throw a TypeError exception.

- 当转换是趋向于string的，则执行toString->valueOf
- 当转换时趋向于number的，则执行valueof->toString

所以，根据逻辑顺序就有

```
                        []==true
[]==ToNumber(true)      []==1
ToPrimitive([])==1      []==1
ToString([])==1         ""==1
ToNumber("")==1         0==1
                        false
```


