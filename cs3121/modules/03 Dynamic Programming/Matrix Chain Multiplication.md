# Matrix Chain Multiplication

## Definitions

### Matrix

**Matrix:** An $n\times m$ matrix $A = [a[i,j]]$  a two-dimensional array:
$$
A =
\begin{bmatrix}
a[1,1] & a[1,2] & \cdots & a[1,m-1] & a[1,m] \\
a[2,1] & a[2,2] & \cdots & a[2,m-1] & a[2,m] \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
a[n,1] & a[n,2] & \cdots & a[n,m-1] & a[n,m]
\end{bmatrix}
$$
which has $n$ rows and $m$ columns.

That is,
$$A = [a[i,j]] \quad \text{for } 1 \le i \le n,\; 1 \le j \le m$$
- $n$ rows indexed by $i$, and
- $m$ columns indexed by $j$.

Each entry $a[i,j]$ represents the element in the $i$-th row and $j$-th column of the matrix.
which has $n$ rows and $m$ columns.

### Matrix Multiplication

Let $A$ and $B$ be matrices.

1️⃣ The matrix product $AB$ exists only if $A$ has as many columns as $B$ has rows: 

- If $A$ is $m \times \boxed{n}$ and $B$ is $\boxed{n} \times p$, then $AB$ is $m \times p$.

> The number of columns in the first matrix must equal the number of rows in the second matrix. The resulting matrix will have the dimensions of the outer numbers ($m$ and $p$) and $m \times p$ entries

2️⃣ Each element of $AB$ is the dot product of a row of $A$ with a column of $B$, both of which have length $n$. Since there are $mp$ total entries in $AB$ and each takes $n$ multiplications to compute, the product $AB$ can be computed using $\boxed{m \times n \times p}$ scalar multiplications. 

> If $A$ is ${\color{red}m} \times {\color{blue}{n}}$ and $B$ is ${\color{blue}{n}} \times {\color{purple}p}$,  then product $AB$ has ${\color{red}m} \cdot {\color{blue}{n}} \cdot {\color{purple}p}$ multiplications.
> The total time to multiply these two matrices is proportional to the product of the dimensions, $mnp$.


> [!explanation]-
> For matrix multiplication:
> - $A$ is of size $m \times n$
> - $B$ is of size $n \times p$
> 
> The result $C = AB$ is of size $m \times p$.
> 
> Each entry $c_{ij} = c[i,j]$ is computed as
> 
> $$
> c[i,j] = \sum_{k=1}^{n} a[i, j] \cdot b[k, j]
> $$
> 
> for $1 \leq i \leq m$ and $1 \leq j \leq p$.
> 
> This requires:
> * $n$ multiplications
> * $(n-1)$ additions
> 
> Therefore, each entry takes $\Theta(n)$ time to compute.
> 
> Since there are $m \times p$ entries in $C$, the total number of operations is:
> * Multiplications: $m \cdot n \cdot p$
> * Additions: $m(n-1)p$ (this is not counted in the computational complexity)
> 
> Therefore, the total procedure takes  $\Theta(mnp)$ time to compute.

3️⃣ Matrix multiplication is **not commutative**, that is, $AB \neq BA$. In fact, it doesn’t even make sense to multiply matrices if their dimensions are not compatible.

4️⃣ Matrix multiplication is **associative**, that is, for any three matrices of compatible sizes we have $A(BC) = (AB)C$. 

> In other words, no matter how the product is parenthesized, the result obtained will remain the same. 

**However, the number of multiplications performed to obtain the product A(BC) vs (AB)C can be very different.**

Given a $m \times n$ matrix $A$ and a $n \times p$ matrix $B$, and a $p \times q$ matrix $C$,  then $ABC$ can be computed in two ways $A(BC)$ and $(AB)C$. The number of multiplications needed for each are:
- computing $A(BC)$ needs $(n \times p \times q) + (m \times n \times q)$  multiplications
- computing $(AB)C$ needs $(m \times n \times p) + (m \times p \times q)$ multiplications

When $A$ is a 10 × 30 matrix, $B$ is a 30 × 5 matrix, and $C$ is a 5 × 60 matrix, then
- computing $(AB)C$ needs (10×30×5) + (10×5×60) = 4500 operations, while
- computing $A(BC)$ needs (30×5×60) + (10×30×60) = 27000 operations.

> <b>Implication:</b> The multiplication “sequence” (parenthesization) is important!!
> The order matters: different multiplication orders do not cost the same!


## The Chain Matrix Multiplication Problem

> [!problem]
> <b>Instance</b>: a compatible sequence of matrices $A_1A_2\cdots A_n$, where $A_i$ is of dimension $s_{i-1}\times s_i$.
> 
> <b>Task</b>: group (parenthesize) them in such a way as to minimise the total number of multiplications performed to find the product matrix.

<b>Important Note:</b> This algorithm does not perform the multiplications, it just determines the best order in which to perform the multiplications.

---
**What will be the subproblems?**

Since matrices cannot be reordered, it makes sense to think about sequences of matrices.

<b>Attempt 1: Prefixes</b>
A first attempt might be to specify subproblems corresponding to prefixes of the matrix chain, that is, find the optimal grouping for $A_1A_2 \dots A_i$. 

But this is not enough to construct a recurrence; consider for example splitting the chain as $(A_1A_2...A_j)(A_{j+1}A_{j+2}...A_i)$.  The right grouping is *not* a prefix of the chain starting with $A_1$ and so we cannot find a subproblem for it. 

Example: Suppose we have four matrices $A_1A_2A_3A_4$. If we split the chain as $(A_1A_2)(A_3A_4)$ then the right split $A_3A_4$ is *not* a prefix that starts with $A_1$.

<b>Attempt 2 : Contiguous Subsequences</b>
Instead we should specify a subproblem corresponding to each contiguous subsequence $A_{i+1}A_{i+1}A_{i+2}...A_j$ of the chain. (Unlike prefixes, this starts somewhere AND ends somewhere.)

So for each pair $i < j$, we need to solve the subproblems of finding the optimal parenthesization of $A_{i..j} = A_{i} A_{i+1}\cdots A_j$.  

> [!answer] Recurrence Structure
> The recurrence will consider all possible ways to place the outermost multiplication, splitting the chain into the product at some point $k$:
> $$ 
> A_{i..j} = 
> \underbrace{(A_{i+1}\cdots A_k)}_{s_i\times s_k}\;
> \underbrace{(A_{k+1}\cdots A_j)}_{s_k\times s_j}.
> $$
> 
> >If we wanted to recover the actual bracketing required, we could store alongside each value $\operatorname{opt}(i,j)$ the splitting point $k$ used to obtain it.
> 
> No recursion is necessary for subsequences of length one.

> [!solution]
> <b>Subproblems:</b>  
> For all $0\le i<j\le n$, let $\operatorname{opt}(i,j)$ be the fewest multiplications needed to compute the product $A_{i+1}A_{i+2}\cdots A_j$.
> 
> <b>Recurrence:</b>  
> For all $j-i>1$,
> $$
> \operatorname{opt}(i,j)=\min_{i<k<j}\big[s_i\,s_k\,s_j+\operatorname{opt}(i,k)+\operatorname{opt}(k,j)\big].
> $$
> 
> <b>Base cases:</b>  
> For all $0\le i\le n-1$, no multiplications are required for the single-matrix chain $A_{i+1}$, so
> $$
> \operatorname{opt}(i,i+1)=0.
> $$
> 
> <b>Reconstruction:</b>  
> Store alongside each value $\operatorname{opt}(i,j)$ the splitting point $k$ used to obtain it to recover the actual bracketing.
> 
> <b>Order of computation:</b>  
> - To solve a subproblem $\operatorname{opt}(i,j)$, we must have already solved $\operatorname{opt}(i,k)$ and $\operatorname{opt}(k,j)$ for each $i<k<j$.  
>  - The simplest way to ensure this is to solve the subproblems in increasing order of $(j-i)$, i.e., subsequence length.
> 
> <b>Overall answer:</b> $\operatorname{opt}(0,n)$.
> 
> <b>Time complexity:</b> $O(n^2)$ subproblems taking $O(n)$ time each, for a total running time of $O(n^3)$.

---

## Naive Approach (Brute-Force)

**Approach:** Find all possible parenthesizations and pick the best one.
**Conclusion**: The number of solutions is exponential in $n$. The method of exhaustive search is not a good idea.

Try all possible parenthesizations and choose the best one.

We could write a procedure which tries all possible parenthesizations (groupings). Unfortunately, the number of ways of parenthesizing an expression is very large. 

> [!explanation]- Why?
> If you have just one or two matrices, then there is only one way to parenthesize. If you have $n$  items, then there are $n-1$ places where you could break the list with the outermost pair of parentheses, namely just after the 1st item, just after the 2nd item, etc., and just after the $(n − 1)$st item. When we split just after the $k$th item, we create two sublists to be parenthesized, one with $k$ items, and the other with $n-k$ items. Then we could consider all the ways of parenthesizing these. Since these are independent choices, if there are $L$ ways to parenthesize the left sublist and $R$ ways to parenthesize the right sublist, then the total is $L \cdot R$. 
> 
> This suggests the following recurrence for $P(n)$, the number of different ways of parenthesizing $n$ items:
> $$
> P(n)=
> \begin{cases}
> 1, & \text{if } n=1, \\[6pt]
> \displaystyle\sum_{i=1}^{n-1} P(i)\,P(n-i), & \text{if } n\ge2.
> \end{cases}
> $$

The total number of different ways of parenthesizing $n$ items satisfies the following recurrence:
$$
P(n) = \sum_{i=1}^{n-1} P(i)\,P(n-i) 
$$
with base case $P(1) = 1$. 

This recurrence is related to the Catalan numbers, and solves to $$P(n)=\Omega({4^n}/{n^{3/2}}) \approx \Omega(2^n).$$

Thus, we cannot efficiently do an exhaustive search for the optimal grouping.

> [!aside]+
> The number of groupings is related to a famous function in combinatorics called the *Catalan numbers* (which in turn is related to the number of different binary trees on $n$ nodes). In particular $P(n) = C(n - 1)$, where $C(n)$ is the $n$th Catalan number:
> $$
> C(n) = \frac{1}{n + 1}\binom{2n}{n}.
> $$
> Applying Stirling’s formula, we find that $C(n) \in \Omega\!\left(\frac{4^n}{n^{3/2}}\right)$. Since $4^n$ is exponential and $n^{3/2}$ is just polynomial, the exponential will dominate, implying that function grows very fast. Thus, this will not be practical except for very small $n$. 
> 
> This sequence solves many combinatorial problems, including:
> - the number of balanced bracket sequences of length $2n$;
> - the number of full binary trees with $n + 1$ leaves;
> - the number of ways $n + 1$ factors can be parenthesized;
> - the number of lattice paths from $(0,0)$ to $(n,n)$ which never go above the diagonal;
> - the number of noncrossing partitions of an $(n + 2)$-sided convex polygon;
> - the number of c of $\{1, 2, \ldots, n\}$ with no three-term increasing subsequence.


## Dynamic Programming Approach

A naive approach to this problem, namely that of trying all valid ways of parenthesizing the expression, will lead to an exponential running time. Instead, we will solve it through dynamic programming.

> [!problem] 
> Given a sequence of matrices $A_1, A_2, \cdots, A_n$  and dimensions $s_0, s_1, \ldots, s_n$ where $A_i$ is of dimension $s_{i-1} \times s_i$, determine the order of multiplication that minimizes the number of operations. 

> [!solution]
> For $1 ≤ i ≤ j ≤ n$, let $m[i, j]$ be the minimum number of multiplications needed to compute the $A_{i..j}$ i.e., the products of the $(j-i+1)$ matrices from $i$ to $j$. 
> 
> Suppose that an optimal parenthesization splits the product $A_i A_{i+1} \cdots A_j$ between $A_k$ and $A_{k+1}$, where $i \leq k < j$. 
> 
> Then, $m[i, j]$ equals the minimum cost $m[k+1, j]$ for computing the subproduct $A_{i..k}$, plus the minimum cost $m[k+1, j]$ for computing the subproduct $A_{k+1..j}$, plus the cost of multiplying these two matrices together.
> 
> <b>Basis:</b> If $i=j$, then the chain consists of only one matrix $A_{i..i} = A_i$, so that no multiplications are needed to compute the product (there is nothing to multiply). Thus, $m[i, i] = 0$ for $i=1, 2, \dots, n$. 
> 
> <b>Step:</b> If $i < j$, then we are asking about the product $A_{i..j}$. This can be split by considering all possible values of $k$, for $i \leq k < j$ as $A_{i..k} \times A_{k+1..k}$. Because each matrix $A_i$ is $s_{i-1} \times s_i$, computing the matrix product $A_{i..k} \cdot A_{k+1..j}$ takes $s_{i-1} s_k s_j$ multiplications. Thus, we obtain $m[i,j] = m[i, k] + m[k+1, j] + s_{i-1} s_k s_j.$
> 
> This suggests the following recursive rule for computing $m[i, j]$.
> > [!function] Recurrence
> > $$
> > m[i, j] =
> > \begin{cases}
> > 0 & i = j \\[8pt]
> > \displaystyle \min_{\,i \le k < j}\ \big(m[i, k] + m[k + 1, j] + s_{i-1}\,s_k\,s_j\big) & i < j
> > \end{cases}
> > $$
> 
> We compute entries of $m[i,j]$ in increasing order of the chain length $L = j - i + 1$.
> 
> - For $L = 1$: $m[i,i] = 0$.  
> - For $L = 2, 3, \ldots, n$: for each starting index $i$, let $j = i + L - 1$, and compute $m[i,j]$ from all valid splits $k$, where $i \le k < j$.
> 
> The final answer is $m[1,n]$.
> 
> The running time is $\Theta(n^3)$ because there are three nested loops over $i$, $j$, and $k$, each up to $n$. Therefore we take $O(n)$ time to compute each entry in the DP table $m$.
> 
> Also, if we do some extra bookkeeping, we can recover the multiplication order at the end. While filling out the $(i,j)$th entry of $m$, we can keep track of the optimal splitting point in another table $s$ at $s[i,j]$. At the end, we can traverse s backwards using these “pointers” at each $s[i,j]$ to determine how exactly to multiply our matrices.


### Developing the dynamic programming solution

#### Optimal Substructure

<b>Step 1: Determine the structure of an optimal parenthesization</b>

**Notation:** Let $A_{i..j}$ denote the $s_{i-1} \times s_j$  matrix that results from evaluating the product $A_i A_{i+1} \cdots A_j$, where $1 \leq i \leq j \le n$.

In parenthesizing the expression, we can consider the highest level of parenthesization (the outermost multiplication). At this level we are simply multiplying two matrices together. 

In other words: For any matrix chain that is nontrivial, i.e., $i < j$, at the last step you are multiplying two matrices $A_{i..k}$ and $A_{k+1..j}$ at some position $k$ in the range $i \leq k < j$ (equivalently $i \le k \leq j-1$). That is, 

$$
A_{i..j} =
\underbrace{(A_i\cdots A_k)}_{s_{i-1}\times s_k}\;
\underbrace{(A_{k+1}\cdots A_j)}_{s_k\times s_j} 
= A_{i..k} \; A_{k+1..k}
$$

> Example:
> $$A_{3..6} = (A_3(A_4A_5))(A_6) = A_{3..5}A_{6..6}.$$ 
> Here $k=5$.

> [!question]+
> How much does it cost for the final product $(A_{i..k}) \cdot (A_{k + 1..j})$?
> > [!answer]
> > Recall that when you multiply a chain of matrices, the size of the result is the number of rows in the first and the number of columns in the last.
> > 
> > Each matrix $A_i$ is $s_{i-1} \times s_i$. Since $A_{i..k}$ is a $s_{i-1} \times s_k$  matrix and $A_{k+1..j}$ is a  $s_k \times s_j$ matrix, the cost to multiply them is $s_{i-1} \times s_k \times s_j$.
> > 
> > The cost of this parenthesization is thus the cost of computing the matrix $A_{i..k}$, plus the cost of computing $A_{k+1..j}$, plus the cost of multiplying them together .

> [!solution]+ Optimal Substructure Property
> If the optimal parenthesization of $A_{i..j}$ involves splitting the product between $A_k$ and $A_{k+1}$ in the final step, then the parenthesization of $A_{i..k}$ and $A_{k + 1..j}$ in this overall optimal parenthesization must also be optimal for the subchains $A_{i..k}$ and $A_{k + 1..j}$ respectively. 
> 
> If parenthesization of $A_{i..k}$ was not optimal, then we could replace it by a less costly parenthesization in the optimal parenthesization of $A_{1..j}$ to produce another way to parenthesize $A_{i..j}$  whose cost is lower than the optimum: a contradiction. 
> 
> Similarly, if parenthesization of $A_{k+1..j}$ was not optimal, we could replace it could replace it by a better parenthesization and get a cheaper final solution, leading to a contradiction.

#### Recursive Solution

<b>Step 2: Recursively define the value of an optimal solution.</b>

If $k$ is the optimal splitting point, then
$$
m[i, j] = m[i, k] + m[k + 1, j] + s_{i-1}\,s_k\,s_j \quad \text{for } i \le k < j.
$$

We know that for some $k$ in the range $i \le k < j$ that $m[i, j]$ is the optimal cost. But we don't know what $k$ is though. But there are only $(j-1)-i + 1 = {j-i}$ possible values of $k$ so we can check them all and find the one that returns the smallest cost. Therefore:

$$
m[i, j] =
\begin{cases}
0 & i = j \\[8pt]
\displaystyle \min_{\,i \le k < j}\ \big(m[i, k] + m[k + 1, j] + s_{i-1}\,s_k\,s_j\big) & i < j
\end{cases}
$$

<b>Step 3: Compute the value of an optimal solution in a bottom-up fashion</b>

The important point is that when we use the equation
$$
m[i, j] = m[i, k] + m[k + 1, j] + s_{i-1}\,s_k\,s_j
$$
to calculate $m[i, j]$, we must have already evaluated $m[i, k]$ and $m[k+1, j]$. For both cases, the corresponding length of the matrix-chain are both less than $(j-1+1)$. Hence, the algorithm should fill the table in increasing order of the length of the matrix chain.

![[matrix-multiplication-depencies.png|400]]

- Red is opt(3, 8)
- Blue are the dependencies 

> We compute entries of $m[i, j]$ in increasing order of $j-i$ (subsequence lengths), starting with our base cases that $m[i, i] = 0$ for all $i$. At the end, $m[1, n]$ will be the answer for the overall problem.

![[matrix-multiplication-table.png]]


#### Extracting the Final Sequence

To reconstruct the actual parenthesization, we store the best split $k$ for each pair $(i,j)$ in a table $s[i,j]$.

If $s[i,j] = k$, then the best way to multiply $A_{i..j}$ is:
1. Compute $A_{i..k}$ optimally.
2. Compute $A_{k+1..j}$ optimally.
3. Multiply the two results.

Using this table, we can recursively print or compute the optimal multiplication order.












