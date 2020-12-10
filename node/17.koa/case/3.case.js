let Koa = require('./koa/application')
// let Koa = require('koa')

let app = new Koa()

// async函数执行后返回的是一个promise
app.use(async (ctx) => {
  // console.log(ctx.req.url)
  // console.log(ctx.request.req.url)
  // console.log(ctx.request.url)
  // console.log(ctx.url)
  
  // ctx.req
  // ctx.res
  // ctx.request
  // ctx.response
  
  // 返回给客户端
  ctx.body = 'koa'
})

app.listen(3000, function () {
  console.log('server start')
})