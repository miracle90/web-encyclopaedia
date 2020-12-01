// 装饰器 前端埋点 在ajax的请求中包装一层自己的逻辑
Function.prototype.before = function (cb) {
  let self = this
  return function () {
    cb()
    self.apply(self, arguments)
  }
}

function fn(val) {
  console.log('some func ' + val)
}

let newFn = fn.before(() => {
  console.log('在函数执行前执行')
})

newFn('参数')