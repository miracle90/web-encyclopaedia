// request是一个模块，封装的是 http.request 方法
let request = require('request')
let url = 'http://gjzwfw.www.gov.cn/'
let fs = require('fs')

request(url, function (err, response, body) {
  if (err) return console.log(err)
  fs.writeFileSync('tag.html', body)
  // let regExp = /class="title" data-v-\w+>(.+?)<\/a>/g
  let regExp = /title=".+">(.+?)<\/a><\/p>/g
  // let regExp = /<p><a target="_blank" href="(.+?)"/g
  // let regExp = /<p><a target="_blank" href="\w+" title="(.+?)">/g
  let titles = []
  body.replace(regExp, (matched, title) => {
    titles.push(title)
  })
  console.log(titles)
})