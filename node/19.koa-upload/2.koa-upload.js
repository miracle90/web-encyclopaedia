let Koa = require('koa')
let Router = require('./koa-router')
let fs = require('fs')
let path = require('path')
// let convert = require('koa-convert')
// koa-better-body 基于 koa1，使用 generator，即将被遗弃
// let betterBody = require('koa-better-body')

let app = new Koa()
let router = new Router()

Buffer.prototype.split = function (sep) {
  let arr = []
  let offset = 0
  let len = Buffer.from(sep).length
  let current
  while (-1 !== (current = this.indexOf(sep, offset))) {
    arr.push(this.slice(offset, current))
    offset = current + len
  }
  arr.push(this.slice(offset, current))
  return arr
}

// let b = Buffer.from('哈哈**啦啦').split('**')
// console.log(b)

function betterBody({ uploadDir }) {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      // 把结果放到 ctx.request.fields
      let arr = []
      ctx.req.on('data', function (chunk) {
        arr.push(chunk)
      })
      ctx.req.on('end', function () {
        if (ctx.get('content-type').includes('multipart/form-data')) {
          let r = Buffer.concat(arr)
          let boundary = '--' + ctx.get('content-type').split('=')[1]
          let lines = r.split(boundary).slice(1, -1)
          let fields = {}
          lines.forEach(line => {
            let [head, body] = line.split('\r\n\r\n')
            // 取出内容区域有效的内容
            body = body.slice(0, -2)
            // 标题转化成字符串
            head = head.toString()
            if (head.includes('filename')) {
              // 处理文件
              // 总共的内容，减去头部的长度，减4就是剩下的请求体
              let filecontent = line.slice(head.length + 4, -2)
              fs.writeFileSync(path.join(uploadDir, Math.random().toString()), filecontent)
            } else {
              fields[head.match(/name="(\w+)"/)[1]] = body.toString()
            }
          });
          ctx.request.fields = fields
        }
        resolve()
      })
    })
    await next()
  }
}

app.use(betterBody({
  uploadDir: 'temp'
}))

router.get('/upload', async (ctx, next) => {
  ctx.body = ctx.request.fields
})

app.use(router.routes())

app.listen(3000)