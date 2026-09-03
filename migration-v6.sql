-- JejakNasab v6.00 migration
-- Safe table/index additions. The API also performs idempotent column upgrades for
-- existing D1 databases (title_prefix, title_suffix, main_visible, branch_id, etc.).

CREATE TABLE IF NOT EXISTS family_branches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tree_id INTEGER NOT NULL,
  anchor_person_id INTEGER NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  created_by INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tree_id,anchor_person_id),
  FOREIGN KEY(tree_id) REFERENCES family_trees(id) ON DELETE CASCADE,
  FOREIGN KEY(anchor_person_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY(created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS branch_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  branch_id INTEGER NOT NULL,
  person_id INTEGER NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(branch_id,person_id),
  FOREIGN KEY(branch_id) REFERENCES family_branches(id) ON DELETE CASCADE,
  FOREIGN KEY(person_id) REFERENCES persons(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_family_branches_tree ON family_branches(tree_id,anchor_person_id);
CREATE INDEX IF NOT EXISTS idx_branch_members_branch ON branch_members(branch_id,person_id);
CREATE INDEX IF NOT EXISTS idx_persons_main_visible ON persons(tree_id,main_visible);
CREATE INDEX IF NOT EXISTS idx_optional_branch ON optional_lineages(branch_id,sibling_order);

-- Existing optional_lineages rows are migrated by the v6 API into named
-- Cabang Keluarga records on first request. This avoids destructive data resets.
