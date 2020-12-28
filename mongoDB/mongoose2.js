(async function() {
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
  }, {
    // 定义集合名称
    collection: 'user'
  })
  
  // 集合的名字是来自于模型的名字，先转小写，再转复数
  let User = conn.model('User', userSchema)

  // 插入文档 insert
  // let user = await User.create({ username: 'lmc', age: 3, password: '666666' })
  // console.log(user)

  // 更新数据
  // collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.
  // let updateResult = await User.updateOne({ username: 'lmc~' }, { username: 'lmc', age: 3, password: '170814' })
  // console.log(updateResult)

  // 查询
  // let res = await User.find({ username: 'lmc' }, { username: 1 })
  // 高级查询
  // let res = await User.findOne({ username: 'lmc', password: '170814' })
  // let res = await User.findById('5fe98df2798ad8dbc5ef6bd0')
  // 与、或
  let res = await User.find({ age: { $exist: true }, age: { $gt: 1, $lt: 10 }, username: { $in: ['lmc', 'lyy'] } })
  console.log(res)
})()
