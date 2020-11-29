// 每个汉字node只支持utf8编码（一个汉字3个字节），gbk编码（一个汉字2个字节）

const { concat } = require("../common/sum")

// 如果编码不同，会出现乱码问题

// iconv-lite 靠第三方模块转化编码

// 一个字节，是由8个bit组成，8个二进制

// 在node中，一个汉字，3个字节，24个位

// ASCII

// American Standard Code for Information Interchange：美国信息互换标准代码

// 1个字节，8位，127个，第1位0

// GB2312

// GB2312 是对 ASCII 的中文扩展

// GBK

// 后来还是不够用，于是干脆不再要求低字节一定是 127 号之后的内码，只要第一个字节是大于 127 就固定表示这是一个汉字的开始,又增加了近 20000 个新的汉字（包括繁体字）和符号。

// GB18030 / DBCS

// Double Byte Character Set：双字节字符集

// 又加了几千个新的少数民族的字，GBK扩成了GB18030 通称他们叫做 DBCS

// 在 DBCS 系列标准里，最大的特点是两字节长的汉字字符和一字节长的英文字符并存于同一套编码方案里

// 各个国家都像中国这样搞出一套自己的编码标准，结果互相之间谁也不懂谁的编码，谁也不支持别人的编码

// Unicode

// ISO 的国际组织废了所有的地区性编码方案，重新搞一个包括了地球上所有文化、所有字母和符 的编码！ Unicode 当然是一个很大的集合，现在的规模可以容纳100多万个符号。

// International Organization for Standardization：国际标准化组织。

// Universal Multiple-Octet Coded Character Set，简称 UCS，俗称 Unicode

// ISO 就直接规定必须用两个字节，也就是 16 位来统一表示所有的字符，对于 ASCII 里的那些 半角字符，Unicode 保持其原编码不变，只是将其长度由原来的 8 位扩展为16 位，而其他文化和语言的字符则全部重新统一编码。

// 从 Unicode 开始，无论是半角的英文字母，还是全角的汉字，它们都是统一的一个字符！同时，也都是统一的 两个字节

// 字节是一个8位的物理存贮单元，

// 而字符则是一个文化相关的符号。

// UTF-8

// Unicode 在很长一段时间内无法推广，直到互联网的出现，为解决 Unicode 如何在网络上传输的问题，于是面向传输的众多 UTF 标准出现了，

// Universal Character Set（UCS）Transfer Format：UTF编码

// UTF-8 就是在互联网上使用最广的一种 Unicode 的实现方式

// UTF-8就是每次以8个位为单位传输数据

// 而UTF-16就是每次 16 个位

// UTF-8 最大的一个特点，就是它是一种变长的编码方式

// Unicode 一个中文字符占 2 个字节，而 UTF-8 一个中文字符占 3 个字节

// UTF-8 是 Unicode 的实现方式之一

// buffer 缓存，内存（读取文件，二进制，01010101，十六进制，最大 => ff）

// buffer长什么样子

// 声明buffer的方式，3种，固定长度，固定的内容

// 音视频、文本

// 比较安全
let buffer = Buffer.alloc(5)

// let buffer = Buffer.allocUnsafe(5)

console.log(buffer)

// 固定内容 
let buffer1 = Buffer.from('珠峰')
console.log(buffer1.toString()) // 16进制，buffer和字符串可以相互转化

// 通过数组来声明buffer
// 0x 十六进制，0b 二进制，0 八进制
// 控制台是打不出来其他进制
let buffer2 = Buffer.from([0x16])
console.log(buffer2)

// 进制转化 16 => 2，字符串
console.log((0x16).toString(2))

// 任意进制转化成十进制，数字
console.log(parseInt('10110', 2))

// base64，取代所有的url，不会发送请求，速度快，小图标

// base64做一个编码转化，转化的规则大家是都知道的，不能用来加密

// base64来历 => 一个汉字，24个位，3 * 8 => 4 * 6

let buf = Buffer.from('李')
// 默认十六进制，e6 9d 8e
console.log(buf)
// console.log(buf.toString('base64'))
console.log((0xe6).toString(2))
console.log((0x9d).toString(2))
console.log((0x8e).toString(2))

// 一个汉字，3个字节，每个字节8位
// 11100110 10011101 10001110

// 一个汉字，4个字节，每个字节6位
// 111001 101001 110110 001110

console.log(parseInt('111001', 2))
console.log(parseInt('101001', 2))
console.log(parseInt('110110', 2))
console.log(parseInt('001110', 2))

// 57
// 41
// 54
// 14

// 长度64
let str = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
str += 'abcdefghijklmnopqrstuvwxyz'
str += '0123456789+/'

console.log(str[57] + str[41] + str[54] + str[14])

// 5p2O => base64解码 => 李


// 1
// 10
// 11
// 100
// 101
// 110
// 111
// 1000
// 1001
// 1010
// 1011
// 1100
// 1101
// 1110
// 1111
// 10000
// 10001
// 10010
// 10011
// 10100
// 10101
// 10110

// buffer中放的都是内存
let buff = Buffer.from('李亚运')
console.log(buff)
let newBuffer = buff.slice(2)
console.log(newBuffer.toString())
console.log(newBuffer)

// buffer中的方法，slice索引，length（字节长度），indexOf 静态方法

let b = Buffer.from('李亚运')
let r = b.indexOf('亚')
console.log(r)


let bu = Buffer.from('李亚运李亚运李亚运李亚运')
// 分割，split，自己封装一个分割方法
Buffer.prototype.split = function (sep) {
  let pos = 0
  let len = Buffer.from(sep).length
  let arr = []
  let current
  while (-1 !== (current = this.indexOf(sep, pos))) {
    arr.push(this.slice(pos, current))
    pos = current + len
  }
  // 最后一项，无法找到
  arr.push(this.slice(pos))
  return arr
}
let arr = bu.split('亚')
console.log(arr.toString())

// copy + concat
// fs应用 + 树的遍历算法 + 广度/深度（promise + callback）
// http + stream + express