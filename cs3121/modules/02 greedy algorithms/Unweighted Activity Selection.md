---
aliases:
  - "Greedy Algorithm: Activity Selection"
  - Unweighted Activity Selection
modules:
  - "[[Greedy Algorithms|Module 2: Greedy Algorithms]]"
categories:
  - "[[Interval Scheduling#Unweighted]]"
  - "[[Optimal Selection]]"
tags:
  - source/lecture
  - type/problem
  - topic/dynamic-programming
---
## Greedy Algorithm: Unweighted Activity Selection

> [!bookmark] Formal Definition
> Assume there exist $n$ activities with each of them being represented by a start time $s_i$ and finish time $f_i$. 
> 
> Two activities $i$ and $j$ are said to be non-conflicting if $s_i \geq f_j$ or $s_j \geq f_i.$ 
> (i.e. one activity ends before the other begins so they do not overlap)
> 
> Find the <i>maximal</i> solution set S of non-conflicting activities, such that there exists no other solution set S' where |S'| > |S|. 
> (i.e. select the maximum number of non-conflicting activities)
> 
> > Note that we want to find the maximum ***number*** of activities, **not** necessarily the maximum ***use*** of the resource 
> > — this is not the same as maximizing the time/duration for the resource to be used.

## Problem 

![[activity-selection-problem.png]]

## Greedy Template

| <pre>A = {a1, a2, …, an}  (\* A is the set of all activities \*)<br>S = ∅  (\* S will store all the activities that will be scheduled \*)<br><br><b>while</b> A is not empty <b>do</b><br>    choose i ∈ A <br>    add i to S<br>    remove from A all activities that overlap with i<br><b>return</b> the set S</pre> |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Greedy Template 1                                                                                                                                                                                                                                                                                                      |
<b>Algorithmic idea</b>:
1. Pick a criterion to be greedy about. 
2. Start from the first activity in $A$.
3. Take an activity $i$ based on chosen criterion.
4. Remove all **incompatible** activities from $A$ that conflict with $i$ and repeat. 

| <pre>A = {a1, a2, …, an}  (\* A is the set of all activities \*)<br>S = ∅                  (\* S will store all the selected activities \*)<br>s = {s1, s2, …, sn}  (\* s[i] is the start time of activity a[i] \*)<br>f = {f1, f2, …, fn}  (\* f[i] is the finish time of activity a[i] \*)<br><br>Sort A by <i>greedy choice criterion</i><br>S = {A[1]}  (\* Initialize S with first activity in A \*)<br>j = 1       (\* index of last activity added to S \*)<br>n = \|A\|     (\* number of activities \*)<br><br><b>for</b> i = 2 to n <b>do</b>   (\* Consider each activity in A, starting from the second \*)<br>    <b>if</b> s[i] ≥ f[j] <b>then</b><br>        add a[i] to S<br>        j = i       (\* Update index of last activity added to S \*)<br><b>return</b> the set S<br></pre> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Greedy Template 2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
<b>Algorithmic idea</b>:
1. Consider activities in some natural order.  
2. Take each activity **provided it's compatible (does not conflict)** with the ones already taken.

> [!task] Main Task
> <b>Task</b>: Decide the order in which to process (consider) activities in **A**
> 
> Possible choices:
> - <b>Earliest start time.</b> 
> 	- Consider activities in ascending order of $s_i$ 
> - <b>Earliest finish time.</b> 
> 	- Consider activities in ascending order of $f_j$ 
> - <b>Shortest interval.</b> 
> 	- Consider activities in ascending order of $f_i- s_i$, that is, smallest value of $f_i - s_i$.
> - <b>Fewest conflicts.</b> 
> 	- For each activity $a$, count the number of conflicting activities $c_a$. 
> 	- Consider activities in ascending order of $c_a$.

## Making the greedy choice

> [!question]
> What is the greedy choice for the activity-selection problem?
> What activities do we prioritize (in our selection)?

> [!tip]
> Intuition suggests that you should choose an activity that leaves the resource (aka time) available for as many other activities as possible.

Possible ideas:  
1. **Choose shorter activities first?**  
    - Shorter activites take up the least time so they leave more time (resources) for all future choices … this will help us maximise the number of activities. 
    - But what if the timeslot of the shortest activity happens to be in an awkward/worst-possible slot - like the middle slot - which reduces the selection space to half compared to if it was the first or last slot? 
2. **Choose activities which have fewest conflicts?**
    - Since the goal is to select non-overlapping activites, we can count the number of clashes for each activity and choose the ones with the least constraints. 
3. **Choose activities with earlier end times first?**  
    - An activity that with the earliest finish time gives us an optimal starting slot, and with leaves room available for all the future activities that follow it.

---

### Shortest Interval

Process activities that have the shortest interval first (provided it doesn't conflict with an activity we've already chosen).

| ![[activity-selection-attempt-1.png\|300\|figure]] |
| :----------------------------------------------------: |
|          Counterexample for shortest interval          |
- Our greedy algorithm chose 1 event only, and the maximum it could've chosen was 1.
- Clearly, this is not the most optimal answer, since its less than 4.

> [!idea] Possible ideas
> - [-] Choose shorter activities first?  
> - [ ] Choose activities which have fewest conflicts?  
> - [ ] Choose activities with earlier end times first?  

---

### Fewest Conflicts

Process activities that have the fewest “conflicts” first.

|                                                                                                                                                                        ![[activity-selection-attempt-2.png\|figure]]                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                                                                                                                               Counterexample for fewest conflicts                                                                                                                                                                               |
| The algorithm chooses the activity with the fewest possible number of clashes (in blue).  The middle activity is chosen first (2 clashes), and the two below it are discarded since they clash with it. This leaves us with a stack of 3 activites (all clashing with each other, can only pick one from the stack) + first and last activites. Arbitrarily pick the first and last activities. |
- Our greedy algorithm chose 3 events (in blue).
- Another counterexample would have been to pick the middle one, and one from each stack. But the number of events is still 3. 
- Clearly, this is not the most optimal answer, since its less than 4.

> [!idea] Possible ideas
> - [-] Choose shorter activities first?  
> - [-] Choose activities which have fewest conflicts?  
> - [ ] Choose activities with earlier end times first?  

---

### Earliest End Time (solution)

Process activites in the order of their finishing times, beginning with those that finish earliest.

|                        ![[activity-selection-attempt-3.png]]                         |
| :----------------------------------------------------------------------------------------: |
| Our greedy algorithm chose 4 events (in blue), which is the best you can do for this list. |
Here, the intuition is, selecting the interval with the earliest **finishing time** will maximize the remaining room (time window) for all future activities. 

> [!idea] Possible ideas
> - [-] Choose shorter activities first?  
> - [-] Choose activities which have fewest conflicts?  
> - [y] Choose activities with earlier end times first?  

---

## Algorithm

| <pre>algorithm <b>greedy_activity_selector</b>(A, s, f):<br>    n = \|A\|     (\* number of activities \*)<br><br>    Sort <i>activities</i> in <i>A</i> by their <i>finish times</i> stored in <i>f</i><br>    S = {a[1]}  (\* always select first activity \*)<br>    j = 1       (\* index of last selected activity \*)<br><br>    <b>for</b> i = 2 to n <b>do</b><br>        <b>if</b> s[i] ≥ f[j] <b>then</b><br>            S = S ∪ {a[i]}<br>            j = i<br>    <b>return</b> the set S<br></pre> |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
Note that these arrays are indexed starting from 1 up to n.
- Represent activities by ordered pairs of starting and finishing times.  
- Sort activities in increasing order of finishing time. Using mergesort, this takes $O(n \log n)$.  
- We then go through the sorted list in order.  

<b>How do we tell whether an activity conflicts with the already chosen activities?</b>
- Keep track of the finishing time of the last activity added to A. Then check if starting time of later than that. 
- To do this, we need the following:
	- Create (or pass) an array $f$ containing the *finish times* of the activities in A.
	- Create (or pass) an array $s$ containing the *start times* of the activities in A.
	- Create a variable $j$ that keeps track of the index of the last selected activity. 

---

## Time Complexity

The algorithm has two steps:

1. <b>Sorting</b> takes $O(n \log n)$.  
2. <b>Choosing</b> takes $O(n)$.  

Thus, the algorithm runs in total time $O(n \log n) + O(n) = O(n \log n).$

**Total complexity:** $O(n \log n)$.  

---

## Proof of Correctness 

> **Correctness**: The algorithm returns a valid solution; a set of non-overlapping activities.
> **Optimality**: The algorithm returns the best possible valid solution that maximizes (or minimizes) a specific objective; a set with the maximum number of compatible activities.

1. We first want to prove our algorithm yields a **valid** solution S.
	- Valid here means S consists of compatible (non-overlapping) activities.
	- This is true by construction!
2. We next want to prove our algorithm yields an **optimal** solution S.
	- Optimal here mean S selects the maximum number of activities
	- Note: ==there can be more than one optimal solution; we just need to prove our algorithm always finds one of them==

### Proving Optimality

#### Exchange Argument

To prove the correctness of our algorithm, we will use an **exchange argument**. 

We will show that *any* alternative selection can be transformed into a selection obtained by our greedy algorithm with *at least as many* activities.  


If we let $A$ be some arbitrary set of activities, and $G$ be our greedy set of activites:

- Goal: Show that $|A| \leq |G|$, and therefore conclude that $G$ is optimal.
- i.e., our greedy solution selects *at least as many activities* as any other solution, so it is at least as good as any other solution, and is therefore optimal itself.


> [!idea]
> - Start with some arbitrary optimal (or alternative) solution.
> - Show that if it disagrees with the greedy solution at some point, you can resolve the differences by “exchanging” part of it with the greedy choice **without making the (modified) solution worse** i.e. **|A| ≤ |A′|**
> - Repeating this exchange step, you eventually transform the other solution into the greedy solution. Since the exchanging did not make the solution worse, this proves that our greedy solution is **at least as good** as any other solution i.e. **|A| ≤ |G|**
This proof pattern typically follows these steps (by contradiction):

1. Start with some arbitrary (or optimal) solution
2. Identify the first point where the alternative and greedy solutions differ
3. Prove that exchanging the alternative choice for the greedy choice at this point cannot worsen the solution 
4. Conclude by induction that there must exist an optimal solution identical to the greedy solution

![[activity-selection-exchange.png]]

#### Proof 

Suppose the greedy algorithm selects activities $G = \{ g_1, \dots, g_r \}$, and consider some alternative selection $A = \{ a_1, \dots, a_s \}$, ==each in ascending order of ending time==.  


Step 1: Define your solutions.

- Let $G = \{ g_1, \dots, g_m \}$ be the set of activities selected by the greedy algorithm, ordered by finish times.
- Let $O = \{ o_1, \dots, o_{m'} \}$ be the set of activities selected by some arbitrary (or optimal) solution, also ordered by finish times.

Our aim is to prove that no other selection can have more activities than our greedy selection, regardless of how $O$ was chosen. In other words, $G$ is at least as good as $O$. 

- <b>Goal</b>: Show $|G| \geq |O|$ (or equivalently $m \geq m'$) if $O$ is an arbitrary solution 
		i.e. G is at least as good as any other solution
- <b>Goal</b>: Show $|G| = |O|$ (or equivalently, $m = m'$) if $O$ is an optimal solution.
		i.e. G is just as good as any optimal solution 

By induction, we aim to show that $m \geq m'$.

**Exchange Argument**

- Let $G = \{ g_1, \dots, g_m \}$ be the set of activities selected by the greedy algorithm, ordered by finish times.
- Let $O = \{ o_1, \dots, o_{m'} \}$ be the set of activities selected by some arbitrary (or optimal) solution, also ordered by finish times.

Our aim is to prove that no other selection can have more activities than our greedy selection, regardless of how $O$ was chosen, i.e. $m \geq m'$.

This can be shown by induction.

**Base Case (k = 1)**

By our greedy algorithm, we choose the activity with the earliest finish time, so $f_{g_1} \leq f_{o_1}$.

Since $g_1$ finishes no later than $o_1$, which in turn finishes before any of $o_{2}, o_2 \dots, o_s$ start, it follows that $g_1$ also does not conflict with any of the activities $\{o_2, \ o_3, \ldots, o_k \}$.

We can therefore exchange $o_1$ with $g_1$ to construct a new conflict-free solution:

$$O'=\{g_1​,o_2​,o_3​,…,o_{m'}​\}$$

that is still valid (no conflicts) and no worse (since $|O'| = |O| = m'$).

Hence, there exists a valid selection that includes the first greedy choice $g_1$ and is no worse than the original selection.

**Inductive Hypothesis**

Suppose that the first location $G$ and $O$ disagree is position $k$ (could be $1$). So they agree in the first $k - 1$ selections. In other words:

Assume that for some $k \geq 1$, we have a valid selection:

$$
O' = \{ g_1 \;, \dots,\; g_{k-1} \;,\; o_k \;,\; o_{k+1} \;, \dots,\; o_{m'} \}
$$

that is the same as greedy from activity $1$ up to activity $k-1$.

**Inductive Step**

We now show that we can exchange $o_k$ with $g_k$ to construct a new valid solution.

Since both $G$ and $O'$ are valid solutions i.e., they consist of non-conflicting jobs, neither $g_k$ not $o_k$ conflict with $g_1, g_2, \ldots, g_{k-1}$.

Since the greedy solution chooses the earliest finish time among non-conflicting jobs, we have $f_{g_k} \leq f_{o_k} \leq s_{o_{k+1}}$ which means $g_k$ does not conflict with any remaining jobs $o_{k+1}, \ldots, o_m$. 

Therefore, we can exchange $o_k$ with the greedy choice $g_k$ to construct a new valid solution: 

$$
O' = \{ g_1 \;, \dots, \; g_{k} \;,\; o_{k+1} \;,\dots,\; o_{m'} \}
$$

We can now repeat this process for the next index where $O'$ and $G$ differ.
Continuing in this way, we resolve all disagreements until we eventually construct an optimal solution that contains all the greedy choices.

Therefore, we have that:

$$
m' = |O| \leq |O'| \leq \dots \leq |G| = m
$$

i.e., the alternative selection $O$ has no more activities than our greedy selection $G$.  

**Prove optimality (by contradiction)**

If $O$ is not optimal, then it must be the case that $|O| > |G| \equiv m' > m$. 

Suppose, for contradiction, that $m' > m$; that is, there is an activity $o_{m'+1}$ in $O$ that is not in $G$. 

This activity must start after $o_m'$ ends (i.e. $s_{o_{m'+1}} > f_{o_m'})$ and hence after $g_m$ by our previous result. But since $f_{g_m} \leq f_{o_m}$, this activity would have been compatible with all activities in $G$, and so our greedy algorithm would have added $o_{m'+1}$ to $G$. 

This is a contradiction and therefore, $m' \leq m$. Thus, $G$ is optimal.

---

Suppose the greedy algorithm selects activities $G = \{ g_1, \dots, g_r \}$, and consider some alternative selection $A = \{ a_1, \dots, a_s \}$, each in ascending order of ending time. 

Our aim is to prove that no other valid selection can have more activities, i.e. $s \leq r$ regardless of how $A$ was chosen. 

Suppose that the first location $G$ and $A$ disagree is position $k$ (could be $1$). So they agree in the first $k - 1$ selections. That is: $$ g_1 = a_1, \; g_2 = a_2, \; \dots, g_{k-1} = a_{k-1}, \quad \text{but } g_k \neq a_k $$

 Then we compare: $$ A = \{ g_1, \dots, g_{k-1}, a_k, a_{k+1}, \dots, a_s \} $$

 with $$ A' = \{ g_1, \dots, g_{k-1}, g_k, a_{k+1}, \dots, a_s \} $$

> [!question]
> Is $A'$ valid?
> 
> > [!answer]
> > - There are no conflicts among $\{ g_1, \dots, g_{k-1}, a_{k+1}, \dots, a_s \}$ 
> > (these were all in the valid selection $A$).  
> > - $g_k$ doesn’t conflict with $\{ g_1, \dots, g_{k-1} \}$ 
> > (they’re all in the valid selection $G$).  
> > - $g_k$ finishes no later than $a_k$, which in turn finishes before any of $a_{k+1}, \dots, a_s$ start. 
> > So $g_k$ doesn’t conflict with $\{ a_{k+1}, \dots, a_s \}$.  
> > - Therefore $A'$ has no conflicts, i.e. it is a valid selection.

> [!question]
> How big is $A'$?
> 
> > [!answer]
> > - $g_k$ isn’t a duplicate of any of $\{ g_1, \dots, g_{k-1} \}$ 
> > (since $G$ has no duplicates).  
> > - $g_k$ isn’t a duplicate of any of $\{ a_{k+1}, \dots, a_s \}$ 
> > (since it finishes before they start).  
> > - Therefore $A'$ also contains $s$ activities, i.e. $|A'| = |A| = s$.  

We started with an alternative selection $A$, and the first time it disagreed with $G$ we showed that the modified alternative $A'$ without this disagreement was just as good. 
(We only needed A′ to be no worse than A in terms of the objective, so |A| ≤ |A′| was sufficient)

We could now consider the first point of disagreement between $G$ and $A'$, and repeat the argument. Continuing in this way, we resolve all disagreements until one of them runs out of activities.  

> [!important]
> **The greedy can’t run out first:** if $a_{r+1}$ doesn’t conflict with $g_1, \dots, g_r$, then the greedy wouldn’t end with $g_r$ (it would contain $a_{r+1}$ afterwards).  
> 
> > [!answer]- Explanation
> > Suppose that $A$ has *more* activities than greedy, so $s > r$. 
> > That means there exists at least one “extra” activity $a_{r+1}$ that isn't in $G$.
> > Because $A$ is valid, $a_{r+1}$ does not overlap with any other activity in $A$.
> > 
> > By our earlier exchange steps, we have already replaced the first $r$ activities of $A$ with the first $r$ activities in $G$ without breaking validity. So $a_{r+1}$ also does not overlap with any of $g_1, \cdots, g_r$. 
> > 
> > Since $a_{r+1}$ is compatiable with all of $\{g_1, \cdots, g_r\}$, then it would have also been selected by the greedy solution - since $G$ is maximal: no more compatible activities can be added.
> > 
> > Therefore, no valid (or optimal) selection $A$ can have more activities than $G$. 

Therefore

$$
s = |A| \leq |A'| \leq \dots \leq |G| = r
$$

i.e., the alternative selection $A$ has no more activities than our greedy selection $G$.  

Since $A$ is an arbitrary alternative selection, we have that $G$ contains at least as many activities as any other selection. Therefore, $G$ is optimal.

---

> [!definition] Glossary
> In the **activity selection problem**, the objective is to maximize the number of non-overlapping activities. The **cost** of its solution is therefore the number of compatible activities.
> 
> A **valid** selection is a set of activities that do not conflict/overlap. 
> In other words, every activity finishes before (or exactly when) the next one starts.
> 
> A solution is **optimal** if it achieves the best possible cost (the number of compatible activities) among all valid solutions. Formally, $G$ is optimal if $|G| \geq |A|$ for every valid selection $A$. 
> In other words, it has the maximum number of non-overlapping activities possible.
> Note that there could be many optimal solutions.
> 
> “Just as good”, “No worse” or "At least as good" refers to the cost = the number of activities.
> $A$ is *"at least as good"* than $B$ if $A$ has <u>at least as many</u> activities than $B$ (i.e. $|A| \geq |B|$).

We have:
- $A = \{ a_1, \dots, a_s \}$ : an arbitrary valid selection (any other solution) 
- $G = \{ g_1, \dots, g_r \}$ : the greedy selection

Our aim is to prove that no other valid selection can have more activities than the greedy one, regardless of how $A$ was chosen. 

Steps (by contradiction):

1. Start with some alternative selection $A$.
2. Find the first point where $A$ and $G$ differ (highlighted in yellow).
3. Exchange (swap) the non-greedy choice $a_k$ with the greedy choice $g_k$ at this point.
4. Prove that this exchange does not make the solution worse than before. 
        We only need A′ to be no worse than A in terms of the objective, so |A| ≤ |A′| is sufficient.
	- *is valid*: Does the new selection have any conflicts (overlapping activites)? No!
	- *no worse*: Does the new selection have the same number of activities as before? Yes!
	Since $g_k$ finishes no later (earlier or equal finish time) than $a_k$, you can exchange $g_k$ with $a_k$ in A, and this new solution A' will still be valid (conflict-free) and no worse (|A| = |A'|).
5. Repeat until you eventually "morph" any alternative selection $A$ into a new selection $A'$ that:
	- is valid (activities don’t overlap)
	- has the same number of choices as the alternative selection we started with (no worse)
	- has no choices other than those in the greedy selection ($A'$ is a subset of greedy)
6. Therefore, the greedy solution is *at least as good* as any arbitrary solution (i.e. has at least as many activities as any other selection), so it is *optimal* itself.
	- Modify $A$ to follow the greedy heuristic $G$: choose the activity that finishes earliest.


Since the exchange can be performed for every sub-optimal choice in $A$ without making the solution worse (i.e. $|A|≤|A'|$), you can transform any alternative solution into the greedy solution until you are down to a **subset of the greedy solution** (i.e. A' is equivalent to the prefix of G, since G can have more activites than A'). So greedy can take every choice of the alternative solution + some more: $|A| \leq |A'| \leq \cdots \leq |G|$.

Notes:
- The greedy solution is supposed to be the maximal set of non-conflicting activities.
- If A' contains more activities than G, then that would mean G is actually not optimal, since A' is valid (no overlaps) and has more activities (maximal). 
- So either we made a mistake if this happens, or G is not actually an optimal selection.

# References and Further Reading

- [CS 360: Lecture 14: Greedy Algorithms - Activity Selection](https://ycpcs.github.io/cs360-spring2015/lectures/lecture14.html)
- [Weighted Interval Scheduling | Victor Farazdagi](https://farazdagi.com/posts/2013-11-15-weighted-interval-scheduling/)
- [Greedy Algorithms Lecture PDF| CS Princeton](https://www.cs.princeton.edu/~wayne/kleinberg-tardos/pearson/04GreedyAlgorithms-2x2.pdf)
- [Interval Scheduling Notes | stumash](https://stumash.github.io/Algorithm_Notes/greedy/intervals/intervals.html)
- [Introduction to Greedy Algorithms - Jeremy Quinto](https://blog.jeremyquinto.com/the-basics-of-greedy-algorithms)