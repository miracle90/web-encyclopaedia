// fs => fileSystem
// 文件操作，目录操作

// fs中的方法都分为同步（可以马上拿到返回值，阻塞主线程）、异步（非阻塞）

// readFile => readFileSync
// writeFile => writeFileSync

let fs = require('fs')
let path = require('path')

// 如果不写 utf8，都写到内存里，淹没可用内存
// 读取默认是 Buffer
// 写入的时候，默认是utf8
// let data = fs.readFileSync(path.resolve(__dirname, 'name.txt'))
// console.log(data)
// fs.writeFileSync(path.resolve(__dirname, 'name.txt'), JSON.stringify({ name: 'lyy' }))

function copy(souce, target) {
  fs.readFile(souce, function (err, data) {
    if (err) return console.log('readFile err', err)
    fs.writeFile(target, data, function (err, data) {
      if (err) return console.log('writeFile err', err)
      console.log('写入成功')
    })
  })
}
// readFile + writeFile 适合读取小文件
// 限制读取的内存数 => fs.read + fs.write => 文件流
copy(path.resolve(__dirname, 'name.txt'), path.resolve(__dirname, 'age.txt'))