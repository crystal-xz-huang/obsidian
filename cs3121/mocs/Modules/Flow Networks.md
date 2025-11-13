---
aliases: ["Module 5: Flow Networks"]
tags: [index-pages]
---

# Module 5: Flow Networks

## Module Learning Outcomes

1. Explain how flow **networks** are used to develop algorithms
2. Solve problems by creatively applying flow networks
3. Communicate algorithmic ideas at different abstraction levels
4. Evaluate the efficiency of algorithms and justify their correctness
5. Apply the LATEX `typesetting` system to produce <u>high</u>-quality technical documents

## Table of Contents

1. Flow Networks
2. Solving the Maximum Flow Problem  
	1. Ford-Fulkerson algorithm  
	2. Cuts in a Flow Network  
	3. Max-flow Min-cut (and proof of correctness of FFA)
	4. Time complexity
	5. Alternatives to Ford-Fulkerson
3. Applications of Network Flow  
	1. Extending the network flow model  
	2. Example: Movie rental  
	3. Example: Cargo allocation  
	4. Example: Vertex-disjoint paths  
	5. Example: Maximum bipartite matching
	6. Example: Job centre

## Backlinks

```base
filters:
  and:
    - file.hasLink(this)
formulas:
  Path: file.path
properties:
  note.created:
    displayName: Date
  file.name:
    displayName: Title
  note.categories:
    displayName: Categories
views:
  - type: list
    name: Backlinks
    order:
      - file.name
      - categories
      - created
    sort:
      - property: created
        direction: DESC
    columnSize:
      file.name: 215
      note.categories: 123
  - type: table
    name: Recent entries
    order:
      - file.name
      - created
    sort:
      - property: created
        direction: DESC
    limit: 20

```