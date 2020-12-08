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

      // 存在参数，说明是一个路径参数
      if (currentLayer.path.params) {
        if (method === currentLayer.method && currentLayer.path.test(pathname)) {
          let [, ...args] = pathname.match(currentLayer.path)
          // 匹配出用户的参数
          // 使用参数和路由，返回出匹配的结果
          req.params = currentLayer.path.params.reduce((memo, current, index) => (memo[current] = args[index], memo), {})
          return currentLayer.cb(req, res)
        }
      }

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
      // path有冒号，需要做特殊处理
      if (path.includes(':')) {
        let params = []
        path = path.replace(/:([^\/]+)/g, function () {
          params.push(arguments[1])
          return '([^\/]+)'
        })
        path = new RegExp(path)
        // 把匹配到的结果，绑定到当前的正则上
        path.params = params
      }
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