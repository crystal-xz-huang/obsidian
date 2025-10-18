---
aliases:
  - Making Change
---
## Making Change

### Problem

> [!problem]
> <b>Instance:</b> You are given $n$ types of coin denominations of integer values $v_1 <v_2 <…<v_n$.
> 
> Assume $v_1 = 1$ (so that you can always make change for any integer amount) and that you have an unlimited supply of coins of each denomination.
> 
> <b>Task</b>: Make change for a given integer amount $C$, using as few coins as possible.

- **Denominations** is the set of **values of coins** available to you: 5, 10 and 25¢ coins = $\{ 5, 10, 25\}$
- To **make change** for an amount $C$, we choose some coins whose total value adds up to $C$.

> [!example]
> If `C = 6`and you have denominations `{1, 3, 4}`, some possible solutions include:
> 
> - 3 + 3 = 6
> - 4 + 1 + 1 = 6
> - 1 + 1 + 1 + 3 = 5 
> 
> All these make change for 6 — because they sum to 6.

The optimal solution is the one with the fewest coins, so the goal is to **minimise** the number of coins we choose.

### Greedy Algorithm

> [!solution]
> Greedily take as many coins of value $v_n$ as possible, then $v_{n−1}$, and so on.

- The greedy approach is to always take the largest value coin that fits within the total.
- This approach is very tempting, and works for almost all real-world currencies.
- However, it doesn’t work for all sequences. In general, we will need to use DP.

> [!example] Counterexample
> - Denominations: $\{1,3,4\}$ (note $v_1=1$)
> - Target: $C = 6$
>     
> **Greedy (largest-first):** pick 4, then 1, then 1 → coins = **3**  
> **Optimal:** pick 3 + 3 → coins = **2**
> 
> So the greedy strategy picks as *many* coins $v_n, v_{n-1}, \dots$ as possible.
> But the optimal solution is to pick as *few* coins as possible. 
> Therefore it is not optimal.

### Developing the solution

We have:
- Denominations: $v_1 < v_2 < \dots < v_n$
- Target amount: $C$
- Unlimited supply of each coin
- **Goal:** make change for $C$ using the fewest number of coins

#### Structure

$\text{OPT}(C)$ = minimum number of coins needed to make change for amount $C$.

- **Case 1:** OPT uses a coin of denomination $v_i$.
    - remaining amount = $C - v_i$
    - OPT must include the optimal solution to make change for this remaining amount.
- **Case 2:** OPT does not use a coin of denomination $v_i$.
    - OPT considers smaller denominations ${v_1, v_2, …, v_{i-1}}$.

#### Define the subproblems

We want to break the problem (make change for $C$) into smaller ones (make change for smaller amounts).

Let:

$$
\text{opt}(i) = \text{the fewest coins needed to make change for amount } i
$$

for each $0 \le i \le C$.

So our subproblems are the amounts $0, 1, 2, \dots, C$.

#### Find a recurrence

To make change for amount $i$:

We can pick one coin of denomination $v_k$, and then we need to make change for the *remaining* amount $(i - v_k)$.

So, if we choose coin $v_k$, the total number of coins will be:

$$
1 + \text{opt}(i - v_k)
$$

We can try this for each coin where $v_k \le i$, and take the minimum.

Hence the recurrence:

$$
\boxed{\text{opt}(i) = 1 + \min_{1 \le k \le n,\; v_k \le i} \text{opt}(i - v_k)}
$$

#### Base case

If the amount is $0$:

$$
\text{opt}(0) = 0
$$

(because no coins are needed to make 0).

#### Example

Denominations `{1, 3, 4}`, target $C = 6$.

| i   | Calculation                             | opt(i) |
| --- | --------------------------------------- | ------ |
| 0   | base case                               | 0      |
| 1   | 1 + opt(0) = 1                          | 1      |
| 2   | 1 + opt(1) = 2                          | 2      |
| 3   | min(1+opt(2)=3, 1+opt(0)=1)             | **1**  |
| 4   | min(1+opt(3)=2, 1+opt(1)=2, 1+opt(0)=1) | **1**  |
| 5   | min(1+opt(4)=2, 1+opt(2)=3, 1+opt(1)=2) | **2**  |
| 6   | min(1+opt(5)=3, 1+opt(3)=2, 1+opt(2)=3) | **2**  |

### Solution

We will try to find the optimal solution for not only $C$, but every amount up to $C$.

Assume we have found optimal solutions for every amount $j < i$ and now want to find an optimal solution for amount $i$.

We consider each coin $v_k$ as part of the solution for amount $i$, and make up the remaining amount $i − v_k$ with the previously computed optimal solution.

Among all of these optimal solutions, which we find in the table we are constructing recursively, we pick one which uses the fewest number of coins.

Supposing we choose coin $k$, we obtain an optimal solution $\text{opt}(i)$ for amount $i$ by adding one coin of denomination $v_k$ to $\text{opt}(i − v_k)$.

If the amount to be made is zero, then the solution is trivial: use no coins.

> [!solution]
> <b>Subproblems:</b> For each $0 \le i \le C$, let $P(i)$ be the problem of determining $\text{opt}(i)$ —  
> the fewest coins needed to make change for an amount $i$.
> 
> <b>Recurrence</b>: For $i > 0$,
>
> $$
> \displaystyle \text{opt}(i) = 1 + \min_{\substack{1 \leq k \leq n \\ v_k < i}} \text{opt}(i - v_k).
> $$
>
> <b>Base case:</b> $\text{opt}(0) = 0.$
> 
> <b>Order of computation</b>: Solve subproblems $P(i)$ in increasing order of $i$.
> 
> <b>Overall answer</b>: $\text{opt}(C)$.
> 
> <b>Time complexity</b>: $O(C)$ subproblems each taking $O(n)$, for a total of $O(nC)$.

### Point of Reference

This is considered to be a **pseudopolynomial** time algorithm, <u>not</u> a polynomial time algorithm.

We always determine whether an algorithm runs in polynomial time with reference to the **length** of the input.

- In this case, the input is n, the coin values and C, so the number of bits required to communicate it is O(n log C). 
- On the other hand, the algorithm runs in O(nC), so the running time is exponential in the length of the input.

There is no known polynomial time algorithm for this problem!

### Proof of Correctness

#### Proof Outline

Why this produces an optimal solution for each amount $i \le C$?

Consider **one** (an) optimal solution for some amount $i$, and suppose this solution includes at least one coin of denomination $v_k$ for some $1 \le k \le n$.

Removing this coin must leave an optimal solution for the amount $(i - v_k)$ — this can be shown by **contradiction**:

- If the remaining coins did **not** form an optimal solution for $(i - v_k)$, then there would exist another way to make $(i - v_k)$ using fewer coins.
- By adding back the coin of denomination $v_k$, we would then obtain a **better** (smaller) solution for $i$,
- contradicting our assumption that the original solution for $i$ was optimal.

Hence, any optimal solution for amount $i$ can be constructed by **adding one coin** $v_k$ to an optimal solution for amount $(i - v_k)$.

By considering **all** denominations $v_k \le i$,  
we can choose the one that yields the **fewest total coins**, giving the recurrence:

$$
\text{opt}(i) = 1 + \min_{v_k \le i} \text{opt}(i - v_k).
$$

Thus, the algorithm correctly computes the **optimal number of coins** for every amount $i \le C$.

---

## Extension: Recovering the actual coins used

> [!problem]
>  Suppose we were required to also determine the exact number of each coin required to make change for amount C.

In the $i$-th slot of the DP table, we store both:

- $\text{opt}(i)$ — the fewest coins needed to make amount $i$, and  
- $\text{pred}(i)$ — the denomination $v_k$ that minimises $\text{opt}(i - v_k)$.

Then $\text{pred}(i)$ records **which coin** was used last in the optimal solution for total amount $i$.


1. Start with $C$.  
   The coin $\text{pred}(C)$ was used in the optimal solution for total $C$.

2. Subtract this coin’s value:  

   $$
   C' = C - \text{pred}(C).
   $$

3. Repeat the process:  
   $\text{pred}(C')$ is a coin used in the optimal solution for amount $C'$,  
   then set  

   $$
   C'' = C' - \text{pred}(C'),
   $$

   and continue until the remaining amount is $0$.

> [!NOTE] Notation
> We denote the $k$ that minimises $\text{opt}(i - v_k)$ by
>
> $$
> \operatorname*{arg\,min}_{1 \le k \le n} \; \text{opt}(i - v_k).
> $$