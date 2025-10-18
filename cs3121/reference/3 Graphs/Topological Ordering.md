
In the special case where a directed graph G has no cycles (i.e. a **directed acyclic graph**), then we can order the vertices of $G$ by the following rule:

> [!def] Topological Ordering
> Let $G = (V, E)$ be a directed graph, and let $n = |V|$.  
> A **topological ordering** of $G$ is a linear ordering (enumeration) of its vertices  
>
> $$
> \sigma : V \to \{1, \dots, n\}
> $$
>
> such that if there exists an edge $(v, w) \in E$, then $v$ precedes $w$ in the ordering, i.e.
>
> $$
> \sigma(v) < \sigma(w).
> $$

> [!bookmark] Property
> A **directed acyclic graph (DAG)** permits a topological ordering of its vertices.
> 
> Note that a topological ordering is not necessarily unique — there may be more than one valid topological ordering of the vertices.

A <b>topological sort</b> or <b>topological ordering</b> of a **directed acyclic graph (DAG)** is a linear ordering of its vertices such that for every directed edge ($\color{#08F}{u}$ → $\color{fuchsia}{v}$), vertex $\color{#08F}{u}$ comes before $\color{fuchsia}{v}$ in the ordering.

> If u → v, then “u must happen before v" or "v depends on the u"

Another way to describe it is that when you put all vertices horizontally on a line, all of the edges are pointing from left to right.

![image](https://assets.leetcode.com/users/images/63bd7ad6-403c-42f1-b8bb-2ea41e42af9a_1613794080.8115625.png)

This is very useful for greedy algorithms and dynamic programming because it allows us to impose an order on something that hasn't happened yet (e.g. no future events can come before the present ones).

- Intuitively, it's like a “schedule” or “dependency order." 
- No vertex appears before one of its prerequisites ⇒ no causes come before its effect 
- All edges (dependencies) point **forward** in the order ⇒ list tasks in dependency order

For instance, the vertices of the graph may represent tasks to be performed, and the edges may represent constraints that one task must be performed before another; in this application, a topological ordering is just a valid sequence for the tasks.

- Only directed acyclic graph (DAGs) can have topological orderings (because cycles make ordering impossible).
- A DAG can have many valid orderings (depends on how you break ties). 
- You can find one using DFS or Kahn’s algorithm — both run in linear $O(|V| + |E|)$ time.

# References & Further Reading

- [Topological Sorting - Algorithms for Competitive Programming](https://cp-algorithms.com/graph/topological-sort.html)
- [Introduction to Topological Sort - Discuss - LeetCode](https://leetcode.com/discuss/post/1078072/introduction-to-topological-sort-by-sinc-i0ii/)