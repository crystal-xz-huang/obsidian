---
aliases: Floyd-Warshall Algorithm
---

# All Pairs Shortest Paths (APSP)

All-Pairs Shortest Paths (APSP) is the problem of finding the shortest path between **every pair of vertices** in a graph. 

- **Floyd-Warshall**: A dynamic programming algorithm that computes all-pairs shortest paths in $O(V^3)$ time. It can handle graphs with both positive and negative edge weights, but not negative cycles. It works well for dense graphs.
- **Dijkstra's algorithm**: This algorithm finds the shortest path from a single source to all other nodes. To solve the all-pairs problem, it can be run $V$ times, once for each vertex as the source. For sparse graphs with non-negative edge weights, this approach can be more efficient than Floyd-Warshall. The complexity for $V$ runs would be $V \times O(E \log V)$. 

## Floyd-Warshall Algorithm 

> [!problem]
> <b>Instance</b>: A directed weighted graph $G = (V, E)$ with edge weights $w(e)$ which may be negative, but without any cycles of negative total weight.  
> 
> <b>Task</b>: Find the weight of the shortest path from every vertex $s$ to every other vertex $t$.
> 
> <b>Notation</b>: Let $n = |V|$ and $m = |E|$.

> [!idea]
> - We can use a similar idea, this time in terms of the *intermediate vertices* allowed on an $s - t$ path.
> - Label the vertices of $V$ as $v_1, v_2, \ldots, v_n$.  
> - Let $S$ be the set of vertices allowed as intermediate vertices. 
> - Initially, $S$ is empty, and we add vertices $v_1, v_2, \ldots, v_n$ one at a time.
> 
> **Question**  
> When is the shortest path from $s$ to $t$ using the first $k$ vertices as *intermediates* actually an improvement on the value from the previous round?
> 
> **Answer**  
> When there is a shorter path of the form  
> $$
> s \rightarrow \underbrace{\cdots}_{v_1, \ldots, v_{k-1}} \rightarrow v_k \rightarrow \underbrace{\cdots}_{v_1, \ldots, v_{k-1}} \rightarrow t.
> $$

 
> [!solution]
> <b>Subproblems:</b>  
> For all $1 \le i, j \le n$ and $0 \le k \le n$, let $\operatorname{opt}(i, j, k)$ be the weight of a shortest path from $v_i$ to $v_j$ using only $v_1, v_2, \ldots, v_k$ as intermediate vertices.
> 
> <b>Recurrence:</b>  
> For all $1 \le i, j, k \le n$,
> $$
> \operatorname{opt}(i, j, k) = \min \big[ \operatorname{opt}(i, j, k - 1),\; \operatorname{opt}(i, k, k - 1) + \operatorname{opt}(k, j, k - 1) \ \big].
> $$
> 
> <b>Base cases:</b>  
> $$
> \operatorname{opt}(i, j, 0) =
> \begin{cases}
> 0 & \text{if } i = j,\\[4pt]
> w(i, j) & \text{if } (v_i, v_j) \in E,\\[4pt]
> \infty & \text{otherwise.}
> \end{cases}
> $$
> 
> <b>Order of computation:</b>  
> Solve subproblems in increasing order of $k$ (and any order of $i$ and $j$), since $\operatorname{opt}(i, j, k)$ depends only on $\operatorname{opt}(i, j, k - 1)$, $\operatorname{opt}(i, k, k - 1)$, and $\operatorname{opt}(k, j, k - 1)$.
> 
> <b>Overall answer:</b>  
> The table of values $\operatorname{opt}(i, j, n)$, where all vertices are allowed as intermediates, over all pairs of vertices $(i, j)$.
> 
> <b>Time complexity:</b>  
> $O(n^3)$ subproblems, each computed in $O(1)$ time, for a total  $O(n^3)$.  
> 
> <b>Space complexity:</b>  
> $O(n^3)$ for the full table, which can be improved to $O(n^2)$ by overwriting values each round.


