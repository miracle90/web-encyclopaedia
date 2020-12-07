let http  = require('http')

http.createServer((req, res) => {
  res.end('b.js')
}).listen(4000)