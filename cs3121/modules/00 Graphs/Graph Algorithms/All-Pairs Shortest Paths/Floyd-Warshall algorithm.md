---
tags:
  - topic/graph
  - algorithms
---

# All Pairs Shortest Paths (APSP)

All-Pairs Shortest Paths (APSP) is the problem of finding the shortest path between **every pair of vertices** in a graph. 

- **Floyd-Warshall**: A dynamic programming algorithm that computes all-pairs shortest paths in $O(V^3)$ time. It can handle graphs with both positive and negative edge weights, but not negative cycles. It works well for dense graphs.
- **Dijkstra's algorithm**: This algorithm finds the shortest path from a single source to all other nodes. To solve the all-pairs problem, it can be run $V$ times, once for each vertex as the source. For sparse graphs with non-negative edge weights, this approach can be more efficient than Floyd-Warshall. The complexity for $V$ runs would be $V \times O(E \log V)$. 

# Floyd-Warshall Algorithm 

> [!problem]
> <b>Instance</b>: A directed weighted graph $G = (V, E)$ with edge weights $w(e)$ which may be negative, but without any cycles of negative total weight.  
> 
> <b>Task</b>: Find the weight of the shortest path from every vertex $s$ to every other vertex $t$.
> 
> <b>Notation</b>: Let $n = |V|$ and $m = |E|$.

> [!solution]
>  <b>Setup</b>
> - Label the vertices of $V$ as $v_1, v_2, \ldots, v_n$.  
> - Let $S$ be the set of vertices allowed as intermediate vertices. 
> - Initially, $S$ is empty, and we add vertices $v_1, v_2, \ldots, v_n$ one at a time.
> 
> <b>Subproblems</b>
> 
> For all $1 \le i, j \le n$ and $0 \le k \le n$, let $\operatorname{opt}(i, j, k)$ be the weight of a shortest path from $v_i$ to $v_j$ using only $v_1, v_2, \ldots, v_k$ as intermediate vertices.
> 
> <b>Recurrence</b>
> 
> For all $1 \le i, j, k \le n$,
> $$
> \operatorname{opt}(i, j, k) = \min \big[ \operatorname{opt}(i, j, k - 1),\; \operatorname{opt}(i, k, k - 1) + \operatorname{opt}(k, j, k - 1) \ \big].
> $$
> 
> <b>Base cases</b>
> $$
> \operatorname{opt}(i, j, 0) =
> \begin{cases}
> 0 & \text{if } i = j,\\[4pt]
> w(i, j) & \text{if } (v_i, v_j) \in E,\\[4pt]
> \infty & \text{otherwise.}
> \end{cases}
> $$
> 
> <b>Order of computation</b>
> Solve subproblems in increasing order of $k$ (and any order of $i$ and $j$), since $\operatorname{opt}(i, j, k)$ depends only on $\operatorname{opt}(i, j, k - 1)$, $\operatorname{opt}(i, k, k - 1)$, and $\operatorname{opt}(k, j, k - 1)$.
> 
> <b>Overall answer</b>
> The table of values $\operatorname{opt}(i, j, n)$, where all vertices are allowed as intermediates, over all pairs of vertices $(i, j)$.
> 
> <b>Time complexity</b>
> $O(n^3)$ subproblems, each computed in $O(1)$ time, for a total  $O(n^3)$.  

## Intermediate vertices

> [!idea]
> Instead of restricting the _number of edges_ allowed in a path (as Bellman–Ford does), Floyd–Warshall progressively restricts the **intermediate vertices** that may appear on the path between any two endpoints.

> [!faq]
> **Q:** When is the shortest path from $s$ to $t$ using the first $k$ vertices as *intermediates* actually an improvement on the value from the previous round?
> 
> **A:** When there is a shorter path of the form  
> $$
> s \rightarrow \underbrace{\cdots}_{v_1, \ldots, v_{k-1}} \rightarrow v_k \rightarrow \underbrace{\cdots}_{v_1, \ldots, v_{k-1}} \rightarrow t.
> $$

**Intermediate Vertices:** The *only* vertices allowed between the two endpoints $s$ and $t$ are among the set of intermediate vertices $\{v_1, v_2, \ldots, v_k\}$.
- The endpoints $s$ and $t$ can be any vertices (not necessarily in that set).
- The $s-t$ path may use any subset and order of those $k$ vertices.

So a valid path for $\operatorname{opt}(s, t, k)$ could look like:
$$
s \to v_3 \to v_2 \to v_5 \to t
$$
if all those intermediate vertices are among the first $k$.



## Recursive Structure (Optimal Substructure Property)

> [!idea]
> Instead of considering paths with a limited number of edges (like in [[Bellman-Ford algorithm]]), Floyd–Warshall considers paths that can **pass through** only certain vertices, called  *intermediate vertices*.

Number the vertices arbitrarily from $1$ to $V$. 
For every pair of vertices $i, j$ and every integer $k$, we define a path $\pi(i, j, k)$ as follows:

$$
\bbox[15px, border: 1px solid gray]{
\begin{aligned}
& \pi(i,j,k) \text{ is the shortest path (if any) from } i \text{ to } j\\
& \text{that passes through only vertices numbered at most } k.
\end{aligned}}
$$

Then $π(s,t,V)$ is the shortest path from $s$ to $t$. 

![[floyd-warshall-recursive-structure.png]]

In particular, all these paths have a recursive structure.
- The path $π(i, j, 0)$ can’t pass through any intermediate vertices, so it must be the direct edge (if any) from $i$ to $j$.
- For any integer $k > 0$, either $π(i, j, k)$ passes through vertex $k$ or it doesn’t.
	- If $π(i, j, k)$ passes through vertex $k$, it consists of a subpath from $i$ to $k$, followed by a subpath from $k$ to $j$. Both of those subpaths pass through only vertices numbered at most $k − 1$; moreover, those subpaths are as short as possible with this restriction. So the two subpaths must be $π(i, k, k − 1)$ and $π(k, j, k − 1)$.
	- On the other hand, if $π(i, j, k)$ does not pass through vertex $k$, then it passes through only vertices numbered at most $k − 1$, and it must be the shortest path with this restriction. So in this case, we must have $π(i, j, k) = π(i, j, k − 1)$.

Now let $\operatorname{dist}(i, j, k)$ denote the length of the path $π(i, j, k)$.  
The recursive structure of $π(i, j, k)$ immediately implies the following recurrence:

$$
\bbox[15px, border: 1px solid gray]{
\operatorname{dist}(i, j, k) =
\begin{cases}
w(i \to j) & \text{if } k = 0, \\[6pt]
\min\left.
\begin{cases}
\operatorname{dist}(i, j, k - 1),\\[4pt]
\operatorname{dist}(i, k, k - 1) + \operatorname{dist}(k, j, k - 1)
\end{cases}
\right\} & \text{otherwise.}
\end{cases}
}
$$

The goal is to compute $\operatorname{dist}(i, j, V)$ for all vertices $i$ and $j$. This recurrence can be evaluated by a straightforward dynamic programming algorithm in $O(n^3)$ time.

 ## Solution

> [!solution]
> <b>Setup</b>
> 
> If the vertices of $G = (V, E)$ are labelled $v_1, v_2, \ldots, v_n$:
> 
> - Define $\operatorname{opt}(i, j, k)$ as the weight of the shortest path from $v_i$ to $v_j$ that only uses vertices from the set $\{v_1, v_2, \ldots, v_k\}$ as intermediates (that is, vertices <u>between</u> the start and end of the path).
> - Initially $k = 0$: no intermediate vertices allowed — paths can only use direct edges.
> - Gradually increase $k$ to $n$: allowing one more vertex each round.
> 
> <b>Recurrence</b>
> 
> $$
> \operatorname{opt}(i, j, k) =
> \min\left.
> \begin{cases}
> \operatorname{opt}(i, j, k - 1),\\
> \operatorname{opt}(i, k, k - 1) + \operatorname{opt}(k, j, k - 1)
> \end{cases}
> \right\}.
> $$
> 
> - Either the best path from $v_i$ to $v_j$ **does not use** $v_k$ (first term),
> - or it **does** use $v_k$ as an intermediate (second term), which splits the path into two parts $v_i \to v_k$ and $v_k \to v_j$, each restricted to intermediates among $\{v_1, \ldots, v_{k-1}\}$.
> 
> <b>Base cases</b>
> 
> $$
> \operatorname{opt}(i, j, 0) =
> \begin{cases}
> 0, & \text{if } i = j,\\
> w(i, j), & \text{if edge } (v_i, v_j) \in E,\\
> \infty, & \text{otherwise.}
> \end{cases}
> $$
> 
> <b>Computation order</b>
> 
> Since each state $\operatorname{opt}(i, j, k)$ depends only on values from the previous round $(k - 1)$, we compute for $k = 1$ to $n$, iterating over all pairs $(i, j)$ in any order.  
> 
> After $n$ rounds, $\operatorname{opt}(i, j, n)$ gives the shortest distance from $v_i$ to $v_j$, allowing *all* vertices as intermediates.
> 
> <b>Analysis</b>
> - **Time:** $O(n^3)$ — all $n^2$ vertex pairs updated for each of $n$ intermediates.
> - **Space:** $O(n^2)$ (can be reduced by overwriting each round).


## DP Table


![[floydwarshall.png|400]]


**First round (no intermediates)**

For $k=0$, these are the subproblems $\operatorname{opt}(i, j, 0)$. Since $k=0$, no other vertices are allowed as intermediates, so we consider only ==direct paths (edges) from vertex $i$ to $j$==.


|From i \ To j|v1|v2|v3|v4|v5|
|---|---|---|---|---|---|
|**v1**|0|-1|∞|-2|∞|
|**v2**|3|0|∞|∞|∞|
|**v3**|2|1|0|∞|∞|
|**v4**|∞|-1|∞|0|-1|
|**v5**|∞|1|1|2|0|

---

**Second Round (k=1)** (allowing $v_1$ as intermediate vertex)

|From \ To|v1|v2|v3|v4|v5|
|---|---|---|---|---|---|
|**v1**|0|-1|∞|-2|∞|
|**v2**|3|0|∞|1|∞|
|**v3**|2|1|0|0|∞|
|**v4**|∞|-1|∞|0|-1|
|**v5**|∞|1|1|2|0|