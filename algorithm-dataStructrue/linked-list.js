/**
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoLists = function (l1, l2) {
  const head = new ListNode()
  let current = head
  while(l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1
      l1 = l1.next
    } else {
      current.next = l2
      l2 = l2.next
    }
    current = current.next
  }

  current.next = l1 !== null ? l1 : l2
  return head.next
};
const l1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 4,
      next: null
    }
  }
}
const l2 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 4,
      next: null
    }
  }
}
console.log('mergeTwoLists => ', mergeTwoLists(l1, l2))

/**
 * 链表节点的删除
 * 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function (head) {
  let current = head
  while (current && current.next) {
    if (current.val === current.next.val) {
      current.next = current.next.next
    } else {
      current = current.next
    }
  }
  return head
};
const l3 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 3,
      next: {
        val: 4,
        next: null
      }
    }
  }
}
console.log('deleteDuplicates =>  ', deleteDuplicates(l3))

/**
 * dummy结点
 * 给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDummyDuplicates = function (head) {
  if (!head || !head.next) return head
  let dummy = new ListNode()
  dummy.next = head
  let current = dummy
  while (current.next && current.next.next) {
    if (current.next.val === current.next.next.val) {
      let val = current.next.val
      while(current.next && current.next.val === val) {
        current.next = current.next.next
      }
    } else {
      current = current.next
    }
  }
  return dummy.next
};
const l4 = {
  val: 1,
  next: {
    val: 3,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 4,
          next: {
            val: 5,
            next: null
          }
        }
      }
    }
  }
}
console.log('deleteDummyDuplicates => ', deleteDummyDuplicates(l4))

function ListNode(val) {
  this.val = val;
  this.next = null;
}
