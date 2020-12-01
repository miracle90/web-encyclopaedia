async function async1() {
  console.log('async1 start')
  await async2()
  // 在浏览器不同的版本，把Promise进行转化后的结果不太一样
  // 可能转化成两个then，也可以是一个then
  console.log('XXXXXXXXXXX')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
}, 0);

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})

console.log('script end')

// script start
// async1 start
// async2
// XXXXXXXXXXx
// promise1
// script end
// promise2
// setTimeout