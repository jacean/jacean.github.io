---
title: ajax提交含文件表单
date: 2016-05-27 14:17:34
tags:
    - ajax
categories:
    - 前端
---
使用ajax和后台交换数据是web开发中常用的手段,jquery也提供了很方便的使用方法.如$.ajax()等.
但是,交换的数据经常是表单,当表单中有文件的时候,普通的ajax手段就不好使了.这时候,可以使用formdata来进行文件的ajax.

<!--more-->
在使用ajax和后台传递数据的时候,因为要上传文件,所以在后台php处用了$_FILES["file"],但是提示错误"未定义index下标",一想才记起ajax是不能传递文件信息的.
无效代码如下:

```
$.ajax({
            cache: true,
            type: "POST",
            url:'infowrite.php',
            data:$('#infoform').serialize(),// 你的formid
            async: false,
            error: function(request) { 
            },
            success: function(data) {
            },
            dataType: "json"
            });
```
决定采用formdata,先对表单进行处理,创建FormData对象.
```
var fd = new FormData(document.getElementById("fileinfo"));
$.ajax({
            cache: true,
            type: "POST",
            url:'infowrite.php',
            data:fd,
            async: false,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            error: function(request) {
            },
            success: function(data) {
            },
            dataType: "json"
        });
```

这样改正之后,在后台页面就可以接收file信息,使用$_FILES这个全局数组了.

除了将从form创建formdata外,也可以先创建空formdata,然后使用append等手动添加字段.
更多对formdata的使用,还是参见官方文档比较靠谱,我就不乱说了.
[使用FormData对象](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Using_FormData_Objects)
