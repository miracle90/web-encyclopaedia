# 栈与队列

栈与队列相关的问题就比较微妙了，很多时候相关题目中压根不会出现“栈”、“队列”这样的关键字，但只要你深入到真题里去、对栈和队列的应用场景建立起正确的感知，那么很多线索都会在分析的过程中被你轻松地挖掘出来。

## 一、典型真题快速上手-“有效括号”问题

> 题目描述：给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

* 左括号必须用相同类型的右括号闭合。
* 左括号必须以正确的顺序闭合。
* 注意空字符串可被认为是有效字符串。

#### 示例

```
输入: "()"
输出: true

输入: "()[]{}"
输出: true

输入: "(]"
输出: false

输入: "([)]"
输出: false

输入: "{[]}"
输出: true
```

#### 思路分析

括号问题在面试中出现频率非常高， 这类题目我们一般首选用栈来做。

为什么可以用栈做？大家想想，括号成立意味着什么？意味着对称性。

巧了，根据栈的后进先出原则，一组数据的入栈和出栈顺序刚好是对称的。比如说1、2、3、4、5、6按顺序入栈，其对应的出栈序列就是 6、5、4、3、2、1：

**因此这里大家可以记下一个规律：题目中若涉及括号问题，则很有可能和栈相关。**

回到题目中来，我们的思路就是在遍历字符串的过程中，往栈里 push 括号对应的配对字符。比如如果遍历到了 (，就往栈里 push )。

假如字符串中所有的括号都成立，那么前期我们 push 进去的一定全都是左括号、后期 push 进去的一定全都是右括号。而且左括号的入栈顺序，和其对应的右括号的入栈顺序应该是相反的，比如这个例子：

```
({[]})
```

最后一个入栈的左方括号[，与之匹配的右方括号]正是接下来第一个入栈的右括号。

因此，我们可以果断地认为在左括号全部入栈结束时，栈顶的那个左括号，就是第一个需要被配对的左括号。此时我们需要判断的是接下来入栈的第一个右括号是否和此时栈顶的左括号配对。如果配对成功，那么这一对括号就是有效的，否则直接 return false。

#### 编码实现

```js
const obj = {
  '(': ')',
  '{': '}',
  '[': ']'
}

const isValid = function(s) {
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
```

## 二、栈问题进阶-每日温度问题

> 题目描述: 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。

提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。

#### 示例

```
给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
```

#### 思路分析

栈结构可以帮我们避免重复操作。
避免重复操作的秘诀就是及时地将不必要的数据出栈，避免它对我们后续的遍历产生干扰。

拿这道题来说，我们的思路就是：尝试去维持一个递减栈。
当遍历过的温度，维持的是一个单调递减的态势时，我们就对这些温度的索引下标执行入栈操作；只要出现了一个数字，它打破了这种单调递减的趋势，也就是说它比前一个温度值高，这时我们就对前后两个温度的索引下标求差，得出前一个温度距离第一次升温的目标差值。

在这个过程中，我们仅对每一个温度执行最多一次入栈操作、一次出栈操作，整个数组只会被遍历一次，因此时间复杂度就是O(n)。相对于两次遍历带来的 O(n^2)的开销来看，栈结构真是帮了咱们大忙了。

#### 编码实现

```js
/**
 * @param {number[]} T
 * @return {number[]}
 */
// 入参是温度数组
const dailyTemperatures = function (T) {
  const len = T.length
  const stack = []
  const res = new Array(len).fill(0)
  for (let i = 0; i < len; i++) {
    while (stack.length && T[i] > T[stack[stack.length - 1]]) {
      const top = stack.pop()
      res[top] = i - top
    }
    stack.push(i)
  }
  return res
};

console.log(dailyTemperatures([73, 74, 74, 75, 71, 69, 72, 76, 73]))
```

## 三、栈的设计——“最小栈”问题

> 题目描述：设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

* push(x) —— 将元素 x 推入栈中。
* pop() —— 删除栈顶的元素。
* top() —— 获取栈顶元素。
* getMin() —— 检索栈中的最小元素。

#### 示例

```
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); --> 返回 -3.
minStack.pop();
minStack.top(); --> 返回 0.
minStack.getMin(); --> 返回 -2.
```

#### 思路分析

这道题并不难，但是综合性很强，整个题做下来能够相对全面地考察到候选人对栈结构、栈操作的理解和掌握，是不少一面/少数二面面试官的心头好。

其中前三个操作：push、pop 和 top，我们在数据结构快速上手环节已经给大家讲过了，这里不多赘述。需要展开讲的是 getMin 这个接口，这个接口有时候会直接单独拎出来作为一道题来考察，需要大家对它的实现思路有一个真正扎实的掌握。

getMin 要做的事情，是从一个栈里找出其中最小的数字。我们仍然是抛砖引玉，先说一个大部分人都能想到的思路：

初始化一个最小值变量，它的初始值可以设一个非常大的数（比如 Infinity），然后开始遍历整个栈。在遍历的过程中，如果遇到了更小的值，就把最小值变量更新为这个更小的值。这样遍历结束后，我们就能拿到栈中的最小值了。
这个过程中，我们对栈进行了一次遍历，时间复杂度无疑是 O(n)。

按照这个思路，整个栈的设计我们可以这样写：

#### 编码实现

```js
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
 * O(n) 为 O(1)。
 * 时间效率的提升，从来都不是白嫖，它意味着我们要付出更多的空间占用作为代价。
 * 在这道题里，如果继续沿着栈的思路往下走，我们可以考虑再搞个栈（stack2）出来作为辅助，让这个栈去容纳当前的最小值。
 * 如何确保 stack2 能够确切地给我们提供最小值？ 这里我们需要实现的是一个从栈底到栈顶呈递减趋势的栈（敲黑板！递减栈出现第二次了哈）：
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
```

## 四、队列

关于队列，在算法面试中大家需要掌握以下重点：

1. 栈向队列的转化
2. 双端队列
3. 优先队列

### 为什么一道题可以成为高频面试题

首先，不能剑走偏锋：好的面试题，它考察的大多是算法/数据结构中最经典、最关键的一部分内容，这样才能体现公平；其次，它的知识点要尽可能密集、题目本身要尽可能具备综合性，这样才能一箭双雕甚至一箭N雕，进而体现区分度、最大化面试过程的效率。

能够同时在这两个方面占尽优势的考题其实并不是很多，“用栈实现队列”这样的问题算是其中的佼佼者：一方面，它考察的确实是数据结构中的经典内容；另一方面，它又覆盖了两个大的知识点、足以检验出候选人编码基本功的扎实程度。唯一的 BUG 可能就是深度和复杂度不够，换句话说就是不够难。

### 如何用栈实现一个队列？

> 题目描述：使用栈实现队列的下列操作：

push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。

#### 示例

```
MyQueue queue = new MyQueue();
queue.push(1);
queue.push(2);
queue.peek(); // 返回 1
queue.pop(); // 返回 1
queue.empty(); // 返回 false
```

#### 说明

* 你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
* 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
* 假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。

#### 思路分析

做这道题大家首先要在心里清楚一个事情：栈和队列的区别在哪里？
仔细想想，栈，后进先出；队列，先进先出。也就是说两者的进出顺序其实是反过来的。用栈实现队列，说白了就是用栈实现先进先出的效果，再说直接点，就是想办法让栈底的元素首先被取出，也就是让出栈序列被逆序。
乍一看有点头大：栈结构决定了栈底元素只能被死死地压在最底下，如何使它首先被取出呢？
一个栈做不到的事情，我们用两个栈来做：

* 首先，准备两个栈：
* 现在问题是，怎么把第一个栈底下的那个 1 给撬出来。仔细想想，阻碍我们接触到 1 的是啥？是不是它头上的 3 和 2？那么如何让 3 和 2 给 1 让路呢？实际上咱们完全可以把这三个元素按顺序从 stack1 中出栈、然后入栈到 stack 2 里去：
* 此时 1 变得触手可及。不仅如此，下一次我们试图出队 2 的时候，可以继续直接对 stack2 执行出栈操作——因为转移 2 和 3 的时候已经做过一次逆序了，此时 stack2 的出栈序列刚好就对应队列的出队序列。
* 有同学会问，那如果 stack1 里入栈新元素怎么办？

#### 编码实现

```js
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
```

### 认识双端队列

双端队列衍生出的滑动窗口问题，是一个经久不衰的命题热点。关于双端队列，各种各样的解释五花八门，这里大家不要纠结，就记住一句话：

**双端队列就是允许在队列的两端进行插入和删除的队列。**

体现在编码上，最常见的载体是既允许使用 pop、push 同时又允许使用 shift、unshift 的数组：

```
const queue = [1,2,3,4] // 定义一个双端队列   
queue.push(1) // 双端队列尾部入队 
queue.pop() // 双端队列尾部出队   
queue.shift() // 双端队列头部出队 
queue.unshift(1) // 双端队列头部入队
```

### 滑动窗口问题

> 题目描述：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。

提示：你可以假设 k 总是有效的，在输入数组不为空的情况下，1 ≤ k ≤ 输入数组的大小。

#### 示例

```
输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
输出: [3,3,5,5,6,7]
```

#### 解释: 滑动窗口的位置

```
[1 3 -1] -3 5 3 6 7
1 [3 -1 -3] 5 3 6 7
1 3 [-1 -3 5] 3 6 7
1 3 -1 [-3 5 3] 6 7
1 3 -1 -3 [5 3 6] 7
1 3 -1 -3 5 [3 6 7]

最大值分别对应：3 3 5 5 6 7
```

#### 思路分析：双指针+遍历法

我们前面学过，约束范围，可以用双指针。因此我这里定义一个 left 左指针、定义一个 right 右指针，分别指向窗口的两端即可：

接下来我们可以把这个窗口里的数字取出来，直接遍历一遍、求出最大值，然后把最大值存进结果数组。这样第一个窗口的最大值就有了。

接着按照题意，窗口每次前进一步（左右指针每次一起往前走一步），此时的范围变成了这样：

我们要做的仍然是取出当前范围的所有元素、遍历一遍求出最大值，然后将最大值存进结果数组。

反复执行上面这个过程，直到数组完全被滑动窗口遍历完毕，我们也就得到了问题的答案。

#### 编码实现：双指针+遍历法

```js
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
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
```

#### 解法复盘

上面这个解法，你在面试的时候写上去，完全没有问题，也不用担心超时。
有的同学可能会觉得 calMax 这个函数多余了，认为可以直接用 Math.max 这个 JS 原生方法。其实就算是Math.max，也不可避免地需要对你传入的多个数字做最小值查找，calMax 和Math.max做的工作可以说是一样的辛苦。我这里手动实现一个 calMax， 大家会对查找过程造成的时间开销有更直观的感知。

现在我们来思考一下，上面这一波操作下来，时间复杂度是多少？
这波操作里其实涉及了两层循环，外层循环是 while，它和滑动窗口前进的次数有关。滑动窗口前进了多少次，while 就执行了多少次。

假设数组的规模是 n，那么从起始位置开始，滑动窗口每次走一步，一共可以走 n - k 次。注意别忘了初始位置也算作一步的，因此一共走了 n - k + 1次。然后每个窗口内部我们又会固定执行 k 次遍历。注意 k 可不是个常数，它和 n 一样是个变量。因此这个时间复杂度简化后用大 O 表示法可以记为 O(kn)。

O(kn) 虽然不差，但对这道题来说，还不是最好。因此在面试过程中，如果你采用了上面这套解法做出了这个题，面试官有 99% 的可能性会追问你：这个题可以优化吗？如何优化？（或者直接问你，你能在线性时间复杂度内解决此题吗？）

答案当然是能，然后面试官就会搬个小板凳坐你旁边，看看你怎么妙手回春，变 O(kn) 为 O(n)。

接下来你需要表演的，正是面试官期待已久的双端队列解法啊！

### 思路分析：双端队列法

1. 检查队尾元素，看是不是都满足大于等于当前元素的条件。如果是的话，直接将当前元素入队。否则，将队尾元素逐个出队、直到队尾元素大于等于当前元素为止。
2. 将当前元素入队
3. 检查队头元素，看队头元素是否已经被排除在滑动窗口的范围之外了。如果是，则将队头元素出队。
4. 判断滑动窗口的状态：看当前遍历过的元素个数是否小于 k。如果元素个数小于k，这意味着第一个滑动窗口内的元素都还没遍历完、第一个最大值还没出现，此时我们还不能动结果数组，只能继续更新队列；如果元素个数大于等于k，这意味着滑动窗口的最大值已经出现了，此时每遍历到一个新元素（也就是滑动窗口每往前走一步）都要及时地往结果数组里添加当前滑动窗口对应的最大值（最大值就是此时此刻双端队列的队头元素）。

这四个步骤分别有以下的目的：

1. 维持队列的递减性：确保队头元素是当前滑动窗口的最大值。这样我们每次取最大值时，直接取队头元素即可。
2. 这一步没啥好说的，就是在维持队列递减性的基础上、更新队列的内容。
3. 维持队列的有效性：确保队列里所有的元素都在滑动窗口圈定的范围以内。
4. 排除掉滑动窗口还没有初始化完成、第一个最大值还没有出现的特殊情况。

#### 编码实现

```js
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
```



