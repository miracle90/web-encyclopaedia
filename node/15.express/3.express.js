let express = require('./express')

let app = express()

// path
app.use('/write', function (req, res, next) {
  console.log(1)
  // req.a = 100
  next()
  console.log(4)
})
// app.use('/', function (req, res, next) {
//   console.log(2)
//   // console.log(req.a)
//   next()
//   console.log(5)
// })
// app.use('/', function (req, res, next) {
//   console.log(3)
//   next()
//   console.log(6)
// })
app.get('/', function (req, res) {
  res.end('xxx')
})

app.listen(3000, function () {
  console.log('server start')
})
