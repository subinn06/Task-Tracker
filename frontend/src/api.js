const BASE = 'http://localhost:3000';

async function postTask(payload) {
  const r = await fetch(`${BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error('Failed to create task');
  return r.json();
}

async function getTasks(params = {}) {
  const url = new URL(`${BASE}/tasks`);
  Object.keys(params).forEach(k => { if (params[k]) url.searchParams.append(k, params[k]); });
  const r = await fetch(url.toString());
  if (!r.ok) throw new Error('Failed to fetch tasks');
  return r.json();
}

async function patchTask(id, payload) {
  const r = await fetch(`${BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!r.ok) throw new Error('Failed to update task');
  return r.json();
}

async function getInsights() {
  const r = await fetch(`${BASE}/insights`);
  if (!r.ok) throw new Error('Failed to fetch insights');
  return r.json();
}

export { postTask, getTasks, patchTask, getInsights };
