---
tags:
  - type/concept
---
# Character Encoding

**Character encoding** is the process of converting characters (letters, numbers, symbols) into numerical values (bits: 0s and 1s).

For example, the standard [ASCII coding](https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/Glossary.html#term-ASCII-character-coding) scheme assigns a unique eight-bit value to each character. 

> [!important]
> It takes a certain minimum number of bits to provide enough unique codes so that we have a different one for each character. 
> 
> For example, it takes $⌈\log_2{128}⌉ = 7$ bits to provide the 128 unique codes needed to represent the 128 symbols of the ASCII character set.

## Terminology

### Binary string or bitstring

**Binary string** or **bit string** is the sequence of zeros and ones (bits) e.g. `01101100`

### Code word

**Code word** (or code value) is the bit string for one symbol (e.g. `a → 010`).

### Code

**Binary code** or **code** is the *mapping* from symbol(s) to bit string—the _set_ of codeword(s). 
For example, the mapping 

$$\displaystyle C=\{\,a\mapsto 0,b\mapsto 01,c\mapsto 011\,\}$$

is a code, where the source alphabet is the set $\{a, b, c\}$ and target alphabet is the set $\{0,1\}$.

The code can also be written as a bitstring (the sequence of codewords):

$$\{\,{\texttt {a}}\mapsto {\texttt {0}},{\texttt {b}}\mapsto {\texttt {01}},{\texttt {c}}\mapsto {\texttt {011}}\,\} = \boxed{\texttt {01101100}}$$

Note that "code" is also used to mean the "encoding" of a word/string = the bitstring.

### Variable-length codes

In a **variable-length code** codewords may have different lengths.

For example: $\{0, 101, 100, 111, 1101, 1100\}$ is a variable-length code.

Typically this is done in a way such that the ==objects that are most likely to be used have the shortest codes==, with the goal of minimizing the total space needed to represent a sequence of objects. 

**Huffman coding** is an example of a variable-length coding scheme.

### Fixed-length codes

In a **fixed-length code** each codeword has the same length.

For example: $\{000, 001, 010, 011, 100, 101 \}$ is a fixed-length code.

<b>Important Fact</b>
- Fixed-length codes are always ==uniquely decipherable==: no codeword can be a prefix of another, so the code is prefix-free and hence uniquely decodable.
- But ==do not always give the best compression==. [^1]
	- Each codeword is fixed-length; the length depends on the number of symbols.
	- With $M$ symbols, any fixed-length code must use $k=⌈\log_2 M⌉$ bits per symbol.

> [!question]
> How long is a fixed-length code for a set of $n$ symbols?
> 
> > [!answer]
> > At least $\boxed{\lceil \log_2 n \rceil \texttt { bits}}$ to provide the $n$ unique code values (code words) needed to represent $n$ symbols (assuming all codes will be the same length).
> 
> > [!tip]
> > An easier way is to solve for $k$ in $\boxed{2^k = n}$ for the number of different $k$-bit strings.
> > Then for 31 symbols, $2^5 = 32 > 31$ so we could assign each symbol a $5$-bit codeword.
> 
> > [!explanation]
> > - Every symbol gets a bitstring (codeword) of the same length $k$.
> > - There are exactly $2^k$ **distinct** bitstrings of length $k$ over the set $\{0, 1\}$.
> > 	- A bitstring of length $k$ has $k$ positions (for each bit).
> > 	- Each bit position can be $0$ or $1$ ⇒ 2 choices per position.
> >
> > 	- Each choice is independent from the other, so we multiply: $$2 \times 2 \times \cdots \times 2 \; (k \text{ times}) = 2^k$$
> >
> > - To assign a **unique** codeword to each of the $n$ symbols, you need $2^k \geq n$.
> > - The smallest such $k$ is $k=⌈\log_2 n⌉$.

### Uniquely decodable codes

A code is **uniquely decodable** (or **unambiguous**) if there is only one way to decode its binary string, meaning there is no ambiguity:

<center>original message → binary code → decoded message</center>

A message is *uniquely decodable* (vis-a-vis[^2] a particular code) if it can only be decoded in one way. 

### Prefix codes

In a **prefix (free) code** no codeword is a prefix of another one. 
For example:
- $\{a = 0, b = 110, c = 10, d = 111\}$ is a prefix code
- $\{a=0,b=110,c=11,d=111\}$ is *not* prefix-free, because $11$ is a prefix of $110$ and $111$.

> [!important]
> <b>Prefix codes are unambiguous.</b> But they are not the only unambiguous code; for instance, the reverse of a prefix code is still uniquely decodable (it is a suffix code), but it is not necessarily a prefix code.

<b>Important Fact</b>
- ==All fixed-length codes are prefix codes.== This is trivially true for fixed-length codes, so it is only a point of consideration for variable-length codes. 
- ==A prefix code is a uniquely decodable code==. Given a sequence, we can identify each word without requiring a special marker (delimiter) between words.

<b>Examples</b>
**Every message encoded by a prefix free code is uniquely decipherable.** Since no codeword is a prefix of any other we can always find the first codeword in a message, peel it off, and continue decoding. 

> [!example] Example 1. Unambiguous code
> This mapping is uniquely decodable, because each bitstring terminates as soon as we see a 0.
>
> $$M_1 = \{\,{\texttt {a}}\mapsto {\texttt {0}},{\texttt {b}}\mapsto {\texttt {01}},{\texttt {c}}\mapsto {\texttt {011}}\,\} = \texttt {01101100}$$
>
> Therefore the string $\texttt {01101100}$ can be encoded like so:
>
> $$
> \texttt {\color{red}{0}\color{cyan}{110}\color{red}{110}\color{cyan}{0}  
> = \color{red}{a}\color{cyan}{b}\color{red}{b}\color{cyan}{a}}
> $$

> [!example] Example 2. Ambiguous code
> This mapping is _not_ uniquely decodable,
>
> $$M_{2}=\{\,{\texttt {a}}\mapsto {\texttt {1}},{\texttt {b}}\mapsto {\texttt {011}},{\texttt {c}}\mapsto {\texttt {01110}},{\texttt {d}}\mapsto {\texttt {1110}},{\texttt {e}}\mapsto {\texttt {10011}},{\texttt {f}}\mapsto {\texttt {0}}\} =  \texttt {011101110011}$$
>
> since the string 011101110011 can be interpreted as the sequence of codewords 01110 – 1110 – 011, but also as the sequence of codewords 011 – 1 – 011 – 10011. 
>
> $$
> \texttt {{\color{red}{01110}\color{cyan}{1110}\color{red}{011} = \color{red}{c}\color{cyan}{b}\color{red}{d}}}
> $$
>
> $$
> \texttt {\color{red}{011}\color{cyan}{1}\color{red}{011}\color{cyan}{10011}  
> = \color{red}{b}\color{cyan}{a}\color{red}{b}\color{cyan}{e}}
> $$
>
> Given an unambiguous code, we require a special marker (delimiter/separator) between each codeword to be able to identify (and encode) each word. 

Therefore, we are interested in finding good (best compression) prefix-free codes.

## Theory

### Fixed-Length versus Variable-Length Prefix Codes







[^1]: Compression means represent the data using less space (fewer bits) with no loss of information (**lossless compression**).

[^2]: in relation to; with regard to.
