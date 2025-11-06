# Definitions

## Sequences

> [!def] Sequence
> <b>Sequence</b> is an **ordered** list of elements, where order matters and **duplicates are allowed**:
>
> $$a_1, a_2, \ldots, a_n.$$
>
> (Here we use the shorthand of omitting the angle brackets, when denoting a sequence.)
>
> Each $a_i$ is an element with a fixed index $i$ (so each element is ordered by indexes).
> <b><u>Length</u></b> of a sequence is number of elements in the list.

> $A = a_1, \ldots ,a_n$ is the shorthand of $\langle A = a_1, \ldots ,a_n \rangle$ 

> [!caution] Sequence vs Set
> In a sequence, order matters so $[ 3, 1, 4, 2] \neq  [1, 2, 3, 4 ]$.
> This is opposed to a set where $\{ 3, 1, 4, 2 \} = \{1, 2, 3, 4 \}$.

> [!caution] Sequence vs String
> - $A = a_1 \ldots a_n$ denotes $A$ to be the **concatenation** of characters $a_1 \ldots a_n$ (==string==)
> - $A = (a_1, \ldots ,a_n)$ or $A = a_1, \ldots ,a_n$ denotes $A$ to be the **sequence (ordered tuple or list)** of elements $a_1 \ldots a_n$ instead (==ordered sequence==)

---

## Prefix of a sequence

> [!def] Prefix of a sequence
> Given sequence $$A = \langle a_1, a_2, \ldots, a_n \rangle$$ the $i$th prefix of $A$ (prefix of length $i$) is defined for $i = 0, 1, \dots, n$, as $$A_i= \langle a_1, a_2, \ldots, a_i \rangle.$$

For example, if $A = \langle A, B, C, B, D, A, B \rangle$, then $A_4 = \langle A, B, C, B \rangle$ and $A_0$ is the empty sequence.

> [!def] Prefix of a string
> Given string $$A = a_1 \ldots a_n$$ the *prefix* of length $i$ (the first $i$ characters of $A$) is written as $$A[1..i] = a_1 \ldots a_i.$$ 
> 
> A prefix of string $S$ is a substring of $S$ that occurs at the start $S$.

---

## Subsequences

Formally, given a sequence $X = \langle x_1, x_2, \ldots, x_m \rangle$, another sequence $Z =\langle z_1, z_2, \ldots, z_k \rangle$ is a **subsequence** of $X$ if there exists a strictly increasing sequence $\langle i_1, i_2, \ldots, i_k \rangle$ of indices of $X$ such that for all  $j = 1,2,...k,$ we have $x_{i_j} = z_j$. 

For example, $Z = \langle B, C, D, B \rangle$ is a subsequence of $X = \langle A, B, C, B, D, A, B \rangle$ with corresponding index sequence $\langle 2, 3, 5, 7 \rangle$. 

> [!definition]
> A sequence $s$ is a <b>subsequence</b> of another sequence $S$ if $s$ can be obtained by deleting some of the symbols of $S$ (while preserving the order of the remaining symbols).

> [!def] Subsequence
> $\langle a_{i_1}, \ldots, a_{i_k}\rangle$ is a <b>subsequence</b> of $\langle a_1, a_2, \ldots, a_n \rangle$ if $1 ≤ i_1 < i_2 < … < i_k ≤ n$.

> [!def] Subsequence
> Given two sequences  
> $$
> X = \langle x_1, x_2, \ldots, x_m \rangle
> \quad \text{and} \quad
> Z = \langle z_1, z_2, \ldots, z_k \rangle,
> $$  
> we say that $Z$ is a *subsequence* of $X$ if there exists a strictly increasing sequence of $k$ indices  
> $$
> \langle i_1, i_2, \ldots, i_k \rangle
> \quad (1 \le i_1 < i_2 < \cdots < i_k \le m)
> $$  
> such that  
> $$
> Z = \langle x_{i_1}, x_{i_2}, \ldots, x_{i_k} \rangle .
> $$  

> [!definition]
> Given a sequence  $X$
> 
> $$X = \langle x_1, x_2, \ldots, x_n \rangle,$$
> 
> and a sequence $Z$ of length $k$
> 
> $$Z = \langle z_1, z_2, \ldots, z_k \rangle$$
> 
> $Z$ is a *subsequence* of $X$ if there exists a *strictly increasing* sequence of indices of $X$
> 
> $$\langle i_1, i_2, \ldots, i_k \rangle, \quad i_1 < i_2 < \dots < i_k$$
> 
> such that 
> 
> $$x_{i_j} = z_j \quad \text{for all } j = 1, 2, \ldots, k.$$
> 
> In other words, all the elements of $Z$ appear *in the same order* as they appear in $X$ (but not necessarily consecutively).

> [!example]
> Given a sequence $X = \langle A, B, C, B, D, A, B \rangle$.
> One subsequence is $Z = \langle B, C, D, B \rangle$ with corresponding indices $\langle 2, 3, 5, 7 \rangle$. 


> [!NOTE]
> A subsequence of a given sequence is just the given sequence with 0 or more elements left out. 
> 
> That is, we can form a subsequence of A by deleting some of the elements in A without disturbing the relative positions of the remaining elements.  
> 
> For instance, the sequence of positive even integers $(2, 4, 6, …)$ is a subsequence of the positive integers $(1, 2, 3, …)$. The relative positions are preserved


## Increasing and decreasing 

> [!definition]
> A sequence is <b>increasing</b> if $a_1 < a_2 < \ldots < a_n.$ 
> It is <b>non-decreasing</b> if $a_1 \leq a_2 \leq \ldots \leq a_n.$  
> 
> Similarly a sequence is <b>decreasing</b> if $a_1 > a_2 > \ldots > a_n.$
> It is <b>non-increasing</b> if $a_1 \geq a_2 \geq \ldots \geq a_n.$ 

The terms **nondecreasing** and **nonincreasing** are often used in place of *increasing* and *decreasing* in order to avoid any possible confusion with *strictly increasing* and *strictly decreasing*, respectively.

| Term                | Equivalent    | Inequality        | Explanation                                                                |
| ------------------- | ------------- | ----------------- | -------------------------------------------------------------------------- |
| Increasing<br>      | Nondecreasing | $a_{n+1} \ge a_n$ | Each consecutive term is greater than or equal (`≥`) to the one before it. |
| Strictly increasing | Increasing    | $a_{n+1} > a_n$   | Each consecutive term is strictly greater than (`>`) the previous term.    |
| Decreasing          | Nonincreasing | $a_{n+1} \le a_n$ | Each consecutive term is less than or equal (`≤`) to the previous one.     |
| Strictly decreasing | Decreasing    | $a_{n+1} < a_n$   | Each consecutive term is strictly less than (`<`) to the previous one.     |


> [!example]
> - Sequence: <b>6, 3, 5, 2, 7, 8, 1, 9</b>
> - Increasing sequence: <b>3, 5, 9, 17, 54</b>
> - Decreasing sequence: <b>34, 21, 7, 5, 1</b>
> ---
> - Subsequence of the first sequence: <b>5, 2, 1</b> (relative order is preserved: 6, 3, **5**, **2**, 7, 8, **1**, 9)
> - Increasing subsequence of the first sequence: <b>2, 7, 9</b> (since 6, 3, 5, **2**, **7**, 8, 1, **9**)
> - Decreasing subsequence of the first sequence: <b>6, 3, 1</b>

