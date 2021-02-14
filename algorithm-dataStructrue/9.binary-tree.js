const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D"
    },
    right: {
      val: "E"
    }
  },
  right: {
    val: "C",
    left: {
      val: 'F'
    },
    right: {
      val: "G"
    }
  }
};

/**
 * 迭代方法 + 先序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
const preorderTraversal = function (root) {
  const res = []
  const stack = []
  if (!root) return res
  stack.push(root)
  while (stack.length) {
    // 将栈顶结点记为当前结点
    const current = stack.pop()
    // 当前结点就是当前子树的根结点，把这个结点放在结果数组的尾部
    res.push(current.val)
    // 若当前子树根结点有右孩子，则将右孩子入栈
    if (current.right) stack.push(current.right)
    // 若当前子树根结点有左孩子，则将左孩子入栈
    if (current.left) stack.push(current.left)
  }
  return res
};
console.log(preorderTraversal(root))

/**
 * 迭代方法 + 后序遍历
 * @param {*} root 
 */
const postOrderTraversal = function (root) {
  const res = []
  const stack = []
  if (!root) return res
  stack.push(root)
  while (stack.length) {
    // 将栈顶结点记为当前结点
    const current = stack.pop()
    // 当前结点就是当前子树的根结点，把这个结点放在结果数组的头部
    res.unshift(current.val)
    // 若当前子树根结点有左孩子，则将左孩子入栈
    if (current.left) stack.push(current.left)
    // 若当前子树根结点有右孩子，则将右孩子入栈
    if (current.right) stack.push(current.right)
  }
  return res
};
console.log(postOrderTraversal(root))

/**
 * 迭代方法 + 中序遍历
 * @param {*} root 
 */
const inOrderTraversal = function (root) {
  const res = []
  const stack = []
  let current = root
  // 当 cur 不为空、或者 stack 不为空时，重复以下逻辑
  while (current || stack.length) {
    // 这个 while 的作用是把寻找最左叶子结点的过程中，途径的所有结点都记录下来 
    while (current) {
      stack.push(current)
      current = current.left
    }
    current = stack.pop()
    res.push(current.val)
    current = current.right
  }
  return res
};
console.log(inOrderTraversal(root))

/**
 * 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。（即逐层地，从左到右访问所有节点）。
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = function (root) {
  const res = []
  if (!root) return res
  const queue = []
  queue.push(root)
  while (queue.length) {
    const level = []
    const len = queue.length
    // 巧妙的使用 queue 的长度 len，刚好遍历完所有同一层级的结点
    for (let i = 0; i < len; i++) {
      const top = queue.shift()
      level.push(top.val)
      if (top.left) queue.push(top.left)
      if (top.right) queue.push(top.right)
    }
    res.push(level)
  }
  return res
};
console.log(levelOrder(root))

/**
 * 翻转二叉树
 */
const invertTree = function (root) {
  // 定义递归边界
  if (!root) return null
  // 递归交换右孩子的子结点
  let right = invertTree(root.right)
  // 递归交换左孩子的子结点
  let left = invertTree(root.left)
  // 交换当前遍历到的两个左右孩子结点
  if (right) root.left = right 
  if (left) root.right = left 
  return root
};
console.log(invertTree(root))
