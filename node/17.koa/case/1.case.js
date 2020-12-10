let Koa = require('koa')

let app = new Koa()

// ctx.req
// ctx.res
// ctx.request
// ctx.response
app.use(ctx => {
  ctx.body = 'koa'
})

app.listen(3000, function () {
  console.log('server start')
})