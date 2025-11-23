## 1. GREEDY

Use greedy when:

1. You make **one choice at a time (each step)** 
2. You never reconsider it so it must be the optimal choice
3. After making a choice, we check for constraints (if any) and aggressively prune the search space. 
4. So “making the locally best choice” leads to a globally best solution.

Greedy =
“Always pick what looks best *right now*, don’t look back.”

Common signs a problem might be greedy:

- **ORDER MATTERS** = greedy needs a globally consistent way to decide which option is best “right now.” — the greedy choice or the selection order.
- The choice at one step does not affect later steps in complicated ways.
- There is a natural “best next option.”
- Problems about scheduling, intervals, shortest paths in unweighted or simply weighted contexts.

If choices interact with each other heavily, **greedy fails**.

---

## 2. DYNAMIC PROGRAMMING (DP)

Use DP when:

1. A problem can be split into **overlapping and interdependent** subproblems
2. You need to combine solutions to form larger solutions (every solution depends on the solution from an earlier one) ⇒ need some **ORDER** such that all dependencies are met and we solve smaller subproblems first.
3. Greedy choices don’t work because early decisions impact later ones
4. There is **optimal substructure**:  
    “optimal solution = combination of optimal smaller solutions.”

DP is "smart recursion" because it finds every possible solution to the problem and returns the most optimal solution.

DP =  
“Try all possibilities, but organise your work so you don’t repeat computations.”

Common signs DP is needed:

- Problems ask for “maximum,” “minimum,” “count,” “best way,” etc.
- A choice now affects what choices are possible later.
- Recurrence relations naturally arise.

---

## 3. DIVIDE AND CONQUER

Use divide-and-conquer when:

1. You can break the input into smaller **independent** pieces
2. Solve them separately
3. Combine the results cheaply.

**Are the subproblems independent? Can I solve them separately and combine easily?**
If choices in one half affect choices in another → D&C fails.

Divide & Conquer =  
“Split → Solve Recursively → Merge.”

Common signs:

- Sorting (merge sort, quicksort)
- Searching (binary search)
- Geometric problems that split space
- Convolutions / algorithms that halve the problem each time
    

If subproblems are **not independent**, or combining solutions is complicated, it’s probably *not* divide-and-conquer.

---

## 4. MAX-FLOW PROBLEM

The Max-Flow algorithm solves the many-to-many assignment problem:

- resources must be assigned,
- choices interact globally,
- both sides have capacities,
- you’re maximizing total assignment,

Max flow problems often have these signals:

1. “Assign as many X to Y as possible.”
2. “Maximize throughput.”
3. “Resources have capacities.”
4. Bipartite structure (two groups: movies ↔ customers).
5. Each unit of flow corresponds to a real object (a movie copy).


- Resource allocation with capacities on both sides (and the objective is to maximise the resource allocation).




