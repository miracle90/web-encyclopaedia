/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 入参是头结点 
const hasCycle = function (head) {
  while (head) {
    if (head.flag) {
      return true
    } else {
      head.flag = true
      head = head.next
    }
  }
  return false
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const detectCycle = function(head) {
  while (head) {
    if (head.flag) {
      return head
    } else {
      head.flag = true
      head = head.next
    }
  }
  return null
}

/**
 * 快慢指针方法验证环形链表
 * @param {*} head 
 */
const pointerCycle = function(head) {
  if (!head || !head.next) return false
  let fast = head.next
  let slow = head
  while (fast !== slow) {
    if (!fast || !fast.next) return false
    fast = fast.next.next
    slow = slow.next
  }
  return true
}
