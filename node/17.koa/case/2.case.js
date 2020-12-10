let Koa = require('./koa/application')

let app = new Koa()

// async函数执行后返回的是一个promise
app.use(async (req, res) => {
  res.end('koa')
  // ctx.req
  // ctx.res
  // ctx.request
  // ctx.response
  // ctx.body = 'koa'
})

app.listen(3000, function () {
  console.log('server start')
})