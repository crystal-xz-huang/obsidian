---
modules:
  - "[[mocs/Modules/Dynamic Programming|Module 3: Dynamic Programming]]"
categories:
  - "[[Knapsack Problem]]"
tags:
  - source/lecture
  - topic/dynamic-programming
  - topic/optimization
  - type/problem
---
# Balanced Partition

## Problem

> [!problem]
> <b>Instance</b>: a set of $n$ positive integers $x_1,\dots, x_n$.
> 
> <b>Task</b>: partition these integers into two subsets $A$ and $B$ with sums $S_A$ and $S_B$ respectively, so as to minimise $\lvert S_A - S_B \rvert$.

Note: Reduce this problem to the [[0-1 Knapsack]] problem.

## Solution

- Suppose without loss of generality that $S_A \ge S_B$.  
- Let $T = x_1 + x_2 + \ldots + x_n$, the total of all integers in the set.
- Since every number belongs to one of the two sets, we have $S_A = T - S_B$, and substituting into the objective gives
$$
S_A - S_B = T - 2S_B
$$

- Since $T$ is out of our control, we should make set $B$ with sum as large as possible, without exceeding $T/2$.
- For each integer $x_i$ in the set, construct an item with both weight and value equal to $x_i$.
- Consider the 0-1 Knapsack problem, with items as specified above and knapsack capacity $T/2$.

> [!solution] Solution  
> The best packing of this knapsack produces an optimally balanced partition, with set $A$ given by the items <b>outside</b> the knapsack and set $B$ given by the items <b>inside</b> the knapsack.

> [!time] Running time  
> We have <u>reduced</u> Balanced Partition to [[0-1 Knapsack]] in $O(n)$ time.  
> The overall running time is $O(nT)$.


## Explanation

First, all numbers must go in either $A$ or $B$, so their total sum is equivalent to the sum of all numbers which is a fixed constant:
$$T = S_A + S_B.$$

Rearranging $S_A$ in terms of $S_B$ we have 
$$S_A = T-S_B.$$

Substituting that in $\lvert S_A - S_B \rvert$ we get
$$|S_A - S_B| = T- S_B - S_B| = |T-2S_B|.$$

The goal to minimise $\lvert S_A - S_B \rvert$ then becomes to minimise $\lvert T-2S_B \rvert$.

To minimise $\lvert T-2S_B \rvert$, we want it close to 0 as possible, so we want to make $2S_B$ as large as possible without exceeding $T$ ($S_B \leq T$), which is same as making  $S_B$ as large as possible such that $S_B \leq T/2$. 

Therefore we want to find a subset $B$ whose sum $S_B$ as large as possible without exceeding $T/2$.

> [!aside]
> Adding this constraint, the problem of "finding a subset whose sum is closest to half the total sum **without going over**" then becomes an instance of the [[making change]] problem (in which all items have the same contribution to the total sum).

<b>Goal:</b> Find a subset $S_B$ whose $S_B$ is as large as possible without exceeding $T/2$.

There are two objectives:
- find a subset with sum $S \leq T/2$, and
- maximise the sum $S$ in such a subset.

This is equivalent [[0-1 knapsack]]:
- each number can only be included once 
- each number has a weight and value (how much it contributes to the total sum), 
  both equal to the number itself
- knapsack capacity = half the total sum = T/2

Therefore, we can reduce this problem to the [[0-1 knapsack]] problem where the items inside the knapsack are the numbers in $S_B$ and the items outside the knapsack (i.e. the complement of $S_B$) are the numbers in $S_A$.


