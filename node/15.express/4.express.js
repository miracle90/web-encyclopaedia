 let express = require('./express')

let app = express()

// express内置了模板引擎

app.use(function (req, res, next) {
  // 找到最下面的一个中间件
  next('错误处理XXXXXXXXXX')
})
app.use(function (req, res, next) {
  console.log(1)
  next()
})
app.use(function (req, res, next) {
  console.log(2)
  next()
})

app.get('/', function (req, res) {
  // fs.sendFile('./package.json', { root: __dirname })
  // res.send({ name: 'lyy' })
  // res.send('中文')
  // res.end('xxx')
  console.log(req.query)
  res.send(404)
})


// app.use(function (err, req, res, next) {
//   console.log('5 ', err)
//   res.send(err)
//   // res.send('错误处理')
//   // next()
// })

// app.use(function (err, req, res, next) {
//   console.log('4 ', err)
//   // res.send('错误处理')
//   // next()
// })


app.listen(3000, function () {
  console.log('server start')
})
