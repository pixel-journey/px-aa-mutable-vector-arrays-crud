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
| Who may edit | collection authorized_editor |
| Live AA validation | schema format on serialize |
| Unbounded growth | hard cap + RAM budget |
| Game semantics of index shift | document for designers |

## Attack angles

1. Returning only the vector in `new_mutable_data` (wipes scalars).
2. Raising MAX_VEC_LEN without CPU/RAM budget.
3. Changing kind mid-flight without a migration.
4. Expecting erase to leave a hole at the old index.

## Honesty limits

No AtomicAssets RPC. Related: [primitives](https://github.com/pixel-journey/px-aa-mutable-all-primitive-types) · [safe-partial](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) · [RPG XP](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling).
