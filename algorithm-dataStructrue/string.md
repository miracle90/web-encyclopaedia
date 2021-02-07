# 字符串应用

## 基本算法技能

#### 反转字符串

```js
// 定义被反转的字符串 
const str = 'juejin'  
// 定义反转后的字符串
const res = str.split('').reverse().join('')

console.log(res) // nijeuj
```

#### 判断一个字符串是否是回文字符串

```js
function isPalindrome(str) {
  // 先反转字符串
  const reversedStr = str.split('').reverse().join('')
  // 判断反转前后是否相等
  return reversedStr === str
}
```

回文字符串还有另一个特性：如果从中间位置“劈开”，那么两边的两个子串在内容上是完全对称的。因此我们也可以结合对称性来做判断：

```js
function isPalindrome(str) {
  const len = str.length
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false
    }
  }
  return true
}
```

## 高频真题解读

### 1、回文字符串的衍生问题

> 真题描述：给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

#### 示例

```
输入: "aba"
输出: true

输入: "abca"
输出: true
解释: 你可以删除c字符。
注意: 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。
```

#### 思路分析

这道题很多同学第一眼看过去，可能本能地会想到这样一种解法：若字符串本身不回文，则直接遍历整个字符串。遍历到哪个字符就删除哪个字符、同时对删除该字符后的字符串进行是否回文的判断，看看存不存在删掉某个字符后、字符串能够满足回文的这种情况。

这个思路真的实现起来的话，在判题系统眼里其实也是没啥毛病的。但是在面试官看来，就有点问题了——**这不是一个高效的解法。**

字符串题干中若有“回文”关键字，那么做题时脑海中一定要冒出两个关键字——对称性 和 双指针。这两个工具一起上，足以解决大部分的回文字符串衍生问题。

如果两个指针所指的字符恰好相等，那么这两个字符就符合了回文字符串对对称性的要求，跳过它们往下走即可。如果两个指针所指的字符串不等。

那么就意味着不对称发生了，意味着这是一个可以“删掉试试看”的操作点。我们可以分别对左指针字符和右指针字符尝试进行“跳过”，看看区间在 `[left+1, right]` 或 `[left, right-1]` 的字符串是否回文。如果是的话，那么就意味着如果删掉被“跳过”那个字符，整个字符串都将回文。

#### 编码实现

```js
const validPalindrome = function (str) {
  if (!str) return false
  let len = str.length, i = 0, j = len - 1
  while(str[i] === str[j]){
    i++
    j--
  }
  if (isPalindrome(i + 1, j)) {
    return true
  }
  if (isPalindrome(i, j - 1)) {
    return true
  }
  function isPalindrome(start, end) {
    while(start < end) {
      if (str[start] !== str[end]) {
        return false
      }
      start++
      end--
    }
    return true
  }
  return false
};
```

### 2、字符串匹配问题——正则表达式初相见

> 真题描述： 设计一个支持以下两种操作的数据结构：

```
void addWord(word)
bool search(word)
search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
. 可以表示任何一个字母。
```

#### 示例

```
addWord("bad")
addWord("dad")
addWord("mad")
search("pad") -> false
search("bad") -> true
search(".ad") -> true
search("b..") -> true
说明:
你可以假设所有单词都是由小写字母 a-z 组成的。
```

#### 思路分析

这道题要求字符串既可以被添加、又可以被搜索，这就意味着字符串在添加时一定要被存在某处。键值对存储，我们用 Map（或对象字面量来模拟 Map）。

注意，这里为了降低查找时的复杂度，我们可以考虑以字符串的长度为 key，相同长度的字符串存在一个数组中，这样可以提高我们后续定位的效率。

难点在于 search 这个 API，它既可以搜索文字，又可以搜索正则表达式。因此我们在搜索前需要额外判断一下，传入的到底是普通字符串，还是正则表达式。若是普通字符串，则直接去 Map 中查找是否有这个 key；若是正则表达式，则创建一个正则表达式对象，判断 Map 中相同长度的字符串里，是否存在一个能够与这个正则相匹配。

这里需要大家复习一下正则表达式的创建，以及用于测试某个字符串是否与之匹配的方法：

```js
/**
 * 设计一个支持以下两种操作的数据结构
 * void addWord(word)
 * bool search(word)
 * 构造函数
 */
const WordDictionary = function () {
  this.word = {}
}
// 添加字符串的方法
WordDictionary.prototype.addWord = function (word) {
  if (this.word[word.length]) {
    this.word[word.length].push(word)
  } else {
    this.word[word.length] = [word]
  }
};
// 搜索方法
WordDictionary.prototype.search = function (word) {
  const len = word.length
  if (!this.word[len]) return false
  if (!word.includes('.')) {
    return this.word[len].includes(word)
  }
  const reg = new RegExp(word)
  return this.word[len].some(item => reg.test(item))
};
const word = new WordDictionary()
console.log(word.addWord("bada"))
console.log(word.addWord("dad"))
console.log(word.addWord("mad"))
console.log(word.search("pad"))
console.log(word.search("bad"))
console.log(word.search(".ad"))
console.log(word.search("b.."))
```

### 3、正则表达式更进一步——字符串与数字之间的转换问题

> 真题描述：请你来实现一个 atoi 函数，使其能将字符串转换成整数。

* 首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止；
* 当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；
* 假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数；
* 该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响；
* 假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换；
* 在任何情况下，若函数不能进行有效的转换时，请返回 0。

假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−2^31,  2^31 − 1]。如果数值超过这个范围，请返回  INT_MAX (2^31 − 1) 或 INT_MIN (−2^31) 。


```js
/**
 * 请你来实现一个 atoi 函数，使其能将字符串转换成整数。
 * @param {*} str 
 */
const myAtoi = function (str) {
  // 编写正则表达式
  const reg = /\s*([-\+]?[0-9]*).*/
  // 得到捕获组
  const groups = str.match(reg)
  // 计算最大值
  const max = Math.pow(2, 31) - 1
  // 计算最小值
  const min = -max - 1
  // targetNum 用于存储转化出来的数字
  let targetNum = 0
  // 如果匹配成功
  if (groups) {
    // 尝试转化捕获到的结构
    targetNum = +groups[1]
    // 注意，即便成功，也可能出现非数字的情况，比如单一个'+'
    if (isNaN(targetNum)) {
      // 不能进行有效的转换时，请返回 0
      targetNum = 0
    }
  }
  // 卡口判断
  if (targetNum > max) {
    return max
  } else if (targetNum < min) {
    return min
  }
  // 返回转换结果
  return targetNum
};
console.log(myAtoi('      +10086'))
console.log(myAtoi('42'))
console.log(myAtoi('-42'))
console.log(myAtoi('4193 with words')) // 转换截止于数字 '3' ，因为它的下一个字符不为数字。
console.log(myAtoi('words and 987'))  // 第一个非空字符是 'w', 但它不是数字或正、负号。 因此无法执行有效的转换。
console.log(myAtoi('-91283472332')) // 数字 "-91283472332" 超过 32 位有符号整数范围。因此返回 INT_MIN (−2^31) 。
```

