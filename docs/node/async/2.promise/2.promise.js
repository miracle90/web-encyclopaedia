let Promise = require('./promise')

let p = new Promise((resolve, reject) => {
  resolve(123)
})

let promise2 = p.then(data => {
  console.log('------------', data)
  // return data
  throw new Error(666)
}, err => {
  return err
})

promise2.then(data => {
  console.log('***', data)
}, err => {
  console.log('@@@@@@@@@@', err)
})