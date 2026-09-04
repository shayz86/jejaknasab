# JejakNasab v6.00 – Family Member & Public Link Fix

Fixes:
- Family Member dashboard is identified from `/my/family-status` before checking whether a legacy/erroneous tree row is owned by the same user. This prevents Family Member accounts from being routed into Dashboard Owner Akun.
- Family Member dashboard keeps the v5.21 flow/appearance.
- Public `/f/<token>` page now renders a loading state immediately and gives a visible error instead of a blank page if the public API fails.
- Public main-tree metadata no longer fails completely if `family_branches` migration/table is temporarily unavailable; branch metadata falls back to an empty list while the main public tree remains available.
