
/**
 * 取出堆顶元素
 * 入参是堆元素在数组里的索引范围，low表示下界，high表示上界
 * @param {*} low 
 * @param {*} high 
 */
function downHeap(low, high) {
  // 初始化 i 为当前结点，j 为当前结点的左孩子
  let i = low, j = i * 2 + 1
  // 当 j 不超过上界时，重复向下对比+交换的操作
  while (j <= high) {
    // 如果右孩子比左孩子更大，则用右孩子和根结点比较
    if (j + 1 <= high && heap[j + 1] > heap[j]) {
      j = j + 1
    }

    // 若当前结点比孩子结点小，则交换两者的位置，把较大的结点“拱上去”
    if (heap[i] < heap[j]) {
      // 交换位置
      const temp = heap[j]
      heap[j] = heap[i]
      heap[i] = temp

      // i 更新为被交换的孩子结点的索引
      i = j
      // j 更新为孩子结点的左孩子的索引
      j = j * 2 + 1
    } else {
      break
    }
  }
}

/**
 * 
 * @param {*} nums 
 * @param {*} k 
 */
const findKthLargest = function (nums, k) {
  // 将数组逆序
  const sorted = nums.sort((a, b) => a-b)
  // 取第k大的元素
  return sorted[sorted.length - k]
};
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 6))
