let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let session = require('express-session')
let query = require('../db')
let debug = require('debug')('crawl:web:server')

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({}))
app.use(session({
  resave: true,                     // 每次都要重新保存session
  saveUninitialized: true,          // 保存未初始化的session
  secret: 'lyy'                     // 指定秘钥
}))

app.set('view engine', 'html')
app.set('views', path.resolve(__dirname, 'views'))
app.engine('html', require('ejs').__express)

app.get('/', async function(req, res) {
  let tags = await query('SELECT * FROM tags')
  // 默认查询第一个标签的文章
  let tagId = req.query.tagId || tags[0].id
  // 表关联
  // SELECT article.* FROM article_tag INNER JOIN articles ON article_tag.article_id = articles.id WHERE article_tag.tag_id = 1
  let articles = await query('SELECT articles.* FROM article_tag INNER JOIN articles ON article_tag.article_id = articles.id WHERE article_tag.tag_id = ?', [tagId])
  // console.log(articles)
  res.render('index', {
    tags,
    articles
  })
})

app.get('/detail/:id', async function(req, res) {
  const id = req.params.id
  const articles = await query('SELECT * FROM articles WHERE id = ? LIMIT 1', [id])
  const { title, content } = articles[0]
  res.render('detail', {
    title,
    content
  })
})

app.get('/login', function(req, res) {
  res.render('login', {
    title: '登录'
  })
})

app.post('/login', async function(req, res) {
  let { email } = req.body
  let oldUsers = await query(`SELECT * FROM users WHERE email = ? LIMIT 1`, [email])
  let user
  if (Array.isArray(oldUsers) && oldUsers.length) {
    // 老用户，session中间件
    user = oldUsers[0]
    // 如果登录成功，则把当前用户信息放在会话中，并且重定向到首页
    // res.redirect('/')
  } else {
    let result = await query(`INSERT INTO users(email) VALUES(?)`, [email])
    user = {
      id: result.insertId,              // 新生成的id
      email
    }
  }
  // 把当前用户信息放在会话中，并且重定向到首页
  req.session.user = user
  res.redirect('/')
})

// let CronJob = require('cron').CronJob
// let { spawn } = require('child_process')
// let job = new CronJob('*/30 * * * * *', function() {
//   debug(`开始执行更新的计划任务`)
//   // 开启子进程执行脚本
//   let child = spawn(process.execPath, [path.resolve(__dirname, '../main')])
//   // 把子进程里的正常输出重定向到父进程里
//   child.stdout.pipe(process.stdout)
//   // 把子进程里的错误输出重定向到父进程里
//   child.stderr.pipe(process.stderr)
//   child.on('close', function() {
//     console.log('更新任务完毕')
//   })
// })
// job.start()

app.listen(3000)