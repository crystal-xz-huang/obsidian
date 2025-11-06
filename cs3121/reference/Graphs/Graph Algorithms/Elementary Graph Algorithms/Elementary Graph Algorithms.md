## Elementary Graph Algorithms

### DFS and BFS

Both DFS and BFS have the same approach. The generic traversal algorithm stores a set of candidate edges in some data structure called a “bag”. The only important properties of a “bag” are that we can put stuff into it and then later take stuff back out. A stack is a particular type of bag, but certainly not the only one.

![[dfs and bfs.png|600]]

The algorithm clearly marks each vertex in G *at most* once. To show that it visits every node in a connected graph *at least* once, the modifications are in bold red. Instead of keeping vertices in the bag, the modified algorithm stores pairs of vertices. This modification allows us to remember, whenever we visit a vertex v for the first time, which previously-visited neighbor vertex put v into the bag. We call this earlier vertex the parent of v.

> [!definition] Lemma
> $\text{WhateverFirstSearch}(s)$ marks every vertex reachable from $s$ and only those vertices. Moreover, the set of all pairs $(v,\text{parent}(v))$ with $\text{parent}(v) \neq \varnothing$ defines a spanning tree of the component containing $s$.

> [!solution]- Proof
> First, we argue that the algorithm marks every vertex $v$ that is reachable from $s$, by induction on the shortest-path distance from $s$ to $v$.
> 
> The algorithm initially marks $s$. Let $v$ be any other vertex reachable from $s$, and let  
> $$
> s \to \cdots \to u \to v
> $$  
> be any path from $s$ to $v$ with the **minimum number of edges**.  
> (Such a path exists because $v$ is reachable from $s$.)
> 
> The prefix path  
> $$
> s \to \cdots \to u
> $$  
> is shorter, so by the inductive hypothesis, the algorithm marks $u$.  
> When the algorithm marks $u$, it must immediately put the pair $(u,v)$ into the bag,  
> so later it must take $(u,v)$ out of the bag, at which point the algorithm immediately marks $v$, unless it was already marked.
> 
> Every pair $(v, \text{parent}(v))$ with $\text{parent}(v) \neq \emptyset$  is actually an **edge** in the underlying graph $G$.
> We claim that for any marked vertex $v$, the path of parent edges  
> $$
> v \to \text{parent}(v) \to \text{parent}(\text{parent}(v)) \to \cdots
> $$  
> eventually leads back to $s$.  
> We prove this claim by induction on the order in which vertices are marked.
> 
> - **Base case:** Trivially, $s$ is reachable from itself.  
> - **Inductive step:**  
>   Let $v$ be any other marked vertex.  
>   The parent of $v$ must be marked **before** $v$ is marked,  
>   so by the inductive hypothesis, the parent chain  
>   $$
>   \text{parent}(v) \to \text{parent}(\text{parent}(v)) \to \cdots
>   $$
>   leads to $s$.  
>   Adding one more parent edge $v \to \text{parent}(v)$ establishes the claim.
> 
> The previous claim implies that **every vertex marked by the algorithm is reachable from $s$**, and that the set of all parent edges forms a **connected graph**. Because every marked vertex except $s$ has a unique parent, the number of parent edges is exactly **one less** than the number of marked vertices. Therefore, the parent edges form a **tree**.

This is easy to adapt to directed graphs; the only difference is that when we mark a vertex, we put all of its *out*-neighbors into the bag. In fact, if we are using standard adjacency lists or adjacency matrices, we do not have to change the code at all!

![[whatever-first-search-directed.png|300]]


#### Stack: Depth First Search

If we implement the “bag” using a **stack**, we recover our original depth-first search algorithm. Stacks support insertions (push) and deletions (pop) in $O(1)$ time each, so the algorithm runs in **O(V + E) time**. The spanning tree formed by the parent edges is called a **depth-first spanning tree**. The exact shape of the tree depends on the start vertex and on the order that neighbors are visited inside the for loop, but in general, depth-first spanning trees are long and skinny.

![[dfs-algorithm.png|500]]


#### Queue: Breadth First Search

If we implement the “bag” using a **queue**, we get a different graph-traversal algorithm called breadth-first search. Queues support insertions (push) and deletions (pull) in O(1) time each, so the algorithm runs in **O(V + E) time**. In this case, the **breadth-first spanning tree** formed by the parent edges contains *shortest paths* from the start vertex $s$ to every other vertex in its component. Again, the exact shape of a breadth-first spanning tree depends on the start vertex and on the order that neighbors are visited in the for loop, but in general, breadth-first spanning trees are short and bushy.


#### Priority Queue: Best-First Search

Finally, if we implement the “bag” using a **priority queue,** we get yet another family of algorithms called best-first search. Because the priority queue stores at most one copy of each edge, inserting an edge or extracting the minimum-priority edge requires O(log E) time, which implies that best-first search runs in **O(V + E log E)** time.

There are three well-known variants below, but there are many others. In all three examples, we assume that every edge $uv$ or $u \to v$ in the input graph has a non-negative weight $w(uv)$ or $w(u \to v)$.

First, if the input graph is undirected and we use the weight of each edge as its priority, best-first search constructs the **minimum spanning tree** of the component of s. Surprisingly, as long as all the edge weights are distinct, the resulting tree does not depend on the start vertex or the order that neighbour are visited; in this case, the minimum spanning tree is actually unique. This instantiation of best-first search is commonly (but, as usual, incorrectly) known as Prim’s algorithm.

Define the *length* of a path to be the sum of the weights of its edges. We can also compute **shortest paths** in weighted graphs using best-first search, as follows. Every marked vertex $v$ stores a distance $\text{dist}(v)$. Initially we set $dist(s) = 0$. For every other vertex $v$, when we set $parent(v) \leftarrow p,$ we also set  $dist(v) \leftarrow dist(p) + w(p \to v),$ and when we insert the edge $v \to w$ into the priority queue, we use the priority $dist(v) + w(v \to w).$ Assuming all edge weights are positive, $\text{dist}(v)$ is the length of the shortest path from $s$ to $v$. This instantiation of best-first search is commonly (but, as usual, strictly speaking, incorrectly) known as Dijkstra’s algorithm.

Finally, define the width of a path to be the minimum weight of any edge in the path. A simple modification of “Dijkstra’s” best-first search algorithm computes widest paths from s to every other reachable vertex; widest paths are also called bottleneck shortest paths. Every marked vertex v stores a value width(v). Initially we set 
$$
width(s) = \infty.
$$ 
For every other vertex v, when we set 
$$
parent(v) \leftarrow p,
$$ 
we also set 
$$
width(v) \leftarrow \min\{width(p),w(p \to v)\},
$$ 
and when we insert the edge 
$$
v \to w
$$ 
into the priority queue, we use the priority 
$$
\min\{width(v), w(v \to w)\}.
$$ 
Widest paths are useful in algorithms for computing maximum flows, which (you guessed it) we’ll consider in Chapter 10.

