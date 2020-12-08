// cors跨域
let http = require('http')
let fs = require('fs')
let url = require('url')
let path = require('path')

http.createServer((req, res) => {
  let { pathname } = url.parse(req.url)
  console.log(pathname)
  console.log(req.headers)
  let absPath = path.join(__dirname, pathname)

  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  res.setHeader('Access-Control-Allow-Methods', 'DELETE,PUT')
  // 首部字段 Access-Control-Max-Age 表明该响应的有效时间为 86400 秒，也就是 24 小时。在有效时间内，浏览器无须为同一请求再次发起预检请求。请注意，浏览器自身维护了一个最大有效时间，如果该首部字段的值超过了最大有效时间，将不会生效。
  res.setHeader('Access-Control-Max-Age', 10)
  res.setHeader('Access-Control-Allow-Headers', 'authorization')
  // 允许携带cookie
  res.setHeader('Access-Control-Allow-Credentials', true)

  if (req.method === 'OPTIONS') {
    return res.end()
  }
  if (pathname === '/user') {
    return res.end(JSON.stringify({ name: 'lyy' }))
  }

  fs.stat(absPath, function (err, statObj) {
    if (err) {
      res.statusCode = 404
      res.end()
      return
    }
    if (statObj.isDirectory()) {
      res.end('isDirectory')
    } else {
      fs.createReadStream(absPath).pipe(res)
    }
  })
}).listen(3000)