function EventEmitter() {
  this._events = {}
}

EventEmitter.prototype.on = function (event, cb) {

  // 判断事件是否存在，已经存在push，不存在创建一个数组
  if (!this._events) {
    // 声明一个空对象，没有 __proto__ 的属性
    // Object.create(null)
    this._events = {}
  }
  if (event !== 'newListener') {
    if (this._events['newListener']) {
      this._events['newListener'].forEach(fn => fn(event))
    }
  }
  if (this._events[event]) {
    this._events[event].push(cb)
  } else {
    this._events[event] = [cb]
  }
}
EventEmitter.prototype.emit = function (event) {
  if (this._events[event]) {
    this._events[event].forEach(fn => { 
      fn.call(this, ...arguments)
    })
  }
}
EventEmitter.prototype.once = function (event, cb) {
  // let me = this
  function one() {
    cb(...arguments)
    this.off(event, one)
  }
  one.l = cb
  this.on(event, one)
}
EventEmitter.prototype.off = function (event, cb) {
  if (this._events[event]) {
    this._events[event] = this._events[event].filter(fn => fn !== cb && fn.l !== cb )
  }
}

module.exports = EventEmitter