let fs = require('fs')
const { Readable } = require('stream')
// let util = require('util')

// let rs = fs.createReadStream('./name.txt')

// 继承
// util.inherits(ReadStream, Readable)
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

let rs = new MyReadStream()

rs.on('data', function (chunk) {
  console.log(chunk)
})

// 父类会调用子类 ReadStream 的 _read 方法
// read 方法是父类的方法，Readable，read()

// let ws = fs.createWriteStream('./name1.txt')