## node中间层

- 解决跨域问题（协议，ip，域名，端口号）

## java

- tomcat，iis
- 线程池
- 数据库
- 时间片切换

## node 适合并发高web（主要是读取文件）

- node适合i/o密集型 => readFile libuv
- 不适合cpu密集 => 运算 加密 解密
- nginx解决并发问题（负载均衡，开多进程）
- nginx => node => java

> 生态好 前端的一些开发工具 webpack gulp

## i/o 异步 阻塞 非阻塞

- 内核v8，基于libuv库，多线程（可以实现异步）
- v8引擎中的方法setTimeout，不能操作DOM，没有BOM，只有ecmascript
- 支持拥有服务端的能力，内置了很多模块，fs，http

## 异步、同步、阻塞、非阻塞

- 异步，同步，指的是被调用方 fs.readFile
- 阻塞，非阻塞，指代的是调用方


### 一般情况下

- 同步阻塞
- 异步非阻塞
