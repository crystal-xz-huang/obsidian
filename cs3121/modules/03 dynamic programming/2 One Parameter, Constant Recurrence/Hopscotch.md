---
aliases:
  - Hopscotch
---
## Hopscotch

### Problem Statement

> [!problem]
> <b>Instance:</b> Rui is playing a version of hopscotch on a linear court. They start in square 0 and want to get to square $n$.
> 
> From any square, Rui can <u>step</u> one square forward, or <u>jump</u> two squares forward.
> 
> <b>Task:</b> Design a linear time algorithm to count the number of ways that Rui can reach square $n$.

### Example

|    ![[dp-hopscotch.png\|300]]    |
| :------------------------------: |
| Possible ways to get to square 5 |

> [!question]
> How many ways to get to square 5?
> 
> > [!answer]
> > There are the only 2 ways to get to square. 
> > Any path that gets to square 5 must either:
> > 
> > - Get to square 4 and step
> > - Get to square 3 and jump

### Developing the Recurrence

#### Choose a tentative subproblem specification

For the full problem, we need the number of ways of reaching the last square, so let’s associate to each square the number of ways of reaching it — say **ways(i)**.

#### Try to form a recurrence between these subproblems

Square $i$ can be reached by:

1. Getting to square $i - 1$ in any sequence of moves, then taking a **step**, or
2. Getting to square $i-2$ in any sequence of moves, then taking a **jump**.
    
Therefore, for $i \geq 2$ :

$$\text{ways(i) = ways(i − 1) + ways(i − 2)}$$

#### Base cases

- **ways(0)** and **ways(1)**, which we can quickly count in full.

| i   | Description                 | ways(i)               |
| --- | --------------------------- | --------------------- |
| 0   | Start position (do nothing) | 1                     |
| 1   | One step from start         | 1                     |
| ≥ 2 | Computed by recurrence      | ways(i−1) + ways(i−2) |
<i>Note:</i> $\text{ways(0) ≠ 0}$ because that would mean there are no ways to get to square 0.

##### Time Analysis

There are **O(n)** subproblems, each taking **constant time**, so the total running time is **linear**.

#### Solution

> These are 6 points we need to hit for DP

**Subproblems:**

For each $1 \le i \le n$, let $\text{ways(i)}$ be the number of ways to reach square $i$.

**Recurrence:**  

For $i \ge 2$,

$$  
\text{ways(i) = ways(i - 1) + ways(i - 2)}  
$$

because square $i$ can be reached by:

1. Any sequence of moves to reach square $i - 1$, then taking a **step**, or
2. Any sequence of moves to reach square $i - 2$, then taking a **jump**.

**Base cases:**

- $\text{ways}(0) = 1$, because the only way to reach square 0 is to **do nothing**, and
- $\text{ways}(1) = 1$, because the only way to reach square 1 is to **take a single step**.

**Order of computation:** 

Solve subproblems in increasing order of $i$.

**Overall answer:** 

$\text{ways}(n)$.

**Time complexity:** 

$O(n)$ subproblems each taking $O(1)$ time, for a total running time of $O(n)$.

---

> [!remark]
> You might recognise that this is the famous Fibonacci sequence.
> 
> The closed form is less useful in this example because it uses irrational numbers.

| i       | 0   | 1   | 2   | 3   | 4   | 5   |
| ------- | --- | --- | --- | --- | --- | --- |
| ways(i) | 1   | 1   | 2   | 3   | 5   | 8   |

$$  
\text{ways(i) = ways(i - 1) + ways(i - 2)}  
$$
