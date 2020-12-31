/**
 * prop
 * prop 用来表示固有的属性 checked selected
 * attr 表示自定义属性 id class
 */
let cheerio = require('cheerio')

let html = `
  <input type="checkbox" checked />
  <div data-apple-color="red" data-apple-price="10">苹果</div>
`

let $ = cheerio.load(html)

console.log($("input[type='checkbox']").prop('checked'))

console.log($('div').data('apple-color'))

console.log($('div').data('appleColor'))

$('div').data('appleColor', 'green')

console.log($('div').data('appleColor'))
