(async function(username, password) {
  let mongoose = require('mongoose')

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

  // plugin原理
  let plugin = require('./plugin')
  userSchema.plugin(plugin, {index: true})
  let User = conn.model('User', userSchema)
  User.create({ username: 'lyy' })
})('lyy', 'pwd')
