---
tags: [examples, topic/graph]
modules:
  - "[[mocs/Modules/Flow Networks|Module 5: Flow Networks]]"
---

# Applications of Network Flow

## Networks with multiple sources and sinks

Flow networks with multiple sources and sinks are reducible to networks with a single source and single sink by adding a “**super-source**” (which sends flow to all source vertices) and “**super-sink**” (sends flow to all sink vertices) and connecting them to all sources and from all sinks respectively.

![[networks-multiple-source-sinks.png|300]]

- If there is a constraint on how much flow can originate at each of the sources or be collected at each of the sinks, we can encode it in the capacities of the edges we construct.  
- Otherwise, we use edges of **infinite capacity** (like in the image above).
	- An infinite capacity edge will never be saturated; in the residual graph, the forwards edge has infinite capacity no matter how much flow has already been sent forwards.
	- So long as there isn’t an infinite capacity path from $s$ to $t$, the usual time complexity bounds still apply for Edmonds-Karp.
	- Practically not much different than choosing a finite edge capacity much much larger than the rest of the capacities.

Example of converting a multiple-source, multiple-sink maximum-flow problem into a 

| ![[clrs-flow-fig24.3.png]]                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **(a)** A flow network with three sources $S=\{s_1, s_2, s_3\}$ and two sinks $T= \{t1, t2\}$. <br>**(b)** An equivalent single-source, single-sink flow network. Add a supersource $s$ with an edge with infinite capacity from $s$ to each of the multiple sources. Also add a supersink $t$ and an edge with infinite capacity from each of the multiple sinks to $t$. |

## Networks with vertex capacities (not edges!)

Suppose not just the edges, but also the vertices of the flow graph $G$ have capacities. 

Every vertex capacity limits the total flow passing through that vertex. That is:
- all flow entering the vertex must equal all flow leaving it (by conservation)
- AND that amount cannot exceed $C(v)$.

So in addition to the edge capacity constraints, for each vertex $v$ other than $s$ and $t$, we require the total flow into $v$ (and therefore the total flow out of $v$) to be **at most** some non-negative value $C(v)$:

$$
\begin{equation}
\sum_{e(u,v)\in E} f(u,v)=\sum_{e(v,w)\in E} f(v,w)\le C(v).
\end{equation}
$$

We can handle this by reducing it to a flow network $\bar{G}$ with **only edge capacities**! 


- Suppose vertex $v$ has capacity $C(v)$.
- Split $v$ into two vertices $v_{\text{in}}$ and $v_{\text{out}}$.
- Attach all of $v$’s incoming edges to $v_{\text{in}}$ and all its outgoing edges from $v_{\text{out}}$.
- Connect $v_{\text{in}}$ and $v_{\text{out}}$ with an edge $e^* = (v_{\text{in}}, v_{\text{out}})$ of capacity $C(v)$.

The idea is to convert vertex capacities → edge capacities, by forcing *all* flow through the vertex to pass through one edge:

![[flow-applications-vertex-capacities.excalidraw.png]]

The reduction from $G$ to $\bar{G}$ takes $O(E)$ time, after which we can compute the maximum flow in $\bar{G}$ using Edmonds-Karp algorithm in $O(VE^2)$ time.

> [!summary]
> Replace every vertex $v$ with two vertices $v_{\text{in}}$ and $v_{\text{out}}$, connected by an edge $v_{\text{in}} \to v_{\text{out}}$ with capacity $c(v)$, and then replace every directed edge $u\to v$ with the edge $u_{\text{out}} \to u_{\text{in}}$ (keeping the same capacity). 
> 
> This implies that every feasible $(s_{\text{out}}, t_{\text{in}})$-flow in $\bar{G}$ is equivalent to a feasible $(s, t)$-flow with the same value in the original graph $G$, and vice versa. In particular, every maximum flow in $\bar{G}$ is equivalent to a maximum flow in $G$. 

## Edge-Disjoint Paths

- Two (or more) paths are **edge-disjoint** if they do not share any common edges.

Suppose you want to send $k$ large files from $s$ to $t$ but never have two files use the same network link (to avoid congestion on the links).

This leads naturally to the Edge-Disjoint Paths problem:

> [!problem] $k$ Edge-disjoint Paths
> Given directed graph $G$, and two nodes $s$ and $t$, find $k$ paths from $s$ to $t$ such that no two paths share an edge. 

If every edge has capacity 1, then a max-flow automatically returns the maximum number of edge-disjoint paths from $s$ to $t$, because each unit of flow corresponds to one path and no edge can carry more than 1 unit.

---

[Maximum flow problem - Wikipedia](https://en.wikipedia.org/wiki/Maximum_flow_problem)

**Application**

**Multi-source multi-sink maximum flow problem**  

Given a network $N = (V, E)$ with a set of sources $S = \{s_1, \ldots, s_n\}$ and a set of sinks $T = \{t_1, \ldots, t_m\}$ instead of only one source and one sink, we are to find the maximum flow across $N$. We can transform the multi-source multi-sink problem into a maximum flow problem by adding a *consolidated source* connecting to each vertex in $S$ and a *consolidated sink* connected by each vertex in $T$ (also known as *supersource* and *supersink*) with infinite capacity on each edge.

**Maximum cardinality bipartite matching**  

Given a bipartite graph $G = (X \cup Y, E)$, we are to find a maximum cardinality matching in $G$, that is a matching that contains the largest possible number of edges. This problem can be transformed into a maximum flow problem by constructing a network $N = (X \cup Y \cup \{s,t\}, E')$, where  
- $E'$ contains the edges in $G$ directed from $X$ to $Y$.  
- $(s,x) \in E'$ for each $x \in X$ and $(y,t) \in E'$ for each $y \in Y$.  
- $c(e) = 1$ for each $e \in E'$ (See Fig. 4.3.1).

Then the value of the maximum flow in $N$ is equal to the size of the maximum matching in $G$, and a maximum cardinality matching can be found by taking those edges that have flow $1$ in an integral max-flow.

**Minimum path cover in directed acyclic graph**  
Given a directed acyclic graph $G = (V, E)$, we are to find the minimum number of vertex-disjoint paths to cover each vertex in $V$. We can construct a bipartite graph $G' = (V_\textrm{out} \cup V_\textrm{in}, E')$ from $G$, where  
- $V_\textrm{out} = \{ v_\textrm{out} \mid v \in V \land v \text{ has outgoing edge(s)} \}$  
- $V_\textrm{in} = \{ v_\textrm{in} \mid v \in V \land v \text{ has incoming edge(s)} \}$  
- $E' = \{(u_\textrm{out}, v_\textrm{in}) \in V_\textrm{out} \times V_\textrm{in} \mid (u, v) \in E \}$.

Then it can be shown that $G'$ has a matching $M$ of size $m$ if and only if $G$ has a vertex-disjoint path cover $C$ containing $m$ edges and $n-m$ paths, where $n$ is the number of vertices in $G$. Therefore, the problem can be solved by finding the maximum cardinality matching in $G'$ instead.

Assume we have found a matching $M$ of $G'$, and constructed the cover $C$ from it. Intuitively, if two vertices $u_\mathrm{out}, v_\mathrm{in}$ are matched in $M$, then the edge $(u, v)$ is contained in $C$. Clearly the number of edges in $C$ is $m$. To see that $C$ is vertex-disjoint, consider the following:  
- Each vertex $v_\textrm{out}$ in $G'$ can either be *non-matched* in $M$, in which case there are no edges leaving $v$ in $C$; or it can be *matched*, in which case there is exactly one edge leaving $v$ in $C$. In either case, no more than one edge leaves any vertex $v$ in $C$.  
- Similarly for each vertex $v_\textrm{in}$ in $G'$ – if it is matched, there is a single incoming edge into $v$ in $C$; otherwise $v$ has no incoming edges in $C$.

Thus no vertex has two incoming or two outgoing edges in $C$, which means all paths in $C$ are vertex-disjoint.

To show that the cover $C$ has size $n-m$, we start with an empty cover and build it incrementally. To add a vertex $u$ to the cover, we can either add it to an existing path, or create a new path of length zero starting at that vertex. The former case is applicable whenever either $(u,v) \in E$ and some path in the cover starts at $v$, or $(v,u) \in E$ and some path ends at $v$. The latter case is always applicable. In the former case, the total number of edges in the cover is increased by $1$ and the number of paths stays the same; in the latter case the number of paths is increased and the number of edges stays the same. It is now clear that after covering all $n$ vertices, the sum of the number of paths and edges in the cover is $n$. Therefore, if the number of edges in the cover is $m$, the number of paths is $n-m$.

**Maximum flow with vertex capacities**  


Let $N = (V, E)$ be a network. Suppose there is capacity at each node in addition to edge capacity, that is, a mapping $c: V \to \mathbb{R}^+$, such that the flow $f$ has to satisfy not only the capacity constraint and the conservation of flows, but also the vertex capacity constraint  
$\displaystyle \sum_{i\in V} f_{iv} \le c(v) \qquad \forall v \in V \backslash \{s,t\}.$

In other words, the amount of flow passing through a vertex cannot exceed its capacity. To find the maximum flow across $N$, we can transform the problem into the maximum flow problem in the original sense by expanding $N$. First, each $v\in V$ is replaced by $v_{\text{in}}$ and $v_{\text{out}}$, where $v_{\text{in}}$ is connected by edges going into $v$ and $v_{\text{out}}$ is connected to edges coming out from $v$, then assign capacity $c(v)$ to the edge connecting $v_{\text{in}}$ and $v_{\text{out}}$ (see Fig. 4.4.1). In this expanded network, the vertex capacity constraint is removed and therefore the problem can be treated as the original maximum flow problem.

**Maximum number of paths from s to t**  
Given a directed graph $G = (V, E)$ and two vertices $s$ and $t$, we are to find the maximum number of paths from $s$ to $t$. This problem has several variants:

1. The paths must be edge-disjoint. This problem can be transformed to a maximum flow problem by constructing a network $N = (V, E)$ from $G$, with $s$ and $t$ being the source and the sink of $N$ respectively, and assigning each edge a capacity of $1$. In this network, the maximum flow is $k$ iff there are $k$ edge-disjoint paths.
2. The paths must be independent, i.e., vertex-disjoint (except for $s$ and $t$). We can construct a network $N = (V, E)$ from $G$ with vertex capacities, where the capacities of all vertices and all edges are $1$. Then the value of the maximum flow is equal to the maximum number of independent paths from $s$ to $t$.
3. In addition to the paths being edge-disjoint and/or vertex disjoint, the paths also have a length constraint: we count only paths whose length is exactly $k$, or at most $k$. Most variants of this problem are NP-complete, except for small values of $k$.

**Closure problem**  

A **closure** of a directed graph is a set of vertices $C$, such that no edges leave $C$. The **closure problem** is the task of finding the maximum-weight or minimum-weight closure in a vertex-weighted directed graph. It may be solved in polynomial time using a reduction to the maximum flow problem.
