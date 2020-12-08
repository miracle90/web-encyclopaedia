// session是基于cookie的
let http = require('http')
let queryString = require('querystring')
let uuid = require('uuid')

let session = {}
const  CARD_ID = 'connect.sid'

http.createServer((req, res) => {
  let cookies = queryString.parse(req.headers.cookie, '; ') || {}
  let cardNumber = cookies[CARD_ID]
  console.log(cardNumber)
  if (cardNumber && session[cardNumber]) {
    session[cardNumber].money -= 10
  } else {
    cardNumber = uuid.v4()
    session[cardNumber] = { money: 100 }
    res.setHeader('Set-Cookie', `${CARD_ID}=${cardNumber}`)
  }
  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
  res.end(`账户余额${session[cardNumber].money}`)
}).listen(3000)

// 登录的时候，服务器一重启就丢失了session，一般放到 redis 中
// cookie + session 做客户端服务端同构
// spa vue + react => token jwt