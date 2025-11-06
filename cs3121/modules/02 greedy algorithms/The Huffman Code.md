---
modules:
  - "[[Greedy Algorithms|Module 2: Greedy Algorithms]]"
categories:
  - "[[Optimal Merging]]"
tags:
  - source/lecture
  - type/concept
  - topic/greedy
---
A Huffman tree is a full binary tree with characters at its leaves. Each edge in the tree corresponds to a bit: a _left_ edge corresponds to 0 and a _right_ edge corresponds to 1. To get the encoding for a character, follow the path from the root node to the character’s leaf node and concatenate all the corresponding bits.

The Huffman tree ensures that characters that are more frequent in the input receive shorter encodings, and characters that are less frequent receive longer encodings.

## Problem Definition

> [!problem]
> Given a set of symbols and their frequencies (probability of occurring).
> 
> The goal is to encode these symbols into binary strings (codewords), so that sequences of such codewords can be **unambiguously decoded**. And so that the **expected (average) length of the encoded string is minimised**.

#### Informal description

<b>Given</b>
A set of symbols $S$ and for each symbol $x \in S$, the frequency $\displaystyle{f_x}$ representing the fraction of symbols in the text that are equal to $x$.

<b>Goal</b> 
Find a <u>prefix-free</u> binary code (a set of codewords) with minimum <u>expected</u> codeword length (equivalently, a tree with **minimum weighted path length from the root**).

#### Formal description

<b>Input</b>
- Alphabet $\displaystyle{A=(a_{1},a_{2},\dots ,a_{n})}$, which is the symbol alphabet of size $n$
- Weights $\displaystyle{W=(w_{1},w_{2},\dots ,w_{n})}$, which is the symbol weights (proportional to *probabilities*), where $w_i$ is the weight or frequency of $a_i$ i.e. $\displaystyle{w_{i}=\operatorname {weight} \left(a_{i}\right),\,i\in \{1,2,\dots ,n\}}$ 

<b>Output</b>
- Code $\displaystyle{C\left(W\right)=(c_{1},c_{2},\dots ,c_{n})}$, which is the sequence of (binary) codewords, where $c_i$ is the codeword for $\displaystyle{a_i , i \in \{1, 2, \ldots, n \}}$.

<b>Goal</b> 
- Minimise the sum of weighted path lengths for the set of leaves in the Huffman tree.
- Let $\displaystyle{L(C(W))=\sum_{i=1}^{n}w_{i} \times \operatorname {length} (c_{i})}$ be the weighted path length of code $C$ 

## Main Idea

> [!idea]
> - Make a **priority queue** of symbols, each weighted by its frequency.  
> - **Repeatedly combine the two lowest frequency symbols**.
> 	- Remove the two symbols of lowest frequency, say $\mathtt{x}$ and $\mathtt{y}$ with freq $\mathtt{f_x}$ and $\mathtt{f_y}$.
> 	- Make a new symbol $\mathtt{xy}$ with frequency $\mathtt{f_x + f_y}$, and insert it to the priority queue.
> - As we do this, we maintain a forest (of binary trees), initially consisting of *n* isolated vertices (i.e. *n* trees each consisting of a single vertex).
> 	- When symbols $\mathtt{x}$ and $\mathtt{y}$ are combined, we add a new vertex representing $\mathtt{xy}$, whose left and right children are $\mathtt{x}$ and $\mathtt{y}$.
> 	- This records that the codeword for $\mathtt{x}$ is to be found by appending a ‘0’ to the codeword for $\mathtt{xy}$, and likewise for $\mathtt{y}$ by appending a ‘1’.

## Example

The result of Huffman coding for a code with five characters and given frequencies:

|                 |      |      |      |      |      |
| --------------- | ---- | ---- | ---- | ---- | ---- |
| symbol $i$      | a    | b    | c    | d    | e    |
| codeword $C_i$  | 00   | 01   | 11   | 100  | 101  |
| frequency $f_i$ | 0.32 | 0.25 | 0.20 | 0.18 | 0.05 |
Average codeword length is the **sum** of weighted path lengths for each leaf—sum of weight×depth for every leaf:

$$  
\displaystyle{\begin{aligned}  
L  
&= \sum_{i \in {a,b,c,d,e}} \mathrm{len}(C_i)\times f_i \\
&= [\mathrm{len}(C_a)\times f_a] + [\mathrm{len}(C_b)\times f_b] + [\mathrm{len}(C_c)\times f_c] + [\mathrm{len}(C_d)\times f_d] + [\mathrm{len}(C_e)\times f_e] \\
&= 2\times 0.32 + 2\times 0.25 + 2\times 0.20 + 3\times 0.18 + 3\times 0.05 \\
&= 2.23  
\end{aligned}}  
$$

Constructing a Huffman tree:

![[huffman-coding-tree-construction.png|350]]

## Proof

> [!lemma]
> Given the frequency $\mathtt{f_i}$ of each symbol $\mathtt{i}$ , the Huffman code produces an optimal prefix code.

Proof Outline
1. First, we prove that an optimal prefix code must arise from a **full** binary tree; one in which **every node has exactly zero or two children**.
	- Hopefully obvious; a node with only one child could be replaced by that child.
2. Then, we prove that in some optimal tree, the two symbols of lowest frequency are siblings at the greatest depth.
	- If these two symbols aren’t siblings at the greatest depth, then swap them with whatever symbols are.
		- Either nothing changes depth, or
		- less frequent symbols increase in depth and more frequent symbols decrease in depth by the same amount, so it is a net improvement.
3. Finally, we prove (by induction on the number of symbols) that the Huffman code is optimal.
	- Prove that repeatedly combining the two lowest frequency symbols is optimal by induction. 
	- Perform the combine operation on some optimal tree and the Huffman tree to get trees on $n − 1$ vertices, and use the induction hypothesis.

---

*Claim 1.* An optimal prefix code must come from a full binary tree. If the tree isn't full, then there is some internal node with only one child (aka the codeword) that you can promote (move up one level) to make codewords shorter.

*Claim 2.* There exists an optimal tree where the two least-frequent symbols are siblings at the greatest (lowest) depth.

Intuitively, the smallest-frequency node(s) are repeatedly pushed down to the bottom of the tree. Then because an optimal tree must be a full binary tree, there must be some optimal tree where a node has the 2 lowest frequency nodes as its children. 

*Observation.* Swapping siblings (sideway swaps) is ok, since it does not change their cost (its expected contribution to the code length = sum x depth). Therefore, the order of children doesn't matter. 

Exchange Argument (inversions):
- If the two least-frequent symbols aren’t the deepest siblings, swap them down with whatever is.
- Either depths don’t change (then cost doesn’t change), or less frequent symbols go deeper while more frequent symbols go higher by the same amount (this reduces the total cost).
- Hence there is an optimal tree where the two least-frequent symbols are deepest siblings.

---

# DRAFT

## Overview

#### Goal

> [!problem]
> Given a set of symbols and their frequencies (probability of occurring).
> 
> The goal is to encode these symbols into binary strings (codewords), so that sequences of such codewords can be **unambiguously decoded**. And so that the **expected (average) length of the encoded string is minimised**.

The goal of Huffman coding is to create a set of **variable-length & prefix-free codes** for characters, with **shorter codes for more frequent characters.** This allows us to represent data more efficiently and compress the overall size.

- Variable-length allows us to represent data more efficiently and compress the overall size.
- The prefix property guarantees that there will be no ambiguity in how a bit string is decoded.

##### Variable-Length Codes

Huffman coding assigns variable-length codes to input characters based on the frequency of those characters. 

More frequent characters receive shorter binary codes, while less frequent characters receive longer codes, leading to overall data compression.

##### Prefix-Free Codes

No character's code is a prefix of another character's code, ensuring unambiguous decoding of the compressed data.

Huffman codes certainly have the prefix property because any prefix for a code would correspond to an internal node, while all codes correspond to leaf nodes. 

##### Optimal Compression

For a given set of character frequencies, Huffman coding produces the most efficient prefix code possible…

##### The idea

- Any encoding into binary can be visualised using a binary tree, where left branches represent ‘0’ and right branches ‘1’.
- In a prefix code, no ancestor of a codeword is itself a codeword, so all codewords must be located at leaves.
- The optimal prefix code is the **Huffman code**!

Huffman coding uses a greedy algorithm to construct an optimal prefix code. This makes sure that the average number of bits in an encoding of an “average” text is as small as possible.

Huffman codes are constructed in a special way to ensure that no code is a prefix of another code. This prefix-free property allows each bit sequence to be decoded unambiguously.

## Building Huffman Coding Trees

The structure of the tree ensures that frequent characters are higher up, resulting in shorter codes.

This tree minimizes the average codeword length among all prefix-free codes for those weights.

A symbol with high weight (frequency) should have low depth, so that it will count (contribute) the least against the total path length. As a result, another symbol might be pushed deeper in the tree if it has less weight.

A Huffman tree is a binary tree with characters at its leaves. Each edge in the tree corresponds to a bit: a _left_ edge corresponds to *bit 0* and a _right_ edge corresponds to *bit 1*. To get the encoding for a character, follow the path from the root node to the character’s leaf node and concatenate all the corresponding bits.

- Each leaf of the Huffman tree corresponds to a symbol, and we define the weight of the leaf node to be the weight (frequency) of its associated symbol. 
- A codeword for a specific symbol is the weighted path from the root to its leaf. 
	- **Depth of a leaf** = length (in bits) of that symbol’s codeword.
	- **Weight of a leaf** = frequency of a symbol (its **probability** of occurring) but can also be the count of a symbol (its number of occurrences).
	- **Weighted path length** for a leaf is its <b>weight</b> times its <b>depth (distance from the root = the number of edges along root path)</b> i.e. $w_{i} \times \operatorname {length}(c_i)$ 
		- $f_{i} \times \operatorname {length}(c_i)$ is the symbol's expected contribution to the code length
		- $n_{i} \times \operatorname {length}(c_i)$ is the total number of bits used for all occurrences of the symbol
- The expected codeword length is the **sum of all weighted path lengths to each leaf node**.
	- A specific path corresponds to a specific codeword for a symbol.
	- A code $\displaystyle{C\left(W\right)=(c_{1},c_{2},\dots ,c_{n})}$ is the sequence of codewords, where $c_i$ is the codeword for a symbol in that codeword.
	- Therefore the expected code length is the sum of all path weights to leaves (codewords).

THEREFORE:
The goal is to find the binary tree with minimum external path weight— the one with the minimum sum of weighted path lengths for the given set of leaves.

- A symbol with high weight (high frequency) should have low depth, so that it will count the least against the total path length of the tree, which is equivalent to the average codeword length.

This construction guarantees a **prefix-free** code because only **leaves** contain the symbols.

This bottom-up construction ensures that the codes are optimal based on the input frequencies. Frequent characters will be lower in the tree with short path lengths.

1. <b>Start with List of Characters and Frequencies</b>
2. <b>Create Leaf Nodes for Each Character</b>
	Create $n$ initial Huffman trees, each of which is a single leaf node with a character
3. <b>Sort Characters by Ascending Frequency</b>
	Put the $n$ partial trees onto a priority queue organised by weight (frequency)
	This is implemented using a min-heap, where the smallest node is first.
4. <b>Iteratively Merge the Two Least Frequent Nodes into a Parent Node</b>
	- Remove the first two trees (with the lowest weight) from the priority queue.
	- Join these two trees together to create a new tree whose root has these two trees as children, and whose weight is the sum of the weights of the two trees.
	- Put this new tree back into the priority queue (*reorder the list*).
	- Repeat until all of the partial Huffman trees have been combined into one.
5. <b>Repeat until Only Root Node Remains</b>
	This process is repeated until all of the partial Huffman trees have been combined into one.

## Huffman Compression Algorithm

> [!algorithm]
> The algorithm uses a **priority queue** where the node with lowest probability is given highest priority:
> 1. Initialise a **min-heap** with one node per symbol keyed by its weight.
> 2. Repeat until one node remains:
> 	- Pop the **two smallest** nodes `x`, `y` (lowest probability/frequency) 
> 	- Create a new parent node `p` with weight `w(p) = w(x) + w(y)`.
> 	- Attach `x` and `y` as `p`’s children (one will be edge `0`, the other `1`).
> 	- Push `p` back into the heap.
> 3. The remaining node is the **root** of the Huffman tree and the tree is complete.
> 
> Each edge in the tree corresponds to a bit: a _left_ edge corresponds to 0 and a _right_ edge corresponds to 1. To get the encoding for a character, follow the path from the root node to the character’s leaf node and concatenate all the corresponding bits.

### Complexity Analysis

Since efficient priority queue data structures require $O(\log n)$ time per insertion, and a tree with $n$ leaves has $2n−1$ nodes, this algorithm operates in $O(n \log n)$ time, where $n$ is the number of symbols.

- **Time complexity:** `O(n log n)`, where n is the number of characters.
- **Space complexity:** `O(n)`, needed for storing the Huffman Tree.
