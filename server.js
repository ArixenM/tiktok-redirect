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

app.post('/logip', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // write to a log file
  fs.appendFile('ips.log', ip + '\n', (err) => {
    if (err) console.error('Error writing to file:', err);
  });
  console.log('Logged IP address:', ip); // <- helpful for debugging
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Safe server running on port ${port}`);
});
