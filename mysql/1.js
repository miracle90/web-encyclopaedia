let mysql = require('mysql')
let Promise = require('bluebird')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cms'
})

// 连接
connection.connect()
// connection.query('SELECT * FROM account', function (err, results, fields) {
//   if (err) throw err;
//   console.log(results)
//   // 字段包
//   console.log(fields)
// })

// this指向有问题，需要用bind绑定到 connection 上
let query = Promise.promisify(connection.query).bind(connection)

query('SELECT * FROM account').then(res => {
  console.log(res)
})