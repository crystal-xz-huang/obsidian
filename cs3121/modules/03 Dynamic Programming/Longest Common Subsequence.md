---
aliases:
  - Longest Common Subsequence (LCS)
modules:
  - "[[mocs/Modules/Dynamic Programming|Module 3: Dynamic Programming]]"
tags:
  - topic/dynamic-programming
  - examples
---

# Longest Common Subsequence (LCS)

The <b>Longest Common Subsequence (LCS)</b> problem is defined as follows. We are given two strings: string $S$ of length $n$, and string $T$ of length $m$. Our goal is to produce their longest common [[Sequences#Definitions#Subsequences|subsequence]]: the **longest (maximum-length)** sequence of characters that appear in the same relative order left-to-right (but not necessarily in a contiguous block) in both strings.

Note:
- LCS is a measure of similarity between ordered sequences or strings. For two sequences, it explores all common subsequences and returns the longest one. The length of the LCS quantifies how similar two sequences are.

Similar Problems:
- An equivalent problem to LCS is the “[[Edit Distance|minimum edit distance]]” problem, where the legal operations are insert and delete. The minimum edit distance to transform S into T is achieved by doing $|S|-\text{LCS}(S,T)$ deletes and $|T|-LCS(S,T)$ inserts.
- In computational biology applications, often one has a more general notion of **sequence alignment**. Many of these different problems all allow for basically the same kind of Dynamic Programming solution (i.e. optimal substructure).


## Problem Statement

> [!problem]
> <b>Instance</b>: Two sequences $A = \langle a_1, a_2, \ldots, a_n \rangle$ and $B = \langle b_1, b_2, \ldots, b_m \rangle$.
> 
> <b>Task</b>: Find the length of a **longest common subsequence** of $A$ and $B$.


## Dynamic Programming Solution

As subproblems we will look at the LCS of a prefix of $\tt S$ and a prefix of $\tt T$, running over all *pairs of prefixes* $(i, j)$ for $0 \leq i \leq n$ and  $0 \leq i \leq m$.

Let $\text{LCS}[i,j]$ is the length of the LCS of $S[1..i]$ with $T[1..j]$. How can we solve for $\text{LCS}[i,j]$ in terms of the LCS’s of the smaller problems?

- <b>Case 1:</b> What if $\tt{S[i] \neq T[j]}$? Then, the desired subsequence has to ignore one of $\tt S[i]$ or $\tt T[j]$ so we have:
$$\tt{LCS}[i,j] = \max(LCS[i-1,j],LCS[i,j-1])$$
- <b>Case 2:</b> What if $\tt S[i] = T[j]$? Then the LCS of $\tt S[1..i]$ and $\tt T[1..j]$ might as well match them up. For instance, if I gave you a common subsequence that matched $\tt S[i]$ to an earlier location in $\tt T$, for instance, you could always match it to the last character $\tt T[j]$ instead. So, in this case we have:
$$\tt{LCS}[i,j] = 1 + \text{LCS}[i-1,j-1]$$

Then we can just do two loops (over values of $i$ and $j$) , filling in the LCS using these rules.

We just fill out this matrix row by row, doing constant amount of work per entry, so this takes $O(mn)$ time overall. The final answer (the length of the LCS of $S$ and $T$) is in the lower-right corner. 

<b>How can we now find the sequence?</b> To find the sequence, we just walk backwards through matrix starting the lower-right corner. If either the cell directly above or directly to the right contains a value equal to the value in the current cell, then move to that cell (if both to, then chose either one). If both such cells have values strictly less than the value in the current cell, then move diagonally up-left (this corresponds to applying Case 2), and output the associated character. This will output the characters in the LCS in reverse order.

### Optimal Substructure

If we have 2 strings, we can represent a subsequence by drawing lines connecting the pairs of identical letters:

![[lcs-example.png|300]]

In this case, the LCS has length 4 and is the string $\texttt{ABAD}$.

Another way to look at it is we are finding a 1-1 matching between letters in S and letters in T such that none of the lines in the matching cross each other (the top and bottom endpoints occur in the same order, the order of the letters in the subsequence). 

If lines cross over each other, then they do _not_ represent a common subsequence. This is because lines that cross over are representing elements that have been rearranged.

Conversely, any set of lines without crossings represents a subsequence:

![[lcs-example-2.png]]

Using the analogy of drawing lines between the matches, we can also phrase the LCS problem as _maximising the number of non-crossing lines_.

From this we can observe the following: if the two strings start with the same letter, it's always safe to choose that starting letter as the first character of the subsequence. This is because, if you have some other subsequence, represented as a collection of lines as drawn below, you can "push" the leftmost line to the start of the two strings, without causing any other crossings, and get a representation of an equally-long subsequence that does start this way.

The converse is true too: if two sequences end with the same character, we can assume that their LCS will also end with this character. Therefore, we can append the last line to any optimal alignment of the prefixes, without causing any other crossings, and get a representation of an equally-long subsequence that ends this way. (See image below).

|![[lcs-example-3.png]]|
| :-: |
| Consider the line representations of two equally-long LCS for $\tt S = ABACDC$ and $\tt T = BACBAD$. We can remove the last line $\tt D$ and append it to any optimal alignment on the prefixes of $\tt  S$ and $\tt T$ to obtain a new optimal solution that ends with $\tt{D}$.|

On the other hand, suppose that, like the first image above, the two first characters differ. Then it is not possible for both of them to be part of a common subsequence - one or the other (or maybe both) will have to be removed.

Finally, observe that once we've decided what to do with the first characters of the strings, the remaining subproblem is again a longest common subsequence problem, on two shorter strings. Therefore we can solve it recursively.

> Applications in bioinformatics: Given two DNA fragments, the LCS gives information about what they have in common and the best way to line them up. 
> 
> ![[dna-alignment.png|500]]


## Solution

> [!solution]
> <b>Subproblems:</b>
> 
> For all $0 \le i \le n$ and all $0 \le j \le m$, let $\operatorname{len}(i,j)$ be the length of the longest common subsequence of the truncated sequences $A_i = \langle a_1, a_2, \ldots, a_i \rangle$ and $B_j = \langle b_1, b_2, \ldots, b_j \rangle$.
> 
> <b>Recurrence:</b> 
> 
> For all $i, j > 0$,
>
> $$
> \operatorname{len}(i,j) =
> \begin{cases}
> \operatorname{len}(i-1,j-1) + 1 & \text{if } a_i = b_j \\[6pt]
> \max\big[\operatorname{len}(i,j-1),\; \operatorname{len}(i-1,j))\big] & \text{otherwise.}
> \end{cases}
> $$
>
> <b>Base cases:</b>  
> - for all $0 \le i \le n, \, \operatorname{len}(i,0) = 0$, and
> - for all $0 \le j \le m, \, \operatorname{len}(0,j) = 0$.
> 
> <b>Order of computation:</b>  
> 
> Solve the subproblems in **lexicographic order** (increasing $i$, then increasing $j$) to guarantee that $\operatorname{len}(i-1,j)$, $\operatorname{len}(i,j-1)$, and $\operatorname{len}(i-1,j-1)$ are evaluated before their values are used in the calculation of $\operatorname{len}(i,j)$ — i.e. all dependencies are satisfied.
> 
> <b>Overall answer</b>: $\operatorname{len}(n,m)$.
> 
> <b>Time complexity:</b> $O(nm)$ subproblems taking $O(1)$ time each, for a total running time of $O(nm)$.

> [!summary]
> To find the LCS of sequences $A_i$ and $B_j$, compare the last elements $a_i$ and $b_j$ :
> - <b>Case 1:</b> $\boldsymbol{a_i = b_j}$
> 	- If they are equal, the LCS of $A_{i-1}$ and $B_{j-1}$ is extended by one $a_i=b_j$. 
> 	- The LCS in this case is $\text{LCS}(A_{i-1},B_{j-1}) \wedge a_i$ where ^ denotes concatenation.
> 	- The length of the LCS in this case is $\operatorname{len}(i-1,j-1) + 1$. 
> - <b>Case 2:</b> $\boldsymbol{a_i \neq b_j}$
> 	- If they are not equal, then consider ignoring $a_i$ or $b_j$
> 	- the <u>longest</u> among the two sequences $\operatorname{LCS}(A_i, \, B_{j-1})$ and $\operatorname{LCS}(X_{i-1}, \, Y_j)$, is taken.
> 	- The length of the LCS in this case is $\max\big[\operatorname{len}(i-1,j),\; \operatorname{len}(i,j-1)\big]$.
> 
> The base cases occur when either $A_i$ or $B_i$ is empty. If either $i=0$ and $j=0$, one of the sequences has length $0$, and so the LCS has length $0$.

## Explanation

A natural choice of subproblems considers ***prefixes*** of both sequences, say:

$$
X_i = \langle x_1, x_2, \ldots, x_i \rangle, \qquad
Y_j = \langle y_1, y_2, \ldots, y_j \rangle .
$$

Define the $i$th *prefix* of a sequence $X$ as the first $i$ elements

$$X_i= \langle x_1, x_2, \ldots, x_i \rangle$$

with $X_0$ representing the empty sequence.

<b>Optimal substructure:</b>

If we assume that $Z = \langle z_1, z_2, \ldots, z_k \rangle$ is a LCS (with length $k$) of $X$ and $Y$ then one of the following three cases must hold:

- **Case 1\.** If $x_m = y_n$, then $z_k = x_m = y_n$ and $Z_{k-1}$ is an LCS of $X_{m-1}$ and $Y_{n-1}$. 
  
  If the last elements of both sequences are the same, then it must be the last element of the LCS, and the $(k-1)$ prefix of the LCS must be an LCS of the $(m-1)$ and $(n-1)$ prefixes of the original sequences.

- **Case 2\.** If $x_m \ne y_n$, then if $z_k \ne x_m$, $Z$ is an LCS of $X_{m-1}$ and $Y$.  
  
  If the last element of the LCS is ***not*** the same as the last element of $X$, then it must be an LCS of the prefix of $X$ without the last element. In other words, discard $y_n$ in $Y$ and compare the prefixes again.

- **Case 3\.** If $x_m \ne y_n$, then if $z_k \ne y_n$, $Z$ is an LCS of $X$ and $Y_{n-1}$.  
  
  If the last element of the LCS is ***not*** the same as the last element of $Y$, then it must be an LCS of the prefix of $Y$ without the last element. In other words, discard $x_m$ in $X$ and compare the prefixes again.

In all three cases we see that the LCS of the original two sequences contains a LCS of *prefixes* of the two sequences (smaller versions of the original problem) ⇒ *optimal substructure problem*.

<b>Subproblems:</b>
Each recursive subproblem is identified by two indices $1 \leq i \leq n$ and $1 \leq j \leq m$.

$$c(i,j) = \text{the length of the LCS of } X[1 \ldots i] \text{ and } Y[1 \ldots  j]$$

<b>Recurrence:</b>

$$
c[\,i,j\,] =
\begin{cases}
0 & \text{if } i = 0 \text{ or } j=0 \\[6pt]
c[\,i-1,\,j-1\,] + 1& \text{if } i, j > 0\text{ and } x_i = y_j \quad  (\text{case 1}) \\[6pt]
\max\big(c[\,i,j-1\,],\; c[\,i-1,j\,]\big) &\text{if } i, j > 0\text{ and } x_i \neq y_j \quad (\text{cases 2 and 3})
\end{cases}
$$

<b>Memoization structure:</b>
We can memoize all possible values of $c(i,j)$ in a 2D array $c[0..n, 0..m]$.

<b>Dependencies:</b>
Each entry $c[i,j]$ depends only on its three neighbouring entries:

- $c[i-1,j-1]$ → the value diagonally up-left,
- $c[i-1,j]$ → the value directly above, and
- $c[i,j-1]$ → the value directly to the left.

<b>Evaluation order:</b>
Compute table entries in **row-major order** (left to right first). If we fill this array in standard row-major order—row by row from top down, each row from left to right—then whenever we reach an entry in the array, all the entries it depends on are already available.

|                                                                                                                                                                       ![[lcs-construction.png]]                                                                                                                                                                        |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| The arrows in this table point to the subproblems that depend on it. For example, the table entry $c[i, j]$ has three arrows pointing to it, indicating that it **depends on** the solutions from three other subproblems $c[i-1,j-1]$, $c[i-1,j]$ and $c[i,j-1]$. This implies that we must compute these subproblems before we can compute the current subproblem at $c[i, j]$. |
|                                                                                                                                                                                                                                                                                                                                                                                   |


<b>Space and time:</b> 
The memoization structure uses $O(mn)$ space. We can compute each entry $c[i, j]$ in $O(1)$ time once we know its predecessors, so the overall algorithm runs in $O(mn)$ time.

## Developing the solution

#### Step 1: Characterising a longest common subsequence

> [!summary] Optimal Substructure
> - An LCS of two sequences contains within it an LCS of prefixes of the two sequences.
> - Thus, the set of subproblems corresponds to pairs of "prefixes" of the two input sequences.

A natural choice of subproblems considers ***prefixes*** of both sequences, say:

$$
A_i = \langle a_1, a_2, \ldots, a_i \rangle,\quad
B_j = \langle b_1, b_2, \ldots, b_j \rangle.
$$

<b>Case 1:</b> $\boldsymbol{a_i = b_j}$

If $a_i$ and $b_j$ are the same symbol (say $z$), then the LCS of $A_i$ and $B_j$ must end with that symbol. The LCS of $A_i$ and $B_j$ is formed by appending $z$ to the LCS for $A_{i−1}$ and $B_{j−1}$:

$$\operatorname{LCS}(A_i, B_j) = \operatorname{LCS}(A_{i-1}, B_{j-1}) + a_i$$

<b>Case 2:</b> $\boldsymbol{a_i \neq b_j}$

If $a_i$ and $b_j$ differ, then a common subsequence of $A_i$ and $B_j$ does not match both symbols at the current alignment, so we consider discarding each of these symbols in turn. 

In other words, the optimal alignment ignores either $a_i$ or $b_j$ or both (it cannot use both of them).

- **Exclude aᵢ** — If the last symbol of $A_i$ is not in any common subsequence of $A_i$ and $B_j$, then we find the LCS between ${\color{cyan}A_{i-1}}$ and $B_j$.
- **Exclude bⱼ** — If the last symbol of $B_j$ is not in any common subsequence of $A$ and $B$, then we find the LCS between $A_i$ and ${\color{cyan}B_{j-1}}$.

Whichever of these two LCSs is longer is an LCS of $A_i$ and $B_j$. 

#### Step 2: A recursive solution

> [!function] Recurrence
> Let $c(i,j)$ be the length of the LCS of the prefixes $A_i$ and $B_j$. 
> 
> For all $1 \leq i \leq n$ and $1 \leq j \leq m$, 
>
> $$
> c[i,j] =
> \begin{cases}
> 0 & \text{if } i = 0 \text{ or } j=0, \\[6pt]
> c[i-1,j-1] + 1& \text{if } x_i = y_j, \\[6pt]
> \max\big(c[i-1,j], \; c[i,j-1]\big) & \text{if } x_i \neq y_j.
> \end{cases}
> $$

- The optimal substructure implies that we need to consider either one or two subproblems when finding an LCS of $A = \langle a_1, a_2, \ldots, a_n \rangle$ and $B=\langle b_1, b_2, \ldots, b_m \rangle$. 
- Because these cases exhaust all possibilities, one of the optimal subproblem solutions must appear within an LCS of $A$ and $B$.
- The LCS problem has the **overlapping-subproblems property**. To find an LCS of $A$ and $B$, you might need to find the LCSs of $A$ and $B_{m-1}$ and of $A_{n-1}$ and $B$. But each of the subproblems has the subsubproblem of finding an LCS of $A_{n-1}$ and $B_{m-1}$.

#### Step 3: Computing the length of an LCS

> [!algorithm]
> For the **bottom-up** implementation:
> - Construct a table $c[0:m, 0:n]$ in a **row-major order**, starting from the first row of $c$ from left to right, then the second row, and so on. Each entry $c[i, j]$ storing the optimal solutions (the lengths of the LCS) of $X_i$ and $Y_j$.
> - Maintain a table $b[1: m, 1: n]$ to help construct an optimal solution. Each entry $b[i, j]$ points to the table entry corresponding to the optimal subproblem solution chosen when computing $c[i, j]$. 
> - The procedure returns $b$ and $c$ tables, where $c[m, n]$ contains the length of an LCS of $X$ and $Y$. 
> - The running time of the procedure is $\Theta(mn)$, since each table entry takes $\Theta(1)$ time to compute.

###### Dependency Order

Each subproblem $c(i, j)$ depends only on whether $x_i = y_i$ and the solutions to the subproblems $c(i-1, j)$, $c(i, j-1)$ and $c(i-1, j-1)$, which must be computed before $c(i, j)$ is evaluated.

- If $x_i = y_i$ then the last characters match and $x_i = y_i$ is included in the LCS by appending it to the <u>single</u> subsequence for $c(i-1, j-1)$.
- Otherwise, choose the longer of the <u>two</u> sequences of $c(i-1, j)$ and $c(i, j-1)$, and continue to find matches.

The next step is to choose an appropriate dependency order to guarantee that these dependencies are already evaluated before each subproblem. 

###### Analysis

- There are $\Theta(m n)$ distinct subproblems (computing $c[i, j]$ for $0 \le i \le n$ and all $0 \le j \le m$), each of them does a constant amount of work to combine the results of the subproblems that it depends on recursively.
- If we use recursion (without memoization), each evaluation of $c(i,j)$ makes 1 or 2 new recursive calls to problems of size 1 or 2 smaller ⇒ *overlapping subproblems* leading to *exponential* recursive calls.
- If we use *dynamic programming* and only evaluate each subproblem once, then we can get a runtime of *polynomial* $O(m n)$.

### Step 3: Compute the length of the LCS (bottom-up)

There are $\Theta(m n)$ distinct subproblems (computing $c[i, j]$ for $0 \le i \le m$ and all $0 \le j \le n$), and each subproblem depends on smaller subproblems that are at least one element shorter (either by removing the last element from $X$ or from $Y$ or both). 

Hence, we can solve this by creating two tables — **C**, an $m \times n$ table storing the LCS lengths, and **B**, an $m \times n$ table for reconstructing the LCS.  

The tables are filled bottom-up in a **row-major order** (increasing order of $i$, then $j$), so that whenever we reach an entry $[i, j]$, all the entries it depends on are already computed.

When the procedure is complete, the optimal length of the LCS will be stored in $c[m,n]$. Thus, since we fill in the entire table, the procedure will take $O(m n)$ time.

![[lcs-construction.png]]

```java
function LCSLength(A[1..n], B[1..m])
    // Create a 2D array of lengths n and m
    let L[0..n, 0..m] be a new array
    
    // Initialize the first row and column to 0
    for i from 0 to n do
        L[i, 0] := 0
    for j from 0 to m do
        L[0, j] := 0

    // Build L in a bottom-up manner
    for i from 1 to n do // ↓ next row after row j is filled
        for j from 1 to m do // →  fill row j left to right
            if A[i] == B[j] then
                L[i, j] := L[i-1, j-1] + 1
            else
                L[i, j] := max(L[i-1, j], L[i, j-1])
                
    // Final answer is at the bottom-right cell
    return L[n, m]
```

> [!time] Analysis
> - Two nested loops:
> 	- The outer one iterates `n` times
> 	- The inner one iterates `m` times
> 	- A constant amount of work is done inside each iteration of the inner loop
> 	- Thus, the total running time is `O(nm)`

### Step 4: Construct an optimal LCS

To reconstruct the LCS, start at *any* entry containing the maximum length (for example, $c[m,n]$) and follow the arrows through the table, adding elements in reverse order whenever a $\nwarrow$ occurs (meaning a match was found and $x_i = y_i$ is part of the LCS). At worst, we move up or left at each step, giving a run time of $O(m + n)$.

Alternatively, we could avoid the B matrix (saving some space) and reconstruct the LCS from **C** at each step in $O(1)$ time (using only the surrounding table cells). However, this does not provide any improvement in the asymptotic run time.

![[lcs-reconstruction.png]]

> [!time] Analysis
> The procedure takes $O(m+n)$ time, since it decrements at least one of $i$ and $j$ in each recursive call.

## Proof of Correctness

<b>Theorem (Optimal substructure of an LCS)</b>
Let $X = \langle x_1, x_2, \ldots, x_m \rangle$ and $Y = \langle y_1, y_2, \ldots, y_n \rangle$ be sequences, and let $Z = \langle z_1, z_2, \ldots, z_k \rangle$ be any LCS of $X$ and $Y$. 

1. If $x_m = y_n$, then $z_k = x_m = y_n$ and $Z_{k-1}$ is an LCS of $X_{m-1}$ and $Y_{n-1}$.
2. If $x_m \neq y_n$ and $z_k \neq x_m$, then $Z$ is an LCS of $X_{m-1}$ and $Y$.
3. If $x_m \neq y_n$ and $z_k \neq y_n$, then $Z$ is an LCS of $X$ and $Y_{n-1}$.

**Proof**
**(1)** If $z_k \neq x_m$, then we could append $x_m = y_n$ to $Z$ to obtain a common subsequence of $X$ and $Y$ of length $k+1$, contradicting the supposition that $Z$ is a *longest* common subsequence of $X$ and $Y$. Thus, we must have $z_k = x_m = y_n$. 

Now, the prefix $Z_{k-1}$ is a length-$(k-1)$ common subsequence of $X_{m-1}$ and $Y_{n-1}$. We wish to show that it is an LCS. Suppose, for the purpose of contradiction, that there exists a common subsequence $W$ of $X_{m-1}$ and $Y_{n-1}$ with length greater than $k-1$. Then, appending $x_m = y_n$ to $W$ produces a common subsequence of $X$ and $Y$ whose length is greater than $k$, which is a contradiction.

**(2)** If $z_k \neq x_m$, then $Z$ is a common subsequence of $X_{m-1}$ and $Y$. If there were a common subsequence $W$ of $X_{m-1}$ and $Y$ with length greater than $k$, then $W$ would also be a common subsequence of $X_m$ and $Y$, contradicting the assumption that $Z$ is an LCS of $X$ and $Y$. 

**(3)** The proof is symmetric to (2): if $x_m \neq y_n$ and $z_k \neq y_n$, then $Z$ is an LCS of $X$ and $Y_{n-1}$.

## Pseudocode

Fill in the $c$ table in a row-major order, using these rules:

$$
c[i,j] =
\begin{cases}
0 & \text{if } i = 0 \text{ or } j=0, \\[6pt]
c[i-1,j-1] + 1& \text{if } x_i = y_j, \\[6pt]
\max\big(c[i-1,j], \; c[i,j-1]\big) & \text{if } x_i \neq y_j.
\end{cases}
$$

Fill in the $b$ table row-wise, using the following formulas:

$$
\begin{array}{@{}l l l@{}}
x_i = y_i 
  & \Rightarrow c[\,i,j\,] = c[\,i-1,j-1\,] + 1
  & \nwarrow \\
x_i \ne y_i
  & &
  \\[2pt]
\quad c[\,i-1,j\,] \ge c[\,i,j-1\,]
  & \Rightarrow c[\,i,j\,] = c[\,i-1,j\,]
  & \uparrow \\[6pt]
\quad c[\,i-1,j\,] < c[\,i,j-1\,]
  & \Rightarrow c[\,i,j\,] = c[\,i,j-1\,]
  & \leftarrow
\end{array}
$$

![[lcs-pseudocode.png|500]]

# Appendix

## Applications

- **File comparison**. The Unix program "diff" is used to compare two different versions of the same file, to determine what changes have been made to the file. It works by finding a longest common subsequence of the lines of the two files; any line in the subsequence has not been changed, so what it displays is the remaining set of lines that have changed. In this instance of the problem we should think of each line of a file as being a single complicated character in a string.
- **Screen redisplay.** Many text editors like "emacs" display part of a file on the screen, updating the screen image as the file is changed. For slow dial-in terminals, these programs want to send the terminal as few characters as possible to cause it to update its display correctly. It is possible to view the computation of the minimum length sequence of characters needed to update the terminal as being a sort of common subsequence problem (the common subsequence tells you the parts of the display that are already correct and don't need to be changed).
- **Molecular biology (bioinformatics)**:DNA sequences (genes) can be represented as sequences of four letters ACGT, corresponding to the four submolecules forming DNA. When biologists find a new sequences, they typically want to know what other sequences it is most similar to. One way of computing how similar two sequences are is to find the length of their longest common subsequence.
	- How similar are the genetic codes of two viruses?
	- Is one of them just a genetic mutation of the other?

# References and Further Reading

- [C7S3_CommonSubsequence](https://www.audiolabs-erlangen.de/resources/MIR/FMP/C7/C7S3_CommonSubsequence.html)
- [CS 360: Lecture 13: Dynamic Programming - Longest Common Subsequence](https://ycpcs.github.io/cs360-spring2015/lectures/lecture13.html)
- [Longest Common Subsequence - LeetCode](https://leetcode.com/problems/longest-common-subsequence/description/)
- [Longest Common Subsequences](https://ics.uci.edu/~eppstein/161/960229.html)