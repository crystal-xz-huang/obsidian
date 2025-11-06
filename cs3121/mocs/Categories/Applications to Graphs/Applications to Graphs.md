---
tags:
  - categories
---

# Applications to Graphs

Time Analysis:
- Note that for graphs $G = (V , E)$, the input graph has size $|V | + |E |$. 
- So linear time in the input size means linear in $|V|+|E|$.
- A linear time algorithm is asymptotically “no slower than” reading the graph, so we can run these algorithms “for free”, i.e., without worsening the time complexity of our solution to any problem.

## Graph Traversals

Breadth-first search (BFS) and depth-first search (DFS) are two closely related approaches that are used for exploring all of the nodes in a given connected component. Both start with an arbitrary node, the "root". 

Strongly connected components can also be found using graph traversals using algorithms such as Kosaraju's algorithm, which is a modified DFS.

## Directed Graph Structure

In problems involving **directed acyclic graphs (DAGs)**, it is often useful to impose a **topological ordering** and then think about the actual problem!

## Shortest Path Problem

The shortest path problem is the problem of finding a path between two vertices (or nodes) in a graph such that the sum of the edge weights along that path is minimised.

The problem is also sometimes called the **single-pair shortest path problem**, to distinguish it from the following variations:
- The **single-source shortest path problem**, in which we have to find shortest paths from a source vertex $v$ to all other vertices in the graph.
- The **single-destination shortest path problem**, in which we have to find shortest paths from all vertices in the directed graph to a single destination vertex $v$. This can be reduced to the single-source shortest path problem by reversing the arcs in the directed graph.
- The **all-pairs shortest path problem**, in which we have to find shortest paths between every pair of vertices $(v, v')$ in the graph.
