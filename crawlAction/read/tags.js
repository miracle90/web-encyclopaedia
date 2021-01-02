let debug = require('debug')('crawl:read:tags')
let cheerio = require('cheerio')
let request = require('request-promise')

exports.tags = async function(url) {
  console.log('~~~~~~~~~~~~~~~~~~')
  debug('开始读取所有的标签列表')
  let options = {
    url,
    // 这是一个转换函数，在request得到响应体之后，会调用这个函数进行转换
    transform: function(body) {
      return cheerio.load(body)   // $
    }
  }
  let $ = await request(options)

  let a = $('.tag-list li').first().find('.thumb').first()
  console.log(a)
  return

  let tags = []
  $('.tag-list .item').each(function(index, item) {
    let $this = $(item)
    
    let aaa = $this.find('img.thumb').first()
    console.log(aaa)

    return '_______________'
    // let image = $this.find('.thumb')   // 找到了图片所有的div

    // console.log(image)

    // let imageUrl = image.data('src')
    // let indexOfSep = imageUrl.indexOf('?')
    // if (indexOfSep !== -1) {
    //   imageUrl = imageUrl.slice(0, indexOfSep)
    // }
    let title = $this.find('.title').first()
    let name = title.text().trim()
    console.log('!!!!!! ', name)
    let subscribe = $this.find('.subscribe').first()    // 关注
    let article = $this.find('.article').first()        // 文章
    tags.push({
      // image: imageUrl,      // 标签的图片地址
      name,                 // 标签名
      url: `https://juejin.cn/tag/${encodeURIComponent(name)}`,
      subscribe: Number(subscribe.text().match(/(\d+)/)[1]),   // 订阅数
      article: Number(article.text().match(/(\d+)/)[1])        // 文章数
    })
    debug(`读取到一个新的标签：${name}`)
  })
  console.log(tags)
  return tags
}

// exports.tags('https://juejin.cn/subscribe/all')