// koa中路由的用法
let Koa = require('koa')
let Router = require('koa-router')

let app = new Koa()
let router = new Router({})
let router1 = new Router({})
let router2 = new Router({})
// let router = new Router({
//   // 虚拟出一个路径
//   prefix: '/user'
// })

router1.get('/add', async (ctx, next) => {
  ctx.body = 'add'
})

router1.get('/remove', async (ctx, next) => {
  ctx.body = '/remove'
})
router2.get('/student', async (ctx, next) => {
  ctx.body = '/student'
})
router2.get('/teacher', async (ctx, next) => {
  ctx.body = '/teacher'
})

// 挂载路由，二级路由
router.use('/user', router1.routes())
router.use('/school', router2.routes())

app.use(router.routes())
// 当前我允许哪些方法，Method Not Allowed
app.use(router.allowedMethods())

app.listen(3000)
