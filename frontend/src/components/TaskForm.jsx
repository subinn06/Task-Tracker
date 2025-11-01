import React, { useState } from 'react';

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!title.trim() || !dueDate) {
      alert('Please enter title and due date');
      return;
    }
    try {
      await onCreated({ title: title.trim(), description: description.trim(), priority, due_date: dueDate });
      setTitle(''); setDescription(''); setPriority('Medium'); setDueDate('');
    } catch (err) {
      console.error(err);
      alert('Failed to create task');
    }
  }

  return (
    <form onSubmit={submit}>
      <label className="small">Title</label>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <label className="small">Description</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <label className="small">Priority</label>
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <label className="small">Due date</label>
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
      <button type="submit">Create task</button>
    </form>
  );
}
