// 粉笔
let chalk = require('chalk')

function debug(name) {
  return function () {
    let start = Date.now()
    let args = Array.from(arguments)
    // 当前环境变量中的 DEBUG 值
    let DEBUG = process.env.DEBUG
    if (DEBUG.indexOf('*') === -1) {
      if (DEBUG === name) {
        args = [chalk.red(name), ...args, chalk.yellow(`+${Date.now() - start}ms`)]
        console.log.apply(console, args)
      }
    } else {
      DEBUG = DEBUG.replace('*', '\w*')
      let reg = new RegExp(DEBUG)
      if (reg.test(name)) {
        args = [chalk.red(name), ...args, chalk.yellow(`+${Date.now() - start}ms`)]
        console.log.apply(console, args)
      }
    }
  }
}

module.exports = debug