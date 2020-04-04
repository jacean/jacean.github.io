---
title: mysql常用配置和语句
date: 2016-05-07 21:53:30
tags:
    - mysql
categories:
    - 后端
---

## 安装初始
其实现在很多新接触开发的都不会自己单独去安装mysql，而是采用xampp等集成包。不过这也没关系。mysql的配置又不会变。
当安装完毕之后，在phpMyAdmin中，将右边栏的滚动条拉到最后，可以看到这么一句警告
> 您配置文件中的设置（空密码的 root）是 MySQL 的默认管理员帐号。您的 MySQL 服务器正在使用这个默认设置运行，这样容易被入侵，我们强烈建议您立即给‘root’用户设置一个密码来修复这个安全漏洞。

<!-- more -->

mysql登录语句
> mysql -h 服务器主机地址(IP/domain) -u 用户名 -p密码


mysql很明确的告诉我们，现在mysql的root账户是没有密码的，很容易被入侵，比如像这样

```
PS C:\Users\wanja> mysql -h localhost -u root
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 12
Server version: 5.6.21 MySQL Community Server (GPL)

Copyright (c) 2000, 2014, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
```
不需要密码就可以直接登陆了。
> 如果输入mysql提示不是命令的话就是环境变量没有设置好。需要添加环境变量。
> 	xampp	->  D:\xampp
> 	path	+>	;%XAMPP%\mysql\bin


## 设置密码
现在的互联网，安全很重要，虽然自己的东西没啥大的价值，但终归保密一点还是好的，所以需要设置密码咯。
先来看看自己的用户情况
```
MariaDB [(none)]> use mysql
Database changed
MariaDB [mysql]> SELECT DISTINCT CONCAT('User: ''',user,'''@''',host,''';') AS query FROM mysql.user;
+---------------------------+
| query                     |
+---------------------------+
| User: 'root'@'127.0.0.1'; |
| User: 'root'@'::1';       |
| User: ''@'localhost';     |
| User: 'pma'@'localhost';  |
| User: 'root'@'localhost'; |
+---------------------------+
5 rows in set (0.00 sec)
```
咱们来更改root账户的密码
```
//设置密码
MariaDB [mysql]> set password for root@localhost = password('wanjq');
Query OK, 0 rows affected (0.44 sec)

MariaDB [mysql]> quit
Bye

//无密码登陆失败
PS C:\Users\Administrator> mysql -h localhost -u root
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)

//使用密码登陆成功
PS C:\Users\Administrator> mysql -h localhost -u root -pwanjq
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 47
Server version: 10.1.10-MariaDB mariadb.org binary distribution

Copyright (c) 2000, 2015, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]>
```
其实用户信息都是mysql.user表里，可以使用常规的查询更新语句来更新密码的，当然是在登陆之后。如果忘了密码，可以按下面的步骤，这是[百度经验的一个方法](http://jingyan.baidu.com/article/495ba841ef412d38b30edeb2.html)
> 1. 关闭正在运行的MySQL服务。
> 2. 打开DOS窗口，转到mysql\bin目录。 
> 3. 输入mysqld --skip-grant-tables 回车。--skip-grant-tables 的意思是启动MySQL服务的时候跳过权限表认证。 
> 4. 再开一个DOS窗口（因为刚才那个DOS窗口已经不能动了），输入mysql回车，如果成功，将出现MySQL提示符 >。 
> 6. 连接权限数据库： use mysql; 。 
> 7. 改密码：update user set password=password("root") where user="root";（别忘了最后加分号） 。 
> 8. 刷新权限（必须步骤）：flush privileges;　。 
> 9. 退出  quit。
> 10. 重启mysql服务，使用用户名root和刚才设置的新密码root登录就ok了；

要注意一点，在设置root密码之后，再用phpmyadmin连接可就不成了，因为phpmyadmin的默认是无密码连接，所以咱们得更改phpmyadmin的配置文件。
> xampp/phpMyAdmin/config.inc.php

把password的值设为新改的密码。
```
/* Authentication type and info */
$cfg['Servers'][$i]['auth_type'] = 'config';
$cfg['Servers'][$i]['user'] = 'root';
$cfg['Servers'][$i]['password'] = 'yourpassword';
$cfg['Servers'][$i]['extension'] = 'mysqli';
$cfg['Servers'][$i]['AllowNoPassword'] = true;
$cfg['Lang'] = '';
```
## 远程登录
之前给设置了密码，然后登陆的时候就需要了密码，不过现在的账户都是只能在本地的机器上登陆的，不能远程，要远程的话有很多方法。比如，设置root账户的登陆选项不限制localhost，不过，我的选择是新建一个账户用于远程访问，毕竟root太重要了。
重新登陆mysql，然后

```
//添加新用户，赋予所有表的所有权限，新用户wanjq，允许登陆%代表任意主机，设置密码
MariaDB [(none)]> GRANT ALL PRIVILEGES ON *.* TO 'wanjq'@'%' IDENTIFIED BY 'wanjq' WITH GRANT OPTION
    -> ;
Query OK, 0 rows affected (0.17 sec)

//查询新的用户信息
MariaDB [(none)]> SELECT DISTINCT CONCAT('User: ''',user,'''@''',host,''';') AS query FROM mysql.user;
+---------------------------+
| query                     |
+---------------------------+
| User: 'wanjq'@'%';        |
| User: 'root'@'127.0.0.1'; |
| User: 'root'@'::1';       |
| User: ''@'localhost';     |
| User: 'pma'@'localhost';  |
| User: 'root'@'localhost'; |
+---------------------------+
6 rows in set (0.00 sec)

```

然后我在本地的机器上链接我刚刚设置的服务器的mysql
```
//使用ip，端口，用户名，密码来链接
PS C:\Users\wanja> mysql -h 123.206.74.29 -P 3306 -u wanjq -pwanjq
Warning: Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 49
Server version: 5.5.5-10.1.10-MariaDB mariadb.org binary distribution

Copyright (c) 2000, 2014, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

//查询用户信息
mysql> SELECT DISTINCT CONCAT('User: ''',user,'''@''',host,''';') AS query FROM mysql.user;
+---------------------------+
| query                     |
+---------------------------+
| User: 'wanjq'@'%';        |
| User: 'root'@'127.0.0.1'; |
| User: 'root'@'::1';       |
| User: ''@'localhost';     |
| User: 'pma'@'localhost';  |
| User: 'root'@'localhost'; |
+---------------------------+
6 rows in set (0.04 sec)

mysql>
```

## mysql数据列类型
1. 数值类的数据列类型
        1. 整型
            TINYINT,1字节，
            SMALLINT，2字节
            MEDIUINT，3字节
            INT，4字节
            BIGINT，8字节
        2. 浮点型
            FLOAT，单精度，4/8字节，
            DOUBLE，双精度，8字节，
            DECIMAL，字符串形式表示的浮点数，以字符串形式保存，不会进行四舍五入的运算，但也不能直接用于计算。
        
    INT(3)只是表示显示宽度，并不会影响存储和数值范围
    FLOAT(6,1)会对存入的浮点数据进行四舍五入来满足要求，比如1.2345会存成1.2
2. 字符串类数据列类型
        CHAR[(M)]
        VARCHAR[(M)]
        BLOD,TEXT,(TINYXXX,XXX,MEDIUXXX,LONGXXX,分别表示非常小，小，中等，大)
        ENUM('value1','value2',...),枚举
        SET('value1','value2',...),集合
    BLOD,TEXT为可变长类型，其长度取决于实际存放在列中值得长度，再加上存放该值长度所需要的字节数，对应为1，2，3，4。BLOD区分大小写，TEXT不区分。
    CHAR和VARCHAR的类型长度范围都是0~255，但是CHAR会对不够给定大小的值进行空格填补，而VARCHAR则是视给定大小为最大值，不会空格填补。
    ENUM和SET都是特殊的串类型，列值只能在固定的集合中选择，但前者是单选，后者是多选。
3. 日期和时间型数据列类型
		DATE，3字节，YYYY-MM-DD
        TIME，3字节，hh:mm:ss
        DATETIME，8字节,YYYY-MM-DD hh:mm:ss
        TIMESTAMP，4字节,YYYYMMDDhhmmss
        YEAR，1字节，YYYY
    每个时间和日期类型都有一个零值，当插入非法数据时就用零值来添加
4. NULL值
	NULL可以被插入，也可以被检索，也可以用来做bool运算，但是不能用来做算数运算

## 数据字段属性
1. **UNSIGHED**，只用于设置数值类型，不允许出现负数。比如TINYINT是-128~127，就会变成0~255，存储长度增加一倍。
2. **ZEROFILL**，只用于数值类型，在数值之前自动用0补齐不足的位数。比如INT(3)，插入5实则005.当给一个字段应用ZEROFILL时，自动应用UNSIGHED属性。
3. **AUTO_INCREMENT**,自动增量属性。不允许重复。如果插入的值是NULL，0或留空则自动在上一值得基础上加一。如果是一非零值，则如果不存在则以此插入并作为新的自增起点，存在则报错。
4. **NULL**和**NOT NULL**，默认NULL，以及在操作时不允许是NULL。
5. **DEFAULT**，默认值

## 数据表类型
MySQL常用的表类型是MyISAM和InnoDB。
MyISAM成熟稳定易管理。并发读写有优化，文件空间占用小，支持全文索引，只支持表锁定。但是没有事务处理，外键等。所以，它可以节约时间空间，有比较高的响应速度。
InnoDB是MyISM的更新换代产品，提供了事务安全引擎，外键机制等，支持行锁定。但是，占用空间大(最大2倍)，同时不支持全文索引。所以，它提供更精细更安全的操作环境。
可以使用以下方式在创建表时指定表类型。
```
mysql> create table t (i INT)ENGINE=INNODB;
Query OK, 0 rows affected (0.20 sec)

mysql> create table tm (i INT)ENGINE=MYISAM;
Query OK, 0 rows affected (0.12 sec)
```
可以在默认的数据库存储目录下找到数据表的存储文件。
我的是:C:\\xampp\mysql\data\
![数据表不同存储文件](http://7xrtyi.com1.z0.glb.clouddn.com/mysql-engine.png)
t是INNODB类型的，是以表空间的概念来管理数据表的，所以只有一个.frm的结构定义文件，和其他的表空间文件。
tm是MYISAM的，有.frm的结构定义文件，还有.myd的数据文件，以及.myi的索引文件。

**对数据表的一切操作，都是对数据库目录文件下的文件进行操作。**

## 数据表的字符集
将在SQL命令中输入的字符集，和查询结果里的字符集设置为相同的字符集，可以避免很多麻烦。
当在创建表或库的时候，如果不显示指定字符集的话，就会用mysql配置文件的默认字符集了。
```
mysql> create database if not exists mydb default character set utf8 collate utf8_general_ci;
Query OK, 1 row affected (0.07 sec)
```
> character set 字符集
collate 校对规则

可以通过default-character-set选项来指定字符集为utf8.
或是使用set character set 'utf8'命令，来使客户端字符集和查询字符集都为utf8.


## mysql索引

mysql中主要分为四大索引
- 主键索引
- 唯一索引
- 常规索引
- 全文索引

通过索引来提供查询优化，确保数据的唯一性，以及对搜索的优化。
### 主键索引 PRIMARY KEY
每个表只能有一个，不能重复，非空，所以在创建主键列时必须指定非空。可以用下面的方法声明主键
```
mysql> create table if not exists users(
    -> ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    -> NAME VARCHAR(50) NOT NULL,
    -> TEL VARCHAR(11) NOT NULL UNIQUE,
    -> SEX ENUM('man','woman') NOT NULL DEFAULT 'man',
    -> PRIMARY KEY(ID)
    -> );
Query OK, 0 rows affected (0.70 sec)

mysql> create table if not exists students(
    -> ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -> NAME VARCHAR(50) NOT NULL,
    -> TEL VARCHAR(11) NOT NULL UNIQUE,
    -> SEX ENUM('man','woman') NOT NULL DEFAULT 'man'
    -> );
Query OK, 0 rows affected (1.79 sec)

mysql> desc students;
```
主键还可与外键索引构成完整性约束，防止出现数据不一致。
### 唯一索引 UNIQUE
防止重复，但是一个表中可以有多个唯一索引，与之具有相同功能的主键却只能有一个。
只需要在确定不包含重复值得列定义之后加上UNIQUE属性就可以了。
如上面例子的
> TEL VARCHAR(11) NOT NULL UNIQUE,

### 常规索引 INDEX
优化索引能够大幅提升数据库的性能。
但是索引占用磁盘空间，会减慢在索引数据列上的插入、删除和修改操作，因为需要按照索引列的排序格式执行。需要谨慎创建，在条件列建立索引，比如where之后，order by或group by之后。
KEY和INDEX一般是同义词，可以使用这两个关键字在建表的时候一同创建索引。
也可以用create index或alter table命令在建表之后创建。
咱们先来给之前的users表补个索引。
```
mysql> create index myind on users(TEL,SEX);
Query OK, 0 rows affected (0.15 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> show index from users;
+-------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+-----
-------+---------+---------------+
| Table | Non_unique | Key_name | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Inde
x_type | Comment | Index_comment |
+-------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+-----
-------+---------+---------------+
| users |          0 | PRIMARY  |            1 | ID          | A         |           0 |     NULL | NULL   |      | BTRE
E      |         |               |
| users |          0 | TEL      |            1 | TEL         | A         |           0 |     NULL | NULL   |      | BTRE
E      |         |               |
| users |          1 | myind    |            1 | TEL         | A         |           0 |     NULL | NULL   |      | BTRE
E      |         |               |
| users |          1 | myind    |            2 | SEX         | A         |           0 |     NULL | NULL   |      | BTRE
E      |         |               |
+-------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+-----
-------+---------+---------------+
4 rows in set (0.05 sec)
```
索引建立完毕之后，可以使用**show index from tablename;**来查看。
新创建的索引，索引名是myind，列是TEL和SEX，同时可以看到TEL还有唯一索引，ID是主键索引。
创建索引自然也可以删除索引，用**drop index indexname on tablename**比如这样
```
mysql> drop index myind on users;
Query OK, 0 rows affected (0.10 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> show index from users;
+-------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+-----
-------+---------+---------------+
| Table | Non_unique | Key_name | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Inde
x_type | Comment | Index_comment |
+-------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+-----
-------+---------+---------------+
| users |          0 | PRIMARY  |            1 | ID          | A         |           0 |     NULL | NULL   |      | BTRE
E      |         |               |
| users |          0 | TEL      |            1 | TEL         | A         |           0 |     NULL | NULL   |      | BTRE
E      |         |               |
+-------+------------+----------+--------------+-------------+-----------+-------------+----------+--------+------+-----
-------+---------+---------------+
2 rows in set (0.05 sec)
```

然后咱们新建一张表，并创建索引。
```
mysql> create table indtable(
    -> indID INT(10) NOT NULL AUTO_INCREMENT,
    -> userID INT(10) NOT NULL,
    -> bookID INT(10) NOT NULL,
    -> number INT(10) NOT NULL,
    -> PRIMARY KEY(indID),
    -> KEY ind(userID,bookID)
    -> );
Query OK, 0 rows affected (0.15 sec)
```
如果不给出索引名的话，系统会根据第一个索引列的名称自动选择一个索引名。
### 全文索引 FULLTEXT
全文索引可以使我们在不使用模式匹配的前提下去搜索单词或短语。
这类FULLTEXT索引，只能用于MYISAM表，并且只可以在CHAR，VARCHAR，或TEXT类型的列上创建。可以多列。
这个索引会把在某个表的某个数据列里出现过的所有单词生成一份清单。
```
mysql> create table indtable(
    -> indID INT(10) NOT NULL AUTO_INCREMENT,
    -> userID INT(10) NOT NULL,
    -> bookID INT(10) NOT NULL,
    -> number INT(10) NOT NULL,
    -> detail TEXT NOT NULL,
    -> FULLTEXT(detail),
    -> PRIMARY KEY(indID)
    -> );
Query OK, 0 rows affected (1.04 sec)
```
创建全文索引后，基于全文索引的查询有所不同，需要用到两个特殊的mysql函数。match()和against().match负责列举要搜索的一个或多个列，against负责给出匹配字符串。
> select indID from indtable where match(detail) against('index');
select match(detail) against('index');//搜索表中每一条记录，并返回匹配记录的加权分列表。


## 常用mysql语句

### 创建删除数据库
合理使用if exists语句
```
mysql> create database if not exists test;
Query OK, 0 rows affected, 1 warning (0.07 sec)

mysql> drop database if exists test;
Query OK, 0 rows affected (0.23 sec)

```
### 查询数据库
```
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| elab               |
| information_schema |
| mysql              |
| performance_schema |
| phpmyadmin         |
| test               |
+--------------------+
6 rows in set (0.04 sec)
```

### 创建表

```
mysql> create table if not exists users(
    -> ID INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    -> NAME VARCHAR(50) NOT NULL,
    -> TEL VARCHAR(11) NOT NULL UNIQUE,
    -> SEX ENUM('man','woman') NOT NULL DEFAULT 'man',
    -> PRIMARY KEY(ID)
    -> );
mysql> desc users;    
+-------+---------------------+------+-----+---------+----------------+
| Field | Type                | Null | Key | Default | Extra          |
+-------+---------------------+------+-----+---------+----------------+
| ID    | int(10) unsigned    | NO   | PRI | NULL    | auto_increment |
| NAME  | varchar(50)         | NO   |     | NULL    |                |
| TEL   | varchar(11)         | NO   | UNI | NULL    |                |
| SEX   | enum('man','woman') | NO   |     | man     |                |
+-------+---------------------+------+-----+---------+----------------+
4 rows in set (0.05 sec)
```
### 修改表
1. 添加列
	```
    mysql> alter table users add BIRTH DATE NOT NULL;
    Query OK, 0 rows affected (0.29 sec)
    Records: 0  Duplicates: 0  Warnings: 0

    mysql> desc users;
    +-------+---------------------+------+-----+---------+----------------+
    | Field | Type                | Null | Key | Default | Extra          |
    +-------+---------------------+------+-----+---------+----------------+
    | ID    | int(10) unsigned    | NO   | PRI | NULL    | auto_increment |
    | NAME  | varchar(50)         | NO   |     | NULL    |                |
    | TEL   | varchar(11)         | NO   | UNI | NULL    |                |
    | SEX   | enum('man','woman') | NO   |     | man     |                |
    | BIRTH | date                | NO   |     | NULL    |                |
    +-------+---------------------+------+-----+---------+----------------+
    5 rows in set (0.05 sec)
    ```
    指定列前/后添加列
    ```
    mysql> alter table users add user VARCHAR(4) NOT NULL FIRST;
    Query OK, 0 rows affected (0.21 sec)
    Records: 0  Duplicates: 0  Warnings: 0

    mysql> alter table users add tag VARCHAR(50) NOT NULL AFTER SEX;
    Query OK, 0 rows affected (0.16 sec)
    Records: 0  Duplicates: 0  Warnings: 0
    
    mysql> desc users;
    +-------+---------------------+------+-----+---------+----------------+
    | Field | Type                | Null | Key | Default | Extra          |
    +-------+---------------------+------+-----+---------+----------------+
    | user  | varchar(4)          | NO   |     | NULL    |                |
    | ID    | int(10) unsigned    | NO   | PRI | NULL    | auto_increment |
    | NAME  | varchar(50)         | NO   |     | NULL    |                |
    | TEL   | varchar(11)         | NO   | UNI | NULL    |                |
    | SEX   | enum('man','woman') | NO   |     | man     |                |
    | tag   | varchar(50)         | NO   |     | NULL    |                |
    | BIRTH | date                | NO   |     | NULL    |                |
    +-------+---------------------+------+-----+---------+----------------+
    7 rows in set (0.05 sec)
    ```
2. 修改列
	只修改列类型可以用modify
	```
    mysql> alter table users modify TEL INT UNSIGNED;
    Query OK, 0 rows affected (0.40 sec)
    Records: 0  Duplicates: 0  Warnings: 0

    mysql> desc users;
    +-------+---------------------+------+-----+---------+----------------+
    | Field | Type                | Null | Key | Default | Extra          |
    +-------+---------------------+------+-----+---------+----------------+
    | user  | varchar(4)          | NO   |     | NULL    |                |
    | ID    | int(10) unsigned    | NO   | PRI | NULL    | auto_increment |
    | NAME  | varchar(50)         | NO   |     | NULL    |                |
    | TEL   | int(10) unsigned    | YES  | UNI | NULL    |                |
    | SEX   | enum('man','woman') | NO   |     | man     |                |
    | tag   | varchar(50)         | NO   |     | NULL    |                |
    | BIRTH | date                | NO   |     | NULL    |                |
    +-------+---------------------+------+-----+---------+----------------+
    7 rows in set (0.05 sec)
    ```
    同时修改列名的话用change
    ```
    mysql> alter table users change TEL PHONE INT UNSIGNED;
    Query OK, 0 rows affected (0.06 sec)
    Records: 0  Duplicates: 0  Warnings: 0

    mysql> desc users;
    +-------+---------------------+------+-----+---------+----------------+
    | Field | Type                | Null | Key | Default | Extra          |
    +-------+---------------------+------+-----+---------+----------------+
    | user  | varchar(4)          | NO   |     | NULL    |                |
    | ID    | int(10) unsigned    | NO   | PRI | NULL    | auto_increment |
    | NAME  | varchar(50)         | NO   |     | NULL    |                |
    | PHONE | int(10) unsigned    | YES  | UNI | NULL    |                |
    | SEX   | enum('man','woman') | NO   |     | man     |                |
    | tag   | varchar(50)         | NO   |     | NULL    |                |
    | BIRTH | date                | NO   |     | NULL    |                |
    +-------+---------------------+------+-----+---------+----------------+
    7 rows in set (0.05 sec)
    ```
    **使用change的时候，如果不更改列名，那就把第二个名字写成原名字，执行效果同modify。**
3. 重命名表
	```
    mysql> alter table users RENAME AS students;
    Query OK, 0 rows affected (0.16 sec)

    mysql> show tables;
    +----------------+
    | Tables_in_test |
    +----------------+
    | students       |
    +----------------+
    1 row in set (0.05 sec)
    ```

### 删除表
	```
    mysql> drop table if exists students;
    Query OK, 0 rows affected (0.08 sec)

    mysql> show tables;
    Empty set (0.05 sec)
    ```
### 查询数据库中的表
```
mysql> use elab
Database changed
mysql> show tables;
+----------------+
| Tables_in_elab |
+----------------+
| locations      |
+----------------+
1 row in set (0.04 sec)

```
### 查看表结构
1. 显示列。
	```
    mysql> show columns from locations;
+-------------+--------------+------+-----+---------+-------+
| Field       | Type         | Null | Key | Default | Extra |
+-------------+--------------+------+-----+---------+-------+
| ID          | int(9)       | NO   | PRI | NULL    |       |
| name        | varchar(255) | NO   |     | NULL    |       |
| latitude    | float        | NO   |     | NULL    |       |
| longitude   | float        | NO   |     | NULL    |       |
| description | varchar(255) | NO   |     | NULL    |       |
| image       | varchar(255) | NO   |     | NULL    |       |
| other       | varchar(255) | NO   |     | NULL    |       |
+-------------+--------------+------+-----+---------+-------+
7 rows in set (0.05 sec)
    ```
2. 排序方式调出表结构
	```
    mysql> desc locations
    -> ;
+-------------+--------------+------+-----+---------+-------+
| Field       | Type         | Null | Key | Default | Extra |
+-------------+--------------+------+-----+---------+-------+
| ID          | int(9)       | NO   | PRI | NULL    |       |
| name        | varchar(255) | NO   |     | NULL    |       |
| latitude    | float        | NO   |     | NULL    |       |
| longitude   | float        | NO   |     | NULL    |       |
| description | varchar(255) | NO   |     | NULL    |       |
| image       | varchar(255) | NO   |     | NULL    |       |
| other       | varchar(255) | NO   |     | NULL    |       |
+-------------+--------------+------+-----+---------+-------+
7 rows in set (0.05 sec)
    ```
3. 表描述来显示表结构
	```
    mysql> describe locations;
+-------------+--------------+------+-----+---------+-------+
| Field       | Type         | Null | Key | Default | Extra |
+-------------+--------------+------+-----+---------+-------+
| ID          | int(9)       | NO   | PRI | NULL    |       |
| name        | varchar(255) | NO   |     | NULL    |       |
| latitude    | float        | NO   |     | NULL    |       |
| longitude   | float        | NO   |     | NULL    |       |
| description | varchar(255) | NO   |     | NULL    |       |
| image       | varchar(255) | NO   |     | NULL    |       |
| other       | varchar(255) | NO   |     | NULL    |       |
+-------------+--------------+------+-----+---------+-------+
7 rows in set (0.05 sec)

    ```
4. 获取最详细的结构信息
	```
    mysql> use information_schema
Database changed
mysql> select * from columns where table_name='locations';
//显示完整的表构造信息图
    ```
5. 获取表的创建语句
	```
    mysql> show create table locations;

    | Table     | Create Table

    | locations | CREATE TABLE `locations` (
      `ID` int(9) NOT NULL,
      `name` varchar(255) NOT NULL,
      `latitude` float NOT NULL,
      `longitude` float NOT NULL,
      `description` varchar(255) NOT NULL,
      `image` varchar(255) NOT NULL,
      `other` varchar(255) NOT NULL,
      PRIMARY KEY (`ID`)
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1 |

    1 row in set (0.04 sec)
    ```
