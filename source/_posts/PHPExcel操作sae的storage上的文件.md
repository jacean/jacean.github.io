---
title: PHPExcel操作sae的storage上的文件
date: 2016-03-24 12:38:33
tags:
    - PHP
    - PHPExcel
    - sae
categories:
    - 后端
---
在用PHPexcel操作excel的时候，在本地是好使的，但是把代码部署到sae就不好使了。会遇到文件操作被拒绝的问题。
![文件操作被拒绝](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_sae-2.png)
<!-- more -->

这个原因就是sae上的应用文件是不允许改动的。sae提供的文件方案是使用storage，所以可以把文件存储在storage来进行操作。
具体解决可以如下：
我在sae应用里新建一个domain域files（这个名字必须是小写字母或数字，如果是大写字母的话虽然可以在Cyberduck上新建成功，在domain管理里看到，但是是无效的domain）。在这个files下新建文件夹Files，然后把要操作的excel上传。
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_sae-3.png)
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_sae-4.png)
如上。
我对excel的操作代码如下：

```PHP
$file_name="Files/info.xls";
$objPHPExcel=PHPExcel_IOFactory::load($file_name);
$objPHPExcel->setActiveSheetIndex(0);
$row=$objPHPExcel->getActiveSheet()->getHighestRow()+1;
$objPHPExcel->getActiveSheet()->SetCellValue('A'.$row,$_POST['inputName']);
$objPHPExcel->getActiveSheet()->SetCellValue('B'.$row,$_POST['inputClass']);
$objPHPExcel->getActiveSheet()->SetCellValue('C'.$row,$_POST['inputEmail']);
$objPHPExcel->getActiveSheet()->SetCellValue('D'.$row,$_POST['inputJob']);
$objPHPExcel->getActiveSheet()->SetCellValue('E'.$row,$_POST['inputTel']);
$objWriter=newPHPExcel_Writer_Excel5($objPHPExcel);
$objWriter->save($file_name);
```
执行的是在info.xls的末尾添加一行。
修改之后的代码如下;

```PHP
$file_name='saestor://files/Files/info.xls';
$objPHPExcel=PHPExcel_IOFactory::load($file_name);
$objPHPExcel->setActiveSheetIndex(0);
$row=$objPHPExcel->getActiveSheet()->getHighestRow()+1;
$objPHPExcel->getActiveSheet()->SetCellValue('A'.$row,$_POST['inputName']);
$objPHPExcel->getActiveSheet()->SetCellValue('B'.$row,$_POST['inputClass']);
$objPHPExcel->getActiveSheet()->SetCellValue('C'.$row,$_POST['inputEmail']);
$objPHPExcel->getActiveSheet()->SetCellValue('D'.$row,$_POST['inputJob']);
$objPHPExcel->getActiveSheet()->SetCellValue('E'.$row,$_POST['inputTel']);
$objWriter=newPHPExcel_Writer_Excel5($objPHPExcel);
$objWriter->save($file_name);
```

可以看到，修改的只是文件路径。然后操作就完全没有问题了。
问题解决了，接下来我要扯扯怎么找到的办法。
刚开始说要用storage，好，我就去sae官网看storage文档，结果，说的什么鬼，没有收获。
毕竟我要找的重点是storage文件的存储路径，文档里说的是整个元素级的处理。
只有一句：
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_sae-5.png)
这个还是在介绍文档里说的。
既然如此，我就先上传文件来试试呗。域和文件结构已建好。[代码参考](http://cloudbbs.org/forum.php?mod=viewthread&tid=23708)里的7楼作者回答。
上传文件代码如下：

```PHP
<metacharset="UTF-8"/>
<formaction=""method="post"enctype="multipart/form-data">
<inputtype="file"name="file"/>
<inputtype="submit"/>
</form>
<?php
if($_FILES['file']!='')
{
$storage=newSaeStorage();
$domain='files';
$dest='Files/'.$_FILES['file']['name'];
$src=$_FILES["file"]["tmp_name"];
$storage->upload($domain,$dest,$src);
$url=$storage->getUrl($domain,$dest);
echo"网址：$url<br/><imgsrc='$url'/>";
}
 
?>
```
可以看到返回的地址是：http://dutcircle-files.stor.sinaapp.com/Files/实验.png
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_sae-6.png)
在应用管理里也可以看到文件是已经上传好了的。
再尝试打开下：

```PHP
<metacharset="UTF-8"/>
<formaction=""method="post">
<inputtype="text"name="text"/>
<inputtype="submit"/>
</form>
<?php
if($_POST['text']!='')
{
$storage=newSaeStorage();
$domain='files';
$dest='Files/'.$_POST['text'];
$url=$storage->getUrl($domain,$dest);
echo"网址：$url<br/><imgsrc='$url'/>";
}
 
```
可以看到，可以通过这个url来获取文件。
但是，直接把这个url用来操作excel，

```PHP
$objExcel=newPHPExcel();
$storage=newSaeStorage();
$domain='files';
$dest='Files/info.xls';
$url=$storage->getUrl($domain,$dest);
$file_name=$url;
//http://dutcircle-files.stor.sinaapp.com/Files/info.xls
$file_name='saestor://files/Files/info.xls';
$objPHPExcel=PHPExcel_IOFactory::load($file_name);
```

是不对的，会报错，找不到这个文件。
所以得换个[方法](http://saebbs.com/forum.php?mod=viewthread&tid=9456)
虽然提的问题和我不一样，但人家已经解决了我的问题。
![](http://7xrtyi.com1.z0.glb.clouddn.com/hexoBlog_img_sae-7.png)
修改代码，至此，大功告成。


