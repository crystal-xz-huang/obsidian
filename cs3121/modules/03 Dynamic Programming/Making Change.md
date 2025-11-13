---
modules:
  - "[[mocs/Modules/Dynamic Programming|Module 3: Dynamic Programming]]"
categories:
  - "[[Knapsack Problem]]"
tags:
  - topic/dynamic-programming
  - examples
---

# Making Change

> Choosing the fewest coins to make a given amount of money
> One Parameter, Linear Recurrence

The [change-making problem](https://en.wikipedia.org/wiki/Change-making_problem) finds the minimum number of coins (of certain denominations) that add up to a given amount of money.

This is a variation of the [[Knapsack Problem]]. But instead of maximising the total value of coins, we want to **minimise the total number of coins**. 

It is weakly NP-hard, but may be solved optimally in pseudo-polynomial time by dynamic programming.

> [!problem]
> Given a set of $n$ integers values (coin denominations) arranged in increasing order from $v_1$ to $v_n$
> $$\{v_1, v_2, \dots, v_n\}, \quad v_1 <v_2 < \dots <v_n$$ 
> and an integer (target) amount $C$.
> 
> You can take each coin $v_i$ any (integer) number of times.
> 
> <b>Task:</b> Choose a combination of coins to make change for $C$ using a few coins as possible. In other words, find the set of coins whose total value is equal to $C$ while minimising the total number of coins used.

Formally:

- minimise $\displaystyle \sum_{j=1}^n x_j$ (the total number of coins)
- subject to $\displaystyle \sum_{i=1}^n x_i \; v_i = C$ (the total sum of coins must equal to amount C)

where $x_i$ is the number of coins with value $v_i$ to include.


## Problem

> [!problem]
> <b>Instance:</b> You are given $n$ types of coin denominations of integer values $v_1 <v_2 <…<v_n$.
> 
> Assume $v_1 = 1$ (so that you can always make change for any integer amount) and that you have an unlimited supply of coins of each denomination.
> 
> <b>Task</b>: Make change for a given integer amount $C$, using as few coins as possible.

- **Denomination** means the **value of a coin** e.g. 5¢, 10¢ and 25¢ coins = $\{ 5, 10, 25\}$
- Assume that the smallest value of coin is 1¢ 
- For example, how do we give someone 95¢ in change using as few coins as possible?
	- 50¢ + 2 × 20¢ + 5¢
- The optimal solution is the one with the fewest number of coins, so the goal is to **minimise** the number of coins we choose.

## Methods of Solving

### Greedy Algorithm

> [!answer] Greedy Choice
> Greedily take as many coins of value $v_n$ as possible (which is not greater than the remaining amount of change to make), then $v_{n−1}$, and so on.

- The greedy approach is to always take the largest value coin that fits within the total.
- This approach is very tempting, and works for almost all real-world currencies.
- However, it doesn’t work for all sequences. In general, we will need to use DP.

> [!example] Counterexample for Greedy
> For instance, consider coin denominations of 5, 10, 20 and 25.
> Then to make change for 40 cents, the greedy algorithm would choose three coins (25, 10, 5) whereas the optimal solution is two coins (20, 20).
> 
> Another example is to make 40 cents using denomination 25, 10, 1. 
> The greedy chooses seven coins (25, 10, and 5 × 1), but the optimal is four (4 × 10).

### Dynamic Programming

- We will try to find the optimal solution for not only $C$, but every amount up to $C$. That is, we will solve for each amount up to $C$. 
	- Each subproblem solves the problem for amounts $i \leq C$ 
	- This is the **bottom-up** approach: solve the problem for smaller amounts first (base cases) up to the final amount C. 
	- This builds the final solution iteratively for each $0, 1, 2, \dots, C$ such that each subproblem "adds" to the answer from the previous one.
- Assume we have found optimal solutions for every amount $j < i$ and now want to find an optimal solution for amount $i$.
- We consider each coin $v_k$ as part of the solution for amount $i$, and make up the remaining amount $i − v_k$ with the previously computed optimal solution.
- Among all of these optimal solutions, which we find in the table we are constructing recursively, we pick one which uses the fewest number of coins (minimisation).
- Supposing we choose coin $k$, we obtain an optimal solution $\text{opt}(i)$ for amount $i$ by adding one coin of denomination $v_k$ to $\text{opt}(i − v_k)$.
- If the amount to be made is zero, then the solution is trivial: use no coins. This is the base case.

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

> [!important]
> 
> This is considered to be a **pseudopolynomial** time algorithm, <u>not</u> a polynomial time algorithm.
> 
> We always determine whether an algorithm runs in polynomial time with reference to the **length** of the input.
> 
> - In this case, the input is $n$, the coin values and $C$, so the number of bits required to communicate it is $O(n \log C)$. 
> - On the other hand, the algorithm runs in $O(nC)$, so the running time is <u>exponential</u> in the length of the input.
> 
> There is no known polynomial time algorithm for this problem!

---

## Developing the solution

> [!problem] Problem Recap
> <b>Input:</b>
> - Coin denominations: $v_1 < v_2 < \dots < v_n$
> - Target amount: $C$
> - Unlimited supply of each coin
> 
> <b>Goal:</b> Make change for $C$ using the fewest number of coins

### Step 1. Identify the optimal substructure

Suppose we already have an optimal set of coins that makes change for (adds up to) the some target amount $C$. 

Consider the last choice we made: the last coin denomination used $v_k$.
**
If the optimal solution for $C$ uses coin $v_k$ as the last coin, then before adding that coin, we must have made change for the amount $C - v_k$. 

We don't know the last coin $v_k$ that was used (since we can take 0 or more of any coin). Therefore we consider all possible optimal solutions that make change for the amount $C-v_k$ and take the one with the minimum number of coins ⇒ this is the recursive part.

Finally, we can only include coin $v_k$ if adding it to $C - v_k$ does not exceed the current amount $C$ since we need to make change for the exact amount. Therefore, the requirement is $C - v_k \geq 0 \implies C \geq v_k$.

> [!tldr]
> The optimal structure is:
> 
> $\textsf{NumCoins}(C)$ = minimum number of coins needed to make change for amount $C$.
> 
> - **Case 1:** OPT for amount C uses a coin of denomination $v_k$.
> 	- Remaining amount is $C-v_k$
> 	- OPT must include the optimal solution to make change for this remaining amount.
> 	- First, we need to consider all possible ways to make change for the amount $C-v_k$ using each coin denomination $v_k$ in $\{v_1, v_2, \ldots, v_n \}$ if adding it does not exceed the current amount $C$.
> 	- Then we take the one that uses the fewest amount of coins.
> - **Case 2:** OPT does not use a coin of denomination $v_i$.
> 	- If $v_k \leq C$ then adding it while exceed the target amount $C$. 
> 	- OPT considers smaller denominations instead ${v_1, v_2, …, v_{k-1}}$.

### Step 2. Defining the subproblems

Based on the above, our optimal substructure suggests that the subproblems involve considering a *smaller amount C* and considering one fewer coin. 

Define the subproblems as $\textsf{NumCoins}(C) = 1 + \textsf{NumCoins}(C - v_k)$.

That is, we are recursively considering one less coin in the solution for C.

Now, consider the coin denominations $1, 3, 4$ with the target amount $C = 6$.

- $\textsf{NumCoins}(6) = 1 + \min({\color{pink} \textsf{NumCoins}(6-1)}, \textsf{NumCoins}(6-3), \textsf{NumCoins}(6-4))$
- which depends on ${\color{pink}\textsf{NumCoins}(5)} = 1 + \min(\textsf{NumCoins}(4), \textsf{NumCoins}(2), \textsf{NumCoins}(1))$
- and so on … 
- until $\textsf{NumCoins}(0)$ which is the base case

This is a top-down approach that takes exponential time because we recompute the values for the smaller amounts each time. Instead, we should use the **bottom-up** approach: start from the base cases (the smallest subproblem) and solve for increasing amounts up until the final target value $C$. 

> [!observation]
> The subproblems $\textsf{NumCoins}(0), \textsf{NumCoins}(1),…$ must be computed before $\textsf{NumCoins}(C).$

### Step 3. Deriving a recurrence

We want to break the problem (make change for $C$) into smaller ones (make change for smaller amounts). 

Let $\textsf{NumCoins}(i)$ be the fewest coins to make change for amount $i$ for each $0 \le i \le C$.
So our subproblems are the amounts $0, 1, 2, \dots, C$.

To make change for amount $i$, we can pick one coin of denomination $v_k$, and then we need to make change for the *remaining* amount $(i - v_k)$.

So, if we choose coin $v_k$, the total number of coins will be:

$$
1 + \textsf{NumCoins}(i - v_k)
$$

We can try this for each coin where $v_k \le i$, and take the minimum.

Hence the recurrence is for all $i > 0$, compute

$$\textsf{NumCoins}(i) = 1 + \min_{\substack{1 \leq k \leq n \\\\ v_k \leq i}} \textsf{NumCoins}(i - v_k)$$

with the base case $\textsf{NumCoins}(0) =0$ because no coins are needed to make 0.

After solving subproblems $\textsf{NumCoins}(i)$ in increasing order of $i$, the final solution is at $\textsf{NumCoins}(C)$. 

Therefore, there are $O(C)$ subproblems, each taking $O(n)$ time since we consider all $n$ coin denominations for each subproblem to take the one with fewest coins, for a total complexity of $O(n \times C)$. 

---

### Proof of Correctness

#### Proof Outline

Why this recurrence produce an optimal solution for each amount $i \le C$?

1. Consider an optimal solution for some amount $i$, and suppose this solution includes at least one coin of denomination $v_k$ for some $1 \le k \le n$.
2. Removing this coin must leave an optimal solution for the amount $(i - v_k)$. 
  This can be proven by **contradiction**. 
3. By considering all coins of value at most $i$, we can pick $k$ for which the optimal solution for amount $i − v_k$ uses the fewest coins.


For example:

- \[ 1. Goal \] We will show that if $S_i = \{…,v_k\}$ is an optimal solution for amount $i$, then removing the last coin $v_k$ produces an optimal solution $S_i \setminus \{v_k\}$ for the amount $(i - v_k)$. This demonstrates the *optimal substructure* property: every optimal solution for amount $i$ can be constructed by adding one coin $v_k$ to an optimal solution for a smaller amount $i-v_k.$ 
- \[ 2. Proof \] Suppose for contradiction that $S_i\setminus \{v_k\}$ is **not optimal**. Then there exists another (more optimal) solution $T_{i-v_k}$ that makes change for $(i - v_k)$ using **fewer coins**. 
- By adding one coin of denomination $v_k$ to $T_{i-v_k}$, we would then obtain another valid solution $T_i = T_{i-v_k} \cup \{ v_k \}$ that also makes change for amount $i$ and uses fewer coins that $S_i$, thus contradicting the optimality of $S_i$ (i.e. contradicting our assumption that the original solution $S_i$ for amount $i$ was optimal).
- Hence, any optimal solution for amount $i$ can be constructed by **adding one coin** $v_k$ to an optimal solution for amount $(i - v_k)$. 
- \[ 3. Generalisation \] By considering all possible coin denominations $v_k \le i$ and taking the one that uses the fewest coins for $i \leq C$, we obtain
$$
\textsf{NumCoins}(i) = 1 + \min_{v_k \leq i} \textsf{NumCoins}(i - v_k).
$$

Thus, our recurrence correctly computes the optimal (minimal) number of coins for every amount $i \leq C$.

---

## Extension: Recovering the actual coins used

> [!problem]
>  Suppose we were required to also determine the exact number of each coin required to make change for amount $C$.

In the $i$-th slot of the DP table, we store both:

- $\textsf{opt}(i)$ — the fewest coins needed to make amount $i$, and  
- $\textsf{pred}(i)$ — the denomination $v_k$ that minimises $\textsf{opt}(i - v_k)$.

Then $\textsf{pred}(i)$ records **which coin type** $k = \textsf{pred}(i)$ was used last in the optimal solution for amount $i$. 


1. Start with $C$.  
   The coin denomination $\textsf{pred}(C)$ was used in the optimal solution for total amount $C$.

2. Subtract this coin’s value from the total amount:  

$$C' = C - \textsf{pred}(C).$$

3. Repeat the process:  
   $\textsf{pred}(C')$ is a coin used in the optimal solution for the remaining amount $C'$,  
   then set the remaining amount $C'' = C' - \textsf{pred}(C'),$ 
   
   and continue until the remaining amount is $0$.

> [!function] Notation
> We denote the $k$ that minimises $\textsf{opt}(i - v_k)$ by
>
> $$
> \operatorname*{arg\,min}_{1 \le k \le n} \, \textsf{opt}(i - v_k).
> $$