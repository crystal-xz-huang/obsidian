---
modules:
  - "[[mocs/Modules/Dynamic Programming|Module 3: Dynamic Programming]]"
categories:
  - "[[Knapsack Problem]]"
tags:
  - source/lecture
  - type/problem
  - topic/dynamic-programming
aliases:
  - Unbounded knapsack
---
# Integer Knapsack - unbounded

## Problem

> [!problem]
> <b>Instance</b>: You have $n$ items, the $i$th of which has weight $w_i$ and value $v_i$. All weights are <u>integers</u>. You also have a knapsack of capacity $C$.
> 
> You can take each item <u>any (integer) number of times</u> (unbounded).
> 
> <b>Task</b>: Choose a combination of available items which all fit in the knapsack and whose value is as large as possible.

<b>Recurrence:</b> 
One Parameter, Linear Recurrence

<b>Notes:</b>
The optimal substructure is identical to the [[Making Change]] problem; only the operation changes from <b>minimisation</b> (minimise the total number) to <b>maximisation</b> (maximise the total value). Therefore the optimal substructure is also identical.

This is the unbounded knapsack problem; the only difference from the [[0-1 Knapsack|0-1 knapsack]] is that an item can be selected an unlimited number of times instead of only once.

## Solution

> [!idea] Optimal Substructure Property
> An optimal solution for capacity $i$ can be obtained by **adding one item** $k$ of weight $w_k$ to an <b>optimal solution</b> for the **smaller capacity** $i-w_k$.  

> [!summary]
> - Define $\operatorname{opt}(i)$ to be the value of the optimal solution for capacity $i$. In other words:
>   ==$\operatorname{opt}(i)$ is the value of the best collection of items with at most $i$ units of weight.==
> - The set of subproblems is $\{ \operatorname{opt}(i) : 0 \leq i \leq C \}$.
> - For each $i = 0, 1, \ldots, C$, the optimal solution for capacity $i$ is obtained by:
> 	- choosing one item $k \in \{ 1 \ldots n \}$ of weight $w_k \leq i$, and 
> 	- adding its value $v_k$ to the optimal solution for the remaining weight $(i-w_k)$, and
> 	- taking the best of all possible solutions.
> - Each subproblem considers $O(n)$ items and among all items that fit within in the knapsack ($w_k \leq i$), it picks the one that gives the largest total value. 
> - There are $O(C)$ subproblems, each taking $O(n)$ time. Thus the algorithm runs in pseudo-polynomial $O(n C)$ time. 

> [!solution] 
> <b>Subproblems:</b>
> For each capacity $0 \le i \le C$, let:
> 
> - $\text{opt}(i)$ = the maximum value that can be achieved using <u>at most</u> $i$ units of weight, and
> - $m(i)$ = the index of an item included in such a collection that achieved this max value.
> 
> <b>One Parameter Recurrence:</b>
> For each total weight $i > 0$, take any  item that fits and add it to the previous knapsack of capacity $(i - w_k)$. The optimal value is from the collection with the largest total value:
> 
> $$\bbox[10px, border: 1px solid black]{
> \operatorname{opt}(i) = \max_{\substack{1 \le k \le n \\[2pt] w_k \le i}} 
> \big[\, v_k + \operatorname{opt}(i - w_k) \,\big]
> }$$
> 
> Record the index of the item used to achieve the best value:
> 
> $$\bbox[10px, border: 1px solid black]{%
>   m(i)=\operatorname*{arg\,max}_{\substack{1 \le k \le n \\[2pt] w_k \le i}}
>   \big[\, v_k + \operatorname{opt}(i - w_k) \,\big]
> }$$
> 
> This allows us to reconstruct the optimal solution at capacity $i$ by backtracking: look up the item at $m(i)$, add it to the collection, subtract its weight from $i$ and repeat for the remaining weight $(i - w_k)$ until we hit zero.
> 
> <b>Base cases:</b> 
> If the minimum weight of all items is no less than the current capacity, then no items can fit and the knapsack is empty.
> 
> $$
> \text{if } i < \min_{\substack{1 \le k \le n}} w_k, \; \text{then} \; \text{opt}(i) = 0 \; \text{and} \; m(i) = 0.
> $$
> 
> > Setting $m(i) = 0$ employs a dummy value to record that no item was taken.
> 
> <b>Order of computation:</b>
> Solve subproblems as pairs of $\operatorname{opt}(i)$ and $\operatorname{m(i)}$ in increasing order of $i$.
> 
> <b>Final answer:</b>
> $\operatorname{opt}(C)$, as the knapsack can hold up to $C$ units of weight.
> 
> <b>Time complexity:</b>
> The set of subproblems is $\{ \operatorname{opt}(i) : 0 \leq i \leq C \}$, giving a total of $O(C)$ subproblems, each taking $O(n)$ time to solve. Thus the algorithm runs in **pseudo-polynomial** $O(n C)$ time. 


## Developing the solution

Same as the making change problem, we will try find the optimal solution for every knapsack capacity up to $C$. 

- Each subproblem will solve for all possible total weights of up to C $(i \leq C)$ 
- Assume we have solved the problem for all total weights $j < i$.
- We now consider each item, the $k$th of which has weight $w_k$. 
  If this item is included, we would have $i − w_k$ weight to fill.
- The best packing using item $k$ is:
	- one of item $k$, plus
	- the best packing of weight $i − w_k$ (an earlier subproblem).
- We should consider all items $k$ in this way, and pick the one that gives the largest total value.

##### Step 1: Identify some optimal substructure

> [!idea] Optimal Substructure Property
> An optimal solution for capacity $i$ can be obtained by **adding one item** $k$ of weight $w_k$ to an <b>optimal solution</b> for the **smaller capacity** $i-w_k$.  

The idea is if the optimal solution to the knapsack problem with capacity $C$ includes an item $k,$ then removing that item gives an optimal solution to the problem for capacity $C' = C-w_k$. 

- Suppose $A$ is an optimal solution with weight $i \leq C$ to the original problem for capacity $C$.
- If $A$ includes one of  item $k$, then $A' = A \setminus \{ k \}$ is an optimal solution to the knapsack problem of capacity $(i - w_k)$.
- Formally, we can prove this by contradiction—if there was a more optimal knapsack solution for capacity $(i - w_k)$ without one of item $k$, we could use it improve our solution. [^1]

[^1]: That is, we can add one of item $k$ to this other solution to obtain a better collection of items for the knapsack problem with capacity $C$ that has a total weight $\leq C$ (valid) and has a greater value than our original solution $A$ (optimal)—contradicting our assumption that $A$ is an optimal solution!


##### Step 2: Defining our subproblems

Because each input item can be taken more than once, we do not need to keep track of which items are used. We can instead consider subproblems for every capacity up to $C$. 

> [!function] Subproblem Definition
> For each $0 \le i \le C,$ define 
> 
> $$\operatorname{opt}(i) = \text{the maximum value achievable using items of at most } i \text{ units of weight.}$$
> 
> Notes:
> - The capacity $i$ represents a total weight limit of at most $C$.
> - All $n$ items are available for each subproblem.
> - Since items are unbounded (may be included more than once), we do not need to track which items are included. 

##### Step 3: Deriving a recurrence

Now we have the set of subproblems for each capacity up to $C$ (so a total of $C$ subproblems).

We can use the optimal substructure to identify the relationship between subproblems:

> [!NOTE|no-title]
> The optimal solution for the knapsack problem with capacity $i$:
> 
> - includes one of item $k$ that fits in the knapsack, plus
> - the optimal solution to an earlier subproblem for the remaining weight $i - w_k$. 

If item $k$ doesn't fit in the knapsack ($i-w_k \ge 0$) then we can't choose it. Therefore:

> [!NOTE|no-title]
> Each subproblem should consider all items $\{0 \ldots n\}$ and:
> - among all item that fit the current capacity $w_k \leq i$, 
> - pick the one that gives the largest total value to add the optimal solution. 

To reconstruct the optimal solution for capacity $i$, each subproblem records the index $k$ of the item included to obtain the best value in such a collection. 

Then after we filled the table, we reconstruct the optimal solution by backtracking: look up the item at $m(i)$, add it to the collection, subtract its weight from $i$ and repeat for the remaining weight $(i - w_k)$. 


This gives the recurrence:

$$
\operatorname{opt}(i) = \max_{\substack{1 \le k \le n \\[2pt] w_k \le i}} 
\big[\, v_k + \operatorname{opt}(i - w_k) \,\big]
$$

$$
m(i)=\operatorname*{arg\,max}_{\substack{1 \le k \le n \\[2pt] w_k \le i}}
\big[\, v_k + \operatorname{opt}(i - w_k) \,\big]
$$

Finally, we need some base case(s). If no items have a weight less than current capacity $i$, then no items can fit in the knapsack so we are forced to chose no items. In this case, we set $m(i) = 0$ to record that no item was taken and the value of an empty knapsack is $\operatorname{opt}(i) = 0$.

Putting this altogether:

> [!solution]
> <b>Subproblems:</b>
> 
> For each $0 \le i \le C$, let:
> - $\text{opt}(i)$ be the maximum value that can be achieved using <u>up to</u> $i$ units of weight  
> - $m(i)$ be the index of an item included in such a collection.
> 
> <b>Recurrence:</b>
> 
> For $i > 0$:
> 
> $$
> \text{opt}(i) = \max_{\substack{1 \le k \le n \\[2pt] w_k \le i}} 
> \big[\, v_k + \text{opt}(i - w_k) \,\big]
> $$
> 
> $$
> m(i) = \operatorname*{arg\,max}_{\substack{1 \le k \le n \\[2pt] w_k \le i}} 
> \big[\, v_k + \text{opt}(i - w_k) \,\big].
> $$
> 
> <b>Base case:</b>
> 
> If $\displaystyle i < \min_{\substack{1 \le k \le n}} w_k$, then
> 
> $$
> \text{opt}(i) = 0 \quad \text{and} \quad m(i) = 0.
> $$
> 
> > Setting $m(i) = 0$ employs a dummy value to record that no item was taken.
> 
> <b>Order of computation:</b>
> 
> Solve subproblems (pairs of $\text{opt}(i)$ and $m(i)$) in increasing order of $i$.
> 
> <b>Final answer:</b>
> 
> $\text{opt}(C)$ since the knapsack can hold <u>up to</u> $C$ units of weight.
> 
> <b>Time complexity:</b>
> 
> There are $O(C)$ subproblems, each taking $O(n)$ time, for a total time complexity of $O(nC)$; this is **pseudopolynomial**.
