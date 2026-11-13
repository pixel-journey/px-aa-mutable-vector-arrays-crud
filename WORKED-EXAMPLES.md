# Worked examples — vectors

## Example A — push and erase

```text
scores: [] → push 1,2,3 → [1,2,3]
eraseAt(1) → [1,3]
sibling tags: ["a"] unchanged
```

## Example B — clear keeps key

`clear("scores")` → `scores: []` still in map; other keys remain.

## Example C — full vector

64 elements; 65th push refused.

## Example D — type mismatch

Push string into int64[] → refused; map unchanged.

## Example E — out-of-range erase

`eraseAt` past length → refused.
