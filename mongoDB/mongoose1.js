let mongoose = require('mongoose')

// 启动数据库
// mongod --dbpath=./data

// 协议 + ip + 端口 + 数据库名称
let conn = mongoose.createConnection('mongodb://localhost:27017/db202012', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 光靠schema是不能直接操作数据库的
// 定义一个schema，规定了一个集合中文档的属性名和属性的类型
// 一个schema对应一个表 => 对应一个集合
let userSchema = new mongoose.Schema({
  username: String,
  password: String,
  age: Number,
  createAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

// 定义数据库的操作类型
// 如果调用model方法的时候传入了第二个参数，表示注册一个模块
let User = conn.model('User', userSchema)
// conn.model('User')
// console.log(User === conn.model('User'))

// User.create({
//   username: 'lyy',
//   age: 18
// }, function (err, result) {
//   console.log(err)
//   console.log(result)
// })

// async await异步方法调用
// (async function () {
//   // mongoose的任何方法都会返回一个promise
//   try {
//     let result = await User.create({ username: 'lyy', age: 18 })
//     console.log(result)
//   } catch (error) {
//     console.log(error)    
//   }
// })()

// Entity 实体
// 模型 vs 实体
let lyy = new User({
  username: 'lyy',
  age: 18
})
lyy.age = 30
// 把自己保存到数据库
lyy.save(function (err, result) {
  console.log(err, result)
})












// conn.on('error', function (err) {
//   console.log(err)
// })

// conn.on('open', function () {
//   console.log('连接创建成功')
// })