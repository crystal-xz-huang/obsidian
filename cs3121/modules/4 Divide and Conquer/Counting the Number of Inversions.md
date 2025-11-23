---
modules:
  - "[[Divide and Conquer]]"
tags:
  - topic/divide-and-conquer
  - topic/merge-sort
  - examples
---

# Counting the Number of Inversions

> [!Problem]
> Suppose that you have $m$ users ranking the same set of $n$ movies. You want to determine for any two users $A$ and $B$ how similar their tastes are (for example, in order to make a recommender system).  
> 
> How should we measure the degree of similarity of two users $A$ and $B$?

## How do we measure the difference?

**Question.** What’s a good way to measure the difference between $A$ and $B$’s rankings?  

There are lots of choices, some better than others.

One good measure of how different these two users are is the number of pairs of movies which are *out of order* between the two lists.

> [!idea]
> Find the pairs of different movies that are *not* matched between users A and B. 
> In other words, find the [[Permutations and Inversions|inversions]] such that user A prefers movie X but B prefers movie Y. 
> If there are few such pairs, then we say they are similar.

> [!Definition] 
> An **inversion** is a pair $(i, j)$ such that:  
> - ${\color{cyan}i < j}$, i.e. $B$ prefers $i$ to $j$, and  
> - ${\color{cyan}a(i) > a(j)}$, i.e. $A$ prefers $j$ to $i$.

We will measure the difference between the users by counting the total number of inversions.

## Setup

- Let’s *rank* (i.e. number) the movies according to a *metric*, say $B$’s ranking. 
- Assign index $1$ to user $B$’s favourite movie, index $2$ to their second favourite, and so on.  
- For each movie $i$, its rank in $A$’s list will be denoted by $a(i)$.
	- $a(3) \neq$ A's third favourite movie. 
	- $a(3)$ is what preferences does A have for B's third favourite movie.
- Somehow use the difference between each index $i$ (equal to $B$’s ranking) and value $a(i)$ (the ranking by $A$) to measure the difference between users $A$ and $B$.

> Inversions is a measure of similarity between two orderings (permutations).

> [!note]
> Basically we have two orderings of movies 1..n from A and B. If we re-order the values in A by its order in B then we get a single array `A[1..n]` where `A[1]` is user A's ranking of user B's i-th favourite movie: 
> 
> |Movies|1|2|3|4|5|
> |:--|:--|:--|:--|:--|:--|
> |B’s ranking|1|2|3|4|5|
> |A’s ranking $a(i)$|4|1|5|2|3|
> 
> - B's first favourite movie is ranked 4th by A
> - B’s 2nd favourite is ranked 1st by A, and so on.
> 
> Then the rankings in A are out of order w.r.t B rankings since instead of `1 2 3 4 5` we have `4 1 5 2 3`, so the **"correct order" is an increasing order of values in A**. 

![[counting_the_number_of_inversions_example.png]]


## How do we count the number of inversions?

**Naive Solution** 
A brute force algorithm to count the inversions is to test each pair $i < j$, and add one to the total if $a(i) > a(j)$. This produces a quadratic time algorithm, $T(n) = \Theta(n^2)$.

We now show that this can be done more efficiently, in time $O(n \log n)$, by applying a divide-and-conquer strategy.

Clearly, since the total number of pairs is quadratic in $n$, we cannot afford to count the inversions one-by-one. 

**Divide and Conquer** 
The main idea is to tweak the [[modules/4 Divide and Conquer/Merge Sort]] algorithm, by extending it to recursively both sort an array $A$ and determine the number of inversions in $A$.


## Algorithm (adapting merge-sort to count inversions)

**Algorithm (adapting mergesort to count inversions):**  

![[counting-the-number-of-inversion-mergesort.png]]
We split the array $A$ into two (approximately) equal parts 

> $\large {\color{cyan}A_{\text{lo}} = A[1..m]}$ and $\large {\color{pink}A_{\text{hi}} = A[m + 1..n]}$, where $\large m = \lfloor n/2 \rfloor$

Note that the total number of inversions in $A$ is the sum of:  
- the number of inversions $I(A_{\text{lo}})$ in $A_{\text{lo}}$ (such as 9 and 7),  
- the number of inversions $I(A_{\text{hi}})$ in $A_{\text{hi}}$ (such as 4 and 2), and  
- the number of inversions $I(A_{\text{lo}}, A_{\text{hi}})$ across the two halves (such as 7 and 4).

We have
$$
I(A) = I(A_{\text{lo}}) + I(A_{\text{hi}}) + I(A_{\text{lo}}, A_{\text{hi}})
$$

The first two terms of the right-hand side are the number of inversions within $A_{\text{lo}}$ and within $A_{\text{hi}}$, which can be calculated recursively.

The main challenge is to evaluate the last term, which requires us to count the inversions which cross the partition between the two sub-arrays.

**The idea is to not only count inversions across the partition, but also sort the array**. 
We can then assume that the subarrays $A_{\text{lo}}$ and $A_{\text{hi}}$ are sorted in the process of counting $I(A_{\text{lo}})$ and $I(A_{\text{hi}})$. 

We proceed to count $I(A_{\text{lo}}, A_{\text{hi}})$ (specifically, counting each inversion according to the smallest of its elements) and simultaneously merge as in merge sort.

In the merge step, each time we add an element of $A_{\text{hi}}$ to $A$, we have inversions between this number and each of the remaining elements in $A_{\text{lo}}$. We therefore add the number of elements remaining in $A_{\text{lo}}$ to the answer.

On the other hand, when we add an element of $A_{\text{lo}}$ to $A$, all inversions involving this number have already been counted. We have therefore counted the number of inversions within each subarray ($I(A_{\text{lo}})$ and $I(A_{\text{hi}})$) recursively as well as the number of inversions across the partition ($I(A_{\text{lo}}, A_{\text{hi}})$), and adding these gives $I(A)$ as required.

**Time complexity.** Our modified merge still takes linear time, so this algorithm has the same complexity as merge sort, i.e. $\Theta(n \log n)$.

![[counting-the-number-of-inversion-mergesort-2.png]]