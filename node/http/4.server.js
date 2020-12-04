let http = require('http')
let url = require('url')
let path = require('path')
let fs = require('fs')
let mime = require('mime')

let server = http.createServer((req, res) => {
  let urlObj = url.parse(req.url)
  // 获取请求的路径，去当前目录下查找
  let { pathname } = url.parse(req.url)
  // console.log('resolve ', path.resolve(__dirname, pathname))
  console.log('join ', path.join(__dirname, pathname))
  let currentPath = path.join(__dirname, pathname)
  fs.stat(currentPath, (err, statObj) => {
    if (err) {
      res.statusCode = 404
      return res.end('NOT FOUND')
    }
    if (statObj.isDirectory()) {
      currentPath = path.join(currentPath, 'index.html')
      fs.access(currentPath, err => {
        if (err) {
          res.statusCode = 404
          res.end('NOT FOUND')
        } else {
          res.setHeader('Content-Type', mime.getType(currentPath) + ';charset=utf8')
          fs.createReadStream(currentPath).pipe(res)
        }
      })
    } else {
      res.setHeader('Content-Type', mime.getType(currentPath) + ';charset=utf8')
      // 如果是文件
      // 创建可读流，pipe
      fs.createReadStream(currentPath).pipe(res)
      // fs.createReadStream(currentPath).on('data', data => {
      //   res.write(data)
      // })
    }
  })
})

server.listen(3000)