import React from 'react';

function safe(s) {
  if (!s) return '';
  return String(s);
}

export default function TaskList({ tasks = [], onSetInProgress, onSetDone }) {
  if (!tasks.length) return <div className="small">No tasks yet.</div>;

  return (
    <table className="table" role="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Due</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(t => (
          <tr key={t.id}>
            <td>{safe(t.title)}</td>
            <td>{safe(t.due_date)}</td>
            <td>{safe(t.priority)}</td>
            <td>{safe(t.status)}</td>
            <td className="actions">
              <button onClick={() => onSetInProgress(t.id)} disabled={t.status === 'In Progress' || t.status === 'Done'}>Set In Progress</button>
              <button onClick={() => onSetDone(t.id)} disabled={t.status === 'Done'}>Set Done</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
