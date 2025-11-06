---
categories:
  - "[[Divide and Conquer]]"
tags: [examples, topic/divide-and-conquer]
status: open
---

# Balance Puzzle

## 27 Coins

![[27-coins-balance.png]]

- Balance Scale: You can weigh 2 groups at a time (left and right pan)

> [!abstraction]
> One of the 27 identically looking coins is fake. It is known that the fake coin is heavier than the other 26. How can you determine, in three weighings on a balance scale, which coin is fake?

> [!solution]
> - Divide the coins into three groups of nine, say A, B and C.
> - Weigh group A against group B.  
> 	- If one group is lighter than the other, it contains the counterfeit coin.  
> 	- If instead both groups have equal weight, then group C contains the counterfeit coin!
> - Repeat with three groups of three, then three groups of one.

> [!hint|yellow]-
> **Hint:** You can reduce the search space by a third in one weighing!
> 
> - A balance has 3 possible outcomes in one weighing:
> 	1. Left side is lighter 
> 	2. Right side is lighter
> 	3. Both sides balance
> 
> > “Is the fake coin in the left group, right group, or the leftover group?”
> 
> 3 cases ⇒ 3 groups (2 on the balance, 1 aside)
> - Group A, B, C
> - Compare A and B:
> 	- Outcome 1 → fake is in group A
> 	- Outcome 2 → fake is in group B
> 	- Outcome 3 → fake is in group C 
> - Therefore, one weighing reduces search space by 1/3

- <b>First weighing: 9 coins aside, 9 on each side of the scale.</b>
	- This way you will determine 9 coins which have a fake coin among them.
	- Now the problem is reduced to 1 of the 9 coins is fake. 
- <b>Second weighing: 3 coins aside, 3 on each side of the scale.</b> 
	- This way you will determine 3 coins which have a fake coin among them.
	- Now the problem is reduced to 1 of the 3 coins is fake. 
- <b>Third weighing: 1 coin aside, 1 coin on each side of the balance scale.</b> 
	- If the scale balances, the coin that we put aside is fake. 
	- If one of the sides of the scale is heavier, the fake coin is on that side.

## 10 Coins

> [!problem]
> There is a possibility that one of the ten identically looking coins is fake. The fake coin differs in weight from the original ones. How can you decide using a balance scale if there is indeed a fake coin among these 10 coins? How many weighings would you need to determine that?

> [!Solution]
> One weighing. Put 5 coins on one side of the scale, 5 on the other. If the scale balances, there are no fake coins. If one of the sides is heavier than the other, one of the 10 coins is fake.

## 99 Coins

> [!problem]
> One of the 99 identically looking coins is fake. The fake coin differs in weight from the original ones, but it is not known whether the fake coin is lighter or heavier than the rest. How can you determine, in two weighings, if the fake coin is lighter or heavier? What if you had 101 coins? 

> [!solution]
> Break the coins into 3 piles of 33. Compare two piles against each other. If their weight match, it means the fake coin is among the 33 coins put aside and by comparing that remaining pile against one of the other two we will be able to see if the fake coin is lighter or heavier. 
> 
> If the weights do not match (that is, the fake coin is on the scales), compare the lighter pile against the pile put aside. If the weights match, it means the fake coin is heavier that the original ones, if the weights don’t much the fake coin is lighter. 
> 
> Next, we deal with 101 coins. Break these coins in two piles of 50 and put one coin aside. Weigh these two piles against each other. If the weights match, the remaining coin is fake and we can figure out if it’s heavier or lighter to comparing to any coin from the two piles. 
> 
> If the weights do not match, pick, say, the lighter pile, break it into two piles of 25 and compare the two piles against each other. If the weights match, it means there is no fake coin among these 50, so the fake one is heavier than the original ones. If the weights do not match, it means there is a fake coin among these 50, so the fake one is lighter than the original ones.

## Variations

> [!problem]
> Given a 3-gallon and a 5-gallon containers, a funnel, and a water tap, pour exactly 4 gallons of water into the 5-gallon container. Would you be able to do this if the containers were of volume 9 and 12 gallons? 

> [!solution]
> Fill up the 3-gallon container, pour these 3 gallons in to the 5-gallon container. Fill up the 3-gallon container again and pour the water from this container to the 5-gallon one until the 5-gallon container is full. You will have 1 gallon left in the 3-gallon container. Empty the 5-gallon container and then pour 1 gallon from the 3-gallon container to the 5-gallon one. Finally, fill up the 3-gallon container and pour these 3 gallons to the 5-gallon container, which will now contain 4 gallons of water. 
> 
> The answer to the second question is no since whichever operation we do with container whose volume i litres is a multiple of 3 the measured volume will also be a multiple of 3, so we would never be able to measure 4 gallons of water.

## Related Problems

- [Find 2 heavy coins among 27 with a 3-pan balance - Puzzling Stack Exchange](https://puzzling.stackexchange.com/questions/17096/find-2-heavy-coins-among-27-with-a-3-pan-balance)

## Further Reading & Resources

- [Balance puzzle - Wikipedia](https://en.wikipedia.org/wiki/Balance_puzzle)
- [Fake Coins and a Balance Scale - Math KSU](https://www.math.kent.edu/~soprunova/64091f16/weight16.pdf)