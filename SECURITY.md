# Security — vector mutable CRUD

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Sibling keys after vector ops | preserved (full-map merge) |
| Kind mismatch | non-mutating refusal |
| Length / index bounds | refused past MAX_VEC_LEN or bad index |
| Clear vs delete | clear keeps key + kind; delete removes key |
| Erase | later indexes **shift** down |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Who may edit | collection `authorized_editor` |
| Live AA validation | schema format on serialize |
| Unbounded growth | hard cap + RAM budget |
| Game semantics of index shift | document for designers |

## Attack angles

1. Returning only the vector in `new_mutable_data` (wipes scalars).  
2. Raising MAX_VEC_LEN without CPU/RAM budget.  
3. Changing kind mid-flight without a migration.  
4. Expecting erase to leave a hole at the old index.  
5. Confusing clear (empty array, key stays) with delete (key gone).

## Honesty limits

No AtomicAssets RPC.

| Sibling | Role |
| --- | --- |
| [primitives](https://github.com/pixel-journey/px-aa-mutable-all-primitive-types) | Scalar kinds |
| [safe-partial](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) | Merge without wipe |
| [RPG XP](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling) | Level + XP agreement |
| [deserialize-core](https://github.com/pixel-journey/px-aa-mutable-deserialize-core) | Bytes → fields |

[AtomicAssets contract](https://github.com/pinknetworkx/atomicassets-contract) · [docs.wax.io AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets).
