# 2.1 Data Structures

Each data structure described below is an abstract data type (ADT). Any type of data (e.g. integers, floating-point numbers, strings) can be stored in one of these data structures (subject to some restrictions).  

---

## 2.1.1 Array

An array stores $n$ items with consecutive indices. In this course, we use the convention that indices are numbered $1, \dots, n$ (rather than $0, \dots, n-1$).  

We denote:
- the entire array by $A : [3,1,2,1,9,1,0,1]$,  
- a subarray by $A[3..6] : [2, 1, 9, 1]$, and  
- an array element by $A[5] = 9$.  

In this course, we will only talk about *static arrays*, i.e. arrays of fixed size.  

Array operations:
- **Random access** takes $O(1)$: given an index $i$, we can directly access and modify the associated element $A[i]$.  
- **Insertion or deletion** takes $O(n)$ as we need to recreate the array.  
- Without special structure, **search** takes $O(n)$ in the worst case, as we may need to check every element of the array.  

---

## 2.1.2 Linked List

A linked list stores items, each with a link to the next item.  
In a *doubly linked list*, each item also includes a link to the previous item.  

We will discuss only doubly linked lists unless specified otherwise, as we aren’t concerned by the $2 \times$ overhead since it is only a small constant factor.

Linked list operations:
- **Accessing the next or previous item** takes $O(1)$ by following the relevant link.  
- **Random access** takes $O(n)$ in the worst case, as we need to follow links one at a time until we reach the desired index.  
- **Insertion and deletion** from a designated position both take $O(1)$, as we only need to modify up to four links.  
- **Search** again takes $O(n)$ in the worst case.  

---

## 2.1.3 Stack

A stack stores items in **LIFO** (last in, first out) order.  

Stack operations:
- Accessing the **top of the stack** takes $O(1)$.  
- **Insertion to and deletion** from the top of the stack take $O(1)$, but <u>we cannot insert or delete at other positions</u>.  

---

## 2.1.4 Queue

A queue stores items in **FIFO** (first in, first out) order.  

Queue operations:
- Accessing the **front of the queue** takes $O(1)$.  
- **Insertion to the back** and **deletion from the front** of the queue take $O(1)$, but <u>we cannot insert or delete at other positions</u>.  

---

## 2.1.5 Deque

A deque (double-ended queue) allows us to manipulate both the front and back of the list, combining features of both stacks and queues.  

Deque operations:
- Accessing the **front or back of the deque** takes $O(1)$.  
- Insertion to and deletion from the **front or back of the deque** takes $O(1)$, but <u>we cannot insert or delete at other positions.</u> 

---

## 2.1.6 Advanced Data Structures

Heaps, binary search trees, frequency tables, and hash tables will be discussed in the second lecture.  

## Binary Heaps

Store items in a <u>complete</u> binary tree[^1], with every parent <u>all</u> its children (this is a max-heap). Replace $\geq$ with $\leq$ for a min-heap.

Often used to implement a **priority queue**.
Used in algorithms like **Dijkstra’s algorithm**.

Heap operations:
- Build heap: $O(n)$  
- Find maximum: $O(1)$  
- Delete maximum: $O(\log n)$  
- Insert: $O(\log n)$  

|                                            ![\|400](https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Max-Heap.svg/2560px-Max-Heap.svg.png)                                            |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Heaps can be represented by an array `A[1…n]`, where the tree root is at index 1 and each node _i_ has its children at next two indices *2i* and *2i+1*, and its parent at index *floor(i/2)*. |

<u>Heap vs BST</u>
- **BST**: left child ≤ parent ≤ right child 
- **Heap**: parent ≥ both children (no relationship b/w left and right child)

The heap property "parent ≥ child" …
- Guarantees that the biggest element is found at the top.
- Recurse down any node in decreasing order. dsad
- But no guarantees to how the current node compares to other nodes on the <u>same level (i.e., left vs right child)</u> since there are no relationships b/w sibling nodes.

---

## Binary Search Trees (BSTs)

Store comparable keys (or key–value pairs) in a binary tree, where each node has at most two children, designated as <u>left</u> and <u>right</u>.

Each node’s key is greater than all keys in its left subtree and less than all keys in its right subtree.

BST operations:
- Search: O(h) 
- Insert/Delete: O(h) 

Complexity:
Let $h$ be the **height** of the tree (the length of the longest root-to-leaf path). 
- In the best case, $h \approx \log_2 n$ (balanced tree).  
- In the worst case, $h \approx n$ (e.g. inserting sorted keys).  

Self-balancing BSTs (e.g. AVL tree, Red–Black tree, B-tree) perform **rotations** to maintain certain invariants, in order to guarantee $h = O(\log n)$. **Therefore all operations run in $O(\log n)$ time.

---

## Frequency Tables  

To *count occurrences* of integers from $1$ to $m$, use a zero-initialised array of frequencies and increment every time the value is encountered.

For *count the occurences* of other items (e.g. strings), first map them to integers $1 \dots m$, then count the occurences of the mapped values.

> [!example]
> **Problem:** 
> Given an array $A$ of $n-1$ elements, each number from $1$ to $n$ appears exactly once, except for one number which is missing. Find the missing number.  
> 
> **Idea:** 
> Use a frequency array (counter) of size $n$. Record whether you’ve seen each possible value.
> Then scan to find the missing one.
> ⚠︎ This leads to a linear time, linear space algorithm.
> 
> **Challenge:** 
> How could you solve the problem in linear time and <u>asymptotically less than linear</u> space?
> 
> > [!solution]-
> > Sum up the numbers 1 to n i.e. $S = \sum_{i=1}^{n-1} A[i]$.
> > Whatever is missing from the target sum is the answer.
> > O(n) time to compute the sum. O(1) space (no data structure used; just compute the sum).
> 

---

## Hash Tables  

Store <u>values</u> indexed by <u>keys</u>. A **hash function** maps keys to indices in a <u>fixed-size</u> table. 
Ideally no two keys map to the same index.

Hash table operations (expected – very few collisions):
- Search: $O(1)$ … for the value associated to a given key
- Update: $O(1)$ … the value associated to a given key
- Insert/Delete: $O(1)$

Hash table operations (worst case – multiple collisions):
- Search: $O(n)$  
- Update: $O(n)$  
- Insert/Delete: $O(n)$ 

> [!caution] Collisions in Hash Tables
> A situation where two (or more) keys have the same hash value is called a **collision**.  
> 
> When mapping from a large key space to a small table, it is impossible to completely avoid collisions. So collisions are inevitable.
> 
> There are several ways to manage collisions – for example, **separate chaining** stores a linked list of all colliding key–value pairs at each index of the hash table.  

> [!danger]
> **Avoid hash tables (in this course)!** The expected O(1) time is an assumption – so unless we do some very sophisticated maths, there isn't a good way of getting out of the worst case.

[^1]: Complete Binary Tree: a binary tree in which every level, _except possibly the last_, is completely filled, and all nodes in the last level are as far left as possible (filled from left to right). 