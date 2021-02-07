# 数组的应用

单纯针对数组来考察的题目，总体来说，都不算太难——数组题目要想往难了出，基本都要结合排序、二分和动态规划这些相对复杂的算法思想才行。

## 一、Map的妙用 --- 两数求和问题

> 真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

#### 示例

```
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
```

### 思路分析

#### 1、暴力解法 => 两个循环

两层循环很多情况下都意味着 O(n^2) 的复杂度，这个复杂度非常容易导致算法超时。即便没有超时，在明明有一层遍历解法的情况下，写了两层遍历，面试官对你的印象分会大打折扣。

#### 2、空间换时间，Map 来帮忙

几乎所有的求和问题，都可以转化为求差问题。 这道题就是一个典型的例子，通过把求和问题转化为求差问题，事情会变得更加简单。

我们可以在遍历数组的过程中，增加一个 Map 来记录已经遍历过的数字及其对应的索引值。然后每遍历到一个新数字的时候，都回到 Map 里去查询 targetNum 与该数的差值是否已经在前面的数字中出现过了。若出现过，那么答案已然显现，我们就不必再往下走了。

#### 编码实现

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
  var obj = {}
  var len = nums.length
  for (let i = 0; i < len; i++) {
    let val = nums[i]
    if (obj[target - val] !== undefined) {
      return [obj[target - val], i]
    }
    obj[val] = i
  }
};
console.log(twoSum([2, 7, 11, 15], 26))
```

## 二、强大的双指针

### 1、合并两个有序数组

> 真题描述：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

#### 示例1

```
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6], n = 3
输出: [1,2,2,3,5,6]
```
#### 示例2

```
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
```

### 思路分析

#### 标准解法

这道题没有太多的弯弯绕绕，标准解法就是双指针法。首先我们定义两个指针，各指向两个数组生效部分的尾部：

#### 编码实现

```js
/**
 * 2、给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
 * 说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function (nums1, m, nums2, n) {
  // 初始化两个指针的指向，初始化 nums1 尾部索引k
  let i = m - 1,
    j = n - 1,
    k = m + n - 1
  while (i >= 0 && j >= 0) {
    if (nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i]
      k--
      i--
    } else {
      nums1[k] = nums2[j]
      k--
      j--
    }
  }
  // 如果提前遍历完的是 nums1 的有效部分，剩下的是 nums2。那么这时意味着 nums1 的头部空出来了，直接把 nums2 整个补到 nums1 前面去即可。
  // 如果提前遍历完的是 nums2，剩下的是 nums1。由于容器本身就是 nums1，所以此时不必做任何额外的操作。
  while(j >= 0) {
    nums1[k] = nums2[j]
    k--
    j--
  }
};
let nums1 = [5],
  m = 1,
  nums2 = [1, 2, 3, 4],
  n = 4
// let nums1 = [0, 1, 2, 3, 0, 0, 0],
//   m = 4,
//   nums2 = [2, 5, 6],
//   n = 3
merge(nums1, m, nums2, n)
console.log(nums1)
```

找点乐子：
上面我们给出的，是面试官最喜欢看到的一种解法，这种解法适用于各种语言。
但是就 JS 而言，我们还可以“另辟蹊径”，仔细想想，你有什么妙招？

### 2、三数求和问题

双指针法能处理的问题多到你想不到。不信来瞅瞅两数求和它儿子——三数求和问题！

俗话说，青出于蓝而胜于蓝，三数求和虽然和两数求和只差了一个字，但是思路却完全不同。

> 真题描述：给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

#### 示例

```
给定数组 nums = [-1, 0, 1, 2, -1, -4]
满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
```

#### 思路分析

三数之和延续两数之和的思路，我们可以把求和问题变成求差问题——固定其中一个数，在剩下的数中寻找是否有两个数和这个固定数相加是等于0的。

虽然乍一看似乎还是需要三层循环才能解决的样子，不过现在我们有了双指针法，定位效率将会被大大提升，从此告别过度循环~

这里大家相信已经能察觉出来双指针法的使用场景了，**一方面，它可以做到空间换时间；另一方面，它也可以帮我们降低问题的复杂度。**

双指针法用在涉及求和、比大小类的数组题目里时，大前提往往是：该数组必须有序。否则双指针根本无法帮助我们缩小定位的范围，压根没有意义。因此这道题的第一步是将数组排序：

然后，对数组进行遍历，每次遍历到哪个数字，就固定哪个数字。然后把左指针指向该数字后面一个坑里的数字，把右指针指向数组末尾，让左右指针从起点开始，向中间前进：

每次指针移动一次位置，就计算一下两个指针指向数字之和加上固定的那个数之后，是否等于0。如果是，那么我们就得到了一个目标组合；否则，分两种情况来看：

* 相加之和大于0，说明右侧的数偏大了，右指针左移
* 相加之和小于0，说明左侧的数偏小了，左指针右移

tips：这个数组在题目中要求了“不重复的三元组”，因此我们还需要做一个重复元素的跳过处理。这一点在编码实现环节大家会注意到。

#### 编码实现

```js

/**
 * 3、给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  let len = nums.length
  let res = []
  nums = nums.sort((a, b) => a - b)
  // 遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
  for (let i = 0; i < len - 2; i++) {
    let left = i + 1
    let right = len - 1
    // 如果遇到重复的数字，则跳过
    if (i >= 0 && nums[i] === nums[i - 1]) continue
    while (left < right) {
      if (nums[i] + nums[left] + nums[right] < 0) {
        left++
        // 处理左指针元素重复的情况
        while (left < right && nums[left] === nums[left - 1]) {
          left++
        }
      } else if (nums[i] + nums[left] + nums[right] > 0) {
        right--
        // 处理右指针元素重复的情况
        while (left < right && nums[right] === nums[right + 1]) {
          right--
        }
      } else {
        res.push([nums[i], nums[left], nums[right]])
        left++
        right--
        while(left < right && nums[left] === nums[left - 1]) {
          left++
        }
        while(left < right && nums[right] === nums[right + 1]) {
          right--
        }
      }
    }
  }

  return res
};
let threeList = [-1, 0, 1, 2, -1, -4]
// let threeList = [0]
console.log(threeSum(threeList))
```

### 双指针法中的“对撞指针”法

在上面这道题中，左右指针一起从两边往中间位置相互迫近，这样的特殊双指针形态，被称为“对撞指针”。

什么时候你需要联想到对撞指针？

这里我给大家两个关键字——“有序”和“数组”。
