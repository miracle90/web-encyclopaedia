## SQL

```
-- 添加
INSERT student(name, idcard, age, city)
VALUES('李四', '88888', 120, '北京')

SELECT * FROM student;

-- INSERT注意事项

-- 更新
-- 注意事项
-- 1、一次可以更新多列
-- 2、可以指定更新条件，如果有多个条件可以用 and or not
-- mysql更新前、后值一样，不做更新
UPDATE student SET age=18,city='深圳' WHERE id = 2

-- 删除
-- 如果要删除的表示主表的，需要先删除子表
DELETE FROM student WHERE id = 2;

-- TRUNCATE 截断表，会重置标识符，不计入日志，没有备份
-- DELETE 会计入日志，可以恢复
-- DELETE FROM student

```

## 查询语句

### 语法

```
SELECT    <列名> 
FROM      <表名> 
[WHERE    <查询条件表达式>] 
[ORDER BY <排序的列名>[ASC或DESC]]
```

### 排序

查询北京的同学信息，并按id正序排列

```
SELECT id,name FROM student WHERE city='北京' ORDER BY id ASC
```

### 别名

```
SELECT id,name,idcard,age,city AS home
FROM student
WHERE city= '山东'
ORDER BY id asc
```

### 查询空行 IS NULL

```
SELECT id,name,age,city
FROM student
WHERE city is null or city =''
```

### 常量列

```
SELECT id,name,age,city,'中国' as country
FROM student
```

### 限制返回的行数 limit

```
SELECT id,name,age,city,'中国' as country
FROM student limit 2
```

### DISTINCT

```
SELECT id,name,age,DISTINCT city,'中国' as country
FROM student
```

### +

* 在MYSQL中+号只能用作于数字
* 非数字类型字符串转化成0

```
SELECT 1+1
SELECT 1+'1'
SELECT 1+'zfpx'  
SELECT 1+null
SELECT CONCAT(last_name,first_name) FROM user;
```

## 函数

### 字符函数

* LENGTH 长度
* CONCAT	字符串连接
* CONCAT_WS	使用指定的分隔符进行字符连接
* FORMAT	数字格式化
* LOWER	转小写字母
* UPPER	转大写字母
* LEFT	返回字符串s开始的最左边n个字符
* RIGHT	返回字符串s开始的最左边n个字符
* 截取字符串 SUBSTR
* 返回子串在原始字符串的起始索引 SELECT INSTR('zfpx','f');
* 去掉左右空格 TRIM
* 用空格补齐 LPAD
* 替换 REPLACE
* FORMAT     SELECT FORMAT(100000,2); 100,000.00

### 数学函数

* CEIL	向上取整
* FLOOR	向下取整数
* DIV	整数取
* MOD	取余(取模)
* POWER	幂运算
* ROUND	四舍五入
* TRUNCATE	数字截取

### 日期函数

* NOW	当前日期和时间
* CURDATE	当前日期
* CURTIME	当前时间
* DATE_ADD	日期变化
* DATEDIFF	计算日期差
* DATE_FORMAT	日期格式化

### 其他

```
SELECT CONNECTION_ID();
SELECT DATABASE();
SELECT VERSION();
select LAST_INSERT_ID();
SELECT USER();

SELECT MD5('123456');//摘要算法
SELECT PASSWORD('123456');//修改当前用户的密码
SELECT User,Password from mysql.user;
```

### 流程控制函数

if

```
SELECT IF(1>0,'A','B');
```

case

```
SELECT 
CASE 
WHEN grade<60 then '不及格'
WHEN grade>=60 then '及格'
ELSE '未知'
END
FROM score;
```

### 自定义函数

注意函数名一定要跟着小括号表示参数

CREATE FUNCTION znow() RETURNS VARCHAR(30)
RETURN DATE_FORMAT(NOW(),'%Y年%m月%d日 %H时%i分%s秒');

> 函数体不只一行~~~~~~~~~~~~~~

套一层 BEGIN + END

```
CREATE TABLE stu(id int PRIMARY KEY AUTO_INCREMENT,name VARCHAR(50));
CREATE FUNCTION addUser(name VARCHAR(50)) RETURNS INT
BEGIN
  INSERT INTO stu(name) VALUES(name);
  RETURN LAST_INSERT_ID();
END

SELECT addUser('zfpx');
DROP FUNCTION addUser
```