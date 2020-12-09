let express = require('express')

let app = express()

// 指定渲染方式
app.engine('.html', require('ejs').__express)

// 设置模板引擎的后缀，可省略.html
app.set('view engine', '.html')

// 文件夹重命名
app.set('views', 'my')

// express内置了模板引擎
app.get('/', function (req, res) {
  res.render('index', {
    name: 'yy'
  })
})

app.listen(3000, function () {
  console.log('server start')
})
