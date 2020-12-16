## Redis

> 内存型数据库 速度快 开源

Redis 是完全开源免费的，遵守BSD协议，是一个高性能的key-value数据库。

## 用途

- 希望加快ssr 服务端返回页面的速度
- 存储会话

## 优势

* 性能极高 – Redis能读的速度是110000次/s,写的速度是81000次/s 。
* 丰富的数据类型 – Redis支持 `二进制的字符串`、 `列表`、 `哈希值`、`集合` 和 `有序集合` 等数据类型操作。
* 原子性 – Redis的所有操作都是原子性的，意思就是`要么成功执行要么失败完全不执行`
* 单个操作是原子性的。多个操作也支持事务，即原子性，通过 `MULTI` 和 `EXEC` 指令包起来。
* 丰富的特性 – Redis还支持 发布/订阅, 通知, key 过期等等特性。

## Mac下安装

```
brew install redis
brew services start redis
redis-server /usr/local/etc/redis.conf
```

## 启动服务端、客户端

```
redis-server

redis-cli
```

## 字符串操作

```
<!-- 查看所有 -->
keys *

<!-- 删除 -->
flushall

<!-- 设置 -->
set name lyy
set age 18

<!-- 获取 -->
get name
get age

<!-- 范围获取 -->
getrange name 0 2

<!-- 数字类型自增 -->
incr age

<!-- 数字类型自减 -->
decr age

<!-- 删除 -->
del age

<!-- 设置过期时间 -->
expire name 10

<!-- 查看存活时间 -->
ttl name

<!-- 查看类型 -->
type name

<!-- 是否存在，1存在，0不存在 -->
exists name
```

### 哈希值

```
<!-- 设置哈希表 -->
hset person name lyy

<!-- 读取 -->
hget person name

<!-- 获取所有 -->
hgetall person

<!-- 获取所有的key -->
hkeys person

<!-- 删除 -->
hdel person name

<!-- 查看类型 -->
type person   // hash
```

### 列表（数组）操作

push、pop

```
<!-- lpush、rpush -->
lpush lessons vue
lpush lessons react
lpush lessons node

<!-- 查询所有项 -->
lrange lessons 0 -1

<!-- 从前面删、后面删 -->
lpop lessons
rpop lessons

<!-- 使用索引 -->
lindex lessons

<!-- 删除数组项 -->
<!-- 删除2个2 -->
lrem lesson 2 2
```

### 集合操作

```
<!-- 向集合中添加选项 -->
sadd myset 1 2 3 1 2 3

<!-- 查看 -->
smembers myset

<!-- 查看个数 -->
scard myset

<!-- 删除 -->
srem 1

<!-- 查看交集 -->
sinter myset myset1

<!-- 查看非 -->
sdiff myset myset1

<!-- 查看并集 -->
sunion myset myset1
```

### 有序集合

```
zadd order 1 200
zadd order 1 201
zadd order 2 20
zadd order 2 200

<!-- 查看有序集合 -->
zrange order 0 -1

<!-- 查看序号 -->
zrange order 0 -1 withscores

<!-- 删除 -->
zrem order 200
```

## node中如何使用redis
