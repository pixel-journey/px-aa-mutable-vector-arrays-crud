# AI handoff — mutable vector CRUD

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
# https://github.com/atomicassets/atomic-knowledge — pin commit, AGENTS.md
```

| Tool | Role |
| --- | --- |
| [Serialization wiki](https://github.com/pinknetworkx/atomicassets-contract/wiki/Serialization) | Length-prefixed vectors |
| [atomicassets-sdk](https://github.com/atomicassets/atomicassets-sdk) | Serialize path |
| [safe-partial-updater](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) | Full-map merge |
| [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md) | Layer 4 of 5 |

## Non-negotiables

1. **Erase shifts** later indexes. It does not leave a hole.
2. **Clear** keeps the key and the kind at length 0. It does not delete the key.
3. Kind mismatch is **non-mutating**.
4. Returning only the vector in `new_mutable_data` still **wipes** sibling scalars. Always full-map write.
5. Push past `MAX_VEC_LEN` is refused (lab limit, not chain max).
6. Vector rules port; schema vector kinds and chain max lengths are local.

## Prompt seeds

- "Vector [10,20,30], erase index 0 — what is the new index 0?"
- "Clear a vector attribute — is the key gone?"
- "Show why writing only the vector map wipes xp/nickname siblings."
- "Refuse push past MAX_VEC_LEN without mutating state."

## Do not

- Leave holes after erase.
- Delete the key on clear.
- Open a micro-repo for one vector attribute name.
