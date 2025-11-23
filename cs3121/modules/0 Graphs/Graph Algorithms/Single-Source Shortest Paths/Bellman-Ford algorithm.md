---
tags:
  - topic/graph
  - algorithms
---
# SSSP with Negative Weight Edges

> [!goal]
> **Goal**: Find the smallest total cost (shortest distance) from one source vertex $s$ to every other vertex $t$ in a weighted directed graph. 
> 
> Works even if some edge weights are negative, as long as there is no negative cycle.

# Bellman-Ford Algorithm 

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

![[Bellman Ford Algorithm Recurrence.png]]

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

![[Bellman Ford Algorithm Example.png]]


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
