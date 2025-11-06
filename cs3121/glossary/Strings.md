# Strings 

A **string** over a finite set $S$ is a sequence of elements of $S$. 

A string $A$ of length $n$ is written as:
$$A = a_1 \ldots a_n$$

A **substring** $s'$ of string $s$ is an ordered sequence of the first $k$ 
A **k-substring** of a string is a substring of length $k$.

> [!caution] Sequence vs String
> - $A = a_1 \ldots a_n$ denotes $A$ to be the **concatenation** of characters $a_1 \ldots a_n$ (==string==)
> - $A = (a_1, \ldots ,a_n)$ or $A = a_1, \ldots ,a_n$ denotes $A$ to be the **sequence (ordered tuple or list)** of elements $a_1 \ldots a_n$ instead (==ordered sequence==)

### Notations

- string $A = a_1 \ldots a_n$ of length $n$ 
- $\epsilon$ (epsilon) = empty string
- $a \mathbin\Vert k$ denotes the string formed by concatenating the strings $a$ and $k$


### Subsequences and Substrings

Given a string $s[1 : n]$, a *subsequence* is a subset of the entries of the string taken in the same order.

Formally, a length-$k$ subsequence is a string  

$$
\begin{align}
\sigma &= (s[i_1] \circ s[i_2] \circ \cdots \circ s[i_k])  \\[8pt]
\sigma &=s_{i_1} s_{i_2} \ldots s_{i_k}
\end{align}
$$


where $1 \le i_1 < i_2 < \cdots < i_k \le n$.

For example, if the string is $\tt{algorithms}$ (of length 10), then $\tt{lot}$ is a subsequence with $i_1 = 2$, $i_2 = 4$, and $i_3 = 7$. Similarly,  $\tt{grim}$ is a subsequence. However,  $\tt{list}$ is **not** a subsequence.

> **Remark:** The indices $i_1, i_2, \ldots, i_k$ need not be contiguous; if they are contiguous (consecutive), then the subsequence is called a ***substring***.

The number of substrings is $O(n^2)$, whereas the number of subsequences is $2^n$. (Do you see why?)

> [!def] Prefix of a string
> Given string $$A = a_1 \ldots a_n$$ the *prefix* of length $i$ (the first $i$ characters of $A$) is written as $$A[1..i] = a_1 \ldots a_i.$$ 
> 
> A prefix of string $S$ is a substring of $S$ that occurs at the start $S$.



