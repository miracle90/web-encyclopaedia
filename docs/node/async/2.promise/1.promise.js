// Promise 是一个类 异步解决方案
// pending 等待状态
// fulfilled 成功态
// rejected 失败态

// executor执行器，会立即执行

// 每个promise实例都有一个then方法，接受两个函数，onfulfilled，onrejected

const Promise = require('./promise')

let promise = new Promise(function (resolve, reject) {
  // resolve('成功')
  // reject('失败')
  throw new Error('报错')
})

promise.then(function (val) {
  console.log('onfulfilled ', val)
}, function (err) {
  console.log('onrejected ', err)
})


