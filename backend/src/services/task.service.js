const db = require('../../db');

function createTask({ title, description, priority, due_date }) {
  const stmt = db.prepare(`
    INSERT INTO tasks (title, description, priority, due_date)
    VALUES (?, ?, ?, ?)
  `);
  const info = stmt.run(title, description || '', priority || 'Medium', due_date);
  return getTaskById(info.lastInsertRowid);
}

function getTaskById(id) {
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
}

function getTasks({ status, priority, sortByDue }) {
  let sql = 'SELECT * FROM tasks';
  const conditions = [];
  const params = [];
  if (status) {
    conditions.push('status = ?');
    params.push(status);
  }
  if (priority) {
    conditions.push('priority = ?');
    params.push(priority);
  }
  if (conditions.length) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
  if (sortByDue === 'asc') sql += ' ORDER BY due_date ASC';
  else if (sortByDue === 'desc') sql += ' ORDER BY due_date DESC';
  return db.prepare(sql).all(...params);
}

function updateTaskStatusOrPriority(id, { status, priority }) {
  const updates = [];
  const params = [];
  if (status) {
    updates.push('status = ?');
    params.push(status);
  }
  if (priority) {
    updates.push('priority = ?');
    params.push(priority);
  }
  if (updates.length === 0) return getTaskById(id);
  params.push(id);
  const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;
  db.prepare(sql).run(...params);
  return getTaskById(id);
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTaskStatusOrPriority
};
