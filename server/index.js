
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

let requests = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../dist')));

app.post('/hook', (req, res) => {
  const entry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    headers: req.headers,
    body: req.body
  };
  requests.unshift(entry);
  res.status(200).send({ received: true });
});

app.get('/hook', (req, res) => {
  res.status(200).json(requests);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Webhook Viewer running on port ${PORT}`);
});
