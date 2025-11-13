---
categories:
  - "[[Divide and Conquer]]"
tags:
  - topic/divide-and-conquer
  - notes/theory
status: open
---

# Recurrences

Recurrences are important to us because they arise in estimations of time complexity of divide-and-conquer algorithms. 

## Introduction

Consider a problem that can be solve using a recursive algorithm as follows:

```python
procedure p(input x of size n):
    if n < some constant k:
        Solve x directly without recursion
    else:
        Create a subproblems of x, each having size n/b
        Call procedure p recursively on *each* subproblem
        Combine the results from the subproblems
```

The algorithm divides the problem into a number ${\color{red}a}$ of subproblems recursively, each subproblem being of size ${\color{red}n / b}$. The factor by which the size of subproblems is reduced ($\color{red}{b}$) does not need to be the same as the number of subproblems (${\color{red}a}$). 

> For example, in binary search we divide the problem into two halves ($b=2$) but we only recursively search one half of the subproblem ($a=1$ ).

The runtime of an algorithm such as the one above on an input of size $n$, usually denoted $T(n)$, can be expressed by the recurrence relation

$$
T(n) = a\,T\!\left(\frac{n}{b}\right) + f(n),
$$

where $f(n)$ is the time to create the subproblems and combine their results in the above procedure. 

The **Master Theorem** allows many recurrence relations of this form to be converted to Θ-notation directly, without doing an expansion of the recursive relation.

## Framework

> [!example] 
> Recurrence relation for [[Counting the Number of Inversions|counting inversions]]
> - Recall that counting inversions in an array $A$ of size $n$ required us to: 
> 	- recurse on each half of the array ($A_{\text{lo}}$ and $A_{\text{hi}}$), and 
> 	- count inversions across the partition, in linear time. 
> - Denote the running time for an array of size $n$ by $T(n)$. 
>
> - Then the running time $T(n)$ satisfies $$T(n) = 2T\left(\frac{n}{2}\right) + c \cdot n$$

 for some constant $c$.

The recurrence $T(n) = 2\,T\!\left(n/2\right) + n$ corresponds to an algorithm that made two recursive calls on subproblems of size $n/2$, and then did $n$ units of additional work.

#### General recurrence relation for divide-and-conquer algorithms

- Let $a \ge 1$ be an integer and $b > 1$ be a real number, and suppose that a divide-and-conquer algorithm 
	- reduces an instance of size $n$ to $a$ instances of size $n/b$, 
	- with overhead cost of $f(n)$ to split up the instance and combine the solutions from these smaller instances. 
- Then the time complexity of such an algorithm satisfies 

$$\large T(n) = a\,T\!\left(\frac{n}{b}\right) + f(n).$$

where
- $a$ is the number of subproblems created each time
- $b$ is the size of the subproblems we recurse onto
- $f(n)$ is the cost to divide and combine per level

> [!aside]-
>
> Technically, we should be writing $$T(n) = a\,T\left(\left\lceil \frac{n}b \right\rceil\right) + f(n)$$
>
> but it can be shown that the same asymptotics are achieved if we ignore the rounding and additive constants.

> [!summary]-
>  Recall how a divide-and-conquer algorithm works:
> 
> 1. **Divide:** split a problem of size $n$ into smaller subproblems.
> 2. **Conquer:** solve those subproblems recursively.
> 3. **Combine:** merge the sub-results into one overall answer.
> 
> The recurrence breaks that total time $T(n)$ into those parts:
> 
> | Symbol | Meaning                                                      | Examples                                  |
> | :------ | :----------------------------------------------------------- | :------------------------------------------------------ |
> | $a$     | **Number of subproblems** created each time                  | mergesort → 2 halves → $a = 2$                          |
> | $b$     | **Factor by which subproblem size shrinks**                  | mergesort splits in half → $b = 2$                      |
> | $n/b$   | **Size** of each smaller subproblem                          | if $n = 8$, $b = 2$, each subproblem has size 4         |
> | $f(n)$  | **Extra work** done outside recursion (dividing + combining) | splitting and merging cost, or pivot partitioning, etc. |
> | $T(n)$  | **Total cost** to solve a problem of size $n$                | what we want to find asymptotically                     |

## Solving Recurrences

> How do we solve these recurrences of the form $T(n) = a\,T\!\left(\frac{n}{b}\right) + f(n)$ to get asymptotic $\Theta$-, $O$-, or $\Omega$-bounds on the runtime (like $T(n) = O(n \log n)$)?

Some recurrences can be solved explicitly, but this tends to be tricky. Fortunately, we <u>do not</u> need the exact solution of a recurrence to discuss the efficiency of an algorithm.  

We only need to find:  
- the <u>growth rate</u> of the solution, i.e., its <u>asymptotic behaviour</u>, and  
- where relevant, the (approximate) <u>sizes of the constants</u> involved.  

This is what the **Master Theorem** provides, when it is applicable.  

### Recursion Trees

A recursion tree is a tree where each node represents the cost of a certain recursive subproblem. Then you can sum up the costs in each node to get the cost of the entire algorithm.

A *recursion tree* is useful for visualizing what happens when a recurrence is iterated. It diagrams the tree of recursive calls and the amount of work done at each call.

> [!example]-
> For instance, consider the recurrence
>
> $$T(n) = 2T(n/2) + n^2$$
>
> The recursion tree for this recurrence has the following form:
> 
> ![](https://www.cs.cornell.edu/courses/cs3110/2012sp/lectures/lec20-master/images/lec19-diagram2.png)
> The root node has a cost of $n^2$ at the top level of recursion, and the two subtrees of the root represent the costs incurred by the smaller subproblems of size $n/2$.
> 
> In this case, it is straightforward to sum across each row of the tree to obtain the total work done at a given level. This a geometric series, thus in the limit the sum is $\Theta(n^2)$.
> 
> Let's consider another example,
>
> $$T(n) = T(n/3) + T(2n/3) + n$$
>
> Expanding out the first few levels, the recurrence tree is:
> 
> ![](https://www.cs.cornell.edu/courses/cs3110/2012sp/lectures/lec20-master/images/lec19-diagram3.png)
> 
> Note that the tree here is *not balanced*: the longest path is the rightmost one, and its length is $\log_{3/2}n$. Hence our guess for the closed form of this recurrence is $\Theta(n \log n)$.

> [!example]-
> Consider the recurrence
>
> $$T(n) = 3T(n/4) + \Theta(n^2)$$
>
> We can write the recursion tree for $T(n) = 3T(n/4) + cn^2$ where the constant $c>0$ is the upper-bound constant in the $\Theta(n^2)$ term.
> 
> ![[recursion-tree.png]]
> 
> 1. The root node at the top has cost $cn^2$, because the first call to the function does $cn^2$ units of work to *divide (split)* the problem into subproblems of size $n/4$, aside from the *combining* work done inside the recursive subcalls.
> 2. The cost for all three children of the root is $c(n/4)^2$, because the functions are now being called on problems of size $n/4$ and the functions are doing $c(n/4)^2$ units of work etc.
> 3. Because subproblem sizes decrease by a factor 4 of every time we go down one level, the recursion eventually bottoms out when the subproblem size hits $n=1$ (base case). The bottom level (base case) is special because each of them contribute $T(1) = \Theta(1)$ to the cost. 
> 
> <b>Analysis:</b> 
> 
> First we find the height of the recursion tree. 
> 
> - Observe that a node at depth $i$ reflects a subproblem of size $n/(4^i)$.
> - The subproblem size hits $n=1$ when $n/(4^i)$, or equivalently, when $i= \log_4 n$. 
> - So the tree has internal nodes at depths $0,1,2,…, \log_4{n-1}$ and leaves at depth $\log_4 n$.
> - Therefore the tree has $\log_4 n + 1$ levels.
> 
> Now we determine the cost of each level of the tree. 
> 
> - The number of nodes at depth $i$ is $3^i$ for the recursive split into three subproblems.
> - Each node at depths $i = 0,1,…, \log_4{n-1}$ has a cost of $c(n/4^i)^2$.
> - So the total cost of level $i$ is $3^i \times c(n/4^i)^2 = (3/16)^i cn^2$. 
> - However, the bottom level $\log_4 n$ is special. Each of the bottom nodes contribute cost $T(1)$ and there are $3^{\log_4 n} = n^{\log_4 3}$ of them. 
> 
> Adding the costs over all levels, the total cost of the entire tree is
> 
> ![[recursion-tree-cost.png]]
> 
> The coefficients of $cn^2$ on line 2 is just the sum of a geometric series. So the sum of these coefficients is bounded from above by the constant $16/3$. Since the root contributes $cn^2$ to the total cost, the cost of the root dominates since functions in $\Theta(n^{\log_4 3})$ are also in $O(n^2)$. Therefore we can **guess** that $T(n) = O(n^2)$.


### Understanding the Master Theorem

The **master theorem** provides a solution to recurrences of the form

$$
T(n) = a\,T\!\left(\frac{n}{b}\right) + f(n),
$$  

for constants $a \ge 1$ and $b > 1$ with $f(n)$ asymptotically positive. (Asymptotically positive means that the function is positive for all sufficiently large $n$.)

> Recall: This recurrence describes an algorithm that divides a problem of size $n$ into $a$ subproblems, each of size $n/b$, and solves them recursively.

The master theorem tells you where most of the time is spent — at the **top** of the recursion (root), **bottom** (leaves), or **evenly across all levels**.

![[general-recurrence-formula.png]]

![|300](https://image1.slideserve.com/3197542/recurrence-master-theorem-l.jpg)

The number of leaves $n^{\log_b a}$ is called the **critical term** — it tells you approximately how much total work the recursive part does if each leaf takes constant time.

#### Simple Explanation

First, consider an algorithm with a recurrence of the form:

$$
T(n) = a\,T\!\left(\frac{n}{b}\right),
$$

where $a$ represents the number of children (subproblems) each node has, and the runtime of each of the $a$ initial nodes is the runtime of $T(n/b)$.

The total cost of this recurrence is the sum of of the time taken at each level.


|                    ![[general-recurrence-tree.png\|500]]                     |
| :-: |
| Recurrence tree for the general form $T(n) = a\,T\!\left(\frac{n}{b}\right) + f(n)$ |


The tree has a depth of $\log_b n$ and depth $k$ contains $a^k$ nodes. So there are $a^{\log_b n} = n^{\log_b a}$ leaves, and hence the runtime is $\Theta\!\left(n^{\log_b a}\right)$.

The cost of the recursion $T\!\left(\frac{n}{b}\right) =\Theta\!\left(n^{\log_b a}\right)$ so it is dependent on the number of leaves $n^{\log_b a}$ — the critical exponent.

Intuitively, the master theorem argues that if an asymptotically positive function $f$ is added to the recurrence so that we have 

$$T(n) = a\,T\!\left(\frac{n}{b}\right) + f(n),$$

it is possible to determine the asymptotic form of $T$ based on a relative comparison between $n^{\log_b a}$ and $f$.

> [!theorem] Master Theorem
> Given a recurrence of the form  
>
> $$
> T(n) = a\,T\!\left(\frac{n}{b}\right) + f(n),
> $$  
>
> for constants $a \ge 1$ and $b > 1$ with $f(n)$ asymptotically positive, the following statements are true:
> 
> **Case 1.** If $f(n) = O\!\left(n^{\log_b a - \varepsilon}\right)$ for some $\varepsilon > 0$, then $T(n) = \Theta\!\left(n^{\log_b a}\right).$
> 
> **Case 2.** If $f(n) = \Theta\!\left(n^{\log_b a}\right)$, then $T(n) = \Theta\!\left(n^{\log_b a} \log n\right).$
> 
> **Case 3.** If $f(n) = \Omega\!\left(n^{\log_b a + \varepsilon}\right)$ for some $\varepsilon > 0$ **and** if $a\,f(n/b) \le c\,f(n)$ for some constant $c < 1$ for all sufficiently large $n$, then $T(n) = \Theta\!\left(f(n)\right).$

Simply put, 

1. If $f(n)$ is polynomially smaller than $n^{\log_b a}$, then $n^{\log_b a}$ dominates, and the runtime is $\Theta\!\left(n^{\log_b a}\right)$.  
2. If $f(n)$ is instead polynomially larger than $n^{\log_b a}$, then $f(n)$ dominates, and the runtime is $\Theta\!\left(f(n)\right)$.  
3. Finally, if $f(n)$ and $n^{\log_b a}$ are asymptotically the same, then $T(n) = \Theta\!\left(n^{\log_b a} \log n\right)$.

Note that the Master Theorem does not provide a solution for all $f$. In particular, if $f$ is smaller or larger than $n^{\log_b a}$ by less than a polynomial factor, then none of the three cases are satisfied.  

For instance, consider the recurrence  

$$
T(n) = 3T\!\left(\frac{n}{3}\right) + n\log n.
$$

In this case, $n^{\log_b a} = n$. While $f$ is asymptotically larger than $n$, it is larger only by a logarithmic factor; it is not the case that $f(n) = O\!\left(n^{\log_b a - \varepsilon}\right)$ for some $\varepsilon > 0$. Therefore, the Master Theorem makes no claim about the solution to this recurrence.

---

#### Detailed Explanation

![algorithm analysis - Clarification of the proof involving the regularity  condition in Master Theorem - Computer Science Stack Exchange](https://i.sstatic.net/NZrdr.png)

We can visualize this as a recurrence tree, where the nodes in the tree have a branching factor of $a$. The top node has work $f(n)$ associated with it, the next level has work $f(n/b)$ associated with each of $a$ nodes, the next level has work $f(n/b^2)$ associated with each of $a^2$ nodes, and so on. At the leaves are the base cases corresponding to some $1 \le n < b$. 

The total time taken is just the sum of the time taken at each level. The time taken at the $k$-th level is $a^k\,f(n/b^k)$, and the total time is the sum of this quantity as $k$ ranges from $0$ to $\log_b n - 1$, plus the time taken at the leaves, which is constant for each leaf times the number of leaves, or $O\!\left(n^{\log_b a}\right)$. 

Thus

$$
T(n) \;=\; \sum_{0 \le k < \log_b n} a^k\,f\!\left(\frac{n}{b^k}\right) \;+\; O\!\left(n^{\log_b a}\right).
$$

What this sum looks like depends on how the asymptotic growth of $f(n)$ compares to the asymptotic growth of the **number of leaves $(n^{\log_b a})$**. 

There are three cases:

**Case 1:** $f(n)$ is $O\!\left(n^{\log_b a - \varepsilon}\right)$. Since the leaves grow faster than $f$, asymptotically all of the work is done at the leaves, so $T(n)$ is $\Theta\!\left(n^{\log_b a}\right)$.

**Case 2:** $f(n)$ is $\Theta\!\left(n^{\log_b a}\right)$. The leaves grow at the same rate as $f$, so the same order of work is done at every level of the tree. The tree has $O(\log n)$ levels, times the work done on one level, yielding $T(n)$ is $\Theta\!\left(n^{\log_b a}\log n\right)$.

**Case 3:** $f(n)$ is $\Omega\!\left(n^{\log_b a + \varepsilon}\right)$. In this case $f$ grows faster than the number of leaves, which means that asymptotically the total amount of work is dominated by the work done at the root node. For the upper bound, we also need an extra smoothness condition on $f$ in this case, namely that $a\,f(n/b) \le c\,f(n)$ for some constant $c < 1$ and large $n$. In this case $T(n)$ is $\Theta\!\left(f(n)\right)$.

#### Lecture Explanation

 ![[general-recurrence-tree.png\|500]]
 
<b>Running time to solve the base cases:</b>
- **What is the depth of the tree?**  
	- Subproblems in level $k$ have size $n / b^k$.  
	- The subproblem size $n / b^k$ becomes $1$ when $k = \log_b n$.[^2]
	- So the tree has height $\log_k n$ and $\log_k n + 1$ levels.
- **How many leaves does the tree have?**  
	- The leaves have size $1$ at depth $k = \log_b n$.
	- There are $a^k$ instances at depth $k$, so the number of leaves is $a^{\log_b n}$, which we can rewrite[^1] as $n^{\log_b a}$.
- **How much time is spent at the leaves?**  
	- Leaf nodes represent base cases, so each takes constant time.
	- There are $n^{\log_b a}$ leaves for a total of $\Theta(n^{\log_b a})$.

<b>How does the running time at the other levels compare?</b>

As we go down the tree:  
- the number of instances (subproblems) grows exponentially, increasing by a factor of $a$ at each level, but  
- the size of those sub-instances shrinks exponentially, decreasing by a factor of $b$ at each level.  

There are three main cases:

1. If branching by a factor of $a$ outweighs the time saved by solving smaller instances, then nearly all the work is done in the **leaves**.  
2. If the costs of branching and smaller instances are about equivalent, then **each level** requires about the same amount of work.  
3. If branching is outweighed by the reduction in instance size, then nearly all the work is done at the **root**.




## Further Reading & Resources

- [Master Theorem | Brilliant Math & Science Wiki](https://brilliant.org/wiki/master-theorem/)
- [Lecture 20: Recursion Trees and the Master Method](https://www.cs.cornell.edu/courses/cs3110/2012sp/lectures/lec20-master/lec20.html)


[^1]: To prove this, take $\log_b$ of both expressions and use the rule $\log_x y^z = z \log_x y$.

[^2]: As we descend the tree, the subproblem sizes $n$ decrease by a factor of $b$ each level $k$ so the subproblem size for a node at depth $k$ is $(n/b^k)$. At the last level of the recursion, the leaves all have sizes $n/b^k = 1$ (base cases), or equivalently, $k= \log_b n$. 
