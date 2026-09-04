# JejakNasab V6.06

## Public Link Only

Public-link implementation is based on the supplied JejakNasab V6.00 file. This release intentionally changes only the public-link/API path.

### Fix
- Main public-tree API no longer fails when the existing D1 `family_branches` table does not contain the `active` column.
- Public branch lookup tolerates an older `family_branches` schema.
- Public branch listing is schema-tolerant.
- No dashboard, Family Member, zoom, plan, invitation, claim, or other non-public-link behavior was intentionally changed.
- No database reset or data deletion.
