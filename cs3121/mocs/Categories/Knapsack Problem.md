---
tags: [topic/dynamic-programming, topic/greedy, topic/optimization, type/problem]
---

# The Knapsack Problem

> Given a set of items, each with a weight and a value. Determine which items to include in the collection so that the total weight is less than or equal (≤) to the knapsack's capacity and the total value is as large as possible.

> [!problem]
> <b>Instance</b>: You have $n$ items, the $i$th of which has weight $w_i$ and value $v_i$. You also have a knapsack of capacity $C$.
> 
> You can take each item $x_i$ <u>number of times</u>.
> 
> <b>Task</b>: Choose a combination of available items which all fit in the knapsack and whose value is <u>as large as possible</u>. 

In the knapsack problem, we are given $n$ items with weight $w_i$ and value $v_i$, along with a maximum weight capacity of a knapsack $C$. You have to select a subset of items to put into the knapsack such that the **total weight does not exceed the capacity** $C$ and the **total value of items is maximised**.

Informally: what's the best way to fit the items into the knapsack to maximize value?

You are constrained by a **fixed-size** knapsack and must fill it with the **most valuable** items. You want to maximize the total value (profit), by selecting items with the maximum VALUE/WEIGHT ratio that can be added to a knapsack without exceeding its capacity at each step. 

There are two versions of the problems:

- [[#Integer Knapsack]] 
	- Items are <u>indivisible</u>: you can take an <u>integer</u> number of an item
	- **NP-hard** problem
	- Solved with dynamic programming in **pseudo-polynomial** time
- [[#Fractional Knapsack]] 
	- Items are <u>divisible</u>: you can take any <u>fraction</u> an item.
	- **P** problem
	- Solved with a greedy algorithm in **O(n log n)** time (due to sorting)

#### P versus NP (spoiler for Module 6)

- Fractional knapsack is a problem in **P**.
- The 0-1 knapsack problem is an **NP-hard** problem.  

Greedy algorithms work on some problems in **P**, but they do not work on **NP-hard** problems.  

<hr class="dots" />

## Integer Knapsack

**Complexity Class: NP-hard**

### 0-1 Knapsack

The number of copies $x_i$ of each item $i$ is restricted to either 0 or 1. 
You can either include or exclude each item $i$ in the final solution.

> i.e. You can take each item at most once (0 or 1 times).

- maximise $\;\displaystyle \sum_{i=1}^n v_i \, x_i \quad$ 
- subject to $\;\displaystyle \sum_{i=1}^n w_i \, x_i \leq C$ and $x_i \in \{0, 1\} \quad$ (take 0 or 1 of each item) 

where $x_i$ is the number of copies of each item $i$ taken.

### Unbounded Integer Knapsack

No restrictions on the number $x_i$ of copies each item $i$ 

> i.e. You can take each item 0, 1, 2, … many times (unbounded)

- maximise $\;\displaystyle \sum_{i=1}^n v_i \, x_i \quad$ 
- subject to $\;\displaystyle \sum_{i=1}^n w_i \, x_i \leq C$ and $x_i \in \{\,0, 1, 2, \dots, c \,\}$ 

where $x_i$ is the number of copies of each item $i$ to include in the knapsack (bounded by $c$).

### Bounded Integer Knapsack

Removes the restriction that there is only one of each item, but restricts the number $x_i$ of copies of each kind of item to a maximum integer value $c$.

> i.e. You can take each item up to (an integer) $c$ number of times (bounded)

- maximise $\;\displaystyle \sum_{i=1}^n v_i \, x_i$ 
- subject to $\;\displaystyle \sum_{i=1}^n w_i \, x_i \leq C$ and $x_i \in \Bbb{N} \;$ (unbounded) 

where $x_i$ is the number of copies of each item $i$ taken (unlimited).


<hr class="dots" />

## Fractional Knapsack

**Complexity Class: P**

> [!problem]
> <b>Instance.</b> Given a list of $n$ items described by their weights $w_i$ and values $v_i$.
> You also have a knapsack with a maximal weight capacity $C$. 
> 
> You can take any <u>fraction between 0 and 1</u> of each item.  
> 
> <b>Task.</b> Select a non-negative quantity of each item, with total weight not exceeding $C$ and maximal total value.  


<hr class="dots" />

# Methods of Solving

How do we choose which items to take?
- Items with ==low weight== are better.  
- Items with ==high value== are better.

## Solving Fractional Knapsack

> [!example] Example Problem: Frozen Yoghurt I
> There are $n$ flavours of frozen yoghurt at your local shop.  
> The $i$th flavour is dispensed from a machine of capacity $c_i$ litres and contributes $\tfrac{d_i}{c_i}$ deliciousness per litre, i.e., the entire machine’s worth contributes $d_i$.
> 
> You have a giant tub of capacity $C$ litres.  
> You want to fill the tub so as to maximise the total deliciousness.  

### Greedy Algorithm

- Fill the entire knapsack with the item of highest value per unit weight 
  (profit = VALUE/WEIGHT)!  
- If you run out of that item, use the second best item by this ranking, and so on.  
- In other words, select the item with the largest ratio $\tfrac{v_i}{w_i}$ and pack as much of that item as you can, before trying to pack the item with the next largest ratio.  

> [!important] 
> The greedy algorithm works here because it maximises the value in the knapsack by focusing on items with the highest value-to-weight ratio. 
> 
> Since we can take fractions of items, the greedy approach ensures that the knapsack is filled in the most valuable way possible.

## Solving 0-1 Knapsack

In the 0/1 Knapsack problem, we must take all items (0 or 1), and we cannot take fractions.

> [!example] Example Problem: Frozen Yoghurt II
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

> [!question]
> How does that change things?  
> Can we always choose the item of highest value per unit weight?  

#### Greedy Algorithm

The greedy algorithm **does not** guarantee the optimal solution for all instances of 0/1 knapsack problem. Dynamic programming or branch and bound algorithms should be used instead for optimal solutions.

##### Counterexample

> [!example] Cases where the greedy algorithm fails the 0-1 knapsack p‌r‌o‌b‌l‌e‌m
> Consider a knapsack of capacity $W = 50 \text{ kg}$, and three items with following weights and values:
> 
> <b>Example 1:</b>
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
> <b>Example 2:</b>
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


