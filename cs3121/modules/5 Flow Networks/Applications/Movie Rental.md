---
tags:
  - examples
---


# Example: Movie Rental

> [!problem]
> <b>Instance:</b> Suppose you have a movie rental agency.  
> 
> You have $k$ movies in stock, with $m_i$ copies of movie $i$.  
> 
> There are $n$ customers, who have each specified which subset of the $k$ movies they are willing to see. However, **no customer can rent out more than 5 movies at a time**.
> 
> <b>Task:</b> Design an algorithm which runs in $O(n^2 k)$ time and dispatches the largest possible number of movies.

> [!x]- Greedy 
> Greedy has an **order**. At each step, we must decide *which movie* to give out first (and consequently we also decide which customer to rent to first). 
> 
> - First in first serve (i.e., by order of the queue)?
> - Rent out the most popular movie with the fewest copies?
> - Rent to customers with the fewest options first (i.e., start with the least-liked movie)?
> 
> There is no good order for greedy and this can be shown by counterexamples. Intuitively, giving one movie to a customer reduces their remaining "capacity" and might block better allocations in the future.

> [!x]- DP 
> DP also relies on an **ordering** of what is a bigger subproblem that depends on the answers of smaller subproblems. Again, we need some order in which to process movies or customers. A natural DP idea would be to solve the problem restricted to the first $i$ customers according to some order and the first $j$ movies according to some order. However, this does NOT have the optimal substructure because if we try to maximise the allocation of $j$ movies to $i$ people, then clearly, we are going to use up alot of the $i$ people's five movie slots so at movie $j+1$, we are going to have no one to give it to, or we are going to have to undo some of the allocations already made. To solve this, we would need to keep track of (1) remaining copies of each movie (2) remaining capacity of each customer and (3) the compatibility matrix (n × k) so the search space grows exponentially.

> [!x]- Divide-and-Conquer 
> Observed that choices in one half affects the choices in another so the subproblems are **not independent**. Therefore D&C is not applicable.

We must do all allocations of movies to people at the same time 
i.e., we do NOT want to prioritise one movie/person 

⇒ Max-Flow Problem
- edges = customer $i$ → movie $j$
- constraints = capacities.

---

In the **many-to-many assignment problem**, each customer $i$ may take up to $c_i$ movies ($c_i$ is called the customer's capacity/demand) and each movie $j$ may be taken by up to $d_j$ customers simultaneously ($d_j$ is called the movies's capacity/supply).

(1) Capacity constraints: For each e ∈ E, $0 ≤ f (e) ≤ c(e)$.
(2) Demand constraints: $f^{\text{to}}(v) = f^{\text{in}}(v)$ 

![[movie-rental.excalidraw.png|400]]

- Layer 1: One source-node ${\color{red}s}$.
- Layer 2: A node for each customer. 
  There is an edge from $s$ to each customer ${\color{red} i}$, with capacity $c_i = 5$ .
- Level 3: A node for each movie. 
  There is an edge from each customer $i$ to each movie ${\color{red} j}$, with unit capacity $1$.
- Level 4: One sink-node ${\color{red} t}$. 
  There is an edge from each movie to $t$, with capacity $m_j$.

Intuition:
- Capacity of edges $(s, \text{customer})$ limit the supply **to** each customer
- Capacity of edges  $(\text{movie}, t)$ limit the 

Every integral maximum flow in this network corresponds to a matching in which at most $c_i$ movies are assigned to each customer $i$ and at most $m_j$ movies are assigned to each 

Construct a flow network with:
- source $s$ and sink $t$,
- a vertex $u_i$ for each customer $i$,
- a vertex $v_j$ for each movie $j$,
- for each customer $i$, an edge from $s$ to $u_i$ with capacity $5$,
- for each customer $i$, and for each movie $j$ that they are willing to see, an edge from $u_i$ to $v_j$ with capacity $1$,
- for each movie $j$, an edge from $v_j$ to $t$ with capacity $m_j$.

<b>Question.</b> What does a flow in this network represent?

Each customer–movie edge has capacity $1$, so we will interpret a flow of $1$ from $u_i$ to $v_j$ as assigning movie $j$ to customer $i$. Each customer only receives movies that they want to see.

By **flow conservation**, the amount of flow sent along the edge from $s$ to $u_i$ is equal to the total flow sent from $u_i$ to all movie vertices $v_j$, so it represents the number of movies received by customer $i$. Again, the **capacity constraint** ensures that this does not exceed $5$ as required.

Similarly, the movie stock levels $m_j$ are also respected. Therefore, any flow in this graph corresponds to a valid allocation of movies to customers.

The converse is also true; any valid allocation of movies to customers is naturally represented by a flow.

<b>Question.</b> What is the running time to find the maximum flow?

To maximise the movies dispatched, we find the maximum flow using the Edmonds–Karp algorithm.

There are $n + k + 2$ vertices and up to $nk + n + k$ edges, so the time complexity is
$$O(|V| \cdot |E|^2) = O\big((n + k + 2)(nk + n + k)^2\big)$$

Since the value of any flow is constrained by the total capacity from $s$, which in this case is $5n$, we can achieve a tighter bound of
$$O(|E| \cdot |f|) = O\big((nk + n + k)n\big) = O(n^2 k)$$

