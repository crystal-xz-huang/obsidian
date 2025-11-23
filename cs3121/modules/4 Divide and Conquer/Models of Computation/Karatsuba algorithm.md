---
modules:
  - "[[Divide and Conquer]]"
tags:
  - topic/divide-and-conquer
  - algorithms
---

# The Karatsuba Algorithm

Recall the [[Integer Multiplication]] problem, where we are given two n-digit integers $x$ and $y$ and output the product of the two numbers. The long multiplication/grade school algorithm runs in $O(n^2)$ time.

With divide and conquer, we divide each of $x$ and $y$ into two ($n/2$)-digit numbers in the following way: $x = 10^{n/2} a + b$ and $y = 10^{n/2} c + d$. Then we compute 4 multiplications $xy = ac \cdot 10^{n} + 10^{n/2}(ad + bc) + bd$.

Karatsuba found that since we only need the sum of $ad$ and $bc$, we can save one multiplication operation by noting that
$$
ad + bc \;=\; (a + b)(c + d) \;-\; ac \;-\; bd.
$$

> [!solution]  The Karatsuba algorithm
> **Split:** Split each of our two input numbers A and B into halves:
> - $A_0, B_0$ - the least significant $n/2$ bits;  
> - $A_1, B_1$ - the most significant $n/2$ bits.
> 
> Now rearranging the bracketed expression gives
> $$
> \begin{align}
> AB &= A_1B_1\,2^n + (A_1B_0 + B_1A_0)\,2^{n/2} + A_0B_0, \\ 
> &= A_1B_1\,2^n + ((A_1 + A_0) (B_1 + B_0) - A_1B_1 - A_0B_0)\,2^{n/2} + A_0B_0.\\ 
> \end{align}
> $$
> saving one multiplication at each round of the recursion!
> 
> **Recurse:** We recursively apply the following algorithm to multiply two integers $A$ and $B$, each consisting of $n$ bits.  
> 
> The base case is $n = 1$, where we simply evaluate the product. 
> 
> Otherwise, we let  
> - $A_1$ and $A_0$ be the most and least significant parts of $A$ respectively  
> - $B_1$ and $B_0$ be the most and least significant parts of $A$ respectively.
> 
> Now, we compute  
> 1. $X = A_0B_0$  
> 2. $W = A_1B_1$  
> 3. $V = (A_1 + A_0)(B_1 + B_0)$  
> 
> recursively, as each is a product of two (approximately) $n/2$-bit integers.
> 
> Finally, we compute $W\,2^{n} + (V - W - X)\,2^{n/2} + X$ by summing  
> - $W$ shifted left by $n$ bits  
> - $V$ less $W$ and $X$ shifted left by $n/2$ bits
> - $X$ with no shift.
> 

> [!time] Time Complexity
> <b>How many steps does this algorithm take?</b>  
> Each multiplication of two $n$ digit numbers is replaced by <u>three</u> multiplications of $n/2$ digit numbers  
> $$X = A_0B_0,\quad W = A_1B_1,\quad V = (A_1 + A_0)(B_1 + B_0)$$
> 
> with linear additional work to shift and add. Therefore the recurrence is  
> $$
> T(n) = {\color{lime} 3}\,T\!\left(\frac{n}{2}\right) + c\,n,
> $$
> 
> From the recurrence  
> $$
> T(n) = {\color{lime} 3}\,T\!\left(\frac{n}{2}\right) + c\,n,
> $$
> we have $a = {\color{lime} 3}$, $b = 2$, and $f(n) = c\,n$.  
> 
> Now the critical exponent is $c^\ast = \log_2 {\color{lime} 3}$. Once again, we are in **Case 1** of the Master Theorem, but this time  
> 
> $$
> T(n) = \Theta\!\left(n^{\log_2 3}\right)
>       = \Theta\!\left(n^{1.58\ldots}\right)
>       \ne \Omega(n^2),
> $$
> disproving **Kolmogorov’s conjecture**.


