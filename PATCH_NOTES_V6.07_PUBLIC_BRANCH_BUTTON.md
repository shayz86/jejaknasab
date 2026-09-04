# V6.07 — Public Branch Button Only

Public-only fix based on V6.06.

- Restores the public API branch list when the production D1 `family_branches` table does not expose an `active` column.
- Keeps existing `family_branches` records; no migration/reset/drop is performed.
- The existing public profile action now opens the member's Cabang Keluarga in a new browser tab.
- No dashboard, Family Member, package, zoom, owner, or branch-management behavior was changed.
