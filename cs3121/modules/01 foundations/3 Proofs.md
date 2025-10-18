---
aliases: [Proofs]
tags: [lecture-notes, module/1, week/1]
date: 2025-09-17T14:00:00
files:
  - "[[01-foundations.pdf]]"
---
# Proofs

---

## Proposition or Statement

Propositions are **true/false** statements. It is any sentence that is unambiguously true or false. That is, a proposition or statement is a declarative sentence that can be *objectively* determined to be either true or false *but not both* at the same time. For example:

- "1 is an integer" is a (true) proposition.
- "Dogs are the best pets" is *not* a proposition.
- "x + 1 = 2" is *not* a proposition. (x is not specified, so the statement is ambiguous)
- "∀x ∈ ℕ, x + 1 = 2" is a (true) proposition. (x is specified, so the statement can be determined unambiguously)

Typically, a proposition is denoted by a lowercase letter, for example `p` or `q`.

The goal of an argument is usually to establish a relationship between propositions, often also using the following operations.  

| Notation | Meaning             | Formal term |
| ------------ | ----------------------- | --------------- |
| $\lnot P$    | not $P$                 | negation        |
| $P \land Q$  | $P$ and $Q$             | conjunction     |
| $P \lor Q$   | $P$ (inclusive-) or $Q$ | disjunction     |
| $P \to Q$    | if $P$ then $Q$         | implication     |

The quantifiers "for all" ($\forall$) and "for some" ($\exists$) are also very common.

---

## Proof by Induction

Prove all cases in a sequence by confirming a **base case**, and that any case implies its subsequent case.  

Used to prove a sequence of propositions $P_1, P_2, P_3, \dots$  
If the first proposition is true, and each one implies the next, then they are all true.  

We also make use of **strong induction**: If the first proposition is true, and the first $k$ always imply the $(k+1)$th, then they are all true.  

> [!NOTE] Proof Structure
> <u>Proposition/Statement</u>: For all $n \in \mathbb{N}, P(n)$ is true.
> 
> Proving this statement is broken down into 2 steps:
> 
> 1. The **base case**: Prove that the statement holds for 0, or 1.
> 2. The **inductive step**: Prove that for every $n$, if the statement holds for some arbitrary $n$, then it holds for $n + 1$. i.e. show the implication $P(k) \implies P(k+1)$ for any $k ≥ 0$.
> 	- *Induction Hypothesis*: Assume $P(k)$ is true for some arbitrary $k \geq 0$.
> 	- *Inductive Step*: Under this assumption, prove $P(k+1)$ is true.
> 
> > Inductive Step:
> > Given $P(k)$ holds for some $k \geq 0$ (_induction hypothesis_), prove that $P(k+1)$ also holds. 
> 
> To prove the induction step, we assume a **inductive hypothesis** that for a particular $k$, the statement $P(k)$ is true, and use this assumption to prove that the statement is also true for the next number, $k+1$. 
> 

### Regular Induction

> [!abstract]
> - Assume the induction hypothesis: $P(k)$ is true for some $k \geq 0$.
> - Under this assumption, prove $P(k+1)$ is true (inductive step).
> 
> So the proof structure is:
> - **Base case**: $P(0)$ (or $P(1)$, depending where we start).
> - **Inductive step**: $P(k) \implies P(k+1)$.

- The induction hypothesis assumes the statement is true for a single value $k$.
- Use regular induction if proving $P(k+1)$ depends only on $P(k)$ (e.g. $P(n)$ is in terms of $n$ only).  

Proof by induction of the statement “For all $n \in \mathbb{N}$, $P(n)$ is true” becomes:

1. **Base Case**: Prove that $P(n)$ is true for the smallest possible value of $n$. In this case, this is $P(1)$.
2. **Induction Hypothesis**: Assume that $P(n)$ is true for some $k \in \mathbb{N}$. That is, substitute $n = k$.
3. **Inductive Step**: Prove that $P(k) \Rightarrow P(k + 1)$ for all $k \in \mathbb{N}$. That is, substitute $n = k + 1$.

### Strong Induction

> [!abstract]
> - Assume the induction hypothesis: $P(1), P(2), \ldots, P(k)$ are all true.
> - Under this assumption, prove $P(k+1)$ is true (inductive step).
> 
> So the inductive step looks like:
> $$(P(1)∧P(2)∧⋯∧P(k))⟹P(k+1).$$
> 
> This is needed when the proof of $P(k+1)$ depends not just on $P(k)$, but potentially on all smaller cases.

- The induction hypothesis assumes the statement is true for all values from the base case up to $k$. 
- Use strong induction if proving $P(k+1)$ depends on multiple cases (e.g. $P(n)$ is a **recurrence relation**).  

Proof by induction of the statement “For all integers $n \geq D$, $P(n)$ is true” becomes:

1. **Base Case**: Prove that $P(n)$ is true for the smallest possible value of $n$. Let this be $P(0)$.
2. **Induction Hypothesis**: Assume that $P(n)$ is true for some values up to some $k \in \mathbb{N}$. That is, assume $P(0), P(1), \dots, P(k)$ are all true. 
3. **Inductive Step**: Prove that $P(k + 1)$ is true under the assumption that $P(0), P(1), \dots, P(k)$ are all true. 

---

## Proof by Contradiction

To prove that the statement $X$ is true, we show that it cannot be false using proof by contradiction.  

Used to prove a proposition $P$ by considering its negation $\lnot P$.  

If the assumption $\lnot P$ leads to a contradiction ($Q \land \lnot Q$ for some proposition $Q$), then $\lnot P$ is impossible, so $P$ holds.  

> [!example]
> Consider the game of *double-move chess*, where each side moves twice on their turn.  
> 
> - $P$: With perfect play, White can at least draw.  
> - Suppose otherwise ($\lnot P$). Then Black must have a winning strategy that works no matter what White does ($Q$).  
> - White could waste their first turn by moving a knight out and back, then implement the winning strategy themselves.  
> - So Black’s strategy is not winning after all! ($\lnot Q$).  

<u>General Structure</u>
Assume that the statement $X$ we want to prove is false, and use the assumption to derive a fact that is obviously false (a contradiction). This affirms that the original statement $X$ was in fact true.  

To prove a simple statement “$P$ is true” by contradiction:

1. **Suppose** (by way of contradiction) $P$ is false.  
2. Derive a contradiction from this assumption.  
3. Since the result is false, the initial assumption was false.  
4. Therefore, $P$ is true.  

To prove a conditional statement “If $P$ is true, then $Q$ is true” by contradiction:
1. **Suppose** $P$ is true.  
2. **Suppose** (by way of contradiction) $Q$ is false.  
3. Derive a contradiction from these assumptions.  
4. Since the result is false, the initial assumption was false.  
5. Therefore, $Q$ is true.  