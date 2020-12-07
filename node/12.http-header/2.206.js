let http = require('http')
let fs = require('fs')
let path = require('path')

const DOWNLOAD_FILE = path.resolve(__dirname, '206.txt')

let total = fs.statSync(DOWNLOAD_FILE).size

let server = http.createServer((req, res) => {
  let range = req.headers['range']
  console.log(range)
  res.setHeader('Content-Type', 'text/plain;charset=utf8')
  if (range) {
    let [, start, end] = range.match(/(\d*)-(\d*)/)
    start = start ? Number(start) : 0
    end = end ? end - 1 : total
    // 范围请求，设置状态码
    res.statusCode = 206
    res.setHeader('Content-Range', `bytes ${start}-${end}/${total}`)
    // 返回
    // pipe到res中，相当于res.end()
    fs.createReadStream(DOWNLOAD_FILE, { start, end }).pipe(res)
  } else {
    fs.createReadStream(DOWNLOAD_FILE).pipe(res)
  }
})

server.listen(3000)