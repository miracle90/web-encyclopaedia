let http = require('http')


let server = http.createServer()
// let server = http.createServer((req, res) => {
//   console.log(req)
//   console.log(res)
// })

// 内部是通过tcp来进行传输的socket套接字
// socket是一个双工流
// 可以拿到浏览器发来的所有内容
// 整个内容buffer 行 头 体
// 在内部把socket分成两部分，req，res => this.emit('request', req, res)
server.on('request', (req, res) => {
  // 请求行
  console.log(req.method)
  console.log(req.url)
  console.log(req.httpVersion)
  // 请求头
  console.log(req.headers)
  // 请求体
  let arr = []
  req.on('data', chunk => {
    arr.push(chunk)
  })
  req.on('end', () => {
    console.log(Buffer.concat(arr).toString())
    res.statusCode = 200
    res.setHeader('a', '1')
    res.end('hello world')
  })
})


let port = 3000
server.listen(port, () => {
  console.log('服务开启')
})
// server.on('error', error => {
//   if (error.errno === 'EADDRINUSE') {
//     server.listen(++port)
//   }
// })

// nodemon => node monitor，监控node的变化
// 在代码里控制哪个目录，可以全局安装nodemon，sudo npm i -g nodemon
