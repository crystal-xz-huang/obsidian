# Depth-First Search

## Reachability

If we implement the “bag” using a **stack**, we recover our original depth-first search algorithm. Stacks support insertions (push) and deletions (pop) in $O(1)$ time each, so the algorithm runs in **O(V + E) time**. The spanning tree formed by the parent edges is called a **depth-first spanning tree**. The exact shape of the tree depends on the start vertex and on the order that neighbors are visited inside the for loop, but in general, depth-first spanning trees are long and skinny.

![[dfs-algorithm.png|500]]

Recall that a node $w$ is reachable from another node $v$ in a directed graph $G$— or more simply, $v$ can reach $w$—if and only if $G$ contains a directed path from $v$ to $w$. 

Let $\text{reach}(v)$ denote the set of vertices reachable from $v$ (including $v$ itself). If we unmark all vertices in $G$, and then call $\text{DFS}(v)$, the set of marked vertices is precisely $\text{reach}(v)$.

