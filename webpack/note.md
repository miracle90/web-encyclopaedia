## webpack

本质上，webpack 是一个用于现代 JavaScript 应用程序的`静态模块打包工具`。当 webpack 处理应用程序时，它会在内部构建一个 `依赖图(dependency graph)`，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 `bundle`

## 核心概念

### 入口 entry

### 输出 output

### loader

* webpack 只能理解 `JavaScript` 和 `JSON` 文件
* loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中

```js
const path = require('path');
module.exports = {
  mode: 'development',
  devtool:false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
+  module: {
+    rules: [
+      { test: /\.txt$/, use: 'raw-loader' }
+    ]
+  }
};
```
### 插件 plugin

* loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量

### 模式 mode

* 日常的前端开发工作中，一般都会有两套构建环境
* 一套开发时使用，构建结果用于本地开发调试，不进行代码压缩，打印 debug 信息，包含 sourcemap 文件
* 一套构建后的结果是直接应用于线上的，即代码都是压缩后，运行时不打印 debug 信息，静态文件不包括 sourcemap
* `webpack 4.x` 版本引入了 mode 的概念
* 当你指定使用 production mode 时，默认会启用各种性能优化的功能，包括构建结果优化以及 webpack 运行性能优化
* 而如果是 development mode 的话，则会开启 debug 工具，运行时打印详细的错误信息，以及更加快速的增量编译构建


选项 |	描述
--- | ---
development |	会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin
production |	会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin


<table class="table table-bordered table-striped">
  <tr>
    <th>方法说明</th><th>颜色名称</th><th>颜色</th>
  </tr>
  <tr>
    <td><font color="Hotpink">此处实现方法利用 CSDN-markdown 内嵌 html 语言的优势</font></td><td><font color="Hotpink">Hotpink</font></td><td bgcolor="Hotpink">rgb(240, 248, 255)</td>
  </tr>
  <tr>
    <td><font color="Pink">借助 table, tr, td 等表格标签的 bgcolor 属性实现背景色设置</font></td><td><font color="pink">AntiqueWhite</font></td><td bgcolor="Pink">rgb(255, 192, 203)</td>
  </tr>
</table>
