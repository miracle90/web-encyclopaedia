let http  = require('http')
let HttpProxy = require('http-proxy')

let p = HttpProxy.createProxyServer()

// 代理
// 正向代理 => 科学上网，跳板机，Charles抓包就是正向代理
// 反向代理
// nginx

// 本地配置hosts
let proxy = {
  'a.yy.cn:80': 'http://localhost:3000',
  'b.yy.cn:80': 'http://localhost:4000'
}

http.createServer((req, res) => {
  let host = req.headers.host
  p.web(req, res, {
    // 根据主机，返回需要代理的内容
    target: proxy[host]
  })
}).listen(80)
