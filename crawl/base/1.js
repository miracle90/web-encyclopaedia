/**
 * 如果网站提供了api接口，直接读取接口内容，得到数据
 */
let axios = require('axios')


// 掘金
// let url = 'https://api.juejin.cn/user_api/v1/user/get?aid=2608&user_id=1556564194370270&not_self=1'
let url = 'https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true'

// (async function () {
//   let res = await axios.get(url)
//   console.log(res)
// })()
// axios.get(url).then(res => {
//   console.log('res ', res)
// })

async function get() {
  let res = await axios.get(url)
  console.log(res.data.data)
}

get()