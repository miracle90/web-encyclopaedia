let url = require('url')

let { query, pathname } = url.parse('http://www.zhufengpeixun.com/grow/html/14.http-1.html?a=1&b=2#t32.%20URI%E5%92%8CURL', true)

console.log(query)
console.log(pathname)