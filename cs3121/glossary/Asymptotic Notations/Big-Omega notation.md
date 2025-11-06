---
tags:
---
%%sibling-links-start%%

>[!summary]+ See Also
>- [[Big-Oh notation#Big-Oh (O) Upper Bound|Big-Oh notation]]
>- [[Big-Omega notation#Big-Omega (Ω) Lower Bound|Big-Omega notation]]
>- [[Big-Theta notation#Big-Theta (ϴ) Tight Bound|Big-Theta notation]]

%%sibling-links-end%%

# Big-Omega (Ω): Lower Bound

## Lecture Reference

> [!definition]
> We say $f(n) = \Omega(g(n))$ if for <u>large enough</u> $n$, $f(n)$ is <u>at least</u> a constant multiple of $g(n)$.

- $g(n)$ is said to be an **asymptotic lower bound** for $f(n)$.  
- This means that the rate of growth of function $f$ is *no less than that* of function $g$.
- An algorithm whose running time is $f(n)$ scales *at least as badly as* one whose running time is $g(n)$.
- It’s true-ish to say that the former algorithm is “*no faster than*” the latter.
- Useful to **(under-)estimate** the complexity of a particular algorithm.
	- For example, finding the maximum element of an unsorted array takes $\Omega(n)$ time, because you must consider every element.
- Only the dominant term will be relevant.

---

### Summary

> [!abstract]
> We write $\mathsf{f(n) = \Omega(g(n))}$ if $\mathsf{f(n)}$ is *at least* $\mathsf{C \cdot g(n)}$ for <u>large enough</u> $n$.

> [!definition] Formal definition
>
> $$
> f(n) = \Omega(g(n))
> \;\;\iff\;\;
> \exists\, c > 0,\, n_0 > 0 
> \;\; \text{such that} \;\;
> f(n) \geq c \cdot g(n) \quad \text{ for all } n \geq n_0.
> $$

>[!definition] Informal definition
> ${f(n) = \Omega(g(n))}$ means ${f(n) \geq C \times g(n) \quad x \; \to \infty}$.
> ${f(n) = \Omega(g(n))}$ means ${f(n) \geq C \times g(n) \quad \text{for all} \; n\geq n_{0}}$.
> ${f(n) = \Omega(g(n))}$ means ${f(n) \geq C \times g(n) \quad \text{for large} \; n}$.

> [!abstract|pink] Description 
> ${f(n) = \Omega(g(n))}$ means $f$ is bounded below by a multiple of $g$.
> ${f(n) = \Omega(g(n))}$ means $f$ is bounded below by $g$ asymptotically.
> ${f(n) = \Omega(g(n))}$ means $f$ grows no slower than $g$.

