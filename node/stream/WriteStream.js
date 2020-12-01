let fs = require('fs')
let EventEmitter = require('events')

// 第一次向文件中写入，此时还没写完，后面的写到缓存中
// 第一次写入成功后，清空缓存的第一项。。。
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
    // 链表，js中可以用对象模拟链表 { head: 1, chunk: 'xxx', tail: 2 }
    this.cache = []   // 缓存多次写入的数据
    // 维护写入的长度
    this.len = 0
    // 是否触发drain事件
    this.needDrain = false
    // 如果正在写入，就放到缓冲中
    this.writing = false
    // 写入的位置
    this.pos = this.start
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
  write(chunk, encoding = this.encoding, cb = () => {}) {
    // 第一次是真正的向文件中写入，之后都放到内存中缓存
    // 字符串或者buffer，统一转成Buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    this.len += chunk.length
    if (this.len >= this.highWaterMark) {
      // 清空后需要触发drain事件
      this.needDrain = true
    }
    if (this.writing) {
      // 如果正在写，缓存起来
      this.cache.push({
        chunk,
        encoding,
        cb
      })
    } else {
      this.writing = true
      this._write(chunk, encoding, () => {
        cb()
        // 清理数组的第一项
        this.clearBuffer()
      })
    }

    // write方法亚欧有一个返回结果

    return !this.needDrain
  }

  clearBuffer() {
    let obj = this.cache.shift()
    if (obj) {
      this._write(obj.chunk, obj.encoding, () => {
        // 当自己写入后，继续清空缓存，直到缓存区为空
        obj.cb()
        this.clearBuffer()
      })
    } else {
      // 缓存已经干了
      if (this.needDrain) {
        this.needDrain = false
        this.writing = false
        // 不是正在写入，下次写入时，依然是第一个往文件里写入，剩下的写入缓存
        this.emit('drain')
      }
    }
  }

  _write(chunk, encoding, cb) {
    if (typeof this.fd !== 'number') {
      return this.once('open', () => {
        this._write(chunk, encoding, cb)
      })
    }
    // 写入时，可以不用加position
    fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, written) => {
      this.pos += written
      // 每次写入成功后，都需要把缓存的大小减小
      this.len-= written
      // 当写入成功后，调用回调，会执行clearBuffer
      cb()
    })
  }
}

module.exports = WritableStream
