---
tags: [notes, topic/graph]
modules:
  - "[[mocs/Modules/Flow Networks|Module 5: Flow Networks]]"
---

# Definitions

## Flow Networks

---

A ***flow network*** is a directed graph $G = (V, E)$ where each edge $(u, v) \in E$ has a <u>nonnegative</u> integer **capacity** $c(u, v) \ge 0$.  

No self-loops. If $(u, v) \in E$ then there is no edge $(v, u)$ in the reverse direction.

We distinguish two special vertices: a **source** $s$ and a **sink** $t$.

Every vertex lies on some path from the source to the sink. 
That is, for each vertex $v \in V$, the flow network contains a path $s \leadsto v \leadsto t$.

No edge enters the source, and no edge leaves the sink.
i.e., no incoming edges to $s$, and no outgoing edges from $t$.
Because each vertex other than $s$ has at least one entering edge, we have $|E| \geq |V| - 1$.

## Flows

An ***$\mathbf{(s, t)}$-flow*** (or just a ***flow***^[if the source and sink vertices are clear from context]) in $G$ is a function $f: E \to \Bbb{R}$ that satisfies two properties:

1. **Capacity constraint:**  

For every edge $(u, v) \in E$, $$0 \leq f(u, v) \le c(u, v).$$i.e., the flow through any edge does not exceed its capacity. 

2. **Flow conservation:**  

For every vertex $u \in V \setminus \{s, t\}$, 

$$
\begin{align}
\sum_{v} f(u \to v) \ &= \ \sum_{w} f(v \to w) \\[8pt]
\text{total flow into } v \ &= \ \text{total flow out of } v 
\end{align}
$$

i.e., the flow into any vertex (other than the source and the sink) equals the flow out of that vertex. Basically, "flow in = flow out".

---

Define $f(u \to v) = 0$ if there is no edge $u \to v$ in the graph.

The ***value*** of the flow $f$, denoted $|f|$, is the total net flow out of the source $s$ (equivalently, the total net flow into sink $t$):

$$
|f| = \sum_{v: (s, v) \in E} f(s, v) = \sum_{v: (v,y) \in E} f(v,t).
$$

i.e., the flow leaving the source is equal to the flow arriving at the sink.

- The **total net flow out of the source vertex $\mathbf{s}$**
(where $\text{net flow out} = \text{flow out} - \text{flow in}$) …

$$
\begin{align}
|f| &= \sum_{s} f(s \to v) - \sum_{u} f(u \to s) \\[6pt]
&= \text{total flow out of }s - \text{total flow into } s
\end{align}
$$

- is also equal to the **total net flow into the sink vertex $\mathbf{t}$** 
(where $\text{net flow in} = \text{flow in} - \text{flow out}$).


> [!example]+
> In this example, the value of the flow *out* from the source $f({\color{cyan} s}, a) + f({\color{cyan} s}, b)$ is equal to the value of the flow *into* the sink $f(c, {\color{cyan} t}) + f(d, {\color{cyan} t})$.
> 
> 
> | ![[flow-example-1.excalidraw.png]]                                                                                                                                                                                                           |
> | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | Is this flow valid? In other words, does it satisfy the capacity constraints and flow conservation? **Yes!**<br>What is the value of the flow? **19 units.**<br>Is this the maximum flow possible? **No, although this may not be obvious.** |
> 

## Definitions 

>[!definition]+ Formal Definition from CLRS
> Let $G = (V, E)$ be a ***flow network*** with capacity function $c$. Let $s$ be the source of the network, and let $t$ be the sink. 
> 
> A ***flow*** in $G$ is a real-valued function $f: V \times V \to \Bbb{R}$ that satisfies t the following two properties:
>
> 1. **Capacity constraint:** For all $u, v \in V$, we require $$0 \leq f(u, v) \le c(u, v).$$
>
> The flow from one vertex to another must be nonnegative and must not exceed the given capacity.
>
>2. **Flow conservation:** For all $u \in V \setminus \{s, t\}$, we require $$\sum_{v \in V} f({\color{red} v}, {\color{cyan} u}) = \sum_{v \in V} f({\color{cyan} u}, {\color{red} v}).$$ The total flow into a vertex other than the source or sink must equal the total flow out of that vertex — informally, "flow in equals flow out." $$f(u, v) = -f(v, u)$$
>
>The flow from vertex $u$ to $v$ is the nonnegative quantity $f(u, v)$.
> When $(u, v) \notin E$, there can be no flow from $u$ to $v$, and $f(u, v) = 0$.
> 
> The ***value*** $|f|$ of a flow $f$ is defined as the total net flow out of the source:
>
> $$
> \begin{align}
> |f| &= \sum_{v \in V} f(s, v) - \sum_{v \in V} f(v, s), \\[8pt]
> &= \sum_{v \in V} f(s, v) \quad (\text{since the flow into the source is }0)
> \end{align}
> $$
>
> that is, the total flow <u>out</u> of the source minus the flow <u>into</u> the source.
> 
> In the ***maximum-flow problem***, the input is a flow network $G$ with source $s$ and sink $t$, and the goal is to find a flow of maximum value.

## Integrality Theorem

> [!theorem] Integrality Theorem
> If all capacities are integers (as we assumed earlier), then there is a flow of maximum value such that $f(u, v)$ is an integer for each edge $(u, v) \in E$.
> 
> i.e., if every edge capacity $c(u, v)$ is an integer, then there exists a **maximum flow** in which every flow value $f(u,v)$ is also an integer.

<b>Note.</b> This means that there is always at least one solution entirely in integers. We will only consider integer solutions hereafter. Therefore, we only look at integer capacities.

This means we only consider integer capacities (and ignore all others like fractional capacities) because we are guaranteed to find a maximum value of a flow that is made up of integers.

## Examples

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

Converting a multiple-source, multiple-sink maximum-flow problem into a problem with a single source and a single sink:

| ![[clrs-flow-fig24.3.png]]                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **(a)** A flow network with three sources $S=\{s_1, s_2, s_3\}$ and two sinks $T= \{t1, t2\}$. <br>**(b)** An equivalent single-source, single-sink flow network. Add a supersource $s$ with an edge with infinite capacity from $s$ to each of the multiple sources. Also add a supersink $t$ and an edge with infinite capacity from each of the multiple sinks to $t$. |

# Residual Networks

> [!def] Residual Capacity
> For a flow network $G=(V,E)$ with source $s$, sink $t$ and a flow $f$, consider a pair of vertices $u,v \in V$. We define the ***residual capacity*** $c_f(u, v)$ by
>
> $$
> c_f(u, v) =
> \begin{cases}
> c(u, v) - f(u, v) &\text{if } (u, v) \in E,\\[4pt]
> f(u, v) &\text{if } (u, v) \in E,\\[4pt]
> 0&\text{otherwise.}
> \end{cases}
> $$
>
> The edges in $E_f$ are either edges in $E$ or their reversals, thus $|E_f| \leq 2|E|$.

> [!def] Residual Network
> Given a flow network $G=(V, E)$ and a flow $f$, the ***residual network*** $G_f = (V, E_f)$ is the directed graph consisting of all edges $(u, v)$ with positive residual capacity:
>
> $$
> E_f = \{(u, v) \in V \times V : c_f(u, v) > 0\}.
> $$

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
