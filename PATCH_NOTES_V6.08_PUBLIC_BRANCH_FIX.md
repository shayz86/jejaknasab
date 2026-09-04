# V6.08 — Public Branch Display Fix

Public-only continuation of V6.07.

- Removes the separate public-page `Cabang Keluarga` list below the main tree.
- Keeps branch discovery data internally so member profile popups can show the branch button.
- Public member branch button opens the branch in a new tab.
- Adds a public-only branch data reader compatible with production D1 databases where `branch_members.source_type` / `context_role` are absent.
- The public branch reader falls back to existing `branch_members`, then `branch_relationships`, without requiring a database migration.
- Does not modify dashboard behavior, package logic, zoom behavior, owner/family-member features, or stored data.
