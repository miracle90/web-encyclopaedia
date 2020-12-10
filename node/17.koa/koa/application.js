let http = require('http')
let EventEmitter = require('events')
let context = require('./context')
let request = require('./request')
let response = require('./response')
const { Stream } = require('stream')

class Koa extends EventEmitter {
  constructor() {
    super()
    this.middlewares = []
    this.context = Object.create(context)
    this.request = Object.create(request)
    this.response = Object.create(response)
  }
  use(fn) {
    this.middlewares.push(fn)
  }
  // 产生ctx上下文
  createContext(req, res) {
    let ctx = this.context
    // 自己封装的
    ctx.request = this.request
    ctx.response = this.response
    // 原生的，为了可以再自己的request属性上拿到req就把req挂载在了自己封装的对象上
    ctx.request.req = ctx.req = req
    ctx.response.res = ctx.res = res
    return ctx
  }
  compose(ctx, middlewares) {
    // 通过此变量，来控制用户是否多次调用了next方法
    let i = -1
    let dispatch = async index => {
      if (index <= i) return Promise.reject('multi called next() ~~~~')
      i = index
      // 达到最后一个中间件，再调用next方法无效
      if (index === middlewares.length) return
      let middleware = middlewares[index]
      // 第一个中间件执行的时候，调用了第二个中间件，要等待第二个中间件执行后，完成第一个中间件
      // 第一个中间件，调用next会触发下一个中间件执行
      return middleware(ctx, () => dispatch(index + 1))
    }
    return dispatch(0)
  }
  handleRequest(req, res) {
    // 创建上下文
    let ctx = this.createContext(req, res)
    // 预先定义404
    res.statusCode = 404
    // this.middleware(ctx)

    // 组合函数
    let p = this.compose(ctx, this.middlewares)

    // 组合后，会产生一个新的promise
    // 等待这个promise执行完成后，会取ctx.body 返回结果
    p.then(() => {
      let body = ctx.response.body
      if (body instanceof Stream) {
        res.setHeader('Content-Type', 'application/octet-stream')
        res.setHeader('Content-Disposition', `attachment; filename=${body.path}`)
        body.pipe(res)
      } else if (body) {
        res.end(body)
      } else {
        res.end(`Not Found`)
      }
    }).catch(err => {
      this.emit('error', err)
    })
  }
  listen(...args) {
    // 创建一个http服务
    let server = http.createServer(this.handleRequest.bind(this))
    // 监听一个端口号
    server.listen(...args)
  }
}

module.exports = Koa