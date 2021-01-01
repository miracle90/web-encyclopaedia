const CronJob = require('cron').CronJob

/**
 * 第一个参数，执行的时机
 * * 秒
 * * 分
 * * 时
 * * 日
 * * 月
 * * 星期
 * * 代表任意值
 * 枚举值，逗号分隔
 * 区间值，-
 * 每隔多长时间执行一次，/，表示间隔的频率
 * 第二个参数，函数的定义
 */
const job = new CronJob('*/5 * * * * *', function () {
  console.log(new Date().toLocaleString())
})
// const job = new CronJob('1,5,10 * * * * *', function () {
//   console.log(new Date().toLocaleString())
// })

job.start()

