/**
 * 1、给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
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
  while (j >= 0) {
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
