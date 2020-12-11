let Koa = require('koa')
// 不支持文件
let koaBodyParser = require('koa-bodyparser')
let static = require('koa-static')

let app = new Koa()

// 自己实现的bodyParser
function bodyParserSelf() {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      let arr = []
      ctx.req.on('data', function (chunk) {
        arr.push(chunk)
      })
      ctx.req.on('end', function () {
        console.log(Buffer.concat(arr).toString())
        if (ctx.get('content-type') === 'application/x-www-form-urlencoded') {
          ctx.request.body = querystring.parse(Buffer.concat(arr).toString())
        } else if (ctx.get('content-type') === 'application/json') {
          ctx.request.body = JSON.parse(Buffer.concat(arr).toString())
        } else {
          ctx.request.body = {}
        }
        resolve()
      })
    })
    await next()
  }
}

// app.use(bodyParserSelf())
app.use(static(__dirname))

app.use(async (ctx, next) => {
  if (ctx.path === '/upload' && ctx.method === 'POST') {
    // ctx.body = ctx.request.body
  } else {
    await next()
  }
})

app.listen(3000, function () {
  
})