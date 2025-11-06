# Breadth-First Search

## Shortest Paths in Unweighted Graphs

- The big idea is to do the search by path-length: first, look at the neighbors of the start and see if your destination is in one of those paths.
- If not, search one more level away – the neighbors of your neighbors.
- Continue with the neighbors-of-your-neighbors-neighbors until you eventually find a path

You will always find the shortest path in terms of *number of hops*, but this *does not* take into consideration the *weights* of the edges.

The BFS algorithm is exactly like it has been in the past for other types of searching: you enqueue the start node into a queue, then go into a `while` loop, dequeueing the first, checking for the destination, and then enqueue all neighbors.

For the graph below, a BFS from A to D simply gives us A-D as the path:

![The same graph as above, with the path from A-D as the shortest path|300](https://web.stanford.edu/class/archive/cs/cs106b/cs106b.1206/lectures/dijkstra/img/a-b-c-d-shortest.png)

Once we add weights, though, BFS no longer finds us our shortest *weighted* path: 

![The same graph as above, showing that the shortest path is actually A-B-C-D if weights are taken into consideration|400](https://web.stanford.edu/class/archive/cs/cs106b/cs106b.1206/lectures/dijkstra/img/a-b-c-d-weights-shortest.png)

<figcaption>The same graph as above, showing that the shortest path is actually A-B-C-D if weights are taken into consideration. BFS still gives us A-D as the path.</figcaption>