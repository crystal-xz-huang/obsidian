---
modules:
  - "[[mocs/Modules/Dynamic Programming|Module 3: Dynamic Programming]]"
tags:
  - topic/dynamic-programming
  - examples
categories:
  - "[[Shortest Path Problem]]"
---

## Assembly Line Scheduling

Assembly line scheduling is a manufacturing problem. In automobile industries, assembly lines are used to transfer parts from one station to another station. 

> [!problem]
> <b>Instance</b>: You are given two assembly lines, each consisting of $n$ workstations. 
> The $k$-th workstation on each line performs the $k$-th of $n$ jobs.  
> 
> - To bring a new product to the start of assembly line $i$ takes $s_i$ units of time.  
> - To retrieve a finished product from the end of assembly line $i$ takes $f_i$ units of time.
> - On assembly line $i$, the $k$-th job takes $a_{i,k}$ units of time to complete.  
> - To move a product from station $k$ on line $i$ to station $k+1$ on the *other line* takes $t_{i,k}$ units of time.  
> - There is no transfer time required to continue from station $k$ to station $k+1$ on the *same line*. 
> 
> <b>Task</b>: Find the <u>fastest way (minimum total time)</u> to assemble a product, using both lines as necessary.

|![[assembly-line-scheduling.png]]|
| :-: |
| The 2 regions shaded in blue represent the 2 assembly lines. Each workstation is represented as a node (vertex) with a value equal to the cost of its job. The directed edges represent the possible moves from one workstation to another. At each node $k$ we can only move in 2 directions: forward in the same line or diagonally onto the next line to reach the $(k+1)$th workstation. The cost of each move is indicated by the edge weights.|


This algorithm is a classic example of dynamic programming on a **directed acyclic graph (DAG)**. The computation graph has vertices (nodes) representing stations and edges representing possible moves between them. Since we can only move either forward or diagonally to the next station the edges are directed. Further, since $k$ is strictly increasing, along any path, we can never return to a smaller $k$ so there is no loops/cycles. 

- Denote internal vertices (nodes) using the form $(i,k)$ to represent workstation $k$ on assembly line $i$.
- The problem requires us to find the shortest path from the start node to the finish node, where unlabelled edges have zero weight.
- This is clearly a [[Directed Acyclic Graphs and Topological Ordering|directed acyclic graph (DAG)]], and moreover the **topological ordering** is obvious: $\tt start, (1, 1), (2, 1), (1, 2), (2, 2), . . . , (1, n), (2, n), finish$ 
- There are $2n + 2$ vertices and $4n$ edges, so the DP should take $O(n)$ time, whereas Dijkstra’s algorithm would take $O(n \log n)$ time.

> [!solution]
> <b>Subproblems:</b>  
> For $i \in \{1, 2\}$ and $1 \le k \le n$, let $\operatorname{opt}(i, k)$ be the minimal total time needed to complete the first $k$ jobs, with the $k$-th job performed on assembly line $i$.
> 
> <b>Recurrence:</b>  
> For $k > 1$,
> $$
> \begin{aligned}
> \operatorname{opt}(1, k) &= \min\big[\,\operatorname{opt}(1, k-1),\; \operatorname{opt}(2, k-1) + t_{2,k-1}\,\big] + a_{1,k}, \\[6pt]
> \operatorname{opt}(2, k) &= \min\big[\,\operatorname{opt}(2, k-1),\; \operatorname{opt}(1, k-1) + t_{1,k-1}\,\big] + a_{2,k}.
> \end{aligned}
> $$
> 
> <b>Base cases:</b>  
> $$
> \operatorname{opt}(1, 1) = s_1 + a_{1,1}, \qquad
> \operatorname{opt}(2, 1) = s_2 + a_{2,1}.
> $$
> 
> <b>Order of computation:</b>  
> Solve subproblems (pairs $\operatorname{opt}(1, k)$ and $\operatorname{opt}(2, k)$) in increasing order of $k$.
> 
> <b>Overall answer:</b>  
> $$
> \min\big[\operatorname{opt}(1, n) + f_1,\; \operatorname{opt}(2, n) + f_2\big].
> $$
> 
> <b>Time complexity:</b>  
> Each of $2n$ subproblems is solved in $O(1)$ time, and the final answer in $O(1)$ time.  
> Therefore, the total running time is $O(n)$.


## Solution

### Overview

<b>Objective</b>: To find the optimal scheduling i.e., the fastest way from start to exit.

- Two assembly lines, $1$ and $2$, each with stations $k$ from $1$ to $n$.
- Each workstation $k$ on assembly line $i$ completes a job with $a_{i,k}$ cost.
- A product must pass through all stations from $1$ to $n$ **in order** i.e. $k_1, k_2 \cdots k_n$ (in any of the two assembly lines).
- The product can move one station forward in the same line (no extra cost), or one station diagonally-right in the other line (incurs an extra cost $t_{i,k}$).
- From a station $(i, k)$ there are only 2 possible moves:
	- Move **forward** on the same line (no extra cost),:  $$(i, k) \rightarrow (i, k+1)$$
	- Transfer **diagonally** to the other line before doing the next job (incurs an extra cost $t_{i,k}$):  $$(i, k) \rightarrow (j, k+1) \quad \text{where } j \ne i$$

> Note: Since we can only move one station forward (not backwards), the graph is directed and acyclic . 


### Dynamic Programming Solution

> Note: Brute force method of finding one optimal solution takes exponential time i.e., it takes $2^n$ possibilities for $n$ scheduled sub-jobs, as each station has two choices.

Solving the assembly line scheduling problem requires making a sequence of decisions (which line should we choose next), one for each station along the assembly line. At the station, we spend a constant/fixed amount of time to complete the job, before leaving to the next station.

Suppose we have the optimal path from start to station $(i, k)$. Assume the optimal paths from start to stations $(i', k-1)$  is known. From the last station $k-1$ in an optimal solution, how can we get to station $(i, k)$?

- <b>Case 1:</b> Different lines: $i' \neq i$
	- Transfer from $(i', k-1)$ for an extra cost $t_{i',k-1}$ and complete the job for cost $a_{i,j}$. 
	- Cost = $\text{opt}(i,k) = \text{opt}(i',k-1) + t_{i',k-1} + a_{i,k}$ if  $i' \neq i$.
- <b>Case 2:</b> Same line: $i' = i$
	- Stay on the same line  $i' = i$ for no extra costs and complete the job for cost $a_{i,k}$. 
	- Cost  = $\text{opt}(i,k) = \text{opt}(i,k-1) + a_{i,k}$ if  $i' = i$.

We consider both options and take the one with the lowest cost:
$$
\text{opt}(i, k) = \min [\underbrace{\text{opt}(i,k-1)}_{\text{same line}},\; \underbrace{\text{opt}(i',k-1) + t_{i',k-1}}_{\text{different line}}] + a_{i,k}
$$

There are only two ways to reach each station $(i, k)$: 
1. From station $(1, k-1)$ on line 1
2. From station $(2, k-1)$ on line 2

And there only two recursive cases $\text{opt}(1, k)$ and $\text{opt}(2, k)$, which both depends on the earlier solutions for $\text{opt}(1, k-1)$ and  $\text{opt}(2, k-1)$.

Therefore, for each $i$ we can recursively solve for pairs of $\text{opt}(1, k)$ and $\text{opt}(2, k)$.

Let $\text{opt}(i, k)$ be the **minimum total time** to complete the first $k$ jobs on lines $i = \{1, 2 \}$. 

$$\begin{aligned}
\text{opt}(1, k) = \min [\text{opt}(1, k − 1), \text{opt}(2, k − 1) + t_{2,k−1}] + a_{1,k} \\[4pt]
\text{opt}(2, k) = \min [\text{opt}(2, k − 1), \text{opt}(1, k − 1) + t_{1,k−1}] + a_{2,k}
\end{aligned}$$

Now consider the base case(s). If $k = 1$ (first station) then we came from the start and incur the entry cost so $\text{opt}(1,1) = s_1 + a_{1,1}$ and $\text{opt}(2,2) = s_2 + a_{2,1}$.

Therefore, the final recurrence is:

$$\begin{aligned}
\operatorname{opt}(1, k) &=
\begin{cases}
s_1 + a_{1,1} & \text{if } k=1 \\[4pt]
\min\big[\,\text{opt}(1, k − 1),\; \text{opt}(2, k − 1) + t_{2,k−1} \,\big] + a_{1,k} & \text{if } k \geq 2
\end{cases}  \\[8pt]

\operatorname{opt}(2, k) &=
\begin{cases}
s_2 + a_{2,1} & \text{if } k=1 \\[4pt]
\min\big[\,\text{opt}(2, k − 1),\; \text{opt}(1, k − 1) + t_{1,k−1} \,\big] + a_{2,k} & \text{if } k \geq 2
\end{cases} 
\end{aligned}$$

To compute $\text{opt}(1, k)$, we need to have already solved for $\text{opt}(1, k-1)$ and $\text{opt}(2, k-1)$. Therefore, we solve each pair in increasing order of $k$.

#### Constructing an Optimal Solution

For each $\text{opt}(1, k)$ and $\text{opt}(2, k-1)$, we can store the assembly line number (1 or 2) that minimises the total cost from start to station $k-1$ in an auxiliary table at $l(1, k)$ and $l(2, k)$.  

![](https://miro.medium.com/v2/resize:fit:700/1*2IiybexcQGmCfdXhKCxqeg.png)





