---
cssclasses: 
---

### Whitespace Insertion

***WhitespaceInsertion***

You are emailed a text file containing important meeting notes. Unfortunately, the text file was corrupted and all of the white spaces of the text file has been removed. Therefore, all you see in the text file is a string of characters without any spaces. Fortunately, your company is very good at keeping tabs with words that are mentioned during meetings and have devised a lookup function. The lookup function acts as an oracle, and returns “true” if and only if the string is a valid word; that is, given a word $w$, $\textsf{lookup}(w)$ returns True if and only if $w$ is a valid word.

Given a string $s$ of $n$ characters, design an $O(n^2)$ algorithm that determines whether $s$ forms a valid text by placing spaces in between characters to form a string of valid words.

***Solution.***

For each $0 \le i \le n$, let $\textsf{Insert}(i)$ denote whether it is possible to add spaces between the first $i$ characters of $s$ to form a valid string, where $\textsf{Insert}(0) = \text{True}$. This gives rise to the natural final solution obtained at $\textsf{Insert}(n)$. The subproblem satisfies the following recurrence:

$$
\textsf{Insert}(i) =
\bigvee_{k=0}^{i-1}
\big[
\textsf{Insert}(k) \wedge \textsf{Lookup}(s[(k+1)..i])
\big].
$$

We fill the dynamic programming table in increasing order of $i$ and return $\textsf{Insert}(n)$.

**Correctness.**

Assume that all previous subproblems have been solved correctly; that is, assume that $\textsf{Insert}(0), \textsf{Insert}(1), \ldots, \textsf{Insert}(i-1)$ all return the correct answer for their respective subproblem. We now consider the string $s[1..i]$. If $s[1..i]$ is a valid word, then $\textsf{Insert}(0) \wedge \textsf{Lookup}(s[1..i])$ will return True. Now, assume that $s[1..i]$ is not a valid word. If $s[1..i]$ is a string formed by valid words, then there exist a set of spaces $\{i_1, \ldots, i_k\}$ such that $s[1..i_1], s[(i_1+1)..i_2], \ldots, s[(i_k+1)..i]$ all form valid words. Then $\textsf{Insert}(i_k)$ will return True and $\textsf{Lookup}(s[(i_k+1)..i])$ will also return True. Therefore, the recurrence will return True. Conversely, if $s[1..i]$ is not a valid string, then no set of spaces exist, in which case the recurrence returns False.

**Time complexity.**

There are $O(n)$ subproblems and each subproblem can be solved in $O(n)$ time; therefore, the running time of the dynamic programming solution is $O(n^2)$.

##### Notation
In the recurrence

$$\boxed{
\textsf{Insert}(i) =
\bigvee_{k=0}^{i-1}
\big\{
\textsf{Insert}(k) \wedge \textsf{Lookup}(s[(k+1)..i])
\big\}
}
$$

the _wedge_ ( ∧ ) and _vee_ ( ∨ ) symbols come from **propositional logic** and represent logical conjunction and disjunction:

- **∧ (“wedge”)** means **AND**
	- So $$\textsf{Insert}(k)  \wedge \textsf{Lookup}(s[(k+1)..i])$$ is *True* only if both subconditions are true — that is, if:
		1. the prefix up to position $k$ can be split into valid words, and
		2. the substring $s[(k+1)..i]$ is itself a valid word.

- **∨ (“vee”)** means **OR**
	- So $$\bigvee_{k=0}^{i-1} \{ \dots \}$$ means “the logical **OR** of all these bracketed expressions” for every *k* from $0$ to $i − 1$. 
	> In words: $\textsf{Insert(i)}$ is *True* if there exists *some* $k$ such that $\textsf{Insert}(k)$ is True and $s[(k+1)..i]$ is a valid word.

---

### Restaurant Acquisition

***RestaurantAcquisition***

There are $n$ restaurants lined up in a row. The $i$th restaurant has size $S[i]$. The goal is to merge these restaurants together such that the final restaurant is a single large restaurant. However, you can only merge restaurants in the following manner:
- You can only merge two adjacent restaurants at a time, so that the new restaurant is the physical union of two buildings.
- The size of the new restaurant is the sum of the two restaurants being merged.
- The cost of a merge is equal to the size of the larger restaurant.

The total cost of a sequence of merges is the sum of the costs of the individual merges.

**(a)** Let $S$ be an array of $n$ elements. Implement the function $\textsf{Range}(i, j)$ that computes the value

$$
\textsf{Range}(i, j) = S[i] + \cdots + S[j].
$$

Your implementation should take $O(n)$ time, so that $\textsf{Range}(i, j)$ can be called in $O(1)$ time.
 
**(b)** Hence, design an $O(n^3)$ algorithm that computes the minimum total cost of creating one large restaurant from the original $n$ restaurants.

***Solution.***

**(a)** We can define an array $A$ of length $n$, where

$$
A[k] = \sum_{i=1}^{k} S[i].
$$

We can obtain the array $A$ in $O(n)$ time by noting that

$$
A[k] = \sum_{i=1}^{k} S[i] = \Bigg(\sum_{i=1}^{k-1} S[i]\Bigg) + S[k] = A[k - 1] + S[k];
$$

therefore, once we obtain $A[k − 1]$, we can obtain $A[k]$ in constant time. We can, then, compute $\textsf{Range}(i,j)$ in $O(1)$ time, but noting that

$$
\begin{aligned}
\textsf{Range}(i, j) = S[i] + \cdots + S[j] 
&= (S[1] + \cdots + S[j]) - (S[1] + \cdots + S[i - 1]) \\
&= \sum_{k=1}^{j} S[k] - \sum_{k=1}^{i-1} S[k] \\
&= A[j] - A[i - 1].
\end{aligned}
$$

**(b)** As per part (a), we first compute $\textsf{Range}$ in $O(n)$ time, so for the rest of the algorithm, assume that we can retrieve $\textsf{Range}(i, j)$ in constant time. 

- **Subproblem.** For each $0 \le i \le j \le n$, let $C(i, j)$ denote the minimum total cost to merge restaurants $i$ to $j$. 
- **Recurrence.** Now, if we need to finally merge all restaurants from $i$ to $j$, then we need to figure out which restaurant we decide to partition since the cost of merging two restaurants amount to the size of the larger restaurant (i.e. merging restaurants $A$ and $B$ has cost $\max\{S[A], S[B]\}$). Therefore, if restaurant $A$ has size $S[i] + S[i + 1] + \cdots + S[k]$ and restaurant $B$ has size $S[k + 1] + S[k + 2] + \cdots + S[j]$, then the cost of merging restaurants $A$ and $B$ is

$$
\max\{S[i] + \cdots + S[k],\; S[k + 1] + \cdots + S[j]\}.
$$

We minimise this over all of the possible partitions, giving us the recurrence:

$$
\begin{aligned}
C(i, j)
= \min_{i \le k < j} \big( C(i, k) + C(k + 1, j) + \max\{\textsf{Range}(i, k), \textsf{Range}(k + 1, j)\} \big).
\end{aligned}
$$

- **Base case.** For each $1 \le i \le n$, we note that $C(i, i)$ is the total cost of merging restaurant $i$ with itself; therefore, $C(i, i) = 0$.
- **Final solution.** The final solution is $C(1, n)$ and the order of evaluation is in increasing order of $j - i$.
- **Time complexity.** We first perform an $O(n)$ amount of work in the preprocessing step to obtain $\textsf{Range}(i, j)$ for each $1 \le i \le j \le n$. In the actual dynamic programming solution, we obtain $O(n^2)$ many subproblems and each subproblem takes $O(n)$ to compute; therefore, the overall time complexity is $O(n) + O(n^3) = O(n^3)$.

----

### Integer Complexity

***IntegerComplexity***

Given a positive integer $n$, the complexity of $n$ is the minimum number of ones that can be used to represent $n$, using only the operations of addition and multiplication, as well as parenthesisation.

**(a)** Show that every positive integer can be represented by a string of ones, along with addition, multiplication, and parenthesisation operations; that is, the complexity of $n$ is always finite.

**(b)** Given a positive integer $n$, describe an $O(n^2)$ algorithm to compute the minimum number of ones (1’s) using only the operations of addition and multiplication, as well as parentheses, whose expression equals $n$.

> **Note.** This is also known as the Mahler-Popken complexity. 

***Solution.***

**(a)** Each positive integer can be represented by a sum of $n$ ones. Therefore, the integer complexity of $n$ is at most $n$, which is finite.

**(b)** For each $1 \le i \le n$, let $\textsf{IntComp}(i)$ denote the minimum number of ones such that any expression involving addition and multiplication equates to $i$. The subproblem satisfies the following recurrence:

%% $$
\textsf{IntComp}(i) =
\min \Bigg\{
\min_{1 \le d < i} \big\{\textsf{IntComp}(d) + \textsf{IntComp}(i - d)\big\},
\;
\min_{\substack{1 \le d < i \\ d \mid i}} \big\{\textsf{IntComp}(d) + \textsf{IntComp}(i / d)\big\}
\Bigg\}.

$$ %%

$$

\textsf{IntComp}(i) =
\min \Bigg\{
\begin{align}
&\min \{ \textsf{IntComp}(d) + \textsf{IntComp}(i - d) 
: 1 \le d < i \},
\\
&\min \{ \textsf{IntComp}(d) + \textsf{IntComp}(i / d) 
: 1 \le d < i, \ d \mid i \}
\end{align}
\Bigg\}.

$$

The base case occurs at $i = 1$ with $\textsf{IntComp}(1) = 1$, and define $\textsf{IntComp}(j) = 0$ for all non-integers $j$. The final solution is returned by $\textsf{IntComp}(n)$, where we fill the dynamic programming table in increasing order of $i$.

**Correctness.**

Assume that all previous subproblems have been correctly solved; that is, we assume that $\textsf{IntComp}(1), \ldots, \textsf{IntComp}(i - 1)$ all return the correct answer for their respective subproblems. We now consider any expression of ones that equates to $i$. In any expression, there exists a top-level last operation. Such an operation splits the expression into two halves. We now consider the two cases separately.

- Suppose that the top-level operation is $+$. Then for some $d \in \{1, \ldots, i - 1\}$, we can write the expression as a sum of ones that equate to $d$ and $(i - d)$. The minimum number of ones in such an expression is given by the sum of the minimum number of ones in both halves. By the inductive hypothesis, the minimum number of ones in an expression that equate to $d$ is given by $\textsf{IntComp}(d)$ and the minimum number of ones in an expression that equate to $(i - d)$ is equal to $\textsf{IntComp}(i - d)$. Therefore, the minimum number of ones in this case is equal to $\textsf{IntComp}(d) + \textsf{IntComp}(i - d)$. Therefore, if the top-level operation is a $+$, then the minimum number of ones is given by the $d$ which minimises this sum.

- Suppose that the top-level operation is $\times$. By a similar reasoning, for some $d \in \{1, \ldots, i - 1\}$, we can split the expression into a sequence of ones that equate to $d$ and a sequence of ones that equate to $i / d$, where $d \mid i$. Again, by the inductive hypothesis, the minimum number of ones in an expression that equate to $d$ is given by $\textsf{IntComp}(d)$ and the minimum number of ones in an expression that equate to $i / d$ is equal to $\textsf{IntComp}(i / d)$. Therefore, the minimum number of ones in this case is equal to $\textsf{IntComp}(d) + \textsf{IntComp}(i / d)$. Therefore, if the top-level operation is a $\times$, then the minimum number of ones is given by the $d$ which minimises this sum.

In all, the minimum number of ones is given by the minimum of the two cases, which proves the correctness of the recurrence.

**Time complexity.**

There are $O(n)$ subproblems and each subproblem is solved in $O(n)$ time. Therefore, the time complexity is $O(n^2)$.

---

