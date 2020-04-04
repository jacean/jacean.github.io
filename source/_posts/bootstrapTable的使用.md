---
title: bootstrapTable的使用
date: 2016-05-27 14:48:58
tags:
    - bootstrap
    - html
categories:
    - 前端
---
bootstrap是一个很好的前端框架,因为不是专门做前端的,所以一直就有bootstrap来实现页面.
基于bootstrap开发的插件组件也很多,这里要说的bootstrapTable就是其中很优秀的一款.
<!--more-->
## 引入
不需要自己改动源码,然后又不想研究的我一般都直接是用cdn引入.

```
 <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/bootstrap-table.min.css">

    <!-- Latest compiled and minified JavaScript -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/bootstrap-table.min.js"></script>

    <!-- Latest compiled and minified Locales -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/locale/bootstrap-table-zh-CN.min.js"></script>
    
    
    <!--导出引入-->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.10.1/extensions/export/bootstrap-table-export.js"></script>
    <script src="//rawgit.com/hhurz/tableExport.jquery.plugin/master/tableExport.js"></script>

```

## 使用
基本的使用在bootstraptable的官网和github上都有介绍,以及JSFiddle的在线调试等.
[文档](http://bootstrap-table.wenzhixin.net.cn/zh-cn/documentation/)
[例子](http://bootstrap-table.wenzhixin.net.cn/zh-cn/examples/)
可以很容易上手使用,不过给出的例子都是固定的html和css,不方便动态处理,所以我这里就主要说下使用js对table的各种操作.
谷歌bootstraptable,这篇[JS组件系列——表格组件神器：bootstrap table](http://www.cnblogs.com/landeanfen/p/4976838.html)的系列之作应该是最全也最细致的中文博客了,我也是学习这篇博客来用的,所以会看到很多这位博主的代码和结构,原博主如有要求可联系我删除.

table的初始化需要设置数据来源,列字段,分页方式等等,这些都可以利用js来完成.
不过在使用js完成前,要先**仔细研读bootstraptable的文档**,熟悉了解要使用的属性或方法的值要求.
还有一点,我的数据都是利用ajax来获取的,所以这里的代码都是用提供的默认ajax获取数据的,暂时并没有用到自定义ajax.

### 容器
table的数据显示在table里,所以前端必须有一个
```
<table></table>
```
标签来充当容器以承载数据.
### 初始化
#### 字段
> columns	-	Array	[]	列配置项,详情请查看 列参数 表格.

如上文档里所述,columns对应的是值数组,所以可声明数组来指定字段.
注意数组的成员应该指出field和title.field用来绑定数据字段,title用来做字段的显示名称.
bootstraptable有一个特殊字段,该字段可以实现对数据行的单选或多选,所以在有需求的情况下显示指定这个字段的使用与否.
我定义的字段数组如下:

```
var fieldsarray = Array({
        checkbox: true
    }, {
            field: 'ID',
            title: 'ID'
        }, {
            ...
            ...
            ...
        }, {
            field: 'ly',
            title: '留言'
        });
       
$('#table').bootstrapTable({
   columns: fieldsarray
    }) 
                    
```
#### 数据
数据可以在html中指定,也可以指定json数据或文件.我使用ajax从后台获取json数据.
所以我的初始化就是
```
$('#table').bootstrapTable({
            url: 'info_getdata.php',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）            
            queryParams: oTableInit.queryParams,//传递参数（*）
            })
         
...
            
//查询的参数
oTableInit.queryParams = function (params) {
    var temp = {
        limit: params.limit,   //页面大小,这个不用自己手动改的,在启用分页之后,不显示指定页面大小会使用默认大小,然后在查看数据时可以通过选择来调整这个值,这是自动处理的
        offset: params.offset,  //页码,这个和上面的一样,不用自己手动改.
        
        dt: $("#dt").val(),         //我用来查询的数据表名称
        search: $("#search").val()  //我用来指定分页方式的,客户端或服务端,后边会讲到
    };
    return temp;
};
```
注意一点,这里的method是get而不是post,我就是刚开始一直使用post然后跪了好久,在issue中看到提供的答案基本都是get就换了一下,结果立马好使了.不太清楚为什么post不行,或是我用的姿势不对.
在查询参数这个字段,对应的是一个实现固定接口的函数.文档描述如下

```
queryParams	data-query-params	Function	function(params) {return params;}	
请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 
如果 queryParamsType = 'limit' ,返回参数必须包含limit, offset, search, sort, order 否则, 需要包含: pageSize, pageNumber, searchText, sortName,sortOrder. 返回false将会终止请求
```
所以这里实现了其对应接口,并将必须数据返回.然后bootstraptable就会利用url,method,以及queryParams来使用ajax向后台要取数据.
我的后台处理就是利用这几个来获取数据的,具体根据分页方式来做.
#### 分页
分页有两种,一种是客户端分页,一种是服务端分页.显而易见,客户端分页就是把数据一次性获取,然后在浏览器端利用内存分页,服务端分页就是分批次向服务端要取数据,每次只要一部分.
前述查询参数就是为服务端分页所准备的.
服务端根据页面大小和偏移量来截取部分数据返回,要注意的是limit和offset就是这个数据部分的起始和结束,bootstraptable已经计算好了.最简单的数据查询的服务端是这样
```
//if search==server服务端分页
    $query = "select * from `".$dt."` limit ".$offset.", ".$limit."";

//if search==client客户端分页
    $query = "select * from `".$dt."`";
    
//后台完整PHP
$conn = new mysqlQuery();

$offset = $_GET["offset"];
$limit = $_GET["limit"];
$dt = $_GET["dt"];
$type = $_GET["search"];
$results = array();
if ($type == "server") {
    $query = "select * from `".$dt."` limit ".$offset.", ".$limit."";
    $statement = $conn->dbh->query($query);

    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $results[] = $row;
    }

    $fenye = "SELECT count(`ID`) num FROM `".$dt."` WHERE 1";
    $statement = $conn->dbh->query($fenye);
    $rownum = $statement->fetch(PDO::FETCH_ASSOC);
    $total = $rownum["num"];
    $response = array('total' => $total, 'rows' => $results);
}
if($type=="client"){
    $query = "select * from `".$dt."`";
    $statement = $conn->dbh->query($query);

    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $results[] = $row;
    }
    $response =$results;
}

echo json_encode($response);
$conn->close();

```
服务端返回的应该是json格式,这样bootstraptable才能处理.

仔细看PHP代码,可以看到服务端分页和客户端分页返回的json数据是不一样的.
```
//服务端
    $response = array('total' => $total, 'rows' => $results);
//客户端
    $response =$results;
```
当设置为服务端分页的时候,应当返回的是总行数和要显示的行集合.
为客户端分页的时候,只需要返回行集合就可.

分页方式的设置方式
```
$('#table').bootstrapTable({
            pagination: true,                   //是否显示分页（*）
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索，此搜索只能在已有数据内搜索,所以其只对获取了全部数据的客户端分页有意义,而服务端分页没啥用处.
            strictSearch: false,                 //全匹配搜索
            })
```
重要的两个字段就是pagination和sidePagination,指定是否分页和分页方式.
客户端分页的缺点自然是若数据量过大,获取数据耗时过长以及对内存的占用,而服务端是每次的轻量级交互则没有这点.
不过,在bootstraptable中使用客户端分页会有效益加成,因为数据全部都在,可以做其他的全局操作,比如搜索或是导出.这两个功能对客户端分页的支持很好,但是服务端就不行了.搜索已然鸡肋了,但是导出就会出先各种bug,比如导出方式和数据等等,总之用bootstraptable的export插件就是不好用了,不过这也可能是我使用的姿势不对吧.

提供两种初始化方法,只是分页方式字段稍有不同,其余基本不变就可.
初始化函数最终如下
```
//初始化Table
var TableInit = function () {
    var oTableInit = new Object();
    var fieldsarray = Array({});        //字段数组
    
    
      oTableInit.clientInit = function () {
        $('#table').bootstrapTable('destroy');

        $('#table').bootstrapTable({
            /************** 参数 ****************/
            url: 'info_getdata.php',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            // ajax:"ajaxRequest",
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: false,                 //全匹配搜索
            showRefresh: true,                  //是否显示刷新按钮         
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            showExport: true,                     //是否显示导出
            //exportDataType: "all",
            showColumns: true,                  //是否显示所有的列
            columns: fieldsarray,

            /***************** 事件 *****************/
            onClickRow: function (row, $element) {
                // alert($element);
            },
            onLoadError: function (data) {
                alert(data);
            }

        });
    };
    
    oTableInit.serverInit = function () {
        $('#table').bootstrapTable('destroy');      //先销毁旧的重新初始化
        $('#table').bootstrapTable({
            url: 'info_getdata.php',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            queryParams: oTableInit.queryParams,//传递参数（*）
            ...
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            ...
            detailView: false,                   //是否显示父子表
            showExport: false,                     //是否显示导出
            showColumns: true,                  //是否显示所有的列
            columns: fieldsarray

        });
    };
    
     //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {
            limit: params.limit,   //页面大小
            offset: params.offset,  //页码
            dt: $("#dt").val(),
            search: $("#search").val()
        };
        return temp;
    };
     
    return oTableInit;
}

```
在表格参数中,当名称对应类型是Function的时候,这类就是可以自定义方法的.比如customSort,rowStyle,rowAttributes,根据文档提供的参数和返回值,可以对表格的做出更优秀的展示.

注意下bootstraptable的事件使用.
> 
Option 事件
jQuery 事件
参数
描述

仔细研读这些,可以利用事件对整个交互响应做出更好的体验.



#### 动态指定显示列
因为我是从不同的表里获取数据,其字段也有不同之处,所以每次查询的时候都需要根据表重新指定字段,采用bootstrapTable的方法来指定刷新.
$("#dt")是我的表名.我选取了全部的字段,在查每个不同的表时隐藏掉自己没有的字段.这办法是土了点,但是因为要指定标题所以只好这样了.
```
function setColumns(params) {

    //此方法不存在了
    // $("#table").bootstrapTable('showAllColumns');

    /************* 设置列动态显示变化 ******************/
    switch ($("#dt").val()) {       
        case 'fx_zn':
            $("#table").bootstrapTable('hideColumn', 'zp');
            ...
            $("#table").bootstrapTable('hideColumn', 'fj');
            break;
        case 'jn_per':
            $("#table").bootstrapTable('hideColumn', 'dw');
            ...
            $("#table").bootstrapTable('hideColumn', 'fwb');
            break;
        ...
        default:
            break;
    }
    $("#table").bootstrapTable('refresh');
}
```
在这里看一下bootstraptable的方法.
> 使用方法的语法：$('#table').bootstrapTable('method', parameter);。

在文档里可以看到其方法列表,仔细研读方法参数和描述来合理使用方法.
#### 控件绑定
这套初始化逻辑都是用的那位博主的,感觉还好.
在控件初始化中,将table事件和控件事件绑定.
比如我有切换客户端分页和服务端分页的select,选择查询不同表的select,以及服务端分页时手动的导出.
```
var ControlInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        // 初始化控件事件  
        //根据不同表隐藏显示不同字段列      
        $("#dt").change(function () {
            setColumns();
        });
        //根据查询方式不同选择不同的初始化方式,忽略search这个名字,本来不是用来干这个的,忘了改了,type
        $("#search").change(function () {
            if ($("#search").val() == "client") {
                var oTable = new TableInit();
                oTable.clientInit();
                
                //工具条变化
                $("#clientexport").show();
                $("#serverexport").hide();
                
            } else {
                var oTable = new TableInit();
                oTable.serverInit();
                
                //工具条变化
                $("#clientexport").hide();
                $("#serverexport").show();

            }
            setColumns();
            $("#table").bootstrapTable('refresh');
        });

        $("#serverexport").click(function () {
            window.open("info_export.php?dt=" + $("#dt").val());
        });
    };

    return oInit;
};
```
#### 工具条
根据分页方式的不同,工具条内容变化,控制方式在上一小节的控件事件绑定中
```
<div id="toolbar" class="btn-group">

    <!--bootstrapTable的导出功能客户端分页使用-->
    <select id="clientexport" class="form-control">
        <option value="">导出当前页</option>
        <option value="all">导出全部</option>
        <option value="selected">导出选中项</option>
    </select>
    <!--bootstrap导出end-->
    
    <button id="serverexport" type="button" class="btn btn-primary" style="display:none;">导出Excel</button>
    
</div>
```
#### 初始化表格
在页面加载时执行初始化操作,把以上设置应用到表格上.
```
$(function () {

    //1.初始化Table,采用客户端初始化，在页面设计中配套默认全部获取.我在控件初始化时做了这一步,所以这一段可以咔嚓的.
    var oTable = new TableInit();
    oTable.clientInit();


    //2.初始化Button的点击事件
    var oControlInit = new ControlInit();
    oControlInit.Init();
    
    // 绑定选择导出类型,这个可在扩展export的例子中找到,介绍的很详细
    $('#toolbar').find('select').change(function () {
        $('#table').bootstrapTable('refreshOptions', {
            exportDataType: $(this).val()
        });
    });

    setColumns();
});
```

暂且记录到此,bootstraptable还有很多好玩的可以玩,之后用到再补充.
