const puppeteer = require('puppeteer');
const fs = require('fs');
(async function () {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://juejin.im/tag/%E5%89%8D%E7%AB%AF', {
    waitUntil: 'networkidle2'
  });
  // await page.waitFor(500);
  let comments = await page.$$eval('a.title', els => {
    return els.map(item => item.innerText);
  });
  fs.writeFileSync('comments.txt', comments.join('\r\n'), 'utf8');
  await browser.close();
})();