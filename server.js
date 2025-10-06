// safe server.js - accepts feedback messages only
console.log("server.js executing — PID:", process.pid);

console.log("server.js started (safe feedback server)");

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// simple health check so server prints something on request
app.get('/', (req, res) => {
  res.send('OK');
});

app.post('/feedback', (req, res) => {
  const msg = req.body.message || '(empty)';
  // write to a feedback log (safe example)
  fs.appendFile('feedback.log', msg + '\n', (err) => {
    if (err) console.error('Error writing to file:', err);
  });
  console.log('Received feedback:', msg); // <- helpful for debugging
  res.send('Thanks for your feedback!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Safe server running on port ${port}`);
});

