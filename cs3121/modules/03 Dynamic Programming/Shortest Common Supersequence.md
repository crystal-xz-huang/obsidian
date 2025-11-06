---
modules:
  - "[[mocs/Modules/Dynamic Programming|Module 3: Dynamic Programming]]"
tags:
  - source/lecture
  - type/problem
  - topic/dynamic-programming
  - topic/graph
categories:
  - "[[Shortest Path Problem]]"
---

# Shortest Common Supersequence (SCS)

> [!problem]
> <b>Instance</b>: Two sequences $A = \langle a_1,a_2,\ldots,a_n\rangle$ and $B = \langle b_1,b_2,\ldots,b_m\rangle$.
> 
> <b>Task</b>: Find a **shortest common supersequence (SCS)** of $A$ and $B$, 
> i.e., a shortest possible sequence that both $A$ and $B$ are subsequences of.
> 
> <b>Example</b>: 
> $\operatorname{SCS}(\texttt{cat},\texttt{cot})=\texttt{coat}$.
> 
> <b>Explanation</b>: 
> Both $\texttt{cat}$ and $\texttt{cot}$ are subsequences of $\texttt{coat}$.


## Solution

> The SCS is the shortest sequence that contains both `A` and `B` as subsequences.
> 
> The LCS represents the longest sequence of characters that appear in both sequences in the same order. To form the SCS, we preserve the LCS while inserting the remaining characters from both strings around it, ensuring that the final sequence maintains the relative order of all characters.

- Find a [[Longest Common Subsequence|Longest Common Subsequence (LCS)]] of the two strings. 
- Then add back the differing elements of the two sequences in the right places, in any compatible order.

![[scs-example.excalidraw.png|300]]


> [!solution]
> <b>Subproblems:</b>  
> 
> For all $0 \le i \le n$ and $0 \le j \le m$, let $\operatorname{scs}(i,j)$ be the length of a shortest common supersequence of the prefixes $A_i = \langle a_1, a_2, \ldots, a_i \rangle$ and $B_j = \langle b_1, b_2, \ldots, b_j \rangle$.
> 
> <b>Recurrence:</b>  
> 
> For all $i,j>0$,
> 
> $$
> \operatorname{scs}(i,j)=
> \begin{cases}
> 1+\operatorname{scs}(i-1,j-1) & \text{if } a_i=b_j,\\[6pt]
> 1+\min\big(\operatorname{scs}(i-1,j),\operatorname{scs}(i,j-1)\big) & \text{if } a_i\ne b_j.
> \end{cases}
> $$
> 
> <b>Base cases:</b>  
> 
> $$
> \operatorname{scs}(0,j)=j \quad \text{for all } 0 \le j \le m,
> $$
> $$
> \operatorname{scs}(i,0)=i \quad \text{for all } 0 \le i \le n.
> $$
> 
> <b>Order of computation:</b>  
> 
> Solve subproblems in **lexicographic** order of $(i,j)$ so that $\operatorname{scs}(i-1,j)$, $\operatorname{scs}(i,j-1)$, and $\operatorname{scs}(i-1,j-1)$ are known before $\operatorname{scs}(i,j)$.
> 
> <b>Overall answer:</b> $\operatorname{scs}(n,m)$.
> 
> <b>Reconstruction:</b>  
> 
> Backtrack from $(n,m)$:  
> - If $a_i=b_j$, prepend $a_i$ and move to $(i-1,j-1)$.  
> - If $\operatorname{scs}(i-1,j)\le \operatorname{scs}(i,j-1)$, prepend $a_i$ and move to $(i-1,j)$.  
> - Else prepend $b_j$ and move to $(i,j-1)$.  
> - When one string is exhausted, prepend remaining symbols from the other.
> 
> <b>Relation to LCS:</b>  
> 
> If $L=\operatorname{LCS}(A,B)$, then
> $$
> |\operatorname{SCS}(A,B)| = n+m-|L|.
> $$
> 
> <b>Time complexity:</b>  
> 
> $O(nm)$ subproblems at $O(1)$ each $\Rightarrow O(nm)$ total time.  
> Space: $O(nm)$ to reconstruct, or $O(\min\{n,m\})$ to compute length only.

## Intuition

The key insight is recognising that the shortest common supersequence is closely related to the [[Longest Common Subsequence|Longest Common Subsequence (LCS)]] of the two strings.

Think about it this way: if two strings share some common characters in the same order, we only need to include those shared characters once in our result. The more characters they share (i.e., the longer their LCS), the shorter our final supersequence will be.

To build the shortest supersequence:
- We must include all characters from both strings
- But we can "merge" the common subsequence characters instead of duplicating them

The relationship can be expressed as: 
$$\textsf{Length of SCS = len(A) + len(B) - LCS(A, B))}$$


# References & Further Reading

- [1092. Shortest Common Supersequence - In-Depth Explanation](https://algo.monster/liteproblems/1092)