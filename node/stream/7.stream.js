let fs = require('fs')
const { Writable, Readable } = require('stream')

// 父类会调用子类 ReadStream 的 _read 方法
// read 方法是父类的方法，Readable，read()

// 继承
class MyReadStream extends Readable {
  constructor() {
    super()
    this.index = 5
  }
  _read() {
    if (this.index-- === 0) {
      // 读取完毕后，放一个null
      return this.push(null)
    }
    this.push(this.index + '')
  }
}

class MyWriteStream extends Writable {
  constructor() {
    super()
  }
  // 子类实现可写流方法
  _write(chunk, encoding, cb) {
    console.log(chunk)
    cb()
  }
}

// 可读流
// let rs = new MyReadStream()
// rs.on('data', function (chunk) {
//   console.log(chunk)
// })

// 可写流
let ws = new MyWriteStream()
ws.write('1')
ws.write('2')

