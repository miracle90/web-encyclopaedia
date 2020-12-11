let Koa = require('koa')
let Router = require('./koa-router')

let app = new Koa()
let router = new Router()

router.get('/', async (ctx, next) => {
  console.log(1)
  ctx.body = '1'
  await next()
})
router.get('/', async (ctx, next) => {
  console.log(2)
  ctx.body = '2'
})
router.get('/user', async (ctx, next) => {
  console.log(4)
  ctx.body = '4'
})

app.use(router.routes())

app.use(async (ctx, next) => {
  console.log(3)
  ctx.body = '3'
})

app.listen(3000)