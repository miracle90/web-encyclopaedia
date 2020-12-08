let http = require('http')
let url = require('url')
let methods = require('methods')

methods = [...methods, 'all']

function application() {
  let app = (req, res) => {
    // 获取用户请求的方法
    let method = req.method.toLowerCase()
    // 获取用户请求的路径
    let { pathname } = url.parse(req.url)
    for (let i = 0; i < app.routes.length; i++) {
      let currentLayer = app.routes[i]
      if ((method === currentLayer.method || 'all' === currentLayer.method) && (pathname === currentLayer.path || currentLayer.path === '*')) {
        return currentLayer.cb(req, res)
      }
    }
    res.end(`Cannot ${method} ${pathname}`)
  }
  app.routes = []
  // 批量添加各种方法
  methods.forEach(method => {
    app[method] = function (path, cb) {
      let layer = {
        method,
        path,
        cb
      }
      app.routes.push(layer)
    }
  })

  app.listen = (...args) => {
    let server = http.createServer(app)
    server.listen(...args)
  }
  return app
}

module.exports = application