---
aliases:
  - Earliest Deadline First (EDF)
modules:
  - "[[Greedy Algorithms|Module 2: Greedy Algorithms]]"
categories:
  - "[[Optimal Ordering]]"
  - "[[Interval Scheduling#Unweighted]]"
tags:
  - topic/greedy
  - examples
---

# Scheduling to Minimize Maximum Lateness

> Scheduling with deadlines

## Draft

Similar to [[Unweighted Activity Selection|Interval Scheduling]]. Except instead of start and finish times, each request $i$ has:
- <b>Duration / Execution Time</b> $\color{blue}{t_i}$ – the interval length of the request, and
- <b>Deadline / Due Date</b> $\color{blue}{d_i}$ – the time by which the request would like to be finished.


- [CS432 Lecture 08: Greedy - Williams College](https://www.cs.williams.edu/~shikha/teaching/fall19/cs256/lectures/Lecture08.pdf)
- [CSE421 Lecture 06: Minimizing Lateness - University of Washington](https://courses.cs.washington.edu/courses/cse421/22wi/lecture/lecture-6.pdf)
- [CMSC 451: Greedy Algorithms for Scheduling - University of Maryland](https://www.cs.umd.edu/class/spring2025/cmsc451-0101/Lects/lect05-greedy-sched.pdf)
- [Scheduling to Minimize Maximum Lateness - TU Delft](https://ocw.tudelft.nl/wp-content/uploads/Algoritmiek_Scheduling_to_Minimize_Maximum_Lateness.pdf)
- [CS/ECE 374: Scheduling to Minimize Lateness - University of Illinois Urbana-Champaign](https://courses.grainger.illinois.edu/cs374/fa2020/lec_prerec/19/19_4_0_0.pdf)
- [CS6363: Scheduling to minimizing lateness - UT Dallas](https://personal.utdallas.edu/~sxb027100/cs6363/dead.pdf)

---

> [!example] Problem
> Given a set of $n$ jobs, with durations $t_i$ and deadlines $d_i$, schedule all jobs, that is, assign start and finish times $(t_i, d_i) → (s_i, f_i)$, so as to **minimize the maximum lateness**.

- If a job $i$ starts at time $s_i$ then it will finish at time $f_i = s_i + t_i$, where $t_i$ is the job duration.
- Each job is scheduled into time intervals $[s_i, f_i]$ s.t. no two intervals overlap/intersect.
     (i.e. one job finishes before or at the same time the other starts: $s_j ≥ f_i$)

---

**Lateness** of the $i$th job is the amount of time by which it exceeds its deadline, that is, $$\bbox[10px, border: 1px solid black]{\ell_i = \max(0, f_i - d_i)}$$

- If $d_i < f_i$ then job $i$ is overdue by $\ell_i = f_i - d_i$
- Otherwise $l_i = 0$

**Maximum lateness** of schedule $S$ is the *worst* lateness *among all* jobs (not the total), that is, $$\bbox[10px, border: 1px solid black]{L(S) = \max_{1 \leq i \leq n} \ell_i = \max_i \ell_i}$$

---

- **Idle time**: time during which nothing is not happening.
- We say jobs $i$ and $j$ form an **inversion** if job $i$ is scheduled before job $j$, but is due after it $(\mathtt{due}_i > \mathtt{due}_j)$.
- A schedule S is said to have an **inversion** if it contains one pair of jobs that have not been scheduled in increasing order of deadline.
- If an idle-free schedule has an inversion, then it has an adjacent inversion. Therefore:
> An idle-free schedule S is said to have an **inversion** if there is an inversion between two adjacent scheduled jobs. 

---

|                                                                    ![[minimize-lateness.png]]                                                                     |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| The width of each red shaded region indicates the amount by which the task exceeds its allowed deadline. <br>The longest such region yields the maximum lateness. |

*Greedy template.* Consider jobs in some order.
- **\[Shortest duration first\]** Consider jobs in ascending order of duration $t_j$ (least work first)
- **\[Smallest slack-time first\]** Consider jobs in ascending order of slack $d_j - t_j$ (least time to start to make deadline)
- **\[Earliest deadline first\]** Consider jobs in ascending order of deadline $d_j$ (nearest deadline).

---

## Problem

> [!example|style-ad] Minimising Job Lateness
> <b>Instance:</b> A list of $n$ jobs, with durations $\mathtt{duration_i}$ and deadlines $\mathtt{due_i}$ .  
> All jobs have to be completed, but only one job can be performed at any time.
> 
> If a job $i$ is completed at a finishing time $\mathtt{finish_i} > \mathtt{due_i}$ then we say that it has incurred lateness $\mathtt{late_i} = \mathtt{finish_i} - \mathtt{due_i}$.
> 
> <b>Task:</b> Schedule all the jobs to *minimise the largest lateness*.

## Earliest Deadline First (EDF)

> [!question]
> We have two criteria we can order by: duration and deadlines.
> Which is more important to find the optimal solution?
> - Perform quicker tasks first (small $\mathtt{duration}_i$)?  
> - Prioritise earlier deadlines (small $\mathtt{due}_i$)?  
> - Maybe we need both?  

> [!solution]
> Schedule jobs in ascending order of deadlines $\mathtt{due}_i$.  

**Actually, the durations have no effect on the optimal solution.**  

If you have different assignments, each with a deadline, and obviously each taking a different amount of time to work on, which one do you prioritize? Clearly, the one due the earliest!

---

## Inversions

> [!bookmark] Definition
> Given a schedule $S$, an [[Permutations and Inversions#Inversions|inversion]] is a pair of jobs $i$ and $j$ such that $\text{due}_i > \text{due}_j$ but $i$ is scheduled before $j$. (i.e. two jobs are "out of order" relative to their deadlines)

> [!bookmark] Observation
> - If an **idle-free schedule (sequence)** has an inversion, then it has an **adjacent inversion**.
> - Any sequence S that **isn’t sorted** has at least one **adjacent inversion**.
> - If **no adjacent inversions** exist, then S is already **sorted by deadlines**.

### Non-adjacent Inversions

Assume we are given a schedule:

![[minimise-job-lateness-inversions.png]]


We say that jobs $i$ and $j$ form an **inversion** if:  
- job $i$ is scheduled before job $j$, but  
- $\text{due}_j < \text{due}_i$ (i.e. job $j$ has an earlier deadline/due before).  

> [!remark] 
> So in an inversion, two jobs are out of order w.r.t their deadlines 
> (e.g. a later deadline job is scheduled ahead of an earlier deadline job).  

###### Swapping non-adjacent inversions

> [!question]
> What happens if we swap their order?  

> [!danger]
> Because `job i` and `job j` are **NOT ADJACENT**, swapping them will change the finish time and therefore, the lateness of, all jobs in-between them!

---

### Adjacent Inversions

![[minimise-job-lateness-adjacent-inversions.png]]

If a schedule isn’t sorted by deadlines, then there exists at least one **adjacent inversion**:  
two consecutive jobs $k, k+1$ with $\text{due}_k > \text{due}_{k+1}$.  

**What happens if we swap their order?**  

- Their individual latenesses change.  
- But the latenesses of all other jobs remain unaffected.  

When we swap adjacent inverted jobs $k$ and $k+1$:  

- The maximum lateness of the pair decreases (or stays the same).  
- The maximum lateness overall does not increase.  

Thus, swapping adjacent inverted jobs improves the solution.  

Remarks: 
- Observe that swapping adjacent inverted jobs k and k + 1 reduces the maximum lateness of the pair.
- The largest lateness overall might not have changed; there might be some other job that’s more late than either of these.
- All that matters is that it can’t have got worse (i.e. increased) as a result of this swap.
- Again, it would have been much harder to directly analyse non-adjacent inversions. Swapping non-adjacent jobs would also affect the finishing times and hence latenesses of every job in between them.

---

## Proof of Optimality

> [!bookmark] Key Claim
> Swapping two **adjacent**, inverted jobs $k$ and $k+1$ reduces the number of inversions by 1 and **does not increase the max lateness**.

> [!solution ] Proof
> Let $\ell$ be the max lateness before the swap, and let $\ell'$ be it afterwards.
> 
> - $\ell'_k = \ell_k$ for all $k \neq i, j$ (lateness of all other jobs is the same, since $i$ and $j$ together occupy the same total time slot in both schedules) 
> - $\ell'_i \leq \ell_i$ (new lateness for $i$ smaller, since $i$ is scheduled earlier in $S'$ than $S$)
> - If job $j$ is late, then:
>
> $$
> \begin{align}
> \ell'_j &= f'_j - d_j           &&\longleftarrow \text{definition} \\
>        &= f_i - d_j             &&\longleftarrow j\text{ now finishes at time } f_i \\
>        &\leq f_i - d_i          &&\longleftarrow i < j \Rightarrow d_i \leq d_j \\
>        &\leq \ell_i             &&\longleftarrow \text{definition}
> \end{align}
> $$
>
> - By our inequalities $\ell'_i \leq \ell_i$ and $\ell'_j \leq \ell_i$ ⇒ $\max(\ell'_i, \ell'_j) \leq \ell_i$ ⇒ $\ell' \leq \ell$

Since:
1. Each swap **reduces** the number of inversions by one, and
2. Each swap **does not increase** maximum lateness,

repeatedly applying this operation eventually produces a schedule with:

- **No inversions** (i.e., jobs are sorted by deadlines), and
- **Maximum lateness no worse than before.**

Therefore, the **Earliest Deadline First (EDD)** schedule **minimizes the maximum lateness**.
