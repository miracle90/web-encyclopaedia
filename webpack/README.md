# webpack

本质上，webpack 是一个用于现代 JavaScript 应用程序的`静态模块打包工具`。当 webpack 处理应用程序时，它会在内部构建一个 `依赖图(dependency graph)`，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 `bundle`

## 一、核心概念

### 1. 入口 entry

### 2. 输出 output

### 3. loader

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
### 4. 插件 plugin

* loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量

### 5. 模式 mode

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

### 5.1 环境差异

* 开发环境
  * 需要生成 sourcemap 文件
  * 需要打印 debug 信息
  * 需要 live reload 或者 hot reload 的功能
* 生产环境
  * 可能需要分离 CSS 成单独的文件，以便多个页面共享同一个 CSS 文件
  * 需要压缩 HTML/CSS/JS 代码
  * 需要压缩图片
* 其默认值为 production

## 二、开发环境配置
