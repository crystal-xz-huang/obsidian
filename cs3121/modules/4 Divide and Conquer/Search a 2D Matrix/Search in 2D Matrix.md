---
modules:
  - "[[Divide and Conquer]]"
tags:
  - topic/divide-and-conquer
status: open
---

## Search a 2D Matrix II ([#240](https://leetcode.com/problems/search-a-2d-matrix-ii/description/))

> [!problem]
> Write an efficient algorithm that searches for an integer value in an $[m×n]$ matrix. This matrix has the following properties:
> 
> - Integers in each row are sorted in ascending from left to right.
> - Integers in each column are sorted in ascending from top to bottom.

Given the matrix, if we divide it into some sub-matrices by cutting it either by row and/or column, the resulting matrices would still keep the above two properties of the original matrix.

> 1. We divide the matrix into 4 sub-matrices by choosing a pivot point based on a row and a column.  (**Divide**)
> 2. Then we *recursively* look into each sub-matrix to search for the desired target.  (**Conquer**)
> 3. If we find the target in either of the sub-matrices, we stop the search and return the result immediately.  (**Combine**)

The base cases in the above recursion would be either the input matrix is empty or it contains only a single element. As a simple strategy, one can choose the **middle point** both on the row and column as the pivot points to divide the matrix.

Do we really need to look into each of the divided 4 sub-matrices? Notice that the smallest and the largest element of the input matrix is located in the top left and bottom right corner respectively, which also applies to each of the divided sub-matrices. In fact, we need to only look into 3 of the sub-matrices.

> 1. If our target is equal to the pivot, we have found our target and immediately return the result.
> 2. If our target is less than the pivot, we can discard the bottom-right sub-matrix. All elements in that region must be greater or equal than the pivot.
> 3. If our target is greater than the pivot, we can discard the top-left sub-matrix. All elements in that region must be less than or equal than the pivot.

----

**As an improvement to the above divide-and-conquer algorithm, we could devise a better strategy by choosing the pivot points wisely.**

![](https://assets.leetcode.com/uploads/2019/03/31/search_2d_matrix.png)


## References

- [Learn Divide and Conquer - LeetCode](https://leetcode.com/explore/learn/card/recursion-ii/470/divide-and-conquer/2869/)