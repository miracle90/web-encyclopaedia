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
// function mkdir(paths, cb) {
//   let arr = paths.split('/')
//   function next(index) {
//     if (index >= arr.length) return cb()
//     let currentPath = arr.slice(0, index + 1).join('/')
//     // fs.exists()，参数不符合node规范，被淘汰
//     fs.access(currentPath, err => {
//       if (err) {
//         fs.mkdir(currentPath, () => {
//           next(index + 1)
//         })
//       } else {
//         next(index + 1)
//       }
//     })
    
//   }
//   next(0)
// }

// // 创建默认目录，必须父级存在，才能创建子集
// mkdir('a/b/c/d', () => console.log('创建完成'))

// 删除目录 rmdirSync
// 删除文件 unlinkSync
// fs.stat 判断文件 or 目录？statObj.isDirectory()
// fs.readdirSync()

// 先序 深度 遍历（同步）
// function removeDirSync(dir) {
//   let statObj = fs.statSync(dir)
//   if (statObj.isDirectory()) {
//     console.log(dir)
//     let dirs = fs.readdirSync(dir)
//     for (let i = 0; i < dirs.length; i++) {
//       // 拿到目录后，需要加上父级
//       let current = path.join(dir, dirs[i])
//       removeDirSync(current)
//     }
//     fs.rmdirSync(dir)
//   } else {
//     // 文件，删除
//     fs.unlinkSync(dir)
//   }
// }
// removeDirSync('a')

// 广度遍历（同步）
// function widthSync(dir) {
//   let arr = [dir]
//   let index = 0
//   let current
//   while (current = arr[index++]) {
//     let statObj = fs.statSync(current)
//     if (statObj.isDirectory()) {
//       let dirs = fs.readdirSync(current)
//       dirs = dirs.map(d => path.join(current, d))
//       arr = [...arr, ...dirs]
//     }
//   }
//   for (let i = arr.length - 1; i >= 0; i--) {
//     let item = arr[i]
//     console.log(item)
//     let statObj = fs.statSync(item)
//     if (statObj.isDirectory()) {
//       fs.rmdirSync(item)
//     } else {
//       fs.unlinkSync(item)
//     }
//   }
// }
// widthSync('a')

// 异步的分类，串行连在一起，并行，一起删除
// 1、先序，深度，串行
// function rmdirSeries(dir, cb) {
//   fs.stat(dir, (err, statObj) => {
//     if (err) return console.log(err)
//     if (statObj.isDirectory()) {
//       fs.readdir(dir, (err, dirs) => {
//         if (err) return console.log(err)
//         dirs = dirs.map(d => path.join(dir, d))
//         console.log(dirs)
//         function next(index) {
//           if (index === dirs.length) return fs.rmdir(dir, cb)
//           rmdirSeries(dirs[index], () => next(index + 1))
//         }
//         next(0)
//       })
//     } else {
//       fs.unlink(dir, cb)
//     }
//   })
  
// }
// rmdirSeries('a', () => {
//   console.log('串行删除成功！')
// })

// 异步，先序，并发删除
function rmdirParalle(dir, cb) {
  fs.stat(dir, (err, statObj) => {
    if (err) return console.log(err)
    if (statObj.isDirectory()) {
      fs.readdir(dir, (err, dirs) => {
        if (err) return console.log(err)

        if (dirs.length === 0) return fs.rmdir(dir, cb)

        dirs = dirs.map(d => {
          let current = path.join(dir, d)
          // 每次删完都会调用done方法
          rmdirParalle(current, done)
          return current
        })

        // 并发删除
        let index = 0
        function done() {
          // promise.all
          // 如果子文件夹全部被删除，把文件夹删掉
          if (++index === dirs.length) {
            fs.rmdir(dir, cb)
          }
        }
      })
    } else {
      fs.unlink(dir, cb)
    }
  })
  
}
rmdirParalle('a', () => {
  console.log('并行删除成功！')
})