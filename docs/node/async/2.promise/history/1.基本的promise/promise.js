function Promise(executor) {
  // 给promise定义状态
  this.status = 'pending'
  // 成功和失败原因
  this.value = undefined
  this.reason = undefined

  // 定义两个队列，存放成功、失败的回调
  this.onResolveCallbacks = []
  this.onRejectCallbacks = []

  let self = this
  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value
      self.status = 'fulfilled'
      self.onResolveCallbacks.forEach(cb => cb())
    }
    
  }
  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason
      self.status = 'rejected'
      self.onRejectCallbacks.forEach(cb => cb())
    }
  }
  try {
    // 执行器会立刻执行
    executor(resolve, reject)
  } catch (e) {
    // 如果抛出异常，走reject
    reject(e)
  }
}

Promise.prototype.then = function (onfulfilled, onrejected) {
  const self = this
  // 返回一个promise，实现then链式调用
  let promise2 = new Promise(function (resolve, reject) {
    // 如果成功，调用 onfulfilled
    if (this.status === 'fulfilled') {
      onfulfilled(this.value)
    }
    // 如果失败，调用 onrejected
    if (this.status === 'rejected') {
      onrejected(this.reason)
    }
    if (this.status === 'pending') {
      // 异步任务，then执行的时候，还是pending态，成功、回调存起来，发布订阅模式
      this.onResolveCallbacks.push(function () {
        onfulfilled(self.value)
      })
      this.onRejectCallbacks.push(function () {
        onrejected(self.reason)
      })
    }
  })
  return promise2
}

module.exports = Promise