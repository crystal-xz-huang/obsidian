# Glossary

## cost

The amount of resources that the solution consumes.

## growth rate

The rate at which the cost of the algorithm grows as the size of its input grows.

## best case

In algorithm analysis, the problem instance (a particular set of inputs) from among all problem instances for a given input size $n$ that has **least** cost. 

Note that the best case is **not** when n is small, since we are referring to the best input scenario for a problem across a set of inputs, all of size n. 

<u>Example:</u>
For insertion sort, the best case is when all input is already sorted, so the algorithm takes only one pass – $O(n)$ steps – to perform the task. 

The best case for a linear search on a list occurs when the desired element is the first element of the list.

## worst case

The worst-case complexity describes an algorithm's **maximal** complexity over all possible inputs. It gives an **upper bound** on the resources required by the algorithm.  

In algorithm analysis, the problem instance from among all problem instances for a given input size $n$ that has **greatest** cost (the longest running time for example).   

Note that the worst case is **not** when $n$ is big, since we are referring to the worst input scenario across any set of inputs, all of size n (i.e, we want the worst choice of inputs from all possible inputs of size n).

<u>Example:</u> The input in the worst-case for insertion sort is when the numbers are reverse sorted and it takes $O(n^2)$ steps to sort them; therefore the worst-case time-complexity of insertion sort is of $O(n^2)$.

## average case 

The average-case complexity of an algorithm is the amount of some computational resource (typically time) used by the algorithm, averaged over all possible inputs. It describes an algorithm's *typical* behavior on all inputs of size $n$.

In algorithm analysis, the average of the costs for all problem instance of a given input size $n$. If not all problem instances have equal probability of occurring, then average case must be calculated using a weighted average.

## complexity

> Aliases: computational complexity

The *amount of resource (cost)* required to run the algorithm on a given input of size n.

In general, the complexity of an algorithm ...

- describes the amount of resource (like time or memory) it takes to run an algorithm.
- expresses the cost (the amount of resource required) as a *function* of the input size n.
- models the rate at which the cost of the algorithm grows as the size of its input grows.
- measures how the cost of the algorithm scales with the size of the input.

As the amount of resources required to run an algorithm generally varies with the size of the input, the complexity of an algorithm is defines as a function $n \to f(n)$, where $n$ is the **size of the input** and $f(n)$ is the **complexity**; a function that calculates the cost to run the algorithm on a given input of size $n$.

To model the cost as a function, we need to have 2 definitions: a definition for the cost of each basic operation performed by the algorithm, along with a definition for the size of the input. [^1]

### best, worst and average case 

Different inputs of the same size may cause the algorithm to have different behaviour, so we describe the complexity using best, worst and average cases. 

The **best**, **worst**, and **average** cases of a given algorithm express what the resource usage (the computational complexity) is **at least**, **at most** and **on average**, respectively.

- The best-case complexity is the *least* amount of a resource (time, memory or space) an algorithm will need for inputs of size n. 
- The worst-case complexity is the *maximum* amount of resources (time, memory or space) an algorithm will need for inputs of size n. 
- The average-case complexity is the _typical_ behavior of the algorithm on inputs of size n.




<u>Resources: Time and Space Complexity</u>
The resource being considered is usually the computational time and memory storage requirements an algorithm would place on *any* computer.

Time complexity is expressed as the number of required elementary operations, aka *steps*, on an input of size $n$, needed to run the algorithm. These steps are assumed to take constant time (that is, not affected by the size of the input) on *any* given machine and change only by a constant factor when run on a different computer.

Space complexity is generally expressed as the amount of memory required/used by an algorithm on an input of size $n$.

**Note:** The running time is NOT quantified by the usual units of time (seconds, minutes etc.) because its too dependent on the choice of a specific computer, its hardware, and other external factors. For example, a computer today can execute an algorithm significantly faster than a computer from the 1960s; so measuring the time in seconds is not reliable and indicative of an algorithm's performance.

## best, worst and average case

Different inputs of the same size may cause the algorithm to have different behaviour, so we describe the complexity using best, worst and average cases. 

The **best**, **worst**, and **average** cases of a given algorithm express what the resource usage (the computational complexity) is **at least**, **at most** and **on average**, respectively.

- The best-case complexity is the *least* amount of a resource (time, memory or space) an algorithm will need for inputs of size n. 
- The worst-case complexity is the *maximum* amount of resources (time, memory or space) an algorithm will need for inputs of size n. 
- The average-case complexity is the _typical_ behavior of the algorithm on inputs of size n.






Tthe **best**, **worst**, and **average** cases of a given algorithm expresses what the resource usage is **at least**, **at most** and **on average**, respectively.

Different inputs of the same size may cause the algorithm to have different behaviour/performance so we describe the complexity using best, worst and average cases.

- The average-case complexity is the _typical_ behavior of the algorithm on inputs of size n. 
- The worst-case complexity is the *maximum* amount of resources an algorithm will need for inputs of size n. 
- The best-case time complexity is the *least* amount of a time an algorithm will need for inputs of size n. 

When analyzing an algorithm, should we study the best, worst, or average case performance? 

## Best case

Normally we are not interested in the best case, because this might happen only rarely and generally is too optimistic for a fair characterization of the algorithm’s running time. In other words, analysis based on the best case is not likely to be representative of the behavior of the algorithm. However, there are rare instances where a best-case analysis is useful—in particular, when the best case has high probability of occurring. The [Shellsort](https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/Shellsort.html#shellsort) and [Quicksort](https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/Quicksort.html#quicksort) algorithms both can take advantage of the best-case running time of [Insertion Sort](https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/InsertionSort.html#insertionsort) to become more efficient.

## Worst case

In most cases, we are concerned with the worst-case complexity, so as to be robust to maliciously created (or simply unlucky) instances. Even if the inputs "unlucky" such that they always lead to the worst-case scenario, you still know the algorithm won’t blow up. 

The advantage to analyzing the worst case is that you know for certain that the algorithm must perform *at least* that well. 

<u>Example:</u> A sorting algorithm that takes $\mathcal{O}(n^{2})$ in the worse case is risky compared to one that guarantees $\mathcal{O}(n \log n)$ because an adversary could always give you inputs that trigger the worst case.

### Average case

Sometimes, it’s worth considering the **_average_** or **_expected_** running time:

- In some circumstances, we are willing to accept the occasional poor performance as a trade-off for the good average performance across over all possible inputs (or a large sample of them). 
- For other applications—particularly when we wish to aggregate the cost of running the program many times on many different inputs—worst-case analysis might not be a representative measure of the algorithm’s performance

But analysing the average case requires **probabilistic analysis**, which is beyond the scope of this course (except for algorithms we rely purely on results of this type from prior courses, (e.g. hash table operations, quicksort)

# References

- https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/Glossary.html

[^1]: Further information: [16.1. Glossary: Cost Model – CS3 Data Structures & Algorithms](https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/Glossary.html#term-cost-model) 
