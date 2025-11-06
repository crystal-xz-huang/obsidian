---
modules:
  - "[[Greedy Algorithms|Module 2: Greedy Algorithms]]"
tags:
  - type/problem
  - source/lecture
  - topic/greedy
---
## Tape Storage

### Tape Storage I (Equal Probabilities)

![[tape-storage-problem.png]]

> [!goal] Objective
> Minimise the average (expected) time to retrieve a file from an unordered list.
> If files are ordered $L_1, L_2, \ldots, L_n$, 
> then retrieval time for file $i = L_1 + L_2 + \cdots + L_i.$

#### Solution

It seems sensible to store (order by) the **smallest files first**. Can we prove it?  

Suppose we store the files in order $L_1, L_2, \dots, L_n$.  

Each file has probability $\tfrac{1}{n}$ of being chosen.

So the expected retrieval time is:  
{}

$$
\begin{align*}
E &= \frac{1}{n} \sum_{i=1}^{n} (L_1 + L_2 + \dots + L_i)\\
&= \frac{1}{n} \Big( L_1 + (L_1+L_2) + (L_1+L_2 + L_3) + \cdots + (L_1+\cdots+L_n)\Big)\\
&= \frac{1}{n} \Big( nL_1 + (n-1)L_2 + (n-2)L_3 + \dots + 2L_{n-1} + L_n \Big).
\end{align*}
$$

The factor $\tfrac{1}{n}$ is present regardless of the chosen order of files, so for convenience, we can ignore that constant factor and define the expected retrieval time as:

$$
E = nL_1 + (n-1)L_2 + (n-2)L_3 + \dots + 2L_{n-1} + L_n
$$  

We call this the **scaled retrieval time**.

#### Proof of Optimality

> [!bookmark] Claim
> The "scaled" retrieval time 
>
> $$
> nL_1 + (n-1)L_2 + (n-2)L_3 + \dots + 2L_{n-1} + L_n
> $$
>
> is minimised if $L_1 \leq L_2 \leq \dots \leq L_n$
> i.e., when the files are stored in ascending order of length.

If this claim is true, we’ll solve the problem by simply storing the files in ascending order of length.

We prove this by contradiction, which is probably the most common method for proofs of optimal ordering.

**Proof (by contradiction):**  

Suppose the files are <u>not</u> in ascending order.  
Then there exist two consecutive files with $L_i > L_{i+1}$ (That is, a _local inversion_).

> File $i$ has a longer length than File $i+1$ (out of order)

Swapping them changes the scaled retrieval time 
from:

$$
T = \ldots + (n-i+1)L_i + (n-i)L_{i+1} + \ldots
$$ to:
$$

T' = \ldots + (n-i+1)L_{i+1} + (n-i)L_i + \ldots

$$ 
This is a reduction in time because $T - T' = L_i - L_{i+1} > 0$.
i.e., $T' < T$ meaning the swap reduces the retrieval time.  

> [!NOTE]
> - Any arrangement which isn’t sorted by length can be improved upon, so the best arrangement is the one where files are ordered from shortest to longest.
> - Resolving these “adjacent inversions” one-by-one would gradually return us to the sorted sequence, (our <u>proof</u> uses the same adjacent-swap idea as bubble sort!)
> - Note that this doesn’t mean our <u>algorithm</u> should sort the files using bubble sort!
> 	- We refer to bubble sort only because it is easy to analyse adjacent inversions; resolving them has only <u>local</u> effects.
> 	- We should use a more efficient sorting algorithm to actually sort the files

<b>Algorithm</b>: Sort the files by increasing order of length using mergesort.

---

### Tape Storage II (Unequal Probabilities)

But what if the files are not equally likely to be picked?

> [!example] Problem
> - **Instance:** A list of $n$ files of lengths $L_i$ and probabilities $p_i$ with $\sum_{i=1}^n p_i = 1$.  
> - **Task**: Order the files to minimise the <b>expected</b> retrieval time.  

#### Solution

> [!question]
> Now we have two criteria we could order by: length $L_i$ and probability $p_i$ .
> 
> - Files with small length $L_i$ should appear near the start
> - Files with large probability $p_i$ should appear near the start.
> 
> How can we sort by both of these properties at the same time?
> 
> > [!Answer]
> > Order by decreasing ratio $\tfrac{p_i}{L_i}$.  

If the files are stored in order $L_1, L_2, \dots, L_n$, then the expected retrieval time is:  

$$

E = L_1p_1 + (L_1+L_2)p_2 + (L_1+L_2+L_3)p_3 + \dots + (L_1+L_2+\dots+L_n)p_n

$$ 
> [!bookmark] Claim
> The expected retrieval time $E$ is minimised if the files are ordered by decreasing $\tfrac{p_i}{L_i}$.  


#### Proof of Optimality

**Proof (by contradiction):**  

For the sake of contradiction, suppose $E$ is minimised, but there exist two adjacent files $k$ and $k+1$ such that
$$

\frac{p_k}{L_k} < \frac{p_{k+1}}{L_{k+1}}

$$  
Before the swap:  

$$

\cdots + (L_1+\dots+L_k)p_k + (L_1+\dots+L_k+L_{k+1})p_{k+1} + \cdots

$$  
After the swap

$$

\cdots + (L_1+\dots+L_{k-1}+L_{k+1})p_{k+1} + (L_1+\dots+L_{k-1}+L_{k+1}+L_k)p_k + \cdots

$$  
The difference is:  
$$

E - E' = L_kp_{k+1} - L_{k+1}p_k

$$  

Given $\tfrac{p_k}{L_k} < \tfrac{p_{k+1}}{L_{k+1}} \iff L_kp_{k+1} > L_{k+1}p_k$,  

it follows that $E - E' = L_kp_{k+1} - L_{k+1}p_k > 0$.  

Therefore, $E' < E$. 

This is a contradiction, since $E$ does not have the smallest possible retrieval time.

Therefore, the optimal sequence has **no inversions**, i.e. the files are sorted in **descending order of $\tfrac{p_i}{L_i}$** (file $k + 1$ with a larger ratio $p_{k+1}/L_{k+1}$ occurs after file $k$ with a smaller ratio $p_k/L_k$). 

---

### Further Reading

> [Algorithms by Jeff Erickson - Chapter 4 Greedy Algorithms](https://jeffe.cs.illinois.edu/teaching/algorithms/)


