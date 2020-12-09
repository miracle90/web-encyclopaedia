let express = require('./express')

let app = express()

// 中间件函数都是高阶函数，方便传参
// express内置了static方法
express.static = function (dirname) {
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

// 提供一些公共功能
// app.use()

// 判断路径是不是一个文件，是文件就把文件返回，否则执行路由
// 静态文件中间件
app.use(express.static(__dirname))
app.use(express.static(__dirname + '/my'))

// 多个路径太过复杂
// app.get('/1.express.js', function (req, res) {
//   res.sendFile()
// })
// app.get('/2.express.js', function (req, res) {
//   res.sendFile()
// })

app.use('/', function (req, res) {
  res.send('ok')
})

app.listen(3000, function () {
  console.log('server start')
})
