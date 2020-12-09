// let str = `<!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="utf-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <title></title>
//     <meta name="description" content="">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <link rel="stylesheet" href="">
//   </head>
//   <body>`

// list.forEach(item => {
//   str += `<p><%=item%></p>`
// })

// str += `</body>
// </html>`
let list = [1, 2,3]

let str = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="">
  </head>
  <body>
    `
list.forEach(item => {
str += `
      <p>666</p>
    `
})
str += `
  </body>
</html>`

console.log(str)

// 让字符串执行
// 1、eval
// 2、new Function