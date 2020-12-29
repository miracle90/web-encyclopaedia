let puppeteer = require('puppeteer')
// console.log(puppeteer)

async function init() {
  // 启动一个浏览器
  const browser = await puppeteer.launch()
  // 打开一个空白页
  const page = await browser.newPage()
  // 在地址栏中输入百度的地址
  await page.goto('http://www.baidu.com')
  // 截图，到目标路径
  await page.screenshot({ path: 'baidu.png' })
  // 关闭浏览器
  await browser.close()
}

init()