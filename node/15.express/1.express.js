// express 功能全，大，集成了路由的功能，还集成了内置的方法
// koa 小，通过插件
let express = require('./express')

// http.createServer
let app = express()

// use中间件
// get / post / delete / put
// 请求方法 + 路径
app.all('*', function (req, res) {
  res.end('*')
})

app.get('/', function (req, res) {
  res.end('home')
})

app.post('/', function (req, res) {
  res.end('post home')
})

app.all('/', function (req, res) {
  res.end('all home')
})

app.listen(3000, function () {
  console.log('server start')
})

// 可以开多个
// app.listen(3001)