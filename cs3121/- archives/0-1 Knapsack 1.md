---
aliases:
  - "Dynamic Programming: 0-1 Knapsack"
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

# 0-1 Knapsack

> Include items that fit within a weight-capacity to maximise the total value
> Two Parameters, Constant Recurrence 

This is similar to [[Unbounded Integer Knapsack]] but we can only take each item once.
In other words, we are "bounded" by the number of items we can include.

## Problem Statement

> [!problem]
> <b>Instance</b>: You have $n$ items, the $i$th of which has weight $w_i$ and value $v_i$ . 
> All weights are **integers**. You also have a knapsack of capacity $C$.
> 
> You can take each item only **at most once**.
> 
> <b>Task</b>: Choose a combination of available items which all fit in the knapsack and whose value is as large as possible.

In the example above, each object has only two possible states (taken or not taken), corresponding to binary 0 and 1. Thus, this type of problem is called "0-1 knapsack problem".

## Explanation



#### The optimal substructure

> The optimal solution for capacity $i$ and first $k$ items depends on the optimal solutions to smaller subproblems that ==do not include item $k$==. 

Let $\text{opt}(i, k)$ be the maximum total value the knapsack can carry with capacity $i$ and considering only the first $k$ items.

Assuming that all states of the first $k-1$ items have been processed, what are the options for the $k$th item?

- **If the item is not included:** When the $k^{\text{th}}$ item is not put into the knapsack, 
	- The remaining capacity remains unchanged and total value does not change. 
	- The maximum value in this case is $\operatorname{opt}(i,k-1)$.
- **If the item is included:** When the $k^{\text{th}}$ item is put into the knapsack, 
	- The remaining capacity decreases by $w_k$ and the total value increases by $v_k$.
	- The maximum value in this case is $\operatorname{opt}(i-w_k,k-1) + v_k$.

From this we can derive the 2D recurrence:

$$
\operatorname{opt}(i,k) = \max\big[ \operatorname{opt}(i,k-1),\; \operatorname{opt}(i-w_k,k-1) + v_k \,\big]
$$

which should be executed in ==increasing order of $k$== (and any order of $i$).

The base cases occur at $i=0$ (zero capacity) and $k=0$ (zero items) with $\operatorname{opt}(i,k) = 0$.

> [!aside]
> Further, since each state $\operatorname{opt}(i,k)$ is only dependent on states from the **previous item** $(k-1)$, we can remove the second dimension. This gives us the 1D transition rule:
> 
> $$
> \operatorname{opt}(i) \gets \max\big[\operatorname{opt}(i), \; \operatorname{opt}(i-w_k) + v_k \,\big]
> $$
> 
> which should be executed in decreasing order of $i$ (so that $\operatorname{opt}(i-w_k)$ implicitly corresponds to the previous item’s state $\operatorname{opt}(i-w_k,k-1)$ and not the current item’s state $\operatorname{opt}(i-w_k,k)$).

## Explanation

#### Step 1: The optimal substructure

The optimal solution for capacity $C$ and items $S = \{ 1, 2, \dots, k \}$ can be obtained by adding one item $k$ to the optimal solution with the smaller capacity $C' = C - w_k$ on the set of items not including $k$, i.e., $S' = S \setminus \{ k \}$ !

#### Step 2: Defining our subproblems

From this, we observe that each subproblem depends on two variables:

- $i$ — the **remaining capacity** of the knapsack.
- $\{ 1, 2, \dots, k \}$ — the **subset of items** available to use.

Combining these two dependencies (both the capacity reduction and subset of items), we define our subproblems as:

> [!box] The subproblem definition
> Let $\text{opt}(i, k)$ be the maximum total value the knapsack can carry with capacity $i$ and considering only the first $k$ items.


#### Step 2: Deriving a recurrence

For each total weight $i$, we will find the optimal solution $\text{opt}(i, k)$ using only the first $k$ items.

We can take cases on whether item $k$ is used in the solution:

- <b>Case 1: OPT(i, k) **does** include the item k</b> 
	- The remaining capacity decreases by $w_k$ and the total value increases by $v_k$.
	- OPT selects <u>best of</u> $\{1, 2, \ldots, k-1 \}$ to fill this new capacity $(i-w_k)$.
	- The maximum value in this case is $\operatorname{opt}(i-w_k,k-1) + v_k$.
- <b>Case 2: OPT(i, k) **does not** include the item k</b>
	- The remaining capacity remains unchanged and total value does not change. 
	- OPT selects <u>best of</u> $\{1, 2, \ldots, k-1 \}$ to fill up to capacity $i$.
	- The maximum value in this case is $\operatorname{opt}(i,k-1)$.

Accounting for the weight limit (capacity) of the knapsack:
- If $w_k > i$ then the item does not fit in the knapsack so we are forced to exclude it (case 2). 
- Otherwise $w_k \leq i$ and the item fits. In this case, we try both options of taking item $k$ or not taking item $k$, then use the <u>best of the two choices</u> (best of case 1 and 2).

Both are valid options but we want the one that gives the largest total value.
Taking the solution with the maximum value:

> [!box] The recurrence
> For items $1 \ldots k$ and capacity $i$,
> 
> $$
> \operatorname{opt}(i,k)
> = \max\Big[\,
> \underbrace{\operatorname{opt}(i,k-1)}_{\text{exclude }k},\;
> \underbrace{v_k+\operatorname{opt}(i-w_k,k-1)}_{\text{include }k\text{ (if }w_k\le i)}
> \,\Big]
> $$


##### Base cases
Finally, we need some base case(s). 

- If $k=0$ then there are no items so clearly, the answer is zero! 
- If $i=0$ then the knapsack has zero capacity so again, the answer is zero!

##### Recurrence

Putting this together, we can write the recurrence:

> [!function] Two Parameter Recurrence for Bounded Knapsack
>
> $$
> \operatorname{opt}(i, k) =
> \begin{cases}
>   0 & \text{if } k = 0 \text{ or } i = 0\\[6pt]
>   \operatorname{opt}(i, k-1) & \text{if } w_k > i \\[6pt]
>   \max\{\, v_k + \operatorname{opt}(i - w_k, k-1),\; \operatorname{opt}(i, k-1) \,\} & \text{otherwise.}
> \end{cases}
> $$

This recurrence has two dimensions:
- $k$ — the index of the **current item** being processed.
- $i$ — the **remaining capacity** of the knapsack.


#### The order of computation 

Each state $\operatorname{opt}(i,k)$ depends only on the states from the **previous item** $(k-1)$:
- $\operatorname{opt}(i,k-1)$ — same capacity, *previous item*
- $\operatorname{opt}(i-w_k,k-1)$ — smaller capacity, *previous item*

To compute the value at $(i,k)$, you need:
- $\operatorname{opt}(i,k-1)$ — the best value when the $k^{\text{th}}$ item is *not included* 
- $\operatorname{opt}(i-w_k,k-1)$ — the best value when the $k^{\text{th}}$ item *is included*

==Therefore we must compute all states for $k-1$ before processing $k$.==

This is guaranteed if we solve subproblems in increasing order of $k$ (and any order of $i$).

```python
for k = 1 to n:          # for each item k
    for i = 0 to C:      # in any order of capacities i
        compute opt(i, k) using opt(i, k-1) and opt(i - w_k, k-1)
```








### Two Parameters, Constant Recurrence 



### Unbounded vs Bounded Knapsack

Let’s try to use the same subproblems as in the [[Unbounded Integer Knapsack|unbounded knapsack case]] and develop a recurrence.

> [!solution] Dynamic Programming Algorithm: Unbounded Knapsack
> <b>Subproblems:</b>
> 
> For each capacity $0 \le i \le C,$ let:
> 
> - $\text{opt}(i) =$ the value of the best subset of items from $\{ 1, 2, \ldots, k \}$ that uses <u>up to</u> $i$ units of weight  
> 
> <b>Recurrence:</b>
> 
> For each item $1 \leq k \leq n$, if we take item $k$ then the best value achievable at capacity $i$ is:
>
> $$\text{opt}(i) = \max_{w_k \le i}\big[v_k + \text{opt}(i - w_k)\big]$$
>
> Each subproblem also stores the index of the last item added in another table:
>
> $$
> m(i) = \operatorname*{arg\,max}_{\substack{1 \le k \le n \\[2pt] w_k \le i}} 
> \big[\, v_k + \text{opt}(i - w_k) \,\big].
> $$
>
> To reconstruct the optimal solution, we could just repeatedly look up the item at $m(i)$, subtract its weight from the capacity, and continue for the remaining capacity (backtrack).

In the unbounded knapsack, our subproblem definition stored only one piece of information:

> [!citation|no-content] What’s the best value achievable with *any* combination of items in a knapsack with <u>capacity i</u>?

But now, for 0-1 knapsack, that’s not enough.  

Why? Because we also need to know **which items were available** for that subproblem.

Suppose we already computed that the optimal value for weight $i-w_k$ is 20.

If that optimal solution *already used item k*, we cannot use it again — but $\text{opt}(i-w_k)$ does not record that information; it only considers the remaining capacity.

So if we naïvely do $v_k + \text{opt}(i - w_k)$, we might be including item $k$ twice — violating the 0-1 rule.

- These set of subproblems (and their recurrence) worked for the [[Unbounded Integer Knapsack|unbounded knapsack]] because we were allowed **unlimited copies** of each item, meaning we do not need to consider which input items are allowed for each subproblem because they all are. 
- But in 0-1 knapsack we can only use each item **at most once**. If we take item $k$, we must *exclude it* from future choices. But the set of subproblems $\{ \text{opt}(i) : 0 \leq i \leq C \}$ only records the value of the optimal solution for capacity $i$. 
- Instead, we need more 

> [!danger] Main Issue
> The underlying issue is that <u>with this choice of subproblems</u>, this problem does not have the ==optimal substructure property==. 
> 
> Note that the optimal substructure property is the property of the solution; not the problem! We need to find another set of subproblems that do have some optimal substructure for this problem.

> [!question]-
> If we know the optimal solution for each total weight $j < i$, can we deduce the optimal solution for weight $i$? (like we did in unbounded knapsack)
> 
> > [!answer]
> > No! If we begin our solution for weight $i$ with item $k$, we have $i - w_k$ remaining weight to fill. However, we did **not** record whether item $k$ was itself used in the optimal solution for that weight (so we don't know if item k can be used again or not).

> [!question]-
> Can we define subproblems using the same 1D recurrence (one parameter) as we did in the unbounded knapsack case? 
> 
> Could we reconstruct the optimal solution for total weight $i- w_k$ by storing the values $m(i)$ and then backtrack?
> 
> > [!answer]
> > This unfortunately has two flaws:
> > 1. The optimal solution for $i - w_k$ is **not necessarily unique**, so we may have recorded a selection including item $k$ when another equally optimal selection without $k$ also exists.
> > 2. Even if all optimal solutions for $i - w_k$ use item $k$, it is still possible that the best solution for $i$ combines item $k$ with some **suboptimal** solution for $i - w_k$.
> > 
> > TLDR: This recurrence does not record which items were used in the previous subproblems. So it doesn't work!

When we are unable to form a correct recurrence between our chosen subproblems, this usually indicates that the subproblem specification is inadequate.

> [!question|yellow] 
> What extra parameters are required in our subproblem specification?
> 
> > [!answer]
> > We would like to know the optimal solution for each weight <u>without using item k</u>. 

Directly adding this information to the subproblem specification doesn’t lead to an efficient or useful recurrence. How could we capture it less directly?

We could define a subproblem for every subset of the input items, but then we would have $\Omega(2^n)$ subproblems, and that’s no better than brute force!

> [!error] 
> For example, if we try to exclude item $k$ by adding a boolean:
>
> $$\textsf{opt(i, exclude k) = best value of items up to weight i, without item k}$$
>
> We don't know what item $k$ is in advance so each subproblem needs to solve this for every $k$ at every weight $i$, taking exponential time.

But here’s another observation: it doesn’t really matter what order we consider inserting the items if for every single item we either use it or don’t use it, so we can instead just consider subproblems where we are using items $1 \ldots i$ for $0 ≤ i ≤ n$.

> [!solution] 
> The fix:
>
> $$
> \textsf{opt(i, k) = best value for weight i,} \, {\color{red}\textsf{using only first k items}}
> $$
>
> This implicitly handles inclusion/exclusion without needing to explore every subset of the input items (and also keeps track of which items were considered at the previous step).
> - Each subproblem knows which input items to use: $\{ 1, 2, \ldots, k\}$
> - Any item > k is automatically excluded


For each weight $i$, find the optimal solution using only <u>the first k items.</u>
We can take cases on whether item k is used in the solution:

- Case 1: opt(i) includes item k 
	- The previous subproblem must have solved for $i-w_k$ weight using the first $k-1$ items
	- The best value is found by taking the best value at weight $i-w_k$ using $k-1$ item and adding the weight of item $k$ so 
	- $\textsf{opt}(i) = v_k + \textsf{opt}(i-w_k, k-1)$ if we include item $k$
- Case 2: opt(i) excludes item k
	- If we don't include item k, then we just find the best solution from the first $k-1$ items
	- $\textsf{opt}(i) = \textsf{opt}(i, k-1)$ if we don't include item $k$

## Solution

> [!summary] Dynamic Programming: Bounded Knapsack
> $\operatorname{opt}(i, k)$ = maximum value that can be achieved using $\{1, 2, \ldots, k \}$ items with capacity $i$. 
> 
> - <b>Case 1: OPT(i, k) **does** include item k</b> 
> 	- Remaining capacity $=i - w_k$
> 	- OPT selects <u>best of</u> $\{1, 2, \ldots, k-1 \}$ to fill this remaining capacity
> - <b>Case 2: OPT(i, k) **does not** include item k</b>
> 	- OPT selects <u>best of</u> $\{1, 2, \ldots, k-1 \}$ to fill total capacity $i$ 
> 
> First check whether $w_k > i$. In this case the item doesn't fit so we are forced to not choose it (same as case 2). Otherwise, if it fits, we try both options of taking item $k$ or not taking item $k$, then use the best of the two choices (max of case 1 and 2). 
>
> $$\bbox[20px, border: 1px solid black]{%
> \operatorname{opt}(i, k) =
> \begin{cases}
>   0, & \text{if } k = 0 \\[6pt]
>   \operatorname{opt}(i, k-1) & \text{if } w_k > i \\[6pt]
>   \max\{\, v_k + \operatorname{opt}(i - w_k, k-1),\; \operatorname{opt}(i, k-1) \,\} & \text{otherwise.}
> \end{cases}
> }$$

## Developing the solution

#### Step 1: Identify some optimal substructure

The idea is if the optimal solution to the problem with capacity $C$ includes an item $k$, then removing that item gives an optimal solution to the problem with a <u>smaller capacity</u> $C' = C-w_k$ on <u>the set of items not including k</u>.

This means our subproblems consider a smaller capacity AND one fewer item.

- Suppose $A \subseteq S$ is an optimal solution with a total weight $i \leq C$ to the original problem with capacity $C$ on items $S = \{1, 2, \ldots, n \}$. 
- If $A$ includes item $k$, then $A' = A \setminus \{ k \}$ is an optimal solution to the knapsack problem with capacity $C' = C - w_k$ and items $S' = S \setminus \{ k \}$.
- Formally, we can prove this by contradiction—if there was a more optimal knapsack solution for capacity $C'$ and items $S'$, we could use it improve our solution.

#### Step 2: Defining our subproblems

From our optimal substructure: 

> An optimal solution for capacity C and {1, 2, …, n} items can be obtained by adding one item k to an earlier optimal solution for capacity C–wₖ that **does not include** item k. 

Therefore we need to know whether an item k is used a solution or not.  
Then each subproblem must know:
1. How much capacity is left?
2. Which items are still available to choose from?

<b>How do we keep track of which items we are allowed to use?</b>
If for every single item we either use it or don’t use it, then we can consider subproblems using a subset of items 1 … k to fill a knapsack with capacity i.

Combining these two ideas, both the capacity reduction and the subset of items, we define our subproblems with two variables:

> Let $\operatorname{opt}(i, k)$ be the value of the optimal solution to the knapsack problem on the set of items $\{1, 2, \ldots, k \}$ with capacity $i$. 

The solution to the original problem is the subproblem $\operatorname{opt}(C, n)$.

#### Step 3: Deriving a recurrence

Now that we have our subproblems, we can use our substructure observation to make a recurrence.

Each subproblem can take cases on whether item $k$ is used in the solution at capacity $i$:

- If we choose to include item $k$, then our knapsack has $i − w_k$ space remaining, and we can no longer use item $k$ to fill this space. Therefore we fill the remaining $i − w_k$ space using only the first $k−1$ items. 
- Otherwise, if we do not include item $k$, we must fill all $i$ units of weight with the first $k − 1$ items.

Now consider the case(s) for this recurrence.
- If $w_k > i$ then the item does not fit in the knapsack, so we are forced to exclude it (case 2). 
- Otherwise $w_k \leq i$ and item k fits. In this case, we try both options of taking item $k$ or not taking item $k$, then use the <u>best of the two choices</u> (max of case 1 and 2).

> [!algorithm] Inclusion/Exclusion Cases
> Let $\operatorname{opt}(i, k)$ = maximum value using the first $k$ items $\{1, 2, \ldots, k \}$ with capacity $i$. 
> 
> If $w_k \leq i$ and item $k$ fits in the knapsack, then try both options of including item $k$ or not including item $k$ in the solution:
> 
> - <b>Case 1: $\operatorname{opt}(i, k)$ **does** includes item $k$</b> 
> 	- Remaining capacity = $i - w_k$
> 	- OPT fills remaining capacity $\boxed{i - w_k}$ using <u>best of</u> $\{1, 2, \ldots, k-1 \}$ 
> 	- ==$\operatorname{opt}(i, k) = v_k + \operatorname{opt}(i-w_k, k-1)$ if we take item $k$==
> - <b>Case 2: $\operatorname{opt}(i, k)$ **does not** include item $k$</b>
> 	- Capacity = $i$ 
> 	- OPT fills total capacity $\boxed{i}$ using <u>best of</u> $\{1, 2, \ldots, k-1 \}$ 
> 	- ==$\operatorname{opt}(i, k) = \operatorname{opt}(i, k-1)$ if we don't take item $k$==
> 
> Both are valid solutions but we want the best one that gives the highest value. 
> Taking the solution with the maximum value:
>
> $$
> \bbox[10px, border: 1px solid black]{\operatorname{opt}(i, k) = \max\{\, v_k + \operatorname{opt}(i-w_k, \, k-1),\; \operatorname{opt}(i, k-1) \,\} \quad \text{if } w_k \leq i}
> $$

Finally, we need some base case(s). 

- If $k=0$ then there are no items so clearly, the answer is zero! 
- If $i=0$ then the knapsack has zero capacity so again, the answer is zero!

So, putting this together, we can write the recurrence:

> [!function] Two Parameter Recurrence for Bounded Knapsack
>
> $$
> \operatorname{opt}(i, k) =
> \begin{cases}
>   0 & \text{if } k = 0 \text{ or } i = 0\\[6pt]
>   \operatorname{opt}(i, k-1) & \text{if } w_k > i \\[6pt]
>   \max\{\, v_k + \operatorname{opt}(i - w_k, k-1),\; \operatorname{opt}(i, k-1) \,\} & \text{otherwise.}
> \end{cases}
> $$

This gives the **best value** that can be achieved using the first $k$ items and capacity $i$.

#### Step 4: Analysis 

We have $O(nC)$ subproblems and each of them requires a constant amount of work to evaluate for the first time. So, using dynamic programming, we can implement this solution in **pseudo-polynomial** $O(nC)$ time.

### Reconstructing the optimal solution

To reconstruct the optimal set for $(i, k)$ (capacity $i$ and first $k$ items), each subproblem must also record the **index of the last (largest) item** in the max-value subset of items at $\operatorname{opt}(i, k)$. 

Then we can backtrack (starting from $m(C, n)$ to reconstruct the set of items chosen.

> [!algorithm] Reconstructing the optimal set
> When backtracking:
> 1. Start from $(i, k) = (C, n)$
> 2. If $m(i, k) = k$: 
> 	1. include item $k$;
> 	2. reduce capacity $i \leftarrow i - w_k$;
> 	3. go to previous item $k \leftarrow k - 1$.
> 3. If $m(i, k) = m(i, k-1)$ (duplicate):
> 	1. item $k$ was not included;
> 	2. move to previous item $k \leftarrow k - 1$.
> 4. Stop when we hit the base cases $k=0$ or $i=0$. 

Same as before, if the item $k$ fits the knapsack ($w_k \leq i$) then try both options and take the <u>best of the two solutions</u> that has the largest value.  

- If including item $k$ gives the better (or equal) value, then $m(i, k) = k$.
- Otherwise, $m(i, k) = m(i, k-1)$. 

If we’re at the base cases ($i = 0$ or $k=0$) then we employ a dummy value to record that no item was taken.

- If $i = 0$ or $k=0$ then $m(i, k) = 0$ meaning no item was taken.

Putting this altogether:
> [!function] Reconstructing the solution 
> Let $\operatorname{m}(i, k)$ = the last (largest) index of an item in the optimal solution among the first $k$ item for capacity $i$ (0 if none).
>
> $$
> m(i, k) =
> \begin{cases}
>   0 & \text{if } i = 0 \text{ or } k = 0, \\[6pt]
>   m(i, k - 1) & \text{if } w_k > i ,\\[6pt]
>   k & \text{if } v_k + \operatorname{opt}(i - w_k, k - 1) \ge \operatorname{opt}(i, k - 1), \\[6pt]
>   m(i, k - 1) & \text{otherwise.}
> \end{cases}
> $$

### Solution

<b>Subproblems:</b>

For $0 \leq i \leq C$ and $0 \leq k \leq n$, let 

- $\operatorname{opt}(i, k)$ be the maximum value that can be achieved using up to (at most) $i$ units of weight <u>and</u> using items among the first $k$ items $\{1, 2, \dots, k\}$, and 
- $\operatorname{m}(i, k)$ be the (largest) index of an item in such a collection 

<b>Two Parameter Recurrence:</b>

For $i > 0$ and $1 \leq k \leq n$, 

$$
\operatorname{opt}(i, k) =
\begin{cases}
  0, & \text{if } i = 0, \\[6pt]
  \operatorname{opt}(i, k - 1), & \text{if } w_k > i, \\[6pt]
  \max\{\, v_k + \operatorname{opt}(i - w_k, k - 1),\; \operatorname{opt}(i, k - 1) \,\}, & \text{otherwise.}
\end{cases}
$$

$$
m(i, k) =
\begin{cases}
  0, & \text{if } k = 0, \\[6pt]
  m(i, k - 1), & \text{if } w_k > i, \\[6pt]
  \begin{aligned}
  k, & \text{if } v_k + \operatorname{opt}(i - w_k, k - 1) \ge \operatorname{opt}(i, k - 1), \\[4pt]
  m(i, k - 1), & \text{otherwise.}
  \end{aligned}
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

<b>Subproblems:</b>

For $0 \le i \le C$ and $0 \le k \le n$, let

- $\text{opt}(i, k)$ be the <b>maximum value</b> that can be achieved using up to $i$ units of weight <u>and</u> using only items among the first $k$ items, and
- $m(i, k)$ be the <b>(largest) index of an item</b> in such an collection.

<b>Recurrence:</b>

For $i > 0$ and $1 \le k \le n$,

$$
\text{opt}(i, k) =
\max \Big[
  v_k + \text{opt}(i - w_k, k - 1),\;
  \text{opt}(i, k - 1)
\Big],
$$

with $m(i,k)=k$ or $m(i,k)=m(i,k−1)$ respectively.

<b>Base cases:</b>

If $i = 0$ or $k = 0$, then 

$$
\text{opt}(i, k) = 0 \quad \text{and} \quad m(i, k) = 0.
$$

> Setting $m(i, k) = 0$ uses a dummy value to record that no item was taken.

<b>Order of computation:</b>

- When we get to $(i, k)$, the recurrence requires us to have already found the subproblems $\text{opt}(i, k-1)$ and $\text{opt}(i-w_k, k - 1)$.
- This is guaranteed if we solve subproblems in increasing order of $k$ (and any order of $i$).

Solve subproblems in increasing order of $k$ (for each $k$, iterate over all $i$ in any order).

#### Overall answer

$\text{opt}(C, n)$

which gives the maximum total value achievable with capacity $C$ and all $n$ items.

#### Time complexity

There are $O(nC)$ subproblems, each taking $O(1)$ time to compute, for a total running time of **$O(nC)$** — again **pseudopolynomial**.
