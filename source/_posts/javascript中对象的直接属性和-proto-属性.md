---
title: javascript中对象的直接属性和__proto__属性
date: 2016-06-30 23:54:30
tags:
    - javascript
    - __proto__
categories:
    - 前端
---
先补充下 \_\_proto\_\_ 和prototype的知识。
## 对象的内部原型( \_\_proto\_\_ )和构造器的原型（prototype）。
所有构造器/函数(包含自定义)的 \_\_proto\_\_ 都是指向Function.prototype这样一个*空函数（typeof Function.prototype==='function' ->true）*的，而Math和JSON这样以对象形式存在的，他们的\_\_proto\_\_是Object.prototype.
继续深入有

```
Function.prototype.__proto__ === Object.prototype;
```

,而 

```
Object.prototype.__proto__ === null
```

所有构造器的实例对象的 \_\_proto\_\_ 都是指向其构造器的 *prototype*。
<!--more-->
看下面这个例子，

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
又\_\_proto\_\_是其构造器的prototype属性，故有，

```
o1.__proto__===Object.prototype   //true
```

详见[JavaScript中__proto__与prototype的关系](http://www.cnblogs.com/snandy/archive/2012/09/01/2664134.html)。

## 对象的直接属性和\_\_proto\_\_属性
修改构造器的prototype的属性或方法，其实例对象的\_\_proto\_\_依然恒等于构造器的prototype，两者指向同一个对象。
在查找对象属性的时候，顺序是  
> 直接属性 -|->  \_\_proto\_\_属性,有则返回，无则深入。

在修改对象属性的时候，顺序是
> 直接属性 -|-|  \_\_proto\_\_属性，只会修改直接属性，而不深入到\_\_proto\_\_这个继承自构造器的属性。


```
function Person(){
    this.name="jacean";
    this.age=12;
}
Person.prototype.sex="male";
Person.prototype.country="Chinese";

var p1=new Person();
var p2=new Person();

//初始状态下两个实例的属性是一样的
console.log(p1.name);   //jacean
console.log(p1.sex);    //male
console.log(p1.__proto__.sex)   //male

console.log(p2.name);   //jacean
console.log(p2.sex);    //male
console.log(p2.__proto__.sex)   //male

console.log("......");
p1.name="bob";
p1.sex="famle";
//更改了p1的直接属性name，因为p1没有sex的直接属性，所以在这里会给p1添加sex的直接属性，而不会深入到__proto__去修改构造器的sex
//所以这里的sex修改并不会影响p2
console.log(p1.name);   //bob
console.log(p1.sex);    //famale
console.log(p1.__proto__.sex)   //male

console.log(p2.name);   //jacean
console.log(p2.sex);    //male
console.log(p2.__proto__.sex)   //male
console.log("......");

Person.prototype.sex="nomale";
//修改了构造器的sex属性，相对应的p1和p2的__proto__.sex也会发生改变。
//p1因为有直接sex属性，所以p1.sex不受影响，而p2没有sex直接属性所以p2.sex是读取的构造器属性
console.log(p1.name);   //bob
console.log(p1.sex);    //famale
console.log(p1.__proto__.sex)   //nomale

console.log(p2.name);   //jacean
console.log(p2.sex);    //nomale,p2是没有sex这个直接属性的，所以这里读到的还是其构造器的属性
console.log(p2.__proto__.sex)   //nomale
console.log("......");
```
