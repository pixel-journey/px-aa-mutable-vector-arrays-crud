# Official sources

| Source | Use |
| --- | --- |
| [Serialization wiki](https://github.com/pinknetworkx/atomicassets-contract/wiki/Serialization) | Vector / array types on schema format lines |
| [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) | Serialize of vector attributes into mutable bytes |
| [WAX: Modifying mutable data](https://docs.wax.io/build/tutorials/howto_atomicassets/mutabledata) | ATTRIBUTE_MAP client shape |
| [WAX: How-To AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets) | Standard overview |

Empty vectors still occupy a field id in the serialized blob when present in the map (see layer 1 empty `uint64[]` example). Clearing a vector in this lab keeps the key; deleting the key is a different operation and risks a wipe if you drop siblings.

## Stack position

Layer **4 of 5**. Previous: [all-primitive-types](https://github.com/pixel-journey/px-aa-mutable-all-primitive-types). Next: [rpg-xp-and-leveling](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling). Path: [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md).
