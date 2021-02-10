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

/**
 * DFS基于树的先序遍历
 */
function preorder(root) {
  if (!root) {
    return
  }
  console.log('DFS基于树的先序遍历 => ', root.val)
  preorder(root.left)
  preorder(root.right)
}
console.log(preorder(root))


/**
 * BFS
 */
function BFS(root) {
  const queue = []
  queue.push(root)
  while (queue.length) {
    const top = queue[0]
    console.log(top.val)
    if (top.left) {
      queue.push(top.left)
    }
    if (top.right) {
      queue.push(top.right)
    }
    queue.shift()
  }
}
console.log(BFS(root))
