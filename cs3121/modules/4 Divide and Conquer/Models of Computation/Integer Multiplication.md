---
modules:
  - "[[Divide and Conquer]]"
tags:
  - topic/divide-and-conquer
status: open
---


# Models of computation

In this section, we investigate how to multiply large integers quickly. This isn’t a very interesting question in the unit-cost model of computation, where all arithmetic operations (including multiplication) are assumed to take constant time.  

It is much more interesting in the **logarithmic model of computation**, where potentially huge inputs are thought of not as constant-sized, but as having size equal to their width, i.e. the number of symbols required to express them.  

> In base 2, this is the number of bits in the number. An integer of value $N$ has $n = \log_2 N$ bits.  

Recall however that any other base is equivalent, since the difference between logarithms of different bases is a constant factor.


# Brute Force

### Integer Addition

$$
\begin{array}{rcl}
\tt1\;0\;0\;0\;1\;\phantom{0}& &\leftarrow \texttt{carry} \\
\tt\;1\;0\;1\;0\;1 & &\leftarrow \texttt{first integer (21)} \\
\tt+\;1\;1\;0\;0\;1 & &\leftarrow \texttt{second integer (25)} \\[3pt]
\hline \
\tt1\;0\;1\;1\;1\;0 & &\leftarrow \texttt{result (46)}
\end{array}
$$

- Adding 3 bits can be done in constant time.  
- It follows that the whole algorithm runs in linear time, i.e. $O(n)$ steps, where the two numbers are each $n$ bits long.

> [!faq]
> **Q:** Can we add two n-bit numbers in faster than in linear time?
> 
> **A:** No! There is no asymptotically faster algorithm because we have to use every bit of the input numbers, which takes $Ω(n)$ time.

### Integer Multiplication

![[integer-mulitplication-basics.png]]

There are $O(n^2)$ **bit multiplications** (forming partial products) and $O(n^2)$ **bit additions** (accumulating them), so the basic binary multiplication runs in $O(n^2)$ time for $n$-bit inputs.

- **Multiplying two bits** is the same operation as **logical AND**, so clearly it takes constant time, but the same complexity applies for digits of other bases.  
- Thus, the above procedure runs in quadratic time $O(n^2)$.

> [!faq]
> **Q:** Can we multiply two n-bit numbers in linear time, like addition?
> **A:** No one knows! “Simple” problems can actually turn out to be difficult!

---

# Divide-and-Conquer Multiplication

> [!solution] Algorithm
> **Split:** Split the two input numbers A and B into halves:
> - $A_0, B_0$ - the least significant $n/2$ bits;  
> - $A_1, B_1$ - the most significant $n/2$ bits.
> 
> so that $A=A_1 2^{\tfrac{n}2} +A_0$ and $B=B_1 2^{\tfrac{n}2} +B_0$.
> 
> **Recurse:** $AB$ can now be calculated recursively using the following equation:
> 
> $$
> \begin{align}
> AB = A_1B_1\,2^n + (A_1B_0 + B_1A_0)\,2^{n/2} + A_0B_0.
> \end{align}
> $$
> 
> We recursively apply the following algorithm to multiply two integers $A$ and $B$, each consisting of $n$ bits. This requires four recursive multiplications!
> 
> The base case is $n = 1$, where we simply evaluate the product.  
> 
> Otherwise, we let:  
> - $A_1$ and $A_0$ be the most and least significant parts of $A$, respectively,  
> - $B_1$ and $B_0$ be the most and least significant parts of $B$, respectively.
> 
> Now, we compute:
> 1. $X = A_0B_0$
> 2. $Y = A_0B_1$
> 3. $Z = A_1B_0$
> 4. $W = A_1B_1$
> 
> recursively, as each is a product of two $n/2$-bit integers.
> 
> **Combine:** Finally, we compute $W\,2^n + (V-W-X)\,2^{n/2} + X$ by summing the results of the <u>four</u> recursive calls:
> - $W$ shifted left by $n$ bits,  
> - $Y$ and $Z$ each shifted left by $n/2$ bits, and  
> - $X$ with no shift.

> [!Time] Time Complexity
> <b>How many steps does this algorithm take?</b>
> Each multiplication of two $n$-digit numbers $(A, B)$ is replaced by <u>four</u> multiplications of $n/2$-digit numbers
> $$
> X = A_0B_0, \quad
> Y = A_0B_1, \quad
> Z = A_1B_0, \quad
> W = A_1B_1,
> $$
> with linear additional work to shift and add.
> 
> Therefore the recurrence is  
> $$
> T(n) = {\color{red} 4}\,T\!\left(\frac{n}{2}\right) + c\,n.
> $$
> 
> <b>Let’s use the Master Theorem!</b>
> 
> From the recurrence  
> $$
> T(n) = {\color{red} 4}\,T\!\left(\frac{n}{2}\right) + c\,n,
> $$
> we have $a = 4$, $b = 2$, and $f(n) = c\,n$.  
> 
> The critical exponent is $c^\ast = \log_2 4 = 2$, so the critical polynomial is $n^2$.  
> Then $f(n) = c\,n = O(n^{2 - 0.1})$, so **Case 1** applies.  
> 
> We conclude that  
> $$
> T(n) = \Theta(n^{c^\ast}) = \Theta(n^2),
> $$  
> i.e., we gained **nothing** with our divide-and-conquer!
> 

Is there a smarter multiplication algorithm taking less than $O(n^2)$ many steps?
SEE: [[Karatsuba algorithm]]!

