---
title: javascript中模块封装
date: 2016-06-30 23:56:09
tags:
    - javascript
    - 封装
categories:
    - 前端
---

javascript假设一切都是正确的，给所有脚本同样的权限，脚本、变量之间可以互相覆盖，这就给开发带来了一定的意外。
这里我们通过引入两个存在干扰的脚本文件来一步步解决这个问题。

<!--more-->
## 引入干扰
在一个HTML页面中引入两个脚本文件script1.js和script2.js.
```
//HTML

<script src="script1.js"></script>
<script src="script2.js"></script>    
<script>
    console.log("a:"+ a);
</script>
--------

//script1.js

var a = 1;

function init(params) {
    console.log("1-init:" + a);
}

window.onload = init;

---------

//script2.js

var a=2;

function init(params) {
    console.log("2-init:"+a);
}

window.onload=init;
```
实际上最后的结果是:
> 
a:2
2-init:2

执行结果为后加载的script2.js。


## 模块封装 

这种情况下，为了代码的正确执行，我们就可以采取模块封装，人为加上命名空间。
```
//script1.js
var script1 = function () {
    var a = 1;

    function init(params) {
        console.log("1-init:" + a);
    }

    return {
        a:a,
        init:init
    }
}();            //不要忘了这个执行函数的括号

window.addEventListener("load",script1.init,false);

//script2.js
var script2 = function () {
    var a = 2;

    function init(params) {
        console.log("2-init:" + a);
    }
  
    return {
        a:a,
        init:init
    }
}();            //不要忘了这个执行函数的括号

window.addEventListener("load",script2.init,false);
```
这样的话，在命名上就避免了冲突，各个脚本之间互不干扰，各自执行。
上面的代码执行结果是：
>
index.html:15 Uncaught ReferenceError: a is not defined(anonymous function) @ index.html:15
script1.js:13 1-init:1
script2.js:13 2-init:2

a没有被定义，因为现在两个脚本的变量都在各自命名空间内部，所以，要使用的话得是明确指出是哪个，增强了目标性。

如上，这种封装之后，我们只需要通过return来暴露自己想要暴露的，而隐藏了自己不想公诸于众的东西，增加了安全性。

一定要注意这样做是用了函数执行自身的方法，即在函数声明之后加了括号，function(),来让函数立即执行，保证脚本变量确实是接收到了函数内部的返回值。

我这里使用的是return函数指针，而不是函数本身，这个可以根据自己喜好，比如写成这样：
```
var script2 = function () {
    var a = 2;
    return {
        a:a,
        init:function (params) {
            console.log("2-init:" + a);
        }
    }
}();
```

当然，有时候不需要暴露任何东西的时候，有一种更简单的写法。

```
(function(){
    var a=1;
    function init(){};
})();
```

当然，即使这样我们也可以暴露一些东西，以全局变量的形式。
```
(function(root){
    root.x=1;
    root.a=function(){
        alert(1);
    }
})(this);

console.log(x);
a();
```

