/**
 * 大部分情况下，异步的IO操作发生的错误无法被try catch捕获，如果没有捕获会导致程序退出
 * 在Node.js中，如果一个抛出的异常没有被try catch捕获，会尝试将错误交给uncaughtException事件处理函数来进行处理，仅当没有注册该事件处理函数时才会导致进程直接退出。
 * 一般不推荐使用
 */
process.on('uncaughtException', function(err) {
  console.log('~~~~~~~~~~~ ', err.stack)
})

function go() {
  try {
    // throw new Error('throw new error')

    // 异步任务，没有被try catch捕获到，后面再执行，后面代码不会被执行
    setTimeout(() => {
      console.log(a)
    }, 1000);
  } catch (error) {
    console.log(error)
  }
}

go()

setTimeout(() => {
  console.log('after go')
}, 3000);