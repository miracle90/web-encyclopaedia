let nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'QQ',                // 指定邮件服务器
  port: 465,                    // SMTP 端口发邮件的端口号
  secureConnection: true,       // 使用 SSL 加密传输服务
  auth: {                       // 权限认证
    user: '394287122@qq.com',
    pass: 'qnxhqbetdcvkbgcg'    // 授权码
  }
})

function sendMail(to, subject, html) {
  let mailOptions = {
    from: '394287122@qq.com',     // 发件地址
    to,    // 收件地址
    subject,
    html
  }
  
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.error(err)
    console.log('邮件已经发送', info)
  })
}

module.exports = sendMail