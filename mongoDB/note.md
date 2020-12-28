## 什么是MongoDB

* MongoDB是一个基于分布式文件存储的开源数据库系统
* MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。

> BSON => 是一种计算机数据交换格式，主要被用作MongoDB数据库中的数据存储和网络传输格式。它是一种二进制表示形式，能用来表示简单数据结构、关联数组（MongoDB中称为“对象”或“文档”）以及MongoDB中的各种数据类型。BSON之名缘于JSON，含义为Binary JSON（二进制JSON）。

> 并发量是 `MySQL` 的10倍

### 数据库备份

```
mongodump
    -- host 127.0.0.1
    -- port 27017
    -- out D:/databack/backup
    -- collection mycollection
    -- db test
    -- username
    -- password
//mongodump --host 127.0.0.1 --port 27017 --out ./backup --collection users --db students
//db.users.drop();

mongorestore
--host
--port
--username
--password

// mongorestore --host 127.0.0.1 --port 27017 ./backup
```

### 执行脚本

```
var start = Date.now()
var db = connect('school')

for (let i = 0; i < 10000; i++) {
  db.stu.insert({
    _id: i,
    age: i,
    name: 'yy' + i
  })
}

var cost = Date.now() - start
print(cost + 'ms')
```

**批量插入**

```
var start = Date.now()
var db = connect('school')
var arr = []

for (let i = 0; i < 10000; i++) {
  arr.push({
    _id: i,
    age: i,
    name: 'yy' + i
  })
}

db.stu2.insert(arr)
var cost = Date.now() - start
print(cost + 'ms')
```

### 索引



### ObjectId构成

> 时间戳 + 机器 + 进程 + 随机数

之前我们使用MySQL等关系型数据库时，主键都是设置成自增的。但在分布式环境下，这种方法就不可行了，会产生冲突。为此，MongoDB采用了一个称之为ObjectId的类型来做主键。ObjectId是一个12字节的 BSON 类型字符串。按照字节顺序，一次代表

* 4字节：UNIX时间戳
* 3字节：表示运行MongoDB的机器
* 2字节：表示生成此_id的进程
* 3字节：由一个随机数开始的计数器生成的值

### 客户端使用 Robo 3T

