let debug = require('debug')('crawl:read:articles')
let cheerio = require('cheerio')
let request = require('request-promise')

exports.articles = async function(url, tagName) {
  debug(`开始读取-${tagName}-标签下面的文章列表`)
  // 向服务器发送一个post请求
  let options = {
    url: 'https://api.juejin.cn/tag_api/v1/query_tag_detail',
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      key_word: tagName
    }
  }
  let { err_no, data: idData } = await request(options)
  if (err_no === 0) {
    let { tag_id } = idData
    debug(`读取到的标签ID：${tag_id}`)
    let res = await getArticleInfo(tag_id)
    console.log('getArticleInfo ', res)
  }
}

async function getArticleInfo(id) {
  let articles = []
  let params = {
    url: 'https://api.juejin.cn/recommend_api/v1/article/recommend_tag_feed',
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      cursor: '0',
      id_type: 2,
      sort_type: 200,
      tag_ids: [id]
    }
  }
  let { err_no, data } = await request(params)
  if (err_no === 0) {
    data.forEach(async item => {
      const { article_info: { article_id, title }, tags } = item
      const content = await getArticleContent(article_id)
      const tagNames = tags.map(item => item.tag_name)
      articles.push({
        id: article_id,
        title,
        href: `https://juejin.cn/post/${article_id}`,
        content,
        tagNames // 标签是一个名字的数组，是一个字符串的数组
      });
      debug(`读取文章标签:${title}`);
    })
  }
  return articles
}

async function getArticleContent(id) {
  let params = {
    url: 'https://api.juejin.cn/content_api/v1/article/detail',
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      article_id: id
    }
  }
  let { err_no, data } = await request(params)
  if (err_no === 0) {
    let { article_info: { mark_content } } = data
    return mark_content
  }
}
