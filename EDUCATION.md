# Education — vector attributes on mutables

> **Rung:** `npm test` passes. Push / erase / clear on typed vectors without wiping sibling keys.  
> **The test is the rule.**

AtomicAssets supports **vector** attribute types. This lab teaches push, erase, clear, kind locking, and **sibling keys** so a vector edit never drops `nickname` (or any other field).

Stack **layer 4 of 5**: [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md).

Prior: [all-primitive-types](https://github.com/pixel-journey/px-aa-mutable-all-primitive-types).  
Next: [rpg-xp](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling).  
Wipe rule: [safe-partial-updater](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater).

Official: [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) · [WAX AtomicAssets how-to](https://docs.wax.io/build/tutorials/howto_atomicassets).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Push grows the vector; siblings stay |
| Intermediate | Erase shifts indices; clear keeps key+kind |
| Masterclass | Kind mismatch is non-mutating; MAX_VEC_LEN is a lab cap |

---

## Beginner

Start with `scores: []` and `nickname: "hero"`. Push `10` then `20` → `scores: [10, 20]`, nickname still **hero**.

## Intermediate

| Op | Effect |
| --- | --- |
| erase index 0 on [10,20,30] | [20,30] — later indices shift |
| clear | key remains, kind remains, length 0 |
| push past MAX_VEC_LEN | refused |
| erase out of range | refused |

## Masterclass

Kind mismatch (e.g. treating a string attribute as vector) **does not mutate** the map — throws, state unchanged.

### Common mistakes

1. Writing only `{ scores: [...] }` and wiping nickname.  
2. Assuming erase leaves a hole (it shifts).  
3. Treating clear as delete key.  
4. Assuming MAX_VEC_LEN is the chain maximum.

### Nice-to-have extensions (not in this repo)

- Ordered insert / swap ops.  
- Nested object attributes (not standard AA vectors).  
- Live schema-validated setassetdata.

### Exercises

1. After erase(0) on three elements, what is index 0?  
2. Does clear remove the key? (No.)  
3. Does a kind mismatch change sibling keys? (No.)

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).
