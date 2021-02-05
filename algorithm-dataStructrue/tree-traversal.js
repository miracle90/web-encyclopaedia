let root = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'D'
    },
    right: {
      val: 'E'
    }
  },
  right: {
    val: 'C',
    right: {
      val: 'F'
    }
  }
}

// 先序遍历
function preOrder(root) {
  if (!root) {
    return
  }
  console.log(`先序遍历，值 => ${root.val}`)
  preOrder(root.left)
  preOrder(root.right)
}

// 中序遍历
function inOrder(root) {
  if (!root) {
    return
  }
  inOrder(root.left)
  console.log(`中序遍历，值 => ${root.val}`)
  inOrder(root.right)
}

// 后序遍历
function postOrder(root) {
  if (!root) {
    return
  }
  postOrder(root.left)
  postOrder(root.right)
  console.log(`后序遍历，值 => ${root.val}`)
}

preOrder(root)
console.log('~~~~~~~~~~~~~~~~~~')
inOrder(root)
console.log('~~~~~~~~~~~~~~~~~~')
postOrder(root)
