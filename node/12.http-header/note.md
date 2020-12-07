## http头的应用

### 多语言

* vue-18n
* 做成多个网站
* 通过服务端实现多语言（Accept-Language: zh-CN,zh;q=0.9,en;q=0.8）


### 断点续传

* 状态码 => 206 Partial Content
* 请求头 => Range:bytes=0-5
* 响应头 => Content-Range: bytes 0-5/2381（当前范围/总长度）

### 判断内核

- 客户端js脚本判断
- 服务端判断浏览器内核

### referer

- document.referrer
- 来源 安全 xss csrf
- 防盗链 => 根据 referer 和 host

### gzip压缩

- 请求头 => Accept-Encoding: gzip
- 响应头 => Content-Encoding: gzip
- gzip压缩原理（科学技术法）
- 视频图片一般不适用gzip压缩

### 代理