---
title: 微信开发--iframe中使用微信api
date: 2016-04-20 00:04:08
tags:
    - 微信开发
    - iframe
categories:
    - 微信开发
---
虽然题目是iframe中使用微信api,但是我得声明一点
**微信api是不能在iframe中进行签名认证的**

这算自相矛盾,但是,开发就是要在矛盾中找到解决方案.所以,您接着往下看吧.
<!-- more -->
微信限制了api的调用,不能在iframe中进行api的签名认证,只能在主页面中使用.

所以解决方法就是在父页面实现微信api的签名认证,然后iframe里利用

```
window.parent.wx.xxx;
window.top.wx.xxx;
```
这样的方法来实现iframe使用微信api.

然后看一个实际的应用场景.

微信提供了认证的几种方式,比如php,java,node,python.
但是,假设我的主项目是jsp的,我要用微信api,然而我只有或是只会只能用php的验证方法,而我又想在iframe中使用微信api,我不能让一个jsp页面同时有php的存在,那该怎么办?

我的方法就是,把认证签名的父页面,摆脱后台限制.

我现在有php的验证是吧,那我就用ajax和php后台把签名数据要过来,然后js去验证就好了.
这样主页面就只剩下纯html和js.这时候,主项目爱是java是java,python是python,都随意了,微信api随便用.

根据我之前的(ajax实现php验证微信的博客)[http://blog.jacean.cn/2016/04/19/%E5%BE%AE%E4%BF%A1%E5%BC%80%E5%8F%91-php%E4%BD%BF%E7%94%A8ajax%E8%AE%A4%E8%AF%81%E7%AD%BE%E5%90%8D/],我可以在主页面是引入脚本

```
    <script src="include_wxsignature.js"></script>
```
这样,这个页面就已经实现了微信api的认证,并没有需要后台代码.

然后在iframe里

```
        //开始录音
        function startRecord() {
            c = 0;
            timedCount();
            window.top.wx.startRecord();
            onVoiceRecordEnd();
        }

        //停止录音接口
        function stopRecord() {
            window.top.wx.stopRecord({
                success: function(res) {
                    localId = res.localId;
                    stopCount();
                    document.getElementById('localid').innerHTML = localId;

                }
            });
        }
```

这样下来,对父页面的限制就没有了,因为需要的签名认证,纯js已经实现了.
既没有干涉主项目,又实现了功能需求.

在这个场景下最好的当然是利用jsp验证,一步到位.
