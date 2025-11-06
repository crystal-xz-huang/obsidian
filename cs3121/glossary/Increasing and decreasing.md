## Definitions

| Term           | Definition                                                                                                 |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| Increasing     | Each element is **strictly less than** the next. <br>Example: `1, 3, 5, 9` since `1 < 3 < 5 < 9`.          |
| Non-decreasing | Each element is **less than or equal to (≤)** the next.<br>Example: `1, 3, 3, 5` since `1 ≤ 3 ≤ 3 ≤ 5`.    |
| Decreasing     | Each element is **strictly greater than** the next.<br>Example: `9, 5, 3, 1` since `9 > 5 > 3 > 1`.        |
| Non-increasing | Each element is **greater than or equal to (≥)** the next.<br>Example: `9, 5, 5, 1` since `9 ≥ 5 ≥ 5 ≥ 1`. |

### Increasing vs Decreasing

> [!definition]
> A sequence is <b>increasing</b> if $a_1 < a_2 < \ldots < a_n.$ 
> It is <b>non-decreasing</b> if $a_1 \leq a_2 \leq \ldots \leq a_n.$  
> 
> Similarly a sequence is <b>decreasing</b> if $a_1 > a_2 > \ldots > a_n.$
> It is <b>non-increasing</b> if $a_1 \geq a_2 \geq \ldots \geq a_n.$ 

----

### ⬇️ Decreasing and non-increasing

#### Decreasing (>)

<b>Decreasing</b> means strictly decreasing — every next element is **less than** the previous one.

$$ a_1 \gt a_2 \gt \cdots \gt a_n$$

$$ 10, 9, 8, 3,1$$

#### Non-increasing (≥)

<b>Non-increasing</b> allows *ties* — each next element is **less than or equal to** the previous one.

$$ a_1 \geq a_2 \geq \cdots \geq a_n$$

$$ 10, 10, 8, 3,1$$

---

### ⬆️ Increasing and non-decreasing

#### Increasing (<)

<b>Increasing</b> means <b>strictly increasing</b> — every next element is **greater than** the previous one.

$$ a_1 \lt a_2 \lt \cdots \lt a_n$$

$$ 1, 2,4,6$$

#### Non-decreasing (≤)

<b>Non-decreasing</b> allows *ties* — each next element is **greater than or equal to** the previous one.
No element is less than the element before it.

$$ a_1 \leq a_2 \leq \cdots \leq a_n$$

$$ 1, 1, 2, 2,4,6$$