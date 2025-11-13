---
tags:
  - algorithms
  - topic/graph
modules:
  - "[[mocs/Modules/Flow Networks|Module 5: Flow Networks]]"
---


### Flows

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
2. a flow $f$ **saturates** edge $e$ if $\pmb{f(e) = c(e)}$, and 
3. a flow $f$ **avoids** edge $e$ if $\pmb{f(e) = 0}$. 

Important
- If $\pmb{0 < f(e) < c(e)}$ then 
- If  $\pmb{f(e) = c(e)}$ then we have completely used up the maximum capacity along this edge. Therefore.
We consider only flows that are feasible with respect to some fixed capacity function $c$. 

A $(s, t)$-flow is feasible iff it satisfies the *capacity constraint* for all edges; that is, for all pairs of vertices, the flow from one vertex to another must be nonnegative $\ge0$ and must not exceed the given capacity.

#### Maximum Flow 

The **maximum flow problem** is to compute a feasible $(s, t)$-flow in a given directed graph, with a given capacity function, whose value is as large as possible.

---

### Cuts

An **(s, t)-cut** (or just **cut**[^1]) is a partition of the vertices into *disjoint subsets* $S$ and $T$ — meaning $S \cup T = V$ and $S \cap T = \varnothing$ — where $s \in S$ and $t \in T$.

If we have a capacity function $c : E \to \mathbb{R}_{\ge 0}$, the **capacity** of a cut is the sum of the capacities of the edges that start in $S$ and end in $T$:

$$
c(S, T) = \sum_{v \in S} \sum_{w \in T} c(v \to w).
$$
 
(Again, if $v \to w$ is not an edge in the graph, we assume $c(v \to w) = 0$.)  

Notice that the definition is **asymmetric**; the flow across a cut (S, T) counts edges going in *both directions* across the cut, but capacity of a cut counts only edges going from $S$ to $T$.

The **minimum cut problem** is to compute an $(s, t)$-cut whose capacity is as small as possible.

|![[flow-cuts.png]]|
| :-: |
|A cut (S,T) in the flow network. The vertices in S are in green, and the vertices in T are in red. The net flow across $(S,T)$ is $f(S,T) = (5+10)-(15) = 0$ and the capacity is $c(S, T) = 15$|



- **Capacity of a cut:**  
    - $c(S,T)$ = sum of capacities of all directed edges that go from $S$ to $T$.  
    - Edges from $T$ to $S$ do not contribute to the capacity.
    
- **Net flow across a cut:**  
	- $f(S,T)$ = (sum of flows on edges S→T) — (sum of flows on edges T→S).
	- Count every edge that crosses the boundary S→T (first sum) and every edge that crosses T→S  (second sum). 
	- Note that we only consider the direct edges that cross the cut (partitions) from one side to another. 
	  $$\begin{multline}f(S,T) = [\textsf{sum of flows on {all directed edges whose tail is in S and head is in T}}] \\− [\textsf{sum of flows on {all directed edges whose tail is in T and head is in S}}].\end{multline}$$

![[Cuts in a Flow Network example.png]]

Writing this more formally:

In the previous slide, the capacity of the cut $c(S, T)$ is given by  
$$
c(S, T) = c(v_1, v_3) + c(v_2, v_4) = 12 + 14 = 26.
$$

As we have mentioned, we add only the capacities of edges from $S$ to $T$ and not of edges in the opposite direction.

The flow through the cut is given by  
$$
f(S, T) = f(v_1, v_3) + f(v_2, v_4) - f(v_2, v_3) = 12 + 11 - 4 = 19.
$$

Note that the flow in the opposite direction (from $T$ to $S$) is subtracted.

## Maximum Cuts


**Lemma 10.1.**  
Let $f$ be any feasible $(s, t)$-flow, and let $(S, T)$ be any $(s, t)$-cut.  
The value of $f$ is at most the capacity of $(S, T)$. Moreover,  $|f| = \|S, T\|$ if and only if $f$ saturates every edge from $S$ to $T$ and avoids every edge from $T$ to $S$.

**Proof.**  

To simplify notation, let $\partial f(v)$ denote the total net flow **out** of any vertex $v$:

$$\partial f (v) = \sum_u f(u\to v) − \sum_wf (v \to w).$$

Choose your favorite flow $f$ and your favorite cut $(S, T)$, and then follow the bouncing inequalities:

$$
\begin{aligned}
|f| &= \partial f(s) &&\text{[by definition of flow}] \\[3pt]
&= \sum_{v \in S} \partial f(v) &&\text{[conservation constraint}] \\[3pt]
&= \sum_{v \in S} \sum_w f(v \to w) 
    - \sum_{v \in S} \sum_u f(u \to v) &&\text{[definition of }\partial] \\[3pt]
&= \sum_{v \in S} \sum_{w \notin S} f(v \to w)
    - \sum_{v \in S} \sum_{u \in T} f(u \to v) &&\text{[removing edges from S to S}] \\[3pt]
&= \sum_{v \in S} \sum_{w \in T} f(v \to w)
    - \sum_{v \in S} \sum_{u \in T} f(u \to v) &&\text{[definition of cut]} \\[3pt]
&\le \sum_{v \in S} \sum_{w \in T} f(v \to w)
   \quad &&\text{[because $f(u \to v) \ge 0$]} \\[3pt]
&\le \sum_{v \in S} \sum_{w \in T} c(v \to w)
   \quad &&\text{[because $f(v \to w) \le c(v \to w)$]} \\[3pt]
&= \|S, T\|
   \quad &&\text{[by definition of the cut capacity]}
\end{aligned}
$$

---

In the second step, we are just adding zeros, because $\partial f(v) = 0$ for every vertex $v \in S \setminus \{s\}$.

In the fourth step, we are removing flow values $f(x \to y)$ where both $x$ and $y$ are in $S$, because they appear in both sums: positively when $v = x$ and $w = y$, and negatively when $v = y$ and $u = x$.

The first inequality in this derivation is actually an equality **if and only if** $f$ avoids every edge from $T$ to $S$. Similarly, the second inequality is actually an equality **if and only if** $f$ saturates every edge from $S$ to $T$. 

---

This lemma immediately implies that if $|f| = \|S, T\|$, then $f$ must be a **maximum flow**, and $(S, T)$ must be a **minimum cut**.

## Definitions

---

A **cut** in a flow network is any partition of the vertices of the underlying graph into two subsets $S$ and $T$ such that:

1. $S \cup T = V$  
2. $S \cap T = \varnothing$  
3. $s \in S$ and $t \in T$  

---

The **capacity** $c(S, T)$ of a cut $(S, T)$ is the sum of capacities of all edges leaving $S$ and entering $T$, i.e.

$$
c(S, T) = 
\sum_{(u, v) \in E} 
\{\, c(u, v) : u \in S, v \in T \,\}.
$$

Note that the capacities of edges going in the opposite direction (from $T$ to $S$) do not count.

---

Given a flow $f$, the **flow** $f(S, T)$ through a cut $(S, T)$ is the total flow through edges from $S$ to $T$ minus the total flow through edges from $T$ to $S$, i.e.

$$
f(S, T) = 
\sum_{(u, v) \in E}
\{\, f(u, v) : u \in S, v \in T \,\}
-
\sum_{(u, v) \in E}
\{\, f(u, v) : u \in T, v \in S \,\}.
$$

---
**Proof.** Prove that for any flow $f$, the flow through any cut $(S, T)$ is equal to the value of the flow, i.e.

$$
f(S, T) = |f|.
$$

**Hint.** Recall the definition of the value of a flow, and use the property of flow conservation.

***Question*.**  

Given a cut $(S, T)$, how does the flow of the cut compare to its capacity?
- An edge from $S$ to $T$ counts its full capacity towards $c(S, T)$, but only the flow through it towards $f(S, T)$.  
- An edge from $T$ to $S$ counts zero towards $c(S, T)$, but counts the flow through it (<u>negatively</u>) towards $f(S, T)$.  
- Therefore, $f(S, T) \le c(S, T).$
- It follows that $|f| \leq c(S,T)$, so the value of any flow $f$ is at most the capacity of any cut.



[^1]: if the source and target vertices are clear from context

[^2]: In other word, a **(s-t)-flow** is ***feasible*** if it satisfies the ***capacity constraint*** at every vertex, where the flow from one vertex to another must be <u>nonnegative</u> and must <u>not exceed the given capacity</u>.
