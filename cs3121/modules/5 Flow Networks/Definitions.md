---
tags: [notes, topic/graph]
modules:
  - "[[mocs/Modules/Flow Networks|Module 5: Flow Networks]]"
---

# Flow Networks

> [!def] Flow Network
> A **flow network** is a directed graph $G = (V, E)$ in which each edge $e = (u, v) \in E$ has a positive (nonnegative) <u>integer</u> **capacity** $c(u, v) \ge 0$.  
> 
> If $e = (u, v) \notin E$, then we define $c(u, v) = 0$. ==In words: if $u \to v$ is not an edge in the graph, we assume that it has zero capacity.==
> 
> There are two distinguished vertices: a **source** $s$ and a **sink** $t$.
> 
> No edge enters the source, and no edge leaves the sink. 
> 
> Because each vertex other than $s$ has one entering edge, we have $|E| \geq |V|-1$.
> 
> ![[flows.png]]

> [!important] 
> In the following examples:
> - Each edge is labeled $(u, v)$ is labeled by $\text{flow/capacity} = f(u, v)/c(u, v).$ 
> - $f/c$ represents $f$ units of flow sent through an edge of capacity $c$.
> - The slash notation merely separates the flow and capacity and does not indicate division.

Examples of flow networks (possibly with multiple sources and multiple sinks):
- transportation networks 
- gas pipelines  
- computer networks  
- and many more

Consider this transportation network:

|                                                                                                                                                                                                                 ![[clrs-flow-fig24.1.png]]                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **(a)** A flow network $G = (V, E)$ for the Puck Company's trucking problem. The Vancouver factory is the source $s$ and the Winnipeg warehouse is the sink $t$. The company ships pucks through intermediate cities, but only $c(u, v)$ crates per day can go from city $u$ to city $v$. Each edge is labeled with its capacity.<br>**(b)** A flow $f$ in $G$ with value $\|f\| = 19$. Each edge is labeled $(u, v)$ is labeled by $f(u, v)/c(u, v)$.  |


## Flows

[!def] Flow

A **flow** $f$ is a <u>function</u> $f : E \to \Bbb{R}^{+}_{0}$ that <u>assigns a nonnegative integer for each edge in G</u>, where each $f(u, v) \geq 0$ represents the net flow of units along an edge (i.e., the net amount of units being transferred from one node to the other). 

A flow $f$ in a flow network $G$ must satisfy the following two constraints:

**Capacity constraint:** For all edges $e = (u, v) \in E$$$0 \leq f(u, v) \le c(u, v)$$ i.e., the nonnegative flow through any edge does not exceed its capacity


**Flow conservation:** For each vertex $v \in V \setminus \{s, t\}$ 

$$
\begin{equation}
\sum_{(u, v) \in E} f(u, v) =\sum_{(v, w) \in E} f(v, w)
\end{equation}
$$

i.e., the total sum of flow *into* any vertex is equal to the flow *out* of that vertex, except at the source $s$ and the sink $t$ — "flow in = flow out".

$$f^{\text{in}}(e) = f^{\text{out}}(e)$$

The flow on an edge, denoted by $f(u, v)$, is the units (amount) of flow from vertex $u$ to vertex $v$. 


It follows that the net flow to a vertex is zero, except for the source, which "produces" flow, and the sink, which "consumes" flow.
   
$$
\begin{equation}
f^{\text{in}}(e) - f^{\text{out}}(e) = 0\ \Longleftrightarrow \ 
\sum_{w \in V} f(w, u) - \sum_{w \in V} f(u, w) = 0 
\end{equation}
$$
   
   
$$
\begin{align}
f^{\text{in}}(e) = -f^{\text{out}}(e) \ \Longleftrightarrow \ 
\sum_{w \in V} f(w, u) &= - \sum_{w \in V} f(u, w) \\
f(w, u) &= -f(u, w)
\end{align}
$$
   

A flow must satisfy the restriction that the amount of flow into a node equals the amount of flow out of it, unless it is the source $s$, which has outgoing flow (i.e., produces flow), or sink $t$, which has incoming flow (i.e., consumes flow).



> [!def] Flow Value
> The **value** of a flow $f$ is the total net flow *out* of the source vertex $s$, defined as
>
> $$
> |f| = \sum_{v : (s, v) \in E} f(s, v)
>      = \sum_{v : (v, t) \in E} f(v, t)
> $$
>
> i.e., the flow leaving the source, or equivalently, the flow arriving at the sink.

#### Flow Conservation

An **(s, t)-flow** (or just a **flow**[^1]) is a function $f : E \to \mathbb{R}$ that satisfies the following ***conservation constraint*** at every vertex $v$ except possibly $s$ and $t$:

$$
\begin{align}
\sum_{v} f(u \to v) \ &= \ \sum_{w} f(v \to w) \\[8pt]
\text{total flow into } v \ &= \ \text{total flow out of } v 
\end{align}
$$

i.e., for every vertex, "flow in equals flow out".

Define $f(u \to v) = 0$ if there is no edge $u \to v$ in the graph.

#### Flow Value

The **value of the flow** $f$, denoted $|f|$, is the total **net flow *out* of the source vertex** $s$:

$$
\begin{align}
|f| &= \sum_{s} f(s \to v) - \sum_{u} f(u \to s) \\[8pt]
&=  \sum_{v} f(s, v) \ = \ \sum_{t} f(v,t) \\[8pt]
&= \text{total flow out of }s - \text{total flow into } s
\end{align}
$$

(Here, the $|\cdot|$ notation denotes flow value, not absolute value or cardinality.)

- $\text{total flow out} = \text{flow out} - \text{flow in}$
- $\text{total flow in} = \text{flow in} - \text{flow out}$

#### Flow Capacity

Now suppose we have a capacity function $c : E \to \mathbb{R}_{\ge 0}$ that assigns a nonnegative capacity $c(e)$ to each edge $e$.  

For any $(s, t)$-flow:
1. a flow $f$ is **feasible** (with respect to $c$) if $\pmb{0 \le f(e) \le c(e)}$ for every edge $e$.[^2]
2. a flow $f$ **saturates** edge $e$ if $\pmb{f(e) = c(e)}$, and ^19df45
3. a flow $f$ **avoids** edge $e$ if $\pmb{f(e) = 0}$. ^225c9d

We consider only flows that are feasible with respect to some fixed capacity function $c$. 

A $(s, t)$-flow is feasible iff it satisfies the *capacity constraint* for all edges; that is, for all pairs of vertices, the flow from one vertex to another must be nonnegative $\ge0$ and must not exceed the given capacity.

> [!example]+
> In this example, the value of the flow *out* from the source $f({\color{cyan} s}, a) + f({\color{cyan} s}, b)$ is equal to the value of the flow *into* the sink $f(c, {\color{cyan} t}) + f(d, {\color{cyan} t})$.
> 
> 
> | ![[flow-example-1.excalidraw.png]]                                                                                                                                                                                                           |
> | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | Is this flow valid? In other words, does it satisfy the capacity constraints and flow conservation? **Yes!**<br>What is the value of the flow? **19 units.**<br>Is this the maximum flow possible? **No, although this may not be obvious.** |

#### Maximum Flow 

The **maximum flow problem** is to compute a feasible $(s, t)$-flow in a given directed graph, with a given capacity function, whose value is as large as possible.

# Residual Networks

Fix a graph G, vertices s and t, and a capacity function
Assume that G is reduced, meaning there is at most one edge between any two vertices u and v. In particular, either $c(u \to v)=0$ or $c(v \to u) = 0$.


We  a residual network $G_f$ that 

$G_f$ depends on some arbitrary flow $f$ in $G$:

1. $G_f$ contains the same vertices (nodes) as $G$
2. Forward edges: For each edge $e=(u,v)$ of G for which $f(e) < c(e)$, include an edge $e'=(u,v)$ in $G_f$ with capacity $c(e) - f(e)$.
3. Backward edges: For each edge $e=(u,v)$ of G for which $f(e) > 0$, include an edge $e'=(v, u)$ in $G_f$ with capacity $f(e)$.

#### Residual Capacity

Fix a flow network $G$, vertices $s$ and $t$, and a capacity function $c: E \to \Bbb{R}_{\geq 0}$. 

Consider any edge $(v, w)$ in a flow network $G$ with capacity $c$ and $f$ units of flow.

The residual flow network has two corresponding edges:
1. an edge from $v$ to $w$ has residual capacity $c-f$, and 
2. an edge from $w$ to $v$ has residual capacity $f$.

Intuitively, the residual capacity of an edge indicates how much *more* flow can be pushed through that edge. 

Suppose that $G$ has an edge from $a \to b$ with capacity $c_1$ and $f_1$ units of flow, **and** an edge from $b \to a$ with capacity $c_2$ and $f_2$ units of flow.
- The forward edge allows $c(a, b) - f(a, b)$ additional units of flow, and we can also send up to $f(b,a)$ units to cancel the flow through the reverse edge.


1. an edge from $v$ to $w$ has residual capacity $c-f$, and 
2. an edge from $w$ to $v$ has residual capacity $f$.

- If c then we have residual capacity that can be sent in each direction:
	- send $c-f$ additional flow on $(v, w)$ in $G$ without overflow, or
	- send $f$ flow back in the *opposite* direction to $(w, v)$, at most cancelling out the flow already sent along $(v, w)$. 
- If $\pmb{f = 0}$ then we have not used up any flow from $(v, w)$ so:
	- an edge $v \to w$ has residual capacity $c$, and 
	- the reversed edge $w \to v$ has capacity $0$ so we omit this from the residual network.
- If $\pmb{f = c}$ then we have used up all capacity (**saturated**), therefore:
	- an edge $v \to w$ has residual capacity $0$ so omit this from the residual network, and
	- the reversed edge $w \to v$ has residual capacity $c$.



Consider a pair of vertices $(v, w)$ in the flow network. 

If $\pmb{0 < f < c}$ then we have residual capacity that can be sent in each direction:


> [!def] Residual Capacity
> Fix a flow network $G=(V,E)$, vertices $s$ and $t$, and a capacity function $c: E \to \Bbb{R}$. > 
>
> Given a flow $f$ in $G$, consider a pair of vertices $a, b \in V$. 
> 
> In a flow network, there is at most one edge between any two vertices $a$ and $b$.
> In particular, either $c(a, b)=0$ or $c(a, b)=0$.
> > If $a \to b$ is not edge in the graph, we assume $c(a, b) =0$.
> 
> 
> The ***residual capacity*** $c_f(a, b)$ is given by a new capacity function $c_f: V \times V \to \Bbb{R}$ as follows:
>
> $$
> c_f(a,b) =
> \begin{cases}
> c(a,b) - f(a,b) &\text{if } a \to b \in E,\\[4pt]
> f(b, a) &\text{if } b \to a \in E,\\[4pt]
> 0&\text{otherwise.}
> \end{cases}
> $$
> 
> In a flow network, $(a, b) \in E$ implies $(b, a) \notin E$, and so exactly one case applies to each edge.

> [!def] Residual Network
> Given a flow network $G$ and a flow $f$, the ***residual network*** $G_f$ consists of residual edges whose capacities represent how 
> is a directed graph consisting of residual edges 
>
> $$
> E_f = \{(u, v) \in V \times V : c_f(u, v) > 0\}.
> $$
> 
> The edges in $E_f$ are either edges in $E$ or their reversals, thus $|E_f| \leq 2|E|$.

> [!def] Augmenting Path
> An ***augmenting path*** is a path from $s$ to $t$ in the residual network — along which additional flow can be added to the original network.
> 
> If $f$ is a flow in a $G$ and $f'$ is a flow in the corresponding residual network $G_f$, we define $f \uparrow f'$, the augmentation of flow $f$ by $f'$, to be a function from $V \times V \to \Bbb{R}$, defined by
>
> $$ 
> (f \uparrow f')(u,v) = 
> \begin{cases}
> f(u, v) + f'(u, v) - f'(v, u) &\text{if } (u, v) \in E, \\[4pt]
> 0 &\text{otherwise.}
> \end{cases}
> $$

|                                                                                                                                                                                                                                  ![[clrs-flow-fig24.4.png]]                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **(a)** The flow network $G$ and flow $f$. **(b)** The residual network $G_f$ with augmenting path $p$ having residual capacity $c_f(p) = c_f(v_2, v_3) = 4$ in blue. Edges with residual capacity equal to 0, such as $(v_1, v_3)$ are now shown. **(c)** The flow in $G$ from augmenting along path $p$ by its residual capacity $4$. Edges carrying no flow, such as $(v_3, v_2)$ are labelled only by their capacity. **(d)** The residual network induced by the flow in (c). |

# Integrality Theorem

> [!theorem] Integrality Theorem
> If all capacities are integers (as we assumed earlier), then there is a flow of maximum value such that $f(u, v)$ is an integer for each edge $(u, v) \in E$.
> 
> i.e., if every edge capacity $c(u, v)$ is an integer, then there exists a **maximum flow** in which every flow value $f(u,v)$ is also an integer.

<b>Note.</b> This means that there is always at least one solution entirely in integers. We will only consider integer solutions hereafter. Therefore, we only look at integer capacities.

This means we only consider integer capacities (and ignore all others like fractional capacities) because we are guaranteed to find a maximum value of a flow that is made up of integers.


