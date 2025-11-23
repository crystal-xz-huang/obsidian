---
tags: [examples, topic/graph]
---

# Cargo Allocation

> [!problem]
> **Instance:** The storage space of a ship is in the form of a rectangular grid of cells with $n$ rows and $m$ columns. Some of the cells are taken by support pillars and cannot be used for storage, so they have $0$ capacity.  
> 
> You are given the capacity of every cell; the cell in row $i$ and column $j$ has capacity $C(i,j)$. To ensure the stability of the ship, the total weight in each row $i$ must not exceed $C_r(i)$ and the total weight in each column $j$ must not exceed $C_c(j)$.
> 
> **Task:** Design an algorithm which runs in $O((n + m)(nm)^2)$ time and allocates the maximum possible weight of cargo without exceeding any of the cell, row or column capacities.

![[cargo-allocation-table.png|600]]

- **Each cell** has a maximum weight it can hold. C(i,j)
- **Each row** has a maximum total weight allowed. Cr(i)
- **Each column** has a maximum total weight allowed. Cc(j).

## Approach

> [!NOTE]
> To enforce row limits:
> - Edge $(s \to R_i)$ with capacity $Cr(i)$
> 
> To enforce cell limits:
> - Edge $(R_i \to C_j)$ with capacity $C(i,j)$
> 
> To enforce column limits:
> - Edge $(C_j \to t)$ with capacity $Cc(j)$

Construct a flow network with:
- source $s$ and sink $t$,
- a vertex $r_i$ for each row $i$ and a vertex $c_j$ for each column $j$,
- for each $i$, an edge from $s$ to $r_i$ with capacity $Cr(i)$,
- for each cell $(i,j)$ which is not a pillar, an edge from $r_i$ to $c_j$ with capacity $C(i,j)$,
- for each $j$, an edge from $c_j$ to $t$ with capacity $C_c(j)$.

![[cargo-allocation.excalidraw.png|400]]

<b>Question.</b> What does a flow in this network represent?

- We will interpret the amount of flow sent along the edge from $r_i$ to $c_j$ as the weight of cargo stored in cell $(i,j)$.
- By the **capacity constraint**, this weight cannot exceed the edge capacity $C(i,j)$, so the weight limit of each cell is satisfied.
- By **flow conservation**, the amount of flow sent along the edge from $s$ to $r_i$ is equal to the total flow sent from $r_i$ to all column vertices $c_j$, so it represents the total weight stored in row $i$. Again, the **capacity constraint** ensures that this does not exceed $C_r(i)$ as required.
- Similarly, the column capacities $C_c(j)$ are also respected. Therefore, any flow in this graph corresponds to a valid allocation of cargo to cells.
- The converse is also true; any valid allocation of cargo to cells is naturally represented by a flow.

<b>Question.</b> What is the running time to find the maximum flow?
- To maximise the cargo allocated, we find the maximum flow using the Edmonds–Karp algorithm.
- There are $n + m + 2$ vertices and up to $nm + n + m$ edges, so the time complexity is
$$\begin{align}
O(|V| \cdot |E|^2) 
&= O\big((n + m + 2)(nm + n + m)^2\big) \\
&= O\big((n + m)(nm)^2\big)
\end{align}$$
as required.


## Notes

> [!goal]
> Given a $n \times m$ capacity **constraint matrix**. 
> Each cell $(i, j)$, where $i$ is the row and $j$ is the column, has a weight $w(i, j)$.
> Choose a value $w(i, j)$ for each cell, with the following objective:
> 
> maximise $\begin{align}\sum_{i=1}^n\sum_{j=1}^m w(i,j)\end{align}$
> subject to $\begin{align} 0 \leq w(i,j) \leq C(i,j) \text{ for } i, j&& \sum_{j=1}^m w(i,j) \leq C_r(i) \text{ for } i&& \sum_{i=1}^n w(i, j) \leq C_c(j) \text{ for } j&& \end{align}$

> [!NOTE]
> A **flow network** is:
> - A directed graph
> - Every edge has a **capacity** (an upper bound)
> - One node is marked as **source** (entry) and **sink** (exit)
> 
> A **flow** is a function:
> - assigns a value to each edge such that 
> - 0 ≤ f(e) ≤ capacity(e)
> - total flow in = total flow out
> 
> A **maximum flow** is the flow (the assignment of numbers to edges) that achieves the highest (maximum) possible value while obeying:
> - capacity constraints for all edges
> - conservation constraints for all nodes (except s and t)