---
modules:
  - "[[Divide and Conquer]]"
tags:
  - topic/divide-and-conquer
---

> [!problem] Identity Element
> - Let $A[1..n]$ be a ==sorted== array of $n$ ==distinct== integers.  
> - Some of these integers may be positive, negative, or zero.  
> - Design an ==$O(\log n)$== algorithm to decide if there exists some index $i$ such that $A[i] = i$.
> 
> **Exercise.** Further, suppose we now know that $A[1] > 0$. Answer the same problem in $O(1)$ time.

> [!Hint]-
> **Hint.** Consider a new array $B$ such that $B[i] = A[i] - i$, but don’t actually construct it!
> - B has n elements so it takes O(n) to construct B. 
> - Therefore we can't construct B.

- $O(\log n)$ is same complexity as binary search. 
- 2 constraints to use binary search (and prove that we can apply binsearch):
	1. The search space is monotonic or sorted
	2. Define the interval over which you can conduct the binary search


A is **sorted** and **distinct** (no two elements are equal), meaning A is [[Increasing and decreasing#Strictly Increasing (<)|strictly increasing]]

$$
\begin{align}
A[1] < A[2] < \dots < A[n]\\[6pt]
A[i+1] > A[i]
\end{align}
$$

If $A[i] = i$ then $A[i] - i = 0$.

Finding $i$ is equivalent to finding a a **zero** of the function $A[i] - i = 0$.

Define a function $B(i) = A[i] - i$. 

If we apply this function to every integer in A, then the resultant sequence is also monotonic/sorted.

So we can use binary search with $B(i)$ to find the element in A where $B(i) = 0$.

If $B(i) > 0$ then we look in the left half. If $B(i) < 0$ then we look in the right half. Otherwise $B(i) = 0$ and we have found our answer.

This is just the standard binary search which runs in $O(\log n)$ time.

BUT WE NEED TO PROVE THAT WE CAN APPLY BINARY SEARCH!

Define $B[i] = A[i] - i$.

Goal: 
1. Prove that $B[i+1] > B[i]$
2. Define the search interval 

Need to include these two things to use binary search.

... see seminar solutions for proof

Conclude that $B[i + 1] \geq B[i]$. ⇒ monotonicity justified

$B[i] = 0$ is $A[i] = i$, since $B[i] = A[i] - i$. ⇒ justify search interval

Hence we can use binary search over the ==interval $1 \leq i \leq n$== to find if there is an $i$ where ==$B[i] = 0$==. ⇒ define search interval as $1 \leq i \leq n$











