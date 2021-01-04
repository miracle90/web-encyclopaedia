const query = require('../db')
const debug = require('debug')('crawl:write:tags')

let tags = async function(tags) {
  debug('开始保存标签列表')
  for (const tag of tags) {
    let oldTags = await query(`SELECT * FROM tags WHERE name=? LIMIT 1`, [tag.name])
    if (Array.isArray(oldTags) && oldTags.length > 0) {
      // 如果已经存在，更新
      // 占位符
      await query(`UPDATE tags SET name=?, image=?, url=?, subscribe=?, article=? WHERE id=?`, [tag.name, tag.image, tag.url, tag.subscribe, tag.article, oldTags[0].id])
    } else {
      // 否则插入一条新数据
      await query(`INSERT INTO tags(name, image, url, subscribe, article) VALUES(?, ?, ?, ?, ?)`, [tag.name, tag.image, tag.url, tag.subscribe, tag.article])
    }
    debug(`成功保存标签-${tag.name}`)
  }
}

module.exports = {
  tags
}