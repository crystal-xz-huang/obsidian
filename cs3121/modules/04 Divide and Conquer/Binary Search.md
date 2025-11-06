---
aliases:
  - Discrete Binary Search
categories:
  - "[[Divide and Conquer]]"
tags:
  - categories
  - topic/divide-and-conquer
  - topic/binary-search
status: open
---

# Discrete Binary Search

Discrete Binary Search is an application of the standard binary search algorithm to find a specific value within a **monotonic** function

- **Function Evaluation:** 
    Instead of directly accessing elements in an array, discrete binary search evaluates the function `f(x)` at a chosen `x` value within the search space.     
- **Monotonic Function:** The function being searched must be monotonic, meaning it is either consistently increasing or consistently decreasing over its integer domain. 

For example, suppose we have an algorithm that returns "Yes" or "No" to a decision problem. If the "Y" changes to a "N" (and doesn't switch back) over a sorted input of increasing/decreasing values of $x$, then we can use binary search to find the last input $x$ where $d(x) = \text{YES}$. 
  
$$
\underbrace{\text{Yes, Yes, Yes, Yes}}_{\text{smaller input x}}
\;\; \underbrace{\text{No, No, No, No}}_{\text{larger input x}}
$$
  
> [!question]
> <b>For which optimisation problems can we apply discrete binary search?</b>
> 
> - Suppose we have an optimisation problem that asks to find the largest integer $x$ with some properties.^[Similar ideas work for real $x$.]
> - Let $f(b)$ be the outcome of the decision problem when $x = b$, with $0$ for false and $1$ for true.
> - In some (but not all) such problems, if the condition holds with $x = b$ then it also holds with $x = b - 1$.  
> - Thus $f$ is all 1’s up to the first 0, after which it is all 0’s.  
> - Since this is **monotonic**, the optimisation problem can be rephrased as finding the largest $x$ such that $f(x) = 1$ using discrete binary search.
>   
> There’s exactly one cutoff value of $t$ where the answer flips from 1 to 0:
> $$
> \underbrace{1, 1, \ldots, 1, 1}_{\forall \ b \ < \ t}, 
> \underbrace{ {\color{blue}0}, 0, \ldots, 0, 0}_{\forall \ b \ \geq \ t}
> $$

## Example Problems

```base
filters:
  and:
    - file.hasTag("examples")
    - file.hasLink(this.file)
formulas:
  topic_tags: file.tags.filter(value.contains("topic"))
properties:
  file.name:
    displayName: Problem
  formula.topic_tags:
    displayName: Topics
views:
  - type: table
    name: Discrete Binary Search Problems
    order:
      - file.name
      - formula.topic_tags
    columnSize:
      file.name: 200
```


<hr class="dots"/>

# Binary Search

Binary search is a ==classic== example of the divide and conquer algorithm. Each comparison *divides* the problem size by 2 and *conquers* only one half — no overlap, no recomputation.

> [!summary]
> Steps:  
> - **Divide**: Test the midpoint of the search range ($\Theta(1)$) 
> 	- Split the array into half
> - **Conquer**: Search one side of the midpoint recursively  
> 	- Recursively search the relevant half (recursive step)
> - **Combine**: Pass the answer up the recursion tree ($\Theta(1)$)  
> 	- Return the found index or "not found" 
> 
> Recursion is $\log_2 n$ levels deep, with a total of $\Theta(1)$ time spent in each level.[^1]  
> Time complexity is $\Theta(\log n)$.

- The recurrence is $T(n) = T \left(\frac{n}{2}\right) + O(1)$ because each time you do one comparison (constant work) and recurse on half the array.
- Solving this gives $T(n) = O(\log n)$


## Algorithm

> [!abstract]
> Recall: **Binary search works on sorted arrays only.** 
> 
> Begin by comparing an element in the middle of the array with the target value.
> 1. If the target value *matches* the element, its position in the array is returned. 
> 2. If the target value is *less* than the element, the search continues in the *lower half* of the array. 
> 3. If the target value is *greater* than the element, the search continues in the *upper half* of the array. 
> 
> In iteration eliminates the half in which the target value cannot lie.

<b>Instance:</b> Given an array $A$, sorted in [[Increasing and decreasing#Non-decreasing (≤)|non-decreasing order]], and a target integer $x$. 
<b>Task:</b> Find the index of $x$ in $A$.

Check out the complete [Obsidian documentation](https://help.obsidian.md/) online, available in multiple languages.

1. Set $\ell$ to $0$ and $r$ to $n - 1$.
2. If ==$\ell > r$==, the search terminates as unsuccessful. (interval is empty)
3. Set $m$ (middle position) to $\ell + \left\lfloor (r - \ell)/2 \right\rfloor$ (greatest integer $≤ \frac{R - L}{2}$).[^2] 
4. If $A[m] < x$, set $\ell$ to $m + 1$ and go to step 2. %% continue search in upper half %%
5. If $A[m] > x$, set $r$ to $m - 1$ and go t`o step 2`. %% continue search in lower half %%
6. Else $A_m = x$, the search is done; return $m$.

```python
function binary_search(A, n, T) is
    L := 0
    R := n − 1
    while L ≤ R do
        m := L + floor((R - L) / 2)
        if A[m] < T then
            L := m + 1
        else if A[m] > T then
            R := m − 1
        else:
            return m
    return unsuccessful
```

Basically binary search reduces the initial search space $A$ to an interval $A[\ell, r]$ such that:

- the left endpoint $\ell$ is the **first (smallest)** index in $A$ with $A[\ell] > \text{target},$ and
- the right endpoint $r$ is the **last (largest)** index in $A$ with $A[r] < \text{target}.$

When $\ell = r$, 

## Binary Search Extensions

> Extensions/variations of binary search

Given an array $A$, sorted in [[Increasing and decreasing#Non-decreasing (≤)|non-decreasing order]], and a target integer $x$.

1. **Lower bound**: find the smallest index $i$ such that $A[i] \ge x$.
2. **Upper bound**: find the largest index $i$ such that $A[i] \le x$.
3. **Equal range**: find the range of indices $\ell..r$ such that $A[\ell] = \ldots = A[r] = x$.

### Lower Bound: Find first A\[i\] ≥ T

> [!NOTE]
> Predicate: `A[m] >= T`
> - $\ell$ is the leftmost index such that $A[\ell] \geq T$. 
> - $A[0 : \ell-1]$ is the prefix of elements in the array that are strictly less than $T$.
> - Insert $T$ at index $\ell$ in the sorted $A$.

The goal is for the left pointer to be the first index where `A[left] >= target`. 
Shrink the search space as long as $\tt target \leq [left ... right]$.

Decrease the right pointer if `A[m] >= target` because we have found a potential answer at `mid` but there might be a smaller index on the left side that also satisfies the condition. 
If `target` is not found, then `left` will be the first index where` A[left] > T`. 

```python 
function binary_search_leftmost(A, n, T):
    L := 0
    R := n - 1
    while L <= R:
        m := L + floor((R - L) / 2)
        if A[m] ≥ T:      # Found a potential answer
            ans := m       
            R := m - 1    # Look on the LEFT half [L..mid-1] 
        else:
            L := m + 1
    return ans
```

Alternatively, we can increase the left pointer until `A[mid] >= target` is satisfied:

```python
function binary_search_leftmost(A, n, T):
    L := 0
    R := n
    while L < R:
        m := L + floor((R - L) / 2)
        if A[m] < T:       # Too small
            L := m + 1     # Look on the RIGHT half [mid+1...R]
        else:
            R := m
    return L
```

1. Set $\ell$ to $0$ and $r$ to $n$.
2. While $\ell < r$,
	1. Set $m$ to $\ell + \left\lfloor (r - \ell)/2 \right\rfloor$ (greatest integer $≤ \frac{R - L}{2}$).
	2. ==If $A_m < T$ set $\ell$ to $m+1$.== %% continue search in upper half %%
	3. Else $A_m \ge x$; set $r$ to $m$. %% continue search in lower half %%
3. Return $\ell$ when $\ell = r$.


### Upper Bound: Find last A\[i\] ≤ T


The goal is for the right pointer to be the rightmost (last) index where `A[right] <= T`.
Shrink the interval from either the right or left side as long as $\tt [left ... right] ≤ target$.


Here, we increase the left pointer when `A[mid] <= target` to shrink the search space from the left until `[left, right]` converges to the rightmost index satisfying the condition.

```python
function binary_search_rightmost(A, n, T):
    L := 0
    R := n - 1
    ans := -1
    while L ≤ R:
        m := L + floor((R - L) / 2)
        if A[m] <=  T:
	        ans := m
	        L := m + 1
        else:
            R := m
    return ans
```


Alternatively, we can decrease the right pointer until `A[mid] <= target` is satisfied:

```python
function binary_search_rightmost(A, n, T):
    L := 0
    R := n
    while L < R:
        m := L + floor((R - L) / 2)
        if A[m] > T:
            R := m
        else:
            L := m + 1
    return R - 1
```

1. Set $\ell$ to $0$ and $r$ to $n$.
2. While $\ell < r$,
	1. Set $m$ to $\ell + \left\lfloor (r - \ell)/2 \right\rfloor$ (greatest integer $≤ \frac{R - L}{2}$).
	2. ==If $A_m > T$ set $r$ to $m$.== %% continue search in lower half %%
	3. Else $A_m \le x$; set $\ell$ to $m+1$. %% continue search in upper half %%
3. Return $r-1$ .

[^1]: Each recursive call halves the search space. After $k$ steps, there are $n / 2^k$ elements left. You stop when $n / 2^k = 1$, i.e. $k = \log_2 n$. Therefore the recursion depth/levels is $\log_2 n$.

[^2]: Here we take the **floor** of $\frac{R - L}{2}$, which is the **greatest** integer less than or equal to $\frac{R - L}{2}$. Alternatively, we can also take the **ceiling** of $\frac{R - L}{2}$, which is the **least** integer greater than or equal to $\frac{R - L}{2}$ ⇒ doing so will change the comparisons in steps (4) and (5). 

