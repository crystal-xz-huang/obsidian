---
modules:
  - "[[Foundations|Module 1: Foundations]]"
---

# Stable Matching

The stable matching problem is the problem of finding a stable matching between two equally sized sets of elements given an ordering of preferences for each element

The Gale-Shapley algorithm is an algorithm for finding a solution to this problem!

## Problem

> [!example] Problem
> 
> - Suppose you are running an individual project course at CSE, with $n$ student developers and $n$ clients.  
> - Every developer submits a list of preferences, which ranks all the clients from most preferred to least preferred.  
> - We’d like to make $n$ separate pairs in order to “make everyone happy” in some sense.  
> 
> Our task is to design a **perfect matching** that somehow satisfies both developers and clients, with regards to their preferences.  
> 
> We will design an algorithm which produces a **stable matching**.  

> [!definition]
> - A **matching** is an assignment of developers and clients so that no one belongs to two or more pairs, i.e. where
> 	- nobody is in more than one pair
> - A **perfect matching** is a matching involving all developers and all clients, i.e. where 
> 	- everyone is matched, and
> 	- everyone belongs to exactly one pair.  
> - A **stable matching** is a <u>perfect matching</u> in which there are no two pairs $(d_1, c_1)$ and $(d_2, c_2)$ such that:  
> 	- developer $d_1$ prefers client $c_2$ to $c_1$, **and**  
> 	- client $c_2$ prefers developer $d_1$ to $d_2$.  
> 	- i.e. no two people (d and c) who rather be matched with each other than their current partners
> 
> Stable matchings are **self-enforcing**: no <u>unmatched</u> pair $(d_1, c_2)$ will quit together.  

> [!question]
> Can we assign every party their first preference partner?  
> 
> > [!answer]+
> > Not necessarily!  
> > - We’ll have to lower our expectations. We would still like to guarantee some fairness.  
> > - If a developer and a client were both very unhappy with their allocated partner, they might quit our system and work together externally.  

> [!idea]
> Stable Matching guarantees:
> - Everyone gets matched with someone on their preference list,
> - There's no-one in the current matching who would both prefer each other than their current partner, for example:
> 	- `d1` prefers `c2` over their current partner, **AND**
> 	- `c2` prefers `d1` over their current partner
> 
> If it’s just one-sided preference (e.g. `d1` likes `c2` more, but `c2` is fine with their current partner), then it’s _not_ a blocking pair. Stability only fails when the preference is **mutual**.

## Example

All four parties will rank their two counterparts from most preferred to least preferred.

- Developers: Dora and Dave
- Clients: Celia and Chirag

![[stable-matching-example.png]]

## Gale-Shapley Algorithm

> [!abstract]
> - **Search Space:** There are $n!$ possible perfect matchings (super-exponential in size).
> 	- ⚠️ This is not the number of stable matches - i.e., matches according to preferences.
> 	- This is the number of all possible pairings from $n$ people with no duplicates - i.e. how many different ways you can pair $n$ people (combinatorics)!
> - **Fact:** For any set of preference lists, there is always at least one stable matching.
> - **Algorithm:** Gale–Shapley algorithm shows how to _find_ one efficiently in $O(n^2)$ time, where $n$ refers to the number of participants in one group (either man or woman; client or developer etc). ==Each man (of which there are $n$) proposes to every woman (of which there are $n$) at most once, resulting in at most $n^2$ proposals.==
> 

> [!note]
> Explanation of why its $O(n^2)$ - not $O(n!)$
> - Let $n$ = number of me (= number of women since everyone should be paired up).
> - Each man proposes to every woman at most once. There at $n$ women to choose from.
> - So each man can make at most $n$ proposals, and there are $n$ men in total.
> - That gives us: $n \times n = n^2$ proposals (i.e., sum up $n_1 + n_2 + \cdots + n_k$ for $k=n$ times).
> - Therefore, $n$ men × $n$ women = $n^2$ proposals.


> [!question]
> Given $n$ developers and $n$ clients, how many ways are there to match them, without regard for preferences?
> 
> > [!answer]
> > $n! ≈ (n/e)^n (e ≈ 2.718)$: more than exponentially many in n.
> > 
> > - The number of matchings is $n!$.
> > - By Stirling’s approximation, $n! \sim \left(\frac{n}{e}\right)^n \sqrt{2 \pi n}$.
> > - Since the base of the exponential grows with $n$, this is **super-exponential** in size.
> >  
> > **TLDR**: There are exponentially many possible matchings: $n!$. This is the search space = which is super big.
> > 
> 
> > [!NOTE]- Explanation
> > Each developer must be paired with exactly one client, and vice versa ⇒ perfect matching.
> > This is the same as counting **permutations** of $n$ items.
> > 
> > - Developer 1 has $n$ choices of clients.
> > - Developer 2 has $(n-1)$ choices (since one client is already taken).
> >
> > - Developer 3 has $(n-2)$ choices. $$\vdots$$
> >
> > - Developer $n$ has just $1$ choice.
> > 
> > Therfore the total number of matchings is $n!$ (factorial):
> >
> > $$n \times (n-1) \times (n-2) \times \cdots \times 2 \times 1 = n!$$
> >
> > For large $n$, factorials grow extremely fast, so we often approximate using **Stirling’s approximation**:
> >
> > $$n! \sim \sqrt{2 \pi n} \left(\frac{n}{e}\right)^n  $$
> >
> > (where $e \approx 2.718$ is Euler’s number).
> > 
> > If we ignore the $\sqrt{2 \pi n}$ factor, since it’s relatively small compared to $\left(\tfrac{n}{e}\right)^n$, we get:
> >
> > $$n! \approx \left(\frac{n}{e}\right)^n.$$
> >
> > A plain exponential function in $n$ looks like $c^n$ for some constant $c$ – $2^n$, $3^n$
> > But here we have $\left(\frac{n}{e}\right)^n$. Notice that the “base” is not a constant — it grows with $n$.
> > - For $n=10$, base = $10/e \approx 3.68$.
> > - For $n=100$, base = $100/e \approx 36.8$.
> > - For $n=1000$, base = $1000/e \approx 368$.
> > 
> > So the effective base of the exponential is increasing with $n$ → that’s why we say there are “more than exponentially many” matchings.
> 

> [!question]
> Is it true that for every possible collection of $n$ lists of preferences provided by all developers, and $n$ lists of preferences provided by all clients, a stable matching always exists? 
> 
> > [!answer]
> > Perhaps surprisingly, yes!

> [!question]
> Can we find a stable matching in a reasonable amount of time?
> 
> > [!answer]
> > Yes, using the Gale-Shapley algorithm.
> 

### Description

- A developer who is not currently in a pair will be called <u>solo</u> (unmatched).
- Start with all developers <u>solo</u>.
- Produces pairs/matches in stages, with possible revisions:  
	1. <u>Proposal</u>: Developers will be making pitches to clients (arbitrarily chosen). 
	2. <u>Evaluation</u>: Clients will *tentatively* accept a pitch – but may later abandon/discard their partner if they receive a proposal from someone they prefer more.
	3. <u>Iteration</u>: The remaining unmatched pairs go through the process again. 
- The algorithm halts when no unmatched developer can issue a new proposal. At this point, the matching is guaranteed to be stable, and no couple will wish to trade partners

### Outline of Algorithm

While there is a solo developer who has not pitched to all clients:

- Pick any such solo developer, say **Deji**.  
- Deji pitches to the highest ranking client **Clint** on his list, ==ignoring any who he has pitched to before.== 
	- If Clint is not yet paired, he accepts Deji’s pitch (at least tentatively).  
	- Otherwise, if Clint is already paired with someone else, say **Dorothy**:  
		- If Clint prefers Deji to Dorothy, he turns down Dorothy and makes a new pair with Deji (making Dorothy solo).  
		- Otherwise, Clint will turn down Deji and stay with Dorothy.  

> [!NOTE]
> - There is $n^2$ input because each person submits their preference sheet of $n$ people.
> - Deji only pitches to someone he has never pitched to before. Therefore, there are at most $n!$ pitches. 

<hr class='dots'/>

## Proof of Correctness

### Reasoning

<u>Question.</u> Does the algorithm work? And is it efficient?  

To answer this, we will prove the following 3 claims:

- **Claim 1:** The algorithm terminates after $\leq n^2$ rounds.  
- **Claim 2:** The algorithm produces a <u>perfect matching</u>, i.e. when the algorithm terminates, the $2n$ parties form $n$ separate pairs.  
- **Claim 3:** The matching produced by the algorithm is stable.

---

#### Claim 1: The algorithm terminates after $\leq n^2$ rounds.

**Proof:**  

- In every round of the algorithm, one developer pitches to one client.  
- Every developer can make a pitch to a particular client at most once.  
- Thus, every developer can make at most $n$ pitches.  
- There are $n$ developers, so in total they can make $\leq n^2$ offers.  
- Therefore, there can be no more than $n^2$ rounds. 

---

#### Claim 2: The algorithm produces a perfect matching, i.e. when the algorithm terminates, the $2n$ parties form $n$ separate pairs.

**Proof:**  

We will prove that the algorithm 

Assume that the algorithm has terminated, but a developer **Daud** is still solo.  

- This means that Daud has already pitched to all the clients.  
- A client is not paired only if no one has pitched to them.  
- Since Daud has pitched to everyone, all $n$ clients must be paired.  
- No developer can have more than one partner, so all $n$ developers must also be paired, including Daud.  

This is a contradiction, completing the proof. 

This is a [[Proofs#Proof by Contradiction|proof by contradiction]].

---

#### Claim 3: The matching produced by the algorithm is stable.

**Reasoning:**  

- Each developer pitches in order from their most preferred to their least preferred client.  
- Therefore, the sequence of clients paired with a particular developer is in this order also.  
- Each client is initially not paired, then accepts the first pitch made to them, and only ever switches to a different developer who they prefer over their current partner.  
- Thus, each client is paired with developers in order from their least preferred to their most preferred.  


**Proof (by contradiction).**

We will prove that the matching is stable using a [[Proofs#Proof by Contradiction|proof by contradiction]].

Assume that the matching is not stable. Thus, there are two pairs:

$$(\text{Daisuke}, \text{Chuntao}), \quad (\text{Dakota}, \text{Chidi})$$

such that Daisuke prefers Chidi over Chuntao, and Chidi prefers Daisuke over Dakota.

Since Daisuke prefers Chidi over Chuntao, he must have proposed to Chidi before Chuntao.

At that point, Chidi must have either:

1. rejected Daisuke because he was already paired with someone he prefers to Daisuke, or  
2. accepted Daisuke temporarily, but later rejected him in favor of someone he prefers to Daisuke.

In both cases, Chidi would end up matched with someone higher on his preference list than Daisuke.  

However, in the final matching, Chidi is paired with Dakota, whom he prefers *less* than Daisuke.

This is a contradiction. Therefore, the matching produced by the algorithm must be stable.  
