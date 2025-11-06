---
categories:
  - "[[Divide and Conquer]]"
tags: [examples, topic/divide-and-conquer]
status: open
---

# Master Theorem

If $T(n) = a\,T\!\left(\frac{n}{b}\right) + O(n^d)$ for constants $a \ge 1, b>1, d\geq0$, then

Define the <u>critical exponent</u> be $c^\ast = \log_b a$ and the <u>critical polynomial</u> is $n^{c^\ast}$.

Observe that $n^{c^\ast} = n^{\log_b a}$ is just the number of leaves in the tree.

<b>Theorem</b>
1. If $f(n) = O\!\left(n^{c^\ast-\varepsilon}\right)$ for some $\varepsilon > 0$, then $T(n) = \Theta\!\left(n^{c^\ast}\right)$.
2. If $f(n) = \Theta\!\left(n^{c^\ast}\right)$, then $T(n) = \Theta\!\left(n^{c^\ast} \log n\right)$.
3. If $f(n) = \Omega\!\left(n^{c^\ast+\varepsilon}\right)$ for some $\varepsilon > 0$, **and** if there exist $k < 1$ and some $n_0$, such that $$a\,f\left(\frac{n}b\right) \leq k\, f(n) \quad \text{for all } n > n_0$$

(the **regularity condition**), then $T(n) = \Theta\!\left(f(n)\right)$.



Simply put, compare $f(n)$ with $n^{c^\ast} = n^{\log_b a}$.

1. If $f(n)$ is polynomially smaller than $n^{\log_b a}$, then $n^{\log_b a}$ dominates, and the runtime is $\Theta\!\left(n^{\log_b a}\right)$.  
2. If $f(n)$ is polynomially larger than $n^{\log_b a}$, then $f(n)$ dominates, and the runtime is $\Theta\!\left(f(n)\right)$.  
3. Finally, if $f(n)$ and $n^{\log_b a}$ are asymptotically the same, then $T(n) = \Theta\!\left(n^{\log_b a} \log n\right)$.


[!theorem] Master Theorem
Given a recurrence of the form  

$$
T(n) = a\,T\!\left(\frac{n}{b}\right) + f(n),
$$  

where 
$a$ is the number of subproblems in the recursion,
$b$  is the factor by which the subproblem size is reduced in each recursive call
$f(n)$ denotes the amount of time taken at the top level of the recurrence

Compare the work to split/recombine the problem $f(n)$ to the *critical exponent* ${\displaystyle c^{\operatorname {crit} }=\log _{b}a}$ 



for constants $a \ge 1$ and $b > 1$ with $f(n)$ asymptotically positive, the following statements are true:

Define the <u>critical exponent</u> be $c^\ast = \log_b a$ and the <u>critical polynomial</u> is $n^{c^\ast}$.Define the <u>critical exponent</u> be $c^\ast = \log_b a$ and the <u>critical polynomial</u> is $n^{c^\ast}$.

**Case 1.** If $f(n) = O\!\left(n^{\log_b a - \varepsilon}\right)$ for some $\varepsilon > 0$, then $T(n) = \Theta\!\left(n^{\log_b a}\right).$

**Case 2.** If $f(n) = \Theta\!\left(n^{\log_b a}\right)$, then $T(n) = \Theta\!\left(n^{\log_b a} \log n\right).$

**Case 3.** If $f(n) = \Omega\!\left(n^{\log_b a + \varepsilon}\right)$ for some $\varepsilon > 0$ **and** if $a\,f(n/b) \le c\,f(n)$ for some constant $c < 1$ for all sufficiently large $n$, then $T(n) = \Theta\!\left(f(n)\right).$
> [!theorem] Master Theorem
> Given a recurrence of the form  
>
> $$
> T(n) = a\,T\!\left(\frac{n}{b}\right) + f(n),
> $$  
>
> for constants $a \ge 1$ and $b > 1$ with $f(n)$ asymptotically positive, the following statements are true:
> 
> **Case 1.** If $f(n) = O\!\left(n^{\log_b a - \varepsilon}\right)$ for some $\varepsilon > 0$, then $T(n) = \Theta\!\left(n^{\log_b a}\right).$
> 
> **Case 2.** If $f(n) = \Theta\!\left(n^{\log_b a}\right)$, then $T(n) = \Theta\!\left(n^{\log_b a} \log n\right).$
> 
> **Case 3.** If $f(n) = \Omega\!\left(n^{\log_b a + \varepsilon}\right)$ for some $\varepsilon > 0$ **and** if $a\,f(n/b) \le c\,f(n)$ for some constant $c < 1$ for all sufficiently large $n$, then $T(n) = \Theta\!\left(f(n)\right).$


> [!def] Master Theorem
> <b>Setup</b>
> Let:
> - $a \ge 1$ be an integer and $b>1$ be a real number;
> - $f(n) > 0$ be a non-decreasing function defined on the positive integers;
> - $T(n)$ be the solution of the recurrence $T(n) = a\,T\left(\frac{n}b\right) + f(n)$
> 
> Define the <u>critical exponent</u> be $c^\ast = \log_b a$ and the <u>critical polynomial</u> is $n^{c^\ast}$.
> 
> > Observe that $n^{c^\ast} = n^{\log_b a}$ is just the number of leaves in the tree.
> 
> <b>Theorem</b>
> There are three main cases:
> 1. If $f(n) = O\!\left(n^{c^\ast-\varepsilon}\right)$ for some $\varepsilon > 0$, then $T(n) = \Theta\!\left(n^{c^\ast}\right)$.
> 2. If $f(n) = \Theta\!\left(n^{c^\ast}\right)$, then $T(n) = \Theta\!\left(n^{c^\ast} \log n\right)$.
>
> 3. If $f(n) = \Omega\!\left(n^{c^\ast+\varepsilon}\right)$ for some $\varepsilon > 0$, **and** if there exist $k < 1$ and some $n_0$, such that $$a\,f\left(\frac{n}b\right) \leq k\, f(n) \quad \text{for all } n > n_0$$
>
> (the **regularity condition**), then $T(n) = \Theta\!\left(f(n)\right)$.
> 
> <b>Remarks</b>
> - Recall that for $a, b > 1$, $\log_a n = \Theta(\log_b n)$, so we can omit the base and simply write statements of the form $f(n) = \Theta\!\big(g(n)\log n\big)$. 
> - However, $n^{\log_a x}$ is not interchangeable with $n^{\log_b x}$ — the base must be specified in such expressions.

## Examples

![algorithm - Master's theorem with f(n)=log n - Stack Overflow](https://i.sstatic.net/lfvyc.png)