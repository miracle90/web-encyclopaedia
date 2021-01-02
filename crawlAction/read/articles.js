let debug = require('debug')('crawl:read:tags')
let cheerio = require('cheerio')
let request = require('request-promise')

exports.articles = async function(url, tagName) {
  debug(`开始读取${tagName}标签下面的文章列表`)
  let options = {
    url,
    // 这是一个转换函数，在request得到响应体之后，会调用这个函数进行转换
    transform: function(body) {
      return cheerio.load(body)   // $
    }
  }
  let $ = await request(options)
  let articles = []
  let items = $('.item .title')

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const $this = $(item)
    let href = $this.attr('href').trim()      // 取出超链接
    if (!href.startsWith('/entry')) {
      let title = $this.text().trim()
      let id = href.match(/\/(\w+)$/)[1]
      href = 'https://juejin.cn' + href
      let { content, tagNames } = await article(id, href)
      articles.push({
        id,
        title,
        href,
        content,
        tagNames
      })
      debug(`读取到的文章：${title}`)
    }
  }


  // $('.item').each(function(index, item) {
  //   let $this = $(this)
  //   let image = $this.find(div.thumb).first()   // 找到了图片所有的div
  //   let imageUrl = image.data('src')
  //   let indexOfSep = imageUrl.indexOf('?')
  //   if (indexOfSep !== -1) {
  //     imageUrl = imageUrl.slice(0, indexOfSep)
  //   }
  //   let title = $this.find('.title').first()
  //   let name = title.text().trim()
  //   let subscribe = $this.find('.subscribe').first()    // 关注
  //   let article = $this.find('.article').first()        // 文章
  //   tags.push({
  //     image: imageUrl,      // 标签的图片地址
  //     name,                 // 标签名
  //     url: `https://juejin.cn/tag/${encodeURIComponent(name)}`,
  //     subscribe: Number(subscribe.text().match(/(\d+)/)[1]),   // 订阅数
  //     article: Number(article.text().match(/(\d+)/)[1])        // 文章数
  //   })
  //   debug(`读取到一个新的标签：${name}`)
  // })
  console.log(articles)
  return articles
}

// exports.tags('https://juejin.cn/subscribe/all')