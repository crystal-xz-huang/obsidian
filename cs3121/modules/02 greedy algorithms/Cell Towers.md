## Problem

![[wk2-cell-towers.png]]

> [!goal] Objective
> *Minimize* the number of cell towers to cover all houses. Range of a tower: 5km.

## Greedy Solution

Process houses west → east.  

1. Place the first tower 5 km east of the first house.  
2. Continue until reaching a house not covered by this tower.  
3. Place another tower 5 km east of that house.  
4. Repeat until all houses are covered.  

At each house, we only need to decide whether or not to place a new tower.  

- This can be done in $O(1)$ by referring to the last placed tower. 
- Therefore, total time is $O(n)$ if houses are sorted, or $O(n \log n)$ otherwise.  

### Proof of Correctness

Where the exchange argument is akin to proof by contradiction, greedy stays ahead is more similar to proof by induction.

### Greedy Stays Ahead

> [!goal] Claim
> For all $k$, the $k$th tower in the greedy solution is at least as far east as the $k$th tower in any other placement.  
> 
> > If this is true, then it would be impossible to cover all the houses using fewer towers.  

**Claim:**  
For all $k$, the $k$th tower in the greedy solution is at least as far east as the $k$th tower in any other placement.  

If this is true, then it would be impossible to cover all the houses using fewer towers.  

**Base case ($k=1$):**  
For $k=1$ (the first house):
- Greedy places the first tower 5km east of the first house.  
- If an alternative solution $A$ had the first tower further east, it would not cover this first house.
- But $A$ is a solution, so it must cover all houses. This means the first tower of $A$ cannot be further east than the first tower placed by greedy.
- So the claim is true for $k = 1$.

**Inductive step:**  
Suppose the claim is true for some $k-1$, i.e. $a_{k-1} \leq g_{k-1}$.  
Consider tower $k$:  
- Greedy placed towers at $g_{k-1}$ and $g_k$.  
- By construction of the algorithm, there is a house $h$ with  

$$
g_{k-1} + 5 < h = g_k - 5
$$  

- The alternative solution placed towers at $a_{k-1}$ and $a_k$.  
- Assume $a_k > g_k$. Then  

$$
a_{k-1} + 5 \leq g_{k-1} + 5 < h = g_k - 5 < a_k - 5
$$

- So house $h$ is not covered by $a_{k-1}$ or $a_k$.  
- This contradicts that $A$ is a solution. 
- Therefore, our assumption is false. We must have $a_k \leq g_k$.  

We have proved the claim: 

> For all $k$, the $k$th tower in the greedy solution is at least as far east as the $k$th tower in any other solution.  

We now use this claim to prove that no other solution uses fewer towers than greedy.

**Proof of Optimality**

Suppose greedy uses $r$ towers, placed at $g_1, \dots, g_r$.  

- There is a house $h$ at $g_r - 5$ , which is not covered by the previous tower $g_{r-1}$. 
      Therefore $h > g_{r-1} + 5$.  
- From the induction, for any other placement of $r-1$ towers $a_1, \dots, a_{r-1}$ we have $a_{r-1} \leq g_{r-1}$. 
- Therefore house $h$ cannot be covered in the first $r-1$ towers of <u>any</u> placement of towers.
- So at least $r$ towers are needed. Therefore greedy is optimal.

