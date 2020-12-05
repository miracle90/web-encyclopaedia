## 文件模块 自定义模块

- require('./xxx')
- require(绝对路径)

## 核心模块

- require('fs)

## 第三方模块

- 全局安装 promises-aplus-test -g（在命令行中用）
- 本地安装 require('bluebird)

## 如何定义全局包（包是模块的集合）

- 包必须要有 package.json
- npm init -y
- 在命令行用的
- 运行方式 #! /usr/bin/env node

```
bin: {
  command: './entry.js'
}
```

- 发布包（先去官方源）(nrm => 源管理器、npm => 包管理器、nvm => 版本管理器)
- 安装 nrm => sudo npm i nrm -g
- 列出所有源 nrm ls
- 使用nrm => nrm use npm
- 测试速度 nrm test
- npm link 链接本地包到全局，可以使用 npm unlink
- 命令行登录npm => npm login
- 发布 npm publish，删除npm unpublish --forch
- 如果需要更新包，需要提升版本号

## yarn 包管理器

- yarn 需要npm来安装
- yarn add 。。。
- yarn remove 。。。

```
sudo npm install yarn -g 大约的速度和cnpm差不多
```

> 后面会写一些工具方法，可以发不上去