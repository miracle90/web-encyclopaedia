let express = require('express')
let fs = require('fs')
let mime = require('mime')
let path = require('path')

let app = express()

app.use(express.static(__dirname))

app.get('/', function(req, res) {
  let currentPath = path.resolve(__dirname, 'index.html')
  res.setHeader('Content-Type', mime.getType(currentPath) + ';charset=utf8')
  fs.createReadStream(currentPath).pipe(res)
})

app.listen(3000, function () {
  console.log('server start')
})
