/**
 * 排列问题
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
  const len = nums.length
  const res = []
  const current = []
  const used = {}
  // 从索引为 0 的坑位（也就是第一个坑位）开始 dfs
  dfs(0)
  // 定义 dfs 函数，入参是坑位的索引（从 0 计数）
  function dfs(index) {
    console.log('dfs => ', current)
    // 若遍历到了不存在的坑位（第 len+1 个），则触碰递归边界返回
    if (index === len) {
      res.push([...current])
      return
    }
    // 检查手里剩下的数字有哪些
    for (let i = 0; i < len; i++) {
      // 若 nums[i] 之前没被其它坑位用过，则可以理解为“这个数字剩下了”
      if (!used[nums[i]]) {
        // 给 nums[i] 打个“已用过”的标
        used[nums[i]] = 1
        // 将nums[i]推入当前排列
        current.push(nums[i])
        // 基于这个排列继续往下一个坑走去
        dfs(index + 1)
        // nums[i]让出当前坑位
        current.pop()
        // 下掉“已用过”标识
        used[nums[i]] = 0
      }
    }
  }
  return res
};
// console.log(permute([1, 2, 3]))

/**
 * 组合问题
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = function (nums) {
  const len = nums.length
  const res = []
  // 初始化组合数组
  const item = []
  dfs(0)
  // 定义 dfs 函数，入参是 nums 中的数字索引
  function dfs(index) {
    // 每次进入，都意味着组合内容更新了一次，故直接推入结果数组
    res.push([...item])
    // 从当前数字的索引开始，遍历 nums
    for (let i = index; i < len; i++) {
      // 这是当前数字存在于组合中的情况
      item.push(nums[i])
      // 基于当前数字存在于组合中的情况，进一步 dfs
      dfs(i + 1)
      // 这是当前数字不存在与组合中的情况
      item.pop()
    }
  }
  return res
};
// console.log(subsets([1, 2, 3]))

/**
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
  const res = []
  const item = []
  dfs(1)
  function dfs(index) {
    if (item.length === k) {
      return res.push([...item])
    }
    for (let i = index; i <= n; i++) {
      item.push(i)
      dfs(i + 1)
      item.pop()
    }
  }
  return res
};
console.log(combine(4, 2))
