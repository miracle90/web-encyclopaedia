/**
 * 1、var
 */

function f(shouldInitialize: boolean) {
  if (shouldInitialize) {
      var x = 10;
  }

  return x;
}

f(true);  // returns '10'
f(false); // returns 'undefined'

// 使用立即执行的函数表达式（IIFE）来捕获每次迭代时i的值
for (var i = 0; i < 10; i++) {
  // capture the current state of 'i'
  // by invoking a function with its current value
  (function(i) {
      setTimeout(function() { console.log(i); }, 100 * i);
  })(i);
}

/**
 * 2、let
 * 拥有块级作用域的变量的另一个特点是，它们不能在被声明之前读或写。
 * 虽然这些变量始终“存在”于它们的作用域里，但在直到声明它的代码之前的区域都属于 暂时性死区。
 */


/**
 * 3、const
 */


// 使用最小特权原则，所有变量除了你计划去修改的都应该使用const。 基本原则就是如果一个变量不需要对它写入，那么其它使用这些代码的人也不能够写入它们，并且要思考为什么会需要对这些变量重新赋值。 使用 const也可以让我们更容易的推测数据的流动。

/**
 * 4、解构
 */

// swap variables
let input = [1, 2];
let [first, second] = input;
[first, second] = [second, first];

// 由于是JavaScript, 你可以忽略你不关心的尾随元素：
let [first1] = [1, 2, 3, 4];
console.log(first1); // outputs 1

// 注意，我们需要用括号将它括起来，因为Javascript通常会将以 { 起始的语句解析为一个块。
({ a1, b1 } = { a1: "baz", b1: 101 });

// 令人困惑的是，这里的冒号不是指示类型的。 如果你想指定它的类型， 仍然需要在其后写上完整的模式。
let o = {
  a: "foo",
  b: 12,
  c: "bar"
};
let {a, b}: {a: string, b: number} = o;