---
aliases:
  - Time Complexity
tags:
  - lecture-notes
  - module/1
  - week/1
date: 2025-09-17T14:00:00
---

# Time complexity

> [!NOTE]
> True-ish statements:
>
> - Heap sort is faster than bubble sort.
> - Linear search is slower than binary search.
> 
> Only true when comparing the <u>worse-case</u> performance of algorithms.

### Best, worst and average case

Different inputs of the same size may cause the algorithm to have different behaviour so we describe the complexity using best, worst and average cases.  

For example, the best case for a linear search on a list occurs when the desired element is the first element of the list (not when n is small). 

Tthe **best**, **worst**, and **average** cases of a given algorithm expresses what the resource usage (i.e. complexity) is _at least_, _at most_ and _on average_, respectively. 

- The *best*-case complexity is the *least* amount of resources an algorithm will need for inputs of size $n$. It describes an algorithm's behavior under optimal conditions. 
- The *worst*-case complexity is the *maximum* amount of resources an algorithm will need for any inputs of size n. It gives an *upper bound* on the resources required by the algorithm.  
- The *average*-case complexity is the amount of resource used by the algorithm, averaged over all possible inputs. It describes an algorithm's *typical* behavior on all inputs of size $n$.

> [!question]
> When analyzing an algorithm, should we study the best, worst, or average case performance? 

#### Worst case

In most problems in this course, we are concerned with the worst-case complexity, so as to be robust to maliciously created (or simply unlucky) instances. 

The advantage to analyzing the worst case is that you know for certain that the algorithm must perform *at least* that well. E.g. Knowing the worst-case time lets us know how much time might be needed in the worst case to guarantee that the algorithm will always finish on time.

<u>Example:</u> A sorting algorithm that takes $\mathcal{O}(n^{2})$ in the worse case is risky compared to one that guarantees $\mathcal{O}(n \log n)$ because an adversary could always give you inputs that trigger the worst case.

#### Best case

We will hardly ever discuss the best case. Best-case analysis is usually not helpful since it doesn’t say much about how an algorithm behaves in general.

Normally we are not interested in the best case, because this might happen only rarely and generally is too optimistic for a fair characterization of the algorithm’s running time. In other words, analysis based on the best case is not likely to be representative of the behavior of the algorithm. However, there are rare instances where a best-case analysis is useful—in particular, when the best case has high probability of occurring. The [Shellsort](https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/Shellsort.html#shellsort) and [Quicksort](https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/Quicksort.html#quicksort) algorithms both can take advantage of the best-case running time of [Insertion Sort](https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/InsertionSort.html#insertionsort) to become more efficient.

#### Average case

In some circumstances, one might accept occasional poor performance as a trade-off for good average performance over all possible inputs (or a large sample of them).

Sometimes, it’s worth considering the **_average_** or **_expected_** running time if:

- The worst case is rare, and
- The average behavior across random inputs is good.

But analysing the average case requires **probabilistic analysis**, which is beyond the scope of this course (except for algorithms we rely purely on results of this type from prior courses, (e.g. hash table operations, quicksort)

---

## Rates of growth

- How do we analyse the (best, worst or average case) performance of an algorithm?
- How do we compare two functions representing the worst-case runtime of each algorithm?

> [!question]
> If $f(100) > g(100)$, then does $f$ represent a greater running time, i.e. a slower algorithm?
>
> > [!answer]+
> > Not necessarily!
> >$n = 100$ might be an outlier, or too small to appreciate the efficiency of algorithm $f$.
> > We care more about which algorithm <u>scales better</u> i.e. its **rate of growth**.
>

When analyzing algorithms for efficiency, we’d like to categorise functions (i.e. complexities and therefore algorithms) by their **asymptotic rate of growth**. 

This can be done using the following asymptotic notations:

- [[Big-Oh notation]]
- [[Big-Omega notation]]
- [[Big-Theta notation]]

### Big-Oh notation

> [!definition]
> We say $f(n) = \mathcal{O}(g(n))$ if for <u>large enough</u> $n$, $f(n)$ is <u>at most</u> a constant multiple of $g(n)$.


- $g(n)$ is said to be an **asymptotic upper bound** for $f(n)$.  
- This means that the rate of growth of function $f$ is *no greater than that* of function $g$.
- An algorithm whose running time is $f(n)$ scales *at least as well* as one whose running time is $g(n)$.
- It’s true-ish to say that the former algorithm is “*at least as fast as*” the latter.
- Useful to **(over-)estimate** the complexity of a particular algorithm.

### Big-Omega notation

> [!definition]
> We say $f(n) = \Omega(g(n))$ if for <u>large enough</u> $n$, $f(n)$ is <u>at least</u> a constant multiple of $g(n)$.

- $g(n)$ is said to be an **asymptotic lower bound** for $f(n)$.  
- This means that the rate of growth of function $f$ is *no less than that* of function $g$.
- An algorithm whose running time is $f(n)$ scales *at least as badly as* one whose running time is $g(n)$.
- It’s true-ish to say that the former algorithm is “*no faster than*” the latter.
- Useful to **(under-)estimate** the complexity of a particular algorithm.
- For example, finding the maximum element of an unsorted array takes $\Omega(n)$ time, because you must consider every element.

### Big-Theta notation

> [!definition]
> We say $f(n) = \Theta(g(n))$ if  
>
> $$f(n) = O(g(n)) \; \text{ and } \; f(n) = \Omega(g(n)).$$

- $f(n)$ and $g(n)$ are said to have the *same* asymptotic growth rate.
- An algorithm whose running time is $f(n)$ <u>scales as well as one</u> whose running time is $g(n)$.
- It’s true-ish to say that the former algorithm is “*as fast as*” the latter.

---

### Challenge

Using these formal definitions, prove that if $f(n) = O(g(n))$ then $g(n) = Ω(f(n))$.

$${\displaystyle f(x)=\Omega (g(x))\Longleftrightarrow g(x)=O(f(x))}$$

---

### FAQ: Which notation do we use?

> [!question]
> You’ve previously seen statements such as
> 
> > *bubble sort runs in $O(n^2)$ time in the worst case.*
> 
> Should these statement be written using Θ(⋅) instead of O(⋅)?

> [!answer]
> They can, but they don’t have to be. The statements 
> 
> > *bubble sort runs in $O(n^2)$ time in the worst case*
> 
> and 
> 
> > *bubble sort runs in $Θ(n^2)$ time in the worst case*
> 
> are **both true**: they claim that the worst case running time is <u>at most</u> quadratic and <u>exactly</u> quadratic respectively.
>
> The $Θ(·)$ statement conveys more information than the $O(·)$ statement. However ==in most situations we just want to be sure that the running time hasn’t been underestimated, so $O(·)$ is the important part.==
> 
> Note that sometimes confusions arise because people write the more commonly used $O(·)$ as a shorthand for the less commonly used $Θ(·)$! Please be aware of the difference.

> [!abstract]
> Big-O vs Big-Theta
> - $O(n^2)$ → bubble sort takes **at most** $n^2$ operations
> - $Θ(n^2)$ → bubble sort takes **exactly** $n^2$ operations 
> 
> Which notation do we use?
> - Doesn't matter which notation, as long as it contains the information we care about. 
> - Big-O carries the info we care about = **the upper bound (big-O) of the time complexity**
> - If the algorithm runs faster (big-Theta), it doesn't affect our results.
> - But if it runs slower (big-Omega), then we have over-estimated the running time.

---

## Sum, Product and Quotient Rules

| Property | Rule | Notes |
|----------|------|-------|
| Sum | $f_1 + f_2 = O(g_1 + g_2) \;=\; O(\max(g_1, g_2))$ | Non-dominant terms can be ignored |
| Product | $f_1 \cdot f_2 = O(g_1 \cdot g_2)$ | Nested or sequential parts multiply |
| Quotient | $\dfrac{f_1}{f_2} = O\!\left(\dfrac{g_1}{g_2}\right)$ | Requires $f_2, g_2 > 0$ |

### Sum property

> [!abstract]
> If the time complexity of an algorithm is a sum of two different time complexities, the resultant Big-O notation is determined by the dominant term.
> 
> Consider an algorithm with two sequential phases:
> - Phase 1: Has a time complexity of $O(n^{2})$
> - Phase 2: Has a time complexity of $O(n\log n)$.
> 
> The total time complexity of the algorithm would be $O(n^2 + n \log n) = O(n^2)$ because the $n^2$ dominates. 

> [!definition] 
> If $f_1 = O(g_1)$ and $f_2 = O(g_2)$, then 
> $$\begin{align}
> f_1 + f_2 &= O(g_1 + g_2) \\
> &= O(\max(g_1, g_2)).
> \end{align}
> $$
>  The same property applies if $O$ is replaced by $\Omega$ or $\Theta$.

> [!quote]+ Fact
> If  $f_1 = O(g_1)$ and $f_2 = O(g_2)$, then  $f_1 + f_2 = O(g_1 + g_2)$.
> ==The last term $O(g_1 + g_2)$ is often rewritten as $O(\max(g_1, g_2))$, since $g_1 + g_2 \leq 2 \max(g_1, g_2)$.==
> 
> > [!NOTE]- Explanation
> > The max of any two real numbers $g_1, g_2 \geq 0$ is
> > $$
> > \max(g_1, g_2) =
> > \begin{cases}
> > g_1 & \text{if } g_1 \geq g_2, \\
> > g_2 & \text{if } g_2 \geq g_1.
> > \end{cases}
> > $$
> > 
> > Suppose $g_1 \geq g_2$. Then:
> > 
> > - $\max(g_1, g_2) = g_1$  
> > - $g_1 + g_2 \leq g_1 + g_1 = 2g_1 = 2 \max(g_1, g_2)$  
> > 
> > If instead $g_2 \geq g_1$, then:
> > 
> > - $\max(g_1, g_2) = g_2$  
> > - $g_1 + g_2 \leq g_2 + g_2 = 2g_2 = 2 \max(g_1, g_2)$  
> > 
> > So in either case:  
> > 
> > $$
> > g_1 + g_2 \leq 2 \max(g_1, g_2).
> > $$
> > 
> > This inequality tells us that **the sum of two functions is at most a constant factor (2) times the larger one.** 
> > 
> > Since Big-O ignores constant factors, we can replace $O(g_1 + g_2)$ with $O(\max(g_1, g_2))$.
> > 
> > For example, let $g_1 = n$ and $g_2 = n^2$.  
> > 
> > - $\max(g_1, g_2) = n^2$  
> > - $g_1 + g_2 = n + n^2 \leq 2n^2$  
> > - So $O(n + n^2) = O(n^2)$.

This property justifies ignoring (discarding) non-dominant terms: 
> if $f_2$ has a lower asymptotic bound than $f_1$, then the bound on $f_1$ also applies to $f_1 + f_2$.

For example, if $f_2$ is linear but $f_1$ is quadratic, then $f_1 + f_2$ is also quadratic.

This is useful for analysing algorithms that have two or more stages executed sequentially.

If $f_1$ is the running time of the first stage and $f_2$ of the second stage, then we can bound each stage and add the bounds, <u>or</u> simply take the most “expensive” stage.

---

### Product property

> [!definition]
> If $f_1 = O(g_1)$ and $f_2 = O(g_2)$, then  
> 
> $$
> f_1 \cdot f_2 = O(g_1 \cdot g_2)
> $$
> 
> In particular, if $f = O(g)$ and $\lambda$ is a constant (i.e. $\lambda = O(1)$), then  
> 
> $$
> \lambda \cdot f = O(g)
> $$
> 
> also.
> 
> The same property applies if $O$ is replaced by $\Omega$ or $\Theta$.

This is useful for analysing algorithms that have two or more nested parts.

If each execution of the inner part takes $f_2$ time, and it is executed $f_1$ many times, then we can bound each part and multiply the bounds.

---

### Quotient property

> [!definition] 
> If $f_1 = O(g_1)$ and $f_2 = \Omega(g_2)$, then  
> 
> $$
> \frac{f_1}{f_2} = O\!\left(\frac{g_1}{g_2}\right)
> $$
> 
> provided $f_2$ and $g_2$ are positive.
> 
> The same property applies if $O$ is replaced by $\Omega$ or $\Theta$.

This is useful for analysing algorithms where one stage’s cost is divided across repeated or averaged operations.

For example, if the total cost of processing is $f_1$ and it is evenly split over $f_2$ operations, then the average cost per operation is bounded by the quotient of their asymptotic bounds.