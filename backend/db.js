const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'task_tracker.db');
const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT NOT NULL CHECK (priority IN ('Low','Medium','High')) DEFAULT 'Medium',
    due_date TEXT NOT NULL, -- store as YYYY-MM-DD
    status TEXT NOT NULL CHECK (status IN ('Open','In Progress','Done')) DEFAULT 'Open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = db;
