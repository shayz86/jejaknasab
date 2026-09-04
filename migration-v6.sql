-- JejakNasab V6.00 additive migration
-- Safe for an existing D1 database. Do NOT drop or reset existing data.
PRAGMA foreign_keys = ON;

ALTER TABLE persons ADD COLUMN title_prefix TEXT NOT NULL DEFAULT '';
ALTER TABLE persons ADD COLUMN title_suffix TEXT NOT NULL DEFAULT '';
ALTER TABLE persons ADD COLUMN main_visible INTEGER NOT NULL DEFAULT 1;
ALTER TABLE optional_lineages ADD COLUMN sibling_order INTEGER NOT NULL DEFAULT 0;

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
CREATE INDEX IF NOT EXISTS idx_branch_members_person ON branch_members(person_id);
CREATE INDEX IF NOT EXISTS idx_branch_relationships_branch ON branch_relationships(branch_id,type,sibling_order);
CREATE INDEX IF NOT EXISTS idx_persons_tree_main ON persons(tree_id,main_visible,sibling_order,id);

-- Migrate the V5.x optional-lineage graph into V6 branch context.
INSERT OR IGNORE INTO family_branches(tree_id,anchor_person_id,name,description,generation_up,generation_down,created_by)
SELECT DISTINCT o.tree_id,o.anchor_person_id,
  'Cabang Keluarga ' || TRIM(COALESCE(a.first_name,'') || ' ' || COALESCE(a.last_name,'')),
  'Migrasi dari Silsilah Opsional V5.',2,2,t.created_by
FROM optional_lineages o
JOIN family_trees t ON t.id=o.tree_id
JOIN persons a ON a.id=o.anchor_person_id;

INSERT OR IGNORE INTO branch_members(branch_id,person_id,source_type,context_role,sibling_order)
SELECT fb.id,o.anchor_person_id,'linked','anchor',0
FROM optional_lineages o JOIN family_branches fb
 ON fb.tree_id=o.tree_id AND fb.anchor_person_id=o.anchor_person_id;

INSERT OR IGNORE INTO branch_members(branch_id,person_id,source_type,context_role,sibling_order)
SELECT fb.id,o.linked_person_id,'linked',LOWER(COALESCE(o.relation_label,'keluarga')),COALESCE(o.sibling_order,0)
FROM optional_lineages o JOIN family_branches fb
 ON fb.tree_id=o.tree_id AND fb.anchor_person_id=o.anchor_person_id;

INSERT OR IGNORE INTO branch_relationships(branch_id,from_person_id,to_person_id,type,relation_label,sibling_order)
SELECT fb.id,
  CASE WHEN LOWER(o.relation_label) IN ('ayah','ibu','kakek','nenek') THEN o.linked_person_id ELSE o.anchor_person_id END,
  CASE WHEN LOWER(o.relation_label) IN ('ayah','ibu','kakek','nenek') THEN o.anchor_person_id ELSE o.linked_person_id END,
  CASE WHEN LOWER(o.relation_label) IN ('suami','istri') THEN 'spouse'
       WHEN LOWER(o.relation_label)='saudara' THEN 'sibling'
       ELSE 'parent' END,
  COALESCE(o.relation_label,'Keluarga'),COALESCE(o.sibling_order,0)
FROM optional_lineages o JOIN family_branches fb
 ON fb.tree_id=o.tree_id AND fb.anchor_person_id=o.anchor_person_id;

-- Existing V5 persons remain members of the main tree. New V6 branch-only
-- persons are created with main_visible=0 by the V6 API.
