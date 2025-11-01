import React, { useEffect, useState } from 'react';
import './index.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import InsightsPanel from './components/InsightsPanel';
import { postTask, getTasks, patchTask, getInsights } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [insights, setInsights] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', sort: '' });
  const [loading, setLoading] = useState(false);

  async function loadAll() {
    setLoading(true);
    try {
      const [t, i] = await Promise.all([
        getTasks(filters),
        getInsights()
      ]);
      setTasks(t);
      setInsights(i);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function applyFilters(newFilters) {
    setFilters(newFilters);
    try {
      const t = await getTasks(newFilters);
      setTasks(t);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreate(payload) {
    await postTask(payload);
    await loadAll();
  }

  async function setInProgress(id) {
    await patchTask(id, { status: 'In Progress' });
    await loadAll();
  }

  async function setDone(id) {
    await patchTask(id, { status: 'Done' });
    await loadAll();
  }

  return (
    <div className="container">
      <h1>Task Tracker</h1>

      <section>
        <h2>Create Task</h2>
        <TaskForm onCreated={handleCreate} />
      </section>

      <section>
        <h2>Filters</h2>
        <div className="controls">
          <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
            <option value="">All statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select value={filters.priority} onChange={e => setFilters(f => ({ ...f, priority: e.target.value }))}>
            <option value="">All priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select value={filters.sort} onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}>
            <option value="">Sort by due date</option>
            <option value="asc">Due soon first</option>
            <option value="desc">Due later first</option>
          </select>

          <button onClick={() => applyFilters(filters)}>Apply</button>
          <div className="small">{loading ? 'Loading...' : ''}</div>
        </div>
      </section>

      <section>
        <h2>Tasks</h2>
        <TaskList tasks={tasks} onSetInProgress={setInProgress} onSetDone={setDone} />
      </section>

      <section>
        <h2>Smart Insights</h2>
        <InsightsPanel summary={insights?.summary} aggregations={insights?.aggregations} />
      </section>
    </div>
  );
}

export default App;
