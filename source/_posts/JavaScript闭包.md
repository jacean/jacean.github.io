---
title: JavaScript闭包
date: 2016-03-23 11:59:07
tags:
    - JavaScript
categories:
    - 前端
---
在那次面.NET却问前端的面试，被问到了js的闭包。虽然这个经常听到，但是具体是什么样的还真不太清楚，所以就直接说了不知道。
吃一堑长一智，今天就好好来学习下js的闭包。万一再碰到这种奇葩咋办。
闭包，函数可以使用函数之外定义的变量，具体说，闭包中的函数可以‘记忆’它创建时候的环境。
一个闭包就是一个使用了外部变量的函数。
参考文章[闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures),例子借用此文，加注个人看法。
<!-- more -->

### Update 16.04.04
项目运用闭包。
在js给html的元素添加事件的时候，需要指定对象。一般直接指定就ok。但是当循环指定的时候，你的函数指定了，但是里面涉及到循环的变量却并没有固定，它还会随着循环一直变化，在你调用的时候发现根本不好使了。
这时候就需要闭包了。
下边是进行微信开发时，为了给每一个ｍａｒｋｅｒ添加点击事件而写的代码。
在循环中使用注释代码，那么在触发事件的时候，不会有执行，跟踪调试就会发现，原来此时的ｌａｂｅｌ是label[label.length],这么一个不存在的对象，那么自然也无法执行了。究其原因，就是因为事件绑定的时候只是给了事件函数，但是在触发调用的时候里面的值以及变了，变成了循环最后的值，这才导致整个事件执行失败。
解决办法就是在绑定函数的时候，把变量给固化在函数里，这样循环也不会影响函数内变量的值，这就需要用到闭包。

'''JavaScript

//闭包函数
function markerChangeVisible(marker,map){

    return function(){
        marker.setMap(map);
        if(marker.getVisible()){
            marker.setVisible(false);
        }else{
            marker.setVisible(true);
        }
    }

 }

for(var i=0;i<makers.length;i++){
        var m=makers[i];
        var lable=labels[i];
        //闭包
        qq.maps.event.addListener(m,"click",markerChangeVisible(lable,map));
        //qq.maps.event.addListener(m,"click",function(){
        //    //alert(m.getTitle());
        //    if (label.getVisible()) {
        //        label.setVisible(false);
        //    } else {
        //        label.setVisible(true);
        //    }
        //});

    }

'''

### 原理浅读

```JavaScript
function init(){
    var name="jacean";
    function display(){
        console.log(name);
    }
    display();
}
init();
```
输出：
>jacean

这个例子中，name并没有在display中定义，但是却使用了外部的name。这实质上就是init函数组成了一个闭包。闭包是一种特殊的对象。它由两部分构成：函数，以及创建该函数的环境。环境由闭包创建时在作用域中的任何局部变量组成。在我们的例子中，init() 是一个闭包，由 display 函数和闭包创建时存在的 "jacean" 字符串形成。
如果
```JavaScript
function init(){
    var name="jacean";
    function display(){
        console.log(name);
    }
    return   display();
}
var fun=init();
fun();
```
这样的话就会看到输出同样的结果。在fun函数创建的时候，init了一个闭包，闭包里包含name参数和函数display，这就是创建时的环境。

```JavaScript
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```
>在这个示例中，我们定义了 makeAdder(x) 函数：带有一个参数 x 并返回一个新的函数。返回的函数带有一个参数 y，并返回 x 和 y 的和。
从本质上讲，makeAdder 是一个函数工厂 — 创建将指定的值和它的参数求和的函数，在上面的示例中，我们使用函数工厂创建了两个新函数 — 一个将其参数和 5 求和，另一个和 10 求和。
add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的环境。在 add5 的环境中，x 为 5。而在 add10 中，x 则为 10。

这个例子中可以看出，在声明add5和add10的时候，makeAdder已经利用参数5和10分别创建了两个实例闭包，虽然是同一个函数定义，但是却因为参数不同保存了不同的环境，在内部函数执行的时候，使用的参数也不同。

可以看出，闭包是允许将函数与其所操作的某些数据环境关联起来，根据不同的需要环境执行不同的操作。而这个操作区别并不在函数定义之内，完全尤其所在环境决定，有使用者轻易支配，避免了对环境复杂的分析转化，很有用。

```JavaScript
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;


<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
```
可以看出，这样避免了事件响应时执行函数不同而需要重新声明的麻烦。onclik需要一个方法，这个方法是不能有参数的对吧，所以你不能通过给一个普通函数传递参数的方法实现3次不同的调用，但通过闭包返回函数，确实做到了这一步。这的确是很大的简化。

有一个常见错误是在循环中创建闭包。

```JavaScript
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp();
```
虽然乍看起来没有错误，但是执行起来并不会有期望的效果。
在onfoucs的回调被执行的时候，循环早已完成，此时item已经指向了最后一项，所以结果是3个点击显示的都是最后一个。
原因就在于赋给onfoucs的是匿名函数而不是闭包对象，匿名函数共享同一个环境item，而item在循环中可变，并没有固定值在匿名函数中。
可以通过使onfocus指向一个新的闭包对象，通过闭包对象记忆创建环境的特征，把item固化。

```JavaScript
function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function makeHelpCallback(help) {
  return function() {
    showHelp(help);
  };
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
  }
}

setupHelp();
```
>这段代码可以如我们所期望的那样工作。所有的回调不再共享同一个环境， makeHelpCallback 函数为每一个回调创建一个新的环境。在这些环境中，help 指向 helpText 数组中对应的字符串。

以上，闭包可以看做是固化函数创建时环境的一种手段，可以有效的简化因为不同参数需求而又不能有参数设定的地方,又能够有效避免可变量对参数的影响。


