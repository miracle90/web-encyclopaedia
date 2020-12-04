let http = require('http')
let url = require('url')
let path = require('path')
let fs = require('mz/fs')
let mime = require('mime')

class Server {
  async hanleRequest(req, res) {
    try {
      let { pathname } = url.parse(req.url)
      let currentPath = path.join(__dirname, pathname)
      let statObj = await fs.stat(currentPath)
      console.log(statObj.isDirectory())
      if (statObj.isDirectory()) {
        currentPath = path.join(currentPath, 'index.html')
        // 如果路径不存在，直接走catch
        await fs.access(currentPath)
        this.sendFile(req, res, currentPath)
      } else {
        this.sendFile(req, res, currentPath)
      }
    } catch (err) {
      this.emitError(err, res, req)
    }
  }
  sendFile(req, res, currentPath) {
    res.setHeader('Content-Type', mime.getType(currentPath) + ';charset=utf8')
    fs.createReadStream(currentPath).pipe(res)
  }
  emitError(err, res, req) {
    console.log(err)
    res.statusCode = 404
    res.end('NOT FOUND')
  }
  start() {
    // bind(this)，使得this指向Server的实例
    let server = http.createServer(this.hanleRequest.bind(this))
    server.listen(...arguments)
  }
}

let server = new Server()

server.start(3000, () => {
  console.log('server start 3000')
})

// let server = http.createServer((req, res) => {
//   let urlObj = url.parse(req.url)
//   // 获取请求的路径，去当前目录下查找
//   let { pathname } = url.parse(req.url)
//   // console.log('resolve ', path.resolve(__dirname, pathname))
//   console.log('join ', path.join(__dirname, pathname))
//   let currentPath = path.join(__dirname, pathname)
//   fs.stat(currentPath, (err, statObj) => {
//     if (err) {
//       res.statusCode = 404
//       return res.end('NOT FOUND')
//     }
//     if (statObj.isDirectory()) {
//       currentPath = path.join(currentPath, 'index.html')
//       fs.access(currentPath, err => {
//         if (err) {
//           res.statusCode = 404
//           res.end('NOT FOUND')
//         } else {
//           res.setHeader('Content-Type', mime.getType(currentPath) + ';charset=utf8')
//           fs.createReadStream(currentPath).pipe(res)
//         }
//       })
//     } else {
//       res.setHeader('Content-Type', mime.getType(currentPath) + ';charset=utf8')
//       // 如果是文件
//       // 创建可读流，pipe
//       fs.createReadStream(currentPath).pipe(res)
//       // fs.createReadStream(currentPath).on('data', data => {
//       //   res.write(data)
//       // })
//     }
//   })
// })

// server.listen(3000)