# Tips — vector mutables

## Do

- Always merge the full map after vector ops.  
- Document index shift on erase for game designers.  
- Keep kind locked once the attribute exists.

## Don't

- Delete the key when you mean clear.  
- Raise MAX_VEC_LEN without CPU/RAM budget.  
- Skip sibling asserts in tests.

## Related

[primitives](https://github.com/pixel-journey/px-aa-mutable-all-primitive-types) · [safe-partial](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) · [RPG XP](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling) · [deserialize-core](https://github.com/pixel-journey/px-aa-mutable-deserialize-core)
