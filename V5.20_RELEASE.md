# JejakNasab V5.20

V5.20 is a full rebuild from the V5.19 source package.

## Fixes
- API calls use `/api?path=...` to avoid Pages Functions route-resolution failures that produced `Endpoint tidak ditemukan`.
- Main tree is anchored to `family_trees.root_person_id`; disconnected records are shown separately as anggota lain.
- Family Member receives only the relationship scope it is allowed to see, keeping its tree consistent with the Owner dashboard.
- Spouse cards have a real gap with a centered relationship line.
- Parent → child connector now has a vertical segment from the parent couple to the sibling line and vertical drops to children.
- Dashboard has a compact Silsilah Opsional list.
- Optional branches open in a modal using the same tree model as the main tree.
- Optional public profile can link to the optional family tree.
- Optional branch automatically includes the anchor's spouse and descendants from the main tree.
- Optional child ordering is stored separately and does not change main-tree child order.
- Member picker search is embedded at the top of the dropdown.

## Database
Run `migration-v5.20.sql` once on an existing V5.19 D1 database. It only creates the new `optional_child_orders` table.
