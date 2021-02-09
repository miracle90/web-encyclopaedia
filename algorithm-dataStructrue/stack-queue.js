const obj = {
  '(': ')',
  '{': '}',
  '[': ']'
}
const isValid = function (s) {
  const len = s.length
  const stack = []
  for (let i = 0; i < len; i++) {
    const item = s[i]
    if (item === '{' || item === '(' || item === '[') {
      stack.push(obj[item])
    } else {
      if (!stack.length || stack.pop() !== item) {
        return false
      }
    }
  }
  return !stack.length
}
console.log(isValid(''))
console.log(isValid('()'))
console.log(isValid('()[]{}'))
console.log(isValid('(]'))
console.log(isValid('([)]'))
console.log(isValid('{[]}'))

/**
 * @param {number[]} T 入参是温度数组
 * @return {number[]}
 */
const dailyTemperatures = function (T) {
  const len = T.length
  const res = new Array(len).fill(0)
  const stack = []
  for (let i = 0; i < len; i++) {
    while (stack.length && T[i] > T[stack[stack.length - 1]]) {
      const target = stack.pop()
      res[target] = i - target
    }
    stack.push(i)
  }
  return res
};
console.log(dailyTemperatures([73, 74, 74, 75, 71, 69, 72, 76, 73]))

/**
 * 编码实现1
 */
const MinStack = function () {
  this.stack = []
};
MinStack.prototype.push = function (x) {
  this.stack.push(x)
}
MinStack.prototype.pop = function () {
  this.stack.pop()
}
MinStack.prototype.top = function () {
  if (!this.stack || !this.stack.length) return
  return this.stack[this.stack.length - 1]
}
MinStack.prototype.getMin = function () {
  let min = Infinity
  let len = this.stack.length
  for (let i = 0; i < len; i++) {
    if (this.stack[i] < min) {
      min = this.stack[i]
    }
  }
  return min
}
/**
 * 编码实现2
 */
const MinStack2 = function () {
  this.stack = []
  // 定义辅助栈
  this.stack2 = [];
};
MinStack2.prototype.push = function (x) {
  this.stack.push(x)
  // 若入栈的值小于当前最小值，则推入辅助栈栈顶
  if (this.stack2.length == 0 || this.stack2[this.stack2.length - 1] >= x) {
    this.stack2.push(x);
  }
}
MinStack2.prototype.pop = function () {
  // 若出栈的值和当前最小值相等，那么辅助栈也要对栈顶元素进行出栈，确保最小值的有效性
  if (this.stack.pop() == this.stack2[this.stack2.length - 1]) {
    this.stack2.pop();
  }
}
MinStack2.prototype.top = function () {
  return this.stack[this.stack.length - 1];
}
MinStack2.prototype.getMin = function () {
  // 辅助栈的栈顶，存的就是目标中的最小值
  return this.stack2[this.stack2.length - 1];
}

/**
 * 如何用栈实现一个队列？
 * 初始化构造函数
 */
const MyQueue = function () {
  // 初始化两个栈
  this.stack1 = [];
  this.stack2 = [];
};
MyQueue.prototype.push = function (x) {
  // 直接调度数组的 push 方法
  this.stack1.push(x);
};
MyQueue.prototype.pop = function () {
  // 假如 stack2 为空，需要将 stack1 的元素转移进来
  if (this.stack2.length <= 0) {
    // 当 stack1 不为空时，出栈
    while (this.stack1.length !== 0) {
      // 将 stack1 出栈的元素推入 stack2
      this.stack2.push(this.stack1.pop());
    }
  }
  // 为了达到逆序的目的，我们只从 stack2 里出栈元素
  return this.stack2.pop();
};
MyQueue.prototype.peek = function () {
  if (this.stack2.length <= 0) {
    // 当 stack1 不为空时，出栈
    while (this.stack1.length != 0) {
      // 将 stack1 出栈的元素推入 stack2
      this.stack2.push(this.stack1.pop());
    }
  }
  // 缓存 stack2 的长度
  const stack2Len = this.stack2.length;
  return stack2Len && this.stack2[stack2Len - 1];
};
MyQueue.prototype.empty = function () {
  // 若 stack1 和 stack2 均为空，那么队列空
  return !this.stack1.length && !this.stack2.length;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow = function (nums, k) {
  const len = nums.length
  const res = []
  let left = 0
  let right = k - 1
  while (right < len) {
    const max = calMax(nums, left++, right++)
    res.push(max)
  }
  return res
};

// 这个函数用来计算最大值
function calMax(arr, left, right) {
  let max = arr[left]
  for (let i = left; i <= right; i++) {
    if (arr[i] > max) {
      max = arr[i]
    }
  }
  return max
}
console.log('maxSlidingWindow => ', maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))

/**
 * 双端队列法
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindowDouble = function (nums, k) {
  const len = nums.length
  const res = []
  // 构建一个递减的队列
  const queue = []
  for (let i = 0; i < len; i++) {
    console.log(queue)
    // 当队尾元素小于当前元素时，将队尾元素（索引）不断出队
    while (queue.length && nums[queue[queue.length - 1]] < nums[i]) {
      queue.pop()
    }

    // 入队当前元素索引
    queue.push(i)

    // 当队头元素的索引已经被排除在滑动窗口之外时，将队头元素索引出队
    while (queue.length && queue[0] <= i - k) {
      queue.shift()
    }

    // 判断滑动窗口的状态，只有在被遍历的元素个数大于 k 的时候，才更新结果数组
    if (i >= k - 1) {
      res.push(nums[queue[0]])
    }
  }
  return res
};
console.log('maxSlidingWindowDouble => ', maxSlidingWindowDouble([1, 3, -1, -3, -5, 3, 6, 7], 3))
