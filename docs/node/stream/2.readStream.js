
let ReadStream = require('./ReadStream')

let rs = new ReadStream('./name.txt', {
  flags: 'r',
  highWaterMark: 3,
  mode: 0o666,
  start: 0,
  end: 6,
  encoding: 'utf8',
  autoClose: true
})

rs.on('error', () => {
  console.log('error')
})

rs.on('open', () => {
  console.log('open') 
})

// let timer = setInterval(() => {
//   rs.resume()
// }, 1000);

let arr = []
rs.on('data', chunk => {
  console.log('data', chunk)
  arr.push(chunk)
  // rs.pause()
})

rs.on('end', () => {
  // clearInterval(timer)
  console.log('end', arr)
})

rs.on('close', () => {
  console.log('close')
})