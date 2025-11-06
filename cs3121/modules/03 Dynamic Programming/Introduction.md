---
modules:
  - "[[mocs/Modules/Dynamic Programming|Module 3: Dynamic Programming]]"
tags:
  - source/lecture
  - type/concept
  - topic/dynamic-programming
---
## Introduction to Dynamic Programming

### What is dynamic programming?

The main idea is to solve a large problem recursively by building it from (carefully chosen) subproblems of smaller size.

#status/draft 

> [!caution]
> These properties are not properties of the problem statement, but properties of the solution itself!!

> [!bookmark] Substructure property
> We must **choose subproblems** so that answers to smaller subproblems (child instances) can be combined to answer a larger subproblem (parent instance).

> [!bookmark] Overlapping subproblems property
> We choose subproblems so that 
> 
> <center>the same subproblem occurs several times in the recursion tree.</center>
> 
> When we solve a subproblem, we **store the result** so that subsequent instances of the same subproblem can be answered by just looking up a value in a table.

---

> [!question]
> Why is dynamic programming useful?
> 
> > [!answer]
> > - Recently we discussed greedy algorithms, where the problem is viewed as a sequence of stages and we consider <u>only</u> the locally optimal choice at each stage.
> > - We saw that some greedy algorithms are incorrect, i.e., they fail to construct a globally optimal solution.
> > - Also, greedy algorithms are unhelpful for certain types of problems, such as enumeration (“count the number of ways to …”).
> > - Dynamic programming can be used to consider <u>all</u> the options at each stage <u>without</u> repeating work; “efficient brute force”.

> [!question]
> Why is dynamic programming efficient?
> 
> > [!answer]
> > - We will soon see another problem-solving paradigm that uses recursion: divide-and-conquer.
> > - D&C aims to break a large problem into **disjoint** subproblems, solve those subproblems recursively and recombine.
> > 	- Examples include binary search and mergesort.
> > - However, DP is characterised by **overlapping subproblems**.

> [!NOTE] Greedy vs DP
> The efficiency of greedy comes from aggressively pruning out the search space: prune the search space so that out of all the options, we can just explore the greedy choice. 
> 
> Dynamic programming is the opposite of greedy; we try all the options but doing so in a way that doesn't repeat the work that follows ⇒ explores all options in a more efficient way than bruteforce

---


#### The structure of a dynamic programming algorithm

A dynamic programming algorithm consists of three parts: 
1. a definition of the **subproblems**;
2. a **recurrence relation**, which determines how the solutions to smaller subproblems are combined to solve a larger subproblem, and
3. any **base cases**, which are the trivial subproblems - those for which the recurrence is not required.

#### Executing a dynamic programming algorithm

We will talk about dynamic programming algorithms in an **iterative (bottom-up)** sense:

- start with the base cases - the “smallest” subproblems, then
- gradually solve increasingly “larger” subproblems using the recurrence.

Answers to subproblems will be stored in a lookup table (usually an array indexed by the parameters of the subproblem).

When you implement dynamic programming algorithms using a programming language, you can consider **recursive (top-down)** implementation as an alternative.  

> [!abstract]
> Putting it all together:
> 
> - We need to solve the subproblems in an <u>order</u> that respects the dependencies; more on this later.
> - The original problem may be one of our subproblems, or it may be solved by combining results from several subproblems, in which case we must also describe this process.
> - Finally, we should be aware of the time complexity of our algorithm, which is usually given by multiplying the <u>number of subproblems</u> by the <u>‘average’ time taken to solve a subproblem using the recurrence</u>.
> 

#### Correctness

To justify the correctness of a dynamic programming algorithm, we need to provide a brief justification that

- the recurrence correctly relates subproblems to each other,
- the base cases have been correctly solved (usually straightforward)
- the overall answer has been correctly solved (often straightforward).

#### How to develop dynamic programming algorithms

- Choose an order to build up the solution.
- Pick a tentative subproblem specification, starting with just enough parameters to answer the overall problem.
	- e.g., if you need to output the best value using up to k items, then number of items taken so far should be a parameter.
- Try to make a recurrence between these subproblems.
	- If you can’t determine which transitions are allowed using only these parameters, try adding more, and repeat until it stabilises.
	- Solve the necessary base cases (usually easy). 
- Analyse time complexity.
	- Removing unnecessary parameters may reduce the number of subproblems.
	- Use of data structures may speed up the recurrence.

---
