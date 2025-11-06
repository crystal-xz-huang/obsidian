---
aliases: Bellman-Ford Algorithm
---

# Single Source Shortest Path (SSSP)

The SSSP problem: <b>Find shortest paths from the *source* vertex $s$ to every *other* vertex in the graph.</b>

> [!problem]
> <b>Instance</b>: A directed graph $G=(V,E)$ with edge weights $w(e)$ which can be negative, but without cycles of negative total weight, and a designated vertex  $s\in V$.
> 
> <b>Task</b>: Find the weight of the shortest path from vertex $s$ to every  other vertex $t$.

> [!definition] Notation
> Let $n = |V|$ and $m = |E|$.

## Shortest Path Trees

Almost every algorithm known for computing shortest paths from one vertex to another actually solves (large portions of) the SSP problem. This problem is usually solved by finding a **shortest path tree** rooted at $s$ that contains all the desired shortest paths.

*Optimal Substructure*: Every subpath on a shortest path from $v$ to $w$ is also a shortest path between the two endpoints.

![[sssp-structure.png]]

> [!definition] Claim
> <b>If shortest paths are unique, then they form a tree.</b>
> - Any subpath of a shortest path is itself a shortest path (optimal substructure)
> - If there are multiple shortest paths to some vertices, we can always choose one shortest path to each vertex so that the union of the paths is a tree. 
> - If there are shortest paths from $s$ to two vertices $u$ and $v$ that diverge, then meet, then diverge again, we can modify one of the paths without changing its length, so that the two paths only diverge once.

## Negative Edges

A **negative edge** is simply an edge having a negative weight. It could be in any context pertaining to the graph and what are its edges referring to. For example, the edge C-D in the above graph is a negative edge. Floyd-Warshall works by minimizing the weight between every pair of the graph, if possible. So, for a negative weight you could simply perform the calculation as you would have done for positive weight edges.

The problem arises when there is a **negative cycle**, because the presence of a negative cycle in a graph implies that shortest paths may not be well-defined. For any path from $s$ to $t$ that touches a negative cycle (i.e. there is a negative cycle reachable from source $s$), then you can keep traversing the cycle to make any path shorter and shorter, approaching -ve infinity. 

The problem is evident for any negative cycle in a graph. Hence, whenever a negative cycle is present, the minimum weight is not defined or is negative infinity, thus Floyd-Warshall cannot work in such a case.

In short: 
- <b>A shortest path from $s$ to $t$ exists if and only if there is at least one path from $s$ to $t$, but there is *no* path from $s$ to $t$ that touches a *negative cycle*.</b> For *any* path from $s$ to $t$ that touches a negative cycle, there is a shorter path from $s$ to $t$ that goes around the cycle one more time. Thus, if at least one path from $s$ to $t$ touches a negative cycle, there is no shortest path from $s$ to $t$.
- Adding a large positive number to all edge weights (to make them positive) does not work. (Why?) Paths with more edges can have smaller total weight than paths with fewer edges. If we increase all edge weights at the same rate, paths with more edges get longer faster than paths with fewer edges; as a result, the shortest path between two vertices might change.

---

**Negative edge weights:**
- Dijkstra's algorithm does not work with negative weights:
	- The greedy strategy is to repeatedly pick the next unvisited vertex $v$ with the shortest path $d[v]$ from $s$, assuming no other path found later (so must be longer) can make $d[v]$ smaller. 
	- Dijkstra's algorithm uses a priority queue to greedily select the closest vertex that has not yet been processed.
	- Recall: once we extract a vertex _v_ from the priority queue, it is never visited again.  
	⇒ if a negative-edge path to _v_ is explored later, the algorithm does not record it.
	- ==Existence of cycles breaks the order of subproblems==


**Negative weight cycles:**
- A negative weight cycle is a cycle in a graph where the sum of the edge weights is negative.
- This is when a problem arises, because if a path to a vertex includes a negative weight cycle, you can repeatedly traverse/loop this cycle to make the path cost smaller and smaller, approaching negative infinity.

> [!question|style-5] **Question:** How does this problem differ to the one solved by Dijkstra’s algorithm?
>  **Q:** How does this problem differ to the one solved by Dijkstra’s algorithm?
> **A:** The graph may have negative edge weights but no negative cycles
> 
> - In this problem, we allow negative edge weights, so the greedy strategy no longer works: the same vertex can be extracted  rom the priority queue multiple times; the same edge can be relaxed multiple times; and distances might not be discovered in increasing order.
> - Note that we disallow cycles of negative total weight. This is only because with such a cycle, there is no shortest path: you can take as many laps/loops around a negative cycle as you like to make the path cost smaller and smaller, approaching negative infinity.

---

# SSSP with Negative Weight Edges

## Bellman-Ford Algorithm 

> [!goal]
> **Goal**: Find the smallest total cost (shortest distance) from one source vertex $s$ to every other vertex $t$ in a weighted directed graph. 
> 
> Works even if some edge weights are negative, as long as there is no negative cycle.

> [!observation]
> <b>For any vertex $t$, there is a shortest $s − t$ path without cycles.</b>
> 
> <i>Proof:</i> Suppose the opposite. Let $p$ be a shortest $s − t$ path, so it must contain a cycle. Since there are no negative weight cycles, removing this cycle produces an $s − t$ path of no greater length. 
> 
> In short, every shortest path is simple: it visits each vertex at most once.
> 

> [!observation]
> <b>It follows that every shortest $s − t$ path contains any vertex $v$ at most once, and therefore has at most $n − 1$ edges.</b>
> 
> Every shortest path is a simple path that contains each vertex at most once. A simple path through $n$ vertices can have at most $n-1$ edges (because an edge connects two distinct vertices). 
> 
> In short, any shortest path must have $\leq n-1$ edges. 
> 
> Now we have a natural order of computation (because subproblems with fewer edges along the path will influence subproblems with more edges along the path) so we don't need topological order along the vertices; instead we have the order of how many edges are used.

> [!idea] Optimal Substructure
> - For every vertex $t$, let’s find the weight of a shortest $s−t$ path consisting of ==at most $i$ edges==, for each $i$ up to $n−1$.
> - Suppose the path in question is $$p=\underbrace{s \to \cdots \to v}_{p'} \to t,$$ with the final edge going from $v$ to $t$.
> - Then $p'$ must be itself the shortest path from $s$ to $v$ of at most $i − 1$ edges, which is another subproblem!
> - No such recursion is necessary if $t = s$, or if $i = 0$.

![[Bellman Ford Algorithm Recurrence.excalidraw.png]]

> [!idea]
> **Edge Relaxation**: For each vertex $t$ on the shortest path $(s \to t)$ with at most $i$ edges, consider a shortest path from source to $t$ that goes through a predecessor $v$ before $t$ on this path $(s \leadsto {\color{pink}v} \to t)$ and uses at most $i-1$ edges. 
> 
> $$
> {\color{blue}\operatorname{opt}(i,t)} = \min_{{\color{green}(v, t)} \in E} \big[{\color{pink}\operatorname{opt}(i - 1, v)} + {\color{green}w(v,t)} \ \big]
> $$
> 
> <b>Explanation:</b>
> For each predecessor $\color{pink}v$ on an incoming edge $({\color{pink}v} \to t)$, compute length of $(s \leadsto v \to t)$ with:
> 
> $$\operatorname{opt}(s \leadsto v \to t) = \operatorname{opt}(s \leadsto v) + \operatorname{weight}(v \to t)$$ 
> 
> Take the minimum of all distances to be $\operatorname{opt}(i, t)$ i.e. new shortest distance of $(s \leadsto t)$.

> [!solution]
> <b>Subproblems:</b>  
> For all $0 \le i \le n - 1$ and all $t \in V$, let $\operatorname{opt}(i,t)$ be the length of a shortest path from $s$ to $t$ that contains at most $i$ edges.
> 
> > Extra parameter $i$ so we have an order of computation that does not rely on the ordering of vertices in the graph. 
> 
> <b>Recurrence:</b>  
> For all $i > 0$ and $t \ne s$,
> $$
> \operatorname{opt}(i,t) = \min_{v: (v,t) \in E} \big[\operatorname{opt}(i - 1, v) + w(v,t) \ \big].
> $$
> 
> <b>Base cases:</b>  
> $$
> \operatorname{opt}(i,s) = 0, \ \operatorname{opt}(0,t) = \infty \text{ for all } t \ne s.
> $$
> - $\operatorname{opt}(i,s) = 0$ (distance from the source to itself is zero)
> - for all $t \neq s, \, \operatorname{opt}(0,t) = \infty$ (can't reach any other vertex with 0 edges)
> 
> <b>Order of computation:</b>  
> Solve subproblems in increasing order of $i$ (and any order of $t$),  since $\operatorname{opt}(i,t)$ depends only on $\operatorname{opt}(i - 1,v)$ for various $v$.
> 
> <b>Overall answer:</b>  
> The list of values $\operatorname{opt}(n - 1, t)$ over all vertices $t$.
> 
> <b>Time complexity:</b>  
> There are $n$ rounds: $i = 0, 1, \ldots, n - 1$.  
> In each round, each edge $(v,t)$ of the graph is considered only once.  
> Therefore, the time complexity is $O(nm)$.
> 
> <b>Space complexity:</b>  
> Maintain a DP table $\operatorname{opt}(i, t)$ that stores the length of the shortest path from the source $s$ to vertex $t$ using at most $i$ edges. This table has $O(n^2)$ entries since there are $n$ vertices and up to $n-1$ rounds of relaxation.  
> 
> It is possible to reduce this to $O(n)$. Including $\operatorname{opt}(i - 1, t)$ as a candidate for $\operatorname{opt}(i, t)$ doesn’t change the correctness of the recurrence, so we can instead maintain a table with only one row, and overwrite it at each round.
> 
> <b>Reconstruction:</b>  
> Let $\operatorname{pred}(i,t)$ be the immediate predecessor of vertex $t$ on a shortest $s - t$ path of at most $i$ edges. The additional recurrence required is
> $$
> \operatorname{pred}(i,t)=\arg\min_{v : (v,t)\in E} \big( \operatorname{opt}(i-1,v) + w(v,t) \big).
> $$

### Constructing the shortest path

To reconstruct the actual shortest path from a source vertex $s$ to any vertex $t$, we maintain a *predecessor array* $\operatorname{pred}[v]$ during the relaxation steps. Whenever we relax an edge $(u,v)$ and find a shorter path to $v$ through $u$, we update $\operatorname{pred}[v] = u$.

After the algorithm completes, we can reconstruct the shortest $s - t$ path by *backtracking* through the predecessors:

1. Start from $t$.
2. Repeatedly set $t = \operatorname{pred}[t]$ and record each vertex.
3. Continue until reaching the source $s$.
4. Reverse the recorded sequence to obtain the path from $s$ to $t$.

This process works because each $\operatorname{pred}[v]$ stores the immediate predecessor of $v$ on some shortest path from $s$.

### Example

![[Bellman Ford Algorithm Example.excalidraw.png]]


### Optimization

> [!summary]
> There are several small improvements that can be made to this algorithm. 
> 
> - As stated, we build a table of size $O(n^2)$, with a new row for each *round*. It is possible to reduce this to $O(n)$. Including $\operatorname{opt}(i - 1, t)$ as a candidate for $\operatorname{opt}(i, t)$ doesn’t change the correctness of the recurrence, so we can instead maintain a table with only one row, and overwrite it at each round.
> - The SPFA (Shortest Paths Faster Algorithm) speeds up the later rounds by ignoring some edges. This optimisation and others (e.g., early exit) do not change the worst-case time complexity from $O(nm)$, but they can be a significant speed-up in practical applications.
> - The Bellman–Ford algorithm can also be augmented to detect cycles of negative weight.

In Bellman–Ford algorithm, we maintain a DP table $\operatorname{opt}(i, t)$ that stores the length of the shortest path from the source $s$ to vertex $t$ using at most $i$ edges. This table has $O(n^2)$ entries since there are $n$ vertices and up to $n-1$ rounds of relaxation. However, we don’t actually need to keep all $n$ rows at once. The recurrence for Bellman–Ford only depends on values from the previous iteration—specifically, $\operatorname{opt}(i-1, v)$ when computing $\operatorname{opt}(i, t)$. This means we can reuse a single array of size $O(n)$ to store the current shortest distances and update them in each round.By overwriting the array at each iteration (i.e., using one table row instead of all $n$), we reduce the space complexity from $O(n^2)$ to $O(n)$ without affecting the correctness of the algorithm. This is the standard in-place implementation of the Bellman–Ford algorithm.

The SPFA algorithm is a practical improvement over Bellman–Ford that uses a queue to process only the vertices whose distances were updated in the previous round. This avoids unnecessary edge relaxations and can drastically reduce running time on many graphs. However, in the worst case (e.g., graphs with negative-weight cycles or dense graphs), it still performs $O(nm)$ work. 

Additionally, Bellman–Ford naturally detects negative-weight cycles by checking for further relaxations after $n-1$ rounds — if any distance can still be decreased, a negative cycle exists.


### Proof


> [!lemma] 
> **Path-relaxation property**
> If  $p = \langle v_0, v_1, \ldots, v_k \rangle$ is a shortest path from $s = {v_0}$ to $v_k$, and the edges of $p$ are relaxed in the order $(v_0, v_1), (v_1, v_2), \ldots, (v_{k-1}, v_k)$, then $v_k.d = \delta(s, v_k)$. This property holds regardless of any other relaxation steps that occur.


> [!lemma] Lemma 22.2
> Let $G=(V,E)$ be a weighted, directed graph with source vertex $s$ and weight function $w : E \to \mathbb{R}$, and assume that $G$ contains no negative-weight cycles that are reachable from $s$. Then, after the $|V|-1$ iterations of the for loop of $\textsf{Bellman-Ford}$, $v.d = \delta(s, v)$ for all vertices $v$ that are reachable from $s$.

Proof
We prove the lemma by appealing to the path-relaxation property. Consider any vertex $v$ that is reachable from $s$, and let $p = \langle v_0, v_1, \ldots, v_k \rangle$, where $v_0 = s$ and $v_k = v$ be any shortest path from vertex $s$ to vertex $v$.

Because shortest paths are simple, $p$ has at most $|V|-1$ edges, and so $k \leq |V| - 1$. Each of the $|V|-1$ iterations (rounds) relaxes all $|E|$ edges. Among the edges relaxed in the $i$th iteration, for $i = 1, 2, \ldots, j$, is $(v_{i-1}, v_i)$. By the path-relaxation property, therefore, $v.d = v_k.d  = \delta(s, v_k) = \delta(s, v)$.
 
