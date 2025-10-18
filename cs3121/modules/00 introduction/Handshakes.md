---
aliases:
  - "Puzzle: Handshakes"
status: open
tags:
  - module/0
  - week/0
  - "#examples/puzzle"
files: "[[00-introduction.pdf]]"
---
# Puzzle: Handshakes

## Problem

Tom and his wife Mary went to a party where nine more couples were present.

Not everyone knew everyone else, so people who did not know each other introduced themselves and shook hands. People who knew each other from before did not shake hands.

Later that evening, Tom got bored, so he walked around and asked all other guests (including his wife) how many hands they had shaken that evening, and got 19 different answers.

- How many hands did Mary shake?
- How many hands did Tom shake?

## Attempt

- There are **10 couples (20 people)** in total: Tom & Mary + 9 other couples.
- Each person may or may not shake hands with someone, depending on whether they knew them before.
- **Rules:**
    - No one shakes their own hand. ⇒ $20 - 1 = 19$
    - No one shakes hands with their spouse. ⇒ $19 - 1 = 18$
    - Otherwise, if they didn’t know each other before, they may shake hands.

So the maximum possible number of handshakes for any one person is **18** (because there are 19 other people total, minus 1 spouse).

Tom goes around and asks _everyone except himself_ how many hands they shook, and got 19 different answers, means:

- He asked 19 people
- And got 19 different answers

So the set of answers Tom collected must have been:

$$0, 1, 2, 3, …, 18$$

(since 18 is the max possible answer)

