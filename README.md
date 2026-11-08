# px-aa-mutable-vector-arrays-crud

> **Trust:** private educational lab (Tier B)  
> **Quest:** 024 — INT64_VEC / UINT64_VEC / STRING_VEC push, erase, bounds  
> **Layer:** 4 of 5. Map: [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md)  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

This is **not** its own contract. It is the vector half of the same `setassetdata` write. Scalars are quest 023. The wipe rule is 022. Do not treat push/erase as a pack, gem, or achievement product.

`push`, `eraseAt`, and `clear` on typed vectors. Max length 64. Kind and element types are locked. Sibling keys stay when one vector changes.

**Real code:** `npm test`. No live AtomicAssets, no wasm.

## Run

```bash
npm test
```

MIT — Pixel Journey
