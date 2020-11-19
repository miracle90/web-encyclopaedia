// Promise 是一个类 异步解决方案
// pendding 等待状态
// resolved 成功态
// rejected 失败态

// executor执行器，会立即执行

// 每个promise实例都有一个then方法
let promise = new Promise(function (resolve, reject) {
  console.log(1)
})
console.log(2)


