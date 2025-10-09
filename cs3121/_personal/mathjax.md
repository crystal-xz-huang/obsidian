https://docs.mathjax.org/en/latest/index.html


```
\bbox[red]{x+y}      % a red box behind x+y
\bbox[2pt]{x+1}      % an invisible box around x+y with 2pt of extra space
\bbox[red,2pt]{x+1}  % a red box around x+y with 2pt of extra space
\bbox[5px, border: 2px solid red]{x+1}
                     % a 2px red border around the math 5px away
```

$\bbox[red]{x+y}$
$\bbox[red,2pt]{x+1}$
$\bbox[5px, border: 2px solid red]{x+1}$

```
\color{red}{x} + \color{blue}{y}
```

$\color{red}{x} + \color{blue}{y}$


$\mathtt{due_i}$ .  

Perfect, Crystal — this is _very_ close to what your lecturer wants.  
Your setup and definitions are spot-on 👏 — you’ve correctly mirrored the structure of _BuyingLicensesInThisEconomy!_ and _PrinterScheduling_.

You just need to polish two things:

1. **the sign/direction of the inequality** in the “improvement” line (since we’re maximizing, not minimizing), and
    
2. **finish the algebra** for the (S_{A^*}-S_A) step, and the concluding explanation.
    

Here’s the completed version, formatted exactly in your course style.

---

### ☕ **CaffeineVouchers**

The optimal ordering is to sort the vouchers in ascending order.  
We now show that this is optimal with an **exchange argument via inversions.**

Fix the drinks in ascending order of caffeine content:  
[  
c_1 \le c_2 \le \cdots \le c_n .  
]

Denote permutations of ({1,\dots,n}) as **allocations**, where the allocation (\pi) represents using voucher (\pi(i)) on drink (i).  
We define an **inversion** as follows:

> A pair ((i,j)) of indices forms an inversion in (\pi) if and only if  
> (i<j) and (v_{\pi(i)} > v_{\pi(j)}).

That is, an inversion occurs when we use a higher-value voucher (more servings) on a weaker drink earlier, and a lower-value voucher on a stronger drink later.

---

The greedy allocation (G) has no inversions, and so it suffices to prove that resolving an **adjacent inversion** is always an improvement (or breaks even).

Let (A) be any alternative allocation with at least one inversion.  
It follows that (A) has an adjacent inversion, i.e. there is some index (i) such that  
[  
v_{A(i)} > v_{A(i+1)} .  
]

Define the new allocation (A^\ast) as follows:  
[  
A^\ast(k) =  
\begin{cases}  
A(i+1), & \text{if } k = i, \  
A(i), & \text{if } k = i+1, \  
A(k), & \text{otherwise.}  
\end{cases}  
]

---

We now prove that resolving the inversion in this way is an improvement or breaks even — that is, the total caffeine in allocation (A^\ast) is **no less than** in allocation (A).  
By a sequence of such swaps, we can always reach the greedy allocation (G), and therefore no other allocation (A) can achieve a strictly greater total caffeine than the greedy solution.

Let (S_\pi) denote the total caffeine obtained under allocation (\pi):  
[  
S_\pi = \sum_{k=1}^n v_{\pi(k)},c_k.  
]

We have that  
[  
\begin{aligned}  
S_{A^\ast} - S_A  
&= \big(v_{A(i+1)}c_i + v_{A(i)}c_{i+1}\big)

- \big(v_{A(i)}c_i + v_{A(i+1)}c_{i+1}\big) \  
&= (v_{A(i)} - v_{A(i+1)})(c_{i+1} - c_i).  
\end{aligned}  
]


Since (v_{A(i)} > v_{A(i+1)}) and (c_{i+1} \ge c_i), it follows that  
[  
S_{A^\ast} - S_A \ge 0,  
]  
with strict (>,0) whenever (c_{i+1} > c_i).

Thus, resolving any adjacent inversion cannot decrease the total caffeine and in fact increases it whenever the two drinks differ in caffeine content.

---

By repeatedly resolving inversions, we can transform any allocation (A) into the greedy allocation (G) without reducing the total caffeine:  
[  
S_A \le S_{A^\ast} \le \dots \le S_G.  
]  
Hence, the greedy allocation (G) — where vouchers are in ascending order of value to match the ascending caffeine order of drinks — **maximises the total caffeine.**

---

### Time complexity

Sorting the drinks and vouchers each takes (O(n \log n)) time, so the greedy algorithm runs in (O(n \log n)).

---

✅ **Checklist — you’ve matched the scaffold:**

|Scaffold Step|Present?|
|---|---|
|Define the domain (permutation meaning)|✅|
|Define inversion formally|✅|
|Identify greedy solution has no inversions|✅|
|Pick an adjacent inversion and define swap (A^\ast)|✅|
|Compute (S_{A^\ast} - S_A)|✅|
|Show the sign of the change|✅|
|Conclude greedy is optimal via iterative swaps|✅|

---

Would you like me to show a one-sentence transition to connect this section to your “algorithm” description (the part where you say “The optimal ordering is to sort vouchers in ascending order”) so it feels exactly like the tone of _BuyingLicensesInThisEconomy!_?


Perfect — yes, that’s exactly the kind of clear, step-by-step structure your examples use (and it’s what your lecturer wants to see).  
Here’s how you can write that section cleanly in that same scaffolded format:

---

Let (S_{\pi}) denote the total caffeine for any allocation (\pi) of ({1,\dots,n}):

[  
S_{\pi} = \sum_{i=1}^n v_{\pi(i)} \cdot c_i.  
]

In (S_A) and (S_{A^\ast}), the terms for indices (1) to (i-1) and for (i+2) to (n) match exactly, since these positions are unaffected by the swap.  
Let (D) be the sum of these common terms.  
Then we can write

[  
\begin{aligned}  
S_A &= D + \big( v_{A(i)} c_i + v_{A(i+1)} c_{i+1} \big), \  
S_{A^\ast} &= D + \big( v_{A(i+1)} c_i + v_{A(i)} c_{i+1} \big).  
\end{aligned}  
]

Therefore,

[  
\begin{aligned}  
S_{A^\ast} - S_A  
&= \big(v_{A(i+1)} c_i + v_{A(i)} c_{i+1}\big)

- \big(v_{A(i)} c_i + v_{A(i+1)} c_{i+1}\big) \  
    &= (v_{A(i)} - v_{A(i+1)}) (c_{i+1} - c_i).  
    \end{aligned}  
    ]
    

Since (v_{A(i)} > v_{A(i+1)}) and (c_{i+1} \ge c_i), it follows that

[  
S_{A^\ast} - S_A \ge 0,  
]  
with strict inequality whenever (c_{i+1} > c_i).  
Hence resolving an adjacent inversion cannot decrease the total caffeine and in fact increases it whenever the two drinks differ in caffeine content.

---

✅ This version:

- introduces (S_\pi) formally,
    
- separates the unaffected terms (using (D)),
    
- makes the algebra crystal clear,
    
- and leads directly into the conclusion that removing inversions monotonically improves the total caffeine.