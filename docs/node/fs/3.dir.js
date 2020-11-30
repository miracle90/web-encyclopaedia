let fs = require('fs')
let path = require('path')

// 同步方法
// function mkdirSync(paths) {
//   let arr = paths.split('/')
//   for (let i = 0; i < arr.length; i++) {
//     let currentPath = arr.slice(0, i + 1).join('/')
//     try {
//       // 如果已经存在，不存在会报错，走 catch
//       fs.accessSync()
//     } catch (error) {
//       fs.mkdirSync(currentPath)
//     }
//   }
// }

// // 创建默认目录，必须父级存在，才能创建子集
// mkdirSync('a/b/c/d')

// 异步方法
function mkdir(paths, cb) {
  let arr = paths.split('/')
  function next(index) {
    if (index >= arr.length) return cb()
    let currentPath = arr.slice(0, index + 1).join('/')
    fs.access(currentPath, err => {
      if (err) {
        fs.mkdir(currentPath, () => {
          next(index + 1)
        })
      } else {
        next(index + 1)
      }
    })
    
  }
  next(0)
}

// 创建默认目录，必须父级存在，才能创建子集
mkdir('a/b/c/d', () => console.log('创建完成'))