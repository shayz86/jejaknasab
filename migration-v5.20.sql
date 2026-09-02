-- JejakNasab v5.20
-- Penyimpanan urutan anak khusus untuk setiap silsilah opsional.
CREATE TABLE IF NOT EXISTS optional_child_orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tree_id INTEGER NOT NULL,
  anchor_person_id INTEGER NOT NULL,
  parent_person_id INTEGER NOT NULL,
  child_person_id INTEGER NOT NULL,
  sibling_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tree_id, anchor_person_id, parent_person_id, child_person_id),
  FOREIGN KEY(tree_id) REFERENCES family_trees(id) ON DELETE CASCADE,
  FOREIGN KEY(anchor_person_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY(parent_person_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY(child_person_id) REFERENCES persons(id) ON DELETE CASCADE
);
