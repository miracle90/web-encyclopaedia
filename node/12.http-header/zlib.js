let zlib = require('zlib')
let fs = require('fs')

// 返回一个流 => 转化流
let gzip = zlib.createGzip()

/**
 * 1、创建可读流
 * 2、压缩
 * 3、转化
 * 4、可写流
 */
fs.createReadStream('./gzip.txt').pipe(gzip).pipe(fs.createWriteStream('./gzip.gz'))

