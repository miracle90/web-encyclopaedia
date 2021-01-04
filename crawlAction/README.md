## 主要步骤

### 一、爬取数据 + 入库

```js
let read = require('./read')
let write = require('./write')

// 所有标签的列表
let tagsUrl = 'https://juejin.cn/subscribe/all'

async function init() {
  // 查询所有标签
  let tagsList = await read.tags(tagsUrl)
  // 将所有标签写入数据库
  await write.tags(tagsList)
  let allArticles = {}
  for (const tag of tagsList.slice(0, 1)) {
    // 遍历所有标签的url地址，查询标签下的文章
    let articles = await read.articles(tag.url, tag.name)

    console.log(articles)
    
    // 一个文章可能属于多个标签，去重
    articles.forEach(item => allArticles[item.id] = item)
  }
  // 将文章写入数据库
  await write.articles(Object.values(allArticles))
  process.exit()
}

init()
```