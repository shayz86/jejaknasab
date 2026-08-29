PRAGMA foreign_keys = ON;

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
  UNIQUE(tree_id,user_id), UNIQUE(tree_id,person_id),
  FOREIGN KEY(tree_id) REFERENCES family_trees(id) ON DELETE CASCADE,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(person_id) REFERENCES persons(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS invitations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tree_id INTEGER NOT NULL,
  person_id INTEGER NOT NULL,
  invited_email TEXT NOT NULL,
  invited_by INTEGER NOT NULL,
  token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK(status IN ('pending','accepted','rejected','expired')) DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  responded_at TEXT DEFAULT '',
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
CREATE INDEX IF NOT EXISTS idx_tree_members_tree ON tree_members(tree_id,status);
CREATE INDEX IF NOT EXISTS idx_claim_tree ON claim_requests(tree_id,status);
CREATE INDEX IF NOT EXISTS idx_invite_token ON invitations(token,status);
CREATE INDEX IF NOT EXISTS idx_audit_tree ON audit_logs(tree_id,created_at);
INSERT OR IGNORE INTO user_plans(user_id,plan) SELECT id,'premium' FROM users WHERE role='member';
INSERT OR IGNORE INTO person_privacy(person_id) SELECT id FROM persons;
