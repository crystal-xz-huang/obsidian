---
modules:
  - "[[Greedy Algorithms|Module 2: Greedy Algorithms]]"
categories:
  - "[[Optimal Merging]]"
  - "[[The Huffman Code]]"
tags:
  - type/problem
  - topic/greedy
  - source/lecture
---
## Array Merging

> [!problem]
> Assume you are given $n$ sorted arrays of different sizes.
> 
> You are allowed to merge any two arrays into a single new sorted array and proceed in this manner until only one array is left.
> 
> Design an algorithm which achieves this task and moves array elements as few times as possible.

- Given N arrays of different sizes, guaranteed that they are all individually sorted.
- Goal is to merge them into one big long sorted array.

###### Number of Merges

The *total number of merge operations* is $\Theta(n)$ and lies between $n-1$ and $n-(\lfloor\log_2 n\rfloor+1)$.

- Each merge reduces the total number of arrays by 1 (since you combine two arrays into one)
- Therefore, there is exactly $\boxed{n-1}$ merges in total

> [!explanation]-
> If we do the merging in rounds (pair everything you possible can) like so:
> 
> ![External Sorting - Algorithmica](https://en.algorithmica.org/hpc/external-memory/img/k-way.png)
> 
> the total number of merges are a geometric series that sums to $< n$ 
>
> $$\boxed{\frac{n}{2} + \frac{n}{4} + \frac{n}{8} + \cdots +1 \approx n-1}$$
>
> This is an **overestimate** in general, thus the total number of merges is $\Theta(n)$ (tight bound). 
> 

###### Minimising Cost 

The *total cost of merging* is the total number of element moves and is minimised by merging the two smallest arrays first.

Merging arrays of sizes $x$ and $y$ costs $x + y$ (you must touch every element once).
<b>Goal:</b> Choose a merge order that minimises the sum of these costs over all merges.

> [!question]
> Say we have arrays with sizes 10, 20, and 30.
> Which arrays do we first merge together to minimise the total element movement?
> > [!answer]
> > Merge the two **smallest** arrays first.

> [!explanation]
>If you merge 20+30 first you “pay 50” now and then “50+10” next, effectively paying for the largest array twice; merging the two smallest costs 30 first and the final merge costs 60 either way, so the total is smaller when you start with the smaller pair.

## Character Encoding

### Problem 1. Unambiguous code

> [!problem] Problem: Unambiguous code
> You are given a set of symbols, for example the English alphabet plus some punctuation marks and a blank space (to be used between words), giving the 31 symbols:
>
> $$\texttt{abcdefghijklmnopqrstuvwxyz ,.?!}$$
>
> You want to encode these symbols using binary strings, so that sequences of such symbols can be decoded in an unambiguous way.

> [!question]
> How long do these binary strings need to be?
> 
> > [!answer]
> > We have 31 symbols. Therefore we need $\boxed{\log_2{31} = 5}$ bits per symbol (assuming all codes are the same length).
> > 
> > An easier way is to solve for $k$ in $2^k = 31$ for the number of different $k$-bit strings.
> > Then $2^5 = 32 > 31$ so $k=5$ works.

#### Fixed-length codes

> [!solution] A possible solution
>
> Assign a different 5 bit sequence to each symbol in $$\texttt{abcdefghijklmnopqrstuvwxyz ,.?!}$$

- This works! Every symbol can be encoded, and any message we encode can be decoded unambiguously.  
- To decode you partition the bitstream into groups of 5 bits and use a lookup table.
- **But this code is inefficient**. Common symbols and rare symbols are all given binary encodings of the same length. It would be more efficient to encode common symbols with short strings.  
- Is there a way to construct an efficient and unambiguous code?

#### Variable-length codes

> [!solution] A possible solution 
> Give fewer bits to the common characters and more bits to the uncommon ones.

- Say we encode the letter $\texttt {e}$ with a shorter 2-bit string. 
- Does this work (is this coding unambiguous)?
- This does not work! **We would need to compensate for this by making another code longer.** 

> [!example]
> Let’s look at a smaller alphabet with just 6 symbols:
>
> $$\texttt{a c e k t s}$$
>
> Since $2^3 = 8 > 6$, we could assign each symbol a 3-bit binary.
> 
> But the letters e and t are very common in English, so let’s give them shorter strings:
>
> $$e = 00, \; t = 11$$
>
> And all the other letters get strings of length 3:
>
> $$a=010, \; c =101, \; k =111, \; s =100$$
>
> Is this binary code unambiguous? No. Let’s see why.
>
> ---
>
> **Code**: $a=010, \; c =101, \; e = 00, \; t = 11, \; k =111, \; s =100$
> **Original message**: cake
> 
> **Encoding step.**
> 1. cake → (101) 
> 2. ake → (101)(010) 
> 3. ke → (101)(010)(111) 
> 4. e → (101)(010)(111)(00)
> 
> **Binary code**. 10101011100
> 
> **Decoding step.**
> Two possible decodings for the string 10101011100:
> - 101 010 <u>11</u> 100 → cats
> - 101 010 <u>111</u> 00 → cake
> 
> >[!abstract] 
> >Our code was ambiguous because the encoding of $t = 11$ is a <u>prefix</u> of $k = 111$.

### Problem 2. Efficient, unambiguous code 

> [!problem] Problem: Efficient, unambiguous code
> You are given a set of symbols, for example the English alphabet plus punctuation marks and a blank space (to be used between words), giving the 31 symbols:
>
> $$\texttt{abcdefghijklmnopqrstuvwxyz ,.?!}$$
>
> **Each symbol has a frequency (probability of occurring)**. You want to encode these symbols using binary strings, so that sequences of such symbols can be decoded in an unambiguous way. And so that the **expected length of the encoded text is minimised**.

#### Prefix codes

- Any encoding into binary can be visualised using a binary tree, where left branches represent ‘0’ and right branches ‘1’.  
- In a prefix code, no ancestor of a codeword is itself a codeword, so all codewords must be located at leaves.
- The optimal prefix code is the **Huffman code**!

![[huffman-coding-tree-example.png|500]]

Huffman’s method uses a greedy algorithm to construct an optimal prefix code. This makes sure that the average number of bits in an encoding of an “average” text is as small as possible.



