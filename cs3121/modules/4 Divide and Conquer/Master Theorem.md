---
tags:
  - topic/divide-and-conquer
  - notes/theory
---

## Recurrences

A recurrence is a succinct description of a system that depends on itself, usually by calling itself multiple times. For divide and conquer algorithms, we often split the problem instance into multiple smaller instances of the *same* problem. To quickly analyse the running time of the algorithm, we usually write it as a recurrence.

Let $T(n)$ denote the running time of the algorithm on a problem of size $n$. Then, if we divide the problem instance into $a$ copies of itself, each of size $n/b$, we can succinctly write $T(n)$ in terms of $T(n/b)$; specifically,

$$
T(n) = aT\!\left(\frac{n}{b}\right) + f(n),
$$

where $f(n)$ is the amount of overhead work used to combine all $a$ subproblems.  
Pictorially, this recurrence can be viewed as a recursion tree.

![[recursion tree for the recurrence.png]]

The total amount of work required of an algorithm with recurrence $T(n) = aT(n/b) + f(n)$ is the sum of the amount of work at each level. In other words, the amount of work is given by

$$
\begin{align}
T(n) 
&= f(n) + a f\!\left(n/b\right) + a^2 f\!\left(n/{b^2}\right) + \cdots + a^L f\!\left(n/{b^L}\right) \\
&= \sum_{i=0}^{L} a^i f\!\left(\frac{n}{b^i}\right),
\end{align}
$$

where $L = \log_b n$.  

## The Master Theorem

The Master Theorem gives conditions on $f(n)$, and the asymptotic complexity can be resolved depending on which term dominates.

- If $a f(n/b) > c f(n)$ for some constant $c > 1$, then the series forms an **ascending geometric series**.  The largest term in the series, therefore, is the last term, and so $T(n) = \Theta(n^{\log_b a}).$ To see why this is the case, note that
$$
\begin{align}
a^L f\!\left(\tfrac{n}{b^L}\right)  
&= a^{\log_b n} f\left(\frac{n}{b^{\log_b n}}\right)\\
&= a^{\log_b n} f(1) \\
&= \Theta\!\left(a^{\log_b n}\right) &&(\text{since } f(1) = \Theta(1))\\
&= \Theta\!\left(n^{\log_b a}\right), \\
\end{align}
$$

- If $a f(n/b) < c f(n)$ for some constant $c > 1$, then the series forms a **descending geometric series**.  The largest term in the series, therefore, is the first term, and so $T(n) = \Theta(f(n)).$
- If $a f(n/b) = f(n)$, then each term in the series contributes equally to the overall work required. Thus, in this case, $$T(n) = \Theta(f(n)L) = \Theta(f(n) \log n).$$
- Otherwise, this analysis is not applicable, and we need to resort to other methods such as unrolling the recurrence.


### The Akra-Bazzi Method

Consider a general divide and conquer recurrence:

$$
T(n) = a\,T\!\left(\frac{n}{b}\right) + f(n),
$$ 

where $a > 0$ and $b > 1$ are constants. Assume that $f$ grows polynomially; that is, we make the assumption that 
$$f(n) = \Omega(n^{c}), \; f(n) = O(n^{d})$$
with $0 < c ≤ d.$

> [!theorem]  Theorem (The Master Theorem).
> Let $T(n) = aT(n/b) + n^c.$ Then
> 
> $$
> T(n) =
> \begin{cases}
> \Theta(n^{\log_b a}) & \text{if } c < \log_b a - \varepsilon, \\[6pt]
> \Theta(n^c \log n, & \text{if } c = \log_b a, \\[6pt]
> \Theta(n^c) & \text{if } c > \log_b a + \varepsilon.
> \end{cases}
> $$


### Extensions of The Master Theorem

> [!theorem]  Theorem (Extension of The Master Theorem).
> Consider the standard divide and conquer recurrence
> $$T(n) = a\,T(n/b) + f(n)$$
> where $a \ge 1$ is an integer and $b > 1$ is a real number. Define $c = \log_b a.$
> 
> $$
> T(n) =
> \begin{cases}
> \Theta\!\left(n^{\log_b a}\right)
> & \text{if } f(n) = O\!\left(n^{c-\varepsilon}\right)\ &\text{for some }\varepsilon>0, \\[6pt]
> \Theta\!\left(n^{c}\log^{k+1} n\right)
> & \text{if } f(n) = \Theta\!\left(n^{c}\log^{k} n\right)\ &\text{for some }k\ge 0, \\[6pt]
> \Theta\!\left(f(n)\right)
> & \text{if } f(n) = \Omega\!\left(n^{c+\varepsilon}\right)\ &\text{for some }\varepsilon>0 \ \text{\color{red}{and}} \ af(n/b) \le k\,f(n)\ \text{for some }k<1 \ \text{and all }n\ge n_0.
> \end{cases}
> $$
> 
> 1. If $f(n)$ is polynomially *smaller* than $n^{\log_b a}$, then $n^{\log_b a}$ dominates, 
>    and the runtime is $\Theta\!\left(n^{\log_b a}\right)$.  
> 2. If $f(n)$ and $n^{\log_b a}$ are asymptotically the *same*, 
>    then $T(n) = \Theta\!\left(n^{\log_b a} \log n\right)$.
> 3. If $f(n)$ is instead polynomially *larger* than $n^{\log_b a}$, then $f(n)$ dominates, 
>    and the runtime is $\Theta\!\left(f(n)\right)$.  

Consider the standard divide and conquer recurrence
$$T(n) = aT(n/b) + f(n),$$
where $a \ge 1$ is an integer and $b > 1$ is a real number. Define $c = \log_b a$. 
Then we have the following result.
1. If $f(n) = O(n^{c-\varepsilon})$ for some $\varepsilon > 0$, then $T(n) = \Theta\!\left(n^{\log_b a}\right)$. 
  <i style="color:var(--text-faint)">This is the same as the first case of the Akra–Bazzi version of the Master Theorem.</i>
2. If $f(n) = \Theta\!\left(n^{c}\log^{k} n\right)$ for some $k \ge 0$, then $T(n) = \Theta\!\left(n^{c}\log^{k+1} n\right)$. 
  <i style="color:var(--text-faint)">Note that this is the same as $T(n) = \Theta(f(n)\log n)$.</i>
3. If $f(n) = \Omega(n^{c+\varepsilon})$ for some constant $\varepsilon > 0$ and for some $k < 1$, we have that 
  $$a f(n/b) \le k f(n)$$
  for all $n \ge n_0$, then $T(n) = \Theta(f(n))$.
  <i style="color:var(--text-faint)">Remember that the regularity condition enforces the series to form a descending geometric series.</i>

### Summary 

In the simplified form, we assume the non-recursive work $f(n)$ is a polynomial of the form $f(n) = n^d$, whereas in the general version $f(n)$ is arbitrary.

Then we compare the exponent $d$ of $f(n)$ to the critical exponent $\log_b a$ of the recursion cost $a\,T\!\left(n/b\right)$.

Note that exponent is the "growth rate".

- If $d < \log_b a$, recursion dominates.
- If $d = \log_b a$, they balance.
- If $d > \log_b a$, the non-recursive work dominates.

> [!summary]
> In the simplified version, we compare the exponent $d$ of $f(n)$ (assumed to be $n^d$) to the critical exponent $\log_b a$ of recursion.
> 
>  - $d \Longleftrightarrow \log_b a$
> 
> In the general theorem, we compare $f(n)$ to $n^{\log_b a}$ (the critical polynomial)
> 
> - $f(n) \Longleftrightarrow \Theta(\log_b a)$

> [!theorem] Master Theorem - simplified version
> Let $a \geq 1, b > 1$ be constants, and let $T(n)$ be the recurrence  
> $$
> T(n) = a\,T\!\left(\frac{n}{b}\right) + n^d,
> $$  
> defined for $n \geq 0$.  
> 
> In this recurrence, there are three constants:
> 
> - **$\pmb a$** is the number of subproblems that we create from one problem, and must be an integer greater than or equal to 1.  
> - **$\pmb b$** is the factor by which the input size shrinks (it must hold that $b > 1$).  
> - **$\pmb d$** is the exponent of $n$ in the time it takes to generate the subproblems and combine their solutions.
> 
> Then,
> $$
> T(n) =
> \begin{cases}
> \Theta\!\left(n^{\log_b a}\right), & \text{if } a > b^d, \\[6pt]
> \Theta\!\left(n^d \log n\right), & \text{if } a = b^d, \\[6pt]
> \Theta\!\left(n^d\right), & \text{if } a < b^d.
> \end{cases}
> $$
> 
> - **Case 1:** if $a > b^d$ then $T(n) \in \Theta\!\left(n^{\log_b a}\right)$.
> - **Case 2:** if $a = b^d$ then $T(n) \in \Theta\!\left(n^d \log n\right)$.
> - **Case 3:** if $a < b^d$ then $T(n) \in \Theta\!\left(n^d\right)$.
> 


> [!theorem] Master Theorem - more general version
Let $T(n) = aT(n/b) + f(n)$ be a recurrence where $a \geq 1, b > 1$. Then,
> 1. If $f(n) = O\!\left(n^{\log_b a - \varepsilon}\right)$ for some constant $\varepsilon > 0$, then  
>   $$T(n) = \Theta\!\left(n^{\log_b a}\right).$$
> 
> 2. If $f(n) = \Theta\!\left(n^{\log_b a}\right)$, then  
>   $$T(n) = \Theta\!\left(n^{\log_b a} \log n\right).$$
> 
> 3. If $f(n) = \Omega\!\left(n^{\log_b a + \varepsilon}\right)$ for some constant $\varepsilon>0$ and if  
> $af(n/b) \le kf(n)$ for some $k < 1$ and all sufficiently large $n$, then  
> $$
> T(n) = \Theta\!\left(f(n)\right).
> $$
> ---
> Define  the **critical exponent** $c = \log_b a$. Then,
> 
> 4. If $f(n) = O\!\left(n^{c - \varepsilon}\right)$ for some constant $\varepsilon > 0$, then  
>    $$
>    T(n) = \Theta\!\left(n^{c}\right).
>    $$
> 
> 5. If $f(n) = \Theta\!\left(n^{c}\right)$, then  
>    $$
>    T(n) = \Theta\!\left(n^{c} \log n\right).
>    $$
> 
> 6. If $f(n) = \Omega\!\left(n^{c + \varepsilon}\right)$ for some constant $\varepsilon > 0$ and if  
>    $a\,f(n/b) \le k\,f(n)$ for some $k < 1$ and all sufficiently large $n$, then  
>    $$
>    T(n) = \Theta\!\left(f(n)\right).
>    $$

> [!aside]+ Regularity Condition for Case 3
> In case (3) when $f(n)$ grows _faster_ than the recursive term $n^{\log_b a}$, then *if and only if* an additional condition holds, we can apply the master theorem.
> 
> The regularity condition:
> $$
> af(n/b) \le k\,f(n)\ \text{for some }k<1 \ \text{and for all sufficiently large }n\ge n_0
> $$
> 
> Basically, its a safety check to make sure that $f(n)$ actually dominates the recursive work.

> [!warning] Limitations
> Not every recurrence meets the conditions of the Master Theorem! 
> The theorem might not apply because:
> 
> - $f(n)$ fails the regularity condition for case 3, or 
> - $f(n)$ falls between two of the cases.

>[!note]
> - $f(n)$ is the work done in the top level of the recursion to split/recombine the problem.
> - The **critical polynomial** $\displaystyle n^{c^\ast}$ is the work done in the bottom level of the recursion.
> - The **critical exponent** $c^\ast = \log_b a$ is the growth rate of the critical polynomial.
>  
> $$c_{\operatorname{crit}} = \log_b a = \log(\#\text{subproblems})/\log(\text{relative subproblem size})$$

----

## Examples

![algorithm - Master's theorem with f(n)=log n - Stack Overflow](https://i.sstatic.net/lfvyc.png)

> [!summary]
> Given a recurrence relation:
> $$T(n) = a\,T(n/b) + f(n)$$
> (where $a$ and $b$ are specified). 
> 
> 0. Identify the three constants in the recurrence:
> 	- $a$ is the number of subproblems (must be an integer $\geq 1$)
> 	- $b$ is the factor by which the input size shrinks (it must hold that $b > 1$), and 
> 	- $f(n)$ is the time it takes to generate (split) the subproblems and combine their solutions—the non-recursive work done at the top level.
> 1. Calculate the critical exponent $c = \log_b a$.
> 2. Calculate the critical polynomial $n^{c^\ast}$, the recursive work done at the leaves. 
> 3. Compare $f(n)$ to $n^{c^\ast}$ to determine  $f(n)$'s  [[1.0 Asymptotic Notations#Asymptotic Notations O(), Ω(), and Θ()|asymptotic bounds]] $O(), \Theta()$ or $\Omega()$ with respect to $n^{c^\ast}$. 
> 	- **Case 1.** $f(n)$ grows **slower** than the critical polynomial (Oh)
> 	- **Case 2.** $f(n)$ grows **at the same rate** than the critical polynomial (Theta)
> 	- **Case 3.**  $f(n)$ grows **faster** than the critical polynomial (Omega)
> 4. See if one of the rules of the Master Theorem can be applied, and if so, apply it!

> [!theorem]
> <b>Setup</b>
> Consider the recurrence
> $$\begin{equation*}
> T(n) = aT(n/b) + f(n),
> \end{equation*}$$
> where $a \geq 1$ is an integer and $b > 1$ is a real number with $f(n) > 0$ asymptotically positive.[^1] 
> 
> Define the critical exponent $c^\ast = \log_b a$ and the critical polynomial $n^{c^\ast}$. 
> 
> > Observe that $n^{c^\ast} = n^{\log_b a}$ is just the number of leaves in the tree.
> 
> Then we have the following result.
> 
> <b>Theorem</b>
> - **Case 1.** If $f(n) = O(n^{c^\ast-\varepsilon})$ for some $\varepsilon > 0$, then $T(n) = \Theta(n^{c^\ast})$. 
> > If $f(n)$ is *slower (polynomially smaller)* than the critical polynomial, then $n^{c^\ast}$ dominates.
> - **Case 2.** If $f(n) = \Theta(n^{c^\ast})$, then $T(n) = \Theta(n^{c^\ast} \log n)$.
> >If $f(n)$ is *asymptotically the same* as the critical polynomial.
> - **Case 3.** If $f(n) = \Omega(n^{c^\ast+\varepsilon})$ for some $\varepsilon > 0$ ***and*** if $f$ satisfies the regularity condition $af(n/b) \le kf(n)$ for some constant $k < 1$ and for all $n > n_0$, then $T(n) = \Theta(f(n))$
> > If $f(n)$ is *faster (polynomially larger)* than the critical polynomial, then $f(n)$ dominates.
> 

> [!important]
> Recall that the critical exponent is computed by 
> $$c^\ast = \log_b a \quad a \geq 1, \ b > 1.$$
> If $a < b$, then we have $\log_b a < 1$ with $\log_b 1=0$ when $a=1$.

### Case 1

> [!example|style-5] 
> Consider the recurrence $$T(n) = 4\,T\!\left(\frac{n}{2}\right) + n.$$
> Notice that $a=4$, $b=2$ and $f(n)= n$. The critical exponent $c^\ast = \log_b a$ is equal to $\log_2 4 = 2$, so the critical polynomial is $n^2$. 
> 
> Now, $f(n) = n$ is asymptotically slower than the critical polynomial $n^2$, so 
> $$f(n) = n = O(n^{2-\varepsilon})$$ for suitable small $\varepsilon$.  In this case any $\varepsilon$ with $0 < \varepsilon < 1$ works, e.g. $0.1$.  
> 
> This satisfies the condition for **Case 1** of the Master Theorem, so $T(n) = \Theta(n^2)$.

> [!example|style-5] 
> Consider $T(n) = 4T(n/5) + 3\log n$.
> 
> The recurrence gives $a=4$, $b=5$ and $f(n) = 3\log n$.
> The critical exponent is $\log_5 4 < 1$, so the critical polynomial is $n^{\log_5 4}$. 
> 
> Now, $f(n) = 3\log n$ is asymptotically slower than $n^{\log_5 4}$ (polynomials grow faster than logarithms), so we have that 
> $$f(n) =  O(n^{\log_5 4 + \varepsilon})$$
> for suitable small $0<\varepsilon<1$. This satisfies the condition for **Case 1**, so $T(n) = O(n^{\log_5 4})$.
> 
> > [!answer] Feedback
> > The critical exponent is $\log_5 4 < 1$, we have that 
> > $$f(n) = O(n^{c^{\ast\ast}})$$
> > for $0<c^{\ast\ast}<c^{\ast}$  (polynomials grow faster than logarithms), so we fall into **Case 1** of the Master Theorem. Hence, $T(n) = O(n^{\log_5 4})$.

### Case 2

> [!example|style-5] Example 2
> Consider the recurrence $$T(n) = 2\,T\!\left(\tfrac{n}{2}\right) + 5n.$$
> 
> The critical exponent is $c^* = \log_b a = \log_2 2 = 1$, so the critical polynomial is $n^{c^*} = n$.
> 
> Now, $f(n) = 5n = \Theta(n)$.
> 
> This satisfies the condition for **Case 2**, so $T(n) = \Theta(n \log n)$.

### Case 3

#### Case 3 with regularity condition satisfied

> [!example|style-5] Example 3
> Consider the recurrence $$T(n) = 3\,T\!\left(n/4\right) + n.$$
> 
> > The recurrence gives $a = 3$, $b = 4$ and $f(n) = n$.
> 
> The critical exponent is $c^* = \log_4 3 \approx 0.7925$, so the critical polynomial is $n^{\log_4 3}$.
> Now, $f(n) = n = \Omega\!\big(n^{\log_4 3 + \varepsilon}\big)$ for suitable small $\varepsilon$.  
> For example, $\varepsilon = 0.1$ is sufficient, because $$\log_4 3 + \varepsilon \approx 0.7925 + 0.1 = 0.8925 < 1.$$
> 
> We also need to check the **regularity condition**! 
> **Case 3** of the Master Theorem is only applicable if for some $k < 1$ and some $n_0$, $$a f(n/b) \le k f(n)$$ holds for all $n > n_0$. 
> 
> The left-hand side is $3\,\tfrac{n}{4}$, so if we choose any $k$ between $\tfrac{3}{4}$ and $1$ then the required inequality will hold for all $n > n_0 = 0$.
> 
> Therefore we can choose $k = 0.9$ and $n_0 = 0$, so that whenever $n > n_0$ we have
> $$a f\!\left(\tfrac{n}{b}\right) = 3 f\!\left(\tfrac{n}{4}\right) = 3\,\tfrac{n}{4} < k\,n = k f(n).$$
> This satisfies the conditions for case 3, so $T(n) = \Theta\!\big(f(n)\big) = \Theta(n)$.

> [!example|style-5] 
> Consider the recurrence $$T(n) = T(n/2) + \sqrt{n}.$$
> 
> The recurrence gives $a=1$, $b=2$ and $f(n) = n^{1/2}$.
> The critical exponent is $\log_2 1 =0$, so the critical polynomial is $n^{0} =1$.
> 
> Now, $f(n) = n^{1/2}$ grows faster than a constant, so we have
> 
> $$f(n) = n^{1/2}= \Omega(n^{0 + ε})$$
> 
> for suitable small $\varepsilon$. For example,  $\varepsilon = 0.1$ is sufficient because $0.1 < 0.5$ so $n^{1/2} =\Omega(n^{0.1})$ holds.
> 
> Now check if $f$ satisfies the **regularity condition** $af(n/b) \le kf(n)$ for some constant $k < 1$ and for all $n > n_0$.
> 
> The LHS: 
> $$af(n/b) = 1 \cdot (n/2)^{1/2} = \frac{n^{1/2}}{\sqrt{2}}.$$
> 
> Putting this altogether, 
> $$
> \begin{align}
> \frac{n^{1/2}}{\sqrt{2}} &\le k \ n^{1/2} \\[4pt]
> \frac{1}{\sqrt{2}} &\le k &&\text{divide both sides by }n^{1/2}
> \end{align}
> $$
> For some constant $k<1$, does this hold for all sufficiently large $n$?
> 
> Choose any constant $k$ satisfying $\frac{1}{\sqrt{2}} \approx 0.7071 \leq k < 1$.
> For example, $k = 0.8$ works. So the regularity condition holds.
> 
> Therefore, $T(n) = \Theta(\sqrt(n))$.
> 
> > [!answer] Feedback
> > The critical exponent is $\log_2 1 = 0$, we have that $f(n) = \Omega(c^{\ast \ast})$ for $0<c^{\ast \ast} \leq \frac{1}2$, so we fall into Case 3 of the Master Theorem.
> > 
> > We are now required to check the **regularity condition**, i.e. $\frac{a}{\sqrt b} \sqrt{n} \le k \sqrt{n}$ for some constant $0<k < 1$ and large enough $n$.
> > 
> > Note that $\frac{a}{\sqrt b} = \frac{1}{\sqrt 2}$, so we can choose $k \in \left(\frac{1}{\sqrt 2}, 1 \right)$, and thus we satisfy the regularity condition.
> > 
> > Hence, $T(n) = \Theta(\sqrt(n))$.

#### Case 3 with regularity condition not satisfied

> [!example] Example 4
> Let $$T(n) = 2\,T\!\left(\tfrac{n}{2}\right) + n \log_2(\log_2 n.)$$
> Then the critical exponent is $c^* = \log_2 2 = 1$, so the critical polynomial is $n$.
> 
> Now, $f(n) = n \log_2(\log_2 n) \ne O(n)$, so cases 1 and 2 do not apply.
> 
> However, $f(n) \ne \Omega(n^{1+\varepsilon})$, no matter how small we choose $\varepsilon > 0$, so case 3 does not apply either.
> 
> **Therefore the Master Theorem does not apply!**



[^1]: Asymptotically positive means that the function is positive for all sufficiently large $n$. Formally, $f(n) > 0$ is a non-decreasing function defined on the positive integers.
