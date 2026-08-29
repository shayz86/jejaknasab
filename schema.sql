PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('owner','member')) DEFAULT 'member',
  status TEXT NOT NULL CHECK(status IN ('active','pending','suspended')) DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS family_trees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_by INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  auto_name INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY(created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS persons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tree_id INTEGER NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT DEFAULT '',
  gender TEXT CHECK(gender IN ('male','female','other')) DEFAULT 'other',
  birth_date TEXT DEFAULT '',
  death_date TEXT DEFAULT '',
  birth_place TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  photo_url TEXT DEFAULT '',
  sibling_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(tree_id) REFERENCES family_trees(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS relationships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tree_id INTEGER NOT NULL,
  from_person_id INTEGER NOT NULL,
  to_person_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('parent','spouse')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tree_id, from_person_id, to_person_id, type),
  FOREIGN KEY(tree_id) REFERENCES family_trees(id) ON DELETE CASCADE,
  FOREIGN KEY(from_person_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY(to_person_id) REFERENCES persons(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payment_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('pending','paid','rejected')) DEFAULT 'pending',
  note TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TEXT DEFAULT '',
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_plans (
  user_id INTEGER PRIMARY KEY,
  plan TEXT NOT NULL CHECK(plan IN ('premium','ultimate')) DEFAULT 'premium',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS person_privacy (
  person_id INTEGER PRIMARY KEY,
  show_name INTEGER NOT NULL DEFAULT 1,
  show_age INTEGER NOT NULL DEFAULT 1,
  show_birth_date INTEGER NOT NULL DEFAULT 0,
  show_birth_place INTEGER NOT NULL DEFAULT 0,
  show_photo INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(person_id) REFERENCES persons(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tree_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tree_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  person_id INTEGER NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('member')) DEFAULT 'member',
  status TEXT NOT NULL CHECK(status IN ('invited','active','rejected','left')) DEFAULT 'invited',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tree_id,user_id),
  UNIQUE(tree_id,person_id),
  FOREIGN KEY(tree_id) REFERENCES family_trees(id) ON DELETE CASCADE,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(person_id) REFERENCES persons(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS invitations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tree_id INTEGER NOT NULL,
  person_id INTEGER NOT NULL,
  invited_email TEXT NOT NULL DEFAULT '',
  invited_phone TEXT DEFAULT '',
  invited_by INTEGER NOT NULL,
  requester_id INTEGER,
  token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK(status IN ('pending','accepted','rejected','expired')) DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  responded_at TEXT DEFAULT '',
  requested_at TEXT DEFAULT '',
  FOREIGN KEY(tree_id) REFERENCES family_trees(id) ON DELETE CASCADE,
  FOREIGN KEY(person_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY(invited_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS claim_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tree_id INTEGER NOT NULL,
  person_id INTEGER NOT NULL,
  requester_id INTEGER NOT NULL,
  note TEXT DEFAULT '',
  status TEXT NOT NULL CHECK(status IN ('pending','approved','rejected')) DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TEXT DEFAULT '',
  FOREIGN KEY(tree_id) REFERENCES family_trees(id) ON DELETE CASCADE,
  FOREIGN KEY(person_id) REFERENCES persons(id) ON DELETE CASCADE,
  FOREIGN KEY(requester_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS share_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tree_id INTEGER NOT NULL UNIQUE,
  token TEXT NOT NULL UNIQUE,
  is_public INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(tree_id) REFERENCES family_trees(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tree_id INTEGER NOT NULL,
  actor_user_id INTEGER NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id INTEGER,
  details TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(tree_id) REFERENCES family_trees(id) ON DELETE CASCADE,
  FOREIGN KEY(actor_user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_persons_tree ON persons(tree_id);
CREATE INDEX IF NOT EXISTS idx_relationships_tree ON relationships(tree_id);
CREATE INDEX IF NOT EXISTS idx_payment_status ON payment_requests(status);
CREATE INDEX IF NOT EXISTS idx_tree_members_tree ON tree_members(tree_id,status);
CREATE INDEX IF NOT EXISTS idx_claim_tree ON claim_requests(tree_id,status);
CREATE INDEX IF NOT EXISTS idx_invite_token ON invitations(token,status);
CREATE INDEX IF NOT EXISTS idx_audit_tree ON audit_logs(tree_id,created_at);

-- Backfill safe defaults for existing users/persons when this schema is applied to a new DB.
INSERT OR IGNORE INTO user_plans(user_id,plan) SELECT id,'premium' FROM users WHERE role='member';
INSERT OR IGNORE INTO person_privacy(person_id) SELECT id FROM persons;
