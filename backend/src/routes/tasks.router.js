const express = require('express');
const router = express.Router();
const taskService = require('../services/task.service');

router.post('/', (req, res) => {
  try {
    const { title, description, priority, due_date } = req.body;
    if (!title || !due_date) {
      return res.status(400).json({ error: 'title and due_date are required' });
    }
    const created = taskService.createTask({ title, description, priority, due_date });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

router.get('/', (req, res) => {
  try {
    const { status, priority, sort } = req.query;
    const tasks = taskService.getTasks({ status, priority, sortByDue: sort });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.patch('/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid id' });
    const { status, priority } = req.body;
    const updated = taskService.updateTaskStatusOrPriority(id, { status, priority });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

module.exports = router;
