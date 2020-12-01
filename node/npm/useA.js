require('./a')

// node8 左右的时候，会先找文件下的 package.json
// 现在会全部找 a.js，文件不存在，才会找 a 文件夹

// 不要文件夹和文件名字相同

// 如果文件夹中有 package.json，会先查找 main 的指向，没有找 index.json

// 第三方模块
// 会去当前目录下查找 node_modules 文件夹
// 如果无法找到，则向上一级查找，找不到报错
console.log(module.paths)
require('xxx')
