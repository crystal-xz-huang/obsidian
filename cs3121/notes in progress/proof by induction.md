# Introduction to Induction

Imagine you are trying to prove that you can climb a ladder.
First, you prove that you can get onto the bottom rung of the ladder (the **basis**). 
Next, you complete this proof by showing that from any rung of the ladder, you can climb up to the next one (the **step**).

Here are the main steps of the proof:

- **Base Case**: the base case of the proof. Usually it will be at `n = 1` or `n = 0`. In mathematical terms, this is proving that `p(0)` or `p(1)` is true.
- **Inductive Step:** there are two sub-steps here:
    - **Inductive Hypothesis:** assume that `p(n)` is true
    - **Inductive Step:** prove that `p(n + 1)` is true (using the inductive hypothesis, that says that `p(n)` is true.


One way of thinking about mathematical induction is to regard the statement we are trying to prove as not *one* proposition, but a *whole sequence* of propositions, one for each $n$. 

The trick used in mathematical induction is to (1) prove the first statement in the sequence, and then (2) prove that if any particular statement is true, then the one after it is also true. 

This enables us to conclude that *all* the statements are true.


