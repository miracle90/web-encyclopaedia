
let WriteStream = require('./WriteStream')

let ws = new WriteStream('./name.txt', {
  flags: 'w',
  mode: 0o666,
  autoClose: true,
  encoding: 'utf8',
  highWaterMark: 4,
  start: 0
})

// let flag = ws.write(1 + '')
// console.log(flag)

let i = 9
function write() {
  let flag = true
  while (i && flag) {
    flag = ws.write(i-- + '', 'utf8', () => {
      console.log('callback')
    })
    // write方法只能放字符串或者buffer
  }
}
write()

// 抽干，当我们的预计的大小和写入的内容的大小相等，或者写入的内容大于预计的内存，当我们写入的内容都写入完成后，会触发该方法
ws.on('drain', () => {
  console.log('drain')
  write()
})
