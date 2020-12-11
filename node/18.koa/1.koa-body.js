let Koa = require('koa')
let path = require('path')
let mime = require('mime')
let koaBodyParser = require('koa-bodyparser')
let querystring = require('querystring')
let static = require('koa-static')
// promisify
let fs = require('mz/fs')
const { resolve } = require('path')
let app = new Koa()

// koa 默认不支持路由，需要第三方中间件 koa-router
// express 内置了 express.static 静态服务中间件

// 自己实现的 static 中间件
function staticSelf(dir) {
  return async (ctx, next) => {
    try {
      let requestUrl = ctx.path
      let absPath = path.join(dir, requestUrl)
      let statObj = await fs.stat(absPath)
      console.log(absPath)
      console.log(statObj.isFile())
      if (statObj.isDirectory()) {
        // 文件夹的处理
        absPath = path.join(absPath, 'index.html')

      }
      ctx.set('Content-Type', mime.getType(absPath) + '; charset=utf-8')
      ctx.body = fs.createReadStream(absPath)
    } catch (error) {
      // 如果有错误，此中间件无法处理，向下走
      await next()
    }
  }
}

app.use(static(__dirname))

// app.use(async (ctx, next) => {
//   if (ctx.path === './1.form.html') {
//     ctx.set('Content-Type', 'text/html; charset=utf-8')
//     fs.createReadStream('./1.form.html')
//   } else {
//     // next前面必须要加await
//     // 因为下面的中间件可能有异步，需要等异步方法执行完成才继续执行
//     await next()
//   }
// })

// function bodyParser(ctx) {
//   return new Promise((resolve, reject) => {
//     let arr = []
//     ctx.req.on('data', function (chunk) {
//       arr.push(chunk)
//     })
//     ctx.req.on('end', function (chunk) {
//       let result = ctx.body = querystring.parse(Buffer.concat(arr).toString())
//       resolve(result)
//     })
//   })
// }

// 自己实现的bodyParser
function bodyParserSelf() {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      let arr = []
      ctx.req.on('data', function (chunk) {
        arr.push(chunk)
      })
      ctx.req.on('end', function () {
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

app.use(koaBodyParser())

app.use(async (ctx, next) => {
  if (ctx.path === '/upload' && ctx.method === 'POST') {
    // bodyParser 解析请求体
    // ctx.body = await bodyParser(ctx)
    ctx.body = ctx.request.body
  } else {
    await next()
  }
})

app.listen(3000, function () {
  
})