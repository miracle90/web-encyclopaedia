let express = require('express')
let cookieParser = require('cookie-parser')
let expressSession = require('express-session')

let app = express()

// cookie-parser
// express-parser

app.use(cookieParser())
app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: 'yy'
}))

app.get('/read', function (req, res) {
  // console.log(req.cookies)
  // res.send(req.cookies)
  res.send(req.session.a)
})

app.get('/write', function (req, res) {
  // res.cookie('name', 'yy')
  req.session.a = 'hello'
  res.send('ok')
})

app.listen(3000, function () {
  console.log('server start')
})

// 二级路由
// crypto 是 node 内置模块
// body-parser不支持文件
// express => multer 处理文件的内容
