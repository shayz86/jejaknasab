CREATE TABLE IF NOT EXISTS persons (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  full_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  birth_date TEXT,
  death_date TEXT,
  living_status TEXT NOT NULL,
  photo_url TEXT,
  created_at TEXT,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id)
);