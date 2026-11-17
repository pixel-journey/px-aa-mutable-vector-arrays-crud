# Tips — vector mutables

## Do

- Always merge the **full map** after vector ops (wipe bug still applies).
- Document **index shift on erase** for game designers (later elements move down).
- Keep kind locked once the attribute exists (INT64_VEC stays INT64_VEC).
- Cap length (this lab: MAX_VEC_LEN) so a grief loop cannot unbounded-RAM you.

## Don't

- Delete the key when you mean **clear** (empty vector still has the key and kind).
- Raise MAX_VEC_LEN without a CPU/RAM budget.
- Skip sibling asserts in tests.

## Common mistakes

1. Erasing index 0 and expecting index 2 to stay at 2.
2. Pushing past the cap and treating it as silent truncate.
3. Changing kind mid-flight (string vec → uint vec) without a migration.
4. Returning only the vector in `new_mutable_data` and losing scalar siblings.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Ordered set (no duplicates) | New invariant on push |
| Buff list for RPG | Compose with [RPG XP](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling) |
| Schema-driven max len | Read from format metadata |

Related: [primitives](https://github.com/pixel-journey/px-aa-mutable-all-primitive-types) · [safe-partial](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) · [deserialize-core](https://github.com/pixel-journey/px-aa-mutable-deserialize-core) · [MUTABLE-STACK](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md)
