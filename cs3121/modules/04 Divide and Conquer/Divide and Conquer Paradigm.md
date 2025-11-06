---
categories:
  - "[[Divide and Conquer]]"
tags:
  - notes
  - topic/divide-and-conquer
status: open
---

# Divide and Conquer Paradigm

How do divide-and-conquer algorithms work?

- **Divide**: split up a large instance into smaller instances of the same type  
- **Conquer:** apply the same algorithm to recursively solve each small instance, <u>independently of each other</u>  
- **Combine:** synthesise the solution to the original instance from the solutions of the smaller instances  

Base cases are the smallest instances, where no further recursion is possible; usually straightforward.

##### Divide and Conquer vs Dynamic Programming

- Divide & Conquer solves problems by breaking them into **independent (non-overlapping)** subproblems, which are solved separately, and we combine them for the global solution.
- Dynamic Programming handles problems with **dependent (overlapping)** subproblems, which are solved in a specific order to get the final solution. 

Therefore, the solution tree of divide and conquer is more "tree-like":
![dynamic-programming](https://www.enjoyalgorithms.com/static/dynamic-programming-vs-divide-and-conquer-approach-cover-8370d03f8dd89394a242e910813c0801.svg)



## Proof of Correctness

How do we prove the correctness of divide-and-conquer algorithms?  
- By **(strong) induction on instance size**.
- If the base cases are solved correctly, **and** the combine step is correct, then instances of all sizes are solved correctly, by induction.

> [!example]
> In merge sort, the base cases are singleton subarrays, which are already sorted.  
> Assume that arrays of size up to $k$ are correctly sorted by merge sort. Then a subarray of size $k + 1$ is correctly sorted because:
> - its two constituent subarrays are correctly solved, by the earlier assumption, and  
> - the merge procedure correctly combined them into the desired sorted array (with justification, if this is not self-evident).

