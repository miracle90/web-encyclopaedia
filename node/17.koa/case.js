let Koa = require('./koa/application')
// let Koa = require('koa')
let fs = require('fs')

let app = new Koa()

// 洋葱模型

app.use(async (ctx, next) => {
  ctx.body = fs.createReadStream('./package.json')
})

// app.use(async (ctx, next) => {
//   console.log(1)
//   await next()
//   await next()
//   console.log(2)
// })

// app.use(async (ctx, next) => {
//   console.log(3)
//   await next()
//   console.log(4)
// })

app.on('error', function (err) {
  console.log(err)
})

// express 中间件都是基于回调（错误处理中间件）
// async + await + Promise

// 每一个 next 函数前面都要增加一个 await
// 保证上一个中间件可以等待下一个中间件执行后在执行
// app.use(async (ctx, next) => {
//   console.log('------')
//   ctx.body = 'koa'
//   await next()
// })
// app.use(async (ctx, next) => {
//   console.log('++++++++++')
//   await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve()
//     }, 1000);
//   })
//   ctx.body = 'hello world'
// })

app.listen(3000, function () {
  console.log('server start')
})