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

CREATE INDEX IF NOT EXISTS idx_persons_tree ON persons(tree_id);
CREATE INDEX IF NOT EXISTS idx_relationships_tree ON relationships(tree_id);
CREATE INDEX IF NOT EXISTS idx_payment_status ON payment_requests(status);
