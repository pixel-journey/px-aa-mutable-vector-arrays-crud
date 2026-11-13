# Tips — vector attributes

- Cap length on contract for RAM; lab 64 is educational.
- Prefer `clear` over deleting the key if schema expects the attribute.
- Still deserialize → mutate → full serialize (layers 1–2).
- String element max 256 chars in this lab only.
