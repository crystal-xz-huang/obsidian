---
tags:
  - categories
---
# Interval Scheduling

## Single-Interval Scheduling Maximisation

Single-interval scheduling refers to creating an interval schedule in which **no intervals overlap**.

### Unweighted

### Weighted

The "weighted" version of the activity selection problem involves selecting an optimal set of non-overlapping activities such that the total weight is maximised.

Unlike the unweighted version, there is no greedy solution! 
Instead, a dynamic programming solution is used to 

> [!example] Problem
> <b>Instance</b> 
> A list of $n$ activities with starting times $s_i$ and finishing times $f_i$.
> The duration of activity $i$ is $d_i = f_i - s_i$. 
> No two activities can take place simultaneously.
> 
> <b>Task</b>  
> Find a subset of compatible activities of maximal total duration.  

## Variants

> [!example] Problem
> <b>Instance</b> 
> A list of $n$ activities with starting times $s_i$ and finishing times $f_i = s_i + d$; thus, all activities are of the same duration. No two activities can take place simultaneously.
> 
> <b>Task</b>  
> Find a subset of compatible activities of maximal total duration.  

> [!solution]
> Since all activities are of the **same duration**, this is equivalent to finding a selection with a largest number of non conflicting activities, i.e., the previous problem.

- **Question**: What happens if activities are not all the same duration?  
- **Solution**: The greedy strategy no longer works! 

Our earlier exchange argument relied on any interval being *just as good* for the objective – i.e. at each step (choice), activity $a_k$ is just as good as activity $g_k$ 

- Objective: Maximise the <b>number</b> of non-conflicting activities.
- Template: Process activities in increasing order of finishing time. Every activity is therefore either chosen (if it has the earliest end time) or discarded (if it conflicts with the previously chosen activities).
- At each step, activity $a_k$ is *just as good* as activity $g_k$.
- Thus, exchanging one activity for another does not make the solution worse in terms of the objective because (1) the total number of activities stays the same, and (2) the activities don't overlap with the previous ones. 
- The cost or weight of each activity is the same, so each activity counts as one unit towards the objective. Therefore, we can skip all overlapping activities (prune the search space) without making the solution worse.

If the objective is to maximise the <b>duration</b> of non-conflicting activities, then any interval being *just as good* for the objective isn’t true anymore.

- Each activity has a different cost/weight (duration), and an early-finishing activity might not be “worth” taking, because a later one could have higher duration. 
- Can’t prune the search space as aggressively → We’ll need an “efficient brute force.”  
