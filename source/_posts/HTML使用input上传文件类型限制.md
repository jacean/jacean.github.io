---
title: HTML使用input上传文件类型限制
date: 2016-05-27 14:39:41
tags:
    - HTML    
categories:
    - 前端
---
在上传文件的时候,我们经常会有特定的文件需求,比如只要word,或是excel,jpeg等等,这个是可以在前端的input来直接进行限制的.
<!--more-->
在stackoverflow上找到的答案[HTML Input=“file” Accept Attribute File Type (CSV)](http://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv).
对各种文件的input限制详细描述:
```
Valid Accept Types:

For CSV files (.csv), use: 
<input type="file" accept=".csv" />

For Excel Files 97-2003 (.xls), use: 
<input type="file" accept="application/vnd.ms-excel" />

For Excel Files 2007+ (.xlsx), use: 
<input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />

For Text Files (.txt) use: 
<input type="file" accept="text/plain" />

For Image Files (.png/.jpg/etc), use: 
<input type="file" accept="image/*" />

For HTML Files (.htm,.html), use:
<input type="file" accept="text/html" />

For Video Files (.avi, .mpg, .mpeg, .mp4), use:
<input type="file" accept="video/*" />

For Audio Files (.mp3, .wav, etc), use:
<input type="file" accept="audio/*" />

For PDF Files, use:
<input type="file" accept=".pdf" /> 


NOTE:

If you are trying to display Excel CSV files (.csv), do NOT use:

text/csv
application/csv
text/comma-separated-values (works in Opera only).
If you are trying to display a particular file type (for example, a WAV or PDF), then this will almost always work...

 <input type="file" accept=".FILETYPE" />

```