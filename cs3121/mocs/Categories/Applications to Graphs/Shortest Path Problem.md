---
tags: categories
---

# Shortest Paths

The shortest path problem is the problem of finding a path between two vertices (or nodes) in a graph such that the sum of the edge weights along that path is minimised.

The problem is also sometimes called the **single-pair shortest path problem**, to distinguish it from the following variations:
- The **single-source shortest path problem**, in which we have to find shortest paths from a source vertex $v$ to all other vertices in the graph.
- The **single-destination shortest path problem**, in which we have to find shortest paths from all vertices in the directed graph to a single destination vertex $v$. This can be reduced to the single-source shortest path problem by reversing the arcs in the directed graph.
- The **all-pairs shortest path problem**, in which we have to find shortest paths between every pair of vertices $(v, v')$ in the graph.


## Single-Source Shortest Paths

> [!definition] Notation
> Let $n = |V|$ and $m = |E|$.

> [!problem]
> Given a weighted (un-)directed graph $G = (V,E)$ and a source vertex $s$, find the shortest path from $s$ to every other vertex.

> [!solution]
> - On a weighted graph, we can do this with [[Dijkstra's Algorithm]] in $O(m \log n)$ time.
> - On an unweighted graph, we can do this with breadth-first search in $O(m + n)$ time.

| Graph Type                 | Algorithm      | Time Complexity |
| -------------------------- | -------------- | --------------- |
| Unweighted                 | BFS            | $O(m + n)$       |
| Weighted (non-negative)    | Dijkstra       | $O(m \log n)$  |
| Weighted (may be negative) | Bellman–Ford   | $O(nm)$         |
| DAG                        | Topological DP | $O(m + n)$      |


We will now consider three variations of the single-source shortest-path problem:
- When edges have negative weights.
- Directed graphs.
- DAG's.


## Negative Weighted Edges

- Dijkstra's algorithm does not work with negative weights:
	- Recall: once we extract a vertex _v_ from the priority queue, it is never visited again.  
	⇒ if a negative-edge path to _v_ is explored later, the algorithm does not record it.
	- Even adding a large positive number to all edge weights (to make them positive) does not work. (Why?)

- Initialize:  
	- $d[s]=0$; all other $d[v] = \infty$,  where $d[v]$ is the distance (cost) of $s \leadsto v$. 
	- Put all vertices in the priority queue.
- Repeatedly extract the next unvisited vertex $u$ from pq with the smallest $d[u]$.
	- Once extracted, $u$ is never visited again.
	- The algorithm assumes $d[u]$ is now the shortest distance.
- For every outgoing edge from $u$, that is $u \to v$ with weight $w(u,v)$:
	- If $d[v] > d[u]+w(u,v)$ then update $d[v]$ and decrease its key in the heap.
	- If path $s \to \cdots \to u \to v$ is cheaper than current $d[v] = s \leadsto v$ then update $d[v]$.

**Negative edges:**
- A negative edge is simply an edge having a negative weight. It could be in any context pertaining to the graph and what are its edges referring to. 
- Floyd-Warshall works by minimizing the weight between every pair of the graph, if possible. So, for a negative weight you could simply perform the calculation as you would have done for positive weight edges.
- Negative edges only become a problem if you can _revisit_ them via a cycle.

**Negative weight cycles:**
- A negative weight cycle is a cycle in a graph where the sum of the edge weights is negative.
- This is when a problem arises, because if a path to a vertex includes a negative weight cycle, you can repeatedly traverse/loop this cycle to make the path cost smaller and smaller, approaching negative infinity.
- If a path to a vertex includes a negative weight cycle, the shortest path is undefined because the cost of the path can be made lower (shorter) indefinitely by repeatedly traversing this cycle. 
- The problem is evident for any negative cycle in a graph. Hence, whenever a negative cycle is present, the minimum weight is not defined or is negative infinity. 
- This makes algorithms that rely on finding a shortest path, like Dijkstra's algorithm, fail in graphs with negative cycles.

> [!example]
> ![enter image description here](https://i.sstatic.net/We326.png)
> 
> - A negative edge is simply an edge having a negative weight. It could be in any context pertaining to the graph and what are its edges referring to. For example, the edge C-D in the above graph is a negative edge. Floyd-Warshall works by minimizing the weight between every pair of the graph, if possible. So, for a negative weight you could simply perform the calculation as you would have done for positive weight edges.
> - The problem arises when there is a negative cycle. Take a look at the above graph. And ask yourself the question - what is the shortest path between A and E? You might at first feel as if its ABCE costing 6 ( 2+1+3 ). But actually, taking a deeper look, you would observe a negative cycle, which is BCD. The weight of BCD is 1+(-4)+2 = (-1). While traversing from A to E, i could keep cycling around inside BCD to reduce my cost by 1 each time. Like, the path A(BCD)BCE costs 5 (2+(-1)+1+3). Now repeating the cycle infinite times would keep reducing the cost by 1 each time. I could achieve a negative infinite shortest path between A and E.
> - The problem is evident for any negative cycle in a graph. Hence, whenever a negative cycle is present, the minimum weight is not defined or is negative infinity. 

> [!problem]
> Let $G = (V, E)$ be a directed, weighted graph. Suppose exactly one edge in $G$ has a **negative weight**, and there are **no negative cycles**.  
> 
> Given such a graph $G$ and two vertices $s, t \in V$, design an $O(|E| \log |V|)$ algorithm to return the shortest path from $s$ to $t$.
> 
> **Hint.** We cannot directly apply Dijkstra’s algorithm to a graph with a negative edge weight. How could we modify the graph so that Dijkstra’s algorithm becomes applicable?

> [!summary]
> 1. Remove the negative edge $(u, v)$ from $G$ to form $G^\ast$.  
> 2. Run **Dijkstra’s algorithm** on $G^\ast$ twice:
> 	   - From $s$ to compute $d^\ast(s, u)$ and $d^\ast(s, t)$  
> 	   - From $v$ to compute $d^\ast(v, t)$  
> 3. Combine results using the formula below for $d(s, t)$.
> $$
> d(s, t) = \min \big\{\, d^\ast(s, u) + w(u \to v) + d^\ast(v, t),\; d^\ast(s, t) \,\big\}.
> $$

> [!solution]
> Let $w(x \to y)$ denote the weight of edge $x \to y$, and let $u \to v$ be the **unique edge with negative weight**. The shortest path from $s$ to $t$ will either contain this edge $u \to v$ or not; therefore, we consider both cases and take the minimum total weight.
> 
> Remove the edge $u \to v$ from $G$.  Let $G^\ast$ be the resulting graph.
> 
> For any pair of vertices $x, y \in V$, let:
> - $d(x, y)$ = shortest distance from $x$ to $y$ in $G$  
> - $d^\ast(x, y)$ = shortest distance from $x$ to $y$ in $G^\ast$
> 
> Observe that any shortest path from $s$ to $t$ that **does not pass through the negative edge** $u \to v$ will be identical in $G$ and $G^\ast$.  Therefore, it suffices to compute the shortest path in $G^\ast$ in two different ways.
> 
> - <b>Case 1:</b> The shortest path **contains** the negative edge $u \to v$.  Then such a path must have weight:
> $$
> d^\ast(s, u) + w(u \to v) + d^\ast(v, t).
> $$
> 
> - <b>Case 2:</b> The shortest path **does not contain** the negative edge $u \to v$.  
> Then such a path must have weight:
> $$
> d^\ast(s, t).
> $$
> 
> Hence, the shortest path from $s$ to $t$ in $G$ has weight:
> $$
> d(s, t) = \min \big\{\, d^\ast(s, u) + w(u \to v) + d^\ast(v, t),\; d^\ast(s, t) \,\big\}.
> $$
> We can compute $d(s, t)$ by running Dijkstra’s algorithm twice in $G^\ast$: once starting from $s$ to compute $d^\ast(s,u)$ and $d^\ast(s,t)$ and once starting from $v$ to compute $d^\ast(v,t)$. Therefore, the total running time of the algorithm is
> $$
> O(|E| \log |V|).
> $$




