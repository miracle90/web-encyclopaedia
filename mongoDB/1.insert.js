var start = Date.now()
var db = connect('school')

for (let i = 0; i < 10000; i++) {
  db.stu.insert({
    _id: i,
    age: i,
    name: 'yy' + i
  })
}

var cost = Date.now() - start
print(cost + 'ms')