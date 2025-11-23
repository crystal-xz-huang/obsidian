---
tags: [algorithms, examples]
---

# Edge-Disjoint Paths

> [!definition]
>  - **Edge Disjoint.** No two paths share an edge.
>  - A set of paths in $G$ is **edge-disjoint** if each edge in $G$ appears in at most one of the paths; several edge-disjoint paths may pass through the same vertex, however.

Given directed graph $G$, and two nodes $s$ and $t$, find the maximum number of edge-disjoint paths from $s$ to $t$ such that no two paths share an edge.

The idea is to reduce this to a Max-Flow problem:

- Give each edge capacity 1.
- Then any feasible flow must assign each edge a flow of 0 or 1.
- Flow conservation forces edges with flow = 1 to form s–t paths.
- Each unit of flow corresponds to one s–t path.
- Max-flow finds the maximum number of unit flows → the maximum number of edge-disjoint s–t paths.


If we give each edge capacity $1$, then the maximum flow from $s$ to $t$ pushes either $0$ or $1$ units of flow along each edge. The flow-decomposition theorem implies that the subgraph $S$ of saturated edges is the union of several edge-disjoint paths and cycles. Moreover, the number of paths in this decomposition is exactly equal to the value of the flow. Extracting the actual paths from $S$ is straightforward—follow any directed path in $S$ from $s$ to $t$, remove that path from $S$, and recurse.

Conversely, we can transform any collection of $k$ edge-disjoint paths into a flow by pushing one unit of flow along each path from $s$ to $t$; the value of the resulting flow is exactly $k$. It follows that any maximum flow algorithm actually computes the largest possible set of edge-disjoint paths.

The cut $(\{s\}, V \setminus \{s\})$ has capacity at most $V - 1$, so the maximum flow has value at most $V - 1$. Thus, Ford and Fulkerson’s original augmenting path algorithm already runs in $O(|f^*| \cdot E) = O(VE)$ time.



Idea:
- If two paths are edge-disjoint, they never use the same edge. So each edge can be used **at most once** across all paths. 
  ⇒ Each edge has a capacity constraint of 1.
- Because the capacities are all 1, we will either:
	- use an edge completely (sending 1 unit of flow) or 
	- not use an edge at all (no units of flow).
- A flow $f$ is an integral 0-1 flow: 
	- If every edge has capacity 1, then each edge contains either no flow, or 1 unit; therefore $f(e) \in \{ 0, 1\}$ for every edge $e$. 
	- The conservation constraint implies that $f(e)  \in \{ 0, 1\}$ for every vertex except $s$ and $t$, so we can continue 
	- The conservation constraint implies that



1–1 correspondence between $k$ edge-disjoint s-t paths in G and integral flows of value $k$ in $G'$.

$(\Longrightarrow)$ 

- Suppose we had $k$ edge-disjoint s−t paths. 
- Let $P_1, \ldots, P_k$ be $k$ edge-disjoint $s \leadsto t$ paths in $G$.
- Set $f(e) = \begin{cases} 1 &\text{if edge }e \text{ is included in some path } P_j\\ 0 &\text{otherwise}\end{cases}$
- Since paths are edge-disjoint, $f$ is a flow of value $k$.

$(\Longleftarrow)$ 

- Let $f$ be an integral flow in $G'$ of value $k$.
- Consider edge $(s, u)$ with $f(s, u) = 1$.
	- By flow conservation, there exists an edge $(u, v)$ with $f(u, v) = 1$.
	- Continue until we reach $t$, always choosing a new edge.
- Produces $k$ (not necessarily simple) edge-disjoint paths.
	- can eliminate cycles to get simple paths in O(mn) time if desired (flow decomposition)


- The conservation constraint implies that for each edge contains either no flow, or 1 unit: $f(e) \in \{ 0, 1\}$ 
- Any flow from $s$ to $t$ pushes either 0 or 1 units of flow along each edge
- A flow f is a 0-1 flow: each edge contains either no flow, or 1 unit.
- We can use a maximum flow algorithm to find k edge-disjoint, s-t paths in a graph.
	- choose at most one edge leaving any node adjacent from $s$
	- choose at most one edge entering any node adjacent to $t$
- The value of a flow is the sum of all 0-1 flows leaving $s$ which is equivalent to the number of (s-t)-paths with no common edges.

If $f$ is a 0-1 flow of value $k$, then the set of edges $e=(s, u)$ where $f(e) = 1$ is the set of $k$ edge-disjoint paths.



# Vertex-Disjoint Paths

> [!definition]
> - **Vertex Disjoint.** No two paths share a vertex.
> - If two or more paths/subgraphs are **vertex-disjoint**, they are also **edge-disjoint**, as they cannot share any edges if they don't share any vertices. 

> [!problem]
> **Instance:** You are given a directed graph $G$ with $n$ vertices and $m$ edges. Of these vertices, $r$ are painted red, $b$ are painted blue, and the remaining $n - r - b$ are black. Red vertices have only outgoing edges and blue vertices have only incoming edges.  
> 
> **Task:** Design an algorithm which runs in $O(n(n + m))$ time and determines the largest possible number of vertex-disjoint (i.e. non-intersecting) paths in this graph, each of which starts at a red vertex and finishes at a blue vertex.
