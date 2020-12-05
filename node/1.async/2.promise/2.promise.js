let Promise = require('./promise')

let p = new Promise((resolve, reject) => {
  resolve(123)
  // throw new Error('出错')
})

// let promise2 = p.then(data => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(666)
//     }, 1000);
//   })
// }, err => {
//   return err + 1000
// })

p.then().then().then().then(data => {
  console.log(data)
}, err => {
  console.log('-------------', err)
})


// // to refer same object会导致无法继续执行
// let p = new Promise((resolve, reject) => {
//   resolve()
// })

// let p2 = p.then(data => {
//   return p2
// })

// p2.then(null, function (err) {
//   console.log('err', err)
// })

