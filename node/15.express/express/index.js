let http = require('http')
let url = require('url')
let methods = require('methods')

methods = [...methods, 'all']

function application() {
  let app = (req, res) => {
    let method = req.method.toLowerCase()
    let { pathname } = url.parse(req.url)

    let index= 0
    // 如果有err，就找错误中间件
    function next(err) {
      if (index >= app.routes.length) {
        if (err) {
          // 如果没有捕获，会将错误返回
          return res.send(err)
        }
        return res.end(`Cannot ${method} ${pathname}`)
      }
      
      let currentLayer = app.routes[index++]

      // 如果传递了错误参数
      if (err) {
        // 判断函数参数长度，为4则是错误处理
        if (currentLayer.method === 'middle' && currentLayer.cb.length === 4) {
          currentLayer.cb(err, req, res, next)
        } else {
          // 继续向下找，把参数带进去
          next(err)
        }
      } else {
        if (currentLayer.method === 'middle') {
          if (currentLayer.path === '/' || currentLayer.path === pathname || pathname.startsWith(currentLayer.path + '/')) {
            return currentLayer.cb(req, res, next)
          } else {
  
          }
        } else {
          if (currentLayer.path.params) {
            if (method === currentLayer.method && currentLayer.path.test(pathname)) {
              let [, ...args] = pathname.match(currentLayer.path)
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
    }
    next()
  }
  app.routes = []

  app.use = function (path, handler) {
    if (typeof handler === 'undefined') {
      handler = path
      path = '/'
    }
    let layer = {
      method: 'middle',
      path,
      cb: handler
    }
    app.routes.push(layer)
  }
  methods.forEach(method => {
    app[method] = function (path, cb) {
      if (path.includes(':')) {
        let params = []
        path = path.replace(/:([^\/]+)/g, function () {
          params.push(arguments[1])
          return '([^\/]+)'
        })
        path = new RegExp(path)
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

  // express内置的中间件
  app.use(function (req, res, next) {
    let { pathname, query } = req.path = require('url').parse(req.url, true)
    req.path = pathname
    req.query = query
    res.sendFile = function (p, options = {}) {
      let abs = require('path').join(options.root, p)
      let fs = require('fs')
      // mime
      fs.createReadStream(abs).pipe(res)
    }
    res.send = function (value) {
      if (typeof value === 'object') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify(value))
      }
      if (Buffer.isBuffer(value) || typeof value === 'string') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(value)
      }
      if (typeof value === 'number') {
        res.statusCode = value
        res.end(require('_http_server').STATUS_CODES[value])
      }
    }
    next()
  })

  return app
}

application.static = function (dirname) {
  return function (req, res, next) {
    let fs = require('fs')
    let path = require('path')
    let mime = require('mime')
    let absPath = path.join(__dirname, req.path)
    fs.stat(absPath, (err, statObj) => {
      if (err) {
        // 中间件无法处理，向下执行
        return next(err)
      }
      // 如果是文件
      if (statObj.isFile()) {
        res.setHeader('Content-Type', mime.getType(absPath) + ';charset=utf8')
        fs.createReadStream(absPath).pipe(res)
      }
    })
  }
}


module.exports = application