---
modules:
  - "[[Foundations|Module 1: Foundations]]"
categories:
  - "[[Proofs]]"
---
# Reasoning about Algorithms

Whenever we present an algorithm, we must justify its **correctness** and **efficiency**.  

We need to provide reasoning for the claims that:  

1. it always gives the right answer, and  
2. it runs in the time complexity we claim.  

Straightforward claims might need only a sentence of reasoning (see [[#Example Mergesort|example on mergesort]] below), but for a less obvious claim, the burden is higher.

---

# The Role of Proofs in Algorithm Design

Sometimes it is not easy to gather from the description of an algorithm:  
- that it terminates, rather than entering an infinite loop,  
- how many steps it takes to terminate, and whether this is acceptably small, or  
- whether the answer it reports is actually correct.  

We always need to justify the claims we make about algorithms, and occasionally that requires a detailed proof.  

---

# Example: Mergesort

>[!cue] Justifying Algorithms

> [!example] Example: Mergesort
> > Algorithm
> 
> We recursively apply the following algorithm to the subarray $A[l..r]$:  
> 
> If $l = r$, i.e. the subarray has only one element, we simply exit. 
> This is the base case of our recursion.  
> 
> Otherwise:  
> - first define $m = \frac{l+r}{2}$, the midpoint of the subarray,
> - then apply the algorithm recursively to $A[l..m]$ and $A[m+1..r]$, and
> - finally <u>merge</u> the subarrays $A[l..m]$ and $A[m+1..r]$.  
> 
> > Reasoning
> > is the algorithm correct (does it sort), does it terminate, how fast is it and why?
> 
> - The depth of recursion in mergesort is $\log_2 n$.
> - On each level of recursion, merging all the intermediate arrays takes $O(n)$ steps in total.  
> - Thus, mergesort always terminates, and in fact it terminates in $O(n \log n)$ steps.  
> - Singleton arrays are sorted, and merging two sorted arrays always produces a sorted array. Therefore, the output of mergesort will be a sorted array.  
> 	- This part is actually a [[Proofs#Proof by Induction|proof by induction]] on the size of the array! 
> 	- Where we can communicate an idea succinctly, we should do so. An argument can be rigorous without notation for its own sake. i.e. **don’t always need to write a long, formal induction proof if its obvious – just explain the reasoning clearly**

> [!cue] Proof by Induction 
> **Proposition/Statement.** Mergesort sorts arrays of size $n$.
> 
>  **Proof.** Let $P(n)$ be the statement "mergesort sorts an array of size $n$". We induce on $n$ (prove by induction on $n$).
>  
> 1. *Base case*: Show that $P(n)$ holds for the smallest size $n = 1$.
> 2. *Inductive Step:* Assume the induction hypothesis: $P(n)$ holds for all sizes less than $n$. Then use this assumption to prove that the statement holds for $n$. 

> [!NOTE]
> “Singleton arrays are sorted, and merging two sorted arrays always produces a sorted array. Therefore, the output of mergesort will be a sorted array.” is a [[Proofs#Strong Induction|strong proof by induction]]:
> 
> - **Base case**: "*Singleton arrays are sorted*" → arrays of size 1 are trivially sorted
> 	- Prove that mergesort correctly sorts the smallest possible array, i.e. n = 1.
> - **Inductive Step**: "*Merging two sorted arrays always produces a sorted array*" 
> 	- Assume the <u>induction hypothesis</u>: mergesort correctly sorts all arrays of size < n, or more specifically, mergesort correctly sorts $A[1..m]$ and $A[m+1..n]$.
> 	- Prove that mergesort correctly sorts all arrays of size n (under this assumption). 
> 	- For an array of size n $A[1..n]$:
> 		- mergesort splits it into two subarrays of size < n $A[1..m]$ and $A[m+1..n]$, and
> 		- recursively sorts them (by the inductive hypothesis),
> 		- then merges them into a single sorted array of size n.
> 	- Therefore, $A[1..n]$ is sorted.
> - **Conclusion**: "*Therefore, the output of mergesort will be a sorted array.*"
> 	- The proposition holds for all $n \geq 1$ (or $n ≥ 0$).
