let express = require('./express')

let app = express()

app.get('/', function (req, res) {
  // fs.sendFile('./package.json', { root: __dirname })
  // res.send({ name: 'lyy' })
  // res.send('中文')
  // res.end('xxx')
  res.send(404)
})

app.listen(3000, function () {
  console.log('server start')
})
