# Worked examples — mutable vector CRUD

Kinds: `int64_vec`, `uint64_vec`, `string_vec`.

## Push order

`scores` int64: push -5 then 10 → `[-5, 10]`, len 2.
`ids` uint64: 1 then 2 → len 2.
`tags` string: alpha, beta → len 2. Element length 257 → `string too long`.

## Kind and type

Pushing `uint64_vec` onto an `int64_vec` key → `kind mismatch`. String into int64 key → type mismatch. Negative into uint64_vec → out of range.

## eraseAt / clear

`["a","b","c"]` erase index 1 → `["a","c"]`. Index -1 or 1 on single element → bad index. Missing key → missing key.

`clear` leaves the key with empty vector and same kind.

## Cap

Fill to `MAX_VEC_LEN` then next push → `vec full`; length unchanged.

## Composition

Push scores 1,2,3 and tags `oak`; erase scores index 1 → scores `[1,3]`, tags still `["oak"]`.
Clear scores → len 0; tags still `pine` in the sibling test.
Failed kind mismatch leaves prior vectors intact; later correct push appends.

Layer 4 of the mutable stack — after primitives, before RPG xp.
