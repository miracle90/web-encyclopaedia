function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * 给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 快慢指针
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function (head, n) {
  let dummy = new ListNode()
  dummy.next = head
  let fast = dummy
  let slow = dummy
  // 快指针闷头走 n 步
  while (n--) {
    fast = fast.next
  }
  // 快慢指针一起走
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  // 慢指针删除自己的后继结点
  slow.next = slow.next.next
  return dummy.next
};
const l1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
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
console.log('removeNthFromEnd => ', removeNthFromEnd(l1, 5))
console.log('removeNthFromEnd => ', removeNthFromEnd(removeNthFromEnd(l1, 5), 2))

/**
 * 完全反转一个链表
 * 输入: 1->2->3->4->5
 * 输出: 5->4->3->2->1
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
  let pre = null
  let current = head
  while (current) {
    let next = current.next
    current.next = pre
    pre = current
    current = next
  }
  return pre
};
const l2 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
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
console.log('reverseList => ', reverseList(l2))

/**
 * 局部反转一个链表
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
// 入参是头结点、m、n
const reverseBetween = function (head, m, n) {
  // 定义pre、cur，用leftHead来承接整个区间的前驱结点
  let pre, current, leftHead
  // 用 dummy
  let dummy = new ListNode()
  // dummy后继结点是头结点
  dummy.next = head
  // p是一个游标，用于遍历，最初指向 dummy
  let p = dummy
  for (let i = 0; i < m - 1; i++) {
    p = p.next
  }
  // 缓存这个前驱结点到 leftHead 里
  leftHead = p
  // start 是反转区间的第一个结点
  let start = leftHead.next
  // pre 指向start
  pre = start
  // cur 指向 start 的下一个结点
  current = pre.next
  // 开始重复反转动作
  for (let i = m; i < n; i++) {
    let next = current.next
    current.next = pre
    pre = current
    current = next
  }
  // leftHead 的后继结点此时为反转后的区间的第一个结点
  leftHead.next = pre
  // 将区间内反转后的最后一个结点 next 指向 cur
  start.next = current
  // dummy.next 永远指向链表头结点
  return dummy.next
};
const l3 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: {
            val: 6,
            next: {
              val: 7,
              next: null
            }
          }
        }
      }
    }
  }
}
console.log('reverseBetween => ', JSON.stringify(reverseBetween(l3, 4, 6)))
