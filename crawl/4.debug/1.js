let debug = require('./debug')

// macos 设置debug => export DEBUG=app
// 通配符 => export DEBUG=app:*
let logger1 = debug('app:1')
let logger2 = debug('app:2')

console.log('console.log')

// 先判断当前的运行环境，查看环境变量中的debug的值
// 是否跟自己匹配，如果匹配输出日志
// logger1('打印日志1')
logger2('打印日志2')


// let debug = require('./debug')
// let logger = debug('app')
// logger('打印日志')