let http = require('http')
let fs = require('fs')
let path = require('path')
let url = require('url')

let server = http.createServer((req, res) => {
  fs.stat('.' + req.url, function (err, statObj) {
    if (err) {
      res.statusCode = 404
      res.end()
      return
    }
    if (statObj.isDirectory()) {
      res.end()
    } else {
      let referer = req.headers['referer']
      if (referer) {
        // host 和 referer 进行比较
        // 可增加白名单
        let refererHost = url.parse(referer).host    // 访问的host
        let host = req.headers['host']  // 被访问的host
        if (refererHost !== host) {
          // 如果不等，返回报错图片
          return fs.createReadStream(path.join(__dirname, './error.jpg')).pipe(res)
        }
      }
      fs.createReadStream(path.join(__dirname, req.url)).pipe(res)
    }
  })
})

server.listen(3000)