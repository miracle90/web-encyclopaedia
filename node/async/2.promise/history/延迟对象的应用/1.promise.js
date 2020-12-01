let Promise = require('./promise')
let fs = require('fs')

function read(url) {
  let defer = Promise.deferred()
  fs.readFile(`docs/node/async/2.promise/${url}`, 'utf8', function (err, data) {
    if (err) return defer.reject(err)
    defer.resolve(data)
  })
  return defer.promise
}

read('name.txt').then(res => {
  return read(res)
}).then(res => {
  console.log(res)
})