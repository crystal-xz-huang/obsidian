---
tags: [examples/puzzle, module/2, week/3]
---
# Puzzles

## Pills

> [!problem]
> You are taking two kinds of medicines, A and B, which each come in identical bottles of 30 pills. Pills of medicine A are completely indistinguishable from pills of medicine B. You take one pill of each medicine everyday. The pharmacy will only refill your pill bottles every 30 days.
> 
> One day, you are down to the last two pills in each bottle when you drop both bottles on the floor, spilling all four pills. Since you cannot tell which are of type A, and which are of type B, how can you continue to take one pill of each medicine for the remaining two days?

You have two types of indistinguishable items, A and B, with equal counts remaining: 2 of A and 2 of B. You must form two daily doses so that each dose contains exactly one unit of A and one unit of B. You may split items into equal halves. Design a procedure (constant time) that guarantees each day’s dose has exactly one unit of A and one unit of B.

Solution:
1. Split all four pills (the 2 A’s and the 2 B’s) into halves.
2. Day 1: take one half from each of the four split pills (i.e., four halves total).
3. Day 2: take the four remaining halves.

---

## Pirates

Five pirates have to split 100 bars of gold. They all line up and proceed as follows:

- The first pirate in line gets to propose a way to split up the gold (for example: everyone gets 20 bars)
- The pirates, including the one who proposed, vote on whether to accept the proposal. If the proposal is rejected, the pirate who made the proposal has to walk the plank.
- The next pirate in line then makes his proposal, and the 4 pirates vote again. If the vote is tied (2 vs 2) then the proposing pirate still has to walk the plank. Only a majority can accept a proposal.

This process continues until a proposal is accepted or there is only one pirate left.

Assume that every pirate has the same priorities, in the following order:

1. not having to walk the plank;
2. getting as much gold as possible;
3. seeing other pirates walk the plank, just for fun.

What proposal should the first pirate make?



