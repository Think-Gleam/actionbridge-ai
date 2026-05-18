import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { processInput } from './services/orchestrator.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// JSON Syntax Error Handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON Syntax Error:', err.message);
    return res.status(400).json({ error: 'Malformed JSON payload' });
  }
  next();
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Main Pipeline Endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const inputPayload = req.body.rawData || req.body.content;
    
    if (!inputPayload) {
      return res.status(400).json({ success: false, error: 'content or rawData is required' });
    }
    
    const results = await processInput(inputPayload);
    res.json(results);
    
  } catch (error) {
    console.error('Pipeline Error:', error);
    res.status(500).json({ error: 'Failed to process pipeline.' });
  }
});

app.listen(PORT, () => {
  console.log(`ActionBridge AI Backend listening on port ${PORT}`);
});
