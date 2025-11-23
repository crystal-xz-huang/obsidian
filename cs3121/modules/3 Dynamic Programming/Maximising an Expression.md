---
tags:
  - topic/dynamic-programming
  - examples
---

# Maximising an Expression


> [!problem]
> <b>Instance</b>: a sequence of numbers with operations $+,\;-,\;\times$ in between, for example
> $$1 + 2 - 3 \times 6 - 1 - 2 \times 3 - 5 \times 7 + 2 - 8 \times 9$$
> 
> <b>Task</b>: place brackets in a way that the resulting expression has the largest possible value.

What will be the subproblems?

Similar to the [[Matrix Chain Multiplication|matrix chain multiplication]] problem, it’s not enough to just solve for prefixes $A[1..i]$. Instead, for a subsequence of numbers $A[i+1..j]$, we should place brackets so that resulting expression is maximised.

How about the recurrence?

- It is natural to break down $A[i+1..j]$ into $A[i+1..k]\ \odot\ A[k+1..j]$, with cases $\odot\in\{+,-,\times\}$. 
- In the case $\odot=+$, we maximise both sides, i.e., use $\operatorname{max}(i,k)$ and $\operatorname{max}(k+1,j)$. 
- This does not work for the other two operations $-$ or $\times$ because a maximal left value with a maximal right value may not yield a global maximum for subtraction or multiplication. 
- We should look for placements of brackets not only for the maximal value but also for the minimal value! In other words, we want both the maximum and minimum values for each operation!
- Therefore we must track both extremal values: compute and track *both* $\operatorname{max}$ and $\operatorname{min}$ for each subinterval.






#todo Write a complete solution for this problem. Your solution should include the subproblem specification, recurrence and base cases. You should also specify the order of computation, describe how the overall solution is to be obtained, and analyse the time complexity of the algorithm.

> [!solution]
> <b>Subproblems:</b>  
> For $1\le i\le j\le n$, let
> $$\begin{aligned}
> \operatorname{max}(i,j)&=\max\{\text{value of }a_i\operatorname{op}_i\cdots \operatorname{op}_{j-1}a_j\},\\
> \operatorname{min}(i,j)&=\min\{\text{value of }a_i\operatorname{op}_i\cdots \operatorname{op}_{j-1}a_j\}.
> \end{aligned}$$
> 
> <b>Recurrence:</b>  
> Base:
> $$
> \operatorname{max}(i,i)=\operatorname{min}(i,i)=a_i.
> $$
> For $i<j$,
> $$
> \operatorname{max}(i,j)=\max_{i\le k<j}\ \operatorname{MaxCombine}\big(\operatorname{op}_k,\ \operatorname{max}(i,k),\operatorname{min}(i,k),\ \operatorname{max}(k+1,j),\operatorname{min}(k+1,j)\big),
> $$
> $$
> \operatorname{min}(i,j)=\min_{i\le k<j}\ \operatorname{MinCombine}\big(\operatorname{op}_k,\ \operatorname{max}(i,k),\operatorname{min}(i,k),\ \operatorname{max}(k+1,j),\operatorname{min}(k+1,j)\big),
> $$
> where for $x^\uparrow=\operatorname{max}(i,k)$, $x^\downarrow=\operatorname{min}(i,k)$, $y^\uparrow=\operatorname{max}(k+1,j)$, $y^\downarrow=\operatorname{min}(k+1,j)$,
> $$
> \operatorname{MaxCombine}(+,\cdot)=x^\uparrow+y^\uparrow,\quad
> \operatorname{MinCombine}(+,\cdot)=x^\downarrow+y^\downarrow,
> $$
> $$
> \operatorname{MaxCombine}(-,\cdot)=x^\uparrow-y^\downarrow,\quad
> \operatorname{MinCombine}(-,\cdot)=x^\downarrow-y^\uparrow,
> $$
> $$
> \operatorname{MaxCombine}(\times,\cdot)=\max\{x^\uparrow y^\uparrow,\ x^\uparrow y^\downarrow,\ x^\downarrow y^\uparrow,\ x^\downarrow y^\downarrow\},
> $$
> $$
> \operatorname{MinCombine}(\times,\cdot)=\min\{x^\uparrow y^\uparrow,\ x^\uparrow y^\downarrow,\ x^\downarrow y^\uparrow,\ x^\downarrow y^\downarrow\}.
> $$
> 
> <b>Order of computation:</b>  
> Solve in increasing length $\ell=j-i$ so that all $(i,k)$ and $(k+1,j)$ are ready before $(i,j)$.
> 
> <b>Overall answer:</b> $\operatorname{max}(1,n)$.
> 
> <b>Reconstruction:</b>  
> Store for each $(i,j)$ the split $k$ and which extremal pair attains the max/min; backtrack to output the optimal parenthesisation.
> 
> <b>Time complexity:</b> $O(n^2)$ subproblems, each considering $O(n)$ splits and $O(1)$ combinations $\Rightarrow O(n^3)$ time; $O(n^2)$ space.
