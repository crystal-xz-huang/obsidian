---
aliases:
  - Tower of Hanoi
---
## Tower of Hanoi

### Problem

> [!problem]
> <b>Instance:</b> There are three pegs and $n$ disks of radius $1, 2, …, n$.  
> Initially, all disks are on the first peg, in order of radius.
> 
> In each move, you can move one disk from one peg to another, but you can never place a larger disk on top of a smaller disk.
> 
> To win the game, stack all disks on the <u>third</u> peg (again in order of radius).
> 
> <b>Task:</b> <u>Find the minimum number of moves</u> to win the game.
> 
> <b>Note</b>: We <u>do not</u> have to report the actual moves.

![[tower-of-hanoi.png]]

### Developing the Solution

> [!goal] 
> Move all the disks ($1 \cdots n$) from the 1st peg onto the 3rd peg in descending order ($n \cdots 1$).
> Minimise the number of moves it takes.

The task is to get all the disks onto the third peg in desc order of radius, **largest at the bottom**. 

#### Breaking the problem into smaller tasks

To find the minimum number of moves, we’ll need a systematic winning strategy.

Consider the largest disk:
- The largest disk has to move from the <u>first</u> peg to the <u>third</u> peg.
- The largest disk can only move from one peg to another if all the other disks are on the remaining peg. 

![[wk3-tower-of-hanoi-2.excalidraw.png|900]]


> [!solution]
> To minimise the number of moves overall, we should:
> 
> 1. Move disks $1$ to $n−1$ from the first peg to the second peg, using as few moves as possible,
> 2. Move disk $n$ to the third peg in one move, and finally
> 3. Move disks $1$ to $n − 1$ from the second peg to the third peg, using as few moves as possible.

The first and third parts of this could be solved recursively, noting that largest disk $n$ does not impact the movement of any smaller disks:

![[wk3-tower-of-hanoi-1.excalidraw.png]]


> [!observation]+
> The solution we have described is a **divide and conquer** approach.
> 
> - <b>Divide</b>: nothing to do before recursion.  
> - <b>Conquer</b>: twice, recursively move $n − 1$ disks. 
> - <b>Combine</b>: add the number of moves in all three steps.
> 
> Each additional disk approximately doubles the amount of work, leading to an exponential time complexity.

#### Forming the recurrence

<b>Is there any redundancy?</b>

The two recursive steps are equivalent to each other (i.e., there is an overlap in subproblems).
It should take the same number of moves to complete both of these steps.

Each step we:
- Solve two smaller subproblems of size $n − 1$, and    
- Perform one extra move for the largest disk.

> [!solution]
> Let $\text{moves}(n)$ be the minimum number of moves needed to move $n$ disks to the third peg.
> 
> 1. Move disks $1$ to $n−1$ from the first peg to the second peg, using as few moves as possible,
> 	- This takes $\boxed{\text{moves}(n − 1)}$ moves.
> 2. Move disk $n$ to the third peg, and finally
> 	- This takes $\boxed{1}$ move.
> 3. Move disks $1$ to $n − 1$ from the second peg to the third peg, using as few moves as possible.
> 	- This takes $\boxed{\text{moves}(n − 1)}$ moves.

> [!observation]+
> Here, we have made use of <u>overlapping subproblems</u>.
> 
> - In Divide and Conquer, we solve each of the child instances in isolation.
> - If the child instances are equivalent to each other, we can just solve one and then re-use the result.
> - More generally, if they have some overlapping structure, we can store the answers to smaller subproblems and re-use them later. 

With this observation, we now only need to recurse once. This avoids doubling the work performed for each new disk.

More precisely, the minimum number of moves satisfies the recurrence:

$$\text{moves(n) = 2 moves(n − 1) + 1.}$$

### Solution

> [!algorithm]
> In general, for all $i ≥ 2$,
>
> $$\text{moves(i) = 2 moves(i − 1) + 1.}$$
>
> The recursion takes effect from $i = 2$ because it doesn’t make sense for $i = 1$; there is no smaller number of disks to recurse to.
> 
> With the base case **moves(1) = 1** (moving a single disk takes one move), we could now solve for **moves(2)**, **moves(3)**, …, **moves(n)** in succession using the recurrence.
> 
> Each of these takes constant time, so the answer **moves(n)** is found in **Θ(n)** time.

### Closed-form Solution

> [!remark]
>If you expand the recurrence, you’ll notice that the recurrence can in fact be solved explicitly to find:
>
> $$\text{moves(n)} = 2^n − 1$$
>
> This is the **closed-form** solution — a direct formula with no recursion.
> 
> However, we won’t dwell on this because the method we used to find $\text{moves(n)}$, i.e., recursion with subproblem reuse, is more generally applicable.


