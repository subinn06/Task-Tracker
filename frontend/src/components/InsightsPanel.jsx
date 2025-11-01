import React from 'react';

export default function InsightsPanel({ summary, aggregations }) {
  if (!aggregations) return <div className="insights small">No data yet.</div>;
  return (
    <div>
      <div className="insights" aria-live="polite">{summary || 'No insights available'}</div>
      <div style={{ marginTop: 8 }} className="small">
        <div>Total open: {aggregations.totalOpen}</div>
        <div>Due soon: {aggregations.dueSoon}</div>
        <div>Priority distribution: {JSON.stringify(aggregations.priorityDistribution)}</div>
      </div>
    </div>
  );
}
