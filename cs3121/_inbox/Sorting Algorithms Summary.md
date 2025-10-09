# 📊 Sorting Algorithms Summary

| **Algorithm**   | **Best Case** | **Worst Case** | **Average Case** | **Space** | **Remarks** |
|------------------|---------------|----------------|------------------|-----------|-------------|
| **Bubble Sort**  | $O(n)$        | $O(n^2)$       | $O(n^2)$         | $O(1)$    | Easy to implement; efficient only if array is nearly sorted; rarely used in practice. |
| **Selection Sort** | $O(n^2)$   | $O(n^2)$       | $O(n^2)$         | $O(1)$    | Always quadratic; minimizes swaps; useful if swaps are very expensive. |
| **Insertion Sort** | $O(n)$     | $O(n^2)$       | $O(n^2)$         | $O(1)$    | Efficient for small or nearly sorted arrays; often used as a subroutine in faster sorts. |
| **Heapsort**     | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$    | $O(1)$    | Guaranteed $O(n \log n)$; slower in practice than quicksort due to larger constant factors. |
| **Mergesort**    | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$    | $O(n)$    | Stable; guarantees $O(n \log n)$; requires extra space for merging. |
| **Quicksort**    | $O(n \log n)$ | $O(n^2)$      | $O(n \log n)$    | $O(\log n)$ (recursion stack) | Fastest in practice due to small constants; bad pivot choice gives $O(n^2)$; randomized or median-of-medians pivoting mitigates this. |

---

### Key Takeaways
- **Quadratic sorts** (Bubble, Selection, Insertion) are only useful for very small or nearly sorted arrays.  
- **Mergesort** and **Heapsort** guarantee $O(n \log n)$ performance.  
- **Quicksort** is usually fastest in practice but has a quadratic worst case without careful pivoting.  
- **Stability:** Mergesort and Insertion sort are stable; Heapsort and Quicksort are not (without modifications).  
