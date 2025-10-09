# complexity classes

Problems are divided into classes known as Complexity Classes.

A computational problem is just a question that can be solved by an algorithm. U

For example, "is the natural number n prime?" is a computational problem.

- Decision problem
    - A decision problem is a question with a yes-or-no answer.
    - "Given a positive integer _n_, determine if _n_ is prime."
- Search problem
- Counting problem
    - A counting problem asks for the number of solutions to a given search problem.
    - "Given a positive integer n, count the number of nontrivial prime factors of n."
- An optimization problem asks for finding a "best possible" solution among the set of all possible solutions to a search problem.
    - "Given a graph _G_, find an independent set of _G_ of maximum size."

**P** is the class of problems that are solvable in polynomial time .
 **NP** is the class of problems that are solvable in polynomial time.

### 1. P (Polynomial time)

- Problems that can be **solved** in polynomial time.
- If input size is $n$, algorithm runs in $O(n^k)$ for some $k$.
- These problems are considered “easy” in the sense that they can be solved relatively quickly on a computer.
- ✅ Easy to check, ✅ Solveable.
- Examples: Sorting, shortest path (Dijkstra), primality testing, merge sort

---

### 2. NP (Nondeterministic Polynomial time)

- Problems where a given solution can be **verified** in polynomial time.  

    > If someone provides us with the solution to the problem, we can verify whether that solution is correct or incorrect in polynomial time.

- Formally, the set of all decision problems that can be verified in polynomial time by a non-deterministic algorithm (note that our computers are deterministic).
- 
- May or may not be solvable efficiently.
- ✅ Easy to check, ❓maybe hard to solve.
- Examples: Sudoku, 0/1 Knapsack, Boolean SAT.
- Important:
    - $P \subseteq NP$.
    - The big open question: $P \stackrel{?}{=} NP$.

---

### Co-NP (Complement of NP)

- if the answer to a problem  then there is proof that can be checked in polynomial time.
- Problems where a given solution can be **verified** in polynomial time.  

    > If someone provides us with the solution to the problem, we can verify whether that solution is correct or incorrect in polynomial time.

- May or may not be solvable efficiently.
- ✅ Easy to check, ❓maybe hard to solve.
- Examples: Sudoku, 0/1 Knapsack, Boolean SAT.
- Important:
    - $P \subseteq NP$.
    - The big open question: $P \stackrel{?}{=} NP$.



---

### 3. NP-Complete

- Subset of NP problems that are the **hardest problems in NP**.
    - Every other NP problem can be reduced to them (using a polynomial-time reduction).
- In plain words: **“If you solve one NP-complete problem efficiently, you solve all of NP efficiently.”**
- Definition:
    - They are in NP.
    - Every other NP problem can be reduced to them (using a polynomial-time reduction).
- Examples: SAT (satisfiability), 0/1 Knapsack (decision version), Traveling Salesman (decision form), Graph Coloring.

---

### 4. NP-Hard

- Problems that are **at least as hard as NP-complete problems – the hardest problems in NP**.
- Features:
    - 
    -  but they don’t even have to be in NP; they may not even be decidable.
- It is a class of problems such that every problem in NP reduces to NP-hard.
- That means they might not even be “verifiable” in polynomial time.
- In plain words: **“As hard as NP-complete, or worse.”**
- Examples:
    - Optimization version of TSP (“Find the shortest tour length”) → NP-hard but not NP (because verifying an optimal tour is not as simple as just checking).
    - Halting problem → NP-hard (but not in NP, and actually undecidable).

So:

- NP-hard problems are _harder or equal_ to NP-complete ones.
- NP-complete ⊆ NP ⊆ NP-hard (with NP-hard being a bigger umbrella).
Examples:
- [Knapsack optimization problems](https://en.wikipedia.org/wiki/Knapsack_problem "Knapsack problem")
- [Integer programming](https://en.wikipedia.org/wiki/Integer_programming "Integer programming")
- [Travelling salesman optimization problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem "Travelling salesman problem")
- [Minimum vertex cover](https://en.wikipedia.org/wiki/Vertex_cover "Vertex cover")
- [Maximum clique](https://en.wikipedia.org/wiki/Clique_problem "Clique problem")
- [Longest simple path](https://en.wikipedia.org/wiki/Hamiltonian_path_problem "Hamiltonian path problem")
- [Graph coloring](https://en.wikipedia.org/wiki/Graph_coloring "Graph coloring"); an application: register allocation in compilers

---

### 5. Other classes you might see later:

- **co-NP**: Problems where “no” answers can be verified quickly.
- **PSPACE**: Problems solvable with polynomial space (not necessarily polynomial time).
- **EXP**: Problems solvable in exponential time.

---

```
   NP-hard (the big scary superset)
   ┌──────────────────────────┐
   │                          │
   │   NP (verifiable fast)   │
   │   ┌───────────────────┐  │
   │   │ NP-complete       │  │
   │   └───────────────────┘  │
   └──────────────────────────┘
   P (solvable fast) ⊆ NP
```

---

## ✅ Summary in plain words

- **P**: Problems we can solve quickly.
- **NP**: Problems we can at least check quickly.
- **NP-complete**: The hardest problems inside NP. Solve one fast → all NP is fast.
- **NP-hard**: At least as hard as NP-complete, maybe worse (not even checkable fast).

---

👉 Do you want me to also give you a **real-world analogy** for these classes (like puzzles, riddles, or locks/keys) so NP-hard vs NP-complete is easier to visualize?