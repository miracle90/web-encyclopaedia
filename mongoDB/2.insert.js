var start = Date.now()
var db = connect('school')
var arr = []

for (let i = 0; i < 10000; i++) {
  arr.push({
    _id: i,
    age: i,
    name: 'yy' + i
  })
}

db.stu2.insert(arr)
var cost = Date.now() - start
print(cost + 'ms')