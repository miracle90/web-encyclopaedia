// let fs = require('fs')
let ReadStream = require('./ReadStream')
let WriteStream = require('./WriteStream')

let rs = new ReadStream('./name.txt', {
  highWaterMark: 4
})

let ws = new WriteStream('./name1.txt', {
  highWaterMark: 1
})

// 拿不到读取的内容，或者写入的内容，不能控制中间的流程
rs.pipe(ws)   // 通过pipe可以实现拷贝

// ws.write('123')
// ws.write('456')
// ws.end()    // 会强制把内存中的清空，并且关闭文件
