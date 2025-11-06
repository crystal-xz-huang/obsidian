---
aliases: [Dijkstra’s algorithm]
categories:
  - "[[Shortest Path Problem]]"
---

# Shortest Path Algorithms

> [!definition] Notation
> Let $n = |V|$ and $m = |E|$.

> [!problem]
> Given a weighted (un-)directed graph $G = (V,E)$ and a source vertex $s$, find the shortest path from $s$ to every other vertex.

> [!solution]
> - On a weighted graph, we can do this with [[Dijkstra's Algorithm]] in $O(m \log n)$ time.
> - On an unweighted graph, we can do this with breadth-first search in $O(m + n)$ time.

| Graph Type                 | Algorithm      | Time Complexity |
| -------------------------- | -------------- | --------------- |
| Unweighted                 | BFS            | $O(m + n)$       |
| Weighted (non-negative)    | Dijkstra       | $O(m \log n)$  |
| Weighted (may be negative) | Bellman–Ford   | $O(nm)$         |
| DAG                        | Topological DP | $O(m + n)$      |

---

## Dijkstra's Algorithm

Dijkstra's algorithm is an algorithm for finding the shortest paths from one source vertex to all other vertices for directed or undirected paths.


Dijkstra's algorithm performs  $n$  iterations. On each iteration it selects an **unmarked (unvisited) vertex  $v$  with the lowest value  $d[v]$ (i.e. the smallest distance)** , marks it as visited and checks all its edges  $(v, \text{to})$  attempting to improve the value  $d[\text{to}]$ .

Note: this is the invariant for Dijkstra — that once a vertex is removed from the heap (i.e. has the smallest current distance), its shortest distance is final and will never decrease later.

The running time of the algorithm consists of:
- $n$  searches for a vertex with the smallest value  $d[v]$  among  $O(n)$  unmarked vertices
- $m$  relaxation attempts: all outgoing edges $(v,\text{to})$   from the vertex $v$ are considered, and for each vertex  $\text{to}$  the algorithm tries to improve the value  $d[\text{to}]$ .



For the simplest implementation of these operations on each iteration vertex search requires  $O(n)$  operations, and each relaxation can be performed in  $O(1)$ . Hence, the resulting asymptotic behavior of the algorithm is: $O(n^2 + m)$. This complexity is optimal for dense graph, i.e. when  $m \approx n^2$ . However in sparse graphs, when  $m$  is much smaller than the maximal number of edges  $n^2$ , the problem can be solved in  $O(n \log n + m)$  complexity

Using a heap as the priority queue reduces the time complexity to  

$$O(m log n).$$

This remains the asymptotically fastest known single-source shortest-path algorithm for general directed graphs with arbitrary non-negative weights.

Specialised cases can be solved even faster:
- For **directed acyclic graphs (DAGs)**, a topological-order DP runs in $O(|V| + |E|)$ time.
- For graphs with **bounded or integer weights**, other optimizations (like radix heaps or bucket-based queues) are possible.

Dijkstra’s algorithm is typically applied to graphs with **non-negative edge weights**—either integers or real numbers. It can also be generalized to graphs where the edge weights are **partially ordered**, as long as the labels produced when traversing edges are **monotonically non-decreasing**.

## FAQ

**Q.** Does Dijkstra's algorithm work with negative weights?

**A.** Yes and no. There are two shortest paths algorithms known as *Dijkstra's algorithm*, depending on whether a vertex can be enqueued on the priority queue more than once. 

When the weights are nonnegative, the two versions coincide (as no vertex will be enqueued more than once). The version which allows a vertex to be enqueued more than once is correct in the presence of negative edge weights (but no negative cycles) but its running time is exponential in the worst case. (implemented in [DijkstraSP.java](https://algs4.cs.princeton.edu/44sp/DijkstraSP.java.html))

If we modify Dijkstra's algorithm so that a vertex cannot be enqueued more than once (e.g., using a `marked[]` array to mark those vertices that have been relaxed), then the algorithm is guaranteed to run in $O(|E| \log |V|)$ time but it may yield incorrect results when there are edges with negative weights. 

## Edge-weighted digraphs and DAGs

Dijkstra's algorithm solves the **single-source shortest-paths problem** in edge-weighted digraphs with **nonnegative weights**using extra space proportional to $O(|V|)$ and time proportional to $O(|E| \log |V|)$ (in the worst case). proportional to E and time proportional to E log E (in the worst case).

- *Shortest paths in general edge-weighted digraphs.* We can solve shortest path problems if (i) all weights are nonnegative or (ii) there are no cycles.
	- A *negative cycle* is a directed cycle whose total weight (sum of the weights of its edges) is negative. The concept of a shortest path is meaningless if there is a negative cycle. Accordingly, we consider edge-weighted digraphs with no negative cycles.

<b>Proposition.</b> By relaxing vertices in [[Directed Acyclic Graphs and Topological Ordering|topological order]], we can solve the single-source shortest-paths and longest-paths problems for edge-weighted DAGs in time proportional to E + V.
	
- *Single-source shortest paths problem in edge-weighted DAGs.* We can use a variation of Dijkstra's algorithm for finding shortest paths more efficiently in edge-weighted DAGs.
	- It solves the single-source problem in linear time.
	- It handles negative edge weights.
	- It solves related problems, such as finding longest paths.
The algorithm combines vertex relaxation with topological sorting. We initialise `distTo[s]` to 0 and all other `distTo[]` values to infinity, then relax the vertices, one by one, taking the vertices in *topological order*. 


- *Single-source longest paths problem in edge-weighted DAGs.* We can solve the single-source longest paths problems in edge-weighted DAGs by initialising the `distTo[]` values to negative infinity and switching the sense of the inequality in `relax()`.



 We can solve shortest path problems if (i) all weights are nonnegative or (ii) there are no cycles.

## Algorithm

### Data structures for single-source shortest paths.

 Given an edge-weighted digraph and a designated vertex s, a *shortest-paths tree* (SPT) is a subgraph containing s and all the vertices reachable from s that forms a directed tree rooted at s such that every tree path is a shortest path in the digraph.

We represent the shortest paths with two vertex-indexed arrays:

- *Edges on the shortest-paths tree*: `edgeTo[v]` is the the last edge on a shortest path from s to v.
- *Distance to the source*: `distTo[v]` is the length of the shortest path from s to v.

![Shortest paths tree](https://algs4.cs.princeton.edu/44sp/images/spt.png)

### Relaxation

 Our shortest-paths implementations are based on an operation known as *relaxation*. We initialize `distTo[s]` to 0 and `distTo[v]` to infinity for all other vertices v.

- *Edge relaxation.* To relax an edge $v\to w$ means to test whether the best known way from $s$ to $w$ is to go from $s$ to $v$, then take the edge from $v$ to $w$, and, if so, update our data structures.

```java
private void relax(DirectedEdge e) {
    int v = e.from(), w = e.to();
    if (distTo[w] > distTo[v] + e.weight()) {
        distTo[w] = distTo[v] + e.weight();
        edgeTo[w] = e;
    }
}
```

Dijkstra's algorithm initializing $dist[s]$ to 0 and all other $distTo[]$ entries to positive infinity. Then, it repeatedly relaxes and adds to the tree a non-tree vertex with the lowest `distTo[]` value, continuing until all vertices are on the tree or no non-tree vertex has a finite `distTo[]` value.



## Dijkstra's Algorithm

Dijkstra's algorithm is [[Greedy Algorithms|greedy]] (and one that works), and as it progresses, it attempts to find the shortest path by choosing the best path from the available choices at each step.
- It depends on the invariant that once the vertex with the smallest current distance is removed from the queue, its shortest-path distance is final. 
- This property breaks for **non-negative edge weights**.


Implementation:
- Dijkstra's algorithm can be performed in a number of ways. One method is to use a priority queue instead of a queue (as in BFS), with the priorities as the total path length so far.
	- This method is virtually identical to BFS, but does require keeping track of all paths in the priority queue.
- A different form of Dijkstra's algorithm uses a table of nodes, and keeps track of how far away from the start each node is, updating by looking at neighbors of unseen nodes. It also keeps track of enough information to create the shortest path after the table is filled in.

Setup:
- Create a table of all nodes, with a *distance to the start* as one row. A second row will be called *previous*, which will annotate which node we were looking at when we updated the node's distance. A final row, *seen* starts out with all nodes as *Not Seen*, and gets updated after we analyze each node in turn. 

Algorithm:
1. Find the shortest distance to the start from the un-seen nodes.
2. Look at this node's neighbors, and update the total distance to the neighbors based on their distance and the distance already to this node.
3. If the node visited is the destination, stop
4. Repeat from step 1.

> [!example]+
> Here is an example graph, representing a map where we are trying to get from SJ (San Jose) to SF (San Francisco) and we have nodes A-G as potential different paths to take.
> 
> ![An example graph with SJ (San Jose) at the bottom, and SF (San Francisco) at the top. There are also nodes A-G|200](https://web.stanford.edu/class/archive/cs/cs106b/cs106b.1206/lectures/dijkstra/img/sj-to-sf-graph.png)
> 
> Here is the table we will update:
> 
> ```output
> 				 SJ   A    B    C    D    E    F    G    SF
> Distance to SJ   0    ∞    ∞    ∞    ∞    ∞    ∞    ∞    ∞
> Previous         -                                
> Seen?            N    N    N    N    N    N    N    N    N
> ```
> 
> - Notice:
> 	- All the distances to SJ are listed as infinity, except for the distance from SJ to itself, which is 0. We don't yet know the distance to SJ from the other nodes, because we haven't analyzed them yet (formally – we can see them in the graph, but for our table we haven't yet analyzed anything).
> 	- The *previous* row is empty
> 	- All nodes (including SJ) are listed as Not Seen (N).
> 
> - **Step 1:**
>     - Find the shortest distance to the start from the un-seen nodes: that would be SJ (it has a distance of 0, and all others have a distance of ∞).
>     - Look at SJ's neighbors, A and B. Both can be reached from SJ by their respective distances, and both are less than ∞. So we update the table, and then we mark SJ as visited. We also update *Previous* to show that we got to A and B directly from SJ:
> 
> ```output
>                  SJ   A    B    C    D    E    F    G    SF
> Distance to SJ   0    5    10   ∞    ∞    ∞    ∞    ∞    ∞
> Previous         -    SJ   SJ                            
> Seen?            Y    N    N    N    N    N    N    N    N
> ```
> 
> - **Step 2:**
>     - Find the shortest distance to the start from the un-seen nodes: now this is A.
>     - Look at A's neighbors, SJ, C, and E. SJ has been visited, so we ignore it. We update E to have a distance of `5 + 40` from SJ (because we have already gone 5 to get to A). We update C to be 205.
> 
> ```output
>                  SJ   A    B    C    D    E    F    G    SF
> Distance to SJ   0    5    10   205  ∞    45   ∞    ∞    ∞
> Previous         -    SJ   SJ   A         A                           
> Seen?            Y    Y    N    N    N    N    N    N    N
> ```
> 
> - **Step 3:**
>     - Find the shortest distance to the start from the un-seen nodes: now this is B.
>     - Look at B's neighbors, SJ, C, and G. We recognize that SJ-B-C is going to be shorter than SJ-A-C because `10 + 8 = 18` is shorter than `205`. So, we update C to have a distance of `18` and we modify its *Previous* to be from B. We update G to be 30.
> 
> ```output
>                  SJ   A    B    C    D    E    F    G    SF
> Distance to SJ   0    5    10   18   ∞    45   ∞    30   ∞
> Previous         -    SJ   SJ   B         A         B                 
> Seen?            Y    Y    Y    N    N    N    N    N    N
> ```
> 
> - **Step 4:**
>     - Find the shortest distance to the start from the un-seen nodes: now this is C.
>     - Look at C's neighbors, A, B, D, and G. We ignore A and B (already seen). We make D `18 + 13 = 31` and we see that we don't need to udpate G because `18 + 15 = 33` is greater than `30`.
> 
> ```output
>                  SJ   A    B    C    D    E    F    G    SF
> Distance to SJ   0    5    10   18   31   45   ∞    30   ∞
> Previous         -    SJ   SJ   B    C    A         B                 
> Seen?            Y    Y    Y    Y    N    N    N    N    N
> ```
> 
> - **Step 5:**
>     - Find the shortest distance to the start from the un-seen nodes: now this is G.
>     - Look at G's neighbors, B, C, D, F, and SF. We ignore B and C. We don't update D (already smaller than 36), we update F to be 32, and we update SF to be 48. We can't stop yet, even though we have reached SF! This is because we may have a shorter path.
> 
> ```output
>                  SJ   A    B    C    D    E    F    G    SF
> Distance to SJ   0    5    10   18   31   45   32   30   48 
> Previous         -    SJ   SJ   B    C    A    G    B    G            
> Seen?            Y    Y    Y    Y    N    N    N    Y    N
> ```
> 
> - **Step 6:**
>     - Find the shortest distance to the start from the un-seen nodes: now this is D.
>     - Look at D's neighbors, C, E, F, and G. We ignore C and G. We update E to be 32, because `31 + 1 = 32` and this is less than 45. We don't update F (already shorter than 36).
> 
> ```output
>                  SJ   A    B    C    D    E    F    G    SF
> Distance to SJ   0    5    10   18   31   32   32   30   48 
> Previous         -    SJ   SJ   B    C    D    G    B    G            
> Seen?            Y    Y    Y    Y    Y    N    N    Y    N
> ```
> 
> - **Step 7:**
>     - Find the shortest distance to the start from the un-seen nodes: now this is either E or F, and it doesn't matter which one we choose. Let's choose E.
>     - Look at E's neighbors, A, D, and F. We ignore A and D. We don't update F. Notice that we have to do less updating as we get further through the graph!
> 
> ```output
>                  SJ   A    B    C    D    E    F    G    SF
> Distance to SJ   0    5    10   18   31   32   32   30   48 
> Previous         -    SJ   SJ   B    C    D    G    B    G            
> Seen?            Y    Y    Y    Y    Y    Y    N    Y    N
> ```
> 
> - **Step 8:**
>     - Find the shortest distance to the start from the un-seen nodes: now this is F.
>     - Look at F's neighbors, D, E, G, and SF. We ignore D, E, and G. We update SF because `32 + 1 = 33` is less than `48`. So, we did need to update SF after all!
> 
> ```output
>                  SJ   A    B    C    D    E    F    G    SF
> Distance to SJ   0    5    10   18   31   32   32   30   33 
> Previous         -    SJ   SJ   B    C    D    G    B    F            
> Seen?            Y    Y    Y    Y    Y    Y    Y    Y    N
> ```
> 
> - **Step 9:**
>     - Find the shortest distance to the start from the un-seen nodes: now this is SF (it might not always be the last node, but happens to be so in this case).
>     - Because we are visiting the destination, we know that we have found the shortest path. We are done, and the shortest path is 33.
> 
> ```output
>                  SJ   A    B    C    D    E    F    G    SF
> Distance to SJ   0    5    10   18   31   32   32   30   33 
> Previous         -    SJ   SJ   B    C    D    G    B    F            
> Seen?            Y    Y    Y    Y    Y    Y    Y    Y    Y
> ```
> 
> - Now, to get the actual path, we simply follow the *Previous* nodes backwards from SF:
>     - SF's previous was F
>     - F's previous was G
>     - G's previous was B
>     - B's previous was SJ
> - Therefore, the shortest path is `SJ -> B -> G -> F -> SF` with a length of 33.
> 
> ![The shortest path from SJ to SF is SJ->B->G->F->SF|200](https://web.stanford.edu/class/archive/cs/cs106b/cs106b.1206/lectures/dijkstra/img/sj-to-sf-shortest.png)
> 


