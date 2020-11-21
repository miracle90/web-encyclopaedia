// generator 生成器
// iterator 迭代器 next方法，每次调用之后返回 value，done

// 类数组，有长度，有索引，是个对象，能被迭代

// 给一个对象添加迭代器功能，可以使他被迭代
let obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
  [Symbol.iterator]: function * () {
    let index = 0
    // let self = this
    // return {
    //   next() {
    //     return { value: self[index], done: index++ === self.length }
    //   }
    // }
    while(index !== this.length) {
      // 每次浏览器都会不停的调用next方法，把yield结果作为值
      yield this[index++]
    }
  }
}


function arg() {
  let arr = [...obj]
  console.log(arr)
}

arg() 