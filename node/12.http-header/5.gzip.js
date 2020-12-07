let http = require('http')
let fs = require('fs')
let path = require('path')
let url = require('url')
let zlib = require('zlib')

let server = http.createServer((req, res) => {
  // Accept-Encoding: gzip, deflate, br
  let encoding = req.headers['accept-encoding']
  if (encoding) {
    if (/\bgzip\b/.test(encoding)) {
      console.log(123)
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.setHeader('Content-Encoding', 'gzip')
      fs.createReadStream('./referer.html').pipe(zlib.createGzip()).pipe(res)
      return
    }
    if (/\bdeflate\b/.test(encoding)) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.setHeader('Content-Encoding', 'deflate')
      fs.createReadStream('./referer.html').pipe(zlib.createDeflate()).pipe(res)
      return
    }
    fs.createReadStream('./referer.html').pipe(res)
  } else {
    fs.createReadStream('./referer.html').pipe(res)
  }
})

server.listen(3000)