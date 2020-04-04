---
title: JSONP跨域
date: 2016-04-02 21:16:01
tags:
    - jsonp
    - web
categories:
    - 前端
---
## JSONP跨域
最近做微信开发，因为要调用微信api，所以需要进行跨域访问。ajax就不行了，由于同源策略，它不支持跨域。又因为是进行GET访问，所以选取了JSONP的方式。
说明一点，虽然Jquery把JSONP集成到了ajax，但是JSONP确实不是ajax的实现。
JSONP进行跨域的办法是利用< script>标签不受来源限制。当然，< img>等的来源也是不受限制的。
<!-- more -->

## 原理
在请求页面声明一个函数作为回调函数，

```JavaScript
function returnJsonp(data){

	alert(data.value);
}
```

然后添加远程调用

```HTML
	<srcipt src="xxx://remote.js"></script>
```
当然，远程调用的文件里必须有这个回调函数的使用，回调函数的参数就是要传递的json数据。
同时，注意引用标签应该在回调函数声明之后，以保证回调函数的定义。

```JavaScript
//xxx://remote.js
returnJsonp({"value":"我是要传过去的值"});
```
原理很清晰。其实就是引用的远程文件利用自己的数据调用回调函数，我们可以自定义回调函数的处理。
所以，只要远程文件能够生成对回调函数的引用，并将json数据传入参数，就大功可成。
回调函数在远程服务器端并不一定需要知晓，也就是是可以由客户端指定的，只是这样就需要服务器端解析ｕｒｌ了，传递过来的ｕｒｌ也自然不能只是一个简单的ｊｓ文件。而应该是能解析服务器的语言。
如果远程是ｐｈｐ的话，在添加远程ｕｒｌ的时候，记得在最后*&callback=returnJsonp*,然后服务器端只需要"$_GET['callback']",就能获得回调函数的名字，然后拼接出一个js的回调函数的调用就可以了。

```PHP
	echo "<script>".$_GET['callback']."(".$data.")"."</script>";
```

**有一点要注意，利用JSONP的原理，传过来的并不一定非是JSON数据，也可以是其他对象，在使用中应灵活运用。比如微信传过来的Object对象。**

## JQuery使用JSONP
在dataType处指定类型为jsonp，提供success的回调函数。其他的方式，比如JQuery.get,JQuery.getJSON等，都是一样的指定类型和回调函数就可。
```JavaScript

$.ajax({
        url:src,
        dataType:'jsonp',
        data:'',
        jsonp:'callback',//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        //jsonpCallback:"returnJsonp",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success:function(result) {
			//result就是Json数据
        },
        timeout:3000
    });
```

## 附录JSON语法
json和xml一样，是轻量级的数据交换格式。方便书写和理解。
JSON 语法是 JavaScript 对象表示语法的子集。
- 数据在键值对中
- 数据由逗号分隔
- 花括号保存对象
- 方括号保存数组

简单说就有对象和数组两种结构。实例如下：

```JavaScript
{
    "people":[
        {"firstName":"Brett","lastName":"McLaughlin","email":"aaaa"},
        {"firstName":"Jason","lastName":"Hunter","email":"bbbb"},
        {"firstName":"Elliotte","lastName":"Harold","email":"cccc"}
    ]
}
```
