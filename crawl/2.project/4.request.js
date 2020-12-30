// 提交文件，multipart/form-data
let request = require('request')
let fs = require('fs')

let url = 'http://localhost:8080/upload'
let formData = {
  name: 'yy',
  avatar: {
    // 可读流，存放着头像的内容
    value: fs.createReadStream('avatar.png'),
    options: {
      filename: 'avatar.png',
      contentType: 'image/png'
    }
  }
}

request.post({ url, formData }, (err, response, body) => {
  console.log(err)
  console.log(body)
})
