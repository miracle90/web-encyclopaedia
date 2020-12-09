let express = require('express')

let app = express()

// 请求体的解析
let bodyParser = require('body-parser')

// 会把解析后的结果放到 req.body 上
app.use(bodyParser.json())

app.post('/ajax', function (req, res) {
  console.log(req.body)
  res.send(req.body)
  // let arr = []
  // req.on('data', function (data) {
  //   arr.push(data)
  // })
  // req.on('end', function () {
  //   console.log(Buffer.concat(arr).toString())
  //   res.end()
  // })
})

app.listen(3000, function () {
  console.log('server start')
})
