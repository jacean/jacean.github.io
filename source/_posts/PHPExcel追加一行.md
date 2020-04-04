---
title: PHPExcel追加一行
date: 2016-03-24 12:12:57
tags:
    - PHPExcel
    - PHP
    - SAE
categories:
    - 后端
---
有项目需要用PHP操作excel，于是就找到了PHPExcel这个库，简单的使用了下。写入还是很方便的，但是我在追加一行的时候遇到了问题，总是会出现追加后只有追加的那一行，而原本的就没有了。
把好使的代码记下。
<!-- more -->

```PHP
<?php 
/** Include PHPExcel */
require_once 'Classes/PHPExcel.php';
require_once 'Classes/PHPExcel/IOFactory.php';
$objPHPExcel = PHPExcel_IOFactory::load("myfile.xlsx");
$objPHPExcel->setActiveSheetIndex(0);
$row = $objPHPExcel->getActiveSheet()->getHighestRow()+1;
//echo $row;
$objPHPExcel->getActiveSheet()->SetCellValue('A'.$row, $_POST['name']);
$objPHPExcel->getActiveSheet()->SetCellValue('B'.$row, $_POST['email']);
$objPHPExcel->getActiveSheet()->SetCellValue('C'.$row, $_POST['phone']);
$objPHPExcel->getActiveSheet()->SetCellValue('D'.$row, $_POST['city']);
$objPHPExcel->getActiveSheet()->SetCellValue('E'.$row, $_POST['kid1']);
$objPHPExcel->getActiveSheet()->SetCellValue('F'.$row, $_POST['kid2']);
$objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
$objWriter->save('myfile.xlsx');
?>

```
这样是好使的。
来份错误的。

```PHP
$php_writer=newPHPExcel_Writer_Excel2007();
$php_excel_obj=$php_writer->getPHPExcel($file_name);
$current_sheet=$php_excel_obj->getSheet(0);
$all_column=$current_sheet->getHighestColumn();
$all_row=$current_sheet->getHighestDataRow();
$letter=array('A','B','C','D','E');
$data=array($_POST['inputName'],$_POST['inputClass'],$_POST['inputEmail'],$_POST['inputJob'],$_POST['inputTel']);
$objReader=PHPExcel_IOFactory::createReader("Excel2007");
$info=$objReader->listWorksheetInfo($file_name);
$row=$info[0]['totalRows'];
$all_row=$row;
$x=$all_row+1;
 
for($i=0;$i<count($data);$i++){
$current_sheet->setCellValue("$letter[$i]$x","$data[$i]");
}
$write=newPHPExcel_Writer_Excel2007($php_excel_obj);
header("Pragma:public");
header("Expires:0");
header("Cache-Control:must-revalidate,post-check=0,pre-check=0");
header("Content-Type:application/force-download");
header("Content-Type:application/vnd.ms-execl");
header("Content-Type:application/octet-stream");
header("Content-Type:application/download");;
header('Content-Disposition:attachment;filename="testdata.xls"');
header("Content-Transfer-Encoding:binary");
$write->save($file_name);
```
这个最后的结果就是只会写入最新的，而原有的不见了。即使读进去再写也不好使。
