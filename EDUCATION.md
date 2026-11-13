# Education — vector mutable CRUD

> **Layer 4 of 5** — [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md)  
> Full-map write still applies: editing a vector means writing the **whole** map back.

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | push / eraseAt / clear without dropping sibling keys |
| Intermediate | Bounds (lab max 64) and type mismatch refusals |
| Masterclass | Empty vector vs omitted key (layer 1) while mutating vectors |

## Beginner

Vectors are schema types like `int64[]`, `uint64[]`, `string[]`. Operations:

- **push** — append element
- **eraseAt** — remove by index, shift tail
- **clear** — empty array, **keep the key**

## Intermediate

Composition: push three scores, erase middle, sibling string vector untouched. Push past `MAX_VEC_LEN` (64) refused. Kind mismatch mid-path leaves both vectors intact.

## Masterclass

`clear` → present empty vector (id + length 0 in bytes). Deleting the key entirely is a different product choice and risks wipe semantics if done naively.

Byte previews: explorer `int64[]` of `-2` → `040103`; `uint64[]` of `128` → `04018001`.
