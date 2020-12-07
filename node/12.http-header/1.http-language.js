let http = require('http')

let langulages = {
  'zh-CN': '你好',
  'en': 'hello',
  'fr': 'bonjour'
}

let defaultLanguage = 'zh-CN'

let server = http.createServer((req, res) => {
  let language = req.headers['accept-language']
  res.setHeader('Content-Type', 'text/plain;charset=utf8')
  if (defaultLanguage) {
    let lanList = language.split(',').map(item => {
      let [l, q] = item.split(';')
      return {
        lan: l,
        q: q ?  q.split('=')[1]: '1'
      }
    }).sort((a, b) => b.q - a.q)
    console.log(lanList)
    // 根据q排序，遍历所有语言，如果存在，返回
    for (let i = 0; i < lanList.length; i++) {
      let lan = lanList[i].lan
      if (langulages[lan]) {
        res.end(langulages[lan])
        return
      }
    }
    // 如果不存在，返回默认
    res.end(langulages[defaultLanguage])
  } else {
    res.end(langulages[defaultLanguage])
  }
})

server.listen(3000)