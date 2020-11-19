let fs = require('fs')

// 发布订阅 [fn, fn]

function EventEmitter() {
  this._arr = []
}

// 订阅和发布无关

// 订阅
EventEmitter.prototype.on = function (fn) {
  this._arr.push(fn)
}

// 发布
EventEmitter.prototype.emit = function () {
  console.log(this._arr)
  this._arr.forEach(fn => fn.apply(this, arguments))
}

let e = new EventEmitter()

let student = {}

e.on(function () {
  console.log('一个接口成功')
})

e.on(function (data, key) {
  student[key] = data
  if (Object.keys(student).length === 2) {
    console.log(student)
  }
})

fs.readFile('./docs/node/async/1.callback/name.txt', 'utf8', function (err, data) {
  if (err) return console.log(err)
  e.emit(data, 'name')
})

fs.readFile('./docs/node/async/1.callback/age.txt', 'utf8', function (err, data) {
  if (err) return console.log(err)
  e.emit(data, 'age')
})
