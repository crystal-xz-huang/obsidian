---
categories:
  - "[[Divide and Conquer]]"
tags:
  - categories
  - topic/divide-and-conquer
---

# Quicksort

Steps:
- **Divide:** Choose a pivot and partition the array around it ($\Theta(n)$)  
- **Conquer:** Sort both sides of the pivot recursively  
- **Combine:** Pass the answer up the recursion tree ($\Theta(1)$)  

*Typically*, recursion is $\log_2 n$ levels deep, with a total of $\Theta(n)$ time spent in each level.  

- Time complexity is $\Theta(n \log n)$ in the *average case.* 
- *Worst case* is $\Theta(n^2)$, with extreme choices of pivot.

## Related Problems

```base
filters:
  and:
    - file.hasTag("examples")
    - file.hasLink(this.file)
formulas:
  topic_tags: file.tags.filter(value.contains("topic"))
properties:
  file.name:
    displayName: Problem
  formula.topic_tags:
    displayName: Topics
views:
  - type: table
    name: Example Problems
    order:
      - file.name
      - formula.topic_tags
    columnSize:
      file.name: 200
```
