-- JejakNasab V5.20
-- Safe migration from V5.19. Do NOT reset the existing D1 database.
-- V5.19 already added optional_lineages.sibling_order.

CREATE TABLE IF NOT EXISTS optional_child_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tree_id INTEGER NOT NULL,
  optional_anchor_id INTEGER NOT NULL,
  parent_person_id INTEGER NOT NULL,
  child_person_id INTEGER NOT NULL,
  sibling_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tree_id,optional_anchor_id,parent_person_id,child_person_id),
  FOREIGN KEY(tree_id) REFERENCES family_trees(id) ON DELETE CASCADE,
  FOREIGN KEY(optional_anchor_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY(parent_person_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY(child_person_id) REFERENCES persons(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_optional_child_order
ON optional_child_orders(tree_id,optional_anchor_id,parent_person_id,sibling_order);
