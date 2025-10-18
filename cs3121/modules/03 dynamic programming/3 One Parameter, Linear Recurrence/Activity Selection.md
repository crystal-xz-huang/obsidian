---
aliases:
  - "Dynamic Programming: Activity Selection"
  - Activity Selection
---
## Dynamic Programming: Activity Selection

### Problem

> [!problem]
> <b>Instance</b>: A list of $n$ activities with starting times $s_i$ and finishing times $f_i$ . No two activities can take place simultaneously.
> 
> <b>Task</b>: Find the <u>maximal total duration</u> of a subset of compatible activities.

This is an extension of [[2.1 Activity Selection|Activity Selection]] where each activity now has a **weight** i.e. its duration.

> [!NOTE] Greedy vs DP
> Recall greedy algorithm works if all weights are 1. 
> 
> - Remember, we used the greedy method to solve a somewhat similar problem of finding a subset with the **largest possible number** of compatible activities, but the greedy method does <u>not</u> work for the present problem.
> - Greedy: Whenever we make a choice, we don’t rule out an optimal solution.

## Solution

#### Structure

> [!NOTE]
> <b>Setup</b>
> - Sort the activities in descending order of finish times: $f_1 ≤f_2 ≤…≤f_n$.
> - Define $q_j$ as the last activity that finishes before job $j$ (if no such activity exists, set to 0)
> 
> <b>Subproblem</b>
> 
> $\text{OPT}(j)$ = value of optimal solution to the problem consisting of activities $\{1, … , j\}$ 
> 
> i.e. OPT(j) is the maximum total duration of a compatible subset among the first $j$ activities.
> 
> Now, we consider what the optimal solution for the first $j$ activities are:
> 
> - Case 1: Include activity $j$.  
> 	- can’t use incompatible activities that overlap with $j$: $\{ q_j + 1, q_j + 2, … , j-1 \}$
> 	- must include optimal solution to problem consisting of remaining compatible activities $\{ 1, 2, … , q_j \}$ (i.e. can contain any subset among the earlier compatible activities)
> 	- new duration = $(f_j - s_i)  + OPT(q_j)$ 
> - Case 2: Do not include activity $j$. 
> 	- must include optimal solution to problem consisting of remaining compatible activites $\{ 1, 2, … , j - 1 \}$
> 	- if we skip activity $j$, then the best value is simply the optimal solution among the first $j-1$ jobs: $OPT(j-1)$

As before, we start by sorting the activities by their finishing time into a non-decreasing sequence, and henceforth we will assume that $f_1 ≤f_2 ≤…≤f_n$.

We can then specify the subproblems: 

For each $1 ≤ i ≤ n$, 
Let $t(i)$ be the **maximum total duration** of a subsequence of the first $i$ activities which

1. consists of non-overlapping activities, and
2. ends with activity $i$.

The second condition will simplify the recurrence.

We would like to find $t(i)$ by appending activity $i$ to a selection ending at some earlier index $j$.

We require that activity $i$ not overlap with activity $j$, i.e., the latter finishes before the former begins so $f_j \leq f_i$. 

Among all such $j$, our recurrence will choose that which maximises the duration $t(j)$.

There is no need to find $t(1)$ in this recursive manner, as there are no preceding activities.

> [!solution]
> <b>Subproblems</b>: For each $1 ≤ i ≤ n$, let $t(i)$ be the **maximal duration** of a non-overlapping subsequence of the first $i$ activities which ends with activity $i$.
> 
> <b>Recurrence:</b> For $i >1$,
>
> $$t(i) = (f_i - s_i) +  \max_{\substack{j < i \\ f_j < f_i}} t(j)$$
>
> <b>Base Case</b>: $t(1) = f_1 − s_1$.
> 
> 
> <b>Order of computation</b>: Solve subproblems in increasing order of $i$.
> 
> <b>Overall answer</b>: Again, considering all possible choices for the last activity selected, we have
>
> $$\max_{i \leq i \leq n} t(i)$$
>
> <b>Time complexity:</b>
> 
> - Sorting takes $O(n \log n)$.  
> - There are $O(n)$ subproblems each taking $O(n)$ time. 
> - The overall answer is found in $O(n)$ time.
> 
> Therefore the time complexity is $O(n^2)$.

## Proof of Correctness

### Proof Outline

Why does this recurrence produce optimal solutions to the subproblems? 
We apply the same inductive argument:

> [!idea]
> If we took a suboptimal solution ending at some earlier index $j$, then extending it with $i$ is no better or worse than taking the actual optimal solution ending at $i$.

- Let the optimal selection from the first $i$ activities be given by the sequence $$σ = […,m,i].$$
- We claim: the truncated sequence $σ' = [… , m]$ gives an optimal solution among the first $m$ activities.

Why is this true? Consider the opposite! i.e. Prove by contradiction.

- Suppose instead that the best selection from the first $m$ activities is a sequence $τ'$ of even larger total duration.
- Then make an activity selection $τ$ by appending activity $i$ to $τ'$.
- It is clear this is a valid selection of activities with larger total duration than $σ$. This contradicts the earlier definition of $σ$ as the best sequence among the first $i$ activities.
- Thus, the optimal sequence from the first $i$ activities is obtained by appending activity $i$ to the optimal selection for some prefix of the list of activities.


