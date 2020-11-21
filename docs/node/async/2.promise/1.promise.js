// promise怎么变成失败态 reject、new Error()

// const Promise = require('./promise')

let fs = require('fs')
// const Promise = require('./history/1.基本的promise/promise')

// fs.readFile('./docs/node/async/2.promise/name.txt', 'utf8', function (err, data) {
//   fs.readFile(`./docs/node/async/2.promise/${data}`, 'utf8', function (err, data) {
//     console.log(data)
//   })
// })

function read(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(`./docs/node/async/2.promise/${url}`, 'utf8', function (err, data) {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

// 链式调用
// 每一个then方法返回新的promise
read('name.txt').then(data => {
  // 如果返回的是一个promise，会让这个promise执行，并且采用他的状态座位下一个then的值
  return read(data)
}).then(data => {
  console.log(data)
  return 100
}, err => {
  console.log('err', err)
}).then(data => {
  console.log(data)
})

// let promise = new Promise(function (resolve, reject) {
//   resolve()
// })

// promise.then(function (data) {
//   console.log(data)
// })


