let debug = require('debug')('crawl:read:tags')
let cheerio = require('cheerio')
let request = require('request-promise')
let fs = require('fs')
let path = require('path')

exports.tags = async function () {
  debug('读取文章标签列表');
  let tags= []
  // 向服务器发送一个post请求
  let options = {
    url: 'https://api.juejin.cn/tag_api/v1/query_tag_list',
    method: 'POST',
    json: true,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      cursor: '0',
      limit: 20,
      sort_type: 1
    }
  }
  let { err_no, data } = await request(options)
  if (err_no === 0) {
    data.forEach(item => {
      const { tag: { icon, tag_name, concern_user_count, post_article_count } } = item
      tags.push({
        image: icon,
        name: tag_name,
        url:`https://juejin.cn/tag/${encodeURIComponent(tag_name.trim())}`,
        subscribe: concern_user_count,
        article: post_article_count
      });
      debug(`读取文章标签:${tag_name}`);
    })
  }
  return tags
}
