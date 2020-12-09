let ejs = require('ejs')
let fs = require('fs')
let path = require('path')

let template = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')


// 模板引擎，两个关键步骤
// 1，new Function
// 2，with，模板引擎一般使用with
function render(templateStr, data) {
  // 以data作为上下文，来取对象中的数据
  let head = 'with(data){\r\nlet str = `'
  // 替换变量 <%=value%>
  let content = templateStr.replace(/<%=([\s\S]*?)%>/g, function () {
    return '${' + arguments[1] + '}'
  })
  // 替换 <%value%>
  content = content.replace(/<%([\s\S]*?)%>/g, function () {
    return '`\r\n' + arguments[1] + '\r\nstr += `'
  })
  let tail = '`\r\n return str \r\n}'
  let fn = new Function('data', head + content + tail)
  return fn(data)
}

// 字符串替换，用对象中的数据渲染到模板上
// function render(templateStr, data) {
//   // console.log(templateStr, data)
//   return templateStr.replace(/<%=([\s\S]*?)%>/g, function () {
//     // console.log(data)
//     // console.log(arguments)
//     return data[arguments[1]]
//   })
// }

let str = render(template, { name: 'lyy', age: 18, list: [1, 2, 3] })
console.log(str)