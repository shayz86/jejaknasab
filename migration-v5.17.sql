-- JejakNasab V5.17
-- Do NOT reset the existing D1 database.

ALTER TABLE family_trees ADD COLUMN root_person_id INTEGER;
ALTER TABLE relationships ADD COLUMN spouse_status TEXT NOT NULL DEFAULT 'active';
ALTER TABLE relationships ADD COLUMN start_date TEXT DEFAULT '';
ALTER TABLE relationships ADD COLUMN end_date TEXT DEFAULT '';

-- Existing spouse records are treated as active unless an end date is later recorded.
UPDATE relationships SET spouse_status='active' WHERE spouse_status IS NULL OR spouse_status='';

-- Backfill a stable main root: prefer a male person without a recorded father.
UPDATE family_trees
SET root_person_id = (
  SELECT p.id
  FROM persons p
  WHERE p.tree_id=family_trees.id
    AND p.gender='male'
    AND NOT EXISTS (
      SELECT 1 FROM relationships r JOIN persons fp ON fp.id=r.from_person_id
      WHERE r.tree_id=p.tree_id AND r.to_person_id=p.id AND r.type='parent' AND fp.gender='male'
    )
  ORDER BY CASE WHEN p.sibling_order=0 THEN 1 ELSE 0 END,
           p.sibling_order,
           CASE WHEN p.birth_date='' THEN 1 ELSE 0 END,
           p.birth_date,
           p.id
  LIMIT 1
)
WHERE root_person_id IS NULL;

UPDATE family_trees
SET root_person_id = (
  SELECT p.id
  FROM persons p
  WHERE p.tree_id=family_trees.id
    AND NOT EXISTS (
      SELECT 1 FROM relationships r
      WHERE r.tree_id=p.tree_id AND r.to_person_id=p.id AND r.type='parent'
    )
  ORDER BY p.id
  LIMIT 1
)
WHERE root_person_id IS NULL;

CREATE INDEX IF NOT EXISTS idx_tree_root ON family_trees(root_person_id);
CREATE INDEX IF NOT EXISTS idx_relationship_spouse_status ON relationships(tree_id,type,spouse_status,end_date);
