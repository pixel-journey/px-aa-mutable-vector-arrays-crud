# Education

Vector attributes are common for achievement lists, socketed gems, and pack contents. Unbounded push can exhaust RAM on-chain. This lab stops at 64 elements and at 256 characters in one string. [atomicdata.hpp](https://github.com/atomicassets/atomicassets-contract/blob/v2.0.0/include/atomicdata.hpp) does not. It writes a count, then each element. The byte layout for `int64[]` and `uint64[]` is the template explorer linked from the README.

`eraseAt` is index-based so callers cannot accidentally remove the wrong element by value when duplicates exist. Clearing keeps the key so the schema slot still exists as an empty vector rather than vanishing from the map.
