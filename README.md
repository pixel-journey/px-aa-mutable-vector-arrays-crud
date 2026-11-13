# px-aa-mutable-vector-arrays-crud

> **Trust:** private educational lab (Tier B)  
> **Stack:** layer 4 of 5 — [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md)  
> **Sources:** [SOURCES.md](SOURCES.md)

**One-sentence goal:** `push`, `eraseAt`, and `clear` on typed vectors (int64 / uint64 / string). This lab refuses a 65th element and a string longer than 256. Those caps are not AtomicAssets checks. The serializer writes whatever length you hand it.

The bytes for one `int64[]` or `uint64[]` value are `previewAttributeBytes` in [wax-atomic-template-and-schema-explorer](https://github.com/pixel-journey/wax-atomic-template-and-schema-explorer). `int64[]` of `-2` is `040103`. `uint64[]` of `128` is `04018001`. This file does not emit those bytes.

This is **not** its own contract. It is the vector half of the same `setassetdata` write. Do not treat push/erase as a pack, gem, or achievement product — those would be layer-5-style **applications**, not new stack layers.

| Layer | Concern |
| --- | --- |
| 1 | Bytes / deserialize |
| 2 | Full-map write (no wipe) |
| 3 | Scalar kinds |
| **4 (this)** | Vector CRUD + bounds |
| 5 | Applied XP / level game rule |

Official type system: [Serialization wiki](https://github.com/pinknetworkx/atomicassets-contract/wiki/Serialization). Contract: [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract).

**Real code:** `npm test` (unit + **sequential composition**). No live AtomicAssets, no wasm.

## Composition note

`vectors.composition.test.ts` pushes three int64 scores, erases the middle, and leaves a sibling string vector alone. Filling to `MAX_VEC_LEN` (64) refuses the next push. `clear` empties one key without deleting the other. A kind mismatch mid-path leaves both vectors intact.

## What is true (executed)

- Push on int64 / uint64 / string vectors.
- `eraseAt` shifts elements; out-of-range refused.
- `clear` keeps the key (empty vector), does not delete siblings.
- `MAX_VEC_LEN` 64.
- Kind / element type mismatch refused.
- Sequential push / erase / clear keeps sibling keys.

```bash
npm test
```

## Layout

| Path | Role |
| --- | --- |
| `invariants/` | push / eraseAt / clear tests |
| `EDUCATION.md` | Why vectors are still full-map writes |
| `SECURITY.md` | Length caps and type lock |
| `SOURCES.md` | Official contract and docs.wax.io |

## Stack neighbors

| Layer | Repo |
| --- | --- |
| 1 | [px-aa-mutable-deserialize-core](https://github.com/pixel-journey/px-aa-mutable-deserialize-core) |
| 2 | [px-aa-mutable-safe-partial-updater](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) |
| 3 | [px-aa-mutable-all-primitive-types](https://github.com/pixel-journey/px-aa-mutable-all-primitive-types) |
| 5 | [px-aa-mutable-rpg-xp-and-leveling](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling) |

## License

MIT — Pixel Journey
