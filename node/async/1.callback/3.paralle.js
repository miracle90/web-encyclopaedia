// 并发调用接口 两个ajax name + age

let fs = require('fs')

function after(times, cb) {
  let result = {}
  return function (key, data) {
    result[key] = data
    if (--times === 0) {
      cb(result)
    }
  }
}

// 所有异步执行之后执行
let newFn = after(2, function (result) {
  console.log(result)
})

// code runner bug，默认取根目录
fs.readFile('./docs/node/async/1.callback/name.txt', 'utf8', function (err, data) {
  if (err) return console.log(err)
  newFn('name', data)
})
fs.readFile('./docs/node/async/1.callback/age.txt', 'utf8', function (err, data) {
  if (err) return console.log(err)
  newFn('age', data)
})

console.log('hah')

// 串行，两个人有关系
// 并行，两个人没关系

// 发布订阅（promise原理） 观察者模式