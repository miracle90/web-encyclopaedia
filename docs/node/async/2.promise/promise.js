function Promise(executor) {
  // 给promise定义状态
  this.status = 'pending'
  // 成功和失败原因
  this.value = undefined
  this.reason = undefined

  let self = this
  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value
      self.status = 'fulfilled'
    }
    
  }
  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason
      self.status = 'rejected'
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
  // 如果成功，调用 onfulfilled
  if (this.status === 'fulfilled') {
    onfulfilled(this.value)
  }
  // 如果失败，调用 onrejected
  if (this.status === 'rejected') {
    onrejected(this.reason)
  }
}

module.exports = Promise