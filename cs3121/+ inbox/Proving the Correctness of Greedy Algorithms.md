# Proving the Correctness of Greedy Algorithms

The correctness of greedy algorithms is the most crucial element to the algorithm; since greedy algorithms do not consider every scenario, we need to be careful with the analysis of these algorithms. After all, very natural heuristics are often incorrect (sometimes, they are not incorrect by very much – these are very good algorithms to study for approximations).

Since the correctness argument plays an important role in the design of the algorithm, typically greedy algorithms cannot be assumed to be correct (even if the algorithm is correct) without its proof.

The appendix at the end of this tutorial document will highlight two more techniques that are also perfectly suitable as methods of proof for the correctness of greedy algorithms.

## 2.1 The Exchange Argument

The exchange argument is the most common proof technique and demonstrates the correctness of the algorithm by showing that any optimal solution can be iteratively transformed into a sequence of solutions that eventually converge to the greedy solution. The crucial element of the argument is that each subsequent iteration transforms any optimal solution into a new solution whose optimality remains unaffected. In other words, if we have a sequence $O, O_1, O_2, \dots, O_t, G$, then each of the intermediary solutions $O_i$ have the same optimality cost as $O$. In particular, this means that transforming $O_t$ to $G$ does not affect its cost, which implies that $c(O) = c(G)$, concluding with the statement that $G$ is optimal.

When proving optimality with exchange, we need to find a suitable metric that allows us to compare the intermediary solutions. The most common metric is the number of elements in each solution; however, other metrics exist and the most suitable metric depends on the problem itself.

#### 2.1.1 Arguing with the exchange argument

When arguing with the exchange argument, we follow the scaffold below:

- Let $G = { g_1, \dots, g_m }$ denote the greedy solution and $O = { o_1, \dots, o_{m'} }$ denote any optimal solution.
	- It is important that $O$ begins with an optimal solution; the point of the exchange argument is that the exchanges we make form a new valid solution whose optimality remains unchanged.
	- If we begin with an arbitrary solution, some complications may arise later down the track. This isn’t particularly common, however. But it is easier to argue correctness from an optimal solution.
	- We cannot assume, _a priori_, that $G$ and $O$ choose the same number of elements; therefore, we cannot assume that $m = m'$ in general.
- If $G = O$, then $c(G) = c(O)$ and so, $G$ is optimal. We may, therefore, assume that $G$ differs from $O$ in at least one place. Assume that $k \le m$ is the first index in which $g_k \ne o_k$.
	- In particular, this means that $g_i = o_i$ for each $1 \le i \le k - 1$.
- Form a new solution $O' = { o_1, \dots, o_{k-1}, g_k, o_{k+1}, \dots, o_{m'} }$.
	- This is the iterative transformation. The point now is to show that $O'$ is both valid and optimal; in other words, we show that $O'$ is a valid solution and $c(O') = c(O)$.
- Inductively transform $O$ into $G$ by arguing that we can make the same argument at every index for which $O$ and $G$ do not match. Hence, we have that
	    $$  
    c(O) = c(O_1) = \dots = c(O_t) = c(G),  
    $$

    which concludes the correctness proof of $G$.
    

#### 2.1.2 Exchange via Inversions

An equivalent method of proving correctness via the exchange argument is to prove that inversions are unideal. Recall that, in an array $A$, a pair of indices $(i, j)$ form an inversion if and only if $(i < j)$ and $(A[i] > A[j])$. In some situations, arguing exchange via minimising inversions is simple. This is particularly relevant in scheduling problems. However, to do this, we need the following lemma.

**Lemma.** Let $A$ be an array of real numbers. If $A$ contains an inversion between a pair of indices, then $A$ contains an inversion between a pair of adjacent indices.

In other words, it is enough to care about inversions formed by adjacent indices. This makes the analysis and correctness proof easier to reason with, because swapping a pair of adjacent indices around will only decrease the number of inversions by one, whereas swapping a pair of non-adjacent indices may introduce more inversions. As such, it is generally preferred to focus locally on adjacent pairs of indices, which gives us more control. We now prove this lemma; in future problems, you may wish to state this result without proof.

**Proof of Lemma.** Let $(i, j)$ form the closest non-adjacent inversion, where $i < j$. We consider two different cases.

- If $A[i] > A[i + 1]$, then $(i, i + 1)$ forms an inversion and we are done.
- If $A[i] \le A[i + 1]$, then $(i + 1, j)$ forms a closer inversion since

    $$  
    A[j] < A[i] \le A[i + 1],  
    $$

    and $i + 1 \le j$ since $i$ and $j$ are non-adjacent. We can continue this argument, and the process must eventually terminate to form an inversion between adjacent indices.
    

From this lemma, we can now state the method in full.

- Form a suitable definition for an inversion with respect to your problem.
    - The usual strategy is: for a schedule $\pi$, a pair of indices $(i, j)$ form an inversion if and only if $(i < j)$ and $(\pi(i) > \pi(j))$.
- Show that the greedy solution has zero inversions. This is usually by design.
- Consider any solution $\pi$ that has at least one inversion and let $(i, i + 1)$ be any inversion in $\pi$. Define a new solution $\pi^*$ such that

    $$  
    \pi^*(k) =  
    \begin{cases}  
    \pi(i + 1) & \text{if } k = i, \  
    \pi(i) & \text{if } k = i + 1, \  
    \pi(k) & \text{otherwise.}  
    \end{cases}  
    $$

    - Note that $\pi^*$ is a new ordering that has one less inversion; the only inversion that was affected was the inversion $(i, i + 1)$.
- Show that $\pi^*$ produces a solution that is just as optimal as $\pi$.
    - This means that if $\pi$ was optimal, so is $\pi^*$.
    - Again, this forms a sequence of solutions $\pi, \pi_1, \dots, \pi_k$, where $\pi_i$ has one less inversion than $\pi_{i-1}$.
    - Eventually, we must terminate to a solution with zero inversions. Since we had that

        $$  
        c(\pi) = c(\pi_1) = \dots = c(\pi_k),  
        $$

        where $c(\pi_k)$ has zero inversions, this implies that any optimal solution can be iteratively transformed to a solution with zero inversions, showing that solutions with zero inversions are optimal.

---

## 2.2 Greedy Stays Ahead

The **greedy stays ahead** method is a proof technique that demonstrates the correctness of the algorithm by showing that, at every iteration, the greedy solution is always as good as any optimal solution (and by extension, any arbitrary solution).  

In a greedy stays ahead proof, the general strategy is to prove an **invariant** – this invariant is the metric that we want to define such that, when the greedy algorithm terminates, its cost is equal to the cost of any optimal solution.  

As such, the standard strategy is to prove that this invariant holds in every iteration inductively. The general scaffold is highlighted below:

- Let $G = \{g_1, \dots, g_m\}$ and $O = \{o_1, \dots, o_{m'}\}$ denote the greedy and optimal solutions respectively. Define a metric accordingly such that:

$$
c(G) = \sum_{i=1}^{m} c(g_i), \quad c(O) = \sum_{i=1}^{m'} c(o_i).
$$

- Show that, when $i = 1$, we have that $c(g_1) \leq c(o_1)$ or $c(g_1) \geq c(o_1)$, depending on the optimisation aspect of the problem.

- Define the partial solutions $G_k = \{g_1, \dots, g_k\}$ and $O_k = \{o_1, \dots, o_k\}$ to be the choices made by the greedy and optimal solutions respectively after $k$ decisions. Assume, now, that the greedy and optimal solution (up to this point) has cost:

$$
c(G_k) = \sum_{i=1}^{k} c(g_i), \quad c(O_k) = \sum_{i=1}^{k} c(o_i),
$$

	with $c(G_k) \leq c(O_k)$ or $c(G_k) \geq c(O_k)$.

- Show that $c(G_{k+1}) \leq c(O_{k+1})$ or $c(G_{k+1}) \geq c(O_{k+1})$.
- This also implies that $c(G) \leq c(O)$ or $c(G) \geq c(O)$.
- Show that once $G$ terminates, $O$ cannot contain strictly more or less number of elements, with a proof by contradiction. This proves that the greedy algorithm is optimal.

---

## Examples

### Interval Stabbing

> [!example] Interval Stabbing
> Let $I$ be a collection of $n$ intervals on the real line, where the $i$th interval is represented as $I_i = [l_i, r_i]$ with $l_i \leq r_i$. We say that a vertical line at position $x$ stabs interval $I_i$ if $l_i \leq x \leq r_i$.
> 
> Given the collection $I$, you want to find the minimum number of vertical lines such that every interval in $I$ is stabbed by at least one line. In other words, you must choose a set of points $x_1, x_2, \dots, x_k$ on the real line such that for every interval $I_i$, there exists some $x_j$ with $l_i \leq x_j \leq r_i$, and $k$ is as small as possible. Design an $O(n \log n)$ algorithm to the minimum subset of points needed.

$\textit{Proof.}$ We can first sort on endpoint in $O(n \log n)$ with mergesort. Then, choose the smallest endpoint of all unstabbed intervals, and add this point to the set $S$. We iterate over all remaining intervals and repeat the argument. Output $S$. We consider each interval only once, and there are $n$ intervals. Hence, our algorithm runs in $O(n \log n)$.

**GSA:** 
Firstly, note that stabbing the earliest ending interval at the right endpoint of the interval is at least as good as stabbing that interval at any other point $t$, since any interval stabbed at $t$ will also be stabbed at the right endpoint.

Then, suppose our greedy solution is denoted by $G = \{ g_1, g_2, \dots, g_m \}$ where $g_i$ is the set of intervals stabbed after the $i$th stab and $g_1 \subseteq g_2 \subseteq \dots \subseteq g_m.$ Similarly, denote $O = \{ o_1, o_2, \dots, o_{m'} \}$ for our other solution. We look to show that for each $i$, $|g_i| \geq |o_i|$.

Clearly, at the first step, $|g_1| \geq |o_1|$ by our earlier observation. Then, suppose $|g_k| \geq |o_k|$. We are now required to prove that $|g_{k+1}| \geq |o_{k+1}|$. Note that in the greedy solution, the $(k+1)$th stab occurs at the right endpoint of the earliest ending interval in $g_{k+1} \setminus g_k$. Similarly, the $(k+1)$th stab in $O$ occurs at some point of the earliest ending interval in $o_{k+1} \setminus o_k$.

Then, consider all intervals in $o_{k+1} \setminus o_k$. All of these intervals must be stabbed after the $(k+1)$th stab; but all of these intervals must be considered by $g_{k+1}$, since the $k$th stab occurred at a later point in $G$ than in $O$ (by assumption). This implies that the $(k+1)$th stab in $G$ considers at least as many intervals as the $(k+1)$th stab in $O$. Then we have that:

$$
\begin{align*}
|o_{k+1}| &= |o_{k+1} \setminus o_k| + |o_k| \\
&= |(o_{k+1} \setminus o_k) \setminus (g_{k+1} \setminus g_k)| 
   + |(o_{k+1} \setminus o_k) \cap g_k| + |o_k| \\
&\leq |(o_{k+1} \setminus o_k) \setminus (g_{k+1} \setminus g_k)| 
   + |g_k| \qquad \text{(by assumption)} \\
&\leq |g_{k+1} \setminus g_k| + |g_k| = |g_{k+1}|.
\end{align*}
$$

Thus, we have that at the $(k+1)$th stab more intervals have been cumulatively stabbed, and hence $O$ cannot use fewer stabs than $G$. Hence, $G$ is optimal.

**Exchange Argument:** 
Let $S$ be an optimal solution; suppose the $k$th stab does not occur at any right endpoint. Note that we may assume that the $k$th stab occurs before some right endpoint (suppose it did not, then removing the stab produces a more optimal solution than our assumed optimal solution). Then note that shifting the $k$th stab to the earliest right endpoint that stabs the same intervals does not affect optimality. This means that an optimal solution exists that stabs only right endpoints.

Then, suppose our greedy solution is denoted by $G = \{ g_1, g_2, \dots, g_m \}$ where $g_i$ is the location of the $i$th stab and $g_1 < g_2 < \dots < g_m$. Similarly, denote $O = \{ o_1, o_2, \dots, o_{m'} \}$ for our other solution. Suppose for all $i < k$ we have that $g_i = o_i$, and that $g_k \neq o_k$.

Note that $o_k \not> g_k$, since this implies that the first interval available after the $(k-1)$th stab was missed. Then, since $o_k < g_k$ and $o_k$ stabs the first interval, we use the previous claim to show that setting $o_k = g_k$ is at least as good. Repeating this argument shows that the greedy solution is optimal.

---

### Hiking Trip

> [!example] Hiking Trip
> You are hiking along an Appalachian trail, which is a long trail approximately $L$ metres long. Your hiking gang can only walk $d$ metres each day. Hikers have come before you and have mapped out $n$ stopping points, where the $i$th stopping point is $x_i$ metres from the start of the trail. At the end of each night, you can only rest at a stopping point. Design a plan for you and your gang to hike the entire Appalachian trail, whilst minimising the number of nights you need to take to finish the trail.

We simply stop at the farthest stopping point we can. We now prove that this algorithm is correct via induction. Let $G = { g_1, \dots, g_m }$ and $O = { o_1, \dots, o_{m'} }$ denote the set of stopping points produced by the greedy and optimal solutions respectively.

Without loss of generality, we may assume that $g_1 \leq \dots \leq g_m$ and $o_1 \leq \dots \leq o_{m'}$ (i.e. $g_1$ is the closest stopping point in $G$ and $o_1$ is the closest stopping point in $O$). Note that since $O$ is optimal, $m' \leq m$. We proceed to show that $m \leq m'$.

For a subset $S$ of stopping points, let $f(S)$ denote the distance of the farthest stopping point from the start of the trail. This means that $f(G) = f({ g_m })$ and $f(O) = f({ o_{m'} })$. For the greedy stays ahead, define the partial solutions $G_k = { g_1, \dots, g_k }$ and $O_k = { o_1, \dots, o_k }$. We first proceed to show that $f(G_k) \geq f(O_k)$ for all $1 \leq k \leq m$.

- **Base case.** Since both solutions start at the same point, it is easy to see that

    $$  
    f(G_1) = f({ g_1 }) \geq f({ o_1 }) = f(O_1).  
    $$

- **Inductive hypothesis.** Suppose that the statement is true for all $1 \leq i \leq k-1$; that is, $f(G_i) \geq f(O_i)$. Note that

    $$  
    f(O_k) \leq f(O_{k-1}) + d,  
    $$

    since the $k$th stopping point is at most a distance of $d$ away from the $(k-1)$th stopping point. But by the inductive hypothesis, we have that

    $$  
    f(O_k) \leq f(O_{k-1}) + d \leq f(G_{k-1}) + d.  
    $$

    Therefore, the $k$th stopping point of $O$ is among the set of valid choices that $G$ considered for its $k$th stopping point; therefore,

    $$  
    f({ g_k }) \geq f({ o_k }) \implies f(G_k) \geq f(O_k).  
    $$

We finally finish the proof of correctness. Suppose that $m > m'$. Then there exist a stopping point $g_m$ that wasn’t used by $O$. This implies that $f({ g_m }) \leq L$. But, if $o_{m'}$ was the last stopping point used by $O$, then we have that

$$  
f(O) = f({ o_{m'} }) \leq f({ g_{m'} }) < f({ g_m }) \leq L.  
$$

Therefore, $O$ could not have been a feasible solution. Therefore, $m \leq m'$. This proves that $m = m'$ and the greedy solution uses the same number of stopping points as any optimal solution, which proves optimality.
