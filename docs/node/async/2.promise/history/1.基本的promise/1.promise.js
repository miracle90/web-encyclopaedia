const Promise = require('./promise')

let promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('成功')
  }, 1000);
})

promise.then(function (val) {
  console.log('onfulfilled ', val)
}, function (err) {
  console.log('onrejected ', err)
})

promise.then(function (val) {
  console.log('onfulfilled ', val)
}, function (err) {
  console.log('onrejected ', err)
})

promise.then(function (val) {
  console.log('onfulfilled ', val)
}, function (err) {
  console.log('onrejected ', err)
})

