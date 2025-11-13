
# Longest Common Subsequence

The Longest Common Subsequence Problem is defined as follows:

> [!problem] The Longest Common Subsequence Problem
> Given two sequences  
> $$
> X = \langle x_1, x_2, \ldots, x_m \rangle, \quad
> Y = \langle y_1, y_2, \ldots, y_n \rangle,
> $$  
> determine a *longest common subsequence* of $X$ and $Y$.

> [!warning]
> ==Note that the LCS is not always unique.==  
> 
> For example, the LCS of  
> $$
> \langle A, B, C \rangle
> \quad \text{and} \quad
> \langle B, A, C \rangle
> $$  
> is either  
> $$
> \langle A, C \rangle \quad \text{or} \quad \langle B, C \rangle .
> $$


## Solution for > 2 sequences

The LCS Problem can also be applied to more than two sequences, to find the LCS common to all $N$ input sequences. 

The optimal substructure is identical to the two-sequence LCS, but each subproblem now has three parameters (indices) instead of two.  

> [!problem]
> <b>Instance:</b> Three sequences
> $$A=\langle a_1,\ldots,a_m\rangle,\quad  
> B=\langle b_1,\ldots,b_n\rangle,\quad  
> C=\langle c_1,\ldots,c_p\rangle.$$
> 
> <b>Task:</b>  Find the length of a longest common subsequence of A, B and C.

> [!solution]
> <b>Subproblems:</b>
> 
> For all $0 \le i \le n, \; 0 \le j \le m$, and $0 \le k \le \ell$,  
> 
> Let $\text{len}(i, j, k)$ be the length of the longest common subsequence of the truncated sequences  
> 
> $$
> A_i = \langle a_1, a_2, \ldots, a_i \rangle, \quad
> B_j = \langle b_1, b_2, \ldots, b_j \rangle, \quad
> C_k = \langle c_1, c_2, \ldots, c_k \rangle.
> $$
> 
> <b>Recurrence:</b>
> 
> For all $i, j, k > 0$,
> $$
> \text{len}(i, j, k) =
> \begin{cases}
> 1 + \text{len}(i-1, j-1, k-1), & \text{if } a_i = b_j = c_k, \\[6pt]
> \max\big(
>     \text{len}(i-1, j, k),\;
>     \text{len}(i, j-1, k),\;
>     \text{len}(i, j, k-1)
> \big), & \text{otherwise.}
> \end{cases}
> $$
> 
> <b>Base cases:</b>
> 
> If $i = 0$, $j = 0$, or $k = 0$, then  
> $$
> \text{len}(i, j, k) = 0.
> $$
> 
> <b>Order of computation:</b>  
> 
> Solve the subproblems in **lexicographic order** (increasing $i$, then increasing $j$, then increasing $k$) to guarantee that  
> 
> $$
> \text{len}(i-1, j, k),\;
> \text{len}(i, j-1, k),\;
> \text{len}(i, j, k-1),\;
> \text{len}(i-1, j-1, k-1)
> $$
> 
> are evaluated before their values are used in the calculation of $\text{len}(i, j, k)$ — i.e., all dependencies are satisfied.
> 
> <b>Overall answer:</b>
> 
> $\text{len}(n, m, \ell)$
> 
> <b>Time complexity:</b>
> 
> There are $O(nm\ell)$ subproblems, each taking $O(1)$ time,  for a total running time of $O(nm\ell)$.
> 
> <b>Reconstruction:</b>
> 
> To reconstruct the longest common subsequence itself, we can record the direction from which the value $\text{len}(i, j, k) = 0.$ was obtained in the table, and backtrack.

> [!question]
> Can we compute this pairwise: $\textsf{LCS({\color{orange}LCS(A,B)},{\color{cyan}C})}$?
> - First find LCS of $\textsf{\color{orange}(A,B)}$
> - Then find LCS of $\textsf{\color{orange}(A,B)}$ and $\textsf{\color{cyan}C}$
> - Final answer is LCS of A, B and C.

> [!example] Counterexample
> Let $A = \texttt{\color{red}abcdegg}, \;  B = \texttt{\color{green}acbeefg}, \;  C = \texttt{\color{blue}accedgf}$.
> Then $\text{LCS}(A,B,C) = \texttt{aceg}$.
> 
> However, since the  $\textsf{LCS}(A, B)$ is not unique, we could have:
> 
> $$\begin{aligned}
> \textsf{LCS}(\textsf{LCS}(A, B), C)
> &= \textsf{LCS}(\textsf{LCS}(\texttt{\color{red}abcdegg}, \texttt{\color{green}acbeefg}), \texttt{\color{blue}accedgf}) \\[6pt]
> &= \textsf{LCS}(\texttt{abeg}, \texttt{\color{blue}accedgf}) \\[6pt]
> &= \texttt{aeg}.
> \end{aligned}$$
> 
> or 
> 
> $$\begin{aligned}
> \textsf{LCS}(\textsf{LCS}(A, B), C)
> &= \textsf{LCS}(\textsf{LCS}(\texttt{\color{red}abcdegg}, \texttt{\color{green}acbeefg}), \texttt{\color{blue}accedgf}) \\[6pt]
> &= \textsf{LCS}(\texttt{aceg}, \texttt{\color{blue}accedgf}) \\[6pt]
> &= \texttt{aceg}.
> \end{aligned}$$
> 
> - Both $\texttt{abeg}$ and $\texttt{aceg}$ have length 4 and are valid $\textsf{LCS}(A, B)$. 
> - But only $\texttt{aceg}$ gives the optimal solution for $\textsf{LCS}(A, B, C)$.
> - Basically, we discarded valid choice(s) that were needed in the next LCS. 



## Sequence Alignment

The LCS tells us what two sequences have in common and the best way to line them up. 

For example, consider:
- $S = \texttt{ABAZDC}$  
- $T = \texttt{BACBAD}$

In this case, the LCS has length $4$ and is the string $\texttt{ABAD}$.

![[lcs-example-1.png|400]]

Another way to look at it is we are finding a **1-1 matching** between some of the letters in S and some of the letters in T such that none of the edges in the matching cross each other.

If lines cross over each other, then they do *not* represent a common subsequence. This is because lines that cross over are representing elements that have been rearranged.

Using the analogy of drawing lines between the matches, we could also phrase the LCS problem as *maximising the number of non-crossing lines*.

![[lcs-crossed-lines.png]]

- Lines are drawn between **pairs of identical characters (matches)** between S and T.
- Lines represent the boundaries of an alignment (global vs local, optimal vs suboptimal).

## Applications

This type of problem comes up all the time in genomics: 

- Given two DNA fragments, the LCS gives information about what they have in common and the best way to line them up. 

![[dna-alignment.png|500]]

## Definitions

> [!def] Subsequence
> A sequence $Z$ is a *subsequence* of another sequence $X$ if $Z$ can be obtained by deleting some of the symbols of $X$, while preserving the order of the remaining symbols.
> 
> In other words, all the elements of $Z$ appear *in the same order* as they appear in $X$ (but not necessarily consecutively).

> [!example]
> Let  
> $$
X = \langle {\color{red}A}, B, R, {\color{red}A}, C, A, {\color{red}D}, {\color{red}A}, B, R, {\color{red}A} \rangle
> $$ 
> and  
> $$
> Z = \langle A, A, D, A, A \rangle .
> $$  
> Then $Z$ is a subsequence of $X$.

> [!def] Longest Common Subsequence
> Given two sequences $X$ and $Y$, the *longest common subsequence* of $X$ and $Y$ is a longest sequence $Z$ which is a subsequence of both $X$ and $Y$.
> 
> Let 
> $$
> X = \langle {\color{red}A}, {\color{red}B}, R, {\color{red}A}, C, A, {\color{red}D}, {\color{red}A}, {\color{red}B}, R, {\color{red}A} \rangle
> $$  
> and 
> $$
> Y = \langle Y, {\color{red}A}, {\color{red}B}, B, {\color{red}A}, {\color{red}D}, {\color{red}A}, {\color{red}B}, B, {\color{red}A}, D, O, O \rangle .
> $$  
> Then the longest common subsequence is  
> $$
> Z = \langle A, B, A, D, A, B, A \rangle .
> $$  


## Dynamic Programming Solution

<b>Problem:</b>
Given two sequences $X$ of length $m$ and $Y$ of length $n$ as

$$X = \langle x_1, x_2, \ldots, x_m \rangle, \qquad Y = \langle y_1, y_2, \ldots, y_n \rangle$$

Find the *longest* common subsequence (LCS) of $X$ and $Y$.


<b>Optimal substructure:</b>

Combining these observations we have the following rule:

<b>Subproblems:</b>

Let $c(i,j)$ be the length of the LCS of the prefixes $X_i$ and $Y_j$. 

Each recursive subproblem is identified by two indices $1 \leq i \leq n$ and $1 \leq j \leq m$.

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
Each entry $c[i,j]$ depends only on its three neighbouring entries $c[i-1,j-1]$ , $c[i-1,j]$ and $c[i-1,j-1]$.

<b>Order of computation:</b>
Compute table entries in **row-major order**; in increasing order of lengths.

![[lcs-construction.png]]

<b>Analysis:</b>
The memoization structure uses $O(mn)$ space. We can compute each entry $c[i, j]$ in $O(1)$ time once we know its predecessors, so the overall algorithm runs in $O(mn)$ time.

## Intuition

#### Brute-force

The simple brute-force solution to the problem would be to try all $2^m$ possible subsequences from one sequence, and search for matches in the other string, but this is hopelessly inefficient, since there are an exponential number of possible subsequences. 

This is because, for each character, we have two choices; it can either be in the subsequence or not in it. Duplicate characters reduce the number of unique subsequences a bit, although in the general case, it's still exponential.

#### Greedy

This is an **optimization problem**: The goal is to find a *common* subsequence that *has the maximum possible number of characters*. 

Using the analogy of drawing lines between the matches, we could also phrase it as *maximising the number of non-crossing lines*.

Greedy choices:
1. Iterate through the characters in the first sequence, checking whether or not it is possible to draw a line from it to the second sequence (without crossing lines). If it is, then draw the **left-most line** possible.
2. Try starting from the second sequence instead, also drawing the left-most line possible.

![[lcs-greedy.png]]

Draw all possible lines. Could there be a way of eliminating some of the lines that cross over?
Clearly, no.
![Image showing all lines between same characters|400](https://leetcode.com/problems/longest-common-subsequence/Figures/1143/all_lines.png)

Instead, we will derive a dynamic programming solution.

#### Dynamic Programming

In typical DP top-down fashion, we need to break the problem into smaller pieces and identify a set of subproblems that exhibit some kind of *optimal substructure property* – such that an optimal solution to the problem can be built from the optimal solutions from these smaller subproblems.

Basically, we want to find subproblems such that we can create an optimal solution from the results of those subproblems.

##### Intuition #1

Lets look at the alignment between pairs of identical characters in the two strings $X$ and $Y$:

![[lcs-example-1.png|400]]

Consider the last pair of aligned characters, the pair of $D$ matched at the end.

If we remove the last match found in $X$ and $Y$ from the optimal alignment, then the rest of the optimal alignment will match with everything that came before it, so it matches up to an earlier point in both sequences, i.e. up to some prefix of $X$ and some prefix $Y$. 

Then the LCS of $X$ and $Y$ can be obtained by appending D to the LCS of the prefixes $X_i$ and $Y_j$. The length of the LCS is then:

$$ 1 + \text{LCS}(X[1..i-1], Y[1..j-1]).$$

Formally, we claim that if $Z$ is the LCS of $X$ and $Y$, then removing the last character in that LCS forms a new subsequence $Z'$, which is the LCS of the prefixes $X_{i-1}$ and $Y_{j-1}$. We can easily prove this observation by contradiction: If the prefixes had a *longer* common sequence than $Z'$, then adding the last character back on would give us an even longer common sequence for the original sequences $X$ and $Y$, contradicting our assumption that $Z$ is the longest common subsequence.

##### Intuition #2

Earlier, we were drawing lines between identical letters. 

Consider the greedy algorithm where we repeatedly took the first (leftmost) possible line. 
Note that by doing so, we assumed that the greedy choice is part of the *optimal solution*.

![Greedy example of 'acg' solution](https://leetcode.com/problems/longest-common-subsequence/Figures/1143/greedy_top_3.png)

Instead of assuming that the line is part of the optimal solution, we could consider both cases: *the line **is** part of the optimal solution or the line **is not** part of the optimal solution*.

If *the line **is** part of the optimal solution*, then we know that the rest of the lines must be in the substrings that follow the line. As such, we should find the solution for the subsequences, and add `1` onto the result (for the new line) to get the *optimal solution*.

![Image showing subproblem LCS("ctgattag", "tcg")](https://leetcode.com/problems/longest-common-subsequence/Figures/1143/subproblem_1.png)

However, if _the line **is not** part of the optimal solution_, then we know that the letter in the first string is not included (as this would have been the best possible line for that letter). So, instead, we remove the first letter of the first string and treat the remainder as the subproblem. Its solution will be the _optimal solution_.

![Image showing subproblem LCS("ctgattag", "gtgtgatcg")](https://leetcode.com/problems/longest-common-subsequence/Figures/1143/subproblem_2.png)

But remember, we don't know which of these two cases is true. As such, we need to compute the answer for **both** cases. The best one (the largest value) will be the _optimal solution_ and should be returned as the answer for this problem.

Note that if either the first string or the second string is of length 0, we don't need to break it into subproblems and can just return `0`. This acts as the base case for the recursion.

But how many total subproblems will we need to solve? Well, because we always take a character off one, or both, of the strings each time, there are $M⋅N$ possible subproblems (where $M$ is the length of the first string, and $N$ the length of the second string). Another way of seeing this is that subproblems are represented as _suffixes_ of the original strings. A string of length $K$ has $K$ unique suffixes. Therefore, the first string has $M$ suffixes, and the second string has $N$ suffixes. There are, therefore, $M⋅N$ possible pairs of suffixes.

Some subproblems may be visited multiple times, for example `LCS("aac", "adf")` has the two subproblems `LCS("ac", "df")` and `LCS("ac", "adf")`. Both of these share a common subproblem of `LCS("c", "df")`. As such, as we should memoize the results of `LCS` calls so that the answers of previously computed subproblems can immediately be returned without the need for re-computation.

---

## Dynamic Programming Solution

### Step 1: Characterise optimality

In typical DP fashion, we need to break the problem into smaller pieces.
A natural choice of subproblems considers ***prefixes*** of both sequences, say:

$$
X_i = \langle x_1, x_2, \ldots, x_i \rangle, \qquad
Y_j = \langle y_1, y_2, \ldots, y_j \rangle .
$$

The idea will be to compute the LCS for every possible pair of prefixes (the set of subproblems), and derive a recurrence relation from top-down such that an optimal solution to the problem depends on the solutions to the smaller subproblems. 

Let $c[i,j]$ denote the length of the LCS of $X_i$ and $Y_j$. 

The idea is to compute $c[i, j]$ assuming that we already know the values of $c[i',j']$ for $i' \le i$ and $j' \le j$ (but not both equal). We begin with some observations.

0. **Basis:** If either $i=0$ or $j=0$, then one of sequences is empty (has length 0) and so the LCS has length 0. 
	- Thus if $i =0$ or $j=0$, then $c[i, 0] = c[j, 0] = 0$. 

1. **Last characters match:** Suppose both $X_i$ and $Y_j$ end with the same symbol, say $A = x_i = y_j$. Since both $X_i$ and $Y_j$ end with $A$, we claim that the LCS of $X_i, Y_i$ must also end in $A$. (We will prove this by contradiction later.) Since $A$ is part of the LCS for $X_i$ and $Y_j$, we can find the overall LCS for $X_i$ and $Y_j$  by removing $A$ from both sequences, taking the LCS of $X_{i-1}$ and $Y_{j-1}$, and then appending $A$ to the end. (But how did you know that these two $A$’s matched with each other? The answer is that we don’t, but it will not make the LCS any smaller if we do.)
	- Thus, if $x_i = y_j$ then $c[i,j] = c[i-1,j-1] + 1.$

2. **Last characters do not match:** Suppose $x_i \neq y_j$. In this case $x_i$ and $y_j$ cannot both be in the LCS (since they would have to be the last character of the LCS). Thus either $x_i$ is *not* part of the LCS, or $y_j$ is *not* part of the LCS (and possibly *both* are not part of the LCS). We consider discarding each of these symbols in turn.
	1. In the first case (discarding from $X$), the LCS of $X_i$ and $Y_j$ is the LCS of $X_{i-1}$ and $Y_j$, which is $c[i-1,j]$.
	2. In the second case (discarding from $Y$), the LCS of $X_i$ and $Y_j$ is the LCS of $X_i$ and $Y_{j-1}$, which is $c[i,j-1]$.
	3. We do not know which is the case, so we try both options and take the one that gives us the longer LCS. Thus, if $x_i \neq y_j$ then $c[i,j] = \max\big(c[i,j-1],\; c[i-1,j]\big).$

We left undone the business of showing that if both sequences end in the same character, then the LCS must also end in this same character. To see this, suppose by contradiction that both characters end in A, and further suppose that the LCS ended in a different character B. Because A is the last character of both strings, it follows that this particular instance of the character A cannot be used anywhere else in the LCS. Thus, we can add it to the end of the LCS, creating a longer common subsequence. But this would contradict the definition of the LCS as being longest.

Combining these observations we have the following rule:

$$
c[\,i,j\,] =
\begin{cases}
0 & \text{if } i = 0 \text{ or } j=0 \\[6pt]
c[\,i-1,\,j-1\,] + 1& \text{if } i, j > 0 \text{ and } x_i = y_j \quad \\[6pt]
\max\big(c[\,i,j-1\,],\; c[\,i-1,j\,]\big) &\text{if } i, j > 0 \text{ and } x_i \neq y_j \quad 
\end{cases}
$$



### The optimal substructure

<b>The optimal substructure</b>
Define the $i$th *prefix* of a sequence $X$ as the first $i$ elements

$$X_i= \langle x_1, x_2, \ldots, x_i \rangle$$

with $X_0$ representing the empty sequence.

If we assume that $Z = \langle z_1, z_2, \ldots, z_k \rangle$ is a LCS (with length $k$) of $X$ and $Y$ then one of the following three cases must hold:

- **Case 1\.** If $x_m = y_n$, then $z_k = x_m = y_n$ and $Z_{k-1}$ is an LCS of $X_{m-1}$ and $Y_{n-1}$. 
> If the last elements of both sequences are the same, then it must be the last element of the LCS, and the $(k-1)$ prefix of the LCS must be an LCS of the $(m-1)$ and $(n-1)$ prefixes of the original sequences.

- **Case 2\.** If $x_m \ne y_n$, then if $z_k \ne x_m$, $Z$ is an LCS of $X_{m-1}$ and $Y$.  
> If the last element of the LCS is ***not*** the same as the last element of $X$, then it must be an LCS of the prefix of $X$ without the last element. In other words, discard $y_n$ in $Y$ and compare the prefixes again.

- **Case 3\.** If $x_m \ne y_n$, then if $z_k \ne y_n$, $Z$ is an LCS of $X$ and $Y_{n-1}$.  
> If the last element of the LCS is ***not*** the same as the last element of $Y$, then it must be an LCS of the prefix of $Y$ without the last element. In other words, discard $x_m$ in $X$ and compare the prefixes again.

In all three cases we see that the LCS of the original two sequences contains a LCS of *prefixes* of the two sequences (smaller versions of the original problem) ⇒ *optimal substructure problem*.

### Step 2: Define the recursive solution (top-down)

**Case 1** reduces to the <u>single</u> subproblem of finding a LCS of $X_{m-1}, Y_{n-1}$ and adding $x_m = y_n$ to the end of $Z$.

**Cases 2 and 3** reduces to <u>two</u> subproblems of finding a LCS of $X_{m-1}, Y$ and $X, Y_{n-1}$ and selecting the longer of the two solutions (note both of these subproblems involve also solving the subproblem of Case 1 ⇒ *overlapping-subproblems property*)

Because these cases exhaust all possibilities, one of the optimal subproblem solutions must appear within an LCS of $X$ and $Y$.

Hence if we let $c[i,j]$ be the length of a LCS for $X_i$ and $Y_j$ we can write the recursion described by the above cases as follows:

> [!function] Recurrence for LCS
> For all $0 \le i \le n$ and all $0 \le j \le m$, let $c[i,j]$ be the length of the LCS of the prefixes $X[1…i]$ and $Y[1…j]$.  
>
> $$
> c[\,i,j\,] =
> \begin{cases}
> 0 & \text{if } i = 0 \text{ or } j=0 \\[6pt]
> c[\,i-1,\,j-1\,] + 1& \text{if } x_i = y_j \quad  (\text{case 1}) \\[6pt]
> \max\big(c[\,i,j-1\,],\; c[\,i-1,j\,]\big) &\text{if } x_i \neq y_j \quad (\text{cases 2 and 3})
> \end{cases}
> $$

Note that not all subproblems are considered depending on which recursive branch is selected.

###### Dependency Order

Each subproblem $c(i, j)$ depends only on whether $x_i = y_i$ and the solutions to the 3 smaller subproblems $c(i-1, j)$, $c(i, j-1)$ and $c(i-1, j-1)$. 

- If $x_i = y_i$ then the last characters match and $x_i = y_i$ is included in the LCS by appending it to the <u>single</u> subsequence for $c(i-1, j-1)$.
- Otherwise, choose the longer of the <u>two</u> sequences of $c(i-1, j)$ and $c(i, j-1)$, and continue to find matches.

It follows that the solutions to $c(i-1, j)$, $c(i, j-1)$ and $c(i-1, j-1)$ must be computed before $c(i, j)$.  

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

![[lcs-construction.png|400]]

### Step 4: Construct an optimal LCS

To reconstruct the LCS, start at *any* entry containing the maximum length (for example, $c[m,n]$) and follow the arrows through the table, adding elements in reverse order whenever a $\nwarrow$ occurs (meaning a match was found and $x_i = y_i$ is part of the LCS). At worst, we move up or left at each step, giving a run time of $O(m + n)$.

Alternatively, we could avoid the B matrix (saving some space) and reconstruct the LCS from **C** at each step in $O(1)$ time (using only the surrounding table cells). However, this does not provide any improvement in the asymptotic run time.

![[lcs-reconstruction.png]]


## Code Implementation

###  Iteration + Tabulation (Bottom-Up)

> [!function] Procedure
> For the bottom-up implementation:
> - Construct a table $c[0:m, 0:n]$ in a **row-major order**, starting from the first row of $c$ from left to right, then the second row, and so on. Each entry $c[i, j]$ storing the optimal solutions (the lengths of the LCS) of $X_i$ and $Y_j$.
> - Maintain a table $b[1: m, 1: n]$ of back pointers to help construct an optimal solution. Each entry $b[i, j]$ stores an arrow ("↖", "↑", or ←") that points to the table entry corresponding to the optimal subproblem solution chosen when computing $c[i, j]$. 
> 	- If the last characters match at $c[i, j]$ meaning $x_i = y_j$, then $b[i, j]$ records "↖" to mark the entry $c[i-1, j-1]$ of the LCS that $x_i = y_j$ was appended to. 
> 	- If the last characters do *not* match, then the largest of the two sequences $c[i-1, j]$ and $c[i-1, j-1]$ is chosen (breaking ties arbitrarily for equal lengths), and we continue from that entry/sequence until we find another match "↖" in $b$.
> - The procedure returns $b$ and $c$ tables, where $c[m, n]$ contains the length of an LCS of $X$ and $Y$. 
> - The running time of the procedure is $\Theta(mn)$, since each table entry takes $\Theta(1)$ time to compute.

![[lcs-pseudocode.png]]

### Recursion + Memoization (Top-Down)  

Based on the recurrence equation, we can write an exponential-time recursive algorithm to compute the length of an LCS of two sequences:

```python
def LCS(X: str, m: int, Y: str, n: int):
    if m == 0 or n == 0:
        return 0
    if X[m - 1] == Y[n - 1]:
        return 1 + LCS(X, m - 1, Y, n - 1)
    else:
        return max(LCS(X, m - 1, Y, n), LCS(X, m, Y, n - 1))
```

In the memoized version, we *store the results* in a matrix so that any given set of arguments to LCS only produces new work (new recursive calls) once. The memoized version begins by initialising a “memoization table” `memo[i][j]` to unknown for all $0 ≤ i ≤ n$ and $0 ≤ j ≤ m$ and then proceeds as follows:

```python 
def LCS(X: str, m: int, Y: str, n: int, memo: list[list[int]]) -> int:
    # Base case
    if m == 0 or n == 0:
        return 0

    # Check memoized result         <− added this line (*)
    if memo[m][n] != -1:            # -1 indicates uncomputed state
        return memo[m][n]

    # Recursive relation
    if X[m - 1] == Y[n - 1]:
        result = 1 + LCS(X, m - 1, Y, n - 1, memo)
    else:
        result = max(LCS(X, m - 1, Y, n, memo), LCS(X, m, Y, n - 1, memo))

    # Memoize the computed result   <− and this line (**)
    memo[m][n] = result
    return result
```

All we have done is saved our work in line `(**)` and made sure that we only embark on new recursive calls if we haven’t already computed the answer in line` (*)`.

In this memoized version, the running time is now $O(m n)$ since we reach line `(**)` at most $mn$ times (at most once for any given value of the parameters). This means means we make at most $2mn$ recursive calls total (at most two calls for each time we reach that line). Any given call of LCS involves only $O(1)$ work (performing some equality checks and taking a max or adding 1), so overall the total running time is $O(mn)$.


# References & Further Reading

- [UMD Lecture Notes - Longest Common Subsequence](https://www.cs.umd.edu/~meesh/351/mount/lectures/lect25-longest-common-subseq.pdf)
- [CS 360: Lecture 13: Dynamic Programming - Longest Common Subsequence](https://ycpcs.github.io/cs360-spring2015/lectures/lecture13.html)