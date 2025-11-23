---
tags: [notes]
---

# Decision Problems

## Polynomial Time Algorithms


A (sequential) algorithm is **polynomial time** if for every input it terminates in polynomially many steps in the length of the input.

This means that there is a natural number $k$ (independent of the input) so that the algorithm terminates in 
$$T(n) = O(n^{k})$$
 steps, where $n$ is the length/size of the input.

Example
- Merge sort has worst-case running time $O(n \log n)$, and since $O(n \log n) \subseteq O(n^{2})$ it runs in polynomial time.
- Brute force algorithm for LIS (for each of the $2^{n}$ subsets of activities, check whether it is increasing, and update the max length) takes at least $n \cdot 2^{n}$ operations, so it is **not** $O(n^{k})$ for any integer $k$.

A runtime is **polynomial** if there exists some constant $k$ such that
$$T(n) = O(n^{k})$$
where $n$ is the *length* (the number of bits) of the **input**— not the *value* of the input size.

> [!definition] Length of Input: Integers
> The length of an **integer** $x$ is $\log_2(x)$.
> 

If input $x$ is an integer, then its length $|x|$ can be defined as the number of bits in the binary representation of $x$, i.e., $\lceil \log_{2} x \rceil \approx \log_{2} x$. 


> [!definition] Length of Input: Arrays
> The length of an **array** of length $n$ with integer entries $\le M$ is $n \log_{2} M$.  

- Each entry $A[i]$ contributes $\log_{2} A[i]$ bits, for a total of $\log_{2} A[1] + \ldots + \log_{2} A[n]$. 
- If each entry is at most $M$, then the array has at most $n \log_{2} M$ bits.
- A polynomial time algorithm therefore has running time polynomial in $n$ and $\log M$ since
$$\small
\begin{align}
T(n) &= O(n^{k})\\
&= O\big((n \log M)^k\big)\\
&= O\big(n^k (\log M)^k\big).
\end{align}
$$

Example
- The [[0-1 Knapsack]] and [[Integer Knapsack]] problems have input size $n \log C$ (given an array of $n$ integer weights each $\leq C$) but the standard DP algorithm runs in $O(n C)$.
- Note that $O(n C)$ is polynomial in the *value* of $C$ rather than its _bit-length_.
- Since $C =  2^{\log_{2} C}$ (by log identity), the DP algorithm c in $O(n \cdot 2^{\log C})$ time *exponential* in $\log C$ and polynomial in $n$. Hence, this is not a polynomial time algorithm.   
- Such algorithms are said to be **pseudopolynomial**.

**Length of Input: Weighted Graphs (example)**  

A (simple) weighted graph with positive integer edge weights $\le W$ is represented by:  
- <u>adjacency list</u>: for each vertex, store the list of incident edges together with binary encodings of their weights, or  
- <u>adjacency matrix</u>: for each pair of vertices $(v_{i}, v_{j})$, store the weight of the edge from $v_{i}$ to $v_{j}$ (or some default value to indicate a non-edge).

> [!definition] Length of Input: Weighted Graphs
> The length of a **weighted graph** $G = (V, E)$ with weights $\le W$ is  
> - $O(|E| \log W)$ when stored as an adjacency list,  
> - $O(|V|^{2} \log W)$ when stored as an adjacency matrix.  

If the graph is sparse $(|E| \ll |V|^{2})$, then the adjacency list might be much more concise.  
However, this choice will not affect whether our algorithm runs in polynomial time.


Example  
- In Module 4, we saw the maximum flow problem. There are $|E|$ edges, each with capacity up to C, so the size of the input is $O(|E| \log C)$.  
The Ford–Fulkerson algorithm runs in $O(|E||f|)$ time. Since the value of the maximum flow could be up to $|E||C|$, this is not a polynomial time algorithm.  
The Edmonds–Karp algorithm runs in $O(|V| \cdot |E|^{2})$ time. Since $|V| \le |E| + 1$, this is a polynomial time algorithm.  
In general, every precise description of the input without artificial redundancies will do.




