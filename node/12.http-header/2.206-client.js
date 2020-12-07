let http = require('http')
let fs = require('fs')

let ws = fs.createWriteStream('./206-client.txt')

let mode = 'start'

// 暂停下载，恢复下载
process.stdin.on('data', function (chunk) {
  console.log('data', chunk.toString().includes('pause'))
  if (chunk.toString().includes('pause')) {
    mode = 'pause'
  } else {
    mode = 'start'
    download()
  }
})

// 默认从0开始，每次下载5个，保存到一个新的文件中
let start = 0

function download() {
  // http.request，可以发送请求体，不需要请求体，直接使用get方法
  http.get({
    hostname: 'localhost',
    port: 3000,
    headers: {
      Range: `bytes=${start}-${start + 5}`
    }
  }, function (res) {
    let total = res.headers['content-range'].split('/')[1]
    // 监听服务器，返回的数据
    res.on('data', function (chunk) {
      console.log(chunk)
      ws.write(chunk)
      if (start <= total) {
        start += 5
        setTimeout(() => {
          if (mode === 'start') {
            download()
          }
        }, 1000);
      } else {
        // 全部写完，需要关闭文件，关闭可写流
        ws.end()
      }
    })
  })
}

download()