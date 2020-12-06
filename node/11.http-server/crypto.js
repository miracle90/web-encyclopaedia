// 加密，摘要算法

let crypto = require('crypto')

// md5不能解密，摘要算法

// 不同的内容，摘要出的结果不同

// 相同的内容，摘要的结果相同

// 摘得要结果长度都是定长

// let r = crypto.createHash('md5').update('123456').digest('base64')
// console.log(r)

// md5解密

let r = crypto.createHmac('sha1', 'secrett').update('123456').digest('base64')
let r1 = crypto.createHmac('sha1', 'secrett').update('123').update('456').digest('base64')
console.log(r === r1)