---
tags: [notes]
modules:
  - "[[mocs/Modules/Flow Networks|Module 5: Flow Networks]]"
---

# The Maximum-Flow Problem

> [!problem]
> <b>Maximum-Flow Problem.</b>
> Given a flow network, the goal of the **maximum-flow problem** is to find a flow $f$ of maximum value (maximize $|f|$).

For both maximum flow and minimum cut problems, the input is a directed graph $G = (V, E)$ with two special vertices $s$ and $t$, called the *source* and *sink (target)*.

Intuitively, the maximum flow problem asks for the maximum rate at which some resource can be moved from $s$ to $t$; the minimum cut problem asks for the minimum damage needed to separate $s$ from $t$.


## Residual Flow Network

> [!definition]
> Given a flow $f$ in a flow network $G = (V, E)$, the ***residual flow network*** $G_f = (V, E_f)$ is the network made up of the leftover (residual) capacities. 

Suppose the original flow network $G$ has an edge $v \to w$ with capacity $c$, and that $f$ units of flow are being sent through this edge.

The residual flow network $G_f$ has two edges:
1. an edge from $v$ to $w$ with capacity $c - f$, and
2. an edge from $w$ to $v$ with capacity $f$.

Intuitively, the residual capacities represent the amount of **additional** flow that can be sent in each direction. 

| ![[residual-flow-network.excalidraw.png]]                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| If $c(s, v_1) = 16$ and $f(s, v_1) = 11$ then $f(s, v_1) = 11$ can increase by up to $c_f(s, v_1) = 5$ units before exceeding the capacity constraint on edge $(s, v_1)$. Alternatively, up to $11$ units can return from $v_1$ to $s$ so that $c_f(s,v_1) = 11$. |


- Because $f \geq 0$ and $f \leq c$, these residual capacities are always **non-negative**. 
- Edges of capacity zero (when $f = 0$ or $f = c$) need not be included.

## Augmenting Paths

> [!def] Augmenting Path
> An ***augmenting path*** is a path from $s$ to $t$ in the residual network — along which additional flow can be added to the original network.
> 
> **An augmenting path is a way to increase the current flow.**

For example, suppose that 5 crates go $u \to v$ and 2 crates go $v \to u$. This is equivalent to sending 3 crates along $u \to v$ (and none in $v \to u$).

> [!example]+
> The forward edge allows $c − f$ additional units of flow, and we can also send up to $f$ units back to cancel the flow through the reverse edge.
> 
> ![[flow-example-2.excalidraw.png]]


Suppose the original flow network has:
- an edge from $v$ to $w$ with capacity $c_1$ and flow $f_1$ units, <u>and</u> 
- an edge from $w$ to $v$ with capacity $c_2$ and flow $f_2$ units.  

The forward edge $v \to w$ allows $c_1 - f_1$ additional units of flow, and we can also send up to $f_2$ units to cancel the flow through the reverse edge $w \to v$.

Thus we create edges from $v$ to $w$ with capacity $c_1 - f_1 + f_2$ and similarly from $w$ to $v$ with capacity $c_2 - f_2 + f_1$.

> [!example]
> The residual flow network below corresponds to the earlier example of a flow of value 19 units. An augmenting path is pictured in red:
> 
> ![[augmenting-path-example-1.png|300]]
> 
> <b>Q:</b> What’s the maximum extra flow we can send along this red path? 
> <b>A:</b> **4 units**  
> 
> <i>Even though we can send up to 5 units along $s \to v_2$ and $v_3 \to t$, the final $(s-t)$-path is bottlenecked by the smaller capacity of the middle subpath $v_2\to v_3$, which has capacity 4.</i>
> 
> **Adding this to our 19-unit flow gives a flow of 23 units.**

> [!def] Capacity of an Augmenting Path
> The ***capacity*** of an augmenting path is the capacity of its “bottleneck” edge, i.e., the edge of smallest capacity.

Suppose we have an augmenting path of capacity $f$, including an edge from $v$ to $w$. We should:

- cancel up to $f$ units of flow being sent from $w$ to $v$,  
- add the remainder of these $f$ units to the flow being sent from $v$ to $w$,  
- increase the residual capacity from $w$ to $v$ by $f$, and  
- reduce the residual capacity from $v$ to $w$ by $f$.

![[residual-flow-network.excalidraw.png]]
![[augmenting-path-example-2.png|500]]
![[flow-augmentation.excalidraw.png|500]]

# Solving the Maximum Flow Problem


## Ford-Fulkerson algorithm

> [!summary]
> For any edge (u→v) in the residual network, its residual capacity is a nonnegative number that tells you how much additional flow you can increase in the current flow from u to v.
> 
> Only edges with positive (non-zero) residual capacity can be augmented.
> 
> An augmenting path is a way to increase the current flow.
> 
> Definitions
> - Build the **residual graph** from the  current flow.  
> - For each original edge (u→v) with capacity c and current flow f, add:  
> 	- <b>a forward residual edge (u→v) of capacity c−f</b>
> 	  (how much *more* flow you can push from u to v before reaching the original capacity)
> 	- <b>a backward residual edge (v→u) of capacity f</b>
> 	  (how much flow you can *cancel* if you decide to go back from v to u).
> - An **augmenting path** is any s→t path in this residual graph whose every edge has positive (non-zero) residual capacity. If you traverse that path and:
> 	- go forward on an original edge, you add Δ to its flow;
> 	- go backward on an original edge, you subtract Δ from its flow.
> - $Δ=c_f$ is the minimum residual capacity along that path (the bottleneck), so after augmentation, at least one residual edge on that path becomes 0.
> 
> Algorithmic approach:
> 1. Find an augmenting path P in the residual graph.
> 2. Let Δ be the **bottleneck** of P: the minimum residual capacity on its edges.
> 3. In the original network G:
> 	1. increase the original flow by Δ along the forward edges of P and 
> 	2. decrease (i.e., cancel) by Δ on the backward edges of P.
> 4. Update the residual network to reflect the new flow.
> 5. Repeat until no augmenting s→t path remains in the residual network. At that point the flow is maximum.
> 
> What it guarantees
> - Each augmentation increases the total flow value by Δ.
> - When there is **no** s→t path in the residual graph, the current flow is **maximum**.
> - With integer capacities, every augmentation changes the flow by at least 1, so the process terminates and returns an integer maximum flow (integrality theorem).


![[ford-fulkerson-algorithm-example.excalidraw.png]]


# Proofs

**Question. Why does this procedure terminate?**  
In other words, why can’t we get stuck in a loop, which keeps adding augmenting paths forever? 

- If all the capacities are integers, then each augmenting path increases the flow through the network by at least 1 unit. 
- However, the total flow is finite. In particular, it cannot be larger than the sum of all capacities of all edges leaving the source. 
- We conclude that the process must terminate eventually.

**Question. Why does this procedure give a maximum flow?**  
- Even if the procedure does terminate, why does it produce a flow of the largest possible value? 
- Maybe we have created bottlenecks by choosing bad augmenting paths; maybe better choices of augmenting paths could produce a larger total flow through the network? 
- This is not at all obvious, and to show that this is not the case we need a mathematical proof!

The proof is based on the notion of a minimum cut in a flow network.




