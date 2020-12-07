// cors跨域
let http = require('http')
let fs = require('fs')
let url = require('url')
let path = require('path')

let server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url)
  let absPath = path.join(__dirname, pathname)
  fs.stat(absPath, function (err, statObj) {
    if ()
  })
})