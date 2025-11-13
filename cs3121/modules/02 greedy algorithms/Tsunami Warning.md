---
modules:
  - "[[Greedy Algorithms|Module 2: Greedy Algorithms]]"
categories:
  - "[[Applications to Graphs#Directed Graph Structure]]"
tags:
  - topic/greedy
---
# Tsunami Warning

## Problem 

> [!problem]
> <b>Instance:</b> There are $n$ radio towers for broadcasting tsunami warnings. You are given the coordinates $(x_i , y_i)$ of each tower $i$ and its range $r_i$ . When a tower is activated, all towers within the range of the tower will also activate, and those can cause other towers to activate and so on.
> 
> You need to equip <u>some</u> of these towers with seismic sensors. When these sensors are activated, they activate the tsunami warning at their tower. These activated towers then activate all towers in their range, and so on.
> 
> <b>Task:</b> Design an algorithm which finds the fewest number of towers you must equip with seismic sensors so that all towers become activated.

- Every tower has a position `(xi, yi)` and range (radius `ri`)
- If there is a tsunami, **only the towers with sensors will be activated** and send out a signal through its entire range → every towers within this range will also be activated and send signals → activates more towers within that range → … (cascade)
- Goal: choose the **fewest** towers to equip with sensors so that, when the sensors trigger, **all** towers eventually get activated via these cascades.

## Designing the Algorithm

How to construct a greedy algorithm for placing sensors? 

(1) What inputs were we given? 
- Locations $(x_i , y_i)$
- Range as radii $r_i$ 

(2) What did we learn from this example?

![[tsunami-warning-annotation.png|500]]

- Towers with very small range could not activate others. So <u>large range</u> is helpful.
- Towers can only <u>directly</u> activate towers whose locations are inside their range. So maybe location is also important?
- A tower $i$ can <u>indirectly</u> activate another tower $j$ if there is a sequence of activations from $i$ to $j$. Is there a way to identify when one tower can indirectly activate another?

### Making the Greedy Choice

To design a proper greedy algorithm, we need to first think of the possible choices that may work. Specifically, the decision we need to make at each step is to select an unactivated tower to place the sensor. 

Here are three possible ideas:

1. Choose the unactivated tower with the **largest range**.
2. Choose the unactivated tower with the **largest number of direct activations**.
3. ?? 

Here are some possible greedy algorithms that *do not* guarantee an optimal solution:

> [!solution] Attempt 1 (only consider range)
> Find the unactivated tower with the largest range (breaking ties arbitrarily), and place a sensor at this tower. Find and remove all towers activated as a result. Repeat.

> [!solution] Attempt 2 (only consider direct activations)
> Find the unactivated tower with the largest number of towers within its range (breaking ties arbitrarily), and place a sensor at this tower. Find and remove all towers activated as a result. Repeat.

Counterexamples for those choices:

![[tsunami-warning-counterexamples.png]]

> [!observation]
> The main problem is that these algorithms only consider direct activations but not the indirect activations made from these choices.
> 
> Our greedy algorithm also needs to consider indirect activations. How?

### Solution

<b>Draw directed edges for direct activations:</b> It is useful to consider the towers as vertices of a directed graph, where an edge from tower $a$ to tower $b$ indicates that the activation of $a$ directly causes the activation of $b$, that is, $b$ is within the range of $a$.

![[tsunami-warning-directed-edges.png]]

> [!observation] Observation 1
> Suppose that activating tower $a$ causes tower $b$ to also be activated, and vice versa. Then we never want to place sensors at both towers; indeed, placing a sensor at $a$ is equivalent to placing a sensor at $b$.
> 
> How can we can extend this notion to a larger number of towers?
> - *Cycles* also have this property.
> - But we can generalise this to *strongly connected components*.

#### Strongly Connected Components

> [!bookmark] Proposition
> Let $S$ be a subset of the towers such that that activating <u>any</u> tower in $S$ causes the activation of all towers in $S$.
> 
> We never want to place more than one sensor in $S$, and if we place one, then it doesn’t matter where we put it.
> 
> In this way, we can treat all of $S$ as a unit; a “super-tower”; a **strongly connected component**.
> 
> ![[tsunami-warning-scc-v1.png|400]]
> The set of A, B and C is a maximal super tower (a maximal SCC)

We’ve found a decomposition into strongly connected components, using [[#Tarjan's Algorithm]] (or [[#Kosaraju’s Algorithm]]). How do we use this to choose where to place the sensors?


![[tsunami-warning-scc-v4.png|400]]

#### The Condensation Graph

It should be clear that distinct strongly connected components are **disjoint sets**, so the strongly connected components form a **partition** of V .

> [!def] The Condenstation Graph
> Let $C_G$ be the set of all strongly connected components of a graph $G$.
> Define the condensation graph 
>
> $$
> \Sigma_G = (C_G, E^*),
> $$
>
> where
>
> $$
> E^* = \{(C_u, C_v) \mid (u,v) \in E,\ C_u \ne C_v\}.
> $$
>
> The vertices of $\Sigma_G$ are the **strongly connected components** of $G$, and the edges of $\Sigma_G$ correspond to those edges of $G$ that are **not within a strongly connected component**, with duplicates ignored.

##### Prove that a directed graph has no cycles

> [!claim]
> The condensation graph $Σ_G$ is a directed acyclic graph.

> [!check] Proof Outline
> Suppose there is a cycle in $Σ_G$ . Then the vertices on this cycle are **not maximal strongly connected sets**, as they can be merged into an even larger strongly connected set.
> - If there was a cycle, that means those vertices are mutually reachable and should have been condensed to a single node during graph condensation.

The condensation graph is simply

![[tsunami-warning-condensation.png|300]]
Note the incoming edges:

- Components (super-towers) with incoming edges can be activated by another
- But components without an incoming edge cannot be activated

Therefore, our greedy choice is to place sensors on every super-tower (actually a tower in that component) on the condensation graph that does not have any incoming edges. 

> [!solution]
> The correct greedy strategy is to only place a sensor in each super-tower without incoming edges in the condensation graph.

##### Proof of Correctness

> [!check] Proof
> These super-towers cannot be activated by another super-tower, so they each require a sensor. This shows that there is no solution using fewer sensors.
> 
> We still have to prove that this solution activates all super-towers.
> 
> <b>Consider a super-tower with one or more incoming edges. Follow any of these edges backwards, and continue backtracking in this way.</b>
> 
> **Since the condensation graph is acyclic**, this path must end at some super-tower without incoming edges. The sensor placed here will then activate all super-towers along our path.
> 
> Therefore, all super-towers are activated as required.

### Algorithm

So the steps we used to solve the tsunami problem were:

> [!NOTE] Algorithm
> - <b>Input</b>: Towers $i$ with locations $(x_i, y_i)$ and radii $r_i$.
> - **Model the towers as directed graphs**
> 	- Construct the directed graph $G$, where $(u,v)$ is an edge if tower $u$ can *directly* activate tower $v.$
> 	- Construct the reversed graph $G_{\mathrm{rev}}$ of $G$.
> - **Find the strongly connected components** (SCCs) of $G$ using DFS or BFS on both $G$ and $G_{\mathrm{rev}}.$
> - **Form the condensation graph** $\Sigma_G$, whose vertices are the SCCs of $G$.
> - <b>Solution</b>: Place a sensor on every vertex of $\Sigma_G$ that has **no incoming edges**.

Why is this a greedy algorithm? Here’s one answer…

- We choose to place a sensor on a vertex v whose strongly-connected component Cv has the <u>smallest number of incoming edges</u> in $Σ_v$ .
- We then delete v and all vertices that are reachable from v.
- And repeat.
- It just so happens that this smallest number of incoming edges is always 0.

# Theory

## Strongly Connected Components

> [!def] Strongly Connected Components
> Given a directed graph $G = (V , E)$ and a vertex $v$ , the [[Strongly Connected Components and Condensation Graph|strongly connected component]] of $G$ containing $v$ consists of all vertices $u ∈ V$ such that there is a directed path in $G$ from $v$ to $u$ and a directed path from $u$ to $v$. We will denote it by $C_v$.

> [!claim]
> $u$ is in $C_v$ if and only if $u$ is reachable from $v$ and $v$ is reachable from $u$.

![[tsunami-warning-scc-v2.png|500]]

### Find the strongly connected component containing the vertex v

How do we find the strongly connected component $C_v ⊆ V$ containing $v$?

> [!solution]
> We can split this into two subproblems:  
> 
> - Find all the vertices that can be **reached from** $v$ (outgoing connections)
> - Find all the vertices which can **reach to** $v$ (incoming connections)
>   
> Then a vertex $u$ is in $C_v$ if and only if it appears in both of these sets.

> [!algorithm]
> <b>To find all the vertices that can be reached from v:</b>
> 
> Starting at $v$, do a BFS or DFS of $G$ ; vertex $u$ is found in this search iff there is a path $v ⇝ u$ in $G$.
> 
> <b>Finding the vertices that can reach v is harder:</b>
> 
> Construct another graph $G_\text{rev} = (V , E_\text{rev})$ consisting of the same set of vertices $V$ but with the set of edges $E_\text{rev}$ obtained by **reversing the direction of all edges** $E$ of $G$.  
> 
> Starting at $v$, do a BFS or DFS of $G_\text{rev}$ ; vertex $u$ is found in this search iff there is a path $v ⇝ u$ in $G_\text{rev}$ i.e. iff there is a path $u ⇝ v$ in $G$.

> [!claim]
> $u$ is in $C_v$ if and only if $u$ is reachable from $v$ and $v$ is reachable from $u$.
> In other words:
> - $u$ is reachable from $v$ in both the original graph $G$ and the reversed graph $G_\text{rev}$. 
> - Equivalently, $u$ is in both $R_v$ and $R_v'$.

> [!important] Key Idea
> $R'v$ (the set of vertices **reachable from** $v$ in the reversed graph)  
> is equivalent to the set of vertices that **can reach to** $v$ in the original graph.
>
> $$\begin{align}
> R_v' &= \{ u \mid u \text{ can be reached from } v \text{ in the reversed graph } G_\text{rev}\} \\
> &= \{ u \mid u \text{ can reach } v \text{ in the original graph } G\} 
> \end{align}$$

> [!maths] Notations
> - $R_v$ is the set of vertices reachable **from v** in the original graph
> - $R_v'$ is the set of vertices reachable **from v** in the reversed graph 
> 	- ⇔ vertices that can reach **to v** in the original graph
> - $R_v \cap R_v'$ is the set of all vertices that can both reach and be reached by $v$.
> 	- ⇔ the strongly connected component that contains $v$.
> 	- ⇔ the set of all vertices that are strongly connected to $v$.

![[tsunami-warning-scc-v3.png]]


Note that $C_d$ and $C_f$ are also the same set, namely $\{d, e, f \}$.
Similarly, we find that $C_a = C_b = C_c = \{a, b, c\}$ and $C_g = C_h = \{g, h\}$.

> [!observation]
> Mutual reachability is symmetric and transitive
> 
> If $C_e$ = $\{d, e, f \}$, then 
> 
> (1) $e$ is mutually reachable with $d$, $e$ and $f$:
> 
> - $e \leftrightarrow d$ 
> - $e \leftrightarrow e$ 
> - $e \leftrightarrow f$
> 
> (2) $d$ and $f$ are **also** mutually exclusive, because they can reach other through $e$:
> 
> - $d \leftrightarrow e \leftrightarrow f$ 
> 
> (3) $C_e$ is maximal meaning every vertex in $C_e$ is also in $C_d$ and $C_f$.
> 
> ==Therefore, if we find the SCC for a vertex v, denoted $C_v$, then we don't need to find the SCC for all vertices in $C_v$ since they are in the same component. i.e. if $u \in C_v$ then $C_u = C_v$.==

### Analysis

- Note that for graphs $G = (V , E)$, the input graph has size $|V | + |E |$. 
- So linear time in the input size means linear in $|V|+|E|$.
- A linear time algorithm is asymptotically “no slower than” reading the graph, so we can run these algorithms “for free”, i.e., without worsening the time complexity of our solution to any problem.

#### Kosaraju’s Algorithm

Kosaraju’s algorithm involves two executions of DFS.
More complicated to reason about, easier to implement in code.

> [!summary]
> - Use **DFS** to find the set $R_v \subseteq V$ of all vertices in $V$ which are reachable in $G$ from $v$.
> - Use **DFS** to find the set $R_{v'} \subseteq V$ of all vertices which are reachable in $G_{\text{rev}}$ from $v$. 
> Equivalently, this is the set of all vertices that reach to $v$ in $G$.
> - The strongly connected component of $G$ containing $v$ is given by
>
> $$
> C_v = R_v \cap R_{v'}.
> $$
>
> i.e. the SCC that contains $v$ is the set of all vertices reachable from $v$ and reach to $v$.

> [!time] Time complexity
> - Finding all strongly connected components in this way could require $O(|V|)$ traversals of the graph.
> - Each of these traversals is a DFS, requiring <u>linear</u> $O(|V| + |E|)$ time. 
> - Therefore the total time complexity is $O (|V | · (|V | + |E |))$. 
> - Can we do better? Could one DFS suffice?

#### Tarjan's Algorithm

- Do a regular DFS on the graph, but with an explicit stack.
- When an item is pushed onto the stack, mark it as “in-stack”, and unmark it as such when it is popped.
- If we want to push a vertex `v` that is already “in-stack”, then each item after `v` on the stack
	- can be reached from `v` (following the edges of the DFS), and 
	- can reach `v` (using the edge we just encountered),
	- so they all belong to the same SCC as `v.`  
- Simply pop everything after v from the stack, and add them to `v`’s SCC.
- Since this performed just **one DFS**, the time complexity is $O (|V | + |E |)$.

---

## Topological Ordering

### Definition

In the special case where a directed graph G has no cycles (e.g. when G is a condensation graph), then we can order the vertices of G by the following rule:

In the special case where a directed graph $G$ has no cycles (e.g. when $G$ is a condensation graph), we can order the vertices of $G$ by the following rule:

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

### Example

![[tsunami-warning-topological-order.png|500]]

- A comes before B, C 
- B, C comes before D
- C comes before D, E

### Kahn’s Algorithm 

#### Idea

How do we topologically order the vertices? 

> [!important]
> There is always a vertex that we can safely put at the start of the topological order:
> - If a vertex has **no incoming edges**, then it has **no "cause", "influence" or "prerequisite"**. 
> - Guaranteed to have a vertex with no incoming edges because the graph has no cycles (DAG).

#### Prove that an acyclic graph has a vertex with no incoming edges

This is the same idea as the [[#Proof of Correctness]]:
If we pick a vertex and backtrack arbitrarily, then we must find such a vertex

> [!Algorithm]
> Maintain:
> - a list **L** of vertices, initially empty (this will be our answer),  
> - an array **D** consisting of the in-degrees of the vertices, and 
> - a set **S** of vertices with no incoming edges.
> 
> While the set $S$ is non-empty:
> - Select a vertex $u$ from $S$ such that $D[u] = 0$.
> - Remove $u$ from $S$ and append it to the list $L$.
> - For every outgoing edge $e = (u, v)$ from this vertex:
> 	- Remove the edge from the graph.
> 	- Decrement $D[v]$ accordingly.
> 	- If $D[v]$ is now zero, insert $v$ into $S$.
> - Repeat until $S$ is empty.
> 
> If there are **no edges remaining**, then $L$ is a **topological ordering**.  
> Otherwise, the graph **contains a cycle**.
> 

#### Time Complexity

- This algorithm runs in $O(|V| + |E|)$, that is, **linear time**.  
- Once again, we can run this algorithm “for free,” as it is asymptotically no slower than reading the graph.
- In problems involving **directed acyclic graphs (DAGs)**, it is often useful to impose a **topological ordering** and then think about the actual problem!
- A topological ordering is often a **natural way to process the vertices** — we’ll see more of this in **Dynamic Programming**.