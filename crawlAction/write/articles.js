const query = require('../db')
const debug = require('debug')('crawl:write:articles')

// 保存文章的详情
// 保存文章和标签的关系
let articles = async function(articleList) {
  debug('写入文章列表')
  // 循环文章数组的每一个元素
  for (const article of articleList) {
    let oldArticles = await query(`SELECT * FROM articles WHERE id=? LIMIT 1`, [article.id])
    if (Array.isArray(oldArticles) && oldArticles.length > 0) {
      // 如果已经存在，更新
      let oldArticle = oldArticles[0]
      await query(`UPDATE articles SET title=?, content=?, href=?  WHERE id=?`, [article.title, article.content, article.href, article.id])
    } else {
      // 否则插入一条新数据
      await query(`INSERT INTO articles(id, title, content, href) VALUES(?, ?, ?, ?)`, [article.id, article.title, article.content, article.href])
    }
    debug(`成功保存文章-${article.title}`)
    
    // 处理文章和标签的关系
    // 一般简单处理，先全部删除，再全部插入
    await query(`DELETE FROM article_tag WHERE article_id=?`, [article.id])
    // ['前端', '后端'] => '前端', '后端' => ('前端', '后端')
    let where = "'" + article.tagNames.join("','") + "'"
    // 按照标签的名称去查询标签的数组
    const tagSQL = `SELECT id FROM tags WHERE name IN ${where}`
    let tagIds = await query(tagSQL)
    for (const row of tagIds) {
      await query(`INSERT INTO article_tag(article_id, tag_id) VALUES(?, ?)`, [article.id, row.id])
    }
  }
}

module.exports = {
  articles
}