
## Introduction

Dynamic Programming is a powerful technique that can be used to solve many combinatorial problems in **polynomial time** for which a naive approach would take exponential time $\Omega(2^n)$.

Dynamic Programming is a general approach to solving problems, much like “divide-and-conquer”, except that the subproblems will overlap.

- Same idea as recursion — but we store results of subproblems to avoid recomputation.
- Uses **memoization (top-down)** or **tabulation (bottom-up)** to compute each subproblem once.

#### Key Idea: Dynamic programming

Dynamic programming involves formulating a problem as a set of *subproblems*, expressing the solution to the problem *recursively* in terms of those subproblems and solving the recursion *without repeating* the same subproblem twice.


The two key sub-ideas that make DP work are **memoization** (don’t repeat yourself) and **optimal substructure**.

- Memoization means that we should never try to compute the solution to the same subproblem twice. Instead, we should store the solutions to previously computed subproblems, and look them up if we need them again.
- Optimal substructure is trickier, and is really where the challenge of dynamic programming comes from. A problem has optimal substructure if it can be broken into smaller problems such that the optimal solution to the big problem can be deduced from the optimal solution to the smaller problems.

#### Top-down (memoization) vs Bottom-up (tabulation)

## Reasoning 

Assume we have an optimal solution
Consider the last choice 
Express it in terms of smaller subproblems

Defining Subproblems
- It is convenient to define subproblems as entities in a state space and refer to individual subproblems as states
	- Each `f(i)` is a state, and the state space includes all these states for i from 1 to n.

