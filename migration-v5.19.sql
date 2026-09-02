-- JejakNasab V5.19
-- Do NOT reset the existing D1 database.

ALTER TABLE optional_lineages ADD COLUMN sibling_order INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_optional_lineages_order
ON optional_lineages(tree_id, anchor_person_id, sibling_order, id);

-- Backfill deterministic order for existing optional parent/child rows.
-- Existing rows retain creation order; new rows receive the next order automatically.
UPDATE optional_lineages
SET sibling_order = id
WHERE sibling_order = 0;
