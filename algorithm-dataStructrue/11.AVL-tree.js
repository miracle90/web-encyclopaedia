const root = {
  val: 3,
  left: {
    val: 9
  },
  right: {
    val: 20,
    left: {
      val: 15
    },
    right: {
      val: 7
    }
  }
}

const roots = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
      left: {
        val: 4
      },
      right: {
        val: 4
      }
    },
    right: {
      val: 3
    }
  },
  right: {
    val: 2
  }
}

const rootss = {
  val: 1,
  right: {
    val: 2,
    right: {
      val: 3,
      right: {
        val: 4
      }
    }
  }
}

/**
 * 给定一个二叉树，判断它是否是高度平衡的二叉树
 * @param {*} root 
 */
const isBalanced = function (root) {
  // 立一个flag，只要有一个高度差绝对值大于1，这个flag就会被置为false
  let flag = true
  function dfs(root) {
    // 如果是空树，高度记为0；如果flag已经false了，那么就没必要往下走了，直接return
    if (!root || !flag) return 0
    let left = dfs(root.left)
    let right = dfs(root.right)
    // 如果左右子树的高度差绝对值大于1，flag就破功了
    if (Math.abs(left - right) > 1) {
      flag = false
      return 0
    }
    // 返回当前子树的高度
    return Math.max(left, right) + 1
  }
  dfs(root)
  return flag
};
console.log(isBalanced(root))
console.log(isBalanced(roots))

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}
/**
 * 平衡二叉树的构造
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const balanceBST = function (root) {
  // 初始化中序遍历序列数组
  const nums = []
  // 定义中序遍历二叉树，得到有序数组
  function sort(root) {
    if (!root) return null
    sort(root.left)
    nums.push(root.val)
    sort(root.right)
  }

  function builtAVL(low, high) {
    // 若 low > high，则越界，说明当前索引范围对应的子树已经构建完毕
    if (low > high) return null
    // 取数组的中间值作为根结点值
    let mid = Math.floor(low + (high - low) / 2)
    // 创造当前树的根结点
    let current = new TreeNode(nums[mid])
    // 构建左子树
    current.left = builtAVL(low, mid - 1)
    // 构建右子树
    current.right = builtAVL(mid + 1, high)
    // 返回当前树的根结点 
    return current
  }
  sort(root)
  // 基于 nums，构造平衡二叉树
  return builtAVL(0, nums.length - 1)
};
console.log(balanceBST(rootss))