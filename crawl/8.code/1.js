let request = require('request')
let url = 'http://top.baidu.com/category?c=1&fr=topindex'
let iconv = require('iconv-lite')
let cheerio = require('cheerio')

// 告诉request不需要把二进制buffer转成字符串
request({
  url,
  encoding: null
}, function(err, response, body) {
  // 把一个 gbk 的 buffer 转成一个 utf8 字符串
  // html 里头的 meta 标签 charset 表示编码
  body = iconv.decode(body, 'gbk')
  let $ = cheerio.load(body)
  let movies = []
  $('a.list-title').each(function(index, item) {
    movies.push({
      title: $(this).text()
    })
  })

  console.log(movies)
})