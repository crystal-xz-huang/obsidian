---
source: "https://runestone.academy/ns/books/published/pythonds/Graphs/VocabularyandDefinitions.html"
---

# Vocabulary and Definitions

###### Graph

> [!def] Graph
> A **graph** is a <u>pair of sets</u> $(V, E)$, where $V$ is an arbitrary non-empty finite set, whose elements are called ***vertices*** or ***nodes***, and $E$ is a set of pairs (either ordered or unordered) of elements of $V$, which we call ***edges***.
> 
> In an **undirected** graph, the edges are ***unordered*** pairs of vertices, or just sets of size two. In a **directed** graph, the edges are ***ordered*** pairs of vertices.
> 
> > In short: A graph is a set of pairs of things.
> 
> In any undirected graph we have $0 ≤ E ≤ \binom{V}{2}$, and in any directed graph we have $0 ≤ E ≤ V(V − 1)$.
> 
> A **subgraph** of $G$ is a set of edges $E'$ and vertices $V'$ such that $E'\subseteq E$ and $V' \subseteq V$. A **proper subgraph** of $G$ is any subgraph other than $G$ itself.

A graph can be represented by $G$ where $G=(V,E)$. For the graph $G$, $V$ is a set of vertices and $E$ is a set of edges. Each edge is a tuple $(v,w)$ where $w,v \in V$. We can add a third component to the edge tuple to represent a weight. 

[[#^figure-1|Figure 1]] shows an example of a simple weighted digraph. Formally we can represent this graph as the set of six vertices: 

$$
V = \{V_0, V_1, V_2, V_3, V_4, V_5\}
$$

and the set of nine weighted edges:

$$
E = \{(v_0, v_1, 5), (v_1, v_2, 4), (v_2, v_3, 9), (v_3, v_4, 7), (v_4, v_0, 1), (v_0, v_5, 2), (v_5, v_4, 8), (v_3, v_5, 3), (v_5, v_2, 1)\}
$$

![Figure 1: Directed Graph|250](https://runestone.academy/ns/books/published/pythonds/_images/digraph.png)^figure-1
<figcaption>Figure 1: Directed Graph</figcaption>


###### Path

A path in a graph is a sequence of vertices that are connected by edges. Formally, we define a path as $w_1, w_2, \ldots, w_n$ such that $(w_i, w_{i+1}) \in E$ for all $1 \le i \le n - 1$.  The **unweighted path length** is the *number of edges* in the path, specifically $n - 1$. The **weighted path length** is the *sum of the weights of all the edges* in the path. For example in [[#^figure-1|Figure 1]] the path from $V_3$ to $V_1$ is the sequence of vertices $(V_3, V_4, V_0, V_1)$.  

###### Cycle

A cycle in a directed graph is a path that starts and ends at the same vertex. For example in [[#^figure-1|Figure 1]] the path $(V_5, V_2, V_3, V_5)$ is a cycle.  A graph with no cycles is called an **acyclic graph**. A directed graph with no cycles is called a **directed acyclic graph (DAG)**. 

---

###### Neighbourhood 

The **endpoints** of an edge $uv$ or $u \to v$ are its vertices $u$ and $v$. We distinguish the endpoints of a directed edge $u \to v$ by calling $u$ the **tail** and $v$ the **head**.

In a graph, when there is an edge connecting two vertices, the vertices are said to be **adjacent** to one another and the edge is **incident** to both vertices. Similarly, **adjacent edges** are edges that share a common vertex

For any edge $(u, v)$ in an undirected graph, we call $u$ a **neighbour** of $v$ and vice versa, and we say that $u$ and $v$ are **adjacent**. The **degree** of a node is its number of neighbors.

In directed graphs, we distinguish two kinds of neighbors. For any directed edge $u \to v$, we call $u$ a **predecessor** of $v$, and we call $v$ a **successor** of $u$. The **in-degree** of a vertex is its number of predecessors; the **out-degree** is its number of successors.

![Graph algorithms — Sciprog DS Lab|400](https://sciprog.davidleoni.it/_images/graph-adjacent.png)

###### Parallel edges and loops

Two edges that connect the same pair of vertices are called **parallel**, while an edge that connects a vertex to itself is called a **loop**. The **degree** of a vertex is the number of edges incident to that vertex, with loops counted twice. So, the degree of vertex 0 in the graph below is 5, while the degree of vertex 1 in the same graph is 3.
![Graphs|200](https://mathcenter.oxford.emory.edu/site/cs171/graphs/loops_and_parallel_edges.png)

The definition of a graph as a pair of *sets* forbids multiple undirected edges with the same endpoints, or multiple directed edges with the same head and the same tail (**parallel edges**). Similarly, the definition of an undirected edge as a *set* of vertices forbids an undirected edge from a vertex to itself (**loops**). 

Graphs without loops and parallel edges are often called **simple graphs**; non-simple graphs are sometimes called **multigraphs**.

---

Undirected graphs:

- A **walk** in an undirected graph $G$ is a sequence of vertices, where each adjacent pair of vertices are adjacent in $G$. Informally, a walk can also be seen as a sequence of edges. 
- A walk is called a **path** if it visits each vertex at most once. 
- For any two vertices $u$ and $v$ in a graph $G$, we say that $v$ is **reachable** from $u$ if $G$ contains a walk (and therefore a path) between $u$ and $v$.  
- An undirected graph is **connected** if every vertex is reachable from every other vertex. 
- Every undirected graph consists of one or more **components**, which are its **maximal connected subgraphs**; two vertices are in the same component if and only if there is a path between them.
- A walk is **closed** if it starts and ends at the same vertex; a **cycle** is a closed walk that enters and leaves each vertex at most once. An undirected graph is **acyclic** if no subgraph is a cycle; acyclic graphs are also called **forests**. A **tree** is a connected acyclic graph, or equivalently, one component of a forest. A **spanning tree** of an undirected graph $G$ is a subgraph that is a tree and contains every vertex of $G$. A graph has a spanning tree if and only if it is connected. A spanning forest of $G$ is a collection of spanning trees, one for each component of $G$.

Directed graphs require slightly different definitions. 
- A **directed walk** is a sequence of vertices $v_0 \to v_1 \to v_2 \to \cdots \to v_\ell$ such that  $(v_{i-1}, v_i)$ is a directed edge for every index $i$.  **Directed paths** and **directed cycles** are defined similarly. 
- Vertex $v$ is **reachable** from vertex $u$ in a directed graph $G$ if and only if $G$ contains a directed walk (and therefore a directed path) from $u$ to $v$.  A directed graph is **strongly connected** if every vertex is reachable from every other vertex.  
- A directed graph is **acyclic** if it does not contain a directed cycle; directed acyclic graphs are often called **DAGs**.



