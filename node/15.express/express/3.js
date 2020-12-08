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

    // 默认先取出第一个，路由或者中间件，如果是中间件
    let index= 0
    function next() {
      if (index >= app.routes.length) return res.end(`Cannot ${method} ${pathname}`)
      let currentLayer = app.routes[index++]
      if (currentLayer.method === 'middle') {
        // 中间件逻辑
        // path为 /write/a =>   1，/  2，/write  3，/write/a，都会匹配
        if (currentLayer.path === '/' || currentLayer.path === pathname || pathname.startsWith(currentLayer.path + '/')) {
          return currentLayer.cb(req, res, next)
        } else {

        }
      } else {
        // 路有逻辑
        // 存在参数，说明是一个路径参数
        if (currentLayer.path.params) {
          if (method === currentLayer.method && currentLayer.path.test(pathname)) {
            let [, ...args] = pathname.match(currentLayer.path)
            // 匹配出用户的参数
            // 使用参数和路由，返回出匹配的结果
            req.params = currentLayer.path.params.reduce((memo, current, index) => (memo[current] = args[index], memo), {})
            return currentLayer.cb(req, res)
          }
        } else if ((method === currentLayer.method || 'all' === currentLayer.method) && (pathname === currentLayer.path || currentLayer.path === '*')) {
          return currentLayer.cb(req, res)
        } else {
          next()
        }
      }
    }
    next()
    // for (let i = 0; i < app.routes.length; i++) {
    //   let currentLayer = app.routes[i]

    //   // 存在参数，说明是一个路径参数
    //   if (currentLayer.path.params) {
    //     if (method === currentLayer.method && currentLayer.path.test(pathname)) {
    //       let [, ...args] = pathname.match(currentLayer.path)
    //       // 匹配出用户的参数
    //       // 使用参数和路由，返回出匹配的结果
    //       req.params = currentLayer.path.params.reduce((memo, current, index) => (memo[current] = args[index], memo), {})
    //       return currentLayer.cb(req, res)
    //     }
    //   }

    //   if ((method === currentLayer.method || 'all' === currentLayer.method) && (pathname === currentLayer.path || currentLayer.path === '*')) {
    //     return currentLayer.cb(req, res)
    //   }
    // }
    // res.end(`Cannot ${method} ${pathname}`)
  }
  app.routes = []

  app.use = function (path, handler) {
    if (typeof handler === undefined) {
      handler = path
      path = '/'
    }
    let layer = {
      // 使用middle区分，是否为中间件
      method: 'middle',
      path,
      cb: handler
    }
    app.routes.push(layer)
  }
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