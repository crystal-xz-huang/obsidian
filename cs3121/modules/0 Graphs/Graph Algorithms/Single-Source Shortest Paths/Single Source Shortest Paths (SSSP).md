---
tags:
  - topic/graph
  - algorithms
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

