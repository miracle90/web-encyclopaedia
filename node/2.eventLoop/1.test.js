// 浏览器的时间环和node 11 的时间环现在一样

/**
 * 宏任务
 * 优先级：主代码块 > setImmediate > MessageChannel > setTimeout / setInterval
 * setImmediate 只有IE浏览器支持，速度比setTimeout快
 * MessageChannel
 * setTimeout
 * I/O
 */

/**
 * 微任务
 * 优先级：process.nextTick > Promise > MutationObserver
 * process.nextTick
 * then
 * MutationObserver
 */

setTimeout(() => {
  console.log(1)
  Promise.resolve().then(() => {
    console.log(2)
  })
}, 0)
Promise.resolve().then(() => {
  console.log(3)
  setTimeout(() => {
    console.log(4)
  }, 0);
})

console.log('start')



// function a() {
//   console.log('a')
//   function b() {
//     console.log('b')
//     function c() {
//       console.log('c')
//     }
//     c()
//   }
//   b()
// }
// a()