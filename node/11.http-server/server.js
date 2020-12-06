let http = require('http')
let url = require('url')
let path = require('path')
let mime = require('mime')    // 解析类型
let ejs = require('ejs')    // 用模板和数据组成一个页面
let fs = require('mz/fs')   // promise
let chalk = require('chalk')    // 控制颜色

let template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf8')

class Server {
  constructor(config) {
    this.port = config.port
    this.host = config.host
    this.dir = config.dir
    this.template = template
  }
  async handleRequest(req, res) {
    try {
      let { pathname } = url.parse(req.url)
      // 判断是目录还是文件，如果是文件直接将内容，如果是目录列出目录列表
      // 编码问题
      let absPath = path.join(this.dir, decodeURIComponent(pathname))
      let statObj = await fs.stat(absPath)
      if (statObj.isDirectory()) {
        // 先读取当前目录下所有的列表
        let dirs = await fs.readdir(absPath)
        let list = dirs.map(item => ({
          href: path.join(pathname, item),
          dir: item,
        }))
        let str = ejs.render(this.template, { arr: list })
        res.setHeader('Content-Type', 'text/html;charset=utf8')
        res.end(str)
      } else {
        this.sendFile(req, res, statObj, absPath)
      }
    } catch (error) {
      console.log(error)
      this.sendError(req, res)
    }
    
  }
  sendError(req, res) {
    res.statusCode = 404
    res.end('NOT FOUND')
  }
  // 缓存策略
  cache(req, res, statObj, absPath) {
    let lastModified = statObj.ctime.toUTCString()
    let modifiedSince = req.headers['if-modified-since']
    let etag = statObj.size + ''
    let noneMatch = req.headers['if-none-match']
    res.setHeader('Cache-Control', 'max-age=5')
    res.setHeader('Last-Modified', lastModified)
    res.setHeader('Etag', etag)
    if (lastModified !== modifiedSince) {
      return false
    }
    if (noneMatch !== etag) {
      return false
    }
    return true
  }
  sendFile(req, res, statObj, absPath) {
    console.log(req.url)
    // 强制缓存
    // res.setHeader('Cache-Control', 'max-age=10')
    // res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())

    let client = req.headers['if-modified-since']
    let server = statObj.ctime.toUTCString()
    // 协商缓存
    // 这种方式并不是很靠谱 => 时间变了，内容没有改；1s内的更改对比不出来
    // 在真正的开发中，采用修改日期+文件大小作为etag
    if (client === server) {
      res.statusCode = 304
      res.end()
      return
    }
    res.setHeader('Last-Modified', server)
    res.setHeader('Content-Type', mime.getType(absPath) + ';charset=utf8')
    fs.createReadStream(absPath).pipe(res)
  }
  start() {
    let server = http.createServer(this.handleRequest.bind(this))
    server.listen(this.port, this.host, () => {
      console.log(chalk.yellow(`Starting up http-server, serving ${this.dir} Available on\r\n`))
      console.log(chalk.green(`http://${this.host}:${this.port}`))
    })
  }
}

module.exports = Server