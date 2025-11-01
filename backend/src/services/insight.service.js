const db = require('../../db');

function getAggregations() {
  const totalOpen = db.prepare("SELECT COUNT(*) AS c FROM tasks WHERE status = 'Open'").get().c;
  const byPriority = db.prepare("SELECT priority, COUNT(*) AS c FROM tasks GROUP BY priority").all();
  const dueSoon = db.prepare(`
    SELECT COUNT(*) AS c FROM tasks
    WHERE date(due_date) <= date('now', '+3 day') AND status != 'Done'
  `).get().c;

  const priorityDistribution = {};
  for (const row of byPriority) priorityDistribution[row.priority] = row.c;

  return { totalOpen, priorityDistribution, dueSoon };
}

function generateInsightString(aggs) {
  const { totalOpen, priorityDistribution, dueSoon } = aggs;
  let dominantPriority = 'Medium';
  let max = -1;
  for (const p of ['High', 'Medium', 'Low']) {
    const v = priorityDistribution[p] || 0;
    if (v > max) {
      max = v;
      dominantPriority = p;
    }
  }

  let insight = `You have ${totalOpen} open tasks.`;
  if (dueSoon > 0) {
    insight += ` ${dueSoon} of them are due within the next 3 days.`;
  }
  if (totalOpen > 3 && dominantPriority) {
    insight += ` Most of your open tasks are ${dominantPriority} priority.`;
  }
  return insight;
}

module.exports = {
  getAggregations,
  generateInsightString
};
