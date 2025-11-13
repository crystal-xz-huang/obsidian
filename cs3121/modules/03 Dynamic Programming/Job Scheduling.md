---
modules:
  - "[[mocs/Modules/Dynamic Programming|Module 3: Dynamic Programming]]"
tags:
  - topic/dynamic-programming
  - examples
categories:
  - "[[Shortest Path Problem]]"
---

_Critical path method._ We consider the parallel precedence-constrained job scheduling problem: Given a set of jobs of specified duration to be completed, with precedence constraints that specify that certain jobs have to be completed before certain other jobs are begun, how can we schedule the jobs on identical processors (as many as needed) such that they are all completed in the minimum amount of time while still respecting the constraints?

![Job-scheduling solution](https://algs4.cs.princeton.edu/44sp/images/scheduling-solution.png)


This problem can be solved by formulating it as a longest paths problem in an edge-weighted DAG: Create an edge-weighted DAG with a source s, a sink t, and two vertices for each job (a start vertex and an end vertex). For each job, add an edge from its start vertex to its end vertex with weight equal to its duration. For each precedence constraint v->w, add a zero-weight edge from the end vertex corresponding to v to the beginning vertex corresponding to w. Also add zero-weight edges from the source to each job's start vertex and from each job's end vertex to the sink.

![Job-scheduling problem reduction to longest paths](https://algs4.cs.princeton.edu/44sp/images/scheduling-reduction.png)

Now, schedule each job at the time given by the length of its longest path from the source.

![Job-scheduling problem critical path](https://algs4.cs.princeton.edu/44sp/images/scheduling-critical-path.png)


- [Shortest Paths](https://algs4.cs.princeton.edu/44sp/)