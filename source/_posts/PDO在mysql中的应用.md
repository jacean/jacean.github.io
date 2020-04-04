---
title: PDO在mysql中的应用
date: 2016-05-07 22:26:41
tags:
    - mysql
    - PHP
    - PDO
categories:
    - 后端
---
## 数据库抽象层PDO
在如今各种数据库方案之中,开发人员除了选择其中一种来开发,也需要在不同的数据库之间进行移植,这种跨数据库处理,就提出了一种需求:"数据库抽象层".它能够解除应用程序逻辑与数据库通信逻辑之间的耦合,通过通用接口传递所有与数据库相关的命令,使得应用程序可以使用多种数据库解决方案.
PDO就是一个"数据库访问抽象层",统一了各种数据库的访问接口,这样一来,大大提升了程序的可移植性,而且具有较高的效率.对于数据库的操作,需要针对特定数据库的PDO驱动程序,这个驱动程序就是承载通信的桥梁,而只有在运行时PDO才加载必须的数据库驱动程序,大大提高了其灵活性.在不同数据库间切换时,只需要重新加载驱动就行.
<!-- more -->
PDO在现在的php中已经默认编译了，同时默认支持了mysql和sqlite。
```
extension=php_pdo_mysql.dll
;extension=php_pdo_oci.dll
;extension=php_pdo_odbc.dll
;extension=php_pdo_pgsql.dll
extension=php_pdo_sqlite.dll
```
可以自行添加支持，比如对MSSQL，Oracle的。

## PDO基本使用
以mysql数据库为例。
首先，声明一下配置文件mysql_config.php
```
<?php

//定义常量  
define('DB_HOST', 'IP');  
define('DB_USER', 'wanjq');  
define('DB_PASS', 'wanjq');  
define('DB_DATABASENAME', 'test'); 

```
然后来看看基本使用。
### 创建PDO对象
针对不同的数据库，PDO对象在初始化时是不一样的，而不一样就表现在数据源名dsn，是PDO构造函数的第一个参数。
```
<?php
require_once("mysql_config.php");
$dsn='mysql:dbname='.DB_DATABASENAME.';host='.DB_HOST;
$user=DB_USER;
$password=DB_PASS;

try
{
    $dbh=new PDO($dsn,$user,$password);
    
}catch(PDOException $e)
{
    echo "connect error:".$e->getMessage();
    exit;
}
```
除了以上3个参数，还有第四个参数，是一个数组，用于设置连接所需的额外选项。这里暂不表。
### PDO执行SQL语句
PDO执行sql与数据库交互有3种不同的策略。依次来看。
#### PDO::exec()
此方法就是执行语句了，常用于不需要返回结果集的操作，比如insert，delete，update。此方法不能用于执行select。其返回的是受影响的行数。
```
$query="insert into users (NAME,TEL,SEX) values ('wanjq','187','man')";
$affected=$dbh->exec($query);
if($affected)
{
    echo "ok,affected num:".$affected;
}
else {
    print_r($dbh->errorInfo());
}
```
#### PDO::query()
此方法常用语select，返回一个PDOStatement对象。要获得行数，可通过PDO对象的rowCount()方法。
```
$dbcolarray = array('NAME', 'TEL','SEX');  
$query="select * from users";
try
{
    $pdostatement=$dbh->query($query);
    echo "all records:".$pdostatement->rowCount();
    foreach ($pdostatement as $row) {
        $tdstr="";
        foreach ($dbcolarray as $td)  
        $tdstr .= "$row[$td]\t";  
        echo $tdstr."\n<br>";
    }
}catch(PDOException $e){
    echo $e->getMessage();
    print_r($dbh->errorInfo());
}
```
#### PDO::prepare和PDOStatement::execute()
使用占位符(?)语法将变量绑定到SQL语句中的预处理语句，与mysqli扩展的支持类似。PDO对所支持的所有数据库都提供了预处理语句和绑定参数，以便不必关注数据库平台而进行企业级开发。
##### PDOStatement对象
通过PDO::query()返回的PDOStatement是一个结果集对象，但是通过prepare()方法返回的则是一个查询对象。
##### 准备语句
预处理是使用占位符，准备好一个并不需要立即执行的sql查询语句，然后根据不同的执行需求改变列值。编译一次，多次执行，会在服务器上缓存查询的语法和执行过程。
PDO提供两种占位符
1. 命名参数
	```
    $dbh->prepare("insert into ".DB_TABLENAME." (NAME,TEL,SEX) values(:var1,:var2,:var3)");
    ```
2. 问号
	```
    $dbh->prepare("insert into ".DB_TABLENAME." (NAME,TEL,SEX) values(?,?,?)");
    ```
    
##### 绑定参数
bindParam(param1,param2[,,,]);
第一个参数必选，作为绑定索引。针对命名参数和问号索引有不同形式。第二个参数为占位符的值。
1. 命名参数
	```
     $stmt=$dbh->prepare("insert into ".DB_TABLENAME." (NAME,TEL,SEX) values(:NAME,:TEL,:SEX)");
    $name="wanjq";
    $tel="199";
    $sex="man";
    //第一个参数是命名参数的名字字符串，第二个参数是占位符值得引用传递。
    //**此处只能是引用传递，不能直接提供数值**
    $stmt->bindParam(':NAME',$name);
    $stmt->bindParam(':TEL',$tel);
    $stmt->bindParam(':SEX',$sex);
    ```
2. 问号
	```
    $stmt=$dbh->prepare("insert into ".DB_TABLENAME." (NAME,TEL,SEX) values(?,?,?)");
    $name="wanjq";
    $tel="199";
    $sex="man";
    //第一个参数是索引偏移量，第二个同样是占位符值得引用传递
    $stmt->bindParam(1,$name);
    $stmt->bindParam(2,$tel);
    $stmt->bindParam(3,$sex);
    ```

##### 执行查询
只需要执行execute方法就好
```
$stmt=$dbh->prepare("insert into ".DB_TABLENAME." (NAME,TEL,SEX) values(?,?,?)");
$name="wanjq";
$tel="199";
$sex="man";
$stmt->bindParam(1,$name);
$stmt->bindParam(2,$tel);
$stmt->bindParam(3,$sex);
$stmt->execute();
```
除此之外，有一种针对大量占位符的简写，利用命名参数形成数组，能够省去bindParam的调用。
```
$stmt=$dbh->prepare("insert into ".DB_TABLENAME." (NAME,TEL,SEX) values(:NAME,:TEL,:SEX)");
$stmt->execute(array(':NAME' => "wanjq",':TEL' => "120",':SEX' => "man"));
```

## 数据库事务
事务是确保数据库一致的机制，是一个或一系列的查询，作为一个单元的一组有序的数据库操作。如果组中所有sql语句执行成功则事务成功，事务被提交，否则事务不成功，被回滚，该事务操作取消。
事务的四个特征：
1. 原子性
2. 一致性
3. 独立性
4. 持久性


不过，mysql数据库中，只有InnoDb和BDB支持事务操作，而InnoDB的性能要比BDB好很多，所以在建表的时候需要显示指定类型为InnoDb。
在执行事务前需要关闭自动提交autocommit。事务执行完毕成功后，再commit。
如果不关闭autommit需要使用start transaction来显示开始一个事务。

事务只有在commit后才会在其他会话中被其他用户可见，也就是真正的写入。
也可以进行回滚来取消上个事务roolback。

