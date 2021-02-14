# 二叉树真题归纳与解读

在本节，有以下三个命题方向需要大家重点掌握：  

* 迭代法实现二叉树的先、中、后序遍历
* 二叉树层序遍历的衍生问题
* 翻转二叉树

## 一、“遍历三兄弟”的迭代实现  

递归“真香！”

#### 递归算法

```js
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
    right: {
      val: "F"
    }
  }
};
const preOrder = function(root) {
  if (!root) return
  console.log(`当前节点名称 => ${root.val}`)
  if (root.left) preOrder(root.left)
  if (root.right) preOrder(root.right)
}
console.log(preOrder(root))
```

### 1、从先序遍历说起

> 给定一个二叉树，返回它的前序（先序）遍历序列。

#### 思路分析

### 2、异曲同工的后序遍历迭代实现

### 3、思路清奇的中序遍历迭代实现 

## 二、层序遍历的衍生问题

在 DFS 和 BFS 这一节，我们已经讲过了二叉树层序遍历的实现方法。层序遍历本本身难度不大，但一想到这是一个关键考点，出题这帮人就每天绞尽脑汁地想要把简单的问题复杂化。于是，就有了我们眼下这个命题方向——层序遍历的衍生问题。  
对于这类问题，我们接下来会讲最有代表性的一道作为例题。各位只要能吃透这一道的基本思路，就能够轻松地在类似的变体中举一反三。

> 题目描述：给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

#### 示例

```
二叉树：[3,9,20,null,null,15,7],

  3
 / \
9  20
  /  \
 15   7

返回其层次遍历结果：
[
  [3],
  [9,20],
  [15,7]
]
```

#### 思路分析

层序遍历没有那么多幺蛾子，大家看到层序遍历就应该条件反射出 BFS+队列  这对好基友。所谓变体，不过是在 BFS 的过程中围绕结果数组的内容做文章。   
拿这道题来说，相对于我们 14 节中讲过的层序遍历基本思路，它变出的花样仅仅在于要求我们对层序遍历结果进行分层。也就是说只要我们能在 BFS 的过程中感知到当前层级、同时用不同的数组把不同的层级区分开，这道题就得解了。

如何做到这一点？大家需要知道一个非常重要的信息：我们在对二叉树进行层序遍历时，每一次 while 循环其实都对应着二叉树的某一层。只要我们在进入while循环之初，记录下这一层结点个数，然后将这个数量范围内的元素 push 进同一个数组，就能够实现二叉树的分层。

#### 编码实现

```javascript
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
```

## 三、翻转二叉树

> 题目描述：翻转一棵二叉树。

#### 示例

```
输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

#### 思路分析

这道题是一道非常经典的递归应用题。
一棵二叉树，经过翻转后会有什么特点？答案是每一棵子树的左孩子和右孩子都发生了交换。既然是“每一棵子树”，那么就意味着重复，既然涉及了重复，就没有理由不用递归。

于是这道题解题思路就非常明确了：以递归的方式，遍历树中的每一个结点，并将每一个结点的左右孩子进行交换。

#### 编码实现

```javascript
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
```