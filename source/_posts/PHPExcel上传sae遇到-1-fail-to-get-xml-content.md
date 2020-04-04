---
title: 'PHPExcel上传sae遇到:-1:fail_to_get_xml_content'
date: 2016-03-24 12:26:25
tags:
    - PHPExcel
    - PHP
    - sae
categories:
    - 后端
---
在用PHPExcel1.8.0来处理excel时，本地测试时好使的，但是要把代码部署到SAE，在上传代码的时候就会遇到这个问题。
>部署代码中遇到问题: -1:fail to get xml content

在网上查了下，好多人在用wordpress和weiPHP的时候也遇到了这个问题，解决办法是，用wordpress for sae，weiPHP也是修改那什么代码，对PHPExcel没什么参考价值。暂时我也不知道这个问题对自己的应用有什么影响，所以暂且略过。
在结束部署之后，访问页面的时候，在需要excel处理的地方，就会报错.

<!-- more -->
![错误截图](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_sae-1.png)

报错说是找不到XMLWriter这个类。我在PHPExcel的源代码里找，也确实没有找到这个类的定义，只有对这个类的扩展。
这应该就是之前那个错误造成的影响。
网上有人说这个问题是PHP的版本不支持，我信了。
去sae的应用管理里看了下，是PHP5.3，版本不支持应该是版本太旧了吧，所以我就删掉了旧的应用，新建了个PHP5.6的应用。但是上传代码，还是fail to get xml content这个问题。我就呵呵了。
有人说，上传代码包有问题，就有吧，部署后在本地把正确代码用git或svn提交下。我半信半疑，试了下，果然没什么用。
有人说，要把Excel2007改成Excel5，我信了。我就去把代码改了，然后把excel文档的格式也从xlsx改成了xls来适配。结果还是报没找到XMLWriter这个错。
百度不行，我用google，结果又遇到相同问题的人，但没有解决办法的答案。在我一筹莫展的时候，终于找到了一个可以参考的办法。
来源是[Thinkphp中的回答](http://www.thinkphp.cn/topic/12201.html)
>错误为：Class 'XMLWriter' not found
FILE: ThinkPHP/Extend/Vendor/Excel/PHPExcel/Shared/XMLWriter.php 　LINE: 44
检查了下，本地一切正常。本地php扩展有xmlwriter，saw扩展有xml。请教如何破？jorbin2014年06月30日
只要phpexcel的版本支持xml扩展即可，我用的是1.7.2

如上，解决办法是要PHPExcel的版本支持xml扩展。我信了，所以我就去PHPexcel那里下了个他说好使的1.7.2版本。然后删除掉代码里原有的1.8.0，替换成了1.7.2。代码里的一切也都保持是Excel5。然后重新用git提交，把新代码提交上去。这么一来，果然没有报找不到XMLWriter的错了。
但是又报了一个找不到写excel5的类的问题。同样的，我现在源代码里按规律找有没有这个类，还真有，直接包含引用就行了。再一试果然没这个问题了。开心。（应该会有一个新的错误，就是对文件的读写错误，如果和我一样之前并没有意识到sae使用storage来处理文件的话，这个问题在另一篇里解决）
总结下，就我上传使用PHPexcel的应用遇到的这个问题可能是PHPExcel的版本问题吧。所以我们得规避这个问题，用一个支持扩展xml的版本。也就是1.7.2(测试好用)。
 
