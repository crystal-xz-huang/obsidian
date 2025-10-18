%%sibling-links-start%%

>[!summary]+ See Also
>- [[Big-Oh notation#Big-Oh (O) Upper Bound|Big-Oh notation]]
>- [[Big-Omega notation#Big-Omega (Ω) Lower Bound|Big-Omega notation]]
>- [[Big-Theta notation#Big-Theta (ϴ) Tight Bound|Big-Theta notation]]

%%sibling-links-end%%

# Big-Oh (O): Upper Bound

## Summary

> [!abstract]
> We write $\mathsf{f(n) = O(g(n))}$ if $\mathsf{f(n)}$ is *at most* $\mathsf{C \cdot g(n)}$ for <u>large enough</u> $n$.

> [!definition] Formal definition
>
> $$
> f(n) = O(g(n))
> \;\;\iff\;\;
> \exists\, C > 0,\, n_0 > 0 
> \;\; \text{such that} \;\;
> f(n) \leq C \cdot g(n) \quad \text{ for all } n \geq n_0.
> $$

>[!definition] Informal definition
> ${f(n) = O(g(n))}$ means ${f(n) \leq C \times g(n) \quad x \; \to \infty}$.
> ${f(n) = O(g(n))}$ means ${f(n) \leq C \times g(n) \quad \text{for all} \; n\geq n_{0}}$.
> ${f(n) = O(g(n))}$ means ${f(n) \leq C \times g(n) \quad \text{for large} \; n}$.

> [!abstract|pink] Description 
> ${f(n) = O(g(n))}$ means $f$ is bounded above by a multiple of $g$.
> ${f(n) = O(g(n))}$ means $f$ is asymptotically bounded above by $g$ (up to constant factor C).
> ${f(n) = O(g(n))}$ means$f$ grows no faster than $g$ (up to a constant).
>${f(n) = O(g(n))}$ means$f$ grows asymptotically no faster than $g$.
 > ${f(n) = O(g(n))}$ means $f$ will never (eventually) grow faster than $g$.

---

## Lecture Reference

> [!definition]
> We say $f(n) = \mathcal{O}(g(n))$ if for <u>large enough</u> $n$, $f(n)$ is <u>at most</u> a constant multiple of $g(n)$.

- $g(n)$ is said to be an **asymptotic upper bound** for $f(n)$.  
- This means that the rate of growth of function $f$ is *no greater than that* of function $g$.
- An algorithm whose running time is $f(n)$ scales *at least as well* as one whose running time is $g(n)$.
- It’s true-ish to say that the former algorithm is “*at least as fast as*” the latter.
- Useful to **(over-)estimate** the complexity of a particular algorithm.

### Examples

> [!example] Example 1
> Let `f(n) = 100n`. Then `f(n) = O(n)`, because `f(n)` is at most `100` times `n` for large `n`.

> [!info|gray bg-none]- Explanation
> 
> > [!abstract]
> > - Is $f(n)$ is always bounded on top by some constant of $n$, as long as $n$ is large enough?
> > - Does there exist a constant `C`, s.t. for large enough `n` (n ≥ n0), `f(n) ≤ C⋅n`?
> > - Is `100n ≤ Cn` for some `C`, when `n ≥ n0` (does `n0` exist such that this is true)?
> 
> > [!answer]
> > Yes. If the constant is `100`, then we get `100n ≤ 100n` which is true for all `n ≥ 1`.
> > In this case, the threshold is `n0 = 1`.
> 

> [!example] Example 2
> Let `f(n)=2n+7`. Then `f(n)=O(n^2)`, because `f(n)` is at most `1` times `n^2` for large `n`.
> Note that `f(n) = O(n)` is also true in this case.

> [!info|gray bg-none]- Explanation
> 
> > [!abstract]
> > The statement `f(n) = O(n^2)` is saying:
> > 1. `f(n)` is quadratic or slower (less than quadratic)
> > `2n+7` (linear) is `n^2` (quadratic) or slower
> > 2. `f(n) ≤ n^2`
> > `2n+7 ≤ n^2`
> > 3. `f(n)` is bounded by `C × n^2` eventually
> > `2n+7` is bounded by `C \times n^2` when n is large enough
> 
> > [!abstract]
> > The statement "`f(n)` is at most `1` times `n^2` for large `n`" is saying:
> >
> > $$f(n) ≤ 1 × n^2$$
> >
> > Therefore, the constant we pick is 1 i.e. `C = 1`.
> 
> > [!answer]
> > To prove this statement, we need to check:
> >
> > $$2n+7 ≤ n^2 \quad \text{for sufficiently large }n$$
> >
> > The constant we pick is 1.
> > Rearrange and solve this inequality to get $n_0 = 4$.
> > Then $2n +7 ≤ 1 × n^2$ for all $n ≥ 4$.
> > By definition, $f(n) = O(n^2)$.
> 
> 

> [!example] Example 3
> Let `f(n) = 0.001n^3`. Then `f(n) ≠ O(n^2)`, because for any constant multiple of `n^2`, `f(n)` will eventually exceed it.

### FAQ

The definition states that we only care about the function values for “large enough” $n$. 
How large is “large enough”?

Everything is small compared to the infinity of $n$-values beyond itself ($n \to \infty$).
It doesn’t matter how $f(1)$ compares to $g(1)$, or even how $f(1, 000, 000)$ compares to $g(1, 000, 000)$. We only care that $f(n)$ is bounded above by a multiple of $g(n)$ eventually.

#### Disclaimer

The actual running times DO matter, they just don't matter to asymptotic analysis.

Asymptotic analysis is <u>one</u> tool by which to compare algorithms. It is not the only consideration; the actual input sizes used and the constant factors hidden by the $\mathcal{O}(\cdot)$ can have a significant impact on practical running times.

Issues like how the algorithm is implemented, and the hardware used to execute the algorithm change the actual running time, but the dominant term of the running time will still be a constant times $n$.

---