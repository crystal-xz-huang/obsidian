---
status: open
tags:
---
# Draft

Reference:
- [Reddit - Confused about Big-oh, Theta and Omega notations](https://www.reddit.com/r/algorithms/comments/13rcitf/confused_about_bigoh_theta_and_omega_notations/)

There are a lot of different angles to begin tackling this subject from, and which one clicks for you is going to depend heavily on your math background and how you conceptualize these things. So I'm going to dump everything I can think of here in the hopes that some part of it speaks to your experience and offers you a foothold to grok the rest.

First, as another commenter said, it's helpful to decouple your thinking from algorithms. These are just sets of functions, which may happen to describe the behavior of an algorithm as its input scales. You can think of Ο(f) etc. as _functions_ that take any function and return the set of all functions that "grow" at a similar rate. (I'll explain what this technically means below, but in practice a solid intuitive understanding is all you need — a quadratic function grows faster than a linear function, a cubic grows faster than a quadratic, an exponential grows faster than any polynomial, etc.)

- Ο(f) is the set of all functions that grow no faster than f
    
- Θ(f) is the set of all functions that grow roughly as fast as f
    
- Ω(f) is the set of all functions that grow at least as fast as f
    

The "big" asymptotic orders are non-strict: The function f is in all three of Ο(f), Θ(f), Ω(f); informally, think of them as ≤, ≈, ≥.

The "little" orders, less often used, are strict bounds; think <, >.

- ο(f) is the set of all functions that grow strictly slower than f
    
- ω(f) is the set of all functions that grow strictly faster than f
    

Notably, a function f is never included in ο(f) or ω(f), as that would mean that it grows slower or faster than _itself_ — a nonsensical statement!

There is an asymmetry between the big and little notations, and it should be clear why: There is only one theta order, because there is only one sense in which two functions can grow at the same rate. (Though arguments could be had about whether it should be called Θ or θ according to this taxonomy, either way one side would end up with one more than the other.)

---

Some concrete examples:

f(x) = 0.5x²

g(x) = 2x² + x + 1

h(x) = 3x³

f ∈ ο(h), Ο(h), Ο(g), Θ(g), Ω(g)

g ∈ ο(h), Ο(h), Ο(f), Θ(f), Ω(f)

h ∈ Ω(f), Ω(g), ω(f), ω(g)

---

The asymptotic orders expressed in terms of set relations:

ο(n) ⊂ Ο(n) ⊂ ο(n²) ⊂ Ο(n²) ⊂ ο(n³) ⊂ Ο(n³)

ω(n³) ⊂ Ω(n³) ⊂ ω(n²) ⊂ Ω(n²) ⊂ ω(n) ⊂ Ω(n)

Θ(f) = Ο(f) ∩ Ω(f) — a function is Θ(f) if and only if it is both Ο(f) and Ω(f)

Ο(f) = ο(f) ∪ Θ(f) — a function is Ο(f) if and only if it is either o(f) or Θ(f)

Ω(f) = ω(f) ∪ Θ(f) — a function is Ω(f) if and only if it is either ω(f) or Θ(f)

Ο(f) = ω(f)c; ω(f) = Ο(f)c — a function is Ο(f) if and only if it is _not_ ω(f), and vice versa

Ω(f) = ο(f)c; ο(f) = Ω(f)c — a function is Ω(f) if and only if it is _not_ ο(f), and vice versa

f ∈ Ο(g) = g ∈ Ω(f) — f is Ο(g) if and only if g is Ω(f)

f ∈ ο(g) = g ∈ ω(f) — f is ο(g) if and only if g is ω(f)

You could draw a Venn diagram with the circles labeled Ο(f) and Ω(f), and the intersection would be Θ(f), while the left and right sides would be ο(f) and ω(f).

---

Okay, so the formal definitions. There are actually two ways to formally define the asymptotic orders; only one is commonly taught, because it is more general and more useful, but it is also more complex. The less general definition is more intuitive and easier to grasp, so I will be leading with that.

**First definition:**

In the limit as x tends to infinity...

- f ∈ ο(g) means that f(x)/g(x) vanishes to 0
    
- f ∈ Θ(g) means that f(x)/g(x) approaches some finite non-zero number
    
- f ∈ ω(g) means that f(x)/g(x) diverges to infinity
    
- f ∈ Ο(g) means that f(x)/g(x) is finite (whether zero or non-zero)
    
- f ∈ Ω(g) means that f(x)/g(x) is non-zero (whether finite or infinite)
    

Note that, using the set relations above, you only need Θ and one of the other four to define all the rest, so there is no need to keep all of these in mind. Personally, I like to think of the big orders simply as unions of the little orders with the theta order, but your mileage may vary.

Now, this definition is simple and beautiful and intuitive, but unfortunately it fails to categorize many common functions — for instance, sin(x) oscillates around zero, never exceeding ±1; since it does not grow, it seems like maybe it ought to be Θ(1)... but when you try to check this by taking the above limit, it does not exist! We can fix this by adjusting the Ο, Θ, Ω definitions to take limits inferior and superior, which I leave as an exercise for the interested reader; in practice, however, a completely different style of definition is used.

**Second definition:**

This is the one that is taught in schools and used by working computer scientists. It is really aided by drawing a graph to demonstrate what all the variables represent, but I only have text, so I'll do my best to explain, and you can look up some pretty pictures elsewhere on the internet.

- f ∈ Ο(g) means that there exist some c, x₀ such that f(x) ≤ cg(x) for all x > x₀
    
- f ∈ Ω(g) means that there exist some c, x₀ such that f(x) ≥ cg(x) for all x > x₀
    

What these definitions are saying is that we can rescale f and g however we like (this formalizes "we don't care about coefficients"), and we can pick any point we like, as far out as we need to isolate the behavior we want (this formalizes "we don't care about smaller terms"). And it doesn't matter what happens up to that point, but beyond it, the expected relation must hold for all inputs.

- f ∈ ο(g) means that _for all_ c, there exists some x₀ such that f(x) < cg(x) for all x > x₀
    
- f ∈ ω(g) means that _for all_ c, there exists some x₀ such that f(x) > cg(x) for all x > x₀
    

Notice the subtle change here: Now we are not allowed to choose any scale we want, but the relation must hold for every scale. That is, in order for f to be ο(g), it doesn't matter how much we scale g down, it must _always_ eventually dominate f. Even if we're comparing f(x) = 99999x and g(x) = 0.0000001x², though it takes a while to pick up, g(x) does start growing much faster, and there comes a point where it passes f(x) and never falls below it again.

- f ∈ Θ(g) means that there exist some c₁, c₂, x₀ such that c₁g(x) ≤ f(x) ≤ c₂g(x) for all x > x₀
    

Theta is the odd one out. Your first inclination might be to just say something about f(x) = cg(x), following the pattern established above, but that is actually much too strict a condition. For instance, f(x) = x + 1 is never equal to g(x) = x + 2 no matter how we scale them — but they are clearly growing at the exact same rate! What we want is to allow for some "slop" between our functions, and to do this we use two separate bounds, above and below. If you squint at this, you will see that this is just saying that f is both Ο(g) and Ω(g)!

I mentioned before that the limit definition struggles to order periodic functions without some additional complications, so let's check that our second definition handles this case smoothly:

- sin(x) ∈ Θ(1)
    

Looking above, in order to show that this is true, we must find c₁, c₂, and x₀ such that c₁ ≤ sin(x) ≤ c₂ for all x > x₀. This is actually very easy! Take for instance c₁ = −1, c₂ = 1. The function sin(x) is always bounded by these values, so x₀ can be anything at all; 0 seems like a fine default choice. Plugged into our definition, the tuple (−1,1,0) constitutes a simple constructive proof that sin(x) ∈ Θ(1).



---

Big-O is an upper bound  
Big-Ω is a lower bound  
but  
Big-θ is NOT an average.  
  
Big-O, Big-Ω, Big-θ describe infinite sets of functions.  
We use the terms "average", "best", and "worst" to describe scenarios. 
e.g. We could find the Big-O of the average-case running time for quick sort.
SO Big-O does NOT mean worst-case time/complexity => it means in the worst-case, the time complexity is O(⋅).

What Big-θ means:  
If f(n) is Big-θ( g(n) ) it means that:  
f(n) is Big-O( g(n) ) AND f(n) is Big-Ω( g(n) )

Which, basically means that you can squeeze f(n) between:  
k1 * g(n) and k2 * g(n) when n is large  
Or more loosely we could say it is "tightly bounded" by the set of functions characterized by g(n).

---

### Misconception: Big-O ≠ worst case

Definitions:
best / worst / average case refer to **input scenarios**:

**Best case**: the input that makes the algorithm run the fastest (fewest steps).
- e.g. insertion sort on an already-sorted array: O(n)
**Worst case**: the input that makes the algorithm run the slowest (most steps).
- e.g. insertion sort on a reverse-sorted array: O(n^2)
**Average case**: the _expected_ number of steps over all possible inputs of size nnn, assuming some probability distribution on inputs.
- e.g. quicksort runs in O(nlog⁡n) on average, even though worst case is O(n^2).

So these terms are about **which input we are analyzing**.

---

Some websites say Big-O describes worst-case running time. But that’s not correct, since you can also talk about _average/best or or worst-case complexity in Big-O_. Its just commonly used to describe the worst-case complexity because its the most robust guarantee.
 Big-O ≠ worst-case. 
 
 For example here:

- Big O (`O`) is the **worst case**; it represents a one-sided upper bound, describing the maximum time or space an algorithm may require.
- Big Theta (`Θ`) is the **average case**; it represents a two-sided bound, meaning the algorithm’s growth is tightly bound from above and below by the same function.
- Big Omega (`Ω`) is the **best case**; it represents a one-sided lower bound, defining the minimum performance an algorithm can achieve under ideal conditions.

So i should probably not read these articles bc thats hella misleading.

---

## Growth Rate

**Growth rate** is the rate at which the cost of the algorithm grows as the size of its input grows.

In algorithm analysis, we are interested in estimating the ***asymptotic* growth rate** of an algorithm — asymptotical meaning its limiting behaviour for large enough $n$, or equivalently, its behaviour as $n$ approachs infinity (since large enough values of $n$ will limit/bound its growth).

If two algorithms have different growth rates by definition, one *eventually* grows faster than the other, meaning that **beyond a certain value of $n$**, one is always faster. 

#### FAQ: Does the value of the limit point matter?

Once we’ve found _any_ cutoff value of $n$, it doesn't matter how large it is, because we only care about it the **upper (or lower) bound limit** of its growth rate. 

- If $f(n) = O(g(n))$, then we know that $f(n)$ will *never* be faster than $g(n)$ for *all values of n*. 

<u>Disclaimer</u>: The range of values for problem input size $n$ that a real user of an algorithm will give to that algorithm is called the [practicality window](https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/Glossary.html#term-practicality-window). If this cutoff value of $n$ is outside the practical limit that any real user is likely to use, then the asymptotically faster (not slower) algorithm is practically faster.

---

# Resources & Further Reading

1. [Theta notation (algorithm analysis) - Algol.dev (with illustrations)](https://algol.dev/en/algorithm-analysis-theta-notation/)
2. [Understanding Big Oh, Big Theta, and Big Omega Notations | Substack](https://codinginterviewsmadesimple.substack.com/p/understanding-big-oh-big-theta-and)
3. [What is the difference between lower bound and tight bound? | StackOverflow](https://stackoverflow.com/questions/464078/what-is-the-difference-between-lower-bound-and-tight-bound/471292#471292)
4. [Software Development: Introduction in Big-O Notation](https://www.maniuk.net/2019/06/introduction-in-big-o-notation.html)
5. [What is the difference between Big O, Big Omega, and Theta notation?](https://www.linkedin.com/pulse/what-difference-between-big-o-omega-theta-notation-emad-yowakim/)
6. [Khan Academy](https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/big-big-theta-notation)
7. [Big O vs Theta Θ vs Big Omega Ω Notations - GeeksforGeeks](https://www.geeksforgeeks.org/dsa/difference-between-big-oh-big-omega-and-big-theta/)
8. [Big O notation - Wikipedia](https://en.wikipedia.org/wiki/Big_O_notation)

