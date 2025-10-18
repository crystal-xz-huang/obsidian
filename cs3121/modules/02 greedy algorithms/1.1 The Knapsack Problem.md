# The Knapsack Problem

> Given a set of items, each with a weight and a value, determine which items to include in the collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.

Informally, you are constrained by a **fixed-size** knapsack and must fill it with the **most valuable** items. You want to maximize the total value (profit), by selecting items with the maximum VALUE/WEIGHT ratio that can be added to a knapsack without exceeding its capacity at each step. 

- In Fractional Knapsack, you can break items into fractions if necessary.
- In 0-1 Knapsnack, you are restricted to either 0 or 1 instances of each item, meaning you cannot take fractions of items.

: which books should be chosen to maximize the books' value while still keeping the overall weight under or equal to 15 kg?

## Fractional Knapsack

#complexity-class/P

###### Problem

<b>Instance.</b> A list of $n$ items described by their weights $w_i$ and values $v_i$, and a maximal weight limit $W$ of your knapsack. You can take any **fraction** between 0 and 1 of each item.  

<b>Task.</b> Select a non-negative quantity of each item, with total weight not exceeding $W$ and maximal total value.  

How do we choose which items to take?
- Items with ==low weight== are better.  
- Items with ==high value== are better.

###### Solution

Fill the entire knapsack with the item of highest value per unit weight (profit = VALUE/WEIGHT)!  

If you run out of that item, use the second best item by this ranking, and so on.  

In other words, select the item with the largest ratio $\tfrac{v_i}{w_i}$ and pack as much of that item as you can, before trying to pack the item with the next largest ratio.  


<b>Examples</b>

> [!example] Example Problem: Frozen Yoghurt I
> There are $n$ flavours of frozen yoghurt at your local shop.  
> The $i$th flavour is dispensed from a machine of capacity $c_i$ litres and contributes $\tfrac{d_i}{c_i}$ deliciousness per litre, i.e., the entire machine’s worth contributes $d_i$.
> 
> You have a giant tub of capacity $C$ litres.  
> You want to fill the tub so as to maximise the total deliciousness.  

> [!aside] 
> The greedy algorithm is effective here because it maximizes the value in the knapsack by focusing on items with the highest value-to-weight ratio. Since we can take fractions of items, the greedy approach ensures that the knapsack is filled in the most valuable way possible.

## 0-1 Knapsack

#complexity-class/NP-hard

###### Problem

<b>Instance.</b> A list of $n$ discrete items described by their weights $w_i$ and values $v_i$, and a maximal weight limit $W$ of your knapsack.  

==Unlike the Fractional Knapsack problem, in the 0/1 Knapsack problem, we must take all items (0 or 1), and we cannot take fractions.==

<b>Task.</b> Find a subset $S$ of the items with total weight not exceeding $W$ and maximal total value.  

###### Solution

> [!example] Problem: Frozen Yoghurt II
> Sadly, the frozen yoghurt shop has now closed down, so you must go to the supermarket instead.  
> 
> There, you can find $n$ flavours of frozen yoghurt in tubs.  
> The $i$th flavour comes in a tub of capacity $c_i$ litres and contributes $d_i$ deliciousness.  
> 
> You again want to buy $C$ litres, with maximum total deliciousness.  

As before, we want <u>large value</u> and <u>low weight</u> items.  

But this time:
- we can’t take fractions of an item, and  
- we can’t take multiple copies of an item.  

How does that change things?  
Can we always choose the item of highest value per unit weight?  

The greedy algorithm does not guarantee the optimal solution for all instances of 0/1 knapsack problem. Dynamic programming or branch and bound algorithms should be used instead for optimal solutions.

> [!example] Example: Cases where the greedy algorithm fails the 0-1 knapsack p‌r‌o‌b‌l‌e‌m
> Consider a knapsack of capacity $W = 50 \text{ kg}$, and three items with following weights and values:
> 
> Example 1:
> 
> | Item | Weight (kg) | Value ($) | Value/Weight |
> | ---- | ----------- | --------- | ------------ |
> | A    | 10          | 60        | 6            |
> | B    | 20          | 100       | 5            |
> | C    | 30          | 120       | 4            |
> 
> The greedy strategy would choose items $A$ and $B$, with a combined value of 160.
> But the optimal solution is to take items $B$ and $C$, with a combined value of 220.
> 
> 
> Example 2:
> 
> | Item | Weight | Value | Value/Weight |
> | ---- | ------ | ----- | ------------ |
> | A    | 40     | 100   | 2.5          |
> | B    | 20     | 60    | 3            |
> | C    | 30     | 60    | 2            |
> 
> The greedy strategy would choose item A, then quit due to insufficient capacity left for any other item. The total value is 100. 
> 
> The optimal solution is to take items B and C, which together exactly take up the full capacity and have a combined value of 120. 

> [!question]
> So when do greedy algorithms work?  
> 
> > [!answer]
> > Unfortunately there is no easy rule…  

## P versus NP (spoiler for Module 6)

For those interested, it relates to the following problem…

Exercise (\$1,000,000 prize if you solve it!):  Is $P = NP$?  

- Fractional knapsack is a problem in **P**.
- The 0-1 knapsack problem is an example of an **NP-hard** problem.  

Greedy algorithms work on some problems in **P**, but they do not work on **NP-hard** problems.  

Later in the course we’ll learn methods that can be applied to NP-hard problems such as dynamic programming.  