let fs = require('fs')
let EventEmitter = require('events')

class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || 'r'
    this.mode = options.mode || 438
    this.start = options.start || 0
    this.end = options.end
    this.autoClose = options.autoClose || true
    this.encoding = options.encoding || null
    this.highWaterMark = options.highWaterMark || 64 * 1024

    // 默认非流动模式 rs.pause resume
    this.flowing = null   // 开始读取的时候置为 true

    // 要读取文件，需要打开文件
    this.open()   // events on emit once newListener

    this.on('newListener', type => {
      // 用户监听了data事件
      if (type === 'data') {
        // 开始读取
        this.flowing = true
        this.read()
      }
    })

    // 每次读取的位置
    this.pos = this.start   // 默认等于开始的位置
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err){
        this.emit('error')
        return
      }

      this.fd = fd    // 代表当前文件的描述符，number，fs.read()
      this.emit('open', this.fd)
    })
  }

  // 用户监听了data事件，开始读取
  read() {
    // 默认第一次，肯定是拿不到fd的
    // 触发了open事件，可以获取到
    // 保证文件描述符存在的时候，才调用read方法
    if (typeof this.fd !== 'number') {
      return this.once('open', () => this.read())
    }

    // highWaterMark代表每次读取个数
    let lengthToRead = this.end ? Math.min((this.end - this.pos + 1), this.highWaterMark) : this.highWaterMark
    let buffer = Buffer.alloc(lengthToRead)
    fs.read(this.fd, buffer, 0, buffer.length, this.pos, (err, bytesRead) => {
      // 如果能读取到内容，且flowing为true
      if (bytesRead > 0) {
        this.pos += bytesRead
        this.emit('data', this.encoding ? buffer.toString(this.encoding) : buffer)
        if (this.flowing) {
          this.read()
        }
      } else {
        this.emit('end')
        if (this.autoClose) {
          // linux文件描述符是有限制的，bytesRead，用完要关闭 close
          fs.close(this.fd, () => {
            this.emit('close')
            this.flowing = null
          })
        }
      }
    })
  }
}

module.exports = ReadStream

