let express = require('express')
let bodyParser = require('body-parser')
// 处理文件
let multer = require('multer')

// 将文件存放到upload文件夹里头
let upload = multer({ dest: 'upload/' })

let app = express()

// 处理json格式的请求体
app.use(bodyParser.json())
// 处理表单格式的请求体
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/post', function(req, res) {
  res.send(req.body)
})

app.post('/form', function(req, res) {
  res.send(req.body)
})

// multer
app.post('/upload', upload.single('avatar'), function(req, res) {
  // 指的是请求体里头的 avatar，对应的内容
  console.log(req.file)
  console.log(req.body)
  res.send(req.body)
})

app.listen(8080)