---
aliases:
  - Longest Increasing Subsequence (LIS)
modules:
  - "[[mocs/Modules/Dynamic Programming|Module 3: Dynamic Programming]]"
tags:
  - topic/dynamic-programming
  - examples
---

# Longest Increasing Subsequence (LIS)

> One Parameter, Linear Recurrence

> [!problem]
> Given a [[Sequences|sequence]] of $n$ real numbers $A[1..n]$. 
> The task is to find the [[Sequences#Increasing and decreasing|longest increasing subsequence]] in $A[1..n]$
> 
> Formally we look for the longest sequence of indices  $i_1, \dots i_k$  such that
>
>  $$i_1 < i_2 < \dots < i_k,\quad A[i_1] < A[i_2] < \dots < A[i_k]$$


There are 2 variations to this problem:

- Find the length of the longest increasing subsequence
- Find the length **and** the longest increasing subsequence itself.

> [!goal]
> Find an increasing subsequence of maximum length such that:
> 
> - the relative ordering of elements is preserved: $i_1 < i_2 < \dots < i_k$
> - each element is strictly greater than (>) the previous one:  $A[i_1] < A[i_2] < \dots < A[i_k]$
> - the subsequence has the maximal possible length among all increasing subsequences

---

## Finding the Length of the LIS

### Problem

> [!problem]
> <b>Instance</b>: a sequence of n real numbers $A[1..n]$.
> 
> <b>Task</b>: determine the length of a longest subsequence (not necessarily contiguous) in which the values in the subsequence are strictly increasing.

### Solution

|              |                                                               |
| ------------ | ------------------------------------------------------------- |
| Problem      | Find longest increasing subsequence in the entire array       |
| Subproblem   | Find longest increasing subsequence that ends at index `i`    |
| Recurrence   | `len(i) = 1 + max(len(j))` for all `j < i` with `A[j] < A[i]` |
| Final Answer | `max(len(i))` for all `i`                                     |

> [!solution]
> **Subproblems**
> 
> For each $1 ≤ i ≤ n$, let $len(i)$ be the maximum length of an increasing subsequence of $A[1..i]$ which ends with $A[i]$.
> 
> **Recurrence**
> 
> For $i > 1$,
>
> $$\text{len}(i) = 1 + \max_{\substack{j < i \\ A[j] < A[i]}} \text{len}(j)
> $$
>
> **Base case**
> 
> $\text{len}(1) = 1$
> 
> **Order of computation**
> 
> Solve subproblems in increasing order of $i$. 
> 
> **Overall answer**
> 
> The overall LIS is the best of those ending at some element, i.e., $\displaystyle \max_{1 \leq i \leq n} \text{len}(i).$
> 
> **Time complexity**
>
> $O(n)$ subproblems each taking $O(n)$, and overall answer calculated in $O(n)$ time, for a total running time of $O(n^2)$.

### Example

> [!goal]
> Find the length of the longest increasing subsequence in the array $A[1..n]$

Consider the following array:

| $i$     | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   |
| ------- | --- | --- | --- | --- | --- | --- | --- | --- |
| $A[i ]$ | 15  | 11  | 13  | 16  | 12  | 17  | 18  | 14  |

Examples of valid (but not longest) increasing subsequences:

- `[12, 14, 16]`
- `[15, 16, 17, 18]`

#### Subproblem

A natural choice for the subproblems is as follows: 

> For each $1 ≤ i ≤ n$, let $\text {len}(i)$ be the length of the longest increasing subsequence of $A[1..i]$.

However, it is not immediately obvious how to relate these subproblems to each other.

> [!explanation]+
> The recursion doesn’t have enough information to tell how subproblem `i−1` connects to subproblem `i`. 
> 
> We want to impose that our subsequence is increasing (and the longest).
> Therefore we need to know the last element of the previous subsequence (and its length).
> 
> If we define `len(i)` as "the length of the LIS among the first $i$ elements", the LIS of `A[1..i]` could be anywhere in the prefix, so we don't know _where it ended_ or _what its last element was_.
> 
> Therefore, we can't extend the subsequence from the previous one while guaranteeing that its still strictly increasing.

A more convenient specification is to let $\text {len}(i)$ be the length of the longest increasing subsequence of $A[1..i]$ <u>that includes</u> the last element $A[i]$.

> For each $1 ≤ i ≤ n$, let $\text {len}(i)$ be the length of the LIS of $A[1..i]$ which ends with $A[i].$ 

#### Recurrence

> [!citation|no-title]
> Note that the overall solution is recovered by taking the best of the answers to all the subproblems, i.e., the longest increasing subsequence ending at <u>any</u> index.
> 
> We will try to find $\text{len}(i)$ by extending the sequence which achieves $\text{len}(j)$ for some $j < i$.
> 
> Supposing we have already solved all of these earlier subproblems, we now look for all indices $\boxed{j < i}$ such that $\boxed{A[j] < A[i]}$ (strictly increasing). 
> 
> Among those we pick $m$ so that $\text{len}(m)$ is maximum, and extend that sequence with $A[i]$.
> 
> This forms the basis of our recurrence! 
> 
>The recurrence is not necessary if $i = 1$, as there are **no previous indices to consider**, so this is our **base case.**

To accomplish this task, we define an array  $\text{len}[1 \dots n]$ , where  $\text{len}[i]$  is the length of the LIS that ends at $A[i]$. 

We will compute this array gradually: first  $\text{len}[0]$ , then  $\text{len}[1]$ , and so on. After this array is computed, the answer to the problem will be the maximum value in the array  $\text{len}[1..n]$ .

Let the current index be  $i$ . We want to compute the value  $\text{len}[i]$ , and all previous values  $\text{len}[1], \dots, d[i]$  are already known. 

Then there are two options:

- $\text{len}[i] = 1$ : The required subsequence consists only of the element  $A[i]$ .    
- $\text{len}[i] > 1$ : The subsequence will end at  $A[i]$ , and right before it, there will be some number  $A[j]$  with  $j < i$  and  $A[j] < A[i]$ .

It's easy to see, that the subsequence ending in $A[j]$  will itself be one of the LIS that ends at index $j$.  The number $A[i]$   just extends that LIS by one number.

![[LIS-annotation.png|300]]

Therefore, we can just iterate over all  $j < i$  with  $A[j] < A[i]$ , and take the longest sequence that we get by appending  $A[i]$  to the LIS ending in  $A[j]$ . 

The LIS ending in  $A[j]$  has length  $\text{len}[j]$ , extending it by one gives the length  $\text{len}[j] + 1$ .

$$\text{len}[i] = \max_{\substack{j < i \\\\ A[j] < A[i]}} \left(\text{len}[j] + 1\right)$$

If we combine these two cases we get the final answer for  $\text{len}[i]$ :

$$\text{len}[i] = \max\left(1, \max_{\substack{j < i \\\\ A[j] < A[i]}} \left(\text{len}[j] + 1\right)\right)$$

> [!function] Recurrence Function
> For $\displaystyle i > 1, \; \text{len}(i) = 1 + \max_{\substack{j < i \\ A[j] < A[i]}} \text{len}(j)$


![[LIS-annotation-v2.png|400]]

### Proof of Optimality

#### Proof Outline

> [!idea]
> The idea is if we took a suboptimal solution ending at some earlier index $j$, then extending it with $i$ is no better or worse than taking the actual optimal solution ending at $i$.

Why does this produce optimal solutions to subproblems? We can use an inductive argument.

- We claim that if a sequence of indices $[…,m,i]$ is the LIS ending at index $i$, then omitting the last entry must leave a LIS ending at index $m$.

This claim is easily proven by contradiction:

- If there was a longer subsequence ending at index $m$, we could append index $i$ to that, making an even longer subsequence ending at index $i$.


![[LIS-proof.png|500]]


> [!citation|no-title]
> - We claim that if a sequence of indices $[…,m,i]$ is the LIS ending at index $i$, then omitting the last entry must leave a LIS ending at index $m$.
> 
> This claim is easily proven by contradiction:
> - If there was a longer subsequence ending at index $m$, we could append index $i$ to that, making an even longer subsequence ending at index $i$.


_Base case:_ Show that the statement holds for the smallest index $i=1$.

- Base cases are trivial.
- The only subsequence ending at $A[1]$ is the subsequence consisting only of $A[1]$.
- Therefore, the LIS must be $[A[1]]$.
- So $\text{len}(1) = 1$ is true.

_Inductive hypothesis:_ Assume that our statement holds for all **previous** indices for some index $i$.

Assume for all $j < i$, that $\text{len}(j)$ is the length of the LIS of $A[1..j]$ that ends at $A[j]$.

_Induction step:_ Prove that it is also true for the **current** index $i$.  

Show that $\text{len}(i)$ is the length of the LIS ending at $A[i]$.


If the LIS ending at index $i$ was NOT formed by extending the previous LIS ending at $m$, then we could use the same penultimate entry (m) but replace everything before with the actual LIS up to $m$, and append $i$ to it for an even longer increasing subsequence.

Theres no way to extend a suboptimal sequence by 1 to make an optimal sequence for some later entry. This means that its enough to keep LIS of each prior index, we don't need to keep track of suboptimal entries.

---

#### Proof

Let $D[i]$ be the length of the LIS of $[A[0], … , A[i]]$ that ends on $A[i]$. Prove why

$$D[i] = \max (\{D[j] + 1 \mid 0 ≤ j < i, A[j] < A[j]\} \cup \{1\}).$$

<b>Soln. 1.</b> 
Suppose that $D[i] = t$, for $t > 1$, so there is some subsequence indexed by  

$$
i_1 < i_2 < \cdots < i_t = i
$$

that is an LIS ending in position $i$.

Now consider the subsequence  

$$
i_1 < i_2 < \cdots < i_{t-1}.
$$

This is the longest subsequence that ends at $k = i_{t-1}$ — otherwise, if there were a longer subsequence ending at $k$, we could make a longer solution ending at $i$ just by adding $A[i]$ to that subsequence. Thus, $D[k] = t - 1$ for some $k \ge 0$, so there is some $k$ such that  

$$
D[k] + 1 = t = D[i].
$$

Since $D[i]$ is the value of the longest increasing subsequence ending at $i$, we should take the maximum over all possibilities for $k$, and this gives us

$$
D[i] = \max_{k < i} \{ D[k] + 1 \}.
$$

However, the above was only in the case that $t > 1$, so in order to account for the possibility that $t = 1$ (i.e., $A[j] > A[i]$ for all $j < i$), we also add a $1$ into the maximum, and this results in the expression on the problem statement.

---

<b>Soln. 2.</b> A more formal solution:

We will first show that $D[i] = \max ({L[j] + 1 \mid 0 ≤ j < i, A[j] < A[j]} ∪ {1})$, for all $i ≥ 1$.

_Base case:_ Show that the recurrence is true for index $1$.

Since $D[i]$ is the length of a LIS that ends on $A[i]$, let $i_1 < … < i_{D[i]}$ be that subsequence; notice that $i_{D[i]} = i$ since the sequence ends on $A[i]$.

_Inductive step:_ 

Let $m = i_{D[i]-1}$, and consider the sequence $i_1 < i_2 < \ldots < i_{D[i]-1}$ of length $D[i] - 1$ ending at $m$.

This is an increasing subsequence ending at $m$. Thus, $D[i] -1$ is at most $D[m]$, since $D[m]$ is the length of the longest such sequence, and this one has length $D[i]-1$. 

Since $m = i_{D[i]-1} < i_{D[i]} = i$ and $A[m] < A[i]$ (since the original sequence was increasing), this only gets larger when we maximise over all such $m$, so therefore

$$D[i] - 1 \leq D[m] \leq \max(D[m] \mid 0 ≤ m < i, A[m] < A[i]).$$

Now we go the other direction and show that $D[i] \geq \max ({D[m] + 1 \mid 0 ≤ m < i, A[m] < A[i]})$.
Suppose that $m$ is the index which maximises the right hand side, and suppose that

$$i_1 < \ldots < \ldots i_{D[m]}$$

is the corresponding sequence. Then the sequence

$$i_1 < \ldots < \ldots i_{D[m]}$$

is an increasing subsequence ending at $m$, with length $D[m] + 1$. The length of the longest one is at least as long as this, so

$$D[i] \geq D[m] + 1 = \max(D[m] + 1 \mid 0 ≤ m < i, A[m] < A[i]).$$

---

## Algorithm

### O(n^2) 

$O(n^2)$ algorithm:

```js
def LIS(array A of length n):
  	# Initialise an array D of length n full of 1's
	for i = 1, ..., n - 1:
    	for k in 0, ..., i - 1:
      		if A[k] < A[i]:
        	D[i] = max( D[i], D[k] + 1 )
  	return max(D)
```

Note: There is actually an $O(n \log n)$-time algorithm to find an LIS.

### O(n log n) 

---

## Extension: Restore the LIS

> [!citation|no-title]
> What if the problem asked for not only the length, but the entire longest increasing subsequence?
> 
> This is a common extension to such problems, and is easily handled.
> 
> In the ith slot of the table, alongside len(i) we also store the index m such that the optimal solution for index i extends the optimal solution for index m.
> 
> After all subproblems have been solved, the longest increasing subsequence can be recovered by backtracking through the table.
> 
> This contributes only a constant factor to the time and memory used by the algorithm.


To find the length of the subsequence **and** the subsequence itself, we modify our answer from the previous part to additionally store an array `P` (predicate) that we will compute alongside the array `D` (the array of lengths).

If `P[i] = k`, the interpretation is that the LIS ending at `i` had its second-to-last entry at `k`. 

> In other words, `P[i]` will be the second last element in the longest increasing subsequence ending in `i`. Therefore, `P[i]` is the same index at which `D[i]` (the maximum length) was obtained. This array `P` allows us to keep track of the predecessors.

After we are done computing the length of the LIS, we can follow the pointers in `P` **backwards** to recover the LIS itself, by backtracking through the indices and appending it to `P` until we reach the element with `D[i] = 1`. 

Then we can reverse P (since we built it backwards) to get the correct order of the LIS.

> [!tldr]
> `dp` is an array such that `dp[i]` is the smallest element that ends an increasing subsequence of length `i + 1`. Whenever we encounter a new element `e`, we binary search inside `dp` to find the largest index `i` such that `e` can end that subsequence. We then update `dp[i]` with `e`.
> 
> The length of the LIS is the same as the length of `dp`, as if `dp` has an index `i`, then it must have a subsequence of length `i+1`.


```js
def LIS(array A of length n):
	# Initialise an array D of length n full of 1's
	# Initialise an array P of length n full of None's
	for i = 1, ..., n - 1:
		for k in 0, ..., i - 1:
		if A[k] < A[i]:
			D[i] = max( D[i], D[k] + 1 )
			P[i] = k
	
	Find k so that D[k] is maximized
	ret = []
	current = k
	
	while current != None:
		ret.append(A[current])
		current = P[current]
	reverse ret
	
	return ret
```

```python
def lis_sequence(arr):
    n = len(arr)
    lis = [1] * n
    prev = [-1] * n  # To reconstruct the sequence

    # Compute optimized LIS values in bottom-up manner
    for i in range(1, n):
        for j in range(0, i):
            if arr[i] > arr[j] and lis[i] < lis[j] + 1:
                lis[i] = lis[j] + 1
                prev[i] = j

    # Find the index of the maximum value in lis[]
    max_index = 0
    max_lis = 0
    for i in range(n):
        if lis[i] > max_lis:
            max_lis = lis[i]
            max_index = i

    # Reconstruct the LIS sequence
    sequence = []
    while max_index != -1:
        sequence.append(arr[max_index])
        max_index = prev[max_index]

    sequence.reverse()  # The sequence is constructed backwards
    return sequence
```

# References & Further Reading

- [Longest increasing subsequence - Algorithms for Competitive Programming](https://cp-algorithms.com/dynamic_programming/longest_increasing_subsequence.html)