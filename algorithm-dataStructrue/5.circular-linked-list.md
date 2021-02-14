# 环形链表

环形链表是链表中的一类特殊问题，它和链表反转一样，有着相对恒定的解题思路和适当的变体。如果你对它的特性和解法没有预先的了解和把握，那么前期的推导可能会花去你大量的时间。反过来看，只要我们能够掌握其核心思路，那么不管它怎么变化，大家都能在瞬间找到解题的“抓手”、进而给出正确的解答。

## 环形链表基本问题——如何判断链表是否成环？

> 真题描述：给定一个链表，判断链表中是否有环。

#### 示例

```
输入：[3,2,0,4]（链表结构如下图） 输出：true
解释：链表中存在一个环
```

#### 思路解读

一个环形链表的基本修养，是能够让遍历它的游标回到原点：

从 flag 出发，只要我能够再回到 flag 处，那么就意味着，我正在遍历一个环形链表。

#### 编码实现

```js
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
```

## 环形链表衍生问题——定位环的起点

> 真题描述：给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回 null。

#### 思路解读

我们试想如果从头开始遍历一个链表，假如途中进入了一个环，那么首先被打上 flag 标签的其实就是环的起点。待我们遍历完这个环时，即便环上所有的结点都已经被立了 flag，但起点处的 flag 一定最先被我们定位到。因此，我们只需要在第一次发现 flag 已存在时，将对应的结点返回即可

#### 编码实现

```js
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
```

## 快慢指针的思路

定义慢指针 slow，快指针 fast。两者齐头并进， slow 一次走一步、fast 一次 走两步。这样如果它们是在一个有环的链表里移动，一定有相遇的时刻。这个原理证明起来也比较简单：我们假设移动的次数为 t，slow 移动的路程就是t，fast 移动的路程为2t，假如环的长度为 s，那么当下面这个条件：

```
2t - t = s
```

也就是

```
t = s
```

满足时，slow 和 fast 就一定会相遇。反之，如果两者没有相遇，同时 fast 遍历到了链表的末尾，发现 next 指针指向 null，则链表中不存在环。

#### 编码实现

```js
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
```
