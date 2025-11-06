---
categories:
  - "[[Divide and Conquer]]"
  - "[[Decision and Optimisation Problems]]"
tags:
  - examples
  - topic/divide-and-conquer
  - topic/binary-search
status: open
---

# Maximum Median

> [!definition]
> The **median** of an array is the **middle value** (not position) in sorted order.  
>i.e. it is the middle value in an ordered data set.
> For example, the median of $[1, 2, {\color{blue}2}, 4, 5]$ is $2$.

> [!Problem] Optimisation problem
> Ling has an array $A$ consisting of $2n-1$ integers, sorted from smallest to largest. Note that the median is initially $A[n]$.
> 
> She wants her numbers to grow big and strong, so for each of the following $k$ days she adds $1$ to one of her numbers. 
> 
> At the end of the $k$ days, what is the largest possible median that her array can have?

> [!summary]
> - <b>Optimisation Problem:</b> 
>   Find the largest median value $t_{\max}$ in $A$ that can be achieved after at most $k$ increments.
> - <b>Decision Problem:</b> 
>   Given a target value $t$, decide if we can increase the median value of $A$ to be $\leq t$ using at most $k$ increments.
> - <b>Decision Solution:</b>
>   Count the number of increments needed to increase all values in $A[n] .. A[2n-1]$ to be at least $t$. Return $\text{YES}$ if the total increments is $\leq k$; otherwise $\text{NO}$. 
> - <b>Optimisation Solution:</b>
>   Find the largest value of $t$ in the set of all possible values where our decision algorithm returns yes. Because $d(t)$ is monotonic over $t$, we can find the last (rightmost) value of $t$ in $A[n:n+k]$ where $d(t) = \text{YES}$ with binary search.
> 

## Example optimisation problem

> [!Problem] Optimisation problem
> Ling has an array $A$ consisting of $2n-1$ integers, sorted from smallest to largest. Note that the median is initially $A[n]$.
> 
> She wants her numbers to grow big and strong, so for each of the following $k$ days she adds $1$ to one of her numbers. 
> 
> At the end of the $k$ days, what is the largest possible median that her array can have?

**Q:** Why is this problem hard? Which numbers should we increase, and how many times?

**A:** The median changes! The median is the middle value when the array is ***sorted***, so adding one to any number might change the sortedness ⇒ change the median of the array.

> [!warning] Counterexample
> If the starting array is $[1, 2, 2, 4, 5]$ and $k = 3$, the maximum median is $4$, achieved by adding $1$ to the third number on the first two days and to any number on the last day.
> Using all three **increases** on the third number does not make the median value $5$.
> 
> - day 1: $[1, 2, {\color{red}3}, 4, 5]$  
> - day 2: $[1, 2, {\color{red}4}, 4, 5]$ 
> - day 3: $[1, 2, {\color{red}5}, 4, 5]$ ⇒ $[1, 2,  {\color{blue}4}, 5, 5]$ after sorting. The new median is $4$ (not 5).

> [!observation]
> We are only concerned with the middle number and everything after it. 
> Numbers from the first half of the array can be left small since they don't affect the median (i.e. we can ignore the left half).

But we still don’t know how much to increase the numbers in the second half! 
What if we did know? What if we had a target to aim for, and we just had to report whether it was possible or not?

i.e. Given a target T, is it possible to make the median at least T?

## Example decision problem

Instead of maximising the median, we can turn the problem into a simpler yes/no version: 

> [!problem] Decision problem
> Given positive integers $t$ and $k$. Ling **wants** to know whether she can make the median of her numbers at least the target value $t$ (by adding 1 to one of her numbers each day for $k$ days).


**How do we get the median to at least $t$?** 
- Increase the middle value $A[n]$ and everything after it to $t$; nothing to do for any values that are $\ge t$ already.

**Why might we fail?** 
- $t$ could be too big (relative to $k$). i.e. if $k$ is too small then we could run out of days.
- Unused days are fine (so long as our array has at least 3 entries).

**Solution approach** 

For a given target median $t$, compute how many increments are required to make every element from $A[n]$ (the median) onward at least $t$.
 
To increase the median to at least $t$, we will need to increase the values:
- at index $n$ by $\max(t - A[n], 0)$
- at index $n + 1$ by $\max(t - A[n + 1], 0)$ …
- at index $2n - 1$ by $\max(t - A[2n - 1], 0)$.

> *In words:* Increase each $A[n+i]$ on the right by the difference $A[n]-A[n+i]$ (if positive; otherwise $0$) so that we have $A[n+i] ≥ A[n]$ until we reach the end.
> 
Since $A[n] = t, \, \max(t - A[i], 0)$ means the number of increments needed to bring $A[i]$ up to $t$, it its below $t$; otherwise, $0$. We solve this for all values of $i$ from $n$ (middle value) to the end value at $2n-1$. 

> [!solution] Algorithm (for decision problem)
> Iterate over indices $i$ from $n$ to $2n - 1$ to calculate
>
> $$\sum_{i=n}^{2n-1} \max(t - A[i], 0).$$
>
> If this value is $\le k$, report yes; otherwise report no. 
> This algorithm clearly runs in $O(n)$ in the worst case.

## Example problem

> [!problem] Decision problem
> Given positive integers $t$ and $k$. Ling wants to know whether she can make the median of her numbers at least the target value $t$ (by adding 1 to one of her numbers each day for $k$ days).

<b>Solved!</b> We can now test whether it’s possible to reach (or exceed) any target $t$ in $O(n)$ time.
Can we use this to solve our original optimisation problem? 

> [!problem] Optimisation Problem
> At the end of the $k$ days, what is the largest possible median $t$ that Ling’s array can have?

**Solution approach**. Apply our decision algorithm for different target values $t$. 

Which values of $t$ do we need to test?

> [!question] 
> **Q:** What possible target values $t$ do we need to test in order to solve the optimisation problem? 
> 
> **A:** Every value up to $A[n] + k$.
> 
> - Anything less than the current median $A[n]$ can’t possibly be the maximum median.  
> - The median can’t become any larger than $A[n] + k$, as we don’t have enough days to grow $A[n]$ that high, let alone $A[n + 1]$ and so on.
> 
> >If we spend all $k$ increments on the middle number for $A[n] + k$, we certainly can't get any bigger than that. This means we have a limit (upper bound) for $t$!

> [!solution] One Solution to Optimisation Problem
> <b>Solution.</b> Apply our decision algorithm to every target value $t$ from $A[n]$ through to $A[n] + k$.
> 
> <b>Time complexity.</b> We test $k + 1$ different target values, each taking $O(n)$ time. This gives a time complexity of $O((k + 1)n) = O(kn)$.

> [!question] 
> **Q:** Can we do better than this? Are there any target values in this range that we can skip? If we test a target $t$, does the result give us any information about other targets?
> 
> <b>Hint:</b> If we test a target $t$, does the result give us any information about <u>other</u> targets?
> 
> **A:** Recall that we are looking for the *largest* achievable target value. 
> - If a target $t$ is achievable, then any smaller target is also achievable! 
> - If a target $t$ isn’t achievable, then any larger target is also not achievable. 
> - Therefore targets are all achievable until some cutoff, and all impossible thereafter. Monotonic!

> [!observation]
> - If you can reach median $\ge t$,  then any smaller target $t' < t$ is also achievable.  
> - Conversely, if you can’t reach $t$, then you also can’t reach any larger target $t' > t$.
> 
> - Therefore targets are all achievable until some **cutoff point**:
> 
> $$
> \underbrace{\text{Yes, Yes, Yes, Yes}}_{\text{smaller targets achievable}}
> \;\; \underbrace{\text{No, No, No, No}}_{\text{larger targets not achievable}}
> $$
> 
> So there’s exactly one boundary value of $t$ where the answer flips from “yes” to “no.”
> 
> → the answers (solutions) to the decision problem is **monotonic** on $t$ since as $t$ increases, the answer can only go from Y → N.
> 
> Therefore, we can use **binary search** on $t$ to find this cutoff point; which is the largest $t$ for which the answer is "yes".

> [!solution|pink] Better solution to optimisation problem
> We can **binary search** on “is target $t$ achievable?” for $t$ in the range $[A[n] \ldots A[n] + k]$. 
> 
> We don’t have a pre-computed array of yes/no values; instead we’ll compute them as they’re needed in the binary search, by using our decision algorithm: 
> 
>  $$\text{is} \ \sum_{i=n}^{2n-1} \max(t - A[i], 0) \le k \ ?$$
>   
 i.e. can we achieve $t$ with less than $k$ increments?
> 
> <b>Time complexity.</b> The binary search has $O(\log k)$ steps each taking $O(n)$, so the time complexity is $O(n \log k)$.


## Discrete Binary Search

The approach we just used, of solving an optimisation problem by applying binary search over input values for the related decision problem, is called **discrete binary search**.

> [!example|text-center]
> <b>For which optimisation problems can we apply discrete ==binary search==?</b>
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


# Notes

Recall: The median is the middle value in a dataset that has been ***ordered*** (asc or desc).

Given a ***sorted*** array $A[1..2n-1]$ of length $2n-1$, the median is $A[n].$ 
Find the largest median value $t_{\max}$ that can be achieved after $k$ increments of any value in $A$.

> [!issue] 
> This is hard to solve directly because we don’t know what the final median value will be — it depends on how we distribute increments (and consequently how this impacts the order in the original dataset).
> 
> Ex: if we increment only the middle value $A[n]$ all $k$ times, then the newly incremented value of $A[n]$ may no longer be the median value iff 
> 
> $$\underbrace{A[n]+k}_{\text{new value of A[n]}} > A[n+1] \quad \text{and} \quad A^\ast[n] \nless A[n+1]$$ 
> 
> since the ***order*** has changed. 
> 
>If the median is $t$, then the middle value $A[n]$ must be $t$. It follows that all values after the midpoint $A[n]$ must be greater than the median value i.e. *at least* $t$.
> $$\therefore A[n] \geq t \iff \forall i \in [n, 2n-1], \ A[i] \ge t$$
> 
> i.e. If every element from $A[n]$ (midpoint) onwards is $\geq t$, then the median $A[n]\geq t$. 

> [!fix] 
> To make the median $\geq t$, all values from $A[n]$ to $A[2n-1]$ must be $\geq t$. 
> 
> Compute the **number of increments** required for all values in $A[n:2n-1] \geq t$: 
> 
> $$\textsf{NumIncrements}(t) = \sum_{i=n}^{2n-1} \max(t - A[i], 0)$$
>  Time complexity: $O(n)$
>  
> Recall: the original problem required at most $k$ increments. 
> 
> Therefore if $\textsf{NumIncrements}(t) \le k$, return $\texttt{Yes}$; otherwise return  $\texttt{No}$. 

> [!question]- 
> How do we use this decision algorithm to solve the optimisation problem?
> 
> Firstly, given a target value $t$, we can find the number of increments s.t. median $A[n] \geq t$. Then to maximise the value of $t$, we can solve for all possible values of $t$ that can be achieved using at most $k$ increments (i.e. $D(t) = \text{YES}$) and return the largest one.
> 
> The next question is what range of values of$t$ do we apply our decision algorithm to? 
> Clearly, the minimum value is $t = A[n]$. But what is the maximum?
> 
> Recall: we only care about incrementing the **middle value**. Why? 
> - Increasing the leftmost values does not shift it to the middle (even if it is large), 
> - Although we can shift the rightmost values forward to be the median, this is not efficient since its smaller than the middle value. 
> 
> $\therefore$ The maximum possible value of $A[n]$ after $k$ increments is  $A[n] + k.$ 
> 
> Therefore, one solution is to apply our decision algorithm $D(t)$ for all values of $t$ from $A[n]..A[n] + k$ and maximise this over all the possible values where $\text{D}(t) = \text{YES}$. 

> [!definition] Decision Algorithm
> Given positive integers $t$ and $k$. Design an algorithm that decides if *every* value in the suffix $A[n:2n-1]$ satisfies the following property:
> 
> $$\operatorname{D}(t) = \sum_{i=n}^{2n-1} \max(t - A[i], 0) \leq k.$$
> 
> In other words, if all elements from $A[n]$ onwards is strictly greater than $t$, then our algorithm should return $\text{YES}$ to indicate that the median value of $A$ is at least the target value $t$ using at most $k$ increments; otherwise, $\text{NO}$.
> 
> The solution is to just compute that sum. 
> 
> **Time complexity:** $O(n)$  since we check $n$ elements of the array (the left half).

> [!definition]  Optimisation Problem
> For all integers $t$ from $A[n]$ to $A[n] + k$, design an algorithm that returns the *largest* value of $t$ such that *every* value in the suffix $A[n:2n-1]$ satisfies the following property:
> 
> $$D(t) = \sum_{i=n}^{2n-1} \max(t - A[i], 0) \leq k.$$

We just need to find the largest $t$ for which the decision algorithm returns  $\text{YES}$.

The simplest solution is to maximise over all of the possible values of $t$ such that our decision algorithm returns $\text{YES}$. 

> [!definition]  Optimisation Algorithm
>Iterate over integers $t$ from $A[n]$ to $A[n] + k$ and take the maximum one:
>
> $$\operatorname{opt}(t) = \max \{ \, D(t) : A[n] \leq t \leq A[n] + k \, \}$$
> 
> **Time complexity:** $O(kn)$ since we consider $k+1$ possible values of $t$, and each subproblem takes $O(n)$ time to solve using our decision algorithm.

> [!definition] Discrete Binary Search
> However, this is too slow. Instead, we can observe that the set of values where $\text{D}(t) = \text{YES}$ is **monotonic non-decreasing** over $t$:
> 
> $$
> \underbrace{\text{Yes, Yes, Yes, Yes}}_{\text{smaller t achievable}}
> \;\; \underbrace{\text{No, No, No, No}}_{\text{larger t not achievable}}
> $$
> 
> > The largest $t$ is found at the **rightmost (last) index** in $A[n: n+k]$ where $\text {D(t)= YES}$.
> 
> This problem can be solved with [[Binary Search]] for $t$ in $A[n: n+k]$ where $t$ is the largest (last) element i.e. the rightmost point where $D(t) = YES$.
> - If $D(t) = \text{YES}$, continue in the RIGHT half by setting `L = mid + 1`
> - If $D(t) = \text{NO}$, continue in the LEFT half by setting `R = mid - 1`
> - Stop when $\ell > r$ 
> 
> **Time complexity.** The binary search has $O(\log k)$ steps each taking $O(n)$, so the time complexity is $O(n \log k)$.

