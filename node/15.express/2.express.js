let express = require('./express')

let app = express()

// Router.params
// 常见传递参数的方式 ?a=1&b=2    /:a/:b
app.get('/username/:xid/:xname', function (req, res) {
  res.end(`${req.params.xid},${req.params.xname}`)
})
app.get('/username', function (req, res) {
  res.end('username')
})

app.listen(3000, function () {
  console.log('server start')
})

// 请求参数和配置的路径，去出params
// let server = '/username/:id/:name/a'
// let client = '/username/1/2/a'
// let arr = []
// let regStr = server.replace(/:([^\/]+)/g, function () {
//   arr.push(arguments[1])
//   return '([^\/]+)'
// })
// let reg = new RegExp(regStr)
// let [, ...args] = client.match(reg)
// let params = arr.reduce((memo, current, index) => (memo[current] = args[index], memo), {})
// console.log(params)


// 正则常用方法
// test

// exec

// replace

// match
