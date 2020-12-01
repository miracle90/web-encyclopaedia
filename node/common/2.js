let fs = require('fs')
let path = require('path')

fs.accessSync(path.resolve(__dirname, 'common1.md'))

// let path = require('path')
// let fs = require('fs')
// let vm = require('vm')
// const sum = require('./sum')

// function Module(id) {
//   this.id = id
//   this.exports = {}
// }

// Module.wrapper = [
//   '(function(exports, module, require, __dirname, __filename) {',
//   '})'
// ]

// Module._extensions = {
//   '.js'(module) {
//     // js文件需要造一个闭包
//     let str = fs.readFileSync(module.id, 'utf8')
//     let scriptStr = Module.wrapper[0] + str + Module.wrapper[1]
//     let fn = vm.runInThisContext(scriptStr)
//     // 把函数执行，将exorts属性传递给 sum.js
//     // exports 是 module.exports 别名
//     fn.call(module.exports, module.exports, module, req)

//   },
//   '.json'(module){
//     let str = fs.readFileSync(module.id, 'utf8')
//     str = JSON.parse(str)
//     module.exports = str
//   }
// }

// Module.prototype.load = function () {
//   // this调用 => id，exports
//   let extname = path.extname(this.id)
//   Module._extensions[extname](this)
// }

// function req(id) {
//   // 解析出一个绝对路径
//   let absPath = path.resolve(__dirname, id)
//   let module = new Module(absPath)
//   module.load()
//   return module.exports
// }

// // 会尝试加载 .js 文件，找不到再去找 .json
// let r = req('./sum.js')
// console.log(r)




// // let r = require('./sum')

// // console.log(r(1, 2))

// // path模块，专门用来处理文件路径的
// // exname 扩展名
// // basename 文件名，需要扩展名
// // join 解决 mac 和 window 一个 / 一个 \
// // resolve 解析绝对路径
// // dirname 取入参父级目录

// // let path = require('path')
// // console.log(path.basename('1.js', '.js'))
// // console.log(path.extname('1.js'))
// // console.log(path.join('a', 'b'))
// // // 文件夹名
// // console.log(__dirname)
// // // 文件名
// // console.log(__filename)
// // // 入参的父级目录
// // console.log(path.dirname(__dirname))

// // // 拼接
// // console.log(path.join(__dirname, 'sum.js'))
// // // resoluve 方法可以把一个文件路径转化成绝对路径  
// // console.log(path.resolve('sum.js'))

// // console.log(process.cwd())

// // let fs = require('fs')

// // let r = fs.readFileSync(path.resolve(__dirname, 'sum.js'), 'utf8')
// // console.log(r)

// // 如何让一个字符串执行
// // eval 执行环境是不干净的，会查找当前执行的上下文环境
// // 前端模块化使用的是 eval，但是node的模块化，不适用这种方式
// // let name = 'lyy'
// // eval('console.log(name)')

// // 请实现一个自己的模板引擎 ejs handleBar （new Function）
// // 不能实现node模块
// // let a = 'var a = 1; return x + y + z'
// // // 最后一个参数是字符串，前面的参数是函数的形参
// // let fn = new Function('x', 'y', 'z', a)
// // console.log(fn(1, 2, 3))

// // 沙箱 sandBox，测试环境，和外界完全隔离
// // let vm = require('vm')
// // let name = 'lyy'
// // vm.runInThisContext('console.log(name)')