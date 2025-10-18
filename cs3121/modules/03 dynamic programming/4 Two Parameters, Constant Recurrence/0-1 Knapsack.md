---
aliases: [0-1 Knapsack]
---
# 0-1 Knapsack

## Problem

> [!problem]
> <b>Instance</b>: You have $n$ items, the $i$th of which has weight $w_i$ and value $v_i$ . 
> All weights are **integers**. You also have a knapsack of capacity $C$.
> 
> You can take each item only **at most once**.
> 
> <b>Task</b>: Choose a combination of available items which all fit in the knapsack and whose value is as large as possible.

## Developing the Solution

Let’s try to use the same subproblems as in the [[Integer Knapsack|unbounded knapsack case]] and develop a recurrence.

#### Issue

The underlying issue is that with this choice of subproblems, this problem does not have the ==optimal substructure property==.

When we are unable to form a correct recurrence between our chosen subproblems, this usually indicates that the subproblem specification is inadequate.

##### Issue 1

> [!question]
> If we know the optimal solution for each total weight $j < i$, can we deduce the optimal solution for weight $i$?
> 

> [!answer]
> No! If we begin our solution for weight $i$ with item $k$, we have $i - w_k$ remaining weight to fill.  
> However, we did **not** record whether item $k$ was itself used in the optimal solution for that weight.

##### Issue 2

> [!question]
> Could we reconstruct the optimal solution for total weight $i- w_k$ by storing the values $m(i)$ as we did earlier, and then backtrack?

> [!answer]
> We might think to store the values $m(i)$ as before and backtrack, but this has two flaws:
> 
> 1. The optimal solution for $i - w_k$ is **not necessarily unique**, so we may have recorded a selection including item $k$ when another equally optimal selection without $k$ exists.
> 
> 2. Even if all optimal solutions for $i - w_k$ use item $k$, it’s possible that the best solution for $i$ combines item $k$ with some **suboptimal** solution for $i - w_k$.

## Solution

#### Structure

Let:
- $\text{opt}(i, k)$ = maximum total value achievable using up to $i$ units of weight and using only items among the first $k$ items.  
- $\text{m}(i, k)$ = index of an item in such an optimal collection.
- **Case 1:** Item $k$ **is included** in the optimal solution.
    - remaining capacity = $i - w_k$
    - must fill the remaining capacity using only the first $k - 1$ items
    - total value = $v_k + \text{opt}(i - w_k, k - 1)$
- **Case 2:** Item $k$ **is not included** in the optimal solution.
    - all $i$ units of weight must be filled using only the first $k - 1$ items
    - total value = $\text{opt}(i, k - 1)$

$$
\text{opt}(i, k) =
\begin{cases}
\max\!\big( v_k + \text{opt}(i - w_k, k - 1),\; \text{opt}(i, k - 1) \big), & \text{if } w_k \le i, \\[6pt]
\text{opt}(i, k - 1), & \text{if } w_k > i.
\end{cases}
$$

$$
m(i, k) =
\begin{cases}
k, & \text{if } v_k + \text{opt}(i - w_k, k - 1) \ge \text{opt}(i, k - 1), \\[6pt]
m(i, k - 1), & \text{otherwise.}
\end{cases}
$$

#### Subproblems

> [!NOTE]
> We would like to know the optimal solution for each weight **without using item $k$**.  
> Adding this information directly to the subproblem is not convenient.  
> Instead, we can capture it indirectly.
> 
> For each total weight $i$, we find the optimal solution using **only** the first $k$ items.
> 
> We can take cases on whether item $k$ is used in the solution:
> 
> - If item $k$ *is used*, we have $i - w_k$ remaining weight to fill using the first $k-1$ items.
> - Otherwise, we fill all $i$ units of weight using the first $k-1$ items.

For $0 \le i \le C$ and $0 \le k \le n$, let:

- $\text{opt}(i, k)$ be the **maximum value** achievable using up to $i$ units of weight <u>and</u> only the first $k$ items.  
- $m(i, k)$ be the **(largest) index of an item** in such an optimal collection.

#### Recurrence

For $i > 0$ and $1 \le k \le n$:

$$
\text{opt}(i, k) =
\max \Big[
  v_k + \text{opt}(i - w_k, k - 1),\;
  \text{opt}(i, k - 1)
\Big]
$$

and

$$
m(i, k) =
\begin{cases}
k, & \text{if } v_k + \text{opt}(i - w_k, k - 1) \ge \text{opt}(i, k - 1), \\[4pt]
m(i, k - 1), & \text{otherwise.}
\end{cases}
$$

#### Base cases

If $i = 0$ or $k = 0$, then:

$$
\text{opt}(i, k) = 0 \quad \text{and} \quad m(i, k) = 0.
$$

> Setting $m(i, k) = 0$ uses a **dummy value** to record that no item was taken.

#### Order of Computation

When we get to $(i, k)$, the recurrence requires us to have already found $\text{opt}(i, k - 1)$ and $\text{opt}(i - w_k, k - 1)$.

This dependency is satisfied if we solve subproblems in **increasing order of $k$**  
(for each $k$, iterate over all $i$ in any order).

#### Overall answer

$\text{opt}(C, n)$

which gives the maximum total value achievable with capacity $C$ and all $n$ items.

#### Time complexity

There are $O(nC)$ subproblems, each taking $O(1)$ time to compute, for a total running time of **$O(nC)$** — again **pseudopolynomial**.
