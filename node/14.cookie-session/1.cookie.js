// const { Session } = require("inspector")

// localStorage

// sessionStorage

// cookie 大小在4k左右，不要把数据都存到cookie中，请求时会携带，不能存敏感信息

// session

// 设置cookie，获取cookie
let http = require('http')
let crypto = require('crypto')
let queryString = require('querystring')

let secret = 'lyy'

http.createServer((req, res) => {
  // res.setHeader('Set-Cookie', ['name=yy; domain=a.yy.cn; path= /write; max-age= 10; httpOnly=true', 'age=18'])
  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  let arr = []

  res.setCookie = function (key, value, options = {}) {
    let itemArr = []
    let line = `${key}=${value}`
    
    // 签名算法，加盐
    if (options.signCookie) {
      console.log('setSign ', crypto.createHmac('sha256', secret).update(line).digest('base64').replace(/\+|\//g, ''))
      line = `${line}.${crypto.createHmac('sha256', secret).update(line).digest('base64').replace(/\+|\//g, '')}` 
    }

    console.log(line)
    itemArr.push(line)
    
    if (options.domain) {
      itemArr.push(`domain=${options.domain}`)
    }
    if (options.path) {
      itemArr.push(`path=${options.path}`)
    }
    if (options.httpOnly) {
      itemArr.push(`httpOnly=${options.httpOnly}`)
    }
    if (options.maxAge) {
      itemArr.push(`max-age=${options.maxAge}`)
    }
    arr.push(itemArr.join('; '))
    res.setHeader('Set-Cookie', arr)
  }

  res.getCookie = function (key, options = {}) {
    let cookies = queryString.parse(req.headers['cookie'], '; ') || {}
    let cookie = ''

    if (cookies[key]) {
      let value = cookies[key].split('.')[0]
      let sign = cookies[key].split('.')[1]
      if (sign && options.signCookie) {
        // 校验签名
        let right = crypto.createHmac('sha256', secret).update(`${key}=${value}`).digest('base64').replace(/\+|\//g, '')
        cookie = right === sign ? value : 'cookie被篡改'
      } else {
        cookie = value
      }
    } else {
      cookie = `找不到${key}`
    }
    return cookie
  }

  if (req.url === '/read') {
    res.end(res.getCookie('age', { signCookie: true }))
  }
  if (req.url === '/write') {
    // 使用数组形式，添加多个
    // domain，只在某个域名下使用，默认当前域名
    // path，只在某个路径下使用
    // max-age，设置存活时间，以秒为单位
    // expires，有限期，绝对时间
    // httpOnly，不让前端修改cookie，相对安全一些，可以在浏览器application下，postman 进行修改

    // express，koa，封装好了getCookie，setCookie
    res.setCookie('name', 'lyy', {
      // maxAge: 100,
      signCookie: true
    })
    res.setCookie('age', 18, {
      // maxAge: 100
    })
    res.setCookie('hobby', 'basketball', {
      // maxAge: 100
    })
    return res.end('write cookie')
  }
}).listen(3000)

// cookie的签名
// crypto => express 使用 sha256 koa使用 sha1
