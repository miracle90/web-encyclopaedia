let Koa = require('koa')
// 不支持文件
// let koaBodyParser = require('koa-bodyparser')
let fs = require('mz/fs')
let path = require('path')
let static = require('koa-static')
let formidable = require('formidable')

let app = new Koa()

// 总数量
let total = 0

let i = 0

let filename

// app.use(koaBodyParser())
app.use(static(__dirname))

// 断点续传

// 进度条 xhr.onprogress => e.loaded


async function parser(form, req) {
  // return，不能写成await，要不然没有返回值
  return new Promise((resolve, reject) => {
    form.parse(req, async function (err, fields, files) {
      total = fields.count
      filename = fields.filename
      // 重命名
      await fs.rename(files.chunk.path, 'temp/' + fields.chunkNum)
    })
    form.on('end', function () {
      if (i++ === total - 1) {
        // 全部传输完毕
        resolve(filename)
      } else {
        // 还未完成
        resolve(false)
      }
    })
  })
}

async function mergeFiles() {
  // 同步
  let dirs = await fs.readdir('./temp')
  dirs.sort((a, b) => a - b)
  dirs = dirs.map(dir => path.join('temp', dir))
  let ws = fs.createWriteStream(filename)
  for (let i = 0; i < dirs.length; i++) {
    ws.write(fs.readFileSync(dirs[i]))
  }
  // 写完之后需要关闭
  ws.end()
}

app.use(async (ctx, next) => {
  if (ctx.path === '/upload' && ctx.method === 'POST') {
    let fd = new formidable.IncomingForm()
    fd.uploadDir = 'temp'
    let filename = await parser(fd, ctx.req)
    if (!filename) {
      ctx.body = '当前数据块上传成功'
    } else {
      await mergeFiles()
      ctx.body = '全部上传完毕'
    }
  } else {
    await next()
  }
})

app.listen(3000, function () {
  
})