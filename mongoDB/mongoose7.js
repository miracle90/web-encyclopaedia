(async function(username, password) {
  let mongoose = require('mongoose')
  let crypto = require('crypto')

  let conn = mongoose.createConnection('mongodb://localhost:27017/db202012', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    age: Number,
    createAt: {
      type: Date,
      required: true,
      default: Date.now
    }
  }, { collection: 'user' })

  // hooks 钩子
  // 原理 => 定义一个特定函数，一定时间调用
  // 异步需要next
  userSchema.pre('save', function(next) {
    // 加盐算法
    this.password = crypto.createHmac('sha256', 'lyy').update(this.password).digest('hex')
    next()
  })

  let User = conn.model('User', userSchema)

  let user = new User({ username, password })
  let res = await user.save()
  console.log(res)
})('lyy', 'pwd')
