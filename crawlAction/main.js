let read = require('./read')
let write = require('./write')

// 所有标签的列表
let tagsUrl = 'https://juejin.cn/subscribe/all'

async function init() {
  let list = await read.tags(tagsUrl)
  console.log(list)
  await write.tags(tags)
}

init()