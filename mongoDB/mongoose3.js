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


let User = conn.model('User', userSchema)
let users = []

for (let i = 0; i < 10; i++) {
  users.push({
    username: 'yy' + i,
    age: i,
    password: '' + i
  })
}

// User.create(users, function(err, docs) {
//   if (err) return console.log(err)
//   console.log(docs)
// })

let pageNum = 2
let pageSize = 3

// 分页
// User.find({}, null, { skip: 3, limit: 3, sort: { age: 1 } })
User.find().sort({ age: -1 }).skip(3).limit(3).exec(function(err, docs) {
  console.log(docs)  
})