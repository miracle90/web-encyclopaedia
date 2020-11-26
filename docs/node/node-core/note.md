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
