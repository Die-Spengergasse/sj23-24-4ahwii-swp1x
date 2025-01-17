# 5AHWII SJ2425

## 2025-01-17_plf2

```sql
CREATE TABLE menschen (
    id INTEGER PRIMARY KEY,
    id_mutter INTEGER NOT NULL,
    id_vater INTEGER NOT NULL,
    name TEXT NOT NULL,
    FOREIGN KEY (id_mutter) REFERENCES menschen(id),
    FOREIGN KEY (id_vater) REFERENCES menschen(id),
    CHECK (
        (id = 1 AND id_mutter = 1 AND id_vater = 1) OR  -- God must self-reference
        (
            id != 1 AND           -- Not God
            id != id_mutter AND   -- Cannot be own mother
            id != id_vater AND    -- Cannot be own father
            id_mutter != id_vater -- Mother and father must be different
        )
    )
);
```

## 2024-09-11

- Repo rename
- Bootstrap intro
- Suku cont

## 2024-09-04

### Themensammlung

- Windows Firewallrichtlinie
- Sudoku m. Bootstrap
- Theorie / Praxis halb - halb
- Gängige Frameworks - Übersicht
- Leetcode
- Docker / Containerization / build processes (z.B. github actions)
- Testing / Test Frameworks
