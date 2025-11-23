---
tags: [algorithms, topic/graph]
modules:
  - "[[mocs/Modules/Flow Networks|Module 5: Flow Networks]]"
---

# Cuts

An **(s, t)-cut** (or just **cut**[^1]) is a partition of the vertices into *disjoint subsets* $S$ and $T$ — meaning $S \cup T = V$ and $S \cap T = \varnothing$ — where $s \in S$ and $t \in T$.

The **net flow** $f(S, T)$ across the cut $(S,T)$ is defined to be the sum of flow on edges from $S$ to $T$ minus the sum of flow on edges from $T$ to $S$:

$$
f(S, T) = 
\sum_{v \in S}\sum_{w \in T} f(v, w) - \sum_{v \in S}\sum_{w \in T} f(w , v).
$$

If we have a capacity function $c : E \to \mathbb{R}_{\ge 0}$, the **capacity** of a cut is the sum of the capacities of the edges that start in $S$ and end in $T$:

$$
c(S, T) = \sum_{v \in S} \sum_{w \in T} c(v,w).
$$

A **minimum cut** of a network is a cut whose capacity is minimum over all cuts of the network.

> [!def] Cut
> A **cut** in a flow network is any partition of the vertices of the underlying graph into two subsets $S$ and $T$ such that:
> 
> 1. $S \cup T = V$  
> 2. $S \cap T = \varnothing$  
> 3. $s \in S$ and $t \in T$  

> [!def] Capacity
> The **capacity** $c(S, T)$ of a cut $(S, T)$ is the sum of capacities of all edges leaving $S$ and entering $T$, i.e.
>
> $$
> c(S, T) = 
> \sum_{(u, v) \in E} 
> \{\, c(u, v) : u \in S, v \in T \,\}.
> $$
>
> Note that the capacities of edges going in the opposite direction (from $T$ to $S$) do not count.

> [!def] Flow
> Given a flow $f$, the **flow** $f(S, T)$ through a cut $(S, T)$ is the total flow through edges from $S$ to $T$ minus the total flow through edges from $T$ to $S$, i.e.
>
> $$
> f(S, T) = 
> \sum_{(u, v) \in E}
> \{\, f(u, v) : u \in S, v \in T \,\}
> -
> \sum_{(u, v) \in E}
> \{\, f(u, v) : u \in T, v \in S \,\}.
> $$

Notice that the definition is **asymmetric**; the flow across a cut $(S, T)$ counts edges going in *both directions* across the cut, but capacity of a cut counts only edges going from $S$ to $T$.

|![[flow-cuts.png\|500]]|
| :-: |
|A cut (S,T) in the flow network. The net flow across $(S,T)$ is $f(S,T) = (5+10)-(15) = 0$ and the capacity is $c(S, T) = 15$|

|                                                                                 ![[Cuts in a Flow Network example.png\|500]]                                                                                  |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The capacity of the cut is given by $c(S, T) = c(v_1, v_3) + c(v_2, v_4) = 12 + 14 = 26.$<br/>Recall that we add only the capacities of edges from $S$ to $T$ and not of edges in the opposite direction. |
| The flow through the cut is given by $f(S, T) = f(v_1, v_3) + f(v_2, v_4) - f(v_2, v_3) = 12 + 11 - 4 = 19.$ <br/>Note that the flow in the opposite direction (from $T$ to $S$) is subtracted.                                                                                                                                                                                                             |

# Maximum Flows & Minimum Cuts

> [!question]
> Given a cut $(S, T)$, how does the flow of the cut compare to its capacity?
> 
> - An edge from $S$ to $T$ counts its full capacity towards $c(S, T)$, but only the flow through it towards $f(S, T)$.  
> - An edge from $T$ to $S$ counts zero towards $c(S, T)$, but counts the flow through it (negatively) towards $f(S, T)$.  
> - Therefore, $f(S, T) \le c(S, T).$
> - It follows that $|f| ≤ c(S , T )$, so the value of any flow is at most the capacity of any cut.

> [!lemma] 
> For any flow $f$ in a flow network $G$, the flow through any cut $(S,T)$ of $G$ is equal to the value of the flow, i.e., 
>
> $$|f| = f(S, T).$$
>
> The value $|f|$ of any flow $f$ is *equal to* the flow across any cut $(S, T)$.
> --- 
>  By this lemma and the capacity constraint, it follows that the value of any flow $f$ is bounded from above by the capacity of any cut, i.e.,
>
> $$|f| \leq c(S, T).$$
>
> The value $|f|$ of any flow $f$ is *at most* the capacity of any cut $(S, T)$.

> [!lemma]
> Let $f$ be any flow in a flow network $G$, and let $(S, T)$ be any cut of $G$. Then the net flow across any cut is $f(S, T) = |f|$. 
> 
> Moreover, $|f| = c(S, T)$ if and only if $f$ [[#^19df45|saturates]] every edge from $S$ to $T$ and [[#^225c9d|avoids]] every edge from $T$ to $S$.  

> [!check]+ Proof
> Let $(S, T)$ be any cut of $G$ and let $f$ be any flow. By the lemma and the capacity constraint, 
>
> $$
> \begin{aligned} 
> |f| &= f(S, T) \\[3pt] 
> &= \sum_{u \in S}\sum_{v \in T} f(u, v) - \sum_{u \in S}\sum_{v \in T} f(v , u) &&[\text{by definition of } f(S,T)] \\[3pt] 
> &{\color{red}\pmb \leq} \sum_{u \in S}\sum_{v\in T} f(u, v) &&[\text{because } f(v,u) \geq 0] \\[3pt] 
> &{\color{red}\pmb \leq} \sum_{u \in S}\sum_{v \in T} c(u, v) &&[\text{because } f(u,v) \leq c(u,v)] \\[3pt] 
> &= c(S,T) &&\text{[by definition of cut capacity]}. 
> \end{aligned} 
> $$
>
> 1. The first inequality is an equality if and only if the flow $f$ **avoids** every edge from $T$ to $S$ i.e., for all edges $(u,v)$ in $G$ where $u \in S, v \in T$, we have $\pmb{f(v,u) = 0}.$
> 
> 2. Similarly, the second inequality is an equality if and only if $f$ **saturates** every edge from $S$ to $T$, i.e., for all edges $(u,v)$ in $G$ where $u \in S, v \in T$, we have $\pmb{f(u,v) = c(u,v)}.$

Recall that in the residual network, edges of capacity zero occur when $f=0$ or $f=c$, since for any edge $(u, v)$ in the original graph, we have:
- $c_f(u, v) = c-f$
- $c_f(v, u) = f$ (reversed edge)

This lemma immediately implies that if $|f| = c(S, T)$, then $f$ must be a maximum flow, and $(S, T)$ must be a minimum cut.

## Max-flow min-cut theorem

> [!theorem]
> The **maximum** amount of flow in a flow network is equal to the capacity of the cut of **minimum** capacity.

**Proof idea:**  
- Let $f$ be a flow. Recall that the value $|f|$ is at most the capacity of any cut $c(S, T)$, i.e., $|f| \leq c(S,T)$.
- Thus, if we find a flow $f$ which equals the capacity of some cut $(S, T)$, then such flow must be maximum and the capacity of such a cut must be minimum.  
- We now show that when the Ford–Fulkerson algorithm terminates, it produces a flow equal to the capacity of an appropriately defined cut.

### Proof of correctness of FFA / Proof of Max-Flow Min-Cut

- Assume that the Ford–Fulkerson algorithm has terminated, so there are no more augmenting paths from the source $s$ to the sink $t$ in the last residual flow network.
- ==Define $S$ to be the source $s$ and all vertices $u$ such that there is a (directed) path in the *residual flow network* from the source $s$ to that vertex $u$.==
- ==Define $T$ to be the set of all vertices for which there is no such path.==  
- Since there are no more augmenting paths from $s$ to $t$, clearly the sink $t$ belongs to $T$.

> [!example]-
> ![[ffa-proof-1.png]]
> - In the final residual flow network, we have three vertices $v_1, v_2, v_4$ that are all reachable from the source and $v_3$ is not reachable from the source. Therefore, define the cut $(S,T)$ where $S = \{ s, v_1, v_2, v_4 \}$ and $T = \{v_3, t \}$. 
> - In the lower graph, we see that the cut allows $12 + 7 + 4$ units of flow *forwards* across the cut and $0$ units of flow *backwards*.
> - In the top graph, there are no augmenting paths precisely because there are no ways to go forward in this cut. All the edges across the cut point backwards. 
> - It follows that in the bottom graph, all forward edges across the cut are at full capacity (saturated) whereas all backward edges across the cut are at 0 capacity. 

#### Proof of correctness – part 1

The FFA repeatedly augments the flow along any path from $s$ to $t$ in the residual graph, until there is no such path. When the FFA eventually halts, we define $S$ as the set of vertices reachable from $s$ in the residual $G_f$ and $T = V \setminus S$. 

At termination, every edge from $S$ to $T$ is **saturated** (no edge from $S$ to $T$ in $G_f$ with non-zero residual capacity) and every edge from $T$ to $S$ has **zero flow** (no edge from $T$ to $S$ in $G_f$ with non-zero residual capacity).

> [!claim]
> All the edges from $S$ to $T$ are fully occupied with flow (i.e. we cannot add more flow), and all the edges from $T$ to $S$ are empty.

> [!proof]+ Proof of claim
> Suppose an edge $(u, v)$ from $S$ to $T$ has some additional capacity left. Then, in the residual flow network, the path from $s$ to $u$ could be extended to a path from $s$ to $v$. This contradicts our assumption that $v \in T$.
> 
> Suppose an edge $(y, x)$ from $T$ to $S$ has some flow in it. Then, in the residual flow network, the path from $s$ to $x$ could be extended to a path from $s$ to $y$. This contradicts our assumption that $y \in T$.
>
>---
>
> **Setup.**
> - Let $(S, T)$ be defined from the <u>residual</u> graph, where $S$ contains all vertices reachable from $s$, and $T = V \setminus S$.
> (Note that $T$ contains all vertices *not* reachable from the source.)
> - Consider any edge $u \to v$ from the original flow network $G$ with $u \in S$ and $v \in T$. 
>  
> **Proof by contradiction.**
> - Suppose that $(u, v)$ is not saturated (did *not* use its full capacity), i.e., $f(u,v) < c(u,v)$. 
> - Then it would have a corresponding edge from $u$ to $v$ in the residual network with positive residual capacity $c_f(u,v) = c(u,v) - f(u,v) > 0$. 
> - Therefore $v$ would be reachable from $s$ via $u$ in the residual network and by construction, we would have placed $v$ into $S$ instead of $T$, so $v \in S$.
> - This contradicts our assumption that $v \in T$. 
> - **Therefore, every $S \to T$ edge must be saturated.**
>  <br/>
> - Suppose that $(v, u)$ is not empty (does not have zero flow), i.e., $f(v, u) > 0$. 
> - Then there exists a reversed edge from $u$ to $v$ in the residual flow network with positive capacity $c_f(u,v) = f(v, u) > 0$. 
> - Since $s \leadsto u$, it follows that $s \leadsto u \leadsto v$ which implies $v \in S$, contradicting our initial assumption that $v \in T$. 
> - **Therefore, every $T \to S$ edge must be empty.**
> 
> *Recall:* The residual network only included edges with positive residual capacity. An edge $(u,v)$ has zero residual capacity $(c_f  = 0)$ when either $f(u, v) = c(u,v)$ or $f(v,u) = 0$; thus it is not included in the residual network! 

We now use the claim to prove the correctness of the Ford–Fulkerson Algorithm.

#### Proof of correctness – part 2

> [!proof] Proof Outline
> - By the claim, we know that all edges from $S$ to $T$ are occupied with flows equal to their maximum capacity, and we also know that there is no flow from $T$ to $S$.  
> - So the flow through the cut $(S, T)$ is precisely equal to the capacity of this cut, giving  
>
> $$
> f(S, T) = c(S, T).
> $$
>
> - Thus, such a flow is a **maximum flow**, and the corresponding cut is a **minimum cut**, regardless of the particular way in which the augmenting paths were chosen.
> - Therefore, the Ford–Fulkerson algorithm has output a maximum flow.

(1) For any flow $f$ and *any* cut $(S,T)$, the net flow that crosses from $S$ to $T$ can never exceed the cut’s total capacity. That is, $|f| = f(S,T) ≤ c(S,T)$.

(2) At termination of FFA, every edge $(u,v)$ from $S$ to $T$ is **saturated** $f(u,v) = c(u,v)$ and every edge from $T$ to $S$ has **zero flow** $f(v,u) = 0$. Therefore, the net flow across the cut $(S,T)$ where $S$ is the set of vertices reachable from $s$ in $G_f$ and $T=V \setminus S$ is equal to 

$$
\begin{align}
f(S,T) &= \sum_{u \in S}\sum_{v \in T} f(u, v) - \sum_{u \in S}\sum_{v \in T} f(v , u) \\
&= \sum_{u \in S}\sum_{v \in T} f(u, v) - 0 &&\text{because }f(v, u) = 0\\
&= c(S, T) &&\text{because } f(u,v) = c(u, v)\\
\end{align}
$$

- For any $(s,t)$-cut, we have $|f| = f(S,T) \leq c(S,T)$. Since $f(S,T) = c(S,T)$, the flow across the cut is the maximum possible value within the capacity constraint, which in turn is the maximum value of any flow.
- For any $(s,t)$-cut $(A, B)$, we have $|f| \leq c(A, B)$. For our cut $(S,T)$, we have $|f| = C(S,T)$. Therefore, $c(S, T) \leq c(A, B)$ for every cut $(A,B)$, which is the definition of the minimum cut (cut with the smallest capacity).

## Ford-Fulkerson Algorithm (FFA) 

> [!important]
> Always use Edmonds-Karp algorithm!

### Algorithm

|  ![[ffa-pseudocode.png]]   |
| :- |
|Lines 1-2 initialises the flow $f$ to 0. The **while** loop of lines 3-8 repeatedly finds an augmenting path $p$ in $G_f$ and augments flow $f$ along $p$ by the *residual capacity* $c_f(p)$ of the augmenting path (the maximum amount of flow that we can push through $p$). Each residual edge in path $p$ is either an edge in the original network $G$ or the reversal of an edge in $G$. Lines 6-8 updates (augments) the flow by $c_f$. When no augmenting paths exist, the flow $f$ is a maximum flow.|

- Let $f$ be a flow in $G$ and let $p$ be an augmenting path in $G_f$. 
- The residual capacity of $p$ is the maximum amount by which we can increase the flow on each edge in an augmenting $p$, given by $c_f(p) = \min_{(u,v) \in P} c_f (u, v)$. 
- Each iteration of the of FFA finds some augmenting path $p$ in $G_f$ and uses it to augment a flow in$G$. 
- Replacing a flow $f$ by the resultant augmented flow $f_p$ in $G$ produces a new flow whose value is (at most) $|f| + |f_p|$. 

### Time Complexity 

- The running time of FFA depends on the augmenting path $p$ and how it is found. 
- Each augmenting path is found in $O(E)$ time using either DFS/BFS. 
	- **BFS (Edmonds-Karp)**  is more optimal become we find an augmenting path with the fewest edges and the runtime is bounded by $O(VE^2)$ iterations.
	- With DFS, the runtime is bounded by $O(Ef)$ and is dependent on the maximum value of the flow.

**How large can the running time get?**
- The number of augmenting paths can be up to the value of the max flow, denoted $|f|$.
- Each augmenting path is found in $O(|E|)$ time, e.g., by a DFS from the source $s$.
- Therefore, the time complexity of the Ford–Fulkerson algorithm is $O(|E| \cdot |f|)$.

**How does this compare to the size of the input?**
- Recall that the input specifies $|V|$ vertices and $|E|$ edges, as well as a capacity for each edge.
- If the capacities are all $\le C$, then the length of the input (i.e. the number of bits required to encode it) is $O(|V| + |E|\log C)$.
- However, the value of the maximum flow $|f|$ can be as large as $|E| \cdot C$.
- Even if we forbid parallel edges, it can be up to $\frac{|E| \cdot C}{2}$: imagine a graph where for each vertex $v \in V \setminus \{s, t\}$, there are directed edges $(s, v)$ and $(v, t)$ with capacity $C$.
- Therefore, the time complexity $O(|E| \cdot |f|)$ can be *exponential* in the size of the input. This is very slow.

> [!theorem] Integrality Theorem
> If all capacities in a flow network are integers, then there is a maximum flow such that the flow through every edge is an integer.

> [!proof]
> We argue by induction that after each iteration of the augmenting path algorithm, all flow values and all residual capacities are integers.
> - Before the first iteration, all flow values are 0 (which is an integer), and all residual capacities are the original capacities, which are integers by definition.
> - In each later iteration, the induction hypothesis implies that the capacity $f_p$ of the augmenting path is an integer, so augmenting changes the flow on each edge, and therefore the residual capacity of each edge, by an integer.
> 
> In particular, each iteration of the augmenting path algorithm increases the value of the flow by a positive integer. It follows that the algorithm eventually halts and returns a maximum flow.


## Edmonds-Karp Algorithm 

**How can we adapt Ford–Fulkerson to ensure it always chooses “good” augmenting paths?**

- The Edmonds–Karp algorithm improves the Ford–Fulkerson algorithm in a simple way: always choose the augmenting path which consists of the ==fewest edges==.
- At each step, we find the next augmenting path using ==breadth-first search== in $O(|E|)$ time.
- Note that this choice is somewhat counter-intuitive: augmenting paths are chosen based only on length, so we may end up flowing edges with small capacities before edges with large capacities.
- It can be proven (see CLRS pp.727–730) that the number of augmenting paths is $O(|V| \cdot |E|)$, and since each takes $O(|E|)$ to find, the time complexity is $O(|V| \cdot |E|^2)$. 
- Note also that Edmonds–Karp is a specialisation of Ford–Fulkerson, so the original bound $O(|E| \cdot |f|)$ also applies.

---

## Proofs

> [!theorem] The Maxflow-Mincut Theorem
> In any flow network $G=(V,E)$ with source $s$ and sink $t$, the value of the **maximum flow** is equal to the capacity of the **minimum cut**.
> 
> That is, the following conditions are equivalent:
> 
> 1. $f$ is a maximum flow in $G$.
> 2. The residual network $G_f$ contains no augmenting paths.
> 3. $|f| = c(S, T)$ for some cut $(S, T)$ of $G$

Let $f$ be a flow in $G$, and let $p$ be an augmenting path in $G_f$. 

Let $c_f(p) = \min_{(u,v) \in P} c_f (u, v)$ denote the *residual capacity* of $p$ (the maximum amount of flow that we can push through $p$ without overflow is bottlenecked by the smallest residual capacity on this path).

Suppose that $f$ is augmented by $f_p$. The resulting augmented flow $f'$ is defined by the function $f' : V \times V \to \Bbb{R}$ in the original graph $G$ as follows:

$$
f'(u,v) = \begin{cases}
f(u, v) + c_f(p) &\text{if } (u, v) \in P,\\
f(u, v) - c_f(p) &\text{if } (v, u) \in P,\\
f(u, v) &\text{otherwise.}\\
\end{cases}
$$

> [!NOTE]
> **Goal:** Prove that the function $f'$ is a flow in $G$ with value $|f'| = |f| + |f_p| > |f|$. 
> 
> First verify that the flow conservation holds for each vertex $V \setminus \{s, t\}$ and that capacity constraint holds for each edge in $E$. Then show that $|f'| = |f| + |f_p| > |f|$.

We first verify that $f'$ obeys the capacity constraint for each edge in $E$ and flow conservation at each vertex in $V \setminus \{s, t\}$. 

Consider an edge $(u, v)$ in the original graph $G$. There are three cases to consider.

**Case 1.** If the augmenting path $p$ contains $(u, v)$, then

$$f'(u, v) = f(u, v) + c_f(p) >f(u, v) \geq 0$$

because $c_f(u, v) > 0 \implies c_f(p) > 0$ and $c_f(u,v) \geq f(u, v) \geq 0$, and

$$
\begin{align}
f'(u,v) &= f(u,v) + c_f(p) &&\text{by definition of }f'\\
&\leq f(u,v) + c_f(u,v) &&\text{because } c_f(p) \leq c_f(u, v)\\
&= f(u, v)  + c(u, v) - f(u, v) &&\text{by definition of } c_f\\
&= c(u, v)
\end{align}
$$ 

**Case 2.** If the augmenting path $p$ contains the reversed edge $(v, u)$, then 

$$f'(u, v) = f(u, v) - c_f(p) < f(u, v) \leq c(u, v),$$

because $c_f(p) \geq 0$ and $f(u, v) \leq c(u, v)$, and 

$$
\begin{align}
f'(u,v) &= f(u,v) - c_f(p) &&\text{by definition of }f'\\
&\geq f(u,v) - c_f(u,v) &&\text{by definition of } c_f(p)\\
&= f(u, v)  - f(u, v) &&\text{by definition of } c_f\\
&= 0
\end{align}
$$ 

**Case 3.** Finally, if neither $(u, v)$ nor $(v, u)$ is in the augmenting path, then $f'(u, v) =f(u, v)$, and therefore $0 \leq f'(u, v) \leq c(u, v)$, because $f$ is feasible. Therefore, $f$ satisfies the capacity constraint.

Finally, only the first edge in the augmenting path leaves $s$, which implies $|f'| = |f| + |f_p| > |f|$. Thus, $f$ is a feasible flow with larger value than $f$. We conclude that if there is a path from $s$ to $t$ in the residual graph $G_f$, then $f$ is *not* a maximum flow.

On the other hand, suppose the residual graph $G_f$ does *not* contain a directed path from $s$ to $t$. Let $S$ be the set of vertices that are reachable from $s$ in $G_f$ , and let $T = V \setminus S$. The partition $(S,T)$ is clearly an $(s,t)$-cut. For every vertex $u \in S$ and $v \in T$, we have 

$$c_f (u,v) = \big(c(u,v) - f(u,v)\big)+ f(v, u) = 0.$$

The feasibility of $f$ implies $c(u,v)- f(u,v) \geq 0$ and $f(v, u) \geq 0$, so in fact we must have $c(u,v) - f(u,v)=0$ and $f(v,u)=0$. In other words, our flow $f$ saturates every edge from $S$ to $T$ and avoids every edge from $T$ to $S$. Lemma now implies that $f = c(S,T)$, which means $f$ is a maximum flow and $(S,T)$ is a minimum cut.


[^1]: if the source and target vertices are clear from context

[^2]: In other word, a **(s-t)-flow** is ***feasible*** if it satisfies the ***capacity constraint*** at every vertex, where the flow from one vertex to another must be <u>nonnegative</u> and must <u>not exceed the given capacity</u>.
