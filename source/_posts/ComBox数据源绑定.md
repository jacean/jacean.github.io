---
title: ComBox数据源绑定
date: 2016-03-15 15:08:29
tags:
    - C#
categories:
    - .NET
---
.NET对很多数据控件都提供了数据绑定的功能，很方便，但是在方便的时候又会有很多不便，以我的经验来看还是慎用为妙。不过在这里还是记录下ComBox的数据绑定，自动不全以及避免两个combox的数据联动。
<!-- more -->
c#winform中，两个combox绑定到同一个数据源会联动变化。解决办法是把当前表复制，其中一个combox绑定的复制表中。

'''C#
combox1.DataSource = datatable.Copy();

comboBox1.DataSource = dt;
comboBox2.DataSource = dt;//修改此处
comboBox1.DisplayMember = "name";
comboBox2.DisplayMember = "name";
comboBox1.ValueMember = "name";
comboBox2.ValueMember = "name";
comboBox1.AutoC ompleteSource = AutoCompleteSource.ListItems;
comboBox1.AutoCompleteMode = AutoCompleteMode.SuggestAppend;
comboBox2.AutoCompleteSource = AutoCompleteSource.ListItems;
comboBox2.AutoCompleteMode = AutoCompleteMode.SuggestAppend;
//设置自动补全和从数据表中绑定


//通过Linq来绑定数据
var l=listControls.Select(lc=>lc.Name);
cBPro.DataSource = l.ToList<string>();
```

