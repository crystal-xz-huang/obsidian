---
aliases:
  - Integer Knapsack
  - Unbounded Knapsack
---
## Integer Knapsack

### Problem

> [!problem]
> <b>Instance</b>: You have $n$ items, the $i$th of which has weight $w_i$ and value $v_i$ . All weights are integers. You also have a knapsack of capacity $C$.
> 
> You can take each item any (integer) number of times.
> 
> <b>Task</b>: Choose a combination of available items which all fit in the knapsack and whose value is **as large as possible**.

### Fractional vs Integer Knapsack

| Version                      | Decision                                     | Recurrence                                      | Can reuse items? |
| ---------------------------- | -------------------------------------------- | ----------------------------------------------- | ---------------- |
| 0/1 Knapsack                 | Include or exclude each item *once*          |                                                 | ❌ No             |
| Integer (Unbounded) Knapsack | Include or exclude *any number* of each item | $\text{OPT}(C)=\max_{i}(v_i+\text{OPT}(C-w_i))$ | ✅ Yes            |

#### 0/1 Knapsack

$\text{OPT}(n, w)$ = maximum total value in a subset of items $\{1, …, n\}$ with weight limit $w$.

- **Case 1:** Item $n$ is ***not selected***.
	- OPT selects the best of ${1, 2, …, n-1}$ using weight limit $w$.
	- Value = $\text{OPT}(n-1, w)$.
- **Case 2:** Item $n$ is **_selected_** (only if $w_n \le w$).
    - new weight limit = $w - w_n$
	- OPT selects the best of ${1, 2, …, n-1}$ with this new limit.
	- Value = $v_n + \text{OPT}(n-1, w - w_n)$.

Hence the recurrence:  

$$
\displaystyle
\text{OPT}(n, w) =
\begin{cases}
\text{OPT}(n-1, w), & \text{if } w_n > w, \\[6pt]
\max\big(\text{OPT}(n-1, w),\ v_n + \text{OPT}(n-1, w - w_n)\big), & \text{otherwise.}
\end{cases}
$$

Base case: $\text{OPT}(0, w) = 0$ for all $w$.

#### Integer (Unbounded) Knapsack

$\text{OPT}(C)$ = maximum total value achievable with capacity $C$, when each item type can be used any number of times.

- **Case 1:** Item $i$ ***is included*** at least once.
    - Remaining capacity = $C - w_i$
    - OPT includes the optimal solution for the remaining capacity (can reuse item $i$ again).
    - Value = $v_i + \text{OPT}(C - w_i)$.
- **Case 2:** Item $i$ ***is not included***.
    - OPT considers the remaining item types ${1, …, i-1}$.
    - Value = $\text{OPT}(i-1, C)$.
        

Recurrence:  

$$\text{OPT}(C) = \max_{1 \le i \le n,\ w_i \le C} \big( v_i + \text{OPT}(C - w_i) \big)  $$

Base case: $\text{OPT}(0) = 0$.

### Solution

This recurrence structure is _identical_ to the [[Making Change]] — only the operation changes from **minimization** (fewest coins) to **maximization** (highest value).

> [!NOTE]
> - We solve for each total weight up to $C$.
> - Assume we have solved the problem for **all** total weights $j < i$.
> - We now consider each item, the $k$th of which has weight $w_k$. If this item is included, we would have $i − w_k$ weight to fill.
> - The best packing using item $k$ is: 
> 	- one of item $k$, plus
> 	- the best packing of weight $i − w_k$ (an earlier subproblem).
> 
> We should consider all items $k$ in this way, and pick the one that gives the largest total value.

#### Subproblems

For each $0 \le i \le C$, let:
- $\text{opt}(i)$ be the **maximum value** that can be achieved using ==up to== $i$ units of weight, and  
- $m(i)$ be the **index of an item** included in such an optimal collection.

#### Recurrence

For $i > 0$:

$$
\text{opt}(i) = \max_{\substack{1 \le k \le n \\ w_k \le i}} 
\big[\, v_k + \text{opt}(i - w_k) \,\big]
$$

and

$$
m(i) = \operatorname*{arg\,max}_{\substack{1 \le k \le n \\ w_k \le i}} 
\big[\, v_k + \text{opt}(i - w_k) \,\big].
$$

#### Base case

If $i < \min w_k$ for $1 \le k \le n$, then

$$
\text{opt}(i) = 0 \quad \text{and} \quad m(i) = 0.
$$

> Note: Setting $m(i) = 0$ employs a **dummy value** to record that no item was taken.

#### Order of computation

Solve subproblems (pairs of $\text{opt}(i)$ and $m(i)$) in **increasing order of** $i$.

#### Overall answer

$\text{opt}(C)$ since the knapsack can hold up to $C$ units of weight.

#### Time complexity

There are $O(C)$ subproblems, each taking $O(n)$ time,  
for a total time complexity of **$O(nC)$** — again **pseudopolynomial**.




