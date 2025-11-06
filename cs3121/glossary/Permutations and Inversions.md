## Permutations

> [!def] Permutation
> A *permutation* is an *ordering* or *arrangement* of a set of items.

Say we have 3 vouchers $v_1, v_2, v_3$.
A permutation of these vouchers can be any reordering of the indices:

$$[1,2,3] \;,\; [1,3,2]\;,\; [2,1,3]\;,\; [2,3,1]\;,\; [3,1,2]\;,\; [3,2,1].$$

Each permutation represents a different way to assign vouchers to drinks.

### Permutation Function π

A **permutation** $\pi$ represents *one distinct ordering* of items (out of all possible rearrangements).

A **permutation function** $\pi(i)$ maps gives the item at position $i$ within that ordering.

---

## Inversions

An **inversion** is a pair of elements that are out of their natural order.

An inversion of a permutation $\sigma$ is a pair $(i, j)$ of indices where the entries of a permutation are in the opposite order:  $i<j$ and $\sigma(i) > \sigma(j)$.

