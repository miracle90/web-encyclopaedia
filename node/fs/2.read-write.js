// fs.open
// fs.read
// fs.write
// fs.close

let fs = require('fs')
let path = require('path')

// flags 对文件的操作类型 r w + a
// mode权限 读取 4，写入 2，执行 1，chmod -R 777 八进制
// fd file descriptor 文件描述其，number类型

// let buffer = Buffer.alloc(3)
// fs.open(path.resolve(__dirname, 'age.txt'), 'r', 0o666, (err, fd) => {
//   // 0 buffer 的偏移量
//   fs.read(fd, buffer, 0, 3, 8, (err, bytesRead) => {
//     // bytesRead，实际读取到的个数
//     console.log(bytesRead)
//     console.log(buffer.toString())
//   })
// })   // 十进制

// r+ 如果文件不存在会报错
// w+ 以写为准，没有这个文件会创建

// let b = Buffer.from('武德')
// fs.open(path.resolve(__dirname, 'name.txt'), 'w+', (err, fd) => {
//   // fd 写入的文件描述符，
//   // buffer 写入的内容
//   // 3 当前写入的位置
//   // 3 选几个写入
//   fs.write(fd, b, 0, 6, 0, (err, written) => {
//   })
// })

// 拷贝 后面用文件流（来简化操作）
function copy(souce, target) {
  let buffer = Buffer.alloc(3)
  let pos = 0
  fs.open(souce, 'r', (err, rfd) => {
    fs.open(target, 'w', (err, wfd) => {
      function next() {
        fs.read(rfd, buffer, 0, 3, pos, (err, bytesRead) => {
          // 能读取到内容才会继续写入
          if (bytesRead > 0) {
            pos += bytesRead
            fs.write(wfd, buffer, 0, 3, (err, written) => {
              next()
            })
          } else {
            // 读取完毕
            fs.close(rfd, () => {})
            fs.close(wfd, () => {})
          }
        })
      }
      next()
    })
  })
}
// readFile + writeFile 适合读取小文件
// 限制读取的内存数 => fs.read + fs.write => 文件流
copy(path.resolve(__dirname, 'age.txt'), path.resolve(__dirname, 'name.txt'))