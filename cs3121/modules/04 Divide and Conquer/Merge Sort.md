---
categories:
  - "[[Divide and Conquer]]"
tags:
  - topic/divide-and-conquer
  - categories
status: open
---

# Merge Sort

Steps:
- **Divide:** Split the array into two equal parts ($\Theta(1)$)  
- **Conquer:** Sort each part recursively  
- **Combine:** Merge the two sorted subarrays ($\Theta(n)$)  

Recursion is $\log_2 n$ levels deep, with a total of $\Theta(n)$ time spent in each level.  
Time complexity is $\Theta(n \log n)$.

## Example Problems

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
    name: Problems
    order:
      - file.name
      - formula.topic_tags
    columnSize:
      file.name: 200
```


