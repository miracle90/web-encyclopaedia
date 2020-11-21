// Promise A+规范


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

/**
 * 
 * @param {*} promise2 当前then返回的promise
 * @param {*} x 当前then中成功或者失败回调返回的结果
 * @param {*} resolve 
 * @param {*} reject 
 */

//  这个方法要兼容别人的promise，严谨一些，如果一旦成功，就不能失败
function resolvePromise(promise2, x, resolve, reject) {
  // 对x进行判断，如果x是一个普通值，直接resolve就可以了
  // 如果x是一个promise，采用x的状态
  // 防止返回的promise和then方法返回的promise是同一个
  if (promise2 === x) {
    return reject(new TypeError('循环引用'))
  }
  // 这种情况就有可能x是一个promise
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let called
    // 如果promise肯定有then方法
    // 因为此方法，会混着别人的promise，可能会报错，try catch判断
    try {
      // 判断是对象之后，取他的then方法
      let then = x.then
      if (typeof then === 'function') {
        // 用刚才取得then方法，如果再取可能发生异常
        then.call(x, y => {
          // 如果一旦失败，就不能成功
          if (called) return
          called = true
          // 如果返回的是一个promise，resolve的结果可能还是一个promise，递归解析，知道常量为止
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          // 如果一旦成功，就不能失败
          if (called) return
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      // 如果一旦状态改变，就不能失败
      if (called) return
      called = true
      reject(err)      
    }
  } else {
    // x是普通常量
    resolve(x)
  }
}

// onfulfilled/onrejected必须异步执行
Promise.prototype.then = function (onfulfilled, onrejected) {
  // 值得穿透
  // 如果不写，onfulfilled直接返回
  onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val
  onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err }
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

// 请实现一个延迟对象
Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise