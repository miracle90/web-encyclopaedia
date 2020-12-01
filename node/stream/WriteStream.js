let fs = require('fs')
let EventEmitter = require('events')

class WritableStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    this.path = path
    this.flags = options.flags || 'w'
    this.mode = options.mode || 0o666
    this.autoClose = options.autoClose || true
    this.encoding = options.encoding || null
    this.highWaterMark = options.highWaterMark || 16 * 1024
    this.start = options.start || 0
    this.open()
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err){
        return this.emit('error')
      }
      this.fd = fd    // 代表当前文件的描述符，number，fs.read()
      this.emit('open', this.fd)
    })
  }
  write() {

  }
}

module.exports = WritableStream
