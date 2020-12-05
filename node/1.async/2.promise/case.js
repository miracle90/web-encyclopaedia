let Promise = require('./promise')
let fs = require('fs')

// promise化
// 复用
// bluebird
// mz 自动封装的库 mz/fs => fs
function promisify(fn) {
  return function () {
    return new Promise((resolve, reject) => {
      fn(...arguments, function (err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}

function promisifyAll(obj) {
  // 遍历对象属性
  for (let key in obj) {
    // 如果是函数的话
    if (typeof obj[key] === 'function') {
      // 把每个方法都promise化
      obj[`${key}Promisify`] = promisify(obj[key])
    }
  }
}

promisifyAll(fs)

fs.readFilePromisify(`docs/node/async/2.promise/name.txt`, 'utf8').then(data => {
  console.log(data)
})


// let read = promisify(fs.readFile)

// let write = promisify(fs.writeFile)

// read(`docs/node/async/2.promise/name.txt`, 'utf8').then(res => {
//   console.log(res)
// })

// write(`docs/node/async/2.promise/age.txt`, 30).then(() => {
//   console.log('成功')
// })



// function read(url) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(`docs/node/async/2.promise/${url}`, 'utf8', function (err, data) {
//       if (err) return reject(err)
//       resolve(data)
//     })
//   })
// }

// Promise.race([read('name.txt'), read('age.txt')]).then(data => {
//   console.log(data)
// })
