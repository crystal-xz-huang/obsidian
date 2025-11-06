---
modules:
  - "[[mocs/Modules/Dynamic Programming|Module 3: Dynamic Programming]]"
tags:
  - source/lecture
  - topic/dynamic-programming
  - topic/optimization
  - topic/string
  - type/problem
---

# Edit Distance

The **edit distance** between two strings is the minimum number (or cost) of transformation operations (letter insertions, deletions, and substitutions) required to transform one string into the other. 

For example, the edit distance between **FOOD** and **MONEY** is at most four:

![[edit-distance_foot-to-money.png|400]]

1. **F**OOD → **M**OOD (substitute "M" for "F")
2. MO**O**D → MO**N**D (substitute "N" for "O")
3. MON**D** → MON**E** (substitute "E" for "D")
4. MONE → MONE**Y** (insert "Y" at the end)

Important Points:
- Edit distance is another measure of the similarity of pairs of strings.
- Note: if all operations have a unit cost, then you are looking for the minimal number of such operations required to transform A into B; this number is called the *Levenshtein distance* between A and B.
- If the sequences are sequences of DNA bases and the costs reflect the probabilities of the corresponding mutations, then the minimal cost represents how closely related the two sequences are.

## Problem 

> [!problem]
> <b>Instance</b>: Given two text strings $A$ of length $n$ and B of length $m$, you want to transform $A$ into $B$.
> 
> You are allowed to insert a character, delete a character and to replace a character with another one. 
> 
> <b>Task</b>: Transform $A$ into $B$ using the **minimum total cost**, where an insertion costs $c_I$, a deletion costs $c_D$, and a replacement costs $c_R$.

- Consider prefixes of both strings, say $A[1..i]$ and $B[1..j]$.
- We have the following options to transform $A[1..i]$ into $B[1..j]$:
	1. Delete $A[i]$ and transform $A[1..i-1]$ into $B[1..j]$.
	2. Transform $A[1..i]$ to $B[1..j-1]$ and insert $B[j]$.
	3. Transform $A[1..i-1]$ to $B[1..j-1]$ and, if necessary, replace $A[i]$ by $B[j]$.
- If $i=0$ or $j=0$, we only insert or delete respectively.

> [!solution]
> <b>Subproblems:</b>  
> For all $0 \le i \le n$ and $0 \le j \le m$, let $\operatorname{opt}(i,j)$ be the minimum cost to transform the sequence $A[1..i]$ into the sequence $B[1..j]$.
> 
> <b>Recurrence:</b>  
> For all $i,j \ge 1$,
>
> $$
> \operatorname{opt}(i,j) =
> \min
> \begin{cases}
> c_D + \operatorname{opt}(i-1,j), & \text{(delete $A[i]$)} \\[6pt]
> c_I + \operatorname{opt}(i,j-1), & \text{(insert $B[j]$)} \\[6pt]
> \begin{cases}
> \operatorname{opt}(i-1,j-1), & \text{if } A[i]=B[j] \\[6pt]
> c_R + \operatorname{opt}(i-1,j-1), & \text{if } A[i]\ne B[j].
> \end{cases}
> \end{cases}
> $$
>
> <b>Base cases:</b>  
>
> $$
> \operatorname{opt}(i,0)=i\,c_D,
> $$
>
> $$
> \operatorname{opt}(0,j)=j\,c_I.
> $$
>
> <b>Order of computation:</b>  
> Solve the table in **lexicographic** order (increasing $i$, then increasing $j$) so that $\operatorname{opt}(i-1,j)$, $\operatorname{opt}(i,j-1)$, and $\operatorname{opt}(i-1,j-1)$ are known when computing $\operatorname{opt}(i,j)$.
> 
> <b>Overall answer:</b> 
> $\operatorname{opt}(n,m)$, the minimum total cost to transform $A$ into $B$.
> 
> <b>Time complexity:</b>  
> $O(nm)$ subproblems, each computed in $O(1)$ time, giving total $O(nm)$ time.

## Solution

> To optimally transform the first $i$ characters of sequence $A$ into the first $j$ characters of sequence $B$, look at how the very last characters relate — they must either be deleted, inserted, or (possibly) replaced — and then apply the optimal cost for the smaller prefixes.

In typical DP fashion, we need to break the problem into smaller pieces. For problems on strings, a natural choice of subproblems considers ***prefixes*** of both strings. 

- For any indices $i$ and $j$, let $\operatorname{opt}(i, j)$ denote the minimum cost to transform the prefixes $A[1..i]$ into $B[1..j]$.


- Consider prefixes of both strings, say $A_i = A[1..i]$ and $B_j = B[1..j]$.
- Assume we know the optimal costs to transform all smaller prefixes of $A$ and $B$: 
  $$\operatorname{opt}(i-1, j),\; \operatorname{opt}(i, j-1),\; \operatorname{opt}(i-1, j-1)$$
- If we already know the best ways to transform smaller prefixes, how can we extend those solutions to include the **new last characters** $A[i]$ and $B[j]$?

In the *last operation* made to transform $A[1..i]$ into $B[1..j]$, there are exactly three options to match $A[i]$ with $B[j]$:

- **Insertion:** 
	- The last operation added $B[j]$.
	- Before that insertion, we had already transformed $A[1..i]$ → $B[1..j-1]$
	- Cost = $\text{opt}(i-1, j) + c_D$
- **Deletion:** 
	- The last operation removed $A[i]$.
	- Before that deletion, we had already transformed $A[1..i]$ → $B[1..j-1]$.
	- Cost = $\text{opt}(i, j-1) + c_I$.
- **Substitution (Match/Replace):**
	- If $A[i] = B[j]$ then we do nothing. Otherwise $A[i] \neq B[j]$ and we replace $A[i]$ with $B[j]$.
	- Before this, we had already transformed $A[1..i]-1$ → $B[1..j-1]$.
	- Cost = $\text{opt}(i-1, j-1) + (0 \text{ or } c_R)$

---

## Recursive Structure

Similar to [[Longest Common Subsequence|Longest Common Subsequence (LCS)]], we can cast the problem of finding an **optimal alignment** as an edit-distance problem.

Any ordered sequence of operations (insertions, deletions, and replacements) that transforms $A$ into $B$ can be represented as an alignment of $A$ and $B$:

![[algorithm-altruistic-alignment.png|300]]

- an insertion → gap in the top string,
- a deletion → gap in the bottom string,
- a replacement → mismatched letters in the same column,
- a match → identical letters in the same column.

This alignment representation for edit sequences has a crucial “optimal substructure” property.

Suppose we have the alignment representation for the optimal edit sequence for two strings with the minimal cost. <b>If we remove the last column, the remaining columns must represent the optimal edit sequence for the remaining prefixes.</b> We can easily prove this observation by contradiction: If the prefixes had an edit sequence with a smaller cost, gluing the last column back on would gives us an edit sequence with a smaller cost for the original strings.

In other words, the alignment we are looking for represents a sequence of editing operations, ordered (for no particular reason) from right to left on the two input strings. Solving the edit-distance problem requires making a sequence of decisions, one for each column in the output alignment. In the middle of this sequence of decisions, we have already aligned a suffix of one string with a suffix of the other.

![[algorithm-altruistic-alignment-suffix.png|250]]

Because the cost of an alignment is the sum of column costs, our remaining decisions don’t depend on the editing operations we’ve already chosen; they only depend on the prefixes we haven’t aligned yet.

Thus, for any two input strings $A[1..m]$ and $B[1..n]$, we can formulate the edit distance problem recursively as follows: For any indices $i$ and $j$, let $\text{Edit}(i, j)$ denote the edit distance between the prefixes $A[1..i]$ and $B[1..j]$. We need to compute $\text{Edit}(m, n)$.

- Each column in the alignment = one recursive step.
- Removing a column = moving to a smaller prefix.
- Adding a column = applying one more edit operation.
- Total cost = sum of column costs. 

---


## Sequence Alignment

We can visualise the editing process by aligning the two strings one above the other.
The alignment is the sequence of edits (operations) made to transform one string to another.

There are several methods for measuring the similarity of two sequences by aligning them. 

### Model 1: edit-distance alignment

> Goal → *minimize* the number (or total cost) of edits.

- Add a gap for each insertion (in the first word) and deletion (in the second word).
- Columns with two *different* characters correspond to substitutions/edits.
- The edit distance = the number (or cost) of columns that are not identical.

In this representation, the number of editing steps is the number of columns that do not contain the same character twice.

![[edit-distance_sequence-alignment-2.excalidraw.png|500]]

- FOOD and MONEY is at most 4
- ALGORITHM and ALTRUISTIC is at most 6

### Model 2: score-alignment

> Goal → _maximize_ a similarity score.

Another method to align the two sequences $x$ and $y$ consists of inserting spaces at arbitrary locations in the two sequences (including at either end) so that the resulting sequences and have the same length but do not have a space in the same position (i.e., for no position $j$ are both $x'[j]$ and $y'[j]$ a space). Then we assign a score to each position. Position receives a score as follows:

- $+1$ if $x'[j] = y'[j]$ and neither is a space,
- $-1$ if $x'[j] ≠ y'[j]$ and neither is a space,
- $-2$ if either $x'[j]$ or $y'[j]$ is a space.

The score for the alignment is the sum of the scores of the individual positions. 

> [!example]
> Given the sequences:
> - $x = \tt{GATCGGCAT}$ 
> - $y = \tt{CAATGTGAATC}$
> 
> $$
> \begin{aligned}
> &\tt{G\;\;\;\;\;\;A\;\;T\;\;\;\;C\;\;G\;\;G\;\;C\;\;A\;\;T} \\
> &\tt{C\;\;A\;\;A\;\;T\;\;\;\;G\;\;T\;\;G\;\;A\;\;A\;\;T\;\;C}\\
> &\tt{-\,*\,\,+\,\,+\,*+\,\,*\,\,+\,-\,\,+\,\,+\,\,*}\\
> \end{aligned}
> $$
> ```
> G ATCG GCAT 
> CAAT GTGAATC
> -*++*+*+-++*
> ```
> 
> - `+` under a position indicates a score of `+1` for that position
> - `-` indicates a score of `-1`
> - `*` indicates a score of `-2`.
> 
> This alignment has a total score of $6 \cdot 1 - 2  \cdot 1 - 4  \cdot 2 = -4$. 


---

# Appendix

## Variations

- If all operations have a **unit cost**, then you are looking for the **minimal number operations** required to transform A into B; this number is called the <u>Levenshtein distance</u> between A and B.
- [[Longest Common Subsequence|Longest Common Subsequence (LCS)]] distance is edit distance with insertion and deletion as the only two edit operations, both at unit cost.

| Algorithm                                                        | Insertions | Deletions | Substitutions |
| ---------------------------------------------------------------- | ---------- | --------- | ------------- |
| Levenshtein distance                                             | ✓          | ✓         | ✓             |
| [[Longest Common Subsequence\|Longest Common Subsequence (LCS)]] | ✓          | ✓         |               |

The Levenshtein distance between "kitten" and "sitting" is 3. 
1. **k**itten → **s**itten (substitute "s" for "k")
2. sitt**e**n → sitt**i**n (substitute "i" for "e")
3. sittin → sittin**g** (insert "g" at the end)

LCS distance (insertions and deletions only) gives a different distance:
1. **k**itten → itten (delete "k" at 0)  
2. itten → **s**itten (insert "s" at 0)  
3. sitten → sitt**e**n → sittn (delete "e" at 4)  
4. sittn → sitt**i**n (insert "i" at 4)  
5. sittin → sittin**g** (insert "g" at 6)  
