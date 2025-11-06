The sequence segmentation problem asks for a partition of the sequence into k non-overlapping segments that cover all data points such that each segment is as homogeneous as possible. This problem can be solved optimally using dynamic programming in O(n 2 k) time, where n is the length of the sequence. Given that sequences in practice are too long, a quadratic algorithm is not an adequately fast solution. Here, we present an alternative constantfactor approximation algorithm with running time O(n 4/3 k 5/3 ). We call this algorithm the DNS algorithm. We also consider the recursive application of the DNS algorithm, that results in a faster algorithm (O(n log log n) running time) with O(log n) approximation factor, and study the accuracy/efficiency tradeoff. Extensive experimental results show that these algorithms outperform other widely-used heuristics. The same algorithms can speed up solutions for other variants of the basic segmentation problem while maintaining constant their approximation factors. Our techniques can also be used in a streaming setting, with sublinear memory requirements.


Related Problems:
- Break a string of letters into words.
- Break a string of words into sentences.

### Approach 3: Bottom Up Dynamic Programming

We maintain a 2D array ,  
dp[n][subSetSum]  
For an array element i and sum j in array nums,

dp[i][j]=true if the sum j can be formed by array elements in subset nums[0]..nums[i],otherwise dp[i][j]=false

dp[i][j] is true it satisfies one of the following conditions :

- Case 1) sum j can be formed without including ith element,

if dp[i−1][j]==true

- Case 2) sum j can be formed including ith element,

if dp[i−1][j−nums[i]]==true


