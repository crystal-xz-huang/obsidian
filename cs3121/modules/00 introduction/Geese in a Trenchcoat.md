---
aliases:
  - "Example Problem: Geese in a Trenchcoat"
status: open
tags:
  - module/0
  - examples/problem
files:
  - "[[00-introduction.pdf]]"
---
# Problem: Geese in a Trenchcoat 

There are $n$ geese in a gaggle, of heights $h_1, \ldots, h_n$. Each $h_i$ is a positive integer.  

They need to select two of them to wear a trenchcoat together, with one standing on top of the other. The trenchcoat has a fixed size $H$, so it will only fit if the two geese have total height exactly equal to $H$.  

Design an algorithm which runs in $O(n \log n)$ time and determines whether there is a pair of geese who can wear the trenchcoat together.

> [!abstraction]-
> Design an algorithm which runs in $O(n \log n)$ time and, given an array $h$ consisting of $n$ positive integers and a positive integer $T$ , determines whether there are two indices $i < j$ such that $H[i] + H[j] = T$.

> [!solution]- 
> Sort the geese in ascending order of height, using merge sort. For each goose $i$, a matching goose must have height $T − h_i$ . Since the heights are now nondecreasing, we can search for this required length using binary search, and answer yes if it is found.
> 
> - Time complexity: $O(n \log n)$

---

# Solution Article

*See also*: This is a well-known problem called [[Two Sum]]!

> [!example] Problem
> There are $n$ geese in a gaggle, of heights $h_1, \ldots, h_n$. Each $h_i$ is a positive integer.  
> 
> They need to select two of them to wear a trenchcoat together, with one standing on top of the other. The trenchcoat has a fixed size $H$, so it will only fit if the two geese have total height exactly equal to $H$.  
> 
> Design an algorithm which runs in $O(n \log n)$ time and determines whether there is a pair of geese who can wear the trenchcoat together.

## Attempt 1. Brute Force

### Intuition

If I fix one goose's height, say `x`, then I can go through and check whether the other height, which is `H - x`, appears somewhere in the entire array.

### Algorithm

For each goose $i$, check whether a matching goose (whose height is $T − h_i$ ) exists, and answer yes if one is found.

- Time complexity: $O(n^2)$  

### Explanation

For each `x` in the array (of which there are `n`), we try to find its complement `target - x` by looping through the rest of the array which takes $O(n)$ time. Therefore, the time complexity is $O(n^2)$.

> [!quote] For each `i` (of which there are `n`), for each `j` (of which there are `n`), do something" is $O(n^2)$ iterations.

Even with early exit, the **worst-case** performance is still $O(n^2)$. So this is too slow. 

---

## Attempt 2. Sort

### Intuition

To improve from the previous algorithm:

- If we fix one geese, how can we find the other without checking every single geese?
- Can we change our array somehow so that this search becomes faster?

Sort the geese first. If the list is **sorted**, we know where to look for the other geese:

- If $h_i + h_j < H$, we should move forward (increase $j$ ) to get closer to the target height.
- If $h_i + h_j > H$, then we have overreached and we should move backwards (decrease $j$).

This reduces the search space from linear to logarithmic (binary search).

### Algorithm

Sort the geese in ascending order of height, using merge sort. For each goose $i$, a matching goose must have height $T − h_i$ . Since the heights are now nondecreasing, we can search for this required length using binary search, and answer yes if it is found.

### Complexity Analysis

**Time complexity**

1. Sorting the geese by height with merge sort is $O(n \log n)$.
2. For each goose, binary search for the complement:
	1. Outer loop: $n$ iterations
	2. Each binary search: $O(\log n)$
	3. Total for this phase: $O(n \log n)$

Total time: $O(n \log n)$ 

**Space complexity**

- Merge sort requires $O(n)$ auxiliary space.
- Binary search is $O(1)$ extra space.
- Overall: $O(n)$ space.