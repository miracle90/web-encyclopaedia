let EventEmitter = require('./events')
let util = require('util')
const { on } = require('process')

// util.promisify(fs.readFile)

// on 绑定事件
// emit 发射事件
// off 取消监听
// newListener 每次调用on触发，先触发这个方法，才把回调放进去
// once 触发一次后，会把自己删除

// __proto__
// Object.create => 没有 __proto__的属性
// Object.setPrototypeOf

function Girl() {
  
}

util.inherits(Girl, EventEmitter)

let girl = new Girl

let cry = thing => {
  console.log('cry ', thing)
}

let drink = thing => {
  console.log('drink ', thing)
}

girl.once('女生失恋', drink)
girl.emit('女生失恋')
girl.emit('女生失恋')
// girl.off('女生失恋', drink)

// 每次调用 on 触发，先触发这个方法，才把回调放进去
// girl.on('newListener', type => {
//   console.log('newListener', type)
// })

// addListener
// 订阅

// girl.on('挫折', cry)
// girl.on('挫折', cry)
// girl.on('挫折', cry)
// girl.on('挫折', cry)

// 发布，事件名称 + 参数
// girl.emit('挫折', '打击')

// // 取消订阅
// girl.off('挫折', cry)

// girl.emit('挫折', '打击')
