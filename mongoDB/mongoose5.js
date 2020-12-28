let mongoose = require('mongoose')

let conn = mongoose.createConnection('mongodb://localhost:27017/db202012', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let userSchema = new mongoose.Schema({
  username: String,
  password: String,
  age: Number,
  createAt: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { collection: 'user' })

// 在类上还是实例上扩展，关键要看这个操作是针对的集合还是单个实例

// 扩展类上的静态方法
// userSchema.statics.login = function (username, password) {
//   return this.findOne({username, password})
// }

// 扩展实例的方法
userSchema.methods.login = function () {
  return this.model('User').findOne({username: this.username, password: this.password})
}

let User = conn.model('User', userSchema)

// 静态方法
// (async function login(username, password) {
//   let res = await User.login(username, password)
//   console.log(res)
// })('1', '1')

// 实例方法
(async function login(username, password) {
  console.log('~~~~~ ', User)
  let user = new User({ username, password })
  let res = await user.login()
  console.log(res)
})('1', '1')
