# 链表的应用

链表结构相对数组、字符串来说，稍微有那么一些些复杂，所以针对链表的真题戏份也相对比较多。
前面咱们说过，数组、字符串若想往难了出，那一定是要结合一些超越数据结构本身的东西——比如排序算法、二分思想、动态规划思想等等。因此，这部分对应的难题、综合题，我们需要等知识体系完全构建起来之后，在真题训练环节重新复盘。

但是链表可不一样了。如果说在命题时，数组和字符串的角色往往是“算法思想的载体”，那么链表本身就可以被认为是“命题的目的”。单在真题归纳解读环节，我们能讲的技巧、能做的题目已经有很多。结合实际面试中的命题规律，我把这些题目分为以下三类：

* 链表的处理：合并、删除等（删除操作画个记号，重点中的重点！）
* 链表的反转及其衍生题目
* 链表成环问题及其衍生题目

## 一、链表的合并

> 真题描述：将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的。 

#### 示例

```
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

#### 编码实现

```js
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
    if (l1.val <=l2.val) {
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
console.log('mergeTwoLists ', mergeTwoLists(l1, l2))

function ListNode(val) {
  this.val = val;
  this.next = null;
}
```

## 二、链表节点的删除

> 真题描述：给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

#### 示例

```
输入: 1->1->2
输出: 1->2

输入: 1->1->2->3->3
输出: 1->2->3
```

#### 思路分析

链表的删除是一个基础且关键的操作，我们在数据结构部分就已经对该操作的编码实现进行过介绍，这里直接复用大家已经学过的删除能力，将需要删除的目标结点的前驱结点 next 指针往后指一格。

判断两个元素是否重复，由于此处是已排序的链表，我们直接判断前后两个元素值是否相等即可。

#### 编码实现

```js
/**
 * 链表节点的删除
 * @param {ListNode} head
 * @return {ListNode}
 */
const deleteDuplicates = function (head) {
  // 设定 cur 指针，初始位置为链表第一个结点
  let cur = head
  // 遍历链表
  while(cur && cur.next) {
    if (cur.next.val === cur.val) {
      cur.next = cur.next.next
    } else {
      cur = cur.next
    }
  }
  return head
};
const l3 = {
  val: 3,
  next: {
    val: 3,
    next: {
      val: 4,
      next: {
        val: 4,
        next: null
      }
    }
  }
}
console.log('deleteDuplicates =>  ', deleteDuplicates(l3))
```

## 三、删除问题的延伸—— dummy结点登场

> 真题描述：给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。

#### 示例

```
输入: 1->2->3->3->4->4->5
输出: 1->2->5

输入: 1->1->1->2->3
输出: 2->3
```

#### 思路分析

其实在链表题中，经常会遇到这样的问题：链表的第一个结点，因为没有前驱结点，导致我们面对它无从下手。这时我们就可以用一个 `dummy` 结点来解决这个问题。

所谓 dummy 结点，就是咱们人为制造出来的第一个结点的前驱结点，这样链表中所有的结点都能确保有一个前驱结点，也就都能够用同样的逻辑来处理了。

注意：由于重复的结点可能不止一个两个，我们这里需要用一个 while 循环来反复地进行重复结点的判断和删除操作。

#### 编码实现

```js
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
```

