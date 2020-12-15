let mysql = require('mysql')

// 连接池
let pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'cms'
})

pool.query('SELECT * FROM account', function (error, results, fields) {
  if (error) throw error;
  console.log('results ', results);
  console.log('fields ', fields);
});