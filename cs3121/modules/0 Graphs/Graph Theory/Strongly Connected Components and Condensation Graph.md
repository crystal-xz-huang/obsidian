---
aliases:
  - Strongly Connected Components
  - SCC
  - Condensation Graph
categories:
  - "[[Applications to Graphs]]"
---
# Strongly Connected Components (SCC)

## Definitions

> [!definition]
> A pair of vertices $u$ and $v$ are said to be **strongly connected** to each other if there is a directed path in both directions: $u → v$ and $v → u$. 

> [!def] Strongly Connected Components
> Let  $G=(V,E)$  be a directed graph with vertices  $V$  and edges  $E \subseteq V \times V$ . 
> A subset of vertices $C \subseteq V$ is a **strongly connected component** if the following conditions hold:
> - for all vertices $u, v \in C$, if $u \neq v$  there exists a path from  $u$  to  $v$  and a path from  $v$  to  $u$ , and
> - $C$ is maximal; no vertex can be added without violating the above condition

> [!def] Lecture
> Given a directed graph $G = (V , E)$ and a vertex $v$ , the <u>strongly connected component</u> of $G$ containing $v$ consists of all vertices $u ∈ V$ such that there is a directed path in $G$ from $v$ to $u$ and a directed path from $u$ to $v$. We will denote it by $C_v$.

A **strongly connected component** in a **directed graph** is a maximal set of vertices where any two vertices in the set are mutually reachable (i.e. every vertex is reachable from every other vertex within that set). 

<i>Informally:</i>
- You can get to every vertex from every other vertex by following the direction of its edges.
- For any two vertices in a SCC, you can always find a path (a sequence of edges) that connects them in both directions.

<i>Important Points:</i>
- <b>Directed Graphs</b>: SCC is defined for directed graphs (graphs with one-way edges), not undirected graphs (its equivalent is called connected components).
- <b>Maximality</b>: Each SCC is a maximal set of vertices; no additional vertices can be added to an existing SCC without breaking its property of being strongly connected.
- <b>Mutual Reachability</b>: For any two vertices A and B in an SCC, there is a ==directed path in both directions==: a path from A to B and a path from B to A.
- <b>Partition</b>: The set of all SCCs for a graph do not intersect with each other (disjoint subsets; no overlap), and cover all vertices in the graph, meaning every vertex belongs to exactly one SCC. Thus, the set of all SCCs is a *partition* of the set of all vertices V.

<i>Example:</i> 
Here we have  $\text{SCC}(G_\text{example})=\{\{0,7\},\{1,2,3,5,6\},\{4,9\},\{8\}\}.$  We can confirm that within each strongly connected component, all vertices are reachable from each other.

![drawing](https://cp-algorithms.com/graph/strongly-connected-components-tikzpicture/graph.svg)

Note: A strongly connected component can consist of a single vertex: $\{ 8 \}$

> [!info]+ Connected vs Strongly Connected Components
> A connected component of an undirected graph is the same thing except with all edges are two-way (bidirectional) so reachability automatically works both ways, making the constraint "weaker" i.e. there is a path in *either* direction.
> 
> > A and B are connected if there is a path in *either* direction: A → B *or* B → A
> 
> In directed graphs, edges have direction so we have to explicitly require mutual reachability,
> i.e. there is a path in *both* directions (both directed paths must exist) 
> 
> > A and B are strongly connected if there is a path in *both* directions: A → B *and* B → A

# The Condensation Graph

> [!def] Condensation Graph
> We define the **condensation graph**  $G^{\text{SCC}}=(V^{\text{SCC}}, E^{\text{SCC}})$  as follows:
> 
> - the vertices of  $G^{\text{SCC}}$  are the strongly connected components of  $G$ ; i.e.,  $V^{\text{SCC}} = \text{SCC}(G)$ , and
> - for all vertices  $C_i,C_j$  of the condensation graph, there is an edge from  $C_i$  to  $C_j$  if and only if  $C_i \neq C_j$  and there exist  $a\in C_i$  and  $b\in C_j$  such that there is an edge from  $a$  to  $b$  in  $G$ .

> [!def] Lecture Definition
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

<i>Description:</i>
The condensation graph condenses or "contracts" each strongly connected component into a single node. This reduction provides a simplified view of the connectivity between components.

<i>Important Points:</i>
- The condensation graph is a **directed acyclic graph**, and is topologically sorted.
- Each node represents a strongly connected components in the original graph.

<i>Example:</i>
The condensation graph of  $G_\text{example}$  looks as follows:

![drawing](https://cp-algorithms.com/graph/strongly-connected-components-tikzpicture/cond_graph.svg)


The most important property of the condensation graph is that it is **acyclic**. Indeed, there are no 'self-loops' in the condensation graph by definition, and if there were a cycle going through two or more vertices (strongly connected components) in the condensation graph, then due to reachability, the union of these strongly connected components would have to be one strongly connected component itself: contradiction.

#### Condense Strongly Connected Components into Single Nodes

> [!abstract]
> `condensation` determines the nodes and edges in the directed graph `C` by the components and connectivity in `G`:
> 
> - `C` contains a node for each strongly connected component in `G`.
> - `C` contains an edge between node `I` and node `J` if there is an edge from any node in component `I` to any node in component `J` of `G`.

Highlight the strongly connected components.

![Figure contains an axes object. The axes object contains an object of type graphplot.](https://www.mathworks.com/help/examples/matlab/win64/CondenseStronglyConnectedComponentsIntoSingleNodesExample_02.png)

Use `condensation` to represent each component as a single node. 
Color the nodes based on the components they represent.

![Figure contains an axes object. The axes object contains an object of type graphplot.](https://www.mathworks.com/help/examples/matlab/win64/CondenseStronglyConnectedComponentsIntoSingleNodesExample_03.png)

### Proof

> [!claim]
> The condensation graph $Σ_G$ is a directed acyclic graph.

> [!proof] Proof Outline
> Suppose there is a cycle in $Σ_G$ . Then the vertices on this cycle are **not maximal strongly connected sets**, as they can be merged into an even larger strongly connected set.
> - If there was a cycle, that means those vertices are mutually reachable and should have been condensed to a single node during graph condensation.

# External Links

###### References

- [Strongly Connected Components and Condensation Graph - Algorithms for Competitive Programming](https://cp-algorithms.com/graph/strongly-connected-components.html)

###### Further Reading

- [Finding Connected Components - Algorithms for Competitive Programming](https://cp-algorithms.com/graph/search-for-connected-components.html)