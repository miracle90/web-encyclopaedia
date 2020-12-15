let mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cms'
})

// 开启事务
connection.beginTransaction(function (err) {
  if (err) throw err
  connection.query('UPDATE account SET balance = balance - 10 WHERE id = 1', function (err) {
    if (err) {
      // 有错误，回滚
      connection.rollback()
      throw err
    } else {
      connection.query('UPDATE account SET balance = balance + 10 WHERE id = 2', function (err) {
        if (err) {
          // 有错误，回滚
          connection.rollback()
          throw err
        } else {
          // 成功提交
          connection.commit()
        }
      })
    }
  })
})





// // this指向有问题，需要用bind绑定到 connection 上
// let query = Promise.promisify(connection.query).bind(connection)

// query('SELECT * FROM account').then(res => {
//   console.log(res)
// })