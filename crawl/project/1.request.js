let request = require('request')

// 向服务器发送一个get请求
request('http://www.baidu.com', (err, response, body) => {
  console.log(response.statusCode)
})