%%sibling-links-start%%

>[!summary]+ See Also
>- [[Big-Oh notation#Big-Oh (O) Upper Bound|Big-Oh notation]]
>- [[Big-Omega notation#Big-Omega (Ω) Lower Bound|Big-Omega notation]]

%%sibling-links-end%%

# Big-Theta (ϴ): Tight Bound

## Lecture Reference

> [!definition]
> We say $f(n) = \Theta(g(n))$ if  
>
> $$f(n) = O(g(n)) \; \text{ and } \; f(n) = \Omega(g(n)).$$

- $g(n)$ is said to be an **asymptotic tight bound** for $f(n)$.
- $f(n)$ and $g(n)$ are said to have the *same* asymptotic growth rate.  
- An algorithm whose running time is $f(n)$ <u>scales as well as one</u> whose running time is $g(n)$.  
- It’s true-ish to say that the former algorithm is “*as fast as*” the latter.

---

## Summary

> [!definition] Formal definition
>
> $$
> f(n) = \Theta(g(n))
> \;\;\iff\;\;
> \exists\, c_1, c_2 > 0,\, n_0 > 0
> \;\; \text{such that} \;\;
> c_1 g(n) \leq f(n) \leq c_2 g(n)
> \quad \forall n \geq n_0
> $$

Given two algorithm time complexity functions, f(n) and g(n), the formal mathematical definition states that:

- $f(n) = \Theta(g(n))$ if there are two positive constants c1 and c2 and a value n0, such that 
- $c_1 \cdot g(n) \leq f(n) \leq c_2 \cdot g(n)$ for all $n \geq n_0$.

That is, the growth rate of $f(n)$ is bounded from **above and below** (at the same time) by the **same** function $g(n)$ for all large enough n.

> [!abstract]
> We write $f(n) = \Theta(g(n))$ if:
>
> $$c_{1} \; g(n)\leq f(n)\leq c_{2} \; g(n) \quad \text{ for all } n \geq n_0$$

> [!abstract]
>
> We write $$f(n) = \Theta(g(n))$$
>
> if **both** are true:
> - $f(n) = O(g(n))$ (upper bound), and
> - $f(n) = \Omega(g(n))$ (lower bound).



