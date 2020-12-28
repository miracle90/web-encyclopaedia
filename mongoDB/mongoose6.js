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

userSchema.virtual('area').get(function() {
  return this.phone.split('-')[0]
})
userSchema.virtual('number').get(function() {
  return this.phone.split('-')[1]
})

let User = conn.model('User', userSchema)
let user = new User({ username: '张三', phone: '010-62558888' })

let area = user.area
let number = user.number

console.log(area, number)