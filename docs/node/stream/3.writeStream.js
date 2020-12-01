
let fs = require('fs')
let ws = fs.createWriteStream('./name.txt', {
  flags: 'w',    // 打开文件作甚么事
  mode: 0o666,   // 可读可写
  autoClose: true,
  encoding: 'utf8',
  highWaterMark: 2    // 预期使用的内存，默认 16 * 1024
})

// 可写流 open close write end drain

// 写入的过程是异步的，但不是并发，有一个队列维护写入顺序
let flag = ws.write('1111')
flag = ws.write('2222')
flag = ws.write('3333')
console.log(flag)

// 如果flag返回false，就不要在继续写入了，如果再写入的话，肯定会超预期