(async function () {
  let mongoose = require('mongoose')
  let ObjectId = mongoose.Schema.Types.ObjectId

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

  let User = conn.model('User', userSchema)

  // 外键
  let ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    user: {
      type: ObjectId,
      ref: 'User'
    }
  }, { collection: 'article' })

  let Article = conn.model('Article', ArticleSchema)

  // let user = await User.create({ username: 'lyy' })
  // let article = await Article.create({ title: '标题', content: '内容', user: user._id })
  // console.log(article)
  
  // populate，关联到主键
  let article = await Article.findById('5fe9a0742181cde2fd97e9b7').populate('user')
  console.log(article)



})()
