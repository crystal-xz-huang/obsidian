# Reductions

Problem solving by reduction: converting instances of the unseen problem to instances of a well-known problem and solving the well-known problem by established methods.

## Reductions

- **Reachability.** Given an (un-)directed graph $G = (V, E)$ and a vertex $s$, we can decide what vertices can be reached from $s$ in $O(m + n)$ time using either [[breadth-first search]] or [[depth-first search]].
- **Shortest path.** Given an (un-)directed graph $G = (V, E)$ and a vertex $s$, we can decide the shortest path from $s$ to every other vertex.
    - On a weighted graph, we can do this with [[Dijkstra’s algorithm]] in $O(m \log n)$ time.
    - On an unweighted graph, we can do this with [[breadth-first search]] in $O(m + n)$ time



Proof of Correctness (for reductions)
- Forward direction (soundness)
- Backward direction (completeness)

### Why this style of proof?

This is a **reduction correctness proof**:

- You reduce the new problem (“shortest alternating-colour path”) to an old one (“shortest path in unweighted graph”).
- Then you prove correctness by showing:
    1. Any path found in the reduced instance is valid for the original (forward/soundness).
    2. Any valid path in the original is preserved in the reduced instance (backward/completeness).

This style is very common when you design algorithms by reduction — it ensures the reduction is _both safe and complete_.

### 1. Forward direction (soundness)

Show that any solution produced by your algorithm in the modified instance is also a valid solution in the original problem.

> Proving that when you apply the established algorithm of your choice to your modified graph, the shortest path that you find does not use edges with both vertices of the same colour. This is what we refer to as the forward direction of the proof.

- In the modified graph ($G'$), we deleted all edges that join vertices of the same colour.
- Therefore, _any path in ($G'$)_ (including the one BFS finds) necessarily alternates colours at each step.
- So the BFS shortest path in ($G'$) is guaranteed to be a valid “no two consecutive same-colours” path in the original graph ($G$).

### 2. Backward direction (completeness)

Show that if a valid solution exists in the original problem, then it is also represented in the modified instance and can be discovered by the established algorithm.

> Proving that your established graph algorithm will consider any path that does not involve any edges with vertices of the same colour. This is what we refer to as the backwards direction of the proof.

Here
- Suppose there exists a shortest valid path in $G$ (no same-colour consecutive vertices).
- By construction of $G'$, every edge on this valid path connects different colours, so _the entire path is preserved_ in $G'$.
- BFS explores all paths in increasing length, so it will eventually consider and find this path (or an equally short one).
- Hence BFS in $G'$ finds the true shortest valid path.

## Examples

From Seminar 1:

> [!example|style-ad] Subset Shortest Path
> Let $G = (V,E)$ be an undirected and unweighted graph, and let $X, Y \subseteq V$ be two subsets of vertices. Note that $X$ and $Y$ are not necessarily disjoint. Define a measurement $r(X, Y)$ to denote the length of the shortest path from any vertex in $X$ to any vertex in $Y$. Given two subsets $X$ and $Y$, design an $O(|V| + |E|)$ algorithm to compute $r(X, Y)$.
> 
> <b>Hint.</b> *Start with the special case where $|X| = |Y | = 1$; that is, $X$ and $Y$ just consist of a single vertex each. How would you compute $r(X, Y )$ in this setting? Then generalise this to where $X$ and Y can have any number of vertices.*

*Solution.* We reduce the problem to a standard shortest path problem. Let $G = (V, E)$ be our input graph. We construct $H$ as follows:

- Construct a new vertex $s$ and construct an edge from $s$ to every vertex in $X$.  
- Construct a new vertex $t$ and construct an edge from every vertex in $Y$ to $t$.

From $H$, we run a breadth-first search from $s$ to $t$ to obtain a shortest $(s,t)$-path– say of length $\ell.$ We claim that $r(X,Y) = \ell - 2$. To prove this, we show that there is a one-to-one correspondence between $(X,Y)$-paths in $G$ of length $k$ and $(s,t)$-paths in $H$ of length $k + 2$. From this claim, we deduce that shortest paths in $G$ correspond to shortest paths in $H$.

- $(\implies)$ %% forward direction (soundness) %%
  Let $P$ be an $(X,Y)$-path with path length $\ell$.  
  We extend $P$ to obtain an $(s,t)$-path through the path $s \to P \to t$. Note that the two extra edges exist, because $P$ must start from a vertex in $X$ and end in a vertex in $Y$. Therefore, the extension of $P$ is a valid path in $H$ with length $\ell + 2$.

- $(\impliedby)$ %% backward direction (completeness) %%
  Let $P'$ be an $(s,t)$-path with path length $\ell' + 2$, and let $P'$ be the path $s \to P \to t$.
  Since $s$ is only adjacent to vertices in $X$ and $t$ is only adjacent to vertices in $Y$, we obtain an $(X,Y)$-path by deleting the edge from $s$ to the start of $P$ and by deleting the edge from the end of $P$ to $t$. This yields an $(X,Y)$-path of length $(\ell' + 2) - 2 = \ell'$. 

This gives a one-to-one correspondence between paths in $G$ and $H$, and thus, if the shortest path in $G$ has length $\ell$, then the corresponding shortest path in $H$ has length $\ell + 2$, which proves the claim.

---

> [!example|alt] Negative Weighted Edge
> Let $G = (V,E)$ be a directed and weighted graph. Additionally, you know that exactly one edge in $G$ has a negative weight and you also know that there are no negative cycles. Given such a graph $G$ and two vertices $s, t \in V$, design an $O(|E| \log |V|)$ algorithm to return the shortest path from $s$ to $t$.  
> 
> <b>Hint.</b> *We cannot directly apply Dijkstra’s algorithm to the input graph; how could we modify it so that running Dijkstra’s algorithm is applicable? *

*Solution.* Let $w(x \to y)$ denote the weight of the edge $x \to y$, and let $u \to v$ be the unique edge with negative weight. The shortest path from $s$ to $t$ will either contain the edge $u \to v$ or not; therefore, we consider both cases and take the minimum total weight.  

We remove the edge $u \to v$ from $G$. Let $G^{\ast}$ be the resulting graph. For any pair of vertices $x$ and $y$ in $G$, let $d(x,y)$ and $d^{\ast}(x,y)$ denote the shortest distance from $x$ to $y$ in $G$ and $G^{\ast}$ respectively. Observe that the shortest path from $s$ to $t$ that does not pass through the negative weight will be the same in both $G$ and $G^{\ast}$. Therefore, it suffices to compute the shortest path in $G^{\ast}$ in two different ways.  

- **Case 1: The shortest path contains the edge $u \to v$.** Then such a path must have weight $d^{\ast}(s, u) + w(u \to v) + d^{\ast}(v, t)$.
- **Case 2: The shortest path does not contain the edge $u \to v$.** Then such a path must have weight $d^{\ast}(s, t)$. 

Thus, the shortest path in $G$ from $s$ to $t$ has weight  

$$
d(s, t) = \min \{ \, d^{\ast}(s, u) + w(u \to v) + d^{\ast}(v, t), \; d^{\ast}(s, t) \, \}
$$

We can compute $d(s,t)$ by running Dijkstra’s algorithm twice in $G^{\ast}$: once starting from $s$ to compute $d^{\ast}(s,u)$ and $d^{\ast}(s,t)$ and once starting from $v$ to compute $d^{\ast}(v,t)$. Therefore, the total running time of the algorithm is $O(|E| \log |V|)$.  

---
