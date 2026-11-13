# AtomicAssets vector mutables: push, erase, clear

> **Stack:** layer 4 of 5 — [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md)  
> **Sources:** [SOURCES.md](SOURCES.md)

**Goal:** `push`, `eraseAt`, and `clear` on typed vectors while sibling keys survive.

**Code under test:** `npm test` (unit + sequential composition). Lab caps: max 64 elements; string elements max 256 chars.

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Push, erase, clear, bounds |
| [TIPS.md](TIPS.md) | RAM and empty vs omit |
| [SECURITY.md](SECURITY.md) | Bounds and types |
| [SOURCES.md](SOURCES.md) | Wiki + explorer |

## What is true (executed)

- Push int64 / uint64 / string vectors; erase shifts; clear keeps key; mismatch refused.

```bash
npm test
```

MIT — Pixel Journey
