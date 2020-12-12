## node知识回顾

- callback 高阶函数 （解决异步问题 并发 after）
- 基于回调，回调地狱，错误处理很复杂
- promise的用法 原理（默认同步的promise，then的原理，发布订阅，resolvePromise，递归解析promise）
- Promise.all Promise.finally Promise.resolve race reject
- defer 实现defer的延迟对象
- promise的优缺点（不能完全解决函数件嵌套问题）
- co + generator（saga）yield *
- async await 终极解决方案 可以处理错误和异步问题，可以使用try catch

## es6

- 箭头函数 this的使用 没有this arguments prototyoe，变量提升
- 原型链，各种继承
- 结构，模板字符串，剩余运算符，拓展运算符，深拷贝和浅拷贝
- 递归拷贝 + 解决循环引用 weakmap
- Set，Map（去重 交差补）
- Symbol（原始数据类型）
- instanceof typeof
- Object.defineProperty => proxy（可以解决数组问题 reflect） 递归
- 数组常见方法 reduce filter map（compose redux原理 kao原理）
- class

## eventloop

- 宏任务、微任务，script => 微任务 => 宏任务