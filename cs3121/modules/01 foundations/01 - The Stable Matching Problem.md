---
aliases: [The Stable Matching Problem]
---
# The Stable Matching Problem

## Overview

> [!problem]
> Given $n$ men and $n$ women, and their preference lists, find a stable matching if one exists. 

> [!solution]
> The Gale-Shapley algorithm solves the stable matching problem by having one group (e.g., men) propose to the other (e.g., women) based on preference lists until a stable matching is achieved, where no two individuals who are not matched would both prefer each other to their current partners. 

> [!theorem]
> The Gale–Shapley algorithm guarantees to find a stable matching for **any** problem instance. 

- **Stability:** The final matching is stable, meaning no unmatched pair would prefer each other over their current partners. 
- **Guaranteed Solution:** The algorithm always finds a stable matching, and it terminates in a finite number of steps. It takes $n^2$ steps, where $n$ is the number of men *or* women.
- **Proposer-Optimality:** If the men propose, the resulting matching is men-optimal, as each man gets the best stable partner possible for him. The women, in contrast, get the worst possible stable partner. 

---

## Definitions

Given the preference lists of $n$ men and $n$ women, find a stable matching if one exists.

###### Perfect Matching

A perfect matching is a matching of men and women in which everyone is matched monogamously. Each man gets exactly one woman, and each woman gets exactly one man.

###### Unstable Pairs

In a matching A, an unmatched pair `M-W` is unstable if man `M` and woman `W` prefer each other over their assigned partner. 

This pair has the incentive to opt out of the assigned pairing and get together on their own instead. If this happens, then this pair would block the matching from being "stable". 

> [!example]+
> For example, consider the following matching with the pairs Jim-Angela and Dwight-Pam:
> 
> | <div id="explanation"><svg width="500" height="400"><image></image><image></image><image></image><image></image><image></image><image></image><image></image><image></image><image x="50" y="60" width="100" xlink:href="https://avataaars.io/?topType=ShortHairShortFlat&amp;accessoriesType=Blank&amp;hairColor=Brown&amp;facialHairType=Blank&amp;clotheType=CollarSweater&amp;clotheColor=White&amp;eyeType=Default&amp;eyebrowType=Default&amp;mouthType=Default&amp;skinColor=Pale&amp;avatarStyle=Circle" class="person-circle"></image><image x="330" y="60" width="100" xlink:href="https://avataaars.io/?topType=ShortHairShortRound&amp;accessoriesType=Prescription01&amp;hairColor=Brown&amp;facialHairType=Blank&amp;clotheType=CollarSweater&amp;clotheColor=PastelYellow&amp;eyeType=Default&amp;eyebrowType=Default&amp;mouthType=Default&amp;skinColor=Light&amp;avatarStyle=Circle" class="person-circle"></image><image x="50" y="240" width="100" xlink:href="https://avataaars.io/?topType=LongHairStraight&amp;accessoriesType=Blank&amp;hairColor=BlondeGolden&amp;facialHairType=Blank&amp;clotheType=CollarSweater&amp;clotheColor=Gray02&amp;eyeType=Default&amp;eyebrowType=Default&amp;mouthType=Default&amp;skinColor=Pale&amp;avatarStyle=Circle" class="person-circle"></image><image x="330" y="240" width="100" xlink:href="https://avataaars.io/?topType=LongHairStraightStrand&amp;accessoriesType=Blank&amp;hairColor=Auburn&amp;facialHairType=Blank&amp;clotheType=CollarSweater&amp;clotheColor=PastelRed&amp;eyeType=Default&amp;eyebrowType=Default&amp;mouthType=Default&amp;skinColor=Light&amp;avatarStyle=Circle" class="person-circle"></image><text x="100" y="62" font-family="Nunito, sans-serif" font-size="30px" text-anchor="middle" fill="#4ca3dd" class="person-label">Jim</text><text x="380" y="62" font-family="Nunito, sans-serif" font-size="30px" text-anchor="middle" fill="#4ca3dd" class="person-label">Dwight</text><text x="100" y="370" font-family="Nunito, sans-serif" font-size="30px" text-anchor="middle" fill="#F7347A" class="person-label">Angela</text><text x="380" y="370" font-family="Nunito, sans-serif" font-size="30px" text-anchor="middle" fill="#F7347A" class="person-label">Pam</text><text x="20" y="134" font-family="Nunito, sans-serif" font-size="40px" text-anchor="middle" fill="black">♂️:</text><text x="20" y="314" font-family="Nunito, sans-serif" font-size="40px" text-anchor="middle" fill="black">♀️:</text><path d="M100,165C100,207.5,380,207.5,380,250" stroke="red" stroke-width="3" fill="none" class="engage-line"></path><line x1="100" y1="165" x2="100" y2="250" stroke="green" stroke-width="3"></line><line x1="380" y1="165" x2="380" y2="250" stroke="green" stroke-width="3"></line></svg></div> |
> | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
> |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          The green lines above represent the current pairs in the matching A.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
> 
> Suppose:  
> 1) Jim prefers Pam over Angela and  
> 2) Pam prefers Jim over Dwight  
> 
> Then, the pair Jim-Pam (represented by the red line above) is an **unstable pair** because both Jim and Pam prefer each other over their current partners.

###### Stable Matching

A perfect matching with **no unstable pairs** is called a stable matching.

A matching is stable when there does not exist any pair (_A_, _B_) which both prefer each other over their current partner under the matching.

---

## FAQ

###### How many ways are there to match?

> [!question]
> Given $n$ women and $n$ men, how many ways are there to match them, without regard for preferences?

> [!answer]
> There are $n! ≈ (n/e)^n$ perfect matching, ignoring preferences.
> 
> >[!explanation]-
> >Each man must be paired with exactly one woman, and vice versa (perfect matching).
> >This is the same as counting **permutations** of $n$ items.
> >
> >- Women 1 has $n$ choices of men.
> >- Women 2 has $(n-1)$ choices (since one men is already taken).
> >
> >- Women 3 has $(n-2)$ choices. $$\vdots$$
> >
> >- Women $n$ has just $1$ choice.
> >
> >Therfore the total number of matchings is $n!$ (factorial):
> >
> >$$n \times (n-1) \times (n-2) \times \cdots \times 2 \times 1 = n!$$
>
> This is more than exponentially many in $n$ (super-exponential).
> 
> > [!explanation]-
> > For large $n$, factorials grow extremely fast, so we usually approximate using Stirling’s approximation:
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

###### Do stable matchings always exist?

> [!question]
> Do stable matchings always exist?

> [!answer]
> Not always! A stable matching may fail to exist for certain sets of participants and their preferences. 

> [!explanation]
> Consider the [stable roommate problem](https://en.wikipedia.org/wiki/Stable_roommates_problem). 
> - **2n** people; each person ranks others from 1 to 2n – 1.
> - Assign roommate pairs so that there are no unstable pairs.
> 
> |     | 1st | 2nd | 3rd |
> | :---: | :---: | :---: | :---: |
> | A   | B   | C   | D   |
> | B   | C   | A   | D   |
> | C   | A   | B   | D   |
> | D   | A   | B   | C   |
> 
> A-B, C-D ⇒ B-C unstable
> A-C, B-D ⇒ A-B unstable
> A-D, B-C ⇒ A-C unstable
> 
>  This is distinct from the stable matching problem (stable-marriage problem) in that all the stable-roommates problem allows matches between any two elements, not only between classes of _men_ and _women_ – two equally sized sets of participants of two types.

###### Do all executions of Gale–Shapley lead to the same stable matching?

> [!question]
> Do all executions of Gale–Shapley lead to the same stable matching?

> [!answer]
> No, because an instance can have several stable matchings.

> [!explanation]
> In general, there may be many different stable matchings. 
> For example, suppose that there are 3 women and 3 men which have preferences of:
> 
> |        | 1st      | 2nd      | 3rd      |
> | ------ | -------- | -------- | -------- |
> | Monica | Chandler | Joey     | Ross     |
> | Phoebe | Joey     | Ross     | Chandler |
> | Rachel | Ross     | Chandler | Joey     |
> 
> In this input case, there are three stable matchings:
> 
> | Matching 1        | Matching 2        | Matching 3        |
> | ----------------- | ----------------- | ----------------- |
> | Monica & Chandler | Phoebe & Chandler | Rachel & Chandler |
> | Phoebe & Joey     | Rachel & Joey     | Monica & Joey     |
> | Rachel & Ross     | Monica & Ross     | Phoebe & Ross     |
> 
> - Matching 1. All women get their first choice and all men get their last choice.
> - Matching 2. All men get their first choice and all women get their last choice,
> - Matching 3. Everyone gets their second choice.

---

# The Solution

In 1962, David Gale and Lloyd Shapley proved that, for any *equal number* of men and women, it is *always* possible to find a matching in which all pairs are stable. 

## Gale–Shapley Algorithm

The **Gale–Shapley algorithm** involves a number of _"rounds"_ or *"iterations"*. Let’s examine the man-oriented version (for the women-oriented version, just reverse the roles of men and women in the procedure):

- ==In the first round, first==
	- Each unengaged man proposes to the woman he prefers most, and then
	- Each woman replies _"maybe"_ to her suitor she most prefers and _"no"_ to all other suitors. 

She is then provisionally _"engaged"_ to the suitor she most prefers so far, and that suitor is likewise provisionally engaged to her.

- ==In each subsequent round, first==
	- Each unengaged man proposes to the most-preferred woman to whom he has not yet proposed (regardless of whether the woman is already engaged), and then
	- Each woman replies _"maybe"_ if she is currently not engaged or if she prefers this man over her current provisional partner (in this case, her current provisional partner becomes unengaged, and the woman and the man whom she prefers become engaged.).
	  
This allows every already-engaged woman to _"trade up"_ (and reject her until-then partner).

- ==This process is repeated until everyone is engaged.==
	- When all the men have been paired, it goes by saying that all the women are paired (and vice versa). Therefore everyone is paired. See the proof explaining why [[#Claim 2 The algorithm produces a perfect matching, i.e. when the algorithm terminates, the $2n$ parties form $n$ separate pairs.|here →]]

Each man makes a proposal to each woman at most once, so the algorithm takes at most $n^2$ rounds. Therefore, this algorithm is guaranteed to produce a stable matching for all participants in $O(n^2)$ rounds where $n$ is the number of men *or* women. See the proof [[#Claim 1 The algorithm terminates after $ leq n 2$ rounds.|here →]]

To analyse the actual *running time*, however, depends on the implementation details of the algorithm and the data structures used. 

## Algorithm Pseudocode

| <pre>algorithm <b>stable_matching</b>:<br>		Initialize all <i>men</i> and <i>women</i> to <i>free</i> (unengaged)<br>		<b>while</b> there exists a <i>free</i> man <i>m</i> who still has a woman <i>w</i> to propose to:<br>			<b>set</b> w <b>to</b> first woman on m's list to whom m has not yet proposed<br>			<b>if</b> w is <i>free</i>:<br>				(m, w) become <i>engaged</i><br>			<b>else</b>:<br>				let m' be w's current fiance<br>				<b>if</b> w prefers m to m':<br>					m' becomes <i>free</i><br>					(m, w) become <i>engaged</i><br>				<b>else</b>:<br>					(m', w) remain <i>engaged</i></pre> |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <center style="font-style: italic;">Men-oriented version</center>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

| ![[Gale–Shapley-women-oriented-version.png]] |
| :------------------------------------------: |
|            Women-oriented version            |

## Running Time

To analyse the actual running time, we need to specify the algorithm in more detail:
- How are the preference lists given to the algorithm?
- How does the algorithm store the tentative matchings? 
- Most fundamentally: How does the algorithm actually represent women and man?

First, the algorithm takes at most $O(n^{2})$ rounds, where $n$ is the number of men *or* women. 

The algorithm has $n^2$ input because each man submits their preference lists of $n$ women, and vice versa. Therefore, there are $n^2$ preference lists given to the algorithm.  

For the algorithm to run in linear time, we need to execute each "proposal" in constant time. 

One possibility:
- Represent each woman and man by a unique integer between 1 and n.
- Represent preferences as two arrays ${W_{pref}}[1..n, 1..n]$ and ${M_{pref}}[1..n, 1..n]$, where $W_{pref}[i, r]$ is the $r$th man in woman $i$'s preference list. 

A somewhat harder exercise is to prove that there are inputs (and choices of who makes oers when) that force ⌦(n2) oers to be made before the algorithm halts. Thus, our O(n2) upper bound on the worst-case running time is tight.

is to represent each woman and man by a unique integer between 1 and n, and to represent preferences as two arrays ${W_{pref}}[1..n, 1..n]$ and ${M_{pref}}[1..n, 1..n]$, where $W_{pref}[i, r]$ represents the rth hospital in doctor i’s preference list




Let's first show that the **while**l oop of lines 2–9 always terminates, so

---

# Correctness 

This algorithm guarantees 3 claims:

1. **The stable matching is efficient.** The algorithm terminates after $\leq n^2$ rounds (runs in time quadratic in the number of participants).  
2. **Everyone gets matched.** For every possible collection of $n$ lists of preferences provided by all men, and $n$ lists of preferences provided by all women, a stable matching always exists!
3. **The matching produced by the algorithm is stable.** No _X_ and _Y_ can prefer each other over their final match. 

---

### Proof of correctness: termination

#### Claim 1: The algorithm terminates after $\leq n^2$ rounds.

**Proof:**  
- In every round of the algorithm, one developer pitches to one client.  
- Every developer can make a pitch to a particular client at most once.  
- Thus, every developer can make at most $n$ pitches.  
- There are $n$ developers, so in total they can make $\leq n^2$ offers.  
- Therefore, there can be no more than $n^2$ rounds. 

---

### Proof of correctness: perfect matching

#### Claim 2: The algorithm produces a perfect matching, i.e. when the algorithm terminates, the $2n$ parties form $n$ separate pairs.

**Proof:**  

Assume that the algorithm has terminated, but a developer **Daud** is still solo.  

- This means that Daud has already pitched to all the clients.  
- A client is not paired only if no one has pitched to them.  
- Since Daud has pitched to everyone, all $n$ clients must be paired.  
- No developer can have more than one partner, so all $n$ developers must also be paired, including Daud.  

This is a contradiction, completing the proof. 

**Notes**:

If Daud is unpaired, that would mean $n-1$ developers are matched to $n$ clients. 
But this is impossible, since every client can have exactly one developer. 

---

### Proof of correctness: stability

#### Claim 3: The matching produced by the algorithm is stable.

**Reasoning:**  

- Each developer pitches in order from their most preferred to their least preferred client.  
- Therefore, the sequence of clients paired with a particular developer is in this order also.  
- Each client is initially not paired, then accepts the first pitch made to them, and only ever switches to a different developer who they prefer over their current partner.  
- Thus, each client is paired with developers in order from their least preferred to their most preferred.  

**Proof (by contradiction).**

==Assume that the matching is not stable==. Thus, there are two pairs:

$$(\text{Daisuke}, \text{Chuntao}), \quad (\text{Dakota}, \text{Chidi})$$

such that Daisuke prefers Chidi over Chuntao, and Chidi prefers Daisuke over Dakota.

$$\text{Daisuke: } \dots, \text{Chidi}, \dots, \textbf{Chuntao}, \dots$$

$$\text{Chidi: } \dots, \text{Daisuke}, \dots, \textbf{Dakota}, \dots$$

Since Daisuke prefers Chidi over Chuntao, he must have proposed to Chidi before Chuntao.
At that point, Chidi must have either:

1. rejected Daisuke because she was already paired with a developer she prefers over Daisuke, or  
2. accepted Daisuke but later rescinded this pairing in order to accept a pitch from a developer she prefers over Daisuke.

In both cases, Chidi would end up matched with someone higher than Daisuke on her preference list.

However, in the final matching, Chidi is paired with Dakota, whom she prefers *less* than Daisuke. ← this part is the contradiction (its impossible)

This is a contradiction. Therefore, the matching produced by the algorithm must be stable.  

> [!idea]
> Notice the pattern:
> - At every step, Chidi either stays with or switches to a partner she _prefers more than her current one_. 
> - So once she has “seen” Daisuke, she can never end up with anyone _worse than Daisuke_ in her preference list.

---

# Optimality

In general, there may be many different stable matchings.

The Gale–Shapley algorithm in which women make proposals to men always yields the same stable matching (regardless of the order in which proposals are made), and its choice is the stable matching that is the _best for all women_ and _worst for all men_ among all stable matchings.

In a reversed form of the algorithm, this produces a matching that is *best for all men* and *worst for all women* among all stable matchings. These two matchings are the top and bottom elements of the

> [!quote]
> Among all possible different stable matchings, it always yields the one that is best for all men among all stable matchings, and worst for all women (because men get to choose who to propose to). No man can get a better matching for himself by misrepresenting his preferences. However, each woman may be able to misrepresent her preferences and get a better match.

--- 

# Applications

## Matching med-school students to hospitals

> [!example] Problem
> <b>Problem.</b> Given the preference lists of $n$ hospitals and $n$ students, find a stable matching (if one exists).
> 
> <b>Goal.</b> Given a set of preferences among hospitals and med-students, design a *self-reinforcing* admissions process.

> [!NOTE] Input
> <b>Input.</b> A set of $n$ hospitals H and a set of $n$ students S.
> - Each hospital h ∈ H ranks students. 
> - Each student s ∈ S ranks hospitals

> [!definition] 
> ###### Matching
> 
> <b>Def.</b> A **matching** M is a set of ordered pairs h–s with h ∈ H and s ∈ S s.t.
> - Each hospital h ∈ H appears in at most one pair of M.  
> - Each student s ∈ S appears in at most one pair of M.
> 
> <b>Meaning.</b> A matching is an assignment of hospitals and students so that no one belongs to two or more pairs.  
> 
> ###### Perfect Matching
> 
> <b>Def.</b> A matching M is **perfect** if $| M | = | H | = | S | = n$. 
> 
> <b>Meaning.</b> A **perfect matching** is a matching involving all hospitals and all students, s.t.
> - Everyone is matched, and
> - Everyone belongs to exactly one pair (one hospital to one student).
> 
> ###### Unstable Pair
> 
> <b>Def.</b> Given a perfect matching M, hospital h and student s form an **unstable pair** if both:
> - h prefers s to matched student, and
> - s prefers h to matched hospital.
> 
> <b>Meaning.</b> Both hospital h and student s prefer each other over their current partners.
> 
> ###### Stable Matching
> 
> <b>Def.</b> A **stable matching** is a perfect matching with no unstable pairs.
> 
> <b>Meaning.</b> There does not exist any pair (_A_, _B_) which both prefer each other over their current partner under the matching.
> 

# References & Further Reading

- CSE 421 University of Washington: [Stable Matching Solution Visualized](https://uw-cse442-wi20.github.io/FP-cs-algorithm/)
- Wikipedia: [Stable matching problem - Wikipedia](https://en.wikipedia.org/wiki/Stable_matching_problem)
- Wikipedia: [Gale–Shapley algorithm - Wikipedia](https://en.wikipedia.org/wiki/Gale%E2%80%93Shapley_algorithm)

