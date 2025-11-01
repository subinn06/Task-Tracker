const express = require('express');
const cors = require('cors');
const tasksRouter = require('./src/routes/tasks.router');
const insightService = require('./src/services/insight.service');

require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/tasks', tasksRouter);

app.get('/insights', (req, res) => {
  try {
    const aggs = insightService.getAggregations();
    const summary = insightService.generateInsightString(aggs);
    res.json({ aggregations: aggs, summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

app.listen(3000, () => console.log(`Server running on port 3000`));
