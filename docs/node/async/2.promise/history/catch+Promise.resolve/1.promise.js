let Promise = require('./promise')

Promise.resolve(123).then(data => {
  console.log(data)
})

// let p = new Promise((resolve, reject) => {
//   reject('666')
// })

// p.then(null, err => {
//   throw err
// }).catch(err => {
//   console.log(err)
// }).then(data => {
//   console.log('data', data)
// })
// .finally(() => {
//   // 无论如何都执行
//   console.log('finally')
// })