# AtomicAssets vector mutables: push, erase, clear

> **Stack:** layer 4 of 5 — [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md)  
> **Sources:** [SOURCES.md](SOURCES.md)

**Goal:** `push`, `eraseAt`, and `clear` on typed vectors (`int64` / `uint64` / `string`) while sibling keys survive — the same full-map write discipline as the rest of the mutable stack.

Lab caps (educational, not AtomicAssets limits): max 64 elements; string elements max 256 characters. The live serializer will write whatever length you hand it.

Byte previews for one `int64[]` or `uint64[]` value: `previewAttributeBytes` in [wax-atomic-template-and-schema-explorer](https://github.com/pixel-journey/wax-atomic-template-and-schema-explorer). Example: `int64[]` of `-2` → `040103`; `uint64[]` of `128` → `04018001`.

| Layer | Concern |
| --- | --- |
| 1 | Bytes / deserialize |
| 2 | Full-map write (no wipe) |
| 3 | Scalar kinds |
| **4 (this)** | Vector CRUD + bounds |
| 5 | Applied XP / level game rule |

**Official type system:** [Serialization wiki](https://github.com/pinknetworkx/atomicassets-contract/wiki/Serialization). **Contract:** [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract).

**Code under test:** `npm test` (unit + sequential composition).

## Composition

`vectors.composition.test.ts` pushes three int64 scores, erases the middle, and leaves a sibling string vector alone. Filling to `MAX_VEC_LEN` (64) refuses the next push. `clear` empties one key without deleting the other. A kind mismatch mid-path leaves both vectors intact.

## What is true (executed)

- Push on int64 / uint64 / string vectors.
- `eraseAt` shifts elements; out-of-range refused.
- `clear` keeps the key (empty vector) and does not delete siblings.
- Kind / element type mismatch refused.

```bash
npm test
```

## Stack neighbors

| Layer | Repo |
| --- | --- |
| 1 | [px-aa-mutable-deserialize-core](https://github.com/pixel-journey/px-aa-mutable-deserialize-core) |
| 2 | [px-aa-mutable-safe-partial-updater](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) |
| 3 | [px-aa-mutable-all-primitive-types](https://github.com/pixel-journey/px-aa-mutable-all-primitive-types) |
| 5 | [px-aa-mutable-rpg-xp-and-leveling](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling) |

MIT — Pixel Journey
