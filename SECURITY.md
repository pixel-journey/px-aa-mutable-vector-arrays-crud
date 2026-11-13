# Security notes — vector CRUD

| Mitigated | Behavior |
| --- | --- |
| Overlong vector (lab) | push refused |
| Bad index | erase refused |
| Element type mismatch | refused |
| Sibling wipe | full-map style updates |

Production: real schema types, RAM, collection auth, chain previous map.
