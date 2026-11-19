# Sources

| Source | Use |
| --- | --- |
| [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) | Vector attribute types |
| [Serialization wiki](https://github.com/pinknetworkx/atomicassets-contract/wiki/Serialization) | Length-prefixed vectors |
| [WAX How-To AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets) | Overview |
| [WAX: Modifying mutable data](https://docs.wax.io/build/tutorials/howto_atomicassets/mutabledata) | Full-map write |
| [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md) | Layer order |

## Product facts locked by this lab

- **Erase shifts** later indexes. It does not leave a hole.
- **Clear** keeps the key and the kind at length 0. It does not delete the key.
- Kind mismatch (treating a string as a vector) is **non-mutating**.
- Returning only the vector in `new_mutable_data` still **wipes** sibling scalars. Always full-map write.
- Push past `MAX_VEC_LEN` is refused. That cap is a lab limit, not a chain maximum.
- Erase out of range is refused.

## Related labs

| Lab | Role |
| --- | --- |
| [primitives](https://github.com/pixel-journey/px-aa-mutable-all-primitive-types) | Scalar kinds |
| [safe-partial-updater](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) | Full-map merge |
| [deserialize-core](https://github.com/pixel-journey/px-aa-mutable-deserialize-core) | Empty vector bytes |
| [rpg-xp-and-leveling](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling) | Game rule on top |
