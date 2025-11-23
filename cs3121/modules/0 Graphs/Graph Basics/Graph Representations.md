
# Data Structures

Graphs are usually represented by one of two standard data structures: **adjacency lists** and **adjacency matrices**. Either way applies to both directed and undirected graphs. 
![[graph-representations.png]]
![[operations on standard graph data structures.png]]

Because the adjacency list representation provides a compact way to represent **sparse** graphs—those for which $|E|$ is must less than $|V|^2$—it is usually the method of choice.

Adjacency-matrix representation might be preferred when then graph is **dense**—$|E|$ is close to $|V|^2$—or when you need to be able to tell quickly whether there is an edge connecting two given vertices. 

For sufficiently dense graphs, adjacency matrices are simpler and more efficient in practice, because they avoid the overhead of chasing pointers and computing hash functions; they’re just contiguous blocks of memory.

## Adjacency Lists

An adjacency list is an array of lists, each containing the neighbours (adjacent vertices) of one of the vertices (or the out-neighbours if the graph is directed). ^[Despite its name, an adjacency list is not a list; its an array of linked lists, or any other structure that supports searching, listing, insertion, and deletion.] 

For undirected graphs, each edge $\{u,v\}$ is stored twice, once in $u$’s neighbour list $Adj[u]$ and once in $v$’s neighbour list $Adj[v]$. Therefore, if $G$ is an undirected graph, the sum of the lengths of all adjacency lists is $2|E|$. 

For directed graphs, each edge $(u,v)$ is stored only once, by having the ==head $v$ stored in $Adj[u]$==; the neighbour list of the tail $u$. Therefore, the sum of the lengths of all adjacency lists is $|E|$.

For both directed and undirected graphs, the overall space required for an adjacency list is $\Theta(V + E)$. 

- Finding each edge in the graph also takes $\Theta(V + E)$ time since each of the $|V|$ adjacency lists must be examined. 
- If $|E| = \Omega(V)$—such as in a connected, undirected graph or a strongly connected, directed graph—we can say that finding each edge takes $\Theta(E)$ time. 
- List the (out-)neighbours of a node $v$ in $O(1+deg(v))$ time.
- Determine whether $u \to v$ is a edge in $O(1+deg(u))$ time by scanning the adjacency list of $u$.
- For undirected graphs, we can improve the time to $O(1 + \min\{deg(u), deg(v)\})$ by simultaneously scanning the adjacency lists of both $u$ and $v$, stopping either when we locate the edge or when we fall of the end of a list.


## Adjacency Matrices

The adjacency matrix of a graph $G=(V,E)$ is a $|V| \times |V|$ matrix of 0s and 1s, normally represented by a 2D array $A[1..V, 1..V]$, where each entry indicates whether a particular edge is present in $G$.

- if the graph is undirected, then $A[u, v] = 1$ if and only if $\{u, v\} \in E$.
- if the graph is directed, then $A[u, v] = 1$ if and only if $u \to v \in E$.

For undirected graphs, the adjacency matrix is always symmetric, meaning $A[u, v] = A[v, u]$ for all vertices $u$ and $v$, because $(u, v)$ and $(v, u)$ are the same edge, and the diagonal entries $A[u, u]$ are all zeros. 

For directed graphs, the adjacency matrix may or may not be symmetric, and the diagonal entries may or may not be zero.

Since in an undirected graph $(u, v)$ and $(v, u)$ represent the same edge, the adjacency matrix of an undirected graph is its own **transpose**: $A = A^T$. The transpose of a directed graph $G=(V,E)$ is the graph $G^T = (V, E^T)$ where $E^T=\{ (v, u) \in V \times V \mid (u, v) \in E\}$. That is, $G^T$ is $G$ with all its edges reversed. 

> [!definition]
> Formally, the adjacency matrix of a graph $G=(V,E)$ is a $|V| \times |V|$ matrix $A=(a_{ij})$ such that 
> 
> $$
> a_{ij} =
> \begin{cases}
> 1 &\text{if } (i, j) \in E \\[2pt]
> 0 &\text{otherwise.}
> \end{cases}
> $$
> 
> For weighted graphs, we store the weights of each edge and $\infty$ if there is no edge.  

Given an adjacency matrix, we can decide in $\Theta(1)$ time whether two vertices are connected by an edge just by looking in the appropriate slot in the matrix. We can also list all the neighbors of a vertex in $\Theta(V)$ time by scanning the corresponding row (or column). 

The adjacency matrix of $G$ requires $\Theta(V^2)$ memory, independent of number of edges, so they are only space-efficient for **dense** graphs. Finding each edge in the graph requires examining the entire adjacency matrix in  $\Theta(V^2)$ time.


<hr class="dots" />

# Representations

## Dependency Graphs

Another good example is the **dependency graph** of a recursive algorithm. Dependency graphs are ==directed acyclic graphs==. The vertices are all the distinct recursive subproblems that arise when executing the algorithm on a particular input. There is an edge from one subproblem to another if evaluating the second subproblem requires a recursive evaluation of the first. For example, for the Fibonacci recurrence

$$F_n = 
\begin{cases}
0 &\text{if } n = 0,\\
1 &\text{if } n = 1,\\
F_{n-1} + F_{n-2} &\text{otherwise},
\end{cases}
$$

the vertices of the dependency graph are the integers $0, 1, 2, \ldots, n$, and the edges are the pairs $(i - 1) \to i$ and $(i - 2) \to i$ for every integer $i$ between $2$ and $n$.

![[dependency graph of fibonacci.png|400]]

As a more complex example, recall the recurrence for the [[Edit Distance]] problem:

![[edit-distance-recurrence.png|400]]

The dependency graph of this recurrence is an $m \times n$ grid of vertices $(i, j)$ connected by vertical edges $(i - 1, j) \to (i, j)$, horizontal edges $(i, j - 1) \to (i, j)$, and diagonal edges $(i - 1, j - 1) \to (i, j)$. 

![[dependency graph of edit-distance.png|400]]

Dynamic programming works efficiently for any recurrence that has a reasonably small dependency graph; a proper evaluation order ensures that ==each subproblem is visited after its predecessors.==


## Configuration Graphs

Another interesting example is the **configuration graph** of a game, puzzle, or mechanism like tic-tac-toe, checkers, the Rubik’s Cube, the Tower of Hanoi, or a Turing machine. The vertices of the configuration graph are all the valid configurations of the puzzle; there is an edge from one configuration to another if it is possible to transform one configuration into the other with a single simple “move”. (Obviously, the precise definition depends on what moves are allowed.) Even for reasonably simple mechanisms, the configuration graph can be extremely complex, and we typically only have access to local information about the configuration graph.

![[configuration graph of the 4-disk Tower of Hanoi.png|400]]

Each state of a game appears exactly once in its configuration graph. In short, configuration graphs are memoized game trees!

It’s important not to confuse any of these examples/representations with the actual formal definition: A graph is a pair of sets $(V, E)$, where $V$ is an arbitrary non-empty finite set, and $E$ is a set of pairs (either ordered or unordered) of elements of $V$ . In short: A graph is a set of pairs of things.