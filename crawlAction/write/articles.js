const query = require('../db')
const debug1 = require('debug')('crawl:write:articles')
const debug2 = require('debug')('crawl:write:article_tag')

// 保存文章的详情
// 保存文章和标签的关系
let articles = async function(articleList) {
  try {
    // 循环文章数组的每一个元素
    for (const article of articleList) {
      let oldArticles = await query(`SELECT * FROM articles WHERE id=? LIMIT 1`, [article.id])
      console.log(article.title, article.id)
      if (['6913890292869857287', '6901125532729999374', '6913691919386312712', '6913925439723405319'].indexOf(article.id) > -1) {
        continue
      }
      if (Array.isArray(oldArticles) && oldArticles.length > 0) {
        // 如果已经存在，更新
        await query(`UPDATE articles SET title=?, content=?, href=?  WHERE id=?`, [article.title, article.content, article.href, article.id])
      } else {
        // 否则插入一条新数据
        await query(`INSERT INTO articles(id, title, content, href) VALUES(?, ?, ?, ?)`, [article.id, article.title, article.content, article.href])
      }
      debug1(`成功保存文章-${article.title}`)
      
      // 处理文章和标签的关系
      // 一般简单处理，先全部删除，再全部插入
      await query(`DELETE FROM article_tag WHERE article_id=?`, [article.id])
      // ['前端', '后端'] => '前端', '后端' => ('前端', '后端')
      const where = `('${article.tagNames.join("','")}')`
      // 按照标签的名称去查询标签的数组
      const tagSQL = `SELECT id FROM tags WHERE name IN ${where}`
      const tagIds = await query(tagSQL)
      for (const row of tagIds) {
        await query(`INSERT INTO article_tag(article_id, tag_id) VALUES(?, ?)`, [article.id, row.id])
        debug2(`成功保存文章-标签关系：${article.id} -- ${row.id}`)
      }
    }
  } catch (error) {
    console.log('出错啦', error)
  }
}

module.exports = {
  articles
}