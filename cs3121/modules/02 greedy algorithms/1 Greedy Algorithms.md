---
aliases:
  - Greedy Algorithms
---
# Greedy Algorithms

---

## Overview

1. Motivation  
2. Optimal Selection  
	- Activity selection  
	- Cell tower placement  
3. Optimal Ordering  
	- Tape storage  
	- Minimising job lateness  
4. Optimal Merging  
	- The Huffman Code  
5. Applications to graphs  
	- Directed graph structure  
	- Single source shortest paths  
	- Minimum spanning trees  

---

> [!cite] Introduction to Algorithms – 
> Algorithms for optimization problems typically go through a sequence of steps, with a set of choices at each step. For many optimization problems, using dynnamic programming to determine the best choices is overkill, and simpler, more efficient algorithms will do. A greedy algorithm always makes the choice that looks best at the moment. That is, it makes a locally optimal choice in the hope that this choice leads to a globally optimal solution.

A greedy algorithm is an algorithm that solves a problem by always selecting the best possible choice at *each* moment (step), with no regard for the future consequences of that decision.

Once a choice is made, it is never changed. This means that the best choice at *any* given moment contributes directly to the overall optimal solution. 

For this reason, greedy algorithms are usually very fast and efficient. However, this same property also means that greedy algorithms do not always guarantee the best possible solution in every case.

- **Locally optimal choices:** At each step, the algorithm chooses the option that looks the best at the moment, without considering the long-term consequences. This means it may not be the optimal choice for the long term. 
- **No backtracking:** Unlike algorithms that use backtracking or dynamic programming, greedy algorithms do not revisit past decisions or adjust their approach based on future possibilities. Once a choice is made, it is never reconsidered. This makes greedy algorithms fast and efficient, often running in linear or logarithmic time, depending on the problem.
- **Efficiency:** Since greedy algorithms directly construct an answer, greedy algorithms are generally more efficient. It does not try every possible combination in order to find the most optimal outcome. (This is known as complete search or brute force.)

==Greedy algorithms work on some problems in P, but they do not work on NP-hard problems.==

Implementation of greedy algorithms is usually more straighforward and more efficient, but _proving_ a greedy strategy produces optimal results requires additional work

> [!question] 
> What is a greedy algorithm?
> > [!answer]
> > A greedy algorithm is one that solves a problem by dividing it into stages, and rather than exhaustively searching all the ways to get from one stage to the next, instead only considers the choice that appears best.  
> > 
> > This obviously reduces the search space, but it is not always clear whether the locally optimal choice leads to the globally optimal outcome.  
> > 
> 

> [!Question]
> Are greedy algorithms always correct?
> 
> > [!Answer]
> > No!  
> > 
> > Suppose you are searching for the highest point in a mountain range. If you always climb upwards from the current point in the steepest possible direction, you will find a peak, but not necessarily the highest point overall.  
> 

> [!question]
> Is there a framework to decide whether a problem can be solved using a greedy algorithm?  
> 
> > [!answer]
> > Yes, but we won’t use it.  
> > 
> > The study of **matroids** is covered in COMP3821/9801.  
> > We will instead prove the correctness of greedy algorithms on a problem-by-problem basis.  
> > With experience, you will develop an intuition for whether greedy algorithms are useful for a particular problem.  

## Correctness Proofs

Many greedy algorithms are relatively simple to describe.  

The trade-off is that they by definition don’t consider all of the possibilities.  
This leaves some work to do in analysing correctness.  

**Key question:**  
Why did you not need to consider those other possibilities?  
Equivalently, why were the possibilities you considered no worse than the others?  

> [!question]
> How do we prove that a greedy algorithm is correct?  
> 
> > [!answer]
> > There are two main methods of proof:  
> > 
> > 1. **Greedy stays ahead**: prove that at every stage, no other sequence of choices could do better than our proposed algorithm.  
> > 2. **Exchange argument**: consider an alternative solution, and gradually transform it to the solution found by our proposed algorithm without making it any worse.  
> > 
> > These are reminiscent of induction and contradiction respectively.  
> > 
> 

<b>Further Readings</b>
- [[Guidelines for Proving Correctness of Greedy Algorithms via Greedy Stays Ahead.pdf]]
- [[Guidelines for Proving Correctness of Greedy Algorithms via an Exchange Argument.pdf]]


## Designing a Greedy Algorithm

Listing the Possible Choices

To design a proper greedy algorithm, we need to first think of the possible choices that may work. Specifically, the decision we need to make at each step is to select $\_$.


---

[[1.1 The Knapsack Problem]]
[[2.1 Activity Selection]]
[[2.2 Cell Tower Placement]]
[[3.1 Tape Storage]]
[[3.2 Minimize Lateness]]

