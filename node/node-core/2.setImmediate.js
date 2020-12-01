// 主栈执行时，默认已经超过4ms，定时器已经到达了执行的时间
// setImmediate(() => {
//   console.log('setImmediate')
// })

// setTimeout(() => {
//   console.log('setTimeout')
// })

// process.nextTick(() => {
//   console.log('nextTick')
// })

// 主栈执行后，会执行微任务
// 和浏览器一样的，不一样的是，每个阶段都有一个自己的队列

let fs = require('fs')

fs.readFile('docs/node/node-core/note.md', 'utf8', function (err, data) {
  console.log(data)
  setTimeout(() => {
    console.log('setTimeout')
  }, 0);
  // 有check，会先走check
  setImmediate(() => {
    console.log('setImmediate')
  });
})