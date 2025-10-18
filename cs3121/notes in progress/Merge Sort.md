## Merge Sort

- Time Complexity: `O(n log(n))`
- Space Complexity: `O(n)`

### The Idea Behind the Merge Sort

The idea is to split the array in half at the midpoint, and simply call the function on itself, meaning further split each array until you reach a base case where all sub-arrays are size 1. Once you reached the base case, you merge all single element sub-arrays in a sorted manner, from bottom to the top of the recursion tree.

- **Divide:** Divide the unsorted array into several sub-array until each sub-array contains only single element.
- **Merge:** Merge the two sub-arrays into a sorted array and continuously merge until achieves the original array.
- **Merging technique:** Compare the first element of the two sub-arrays. Take the element with the smaller value from the sub-array and append it to the output array. This process is repeated until both sub-array are emptied and the output array contains all elements. 

```python
def merge_sort(array):
    # base case: an array of 0 or 1 items is sorted
    if len(items) <= 1:
        return items

    # split in half
    mid = len(items) // 2
    left_half = items[:mid]
    right_half = items[mid:]

    # recursively divide (until trivially sorted: base case)
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)

    # recursively merge the sorted halves
    return merge(left_sorted, right_sorted)
```

![[merge-sort.excalidraw|1500]]

Merge Sort Algorithm:
1. Divide the unsorted list in half
2. Continue to divide until until reached base case of a single value (size is 1)
3. `Merge` the two halves in a sorted manner by comparing the values


Merge Algorithm:
The merge function takes **two sorted subarrays** and returns a new sorted array consisting of elements from both of the subarrays.


![merge two sorted arrays](https://www.programiz.com/sites/tutorial2program/files/merge-two-sorted-arrays.png "Merge step")



## Implementation

> Source: [Python Sorting Algorithms: merge_sort() | by Abel Garrido](https://python.plainenglish.io/python-sorting-algorithms-merge-sort-7eda999ca5cf)

The `merge sort` algorithm recursively divides the array into halves until we reach the base case of array with 1 element. After that, the `merge` function picks up the sorted sub-arrays and merges them to gradually sort the entire array.

```python
def merge_sort(items):
    # Base case: a list of zero or one elements is sorted
    if len(items) <= 1:
        return items

    # Split the list into halves
    mid = len(items) // 2
    left_half = items[:mid]
    right_half = items[mid:]

    # Recursively sort both halves
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)

    # Merge the sorted halves
    return merge(left_sorted, right_sorted)


def merge(left, right):
    sorted_list = []

    # 2 pointers to read values from left and right lists
    while left and right:
        # if left value is smaller, add it to the sorted list
        if left[0] <= right[0]:
            sorted_list.append(left[0])
            left.pop(0)
        # else right value is smaller, add it to the sorted list
        else:
            sorted_list.append(right[0])
            right.pop(0)

    # Append any remaining elements
    if left:
        sorted_list += left
    if right:
        sorted_list += right

    return sorted_list
```



## Analysis

> See: [Merge Sort Analysis](https://mathcenter.oxford.emory.edu/site/cs171/mergeSortAnalysis/)


![](https://www.kirupa.com/sorts/images/running_complexity_300.png)


![Merge Sort Analysis](https://mathcenter.oxford.emory.edu/site/cs171/mergeSortAnalysis/mergesort_analysis_by_recursion_tree.png)![algorithm analysis - How to calculate the mergesort time complexity? -  Computer Science Stack Exchange](https://encrypted-tbn3.gstatic.com/imageshttps://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSc5rIUWyr5BrxW5pi1Y7Bm6MOqdaYmmsZOUIw1lcSx6zyer7GdZrrLXT259g)


## References & Further Reading

[Merge Sort: A Simple Step-by-Step Walkthrough 😀](https://www.kirupa.com/sorts/mergesort.htm)
[Merge Sort Algorithm](https://www.enjoyalgorithms.com/blog/merge-sort-algorithm)
