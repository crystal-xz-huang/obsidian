# 2.3 Elementary comparison sorting algorithms

## 2.3.1 Bubble Sort

**Algorithm:**
1. For each pair of adjacent elements, compare them and swap if they are out of order (i.e. if $A[i] > A[i+1]$).  
2. Repeat until no swaps are performed in an entire pass.  

**Correctness:**  
This algorithm is correct because:
- The first pass finds the largest element and stores it in $A[n]$.  
- Each subsequent pass fixes the next largest element.  
- After at most $n$ passes, the algorithm must terminate, with all $n$ elements correctly positioned.  

**Time complexity:**  
- Best case: $O(n)$ if the array is already sorted (we can early exit after the first pass).  
- Worst case: $O(n^2)$ if the array is reverse sorted, requiring $n$ passes totaling $$(n-1) + (n-2) + \dots + 2 + 1 = \frac{n(n-1)}{2}$$

 comparisons. 
- Average case: $O(n^2)$, since it is rare to fix several elements at once, so in most instances you will need close to $n$ passes.

**Remarks:**  
Bubble sort is generally slow for large arrays, and is only fast if the array is nearly sorted (i.e. very few passes are needed).

There are hardly any practical applications, but the logic of swapping adjacent elements in order to sort an array is useful in proving the correctness of certain greedy algorithms.

---

## 2.3.2 Selection Sort

**Algorithm:**
1. Perform a linear search to find the smallest element, and swap it with $A[1]$.  
2. Repeat on $A[2..n]$, and so on.  

**Correctness:**  
Each pass fixes one element in its final position.  

**Time complexity:**  
- $O(n^2)$ in all cases, as we must complete $n$ passes of the array, totalling $n(n-1)/2$ comparisons regardless of the input array.

**Remarks:**  
- Always slow for large arrays (in terms of comparisons).  
- May be useful on specialised hardware where swaps (i.e. writes) are more expensive than comparisons, because it is guaranteed to do no more than $n$ swaps.
- Also be used on list structures (like linked lists) for efficient add and remove operations:
	- *remove* the minimum element from the remainder of the list, and then *insert* it at the end of the values sorted so far 

While it is intuitive for humans sorting small arrays, e.g. a hand of cards, selection sort is always slow on large arrays when considered in terms of the number of comparisons. It could however be useful on specialised hardware where swaps (i.e. writes) are much more expensive than comparisons, because it is guaranteed to do no more than $n$ swaps.

---

## 2.3.3 Insertion Sort

**Algorithm:**
1. Make an empty linked list $B$, which will be kept in sorted order.
2. For each element of $A$:  
	- Compare it to elements of $B$ from back to front until its correct position is found.  
	- Insert it at that position.  
3. Copy the entries of $B$ back into $A$.  

**Correctness:**  
The algorithm builds the sorted array one element at a time.  

**Time complexity:** (similar to bubble sort)

- Best case: $O(n)$ if the array is already sorted.
- Worst case: $O(n^2)$ if the array is reverse sorted.
- Average case: $O(n^2)$.  

Space complexity is $O(n)$ in the described implementation, but can be improved to $O(1)$.  

**Remarks:**  
- Generally slow for large arrays.  
- Fast if the array is nearly sorted.  
- Often used as the **final step** of more complicated sorting algorithms for small subarrays.  

Insertion sort is generally slow for large arrays, and is fast only if the array is nearly sorted (i.e. very few comparisons are needed for each element of $A$). However, it is often used to sort small arrays as the last step of a more complicated sorting algorithm.

---

# 2.4 Advanced Comparison Sorting Algorithms

## 2.4.1 Heapsort

**Algorithm:**
1. Make a min-heap containing all elements of $A$.  
2. Pop the element at the top of the heap and write it to $A[1]$.  
3. Repeat, writing to $A[2], \dots, A[n]$.  

**Correctness:**  
This algorithm is correct because it builds the sorted array one item at a time, since the heap always keeps the smallest remaining value at the top.

**Time complexity:**  
- Heap construction takes **linear time**.  
- Each of the $n$ deletions takes $O(\log n)$.  
- Overall complexity: $O(n \log n)$ in all cases.  

The time complexity is O(n log n) in all cases, as the heap construction takes linear time, followed by n deletions from the heap, each in O(log n) time.

**Remarks:**  
Heapsort is essentially **selection sort** with logarithmic-time selection.  

---

## 2.4.2 Mergesort

**Algorithm:**
1. Recursively apply the algorithm to the first half and the second half of this subarray.  
2. Merge the two subarrays.  

**Remarks:**  
- Correctness and time complexity will be analysed in Lecture 2.  
- Like heapsort, mergesort achieves $O(n \log n)$ performance in all cases.  

---

## 2.4.3 Quicksort

**Algorithm:**
1. Designate the first element as the **pivot**.  
2. Rearrange the array so that all smaller elements are to the left of the pivot, and all larger elements are to its right.  
3. Recurse on the subarrays left and right of the pivot.  

**Correctness:**  
Can be proven by **induction on the length** of the array.  

**Complexity:**  
The second step (partitioning the array) can be done in O(n) without using additional memory (exercise: how?). However, the performance still greatly depends on the pivot used.

- Best case: pivot is always the **median**, giving $O(n \log n)$.  
- Worst case: pivot is always the minimum (or maximum), so one subarray is empty and the other has size n − 1; giving $O(n^2)$ - like selection sort.
- Average case: $O(n \log n)$.  

**Remarks:**  
- Quicksort is often the **fastest in practice** due to its small constant factor.  
- Poor pivot choices (worst case) are rare.  
- More sophisticated pivot strategies (e.g. **median of medians**) can guarantee $O(n \log n)$ worst case but with higher constants.  
- For guaranteed worst-case performance, prefer **heapsort** or **mergesort**.  

---

## 2.4.4 Efficient Comparison Sorts

A **comparison-based sorting algorithm** cannot perform better than $O(n \log n)$ in the worst case.  

**Proof:** 
To prove this, we observe that:
- There are $n!$ possible permutations of an array.  
- After $k$ comparisons, we can only distinguish between $2^k$ of them.  
- Therefore, the number of comparisons must be at least

$$
\log_2 (n!) = \log_2 (n \times (n-1) \times \dots \times 2 \times 1).
$$  

We can bound this as:  

$$
\log_2 (n!) \;\geq\; \log_2 \Big( n \times n \times \dots \times n \Big) 
= \log_2 \left( n^{n/2} \right) 
= \frac{n}{2} \log_2 n.
$$  

Thus,  

$$
\log_2 (n!) = \Omega(n \log n).
$$  

so the worst case complexity cannot be better than $O(n \log n)$.  

The worst-case time complexity of any comparison sort cannot beat $O(n \log n)$.  
