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
    console.log('catch ', e)
    reject(e)
  }
}

/**
 * 
 * @param {*} promise2 当前then返回的promise
 * @param {*} x 当前then中成功或者失败回调返回的结果
 * @param {*} resolve 
 * @param {*} reject 
 */
function resolvePromise(promise2, x, resolve, reject) {
  resolve(x)
}

Promise.prototype.then = function (onfulfilled, onrejected) {
  const self = this
  // 返回一个promise，实现then链式调用
  let promise2 = new Promise(function (resolve, reject) {
    // 如果成功，调用 onfulfilled
    if (self.status === 'fulfilled') {
      // 此时promise2还是 undefined，使用setTimeout
      setTimeout(() => {
        try {
          let x = onfulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }
    // 如果失败，调用 onrejected
    if (self.status === 'rejected') {
      setTimeout(() => {
        try {
          let x = onrejected(self.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    }
    if (self.status === 'pending') {
      // 异步任务，then执行的时候，还是pending态，成功、回调存起来，发布订阅模式
      self.onResolveCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onfulfilled(self.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
      self.onRejectCallbacks.push(function () {
        setTimeout(() => {
          try {
            let x = onrejected(self.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      })
    }
  })
  return promise2
}

module.exports = Promise