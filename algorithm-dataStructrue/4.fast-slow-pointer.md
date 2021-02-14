# 快慢指针与多指针

链表题目中，有一类会涉及到反复的遍历。涉及反复遍历的题目，题目本身虽然不会直接跟你说“你好，我是一道需要反复遍历的题目”，但只要你尝试用常规的思路分析它，你会发现它一定涉及反复遍历；同时，涉及反复遍历的题目，还有一个更明显的特征，就是它们往往会涉及相对复杂的链表操作，比如反转、指定位置的删除等等。

解决这类问题，我们用到的是双指针中的“快慢指针”。快慢指针指的是两个一前一后的指针，两个指针往同一个方向走，只是一个快一个慢。快慢指针严格来说只能有俩，不过实际做题中，可能会出现一前、一中、一后的三个指针，这种超过两个指针的解题方法也叫“多指针法”。

快慢指针+多指针，双管齐下，可以帮助我们解决链表中的大部分复杂操作问题。

## 一、快慢指针——删除链表的倒数第 N 个结点

> 真题描述：给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

说明：给定的 n 保证是有效的。

#### 示例

```
给定一个链表: 1->2->3->4->5, 和 n = 2.
当删除了倒数第二个结点后，链表变为 1->2->3->5.
```

#### 思路分析

* dummy 结点的使用
* “倒数” 变 “正数”
* 快慢指针登场

按照我们已经预告过的思路，首先两个指针 slow 和 fast，全部指向链表的起始位——dummy 结点

快指针先出发！闷头走上 n 步，在第 n 个结点处打住，这里 n=2

然后，快慢指针一起前进，当快指针前进到最后一个结点处时，两个指针再一起停下来

此时，慢指针所指的位置，就是倒数第 n 个结点的前一个结点

#### 编码实现

```js
function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
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
```

## 二、多指针法——链表的反转

### 1、完全反转一个链表

> 真题描述：定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。

#### 示例

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

#### 思路解读

如何去反转指针的指向？

这里我们需要用到三个指针，它们分别指向目标结点（cur）、目标结点的前驱结点（pre）、目标结点的后继结点（next）。

#### 编码实现

```js
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
```

### 2、局部反转一个链表

反转链表真是座金矿，反转完整体反转局部，反转完局部还能每 k 个一组花式反转（最后这个略难，我们会放在真题训练环节来做）。虽然难度依次进阶，但只要把握住核心思想就没问题，下面咱们来看看如何反转局部：

> 真题描述：反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。

说明：1 ≤ m ≤ n ≤ 链表长度。

#### 示例

```
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
```

#### 思路解读

#### 编码实现

```js
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
```
