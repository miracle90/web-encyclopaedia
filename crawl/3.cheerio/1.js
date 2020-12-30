let cheerio = require('cheerio')

console.log(cheerio)

let html = `<h2 class="title">hello world</h2>`

let $ = cheerio.load(html)

$('h2.title').text('a~~~~~~~~~~~~~~~')
$('h2').addClass('happy')

console.log($.html())