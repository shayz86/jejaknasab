-- JejakNasab V6.01 compatibility migration
-- IMPORTANT: additive only. Existing data is never dropped or reset.
--
-- The application performs idempotent column checks at runtime. This SQL file
-- therefore creates the V6 tables/indexes without repeating ALTER TABLE
-- statements that could fail on databases already containing V6 columns.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS family_branches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tree_id INTEGER NOT NULL,
  anchor_person_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  generation_up INTEGER NOT NULL DEFAULT 2,
  generation_down INTEGER NOT NULL DEFAULT 2,
  created_by INTEGER NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tree_id, anchor_person_id),
  FOREIGN KEY(tree_id) REFERENCES family_trees(id) ON DELETE CASCADE,
  FOREIGN KEY(anchor_person_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY(created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS branch_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  branch_id INTEGER NOT NULL,
  person_id INTEGER NOT NULL,
  source_type TEXT NOT NULL DEFAULT 'linked' CHECK(source_type IN ('linked','branch')),
  context_role TEXT NOT NULL DEFAULT 'family',
  sibling_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(branch_id, person_id),
  FOREIGN KEY(branch_id) REFERENCES family_branches(id) ON DELETE CASCADE,
  FOREIGN KEY(person_id) REFERENCES persons(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS branch_relationships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  branch_id INTEGER NOT NULL,
  from_person_id INTEGER NOT NULL,
  to_person_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('parent','spouse','sibling')),
  relation_label TEXT NOT NULL DEFAULT 'Keluarga',
  sibling_order INTEGER NOT NULL DEFAULT 0,
  spouse_status TEXT NOT NULL DEFAULT 'active',
  start_date TEXT DEFAULT '',
  end_date TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(branch_id, from_person_id, to_person_id, type),
  FOREIGN KEY(branch_id) REFERENCES family_branches(id) ON DELETE CASCADE,
  FOREIGN KEY(from_person_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY(to_person_id) REFERENCES persons(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_family_branches_tree ON family_branches(tree_id,active);
CREATE INDEX IF NOT EXISTS idx_branch_members_branch ON branch_members(branch_id,sibling_order,person_id);
CREATE INDEX IF NOT EXISTS idx_branch_relationships_branch ON branch_relationships(branch_id,type,sibling_order);

-- Optional lineage -> branch conversion is handled idempotently by the API.
