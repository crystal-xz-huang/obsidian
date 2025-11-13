---
aliases:
  - "Dynamic Programming: Activity Selection"
  - Weighted Activity Selection
modules:
  - "[[mocs/Modules/Dynamic Programming|Module 3: Dynamic Programming]]"
categories:
  - "[[Interval Scheduling#Weighted]]"
tags:
  - topic/dynamic-programming
  - examples
---


## Dynamic Programming: Weighted Activity Selection

> [!problem]
> <b>Instance</b>: A list of $n$ activities with starting times $s_i$ and finishing times $f_i$ . No two activities can take place simultaneously. 
> 
> That is, two activities $i$ and $j$ are compatible (non-conflicting) if the latter finishes before the former begins i.e. if $j < i$ then $f_j < s_i$.
> 
> <b>Task</b>: Find the <u>maximal total duration</u> of a subset of compatible activities.

> [!solution]
> <b>Subproblems</b>: For each $1 ≤ i ≤ n,$ let $\textsf{MaxDuration}(i)$ be the **maximal duration** of a non-overlapping subsequence of the first $i$ activities which ends with activity $i$.
> 
> <b>Recurrence:</b> For $i >1$,
>
> $$\displaystyle \textsf{MaxDuration}(i) = (f_i - s_i) +  \max_{\substack{j \, < \, i \\ f_j \, < \, s_i}} \textsf{MaxDuration}(j)$$
>
> <b>Base Case</b>: $\textsf{MaxDuration}(1) = f_1 − s_1$
> 
> 
> <b>Order of computation</b>: Solve subproblems in increasing order of $i$.
> 
> <b>Final answer</b>: Considering all possible choices for the last activity selected, we have
>
> $$\max_{i \leq i \leq n} \textsf{MaxDuration}(i)$$
>
> <b>Time complexity:</b>
> 
> - Sorting takes $O(n \log n)$.  
> - There are $O(n)$ subproblems each taking $O(n)$ time. 
> - The overall answer is found in $O(n)$ time.
> 
> Therefore the time complexity is $O(n^2)$.

> [!answer]
> Suppose we also want to construct the optimal sequence of activities.
> 
> In the $i$th slot of our table, we should store not only $t(i)$ but the index $m$ from which the optimal selection from the first $i$ activities was constructed.

<hr class='dots' />


## Problem 

> [!problem]
> <b>Instance</b>: A list of $n$ activities with starting times $s_i$ and finishing times $f_i$ . No two activities can take place simultaneously.
> 
> <b>Task</b>: Find the <u>maximal total duration</u> of a subset of compatible activities.

### Greedy vs DP

This is an extension of [[Unweighted Activity Selection|Greedy Algorithm: Activity Selection]] but with some key differences:

- Each activity now has a **weight** i.e. its duration.
- Find the **maximal total duration** of compatible (non-overlapping) activities.
	- Instead of maximising the total number of all activities, we want to now maximise the total duration of all activities.

> [!important] Greedy vs DP
> Recall greedy algorithm works if all weights are 1. 
> 
> - Remember, we used the greedy method to solve a somewhat similar problem of finding a subset with the **largest possible number** of compatible activities, but the greedy method does <u>not</u> work for the present problem.
> - Greedy: Whenever we make a choice, we don’t rule out an optimal solution.
> 	- Greedy choice is to choose the earliest finishing activity (and discard the others).
> 	- Greedy: Two activities are just as good as each other, except one is done earlier.

## Developing the solution

#### Problem Recap

<b>Input:</b> Given a set of $n$ activities with:

- start times $s_1, s_2, \dots, s_n$
- finish times $f_1, f_2, \dots, f_n$

Each activity’s duration is $f_i - s_i$.
No two activities can overlap, so for all $i > j$ we must have $s_i > f_j$. 

<b>Goal:</b> Find a subset of **compatible (non-overlapping)** activities with **maximum total duration**

![[weighted-activity-selection-example.png]]

#### Setup: Sort activities

As before, we start by sorting the activities by their finishing time into a [[Sequences#Increasing and decreasing|non-decreasing sequence]], and henceforth we will assume that $f_1 ≤f_2 ≤…≤f_n$.


![[weighted-activity-selection-example-sorted.png]]

#### Define the Subproblems and Recurrence

We can then specify the subproblems: 

> `t(i)`= max total duration of a subset of the first `i` activities that ends with activity `i`

That is, `t(i)` is the best total duration achievable among activities `1..i` where the last chosen activity is activity `i`. Then we find every optimal set of activities with the max duration that ends at $1, 2, \ldots, n$. The final answer is the one among these with the largest total duration.

> [!idea]
> - Consider an optimal solution containing activity `k`. We now have non-overlapping activities on the left and right of `k`. As we don't know `k`, we can try each of the activities.
> 	- This is the **optimal-substructure** property.
> - Now consider the optimal solution for activities `[1..j]`. We can find the optimal solution if we know the solution for `[1..t]`, where `t` is the last non-overlapping activity with finish time < start time of `j`: 
> 	- `opt[j] = MAX(opt[j-1], opt[t] + duration(j))` is the optimal solution up to activity`j`. 

> [!function] Subproblems
> For each $1 ≤ i ≤ n$, let $t(i)$ be the **maximum total duration** of a subsequence of the first $i$ activities which
> 
> 1. consists of non-overlapping activities, and
> 2. ends with activity $i$.
> 
> The second condition will simplify the recurrence.

- We would like to find $t(i)$ by appending activity $i$ to a selection ending at some earlier index $j$.
- We require that activity $i$ not overlap with activity $j$, i.e., the latter finishes before the former begins so $f_j \leq f_i$. 
- Among all such $j$, our recurrence will choose that which maximises the duration $t(j)$.
- There is no need to find $t(1)$ in this recursive manner, as there are no preceding activities. 

## Solution

<b>Subproblems</b>: 

For each $1 ≤ i ≤ n,$ let $\textsf{MaxDuration}(i)$ be the **maximal duration** of a non-overlapping subsequence of the first $i$ activities which ends with activity $i$.

<b>Recurrence:</b> 

For $\displaystyle i >1, \textsf{MaxDuration}(i) = (f_i - s_i) +  \max_{\substack{j \, < \, i \\ f_j \, < \, s_i}} \textsf{MaxDuration}(j).$

<b>Base Case</b>: $\textsf{MaxDuration}(1) = f_1 − s_1$

<b>Order of computation</b>: Solve subproblems in increasing order of $i$.

<b>Final answer</b>: Considering all possible choices for the last activity selected, we have

$$\max_{i \leq i \leq n} \textsf{MaxDuration}(i)$$

<b>Time complexity:</b>

- Sorting takes $O(n \log n)$.  
- There are $O(n)$ subproblems each taking $O(n)$ time. 
- The overall answer is found in $O(n)$ time.

Therefore the time complexity is $O(n^2)$.

## Proof of Correctness

Why does this recurrence produce optimal solutions to the subproblems? 
We apply the same inductive argument:

> [!idea]
> If we took a suboptimal solution ending at some earlier index $j$, then extending it with $i$ is no better or worse than taking the actual optimal solution ending at $i$.

- Let the optimal selection from the first $i$ activities be given by the sequence $\sigma= [\ldots,m,i].$
- We claim: the truncated sequence $\sigma' = [\ldots, m]$ gives an optimal solution among the first $m$ activities.

Why is this true? Consider the opposite! i.e. Prove by contradiction.

- Suppose instead that the best selection from the first $m$ activities is a sequence $\tau'$ of even larger total duration.
- Then make an activity selection $\tau$ by appending activity $i$ to $\tau'$.
- It is clear this is a valid selection of activities with larger total duration than $\sigma$. This contradicts the earlier definition of $\sigma$ as the best sequence among the first $i$ activities. Therefore, $\sigma'$ must be optimal among the first m activities.
- Thus, the optimal sequence from the first $i$ activities is obtained by appending activity $i$ to the optimal selection for some prefix of the list of activities.

---

## Alternative Solution

### Step 1. Identify the optimal substructure

We need to define a subproblem that we can extend/build on at each step.

Suppose we have some instance of the problem, say the input set $\{1, 2, \ldots, i\}$ of activities sorted by finish times so $f_1 \leq f_2 \leq \cdots \leq f_i$.  

Observation: The optimal solution either does contain activity $i$ or it does not contain $i$. 
(here the optimal solution is the subset of activities with the maximum duration)

Case 1: The optimal solution includes activity $i$ 
- Then no other activities can overlap with activity $i$. 
- So all previously chosen activities must finish before activity $i$ starts. Meaning the previous solutions should find the answer among activities $\{1, \ldots, j\}$ where $j$ is the last activity that finishes before activity $i$ s.t. $f_j < s_i$ for $j < i$.
- Then the final answer is the duration of activity $i$ + max duration among all the earlier activities that finish before $a_i$. 

Case 2: The optimal solution does not include activity $i$ 
- If it doesn't contain activity $i$, then the optimal solution is just the set of activities with the max duration among the remainder of activities up to $i-1$, that is $\{1, 2, \ldots, i-1\}$.

### Step 2. Define the subproblems

Putting these two cases together, the optimal solution among $1..i$ activities is:  

$$\textsf{MaxDuration}(i) = \max \Big( \underbrace{\textsf{MaxDuration}(i-1)}_{\text{don’t include activity } i}, \; \underbrace{(f_i - s_i) + \textsf{MaxDuration}(j)}_{\text{include activity } i} \Big)$$

where $j$ is the last activity that finishes before (is compatible with) activity $i$. 

The solution to the original problem is the subproblem at $i=n$ so $\textsf{MaxDuration}(n)$.



