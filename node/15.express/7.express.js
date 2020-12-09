let express = require('express')

let app = express()

// 请求体的解析
// let bodyParser = require('body-parser')

function bodyParser() {
  
}

bodyParser.json = function () {
  return function (req, res, next) {
    if (req.headers['content-type'] === 'application/json') {
      let arr = []
      req.on('data', function (chunk) {
        arr.push(chunk)
      })
      req.on('end', function () {
        req.body = JSON.parse(Buffer.concat(arr).toString())
        next()
      })
    } else {
      next()
    }
  }
}

bodyParser.urlencoded = function () {
  return function (req, res, next) {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      let arr = []
      req.on('data', function (chunk) {
        arr.push(chunk)
      })
      req.on('end', function () {
        req.body = require('querystring').parse(Buffer.concat(arr).toString())
        next()
      })
    } else {
      next()
    }
  }
}

// 会把解析后的结果放到 req.body 上
// json
app.use(bodyParser.json())
// 表单
app.use(bodyParser.urlencoded())

app.post('/ajax', function (req, res) {
  console.log(req.body)
  res.send(req.body)
})

app.listen(3000, function () {
  console.log('server start')
})
