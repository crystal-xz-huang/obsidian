---
aliases:
  - Discrete Binary Search
modules:
  - "[[Divide and Conquer]]"
tags:
  - topic/divide-and-conquer
  - topic/binary-search
---

# Decrease and Conquer: Binary Search

The first kind of divide and conquer algorithm is often referred to as **decrease and conquer**. 

In decrease and conquer, we are not splitting the problem into multiple smaller subproblems. Rather, we reduce the size of the subproblem recursively. Therefore, decrease and conquer algorithms are a kind of degenerate divide and conquer algorithm, where we only consider one smaller subproblem.

A typical example of this is **binary search**. In binary search, we split the array into two halves but only recurse on one side — in this sense, we are only concerned with one subproblem.

When we wanted to decide if an element $x$ exists in an array $A$, we required $n$ queries in the worst case! If we know further information about the properties of our input, we can make further improvements to reduce the running time or memory usage.  

Binary search is an optimisation technique that reduces the number of queries from $n$ down to $\lceil \log_2 n \rceil$. However, for binary search to be effective, we require two properties to hold:

- **Well-defined interval.** If we want to query the middle element, we need a well-defined interval to begin with so that the middle element is defined.
- **Monotonicity.** If we remove a set of elements, we should ensure that we never have to query any of the elements that we previously discarded.

These 2 constraints are what we need to prove to apply binary search.

# Discrete Binary Search

Discrete Binary Search is an application of the standard binary search algorithm to find a specific value within a **monotonic** function

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
>
> $$
> \underbrace{1, 1, \ldots, 1, 1}_{\forall \ b \ < \ t}, 
> \underbrace{ {\color{blue}0}, 0, \ldots, 0, 0}_{\forall \ b \ \geq \ t}
> $$

## Example Problems

```base
filters:
  and:
    - or:
        - file.hasTag("topic/binary-search")
        - file.hasLink(this.file)
    - or:
        - file.hasTag("examples")
        - '!file.hasTag("categories")'
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

```base
filters:
  and:
    - file.hasLink(this)
formulas:
  Path: file.path
properties:
  note.created:
    displayName: Date
  file.name:
    displayName: Title
  note.categories:
    displayName: Categories
views:
  - type: table
    name: Backlinks
    order:
      - file.name
      - categories
      - created
    sort:
      - property: created
        direction: DESC
    columnSize:
      file.name: 162
      note.categories: 158
  - type: table
    name: Recent entries
    order:
      - file.name
      - created
    sort:
      - property: created
        direction: DESC
    limit: 20

```

<hr class="dots"/>

# Binary Search

In binary search, we split the array into two halves but only recurse on one side — in this sense, we are only concerned with one subproblem.

Each comparison *divides* the problem size by 2 and *conquers* only one half.

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
- Solving this gives $T(n) = O(\log n)$.

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

## Templates

99% of binary search problems that you see online will fall into 1 of these 3 templates.
![](https://assets.leetcode.com/uploads/2023/02/13/template_diagram.png)

Each of these 3 provided templates provides a specific use case:

---
**Template #1** `(left <= right)`:


- Most basic and elementary form of Binary Search
- Search Condition can be determined without comparing to the element's neighbors (or use specific elements around it)
- No post-processing required because at each step, you are checking to see if the element has been found. If you reach the end, then you know the element is not found

---
**Template #2** `(left < right)`:


- An advanced way to implement Binary Search.
- Search Condition needs to access the element's immediate right neighbor
- Use the element's right neighbor to determine if the condition is met and decide whether to go left or right
- Guarantees Search Space is at least 2 in size at each step
- Post-processing required. Loop/Recursion ends when you have 1 element left. Need to assess if the remaining element meets the condition.

---
**Template #3** `(left + 1 < right):

- An alternative way to implement Binary Search
- Search Condition needs to access element's immediate left and right neighbors
- Use element's neighbors to determine if the condition is met and decide whether to go left or right
- Guarantees Search Space is at least 3 in size at each step
- Post-processing required. Loop/Recursion ends when you have 2 elements left. Need to assess if the remaining elements meet the condition.
---
### Binary Search Template I

> [!code] Distinguishing Syntax
> - Initial Condition: `left = 0, right = length-1`
> - Termination: `left > right`
> - Searching Left: `right = mid-1`
> - Searching Right: `left = mid+1`

```python
def binarySearch(nums, target):
    if len(nums) == 0:
        return -1

    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    # End Condition: left > right
    return -1
```

### Binary Search Template II

Template #2 is an advanced form of Binary Search.

- Use the element's right neighbor to determine if the condition is met and decide whether to go left or right
- Guarantees Search Space is at least 2 in size at each step
- Post-processing required. Loop/Recursion ends when you have 1 element left. Need to assess if the remaining element meets the condition.

> [!code] Distinguishing Syntax
> - Initial Condition: `left = 0, right = length - 1`
> - Termination: `left == right`
> - Searching Left: `right = mid`
> - Searching Right: `left = mid+1`

```python
def binarySearch(nums, target):
    if len(nums) == 0:
        return -1

    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid

    # Post-processing:
    # End Condition: left == right
    if nums[left] == target:
        return left
    return -1

```

###  Binary Search Template III

Template #3 is another unique form of Binary Search.

- Use the element's neighbors to determine if the condition is met and decide whether to go left or right
- Guarantees Search Space is at least 3 in size at each step
- Post-processing required. Loop/Recursion ends when you have 2 elements left. Need to assess if the remaining elements meet the condition.

> [!code] Distinguishing Syntax
> - Initial Condition: `left = 0, right = length-1`
> - Termination: `left + 1 == right`
> - Searching Left: `right = mid`
> - Searching Right: `left = mid`

```python
def binarySearch(nums, target):
    if len(nums) == 0:
        return -1

    left, right = 0, len(nums) - 1
    while left + 1 < right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid
        else:
            right = mid

    # Post-processing:
    # End Condition: left + 1 == right
    if nums[left] == target: return left
    if nums[right] == target: return right
    return -1
```

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
Shrink the search space as long as $\tt target \leq [left … right]$.

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
Shrink the interval from either the right or left side as long as $\tt [left … right] ≤ target$.


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

## References & Further Reading

- [Binary Search Explore Card - LeetCode](https://leetcode.com/explore/learn/card/binary-search/)

[^1]: Each recursive call halves the search space. After $k$ steps, there are $n / 2^k$ elements left. You stop when $n / 2^k = 1$, i.e. $k = \log_2 n$. Therefore the recursion depth/levels is $\log_2 n$.

[^2]: Here we take the **floor** of $\frac{R - L}{2}$, which is the **greatest** integer less than or equal to $\frac{R - L}{2}$. Alternatively, we can also take the **ceiling** of $\frac{R - L}{2}$, which is the **least** integer greater than or equal to $\frac{R - L}{2}$ ⇒ doing so will change the comparisons in steps (4) and (5). 

