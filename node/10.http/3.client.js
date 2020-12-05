// node中间层，在node中发送请求（无跨域）
let http = require('http')

// 发送一个get请求，没有请求体
// http.get

let client = http.request({
  host: 'localhost',
  methods: 'POST',
  path: '/aaa',
  port: 3000,
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded'
    // 表单没有跨域问题
  }
}, res => {
  let arr = []
  res.on('data', function (data) {
    arr.push(data)
  })
  res.on('end', function () {
    console.log('client end ', Buffer.concat(arr).toString())
  })
})

// get请求无请求体
// 调用end，请求才会发送
// client.end('name=lyy&age=18')
client.end(JSON.stringify({ name: 'lyy', age: 18 }))