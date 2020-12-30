/**
 * 选择器
 */
let cheerio = require('cheerio')

let html = `
  <ul id="fruits">
    <li class="apple">Apple</li>
    <li class="banana">Banana</li>
    <li class="pear">Pear</li>
  </ul>
`

let $ = cheerio.load(html)

console.log($('.apple', '#fruits').text())