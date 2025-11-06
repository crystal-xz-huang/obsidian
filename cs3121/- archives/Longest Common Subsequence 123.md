---
aliases:
  - Bounded knapsack
modules:
  - "[[mocs/Modules/Dynamic Programming|Module 3: Dynamic Programming]]"
categories:
  - "[[Knapsack Problem]]"
tags:
  - source/lecture
  - topic/dynamic-programming
  - topic/optimization
  - type/problem
---

# Longest Common Subsequence (LCS)


- Measure of how similar two strings/sequences are.
- Sequence Alignment
- [Longest Common Subsequence - LeetCode](https://leetcode.com/problems/longest-common-subsequence/description/)

## Problem

> [!problem]
> <b>Instance</b>: Given two sequences $A$ of length $n$ and $B$ of length $m$
> 
> $$A = \langle a_1, a_2, \ldots, a_n \rangle, \qquad B = \langle b_1, b_2, \ldots, b_m \rangle.$$
> 
> <b>Task</b>: Find the length of a **longest common subsequence (LCS)** of $A$ and $B$.

> [!definition]
> A sequence $s$ is a <u>subsequence</u> of another sequence $S$ if $s$ can be obtained by deleting some of the symbols of $S$ (while preserving the order of the remaining symbols).

> [!example]
> For example, consider: 
> 
> - S = ABAZDC
> - T = BACBAD
> 
> In this case, the LCS has length 4 and is the string ABAD.
> 
> **Sequence Alignment**. Another way to look at it is we are finding a 1-1 matching between some of the letters in S and some of the letters in T such that none of the edges in the matching cross each other.
> 
> ![[lcs-example-1.png|400]]
> 
> This type of problem comes up all the time in genomics: given two DNA fragments, the LCS gives information about what they have in common and the best way to line them up.

dynamic programming algorithm to find a longest common subsequence (LCS) between two comparable sequences in $O(nm)$ time and space, where $n$ and $m$ are the lengths of two input sequences.

<b>Notes:</b>
- The length of the LCS can be useful as a measurement of the similarity between two strings or sequence.
- Useful to score MCQ - gives the partial order between your sequence of answers and the correct answer.
- Applications in bioinformatics:
	- How similar are the genetic codes of two viruses?
	- Is one of them just a genetic mutation of the other?


## Solution

> [!solution]
> <b>Subproblems:</b>
> 
> For all $0 \le i \le n$ and all $0 \le j \le m$,  let $\operatorname{len}(i,j)$ be the length of the longest common subsequence of the truncated sequences  $A_i = \langle a_1, a_2, \ldots, a_i \rangle$ and $B_j = \langle b_1, b_2, \ldots, b_j \rangle$.
> 
> <b>Recurrence:</b> 
> 
> For all $i, j > 0$,
> $$
> \operatorname{len}(i,j) =
> \begin{cases}
> 1 + \operatorname{len}(i-1,j-1) & \text{if } a_i = b_j \\[6pt]
> \max\big[\operatorname{len}(i-1,j),\; \operatorname{len}(i,j-1)\big] & \text{otherwise.}
> \end{cases}
> $$
> 
> <b>Base cases:</b>  
> - for all $0 \le i \le n, \, \operatorname{len}(i,0) = 0$,  and
> - for all $0 \le j \le m, \, \operatorname{len}(0,j) = 0$.
> 
> <b>Order of computation:</b>  
> 
> Solve the subproblems in **lexicographic order** (increasing $i$, then increasing $j$) to guarantee that $\operatorname{len}(i-1,j)$, $\operatorname{len}(i,j-1)$, and $\operatorname{len}(i-1,j-1)$ are evaluated before their values are used in the calculation of $\operatorname{len}(i,j)$ — i.e. all dependencies are satisfied.
> 
> <b>Overall answer</b>: $\operatorname{len}(n,m)$.
> 
> <b>Time complexity:</b> $O(nm)$ subproblems taking $O(1)$ time each, for a total running time of $O(nm)$.

> [!summary]
> To find the LCS of $A_i$ and $B_j$, compare the last symbols $a_i$ and $b_j$  :
> - <b>Case 1:</b> $\boldsymbol{a_i = b_j}$
> 	- If they are equal, then the LCS of $A_{i-1}$ and $B_{j-1}$ is extended by one $a_i=b_j$. 
> 	- The length of the LCS in this case is $1 + \operatorname{len}(i-1,j-1)$. 
> - <b>Case 2:</b> $\boldsymbol{a_i \neq b_j}$
> 	- If they are not equal, then the <u>longest</u> among the two sequences $\operatorname{LCS}(A_i, \, B_{j-1})$ and $\operatorname{LCS}(X_{i-1}, \, Y_j)$, is taken.
> 	- The length of the LCS in this case is $\max\big[\operatorname{len}(i-1,j),\; \operatorname{len}(i,j-1)\big]$.
> 
> The base cases occur when either $A_i$ or $B_i$ is empty. If either $i=0$ and $j=0$, one of the sequences has length $0$, and so the LCS has length $0$.




<b>Brute Force</b> 

You can solve the LCS problem with a brute-force approach: enumerate all subsequences of $A$ and check each subsequence to see whether it is also a subsequence of $B$, keeping track of the longest subsequence you can find. Each subsequence of $A$ corresponds to a subset of the indices $\{1, 2, \dots, n\}$ of $A$. Because $A$ has $2^n$ subsequences, this takes exponential time, making it impractical for long sequences.

 

## Explanation

#### Step 1: Characterising a longest common subsequence

> [!abstract] Optimal Substructure
> An LCS of two sequences contains within it an LCS of prefixes of the two sequences.

A natural choice of subproblems considers ***prefixes*** of both sequences, say:

$$
A_i = \langle a_1, a_2, \ldots, a_i \rangle,\quad
B_j = \langle b_1, b_2, \ldots, b_j \rangle.
$$

<b>Case 1:</b> $\boldsymbol{a_i = b_j}$

If $a_i$ and $b_j$ are the same symbol (say $z$), then the LCS of $A_i$ and $B_j$ must end with that symbol. The LCS of $A_i$ and $B_j$ is formed by appending $z$ to the LCS for $A_{i−1}$ and $B_{j−1}$:

$$\operatorname{LCS}(A_i, B_j) = \operatorname{LCS}(A_{i-1}, B_{j-1}) + a_i$$

<b>Case 2:</b> $\boldsymbol{a_i \neq b_j}$

If $a_i$ and $b_j$ differ, then a common subsequence of $A_i$ and $B_j$ does not match both symbols at the current alignment, so we consider discarding each of these symbols in turn. 

In other words, the optimal alignment ignores either  $a_i$ or $b_j$ or both (it cannot use both of them).

- **Exclude aᵢ** — If the last symbol of $A_i$ is not in any common subsequence of $A_i$ and $B_j$, then we find the LCS between ${\color{cyan}A_{i-1}}$ and $B_j$.
- **Exclude bⱼ** — If the last symbol of $B_j$ is not in any common subsequence of $A$ and $B$, then we find the LCS between $A_i$ and ${\color{cyan}B_{j-1}}$.

Whichever of these two LCSs is longer is an LCS of $A_i$ and $B_j$. 


#### Step 2: A recursive solution

The optimal substructure implies that we need to consider either one or two subproblems when finding an LCS of $A = \langle a_1, a_2, \ldots, a_n \rangle$ and $B=\langle b_1, b_2, \ldots, b_m \rangle$. 

- If $a_n$ and $b_m$, we need to find an LCS of $A_{n-1}$ and $B_{m-1}$. Appending $a_n=b_m$ to this LCS yields an LCS of $A$ and $B$.
- If $a_n \neq b_m$, then we have to solve two subproblems:
	- Find an LCS of $A_{n-1}$ and $B$, and
	- Find an LCS of $A$ and $B_{m-1}$. 
	- The longest of the two is the LCS of $A$ and $B$. 

- Because these cases exhaust all possibilities, one of the optimal subproblem solutions must appear within an LCS of $A$ and $B$.
- The LCS problem has the **overlapping-subproblems property**. To find an LCS of $A$ and $B$, you might need to find the LCSs of $A$ and $B_{m-1}$ and of $A_{n-1}$ and $B$. But each of the subproblems has the subsubproblem of finding an LCS of $A_{n-1}$ and $B_{m-1}$.



> [!function] Dynamic Programming Recurrence
> Let $\operatorname{len}(i,j)$ be the length of the LCS of the prefixes $A_i$ and $B_j$. 
> 
> For all $1 \leq i \leq n$ and $1 \leq j \leq m$, 
> 
> $$
> \operatorname{len}(i,j) =
> \begin{cases}
> 0 & \text{if } i = 0 \text{ or } j=0, \\[6pt]
> 1 + \operatorname{len}(i-1,j-1) & \text{if } a_i = b_j, \\[6pt]
> \max\big[\operatorname{len}(i-1,j), \; \operatorname{len}(i,j-1)\big] & \text{if } a_i \neq b_j.
> \end{cases}
>$$


#### Step 3: Computing the length of an LCS

> [!function] Dynamic Programming Recurrence
> Let $\operatorname{len}(i,j)$ be the length of the LCS of the prefixes $A_i$ and $B_j$. 
> 
> For all $1 \leq i \leq n$ and $1 \leq j \leq m$, 
> 
> $$
> \operatorname{len}(i,j) =
> \begin{cases}
> 0 & \text{if } i = 0 \text{ or } j=0, \\[6pt]
> 1 + \operatorname{len}(i-1,j-1) & \text{if } a_i = b_j, \\[6pt]
> \max\big[\operatorname{len}(i-1,j), \; \operatorname{len}(i,j-1)\big] & \text{if } a_i \neq b_j.
> \end{cases}
>$$

Each state $(i,j)$ depends on:
- $(i-1,j)$ → the value directly **above**,
- $(i,j-1)$ → the value directly **to the left**, and
- $(i-1,j-1)$ → the value **diagonally up-left**.

|Arrow|Meaning|Case|
|---|---|---|
|**Diagonal ↖**|( x_i = y_j ), so we included this symbol → ( \text{LCS}(i,j) = \text{LCS}(i-1,j-1)+1 )|Match|
|**Up ↑**|Took value from ( (i-1,j) ), meaning we ignored ( x_i )|( x_i ) not in LCS|
|**Left ←**|Took value from ( (i,j-1) ), meaning we ignored ( y_j )|( y_j ) not in LCS|



---

Let $\operatorname{len}(i,j)$ be the length of the LCS of the prefixes $A_i$ and $B_j$. 

For all $1 \leq i \leq n$ and $1 \leq j \leq m$, 

$$
c[i,j] =
\begin{cases}
0 & \text{if } i = 0 \text{ or } j=0, \\[6pt]
c[i-1,j-1] + 1& \text{if } x_i = y_j, \\[6pt]
\max\big(c[i-1,j], \; c[i,j-1]\big) & \text{if } x_i \neq y_j.
\end{cases}
$$

1. If `Xm == Yn` then this is a match and solve sub-sequence of `Xm-1` and `Yn-1`, appending this symbol.
2. If `Xm != Yn` then:
    1. Solve sub-sequence of `Xm-1` and `Y`
    2. Solve sub-sequence of `X` and `Yn-1`


$$
\operatorname{b}[i,j] =
\begin{cases}
↖ & \text{if } x_i = y_j, \\[6pt]
↑ & \text{if } x_i = y_j, \\[6pt]
\operatorname{c}[i-1,j-1] + 1 & \text{if } a_i = b_j, \\[6pt]
\max\big[\operatorname{c}[i-1,j], \; \operatorname{c}[i,j-1]\big] & \text{if } a_i \neq b_j.
\end{cases}
$$




For a subproblem $(i, j)$, its entry in the table tells us what choice was made to obtain the optimal value:

1. If `L[i] = L[j]` then we used the value at `L[i-1, j-1]`
2. If `L[i] != L[j]` then 
	1. If `L[i-1, j] >= L[i, j-1]` then 
	2. Else 

<b>Dependencies:</b> Each entry $[i, j]$ depends only on its three neighbouring entries:

| Arrow          | Case             | Description                                                                           |
| -------------- | ---------------- | --------------------------------------------------------------------------------- |
| **Diagonal ↖** | $x_i = y_1$       | Both $x_i = y_j$ match so we append this symbol to the LCS of $X_{i-1}$ and $Y_{j-1}$ at `[i-1, j-1]` |
| **Up ↑**       | $x_i$ not in LCS | Took value from `[i-1, j]`, meaning we ignored $x_i$                               |
| **Left ←**     | $y_j$ not in LCS | Took value from `[i, j-1]`, meaning we ignored $y_j$                               |



- $[i-1,j]$ → the value directly **above**,
- $[i,j-1]$ → the value directly to the **left**, and
- $[i-1,j-1]$ → the value **diagonally up-left**.

<b>Evaluation order:</b> If we fill this array in standard **row-major** order—row by row from top down, each row from left to right—then whenever we reach an entry in the array, all the entries it depends on are already available.

![[lcs-evaluation-order.png|500]]

```
(i,j)
┌───┬───┬───┬───┐
│00 │01 │02 │03 │ → fill left to right
├───┼───┼───┼───┤
│10 │11 │12 │13 │
├───┼───┼───┼───┤
│20 │21 │22 │23 │
└───┴───┴───┴───┘
↓ next row
```

![[lcs-pseudocode.png]]





1. If $a_n = b_m$ then this is a match and solve sub-sequence of  $A_{n-1}$ and $B_{m-1}$
2. 

For the bottom-up implementation, we can construct a table of values storing the solutions to `L[i, j]`. Each subproblem depends on the subproblems that are one character shorter, so we should solve them in increasing order of lengths. So, we can just do two loops (over values of $i$ and $j$) , filling in the LCS using these rules.

- 2D matrix of size (n+1) x (m+1), where m and n are the lengths of sequences A and B respectively. 
- Allow for 0 as an index, so `L[0,k] = 0` and `L[k,0]=0`, to indicate that the null part of A or B has no match with the other.
- Fill the table in a **bottom-up** manner, starting from the end of both sequences and moving towards the beginning.


```java
function LCSLength(A[1..n], B[1..m])
    // Create a 2D matrix 
    let L[0..n, 0..m] be a new array
    
    // Initialize the first row and column to 0
    for i from 0 to n do
        L[i, 0] := 0
    for j from 0 to m do
        L[0, j] := 0

    // Build L in a bottom-up manner
    for i from 1 to n do // ↓ next row after row j is filled
        for j from 1 to m do // →  fill row j left to right
            if A[i] == B[j] then
                L[i, j] := L[i-1, j-1] + 1
            else
                L[i, j] := max(L[i-1, j], L[i, j-1])
                
    // Final answer is at the bottom-right cell
    return L[n, m]
```




> [!time] Analysis
> - Two nested loops:
> 	- The outer one iterates `n` times
> 	- The inner one iterates `m` times
> 	- A constant amount of work is done inside each iteration of the inner loop
> 	- Thus, the total running time is `O(nm)`


![Longest_Common_Subsequence_DP](https://www.algotree.org/images/Longest_Common_Subsequence_DP.svg)



#### Step 4: Constructing an LCS






## Proof of Correctness

<b>Theorem (Optimal substructure of an LCS)</b>

Let $A = \langle a_1, a_2, \ldots, a_n \rangle$ and $B = \langle b_1, b_2, \ldots, b_m \rangle$ be sequences, and let $Z = \langle z_1, z_2, \ldots, z_k \rangle$ be any LCS of $A$ and $B$. 

1. If $a_n = b_m$, then $z_k = a_n = b_m$ and $Z_{k-1}$ is an LCS of $A_{n-1}$ and $B_{m-1}$.
2. If $a_n \neq b_m$ and $z_k \neq a_n$, then $Z$ is an LCS of $A_{n-1}$ and $B$.
3. If $a_n \neq b_m$ and $z_k \neq b_m$, then $Z$ is an LCS of $A$ and $B_{m-1}$.

<b>Proof</b>
**(1)** If $z_k \neq a_n$, then we could append $a_n = b_m$ to $Z$ to obtain a common subsequence of $A$ and $B$ of length $k+1$, contradicting the supposition that $Z$ is a *longest* common subsequence of $A$ and $B$. Thus, we must have $z_k = a_n = b_m$. 

Now, the prefix $Z_{k-1}$ is a length-$(k-1)$ common subsequence of $A_{n-1}$ and $B_{m-1}$. We wish to show that it is an LCS. Suppose, for the purpose of contradiction, that there exists a common subsequence $W$ of $A_{n-1}$ and $B_{m-1}$ with length greater than $k-1$. Then, appending $a_n = b_m$ to $W$ produces a common subsequence of $A$ and $B$ whose length is greater than $k$, which is a contradiction.

**(2)** If $z_k \neq a_n$, then $Z$ is a common subsequence of $A_{n-1}$ and $B$. If there were a common subsequence $W$ of $A_{n-1}$ and $B$ with length greater than $k$, then $W$ would also be a common subsequence of $A_n$ and $B$, contradicting the assumption that $Z$ is an LCS of $A$ and $B$. 

**(3)** The proof is symmetric to (2): if $a_n \neq b_m$ and $z_k \neq b_m$ then $Z$ is an LCS of A and $B_{m-1}$.

# Appendix

## Applications

### DNA Sequence Alignment

DNA sequences can be viewed as strings of A, C, G, and T characters, which represent nucleotides.

Finding the similarities between two DNA sequences is an important computation performed in bioinformatics.

For instance, when comparing the DNA of different organisms, such alignments can highlight the locations where those organisms have identical DNA patterns.

Finding the best alignment between two DNA strings involves minimizing the number of changes to convert one string to the other.




# References and Further Reading

- [C7S3_CommonSubsequence](https://www.audiolabs-erlangen.de/resources/MIR/FMP/C7/C7S3_CommonSubsequence.html)