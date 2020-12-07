## http头的应用

### 多语言

* vue-18n
* 做成多个网站
* 通过服务端实现多语言（Accept-Language: zh-CN,zh;q=0.9,en;q=0.8）


### 断点续传

* 状态码 => 206 Partial Content
* 请求头 => Range:bytes=0-5
* 响应头 => Content-Range: bytes 0-5/2381（当前范围/总长度）

### referer

### 判断内核

### gzip压缩

### 代理