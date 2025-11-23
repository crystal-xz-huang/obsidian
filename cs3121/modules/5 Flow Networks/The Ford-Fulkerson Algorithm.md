---
tags:
  - algorithms
  - topic/graph
  - topic/greedy
modules:
  - "[[mocs/Modules/Flow Networks|Module 5: Flow Networks]]"
cssclasses:
  - table-header-col
---

 
# Max-Flow and Min-Cut

An (s-t)-cut is a partition (A, B) of the vertices with s \in A and t \in B.

It capacity is the sum of the capacities of the edges from A to B.



# The Ford-Fulkerson Algorithm

FFA is a **greedy algorithm** that computes the maximum flow in a flow network

The idea is as follows: as long as there is a (s-t)-path from the source (start node) to the sink (end node), with available capacity on all edges in the path, we send flow along one of the paths. Then we find another path, and so on. A path with available capacity is called an augmenting path.

**Algorithm**
Let $G(V,E)$ be a graph, and for each edge from $u$ to $v$, let $c(u,v)$ be the capacity and $f(u,v)$ be the flow. We want to find the maximum flow from the source $s$ to the sink $t$. After every step in the algorithm the following is maintained:

|     |     |     |
| --- | --- | --- |     
| Capacity constraints | $\forall (u, v) \in E: \ f(u,v) \le c(u,v)$ | The flow along an edge cannot exceed its capacity. |
| Skew symmetry | $\forall (u, v) \in E: \ f(u,v) = - f(v,u)$ | The net flow from $u$ to $v$ must be the opposite of the net flow from $v$ to $u$. |
| Flow conservation | $\forall u \in V: u \neq s \text{ and } u \neq t \Rightarrow \sum_{w \in V} f(u,w) = 0$ | The net flow to a node is zero, except for the source, which "produces" flow, and the sink, which "consumes" flow. |
| Value($f$) | $\sum_{(s,u) \in E} f(s, u) = \sum_{(v,t) \in E} f(v, t)$ | The flow leaving from $s$ must be equal to the flow arriving at $t$. |

This means that the flow through the network is a *feasible flow* after each round in the algorithm. We define the **residual network** $G_f(V,E_f)$ to be the network with capacity $c_f(u,v) = c(u,v) - f(u,v)$ and no flow. Notice that it can happen that a flow from $v$ to $u$ is allowed in the residual network, though disallowed in the original network: if $f(u,v)>0$ and $c(v,u)=0$ then $c_f(v,u)=c(v,u)-f(v,u)=f(u,v)>0$.



**Inputs**  
Given a Network $G = (V,E)$ with flow capacity $c$, a source node $s$, and a sink node $t$

**Output**  
Compute a flow $f$ from $s$ to $t$ of maximum value

**Procedure**  
1. $f(u,v) := 0$ for all edges $(u,v)$
2. While there is a path $p$ from $s$ to $t$ in $G_f$, such that $c_f(u,v) > 0$ for all edges $(u,v) \in p$:
    - Find $c_f(p) = \min\{c_f(u,v) : (u,v) \in p\}$ (*The residual capacity of p*)
    - For each edge $(u,v) \in p$
        - $f(u,v) := f(u,v) + c_f(p)$ (*Send flow along the path*)  
        - $f(v,u) := f(v,u) - c_f(p)$ (*The flow might be "returned" later*)

The path in step 2 can be found with, for example, breadth-first search (BFS) or depth-first search in $G_f(V,E_f)$. The former is known as the Edmonds–Karp algorithm.

When no more paths in step 2 can be found, $s$ will not be able to reach $t$ in the residual network. If $S$ is the set of nodes reachable by $s$ in the residual network, then the total capacity in the original network of edges from $S$ to the remainder of $V$ is on the one hand equal to the total flow we found from $s$ to $t$, and on the other hand serves as an upper bound for all such flows. This proves that the flow we found is maximal. See also Max-flow Min-cut theorem.

If the graph $G(V,E)$ has multiple sources and sinks, we act as follows:  
Suppose that $T=\{t\mid t \text{ is a sink}\}$ and $S=\{s\mid s \text{ is a source}\}$. Add a new source $s^*$ with an edge $(s^*,s)$ from $s^*$ to every node $s\in S$, with capacity $c(s^*,s)=d_s=\sum_{(s,u)\in E}c(s,u)$. And add a new sink $t^*$ with an edge $(t, t^*)$ from every node $t\in T$ to $t^*$, with capacity $c(t, t^*)=d_t=\sum_{(v,t)\in E}c(v,t)$. Then apply the Ford–Fulkerson algorithm.

Also, if a node $u$ has capacity constraint $d_u$, we replace this node with two nodes $u_{\mathrm{in}},u_{\mathrm{out}}$, and an edge $(u_{\mathrm{in}},u_{\mathrm{out}})$, with capacity $c(u_{\mathrm{in}},u_{\mathrm{out}})=d_u$. We can then apply the Ford–Fulkerson algorithm.



[Ford–Fulkerson algorithm - Wikipedia](https://en.wikipedia.org/wiki/Ford%E2%80%93Fulkerson_algorithm)


---

> [!definition]
> Given a flow network $G$ and a flow $f$. 
> For each edge $(u, v) \in V$, we define the ***residual capacity*** $c_f(u, v)$ by
> $$
> c_f(u, v) =
> \begin{cases}
> c(u, v) - f(u, v) &\text{if } (u, v) \in E,\\[4pt]
> f(v, u) &\text{if } (v, u) \in E,\\[4pt]
> 0&\text{otherwise.}
> \end{cases}
> $$
> 
> In a flow network $G$, there is at most one edge between any two vertices and so exactly one case applies to each directed edge.
> 
> In particular, for any edge in $G$ either $c(u,v)=0$ or $c(v,u)=0$. 
> 
> Therefore residual capacity only depends on two cases:
> 
> $$\begin{align}
> (u,v) \in E \implies (v,u) \notin E \qquad &\Longleftrightarrow \qquad c(v,u)=0 \\
> (u,v) \in E \implies (u,v) \notin E \qquad &\Longleftrightarrow \qquad c(u,v)=0 \\
> \end{align}$$
> 

Residual Graph
1. $G_f$ contains the same vertices (nodes) as $G$
2. **Forward edges:** For each edge $(u,v)$ of $G$ for which $\pmb{\color{pink}f < c}$, include an edge $(u,v)$ in $G_f$ with capacity $c_f(u, v) = c(u, v) - f(u,v) > 0$
3. **Backward edges:** For each edge $(u,v)$ of $G$ for which $\pmb{\color{pink}f > 0}$, include an edge $(v, u)$ in $G_f$ in the opposite direction to $(u,v)$ with capacity $c_f(v, u) = f(u,v)> 0$

There is no forward residual edge if $f = c$ and no backward residual edge if $f=0$.

Consider an edge $(u,v) \in G$ with capacity $c$ and flow $f$.
Then $c(v,u) = 0$ and the residual graph contains two edges:

- If $f < c$ there is edge $(u,v)$ in $G_f$ with capacity $c_f(u,v) = c - f$ 
- If $f > 0$ there is a reverse edge $(v, u)$ in $G_f$ with capacity $c_f(v, u) = f$


---

For a flow $f$ in a network $G$, we define a residual graph $G_f$.

The residual capacity on each edge tells us how much units of flow we can increase (forward residual capacity) or decrease (backward residual capacity) on that edge in $G$.

Therefore, the edges of the augmenting path in $G_f$ indicate on which edges in $G$ to update the flow in order to increase the flow value.


If there is an $s$-to-$t$ path in the residual graph where all edges have positive residual capacity, then we can increase the total flow by sending an amount equal to the **minimum residual capacity** (the bottleneck) on that path.

To augment the flow, we:

- **increase** flow on edges that appear as *forward* residual edges
- **decrease** flow on edges that appear as *backward* residual edges

This increases the net flow from $s$ to $t$ by the bottleneck amount.

We recompute the residual graph and repeat.
When no $s$-$t$ path remains in the residual graph, we cannot increase the flow further.

At this point, the set of vertices reachable from $s$ in the residual graph forms a cut $(S, T)$ where:

- all edges from $S$ to $T$ are saturated ($f = c$)
- all edges from $T$ to $S$ carry zero flow ($f = 0$)

Therefore, the value of the flow equals the capacity of this cut.
This means the flow is **maximum**, and the cut is **minimum**.
