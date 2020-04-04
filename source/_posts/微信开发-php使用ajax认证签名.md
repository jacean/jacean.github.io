---
title: 微信开发--php使用ajax认证签名
date: 2016-04-19 21:49:28
tags:
    - 微信开发
    - ajax
    - php
categories:
    - 微信开发
---
微信现在很火,基于微信接口开发各种自家功能产品的公司很多.
老板也要开发微信,所以我也得干微信.
微信开发,首先得认证签名让微信提供接口给你.微信公众开发平台的官网有提供sample,有php,java,node和python.我用的php.
先提坑,用微信提供的例子来进行验证,本页面是好用的,但是那个jssdk不能通过ajax直接调用,我没注意结果坑惨我了.
一直报
> config:invalid signature
 
且看我如何干掉它.
<!-- more -->
## 普通认证
微信认证需要通过config注入权限验证,配置官网说是:

```
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表，});
```
然后它提供的php例子中的jssdk也实现了验证函数,直接参考例子调用就可以了.

```
$signPackage = $jssdk->GetSignPackage();

......

wx.config({
            debug: false,
            appId: '<?php echo $signPackage["appId"]; ?>',
            timestamp: <?php echo $signPackage["timestamp"]; ?>,
                nonceStr: '<?php echo $signPackage["nonceStr"]; ?>',
            signature: '<?php echo $signPackage["signature"]; ?>',
            jsApiList: [
                // 所有要调用的 API 都要加到这个列表中
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage'
            ]
        });

```
然后配套参数对应即可.
你会发现用的很爽.
但是,当你决定使用ajax来验证的时候,问题就出现了.
## ajax调用签名验证--url的踩坑
刚开始嘛,想是这么爽,那就直接来,只是需要php返回的值而已,那就用ajax直接向后台要,然后前台解析json赋值.恩,就是这样,于是
ajax调用的php页面,wxsignature.php
```
<?php 
error_reporting(0); //屏蔽警告输出
require_once "jssdk.php";
include_once "config/config.php";
$jssdk = new JSSDK(APPID, SECRET);
$signPackage = $jssdk->GetSignPackage();
 
$response=array();
$response["appId"]=$signPackage["appId"];
$response["timestamp"]=$signPackage["timestamp"];
$response["nonceStr"]=$signPackage["nonceStr"];
$response["signature"]=$signPackage["signature"];
echo json_encode($response);
 
?>

```
前台获取php的签名json数据
```
$.getJSON(url:"wxsignature.php",
            success:function(data){
                data=data;
                wx.config({
            debug: false,
            appId: data.appId+"",
            timestamp: data.timestamp,
                nonceStr: data.nonceStr+"",
            signature: data.signature+"",
            jsApiList: [
                // 所有要调用的 API 都要加到这个列表中
                'openLocation',
                'getLocation',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage'
           ]
        });
```
然后,测试,boom,爆炸了.认证失败,用微信提供的调试工具或是打开debug:true,会发现
> config:invalid signature

然后,慌里慌张的去看appid对没对,安全域名写好没,数字和字符串转换有问题没,都没有.那到底是什么啊...
我就真没辙了,毕竟别人是有成功的,只能是我姿势不对,还不知道哪里不对,感人.
所以,之后的一系列工作都只能另寻他路,各种踩坑.
踩着踩着,实在受不了了,我要再战一次!!!
好吧,我还是输了.
所以我就认真思考了,谷歌不行,试试百度吧.
于是,我就发现有好多人也是这问题,但是提供解决的方法的没几个,真是gg,可能是问题的原因太多了吧.不过,这不重要,对我来说重要的是发现了这个
[微信js接口签名校验工具](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign)
![](http://7xrtyi.com1.z0.glb.clouddn.com/wx-api.jpg)

我发现了之前忽视的一点,那就是url.
在这里插播一下我之后正确的签名验证,给来个大样子先,控制台输出:

```
Object {appId: "wxf1c8b315ae8ee763", timestamp: 1461074261, nonceStr: "VdThPEGqgU4RsAtX", signature: "097f1f4dbbd5c9e3f51bc64ca013701ed2e1d7b5", url: "http://wx.jacean.cn/asj/wxapi/part_gps.html"…}

appId:"wxf1c8b315ae8ee763"
jsapiTicket:"kgt8ON7yVITDhtdwci0qeS90XOQl1ZXOLYVWCn6BaGPDfqy39W34CAL6JW3wFg2gq1H9ZZqzKwh91NJA2Lwh3Q"
nonceStr:"VdThPEGqgU4RsAtX"
signature:"097f1f4dbbd5c9e3f51bc64ca013701ed2e1d7b5"
timestamp:1461074261
url:"http://wx.jacean.cn/asj/wxapi/part_gps.html"

```

于是,赶紧去查了查相关资料,发现了url是其中重要的一环,是用来生成签名的一部分元素.
但是,必须要注意的是,在生成签名的时候,url必须是你认证微信接口的那个页面的url.
关于url必须注意以下几点:
1. url必须动态获取
2. url不能有#号的出现,比如一些网站自动后边加#wechat,必须把这些去掉
3. url的与当前调用页在地址栏显示的必须一致(除了#),参数也是
4. url解析不能有转义,比如把:,/等转义成utf-8字符码

只有这样,你的url才是正确的.

然后,我去看了看自己的代码,根本就没注意这点,url是在jssdk里人家提供的例子,但是人家提供的是

```
// 注意 URL 一定要动态获取，不能 hardcode.
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
```
虽然是动态获取,但获取的确是调用这个jssdk的页面的url.
像我之前那样直接的用法,url就是我的wxsignature.php,而这个并不是我真正要用wxapi的页面,所以才会一直报错.
哈哈,终于找到问题了,那就解决.
咱们可以这样获取url,在需要微信api的页面,使用如下语句

```
var url=encodeURI(location.href.split('#')[0]);

//encodeURI方法不会对下列字符编码  ASCII字母、数字、~!@#$&*()=:/,;?+'
//encodeURIComponent方法不会对下列字符编码 ASCII字母、数字、~!*()'
//encodeURIComponent比encodeURI编码的范围更大。
//一定不能用encodeURIComponent,因为它的作用范围比较大,效果如下
//  http://     -->>  http%3A%2F%2F
//这明显会导致传入的url不能被微信认可
```

url既然已经到手,那接下来就是改造微信提供的jssdk.
主要修改部分如下:

```
class JSSDK {
  private $appId;
  private $appSecret;
  private $url;                             //增加url变量
  public function __construct($appId, $appSecret,$url) {        //构造函数加入url
    $this->appId = $appId;
    $this->appSecret = $appSecret;
    $this->url=$url;                        //url赋值
  }

......

 // 注意 URL 一定要动态获取，不能 hardcode.
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    //注释掉原本的url,给局部url赋值
    //$url = "$protocol$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";       
    $url=$this->url;                
    $timestamp = time();
    $nonceStr = $this->createNonceStr();
......

    //增加返回结果,方便调试查看
 $signPackage = array(
      "appId"     => $this->appId,
      "nonceStr"  => $nonceStr,
      "timestamp" => $timestamp,
      "url"       => $url,
      "signature" => $signature,
      "rawString" => $string,
      "jsapiTicket"=>$jsapiTicket
    );

```

然后,url再结合ajax,前台就可以是这样了:

```
        var url=encodeURI(location.href.split('#')[0]);
        $.post("ajax_wxconfirm.php",
        {
            url:url
        },
        function(dataStr){
            var data = $.parseJSON(dataStr);  
                wx.config({  
                    debug: false,  
                    appId: data.appId,  
                    timestamp: data.timestamp,  
                    nonceStr: data.nonceStr,  
                    signature: data.signature,          
                    jsApiList: [  
                        'openLocation',
                        'getLocation',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'closeWindow' 
                    ]  
                });
                wx.ready(function() {
                    // 在这里调用 API
                   
                });

                wx.error(function(res) {
                    alert(res.errMsg);
                }); 
        });
```

现在再去测试,果然是
> config:ok

而且,这部分代码可以作为一分js文件,在需要微信api的页面

```
<script src="include_wxsignature.js"></script>
```
然后就可以随意wx.xxx(),是不是很方便了.
## END
微信签名认证搞定,通过这样的话,我的微信页面就可以是纯js,html,任何语言都可以在这个页面进行操作,比如jsp和php,方便的使用wxapi.
之后会把整个微信开发的代码放到github,这之前有需要的可以留言或是其他方式找我先要.
希望能帮到和我一样踩坑微信的同道吧.
