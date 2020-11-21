// 生成器配合 yield 使用
// 如果碰到yield，会暂停
// function * read() {
//   let a = yield 1
//   console.log(a)
//   let b = yield 2
//   console.log(b)
//   let c = yield 3
//   console.log(c)
// }

// 生成器返回的是迭代器
// next方法 => 返回value done
// let r = read()
// // 第一次next是不能传值的
// console.log(r.next(1))
// console.log(r.next(2))
// console.log(r.next(3))
// console.log(r.next(4))

// async + await 基于 generator + co

let fs = require('mz/fs')
const { resolve } = require('path')

function * read() {
  let name = yield fs.readFile('./docs/node/async/2.promise/name.txt', 'utf8')
  let age = yield fs.readFile(`./docs/node/async/2.promise/${name}`, 'utf8')
  return age
}

// tj => co express koa

// 入参生成器函数，迭代器
function co(it) {
  return new Promise((resolve, reject) => {
    function next(val) {
      let { value, done } = it.next(val)
      if (done) {
        return resolve(value)
      }
      // 如果不是promise，包装成promise
      Promise.resolve(value).then(data => {
        next(data)
      }, reject)
    }
    next()
  })
}

// let co = require('co')

co(read()).then(data => {
  console.log(data)
})

// let r = read()
// let { value, done } = r.next()
// value.then(data => {
//   let { value, done } = r.next(data)
//   Promise.resolve(value).then(data => {
//     let { value, done } = r.next(data)
//     console.log(value)
//   })
// })