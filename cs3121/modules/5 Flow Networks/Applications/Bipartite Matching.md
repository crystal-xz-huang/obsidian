---
tags: [examples, topic/graph]
modules:
  - "[[mocs/Modules/Flow Networks|Module 5: Flow Networks]]"
---

# Bipartite Matching

> [!def] Bipartite matching
> A graph G is **bipartite** if the nodes can be partitioned into two subsets $L$ and $R$ such that every edge connects a node in $L$ with a node in $R$.
> 
> A matching M is a set $M \subseteq L \times R$ of size $k$  edges such that:
>  - each node in $L$ and $R$ participates in at most one edge in $M$
>  - $|M| = k$ 
> 
> **Maximum Bipartite Matching** 
> Given a bipartite graph $G = (L \cup R, E)$, find an $S \subseteq L \times R$ that is a matching and is as large as possible i.e., find a max-cardinality matching.



1. Given bipartite graph $G = (A \cup B, E)$, direct the edges from $A$ to $B$.
2. Add new vertices $s$ and $t$.
3. Add an edge from $s$ to every vertex in $A$.
4. Add an edge from every vertex in $B$ to $t$.
5. Make all the capacities $1$.
6. Solve maximum network flow problem on this new graph $G'$.

The edges used in the maximum network flow will correspond to the largest possible matching!


- Suppose we have a set of people $L$ and set of jobs $R$.
- Each person can only do some of the jobs.
- Can model this as a bipartite graph →

Proof
- Integral Theorem ⇒ there exists a max flow $f^\ast$ in $G$ that is integral.
- 1–1 correspondence ⇒  $f^\ast$ corresponds to max-cardinality matching. 

Integral Theorem:
- Because the capacities are integers, our flow will be integral.
- Because the capacities are all 1, we will either:
	- use an edge completely (sending 1 unit of flow) or
	- not use an edge at all.


- Let $M$ be a matching in $G$ of cardinality $k$.
- Consider a flow $f$ that sends 1 unit on each of the $k$ corresponding paths used in $M$.
- $f$ is a flow of value $k$.

- We choose at most one edge leaving any node in $L$.
- We can choose at most one edge entering any node in $R$.
- If we chose more than 1, we 


Theorem. 1–1 correspondence between matchings of cardinality $k$ in $G$ and **integral flows** of value $k$ in $Gʹ$. 
In an integral flow, for each edge $e =(u, v)$, we have $f(e) \in \{ 0, 1 \}$. 

- Let $f$ be an integral flow in $G'$ of value $k$.
- Let $M$ be the set of edges going from $L$ to $R$ with $f(e) = 1$.

- $(\Longrightarrow)$ If there is a matching of $k$ edges, there is a flow $f$ of value $k$.
	- $f$ has $1$ unit of flow across each of the $k$ edges
	- $\leq 1$ unit leaves & enters each node (except $s$ and $t$)
- $(\Longleftarrow)$  If there is a flow $f$ of value $k$, there is a matching with $k$ edges.
	- each node in $L$ and $R$ participates in at most one edge in $M$
	- $|M| = k$ 


(2) $M$ is as large as possible (max-cardinality matching).

- We find the **maximum** flow $f$ (say with $k$ edges).
- This corresponds to a matching $M$ of $k$ edges.
- If there were a matching with $> k$ edges, we would have found a flow with value $> k$, contradicting that $f$ was maximum.
- Hence, $M$ is maximum.

We can find maximum bipartite matching in $O(mn)$ time.

How long does it take to solve the network flow problem on $G'$?
- The running time of Ford–Fulkerson is $O(m' C)$ where $m'$ is the number of edges, and $C = \sum_{e \text{ leaving } s} c_e$.
- $C = |L| = n$.
- The number of edges in $G'$ is equal to number of edges in $G$ ($m$) plus $2n$.
- So, running time is $O((m + 2n)n) = (mn + n^2) = O(mn)$.

You can improve this to $O(nm^2)$ by finding the maximum flow using the Edmonds–Karp algorithm (use BFS to find the augmenting path).

There are $n + k + 2$ vertices and up to $nk + n + k$ edges, so the time complexity is
$O(|V| \cdot |E|^2) = O\big((n + k + 2)(nk + n + k)^2\big)$.

Since the value of any flow is constrained by the total capacity from $s$, which in this case is $5n$, we can achieve a tighter bound of
$O(|E| \cdot |f|) = O\big((nk + n + k)n\big) = O(n^2 k)$.




