---
modules:
  - "[[mocs/Modules/Dynamic Programming|Module 3: Dynamic Programming]]"
tags:
  - topic/graph
  - algorithms
categories:
  - "[[Shortest Path Problem]]"
---

## Shortest Paths

 <b>Shortest Path in Edge-Weighted Graphs.</b> In a weighted graph, the length of a path is the sum of the edge weights along that path. The shortest path is therefore the path with the minimum total sum of weights among all possible paths. 

- If all edge weights are positive (non-negative), the single source shortest path problem is solved by [[Dijkstra's Algorithm]] in $O(|E| \log |V|)$ time.
	- But for **directed acyclic graphs (DAG)**, Dijkstra's Algorithm also works even with *negative* edge weights because a topological order ensures **no vertex depends on a later one**.
- We can also solve the general single source shortest path problem in $O(|V||E|)$ using the [[Bellman-Ford algorithm]].
- However, in the special case of **directed acyclic graphs (DAG)**, a simple DP solves this problem in $O(|V| + |E|)$ time, i.e., linear time. 
- ==Negative weights introduce complications.== 

> [!warning]
> DP algorithm for finding shortest paths only works when there are ==no cycles==: Finding the shortest path for vertex $t$ depends on vertex $v$. Cycles means that vertex $v$ might also depend on vertex $t$ ⇒ this is why we can't use DP on graphs with cycles!


## Single-Source Shortest Path in a DAG

> [!problem]
> <b>Instance</b>: A directed acyclic graph $G = (V, E)$ in which each edge $e \in E$ has a corresponding weight $w(e)$ (which may be negative), and a designated vertex $s \in V$.
> 
> <b>Task</b>: Find a shortest path from $s$ to each other vertex in $V$.
 
- *Single-source <u>shortest</u> paths problem in edge-weighted DAGs.* We can consider a DP algorithm for finding shortest paths that is simpler and faster than Dijkstra's algorithm for edge-weighted DAGs:
	- It solves the single-source problem in linear time.
	- It handles negative edge weights.
	- It solves related problems, such as finding longest paths.
- *Single-source <u>longest</u> paths problem in edge-weighted DAGs.* We can solve the single-source longest paths problems in edge-weighted DAGs by initializing the `distTo[]` values to negative infinity and switching the sense of the inequality in `relax()`.

## Dynamic Programming Solution

- The natural subproblems are the shortest path to each vertex.  
- Each vertex $v$ with an edge to $t$ is a candidate for the penultimate (predecessor) vertex in an $s−t$ path.
- The recurrence considers the path to each such $v$, plus the weight of the last edge, and selects the minimum of these options.
- The base case is $s$ itself, where the shortest path is obviously zero.

![[shortest paths dp.png]]

> [!idea]
> **Edge Relaxation**: For each vertex $t$, consider a shortest path from source to $t$ that goes through a predecessor $v$ before $t$ on this path $(s \leadsto {\color{pink}v} \to t)$. 
> 
> $$
> {\color{blue}\operatorname{opt}(t)} = \min_{{\color{green}(v, t)} \in E} \big[{\color{pink}\operatorname{opt}(v)} + {\color{green}w(v,t)} \big]
> $$
> 
> Note that Dijkstra Algorithm uses the same "edge relaxation" recurrence.

> [!solution]
> <b>Subproblems:</b>  
> For all $t \in V$, let $\operatorname{len}(t)$ be the length of a shortest path from $s$ to $t$.
> 
> <b>Recurrence:</b>  
> For all $t \ne s$,
>
> $$
> \operatorname{len}(t) = \min_{(v,t)\in E}\,[\,\operatorname{len}(v) + w(v,t)\,].
> $$
> >
> >
> > Note: If we replaced the $\min$ in the recurrence with $\max$, the algorithm would instead find the *longest* path from $s$ to each $t$ in a DAG — a task that is easy for acyclic graphs but NP-hard for general graphs (there is no known algorithm to solve it in polynomial time).
> 
> <b>Base case:</b>  
>
> $$
> \operatorname{len}(s) = 0.
> $$
>
> <b>Order of computation:</b>  
> Solve vertices in **topological order**, ensuring that all predecessors $v$ of each vertex $t$ are processed before $t$.
> 
> <b>Overall answer:</b>  
> The list of values $\operatorname{len}(t)$ over all vertices $t$.
> 
> <b>Time complexity:</b>  
> Each edge is considered once, so the total running time is $O(|V| + |E|)$ i.e., linear time.

#### Computational Order = Topological Orderomg

The key idea is because the graph is acyclic, we can process vertices in [[Directed Acyclic Graphs and Topological Ordering|topological order]], meaning each vertex appears before all the vertex it points to (i.e., its successors/descendants). Therefore when we compute the distance to a vertex, all its predecessors/ancestors have already been computed.

> [!question]
> In what order should we solve the subproblems?
> 
> > [!answer]
> > - In any DP algorithm, the recurrence introduces dependencies that must be respected.  
> > - Here, $\operatorname{len}(t)$ depends on all $\operatorname{len}(v)$ values for vertices $v$ with edges $(v,t) \in E$ i.e., vertices $v$ with outgoing edges to $t$, so we need to solve for all such vertices $v$ before solving for $t$.
> > - To satisfy these dependencies, we process vertices in <b>topological order</b> — that is, an order in which all edges point left to right, so any vertex with an outgoing edge to $t$ is solved before $t$ is. 
> > - This ensures that every vertex’s shortest path value is known before it is used. 
> > - Because the graph is acyclic, such an order exists and can be found in linear time $O(|V| + |E|)$. It is also for this reason that this algorithm does **not** apply to general directed graphs!


#### Optimal Substructure Property

The shortest path problem has the following optimal substructure. 
> Every subpath on a shortest path from $v$ to $w$ is also a shortest path between the two endpoints.

Suppose $s \rightarrow u \rightarrow v$ is a shortest path from $s$ to $v$. This implies that $s \rightarrow u$ is also a shortest path from $s$ to $u$.  

We can prove this by contradiction: If there were a shorter path between $s$ and $u$, we could replace $s \leadsto u$ in $s \leadsto u \leadsto v$ with this shorter path, producing an even shorter path from $s$ to $v$. This contradicts our assumption that $s \leadsto u \leadsto v$ is a shortest path from $s$ to $v$.

> [!important] Computational Order / Dependencies
> - If a vertices $v$ has incoming edges from vertices $u_1, u_2,…, u_k$, then to solve the subproblem $v$ requires solutions to *all* of the subproblems $u_i$.
> - In other words, we must be solve the problem for all vertices which are *ancestors (predecessors)* of the target node first.  

#### Recursive Solution 
> [!function] DP Recurrence for Shortest Path in a DAG
> Let $G = (V, E)$ be a graph. Let $v_1, \ldots, v_n$ be an ordering of the vertices in $V$.
> > Note: $v_1, \ldots, v_n$ are in *topologically sorted order* if for all edges $(v_i, v_j) \in E$, $i < j$.
> 
> Let $\text{SP}(v_i, v_j)$ be the shortest-path distance from the source vertex $v_i$ to vertex $v_j$. 
> 
> For all $i \neq j$:
> $$
> \text{SP}(v_i, v_j)
> = \min_{\substack{(v_k, v_j)\in E \\[2pt] {\color{red}k<j}}}
> \big[\, \text{SP}(v_i, v_k) + w(v_k, v_j) \,\big].
> $$
> 
> Note that we have ${\color{red}k<j}$ so that vertices are processed in topologically sorted order, so that when we compute the distance to $v_j$ from some source vertex, all its predecessors $v_k$ have already been computed.  


## Graph with Cycles

In order for DP to work, the graph must be **acyclic**; otherwise, there will be infinite recursion or loops. 

To eliminate cyclic dependencies in the shortest path problem, we introduce additional subproblems to remove the cyclic dependencies:

Let $\delta_k(s, v)$ denote the length of the shortest path from $s$ to $v$ **using at most $k$ edges**.  

Then we can define the recurrence as the following:

$$
\delta_k(s, v) = 
\min_{(u,v)\in E}\,[\,\delta_{k-1}(s, u) + w(u,v)\,].
$$

Base cases:

$$
\delta_0(s, v) =
\begin{cases}
0, & \text{if } v = s,\\[4pt]
\infty, & \text{if } v \ne s.
\end{cases}
$$

If there are **no negative-weight cycles**, then

$$
\delta(s, v) = \delta_{|V|-1}(s, v),
$$

because any simple path can have at most $|V|-1$ edges.

---

We can also visualise this idea as a graph transformation.  

Let $G = (V, E)$ be the original directed graph (which may contain cycles).  
Construct a new layered graph $G' = (V', E')$ as follows:

- For each vertex $v \in V$, create $|V|$ copies:

  $$
  v_0, v_1, \ldots, v_{|V|-1}.
  $$

- For every edge $(u,v) \in E$, add edges

  $$
  (u_{k-1}, v_k)
  $$

  for all $k = 1, 2, \ldots, |V|-1$ in $G'$.

In this expanded acyclic graph $G'$, the shortest path from $s_0$ to $v_k$ represents the shortest path from $s$ to $v$ using at most $k$ edges.  

This acyclic structure allows dynamic programming to compute $\delta_k(s,v)$ efficiently without cyclic dependencies.
