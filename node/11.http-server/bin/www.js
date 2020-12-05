#! /usr/bin/env node

// console.log('yyyyyyyyyyyyyy')

// 默认启动一个 http-server port ip地址

// 定义一个port属性

let config = {
  port: 3000,
  host: '127.0.0.1',
  dir: process.cwd()    // 在哪里启动，路径就是哪
}

// 拿到参数
// process.argv

// yargs 第三方包
// commander

let commander = require('commander')
let json = require('../package.json')

// 命令行直接显示，不用console.log
commander.version(json.version)
  // 添加--help说明
  .option('-p, --port <n>', 'set port')
  .option('-o, --host <n>', 'set host')
  .option('-d, --dir <n>', 'set directory')
  .on('--help', function () {
    console.log('  Example')
    console.log('  yy --port --host')
  })
  .parse(process.argv)

// console.log(commander.port)
// console.log(commander.host)
// console.log(commander.dir)

config = { ...config, ...commander }

// 解析用户传入的参数，根据参数启动一个http-server

let Server = require('../server.js')
let server = new Server(config)
server.start()
