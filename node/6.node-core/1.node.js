// node是js的执行环境

// 执行方式 => node + 文件名

// 浏览器里面的window => global

// 在文件中执行 this 指向的不是 global

// node 为了实现模块化，在文件执行时，增加了匿名函数，所以this在这个函数中被更改了

// console.log(this) // {} module.exports

// 在浏览器中可以访问 window，浏览器中不能访问 global，window代理了 global
// 在服务端可以直接访问 global 上的属性

// console.log(Object.keys(global))

// process 进程，当前的执行的环境
// Buffer，可以读写文件，内存中，Buffer
// setImmediate 宏任务

// 默认把v8引擎上的方法，给隐藏掉了
// console.dir(global, { showHidden: true })

// console.log(Object.keys(process))

// argv 运行时传递的参数，可以再node运行时，传入特定的一些变量
// node 1.node.js --config xxx.config.js --port 3000
// ['--config', 'xxx.config.js', '--port', '3000']
console.log(process.argv)
let obj = process.argv.slice(2).reduce((memo, b, index, arr) => {
  if (b.includes('--')) {
    // 如果有 '--'，下一项就是值
    memo[b.slice(2)] = arr[index + 1]
  }
  return memo
}, {})
console.log(obj)

// env 环境变量
// 在当前运行的命令行中，可以设置一个变量 set NODE_ENV = development
// mac下 export NODE_ENV=development => cross-env 解决
// 可以根据不同的环境变量，调用不同的功能
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  console.log('开发环境')
} else {
  console.log('生产环境')
}

// cwd 当前的工作目录
console.log(process.cwd())
// http-server（通过这个变量可以知道在哪里运行的node服务）

// nextTick
// 微任务，只能在node中使用
// 宏任务 => setImmediate setTimeout readFile
// 微任务 => promise.then nextTick
// node的事件循环，每一个方法都有一个队列

// timer => setTimeout
// pending callbacks i/o的延迟回调
// idle，prepare 内部使用
// poll 轮训 => fs.readFile
// check 检测 => setImmediate
// close callbacks


// stdin stderr stdout