// 定义被反转的字符串 
const str = 'juejin'
// 定义反转后的字符串
const res = str.split('').reverse().join('')
console.log(res) // nijeuj

// 判断一个字符串是否是回文字符串
// function isPalindrome(str) {
//   // 先反转字符串
//   const reversedStr = str.split('').reverse().join('')
//   // 判断反转前后是否相等
//   return reversedStr === str
// }
function isPalindrome(str) {
  const len = str.length
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false
    }
  }
  return true
}
console.log(isPalindrome('yessey'))

/**
 * 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
 * @param {*} s 
 */
const validPalindrome = function (str) {
  if (!str) return false
  let len = str.length,
    i = 0,
    j = len - 1
  while (str[i] === str[j]) {
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
    while (start < end) {
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
console.log(validPalindrome('adbccacba'))


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
