let http = require('http')
let fs = require('fs')
let path = require('path')

let server = http.createServer((req, res) => {
  let ua = req.headers['user-agent']
  console.log(ua)
  // Android
  // iPhone
  if (ua.includes('Android')) {
    // 重定向
    res.statusCode = 302
    res.setHeader('Location', 'https://m.baidu.com')
    res.end()
  } else {
    res.statusCode = 302
    res.setHeader('Location', 'https://juejin.cn')
    res.end()
  }
})

server.listen(3000)