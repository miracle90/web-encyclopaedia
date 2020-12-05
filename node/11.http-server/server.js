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
  sendFile(req, res, statObj, absPath) {
    // 增加缓存
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