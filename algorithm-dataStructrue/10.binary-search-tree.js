function TreeNode(n) {
  this.val = n
  this.left = this.right = null
}

const root = {
  val: 6,
  left: {
    val: 3,
    left: {
      val: 1
    },
    right: 4
  },
  right: {
    val: 8,
    left: {
      val: 7
    },
    right: {
      val: 9
    }
  }
}

/**
 * 查找数据域为某一特定值的结点
 */
function search(root, n) {
  if (!root) return null
  if (root.val === n) {
    console.log(`找到目标结点`, root)
  } else if (root.val > n) {
    search(root.left, n)
  } else if (root.val < n) {
    search(root.right, n)
  }
}
console.log(search(root, 8))

/**
 * 插入新结点
 * @param {*} root 
 * @param {*} n 
 */
function insertIntoBST(root, n) {
  // 若 root 为空，说明当前是一个可以插入的空位
  if (!root) {
    // 用一个值为n的结点占据这个空位
    root = new TreeNode(n)
    return root
  }
  if (root.val > n) {
    // 当前结点数据域大于n，向左查找
    root.left = insertIntoBST(root.left, n)
  } else {
    // 当前结点数据域小于n，向右查找
    root.right = insertIntoBST(root.right, n)
  }
  // 返回插入后二叉搜索树的根结点
  return root
}
console.log(JSON.stringify(insertIntoBST(root, 22)))

/**
 * 删除指定结点
 * @param {*} root 
 * @param {*} n 
 */
function deleteNode(root, n) {
  // 如果没找到目标结点，则直接返回
  if (!root) {
    return root
  }
  // 定位到目标结点，开始分情况处理删除动作
  if (root.val === n) {
    // 若是叶子结点，则不需要想太多，直接删除
    if (!root.left && !root.right) {
      root = null
    } else if (root.left) {
      // 寻找左子树里值最大的结点
      const maxLeft = findMax(root.left)
      // 用这个 maxLeft 覆盖掉需要删除的当前结点  
      root.val = maxLeft.val
      // 覆盖动作会消耗掉原有的 maxLeft 结点
      root.left = deleteNode(root.left, maxLeft.val)
    } else {
      // 寻找右子树里值最小的结点
      const minRight = findMin(root.right)
      // 用这个 minRight 覆盖掉需要删除的当前结点  
      root.val = minRight.val
      // 覆盖动作会消耗掉原有的 minRight 结点
      root.right = deleteNode(root.right, minRight.val)
    }
  } else if (root.val > n) {
    // 若当前结点的值比 n 大，则在左子树中继续寻找目标结点
    root.left = deleteNode(root.left, n)
  } else {
    // 若当前结点的值比 n 小，则在右子树中继续寻找目标结点
    root.right = deleteNode(root.right, n)
  }
  return root
}
function findMax(root) {
  while (root.right) {
    root = root.right
  }
  return root
}
function findMin(root) {
  while (root.left) {
    root = root.left
  }
  return root
}
console.log(deleteNode(root, 3))

/**
 * 二叉搜索树的验证
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = function (root) {
  // 定义递归函数
  function dfs(root, minValue, maxValue) {
    // 若是空树，则合法
    if (!root) {
      return true
    }
    // 若右孩子不大于根结点值，或者左孩子不小于根结点值，则不合法
    if (root.val <= minValue || root.val >= maxValue) return false
    // 左右子树必须都符合二叉搜索树的数据域大小关系
    return dfs(root.left, minValue, root.val) && dfs(root.right, root.val, maxValue)
  }
  // 初始化最小值和最大值为极小或极大
  return dfs(root, -Infinity, Infinity)
};
console.log(isValidBST(root))

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
const sortedArrayToBST = function (nums) {
  // 处理边界条件
  if (!nums.length) {
    return null
  }

  // root 结点是递归“提”起数组的结果
  const root = buildBST(0, nums.length - 1)

  // 定义二叉树构建函数，入参是子序列的索引范围
  function buildBST(low, high) {
    // 当 low > high 时，意味着当前范围的数字已经被递归处理完全了
    if (low > high) {
      return null
    }
    // 二分一下，取出当前子序列的中间元素
    const mid = Math.floor(low + (high - low) / 2)
    // 将中间元素的值作为当前子树的根结点值
    const cur = new TreeNode(nums[mid])
    // 递归构建左子树，范围二分为[low,mid)
    cur.left = buildBST(low, mid - 1)
    // 递归构建左子树，范围二分为为(mid,high]
    cur.right = buildBST(mid + 1, high)
    // 返回当前结点
    return cur
  }
  // 返回根结点
  return root
};
console.log(sortedArrayToBST([-10, -3, 0, 5, 9]))