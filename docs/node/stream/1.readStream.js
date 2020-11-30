// 文件操作读和写
// 可读流 fs.read
// 可写流 fs.write
// 异步读写
let fs = require('fs')
let rs = fs.createReadStream('./name.txt', {
  flags: 'r',    // 打开文件作甚么事
  highWaterMark: 1,    // 限制每次读多少，字节数，默认 64 * 1024，64kb
  mode: 0o666,   // 可读可写
  start: 4,   // 开始读取的位置
  // end: 2,    // 结束读取的位置
  // encoding: 'utf8',
  autoClose: true
})

rs.on('error', () => {
  console.log('出错了')
})

rs.on('open', () => {
  console.log('open')
})

let timer = setInterval(() => {
  // 恢复data事件
  rs.resume()
}, 1000);

// 拼接buffer，有的人会使用 str+= ''，可能会导致乱码
let arr = []
// 默认创建可读流，不会马上读取，如果我们监听了data事件
// 默认非流动模式 => 流动模式
rs.on('data', chunk => {
  arr.push(chunk)
  console.log('1')
  // 停止data事件的触发
  rs.pause()
})

rs.on('end', () => {
  clearInterval(timer)
  console.log(Buffer.concat(arr).toString())
  console.log('end')
})

rs.on('close', () => {
  console.log('close')
})