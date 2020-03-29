const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(process.cwd(), 'build')));
app.get('*', (_, res) => {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
});


module.exports = app;