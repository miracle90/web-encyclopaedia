let redis = require('redis')

// 默认端口号是6379
let connection = redis.createClient({ port: 6379 })

// 字符串
// redis.print 打印最终的结果
// connection.set('name', 'lmc', redis.print)
// connection.get('name', redis.print)

// // 对象
// connection.hset('student', 'name', 'lyy', redis.print)
// connection.hset('student', 'age', 18, redis.print)
// connection.hgetall('student', redis.print)

// redis支持批量操作，如果内部有失败，不影响其他结果
// multi => exec
// connection.multi().set('x', 1).set('y', 2).exec(redis.print)
// connection.get('x', redis.print)
// connection.get('y', redis.print)

// 发布订阅
// 第一个，先 on message，再 subscribe
connection.on('subscribe', function (channel, data) {
  connection.del(data, redis.print)
})
connection.on('message', function (channel, data) {
  connection.del(data, redis.print)
})
connection.subscribe('a')

// 第二个
let connection1 = redis.createClient({ port: 6379 })
connection1.publish('a', 'name')

// 查看权限
// config get requirepass
// 设置权限
// config set quirepass lyy
// 使用的时候
// auth lyy
// 取消权限
// config set quirepass ""
