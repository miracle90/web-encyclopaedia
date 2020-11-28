// node为了实现模块化 就在文件外面套了一个函数

// 模块化 sea.js cmd require.js amd（前端模块）废弃了

// es6 Module import export

// commonjs

// 模块的规范（加了函数）

// 1，一个文件就是一个模块
// 2，每个文件都可以导出自己 module.exports
// 3，别人想用这个模块可以引入进来 require

// 命名冲突 单例模式（可以把自己的代码放到特定对象里维护） 不能完美解决这个问题，而且还会导致调用时候代码过长

// 自执行函数，可以解决模块化问题
// let r = (function() {
//   var a = 1
//   var b = 2

//   module.exports = 100

//   return module.exports
// })()


// 优点：require，同步方法