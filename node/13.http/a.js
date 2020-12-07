let http  = require('http')

http.createServer((req, res) => {
  res.end('a.js')
}).listen(3000)