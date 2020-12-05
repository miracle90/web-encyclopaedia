let fs = require('fs')
const { on } = require('process')
const { Writable, Readable, Duplex, Transform } = require('stream')
const Stream = require('stream')

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
    fs.appendFile('./name.txt', chunk, () => {
      setTimeout(() => {
        cb()
      }, 1000);
    })
  }
}

// 可读流
// let rs = new MyReadStream()
// rs.on('data', function (chunk) {
//   console.log(chunk)
// })

// 可写流
// let ws = new MyWriteStream()
// ws.write('1')
// ws.write('2')

// 双工流，读写都可以的流，Duplex
// util.inherits(Duplex, Readable)
// util.inherits(Duplex, Writable)
class MyDuplex extends Duplex {
  _read() {
    console.log('read')
  }
  _write(chunk) {
    console.log('chunk ', chunk)
  }
}
// let dl = new MyDuplex()
// dl.on('data', () => {
  
// })
// dl.write('666')

// rs.pipe(ts).pipe(ws)
// 压缩，gzip，转化流，先把数据读取出来 => 进行转化 => 写到一个新的文件里
class MyTransfrom extends Transform {
  _transform(chunk, encoding, cb) {
    this.push(chunk.toString().toUppercase())
    cb()
  }
}

// 转化，把写转化成读
let myTransfrom = new MyTransfrom()
process.stdin.pipe(myTransfrom).pipe(process.stdout)
// myTransfrom.on('data', function (data) {
//   console.log('data ', data)
// })
// myTransfrom.write('666')



// 读流，写流，双工流，转化流

// 进程中通信
// process.stdin.on('data', chunk => {
//   console.log('process.stdin ', chunk)
// })    // 只要能on(''data) => 流
// process.stdout.write('000')   // 只要有write，就是可写流


// 常用方法
// pipe
// rs.on('data')
// rs.on('end')
// ws.write()
// ws.end()


