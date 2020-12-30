let request = require('request')

// 向服务器发送一个post请求
let options = {
  url: 'http://localhost:8080/post',
  method: 'POST',
  json: true,
  headers: {
    'Content-Type': 'application/json'
  },
  body: {
    name: 'yy',
    age: 18
  }
}
request(options, (err, response, body) => {
  console.log(err)
  console.log(response.statusCode)
  console.log(body)
})