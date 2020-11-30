// 常用方法

// slice，indexOf

let buffer = Buffer.from('不讲武德')

console.log(Buffer.isBuffer(buffer))

// concat，copy

// 拼接数据 tcp，http，需要把多个buffer拼接在一起

let buffer1 = Buffer.from('耗子')
let buffer2 = Buffer.from('尾汁')

// let bigBuffer = Buffer.alloc(12)

// 1、拷贝方法
Buffer.prototype.copy = function (target, targetStart, sourceStart = 0, sourceEnd = this.length) {
  for (let i = 0; i < sourceEnd - sourceStart; i++) {
    target[targetStart + i] = this[sourceStart + i]
  }
}
// buffer1.copy(bigBuffer, 0, 0, 6)
// buffer2.copy(bigBuffer, 6)
// console.log(bigBuffer.toString())

// 2、concat
Buffer.concat = function (list, totalLength = list.reduce((a, b) => (a + b.length), 0)) {
  let buffer = Buffer.alloc(totalLength)
  let offset = 0
  list.forEach(b => {
    b.copy(buffer, offset)
    offset += b.length
  })
  return buffer
}

console.log(Buffer.concat([buffer1, buffer2], 9).toString())

// 3、isBuffer
// 4、toString
// 5、split
