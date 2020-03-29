const express = require('express');
const path = require('path');

const UserRouter = require('./routes/user');

const app = express();

app.use(express.static(path.join(process.cwd(), 'build')));
app.use(express.json({
  limit: '10mb',
}));

app.use('/user', UserRouter);

app.get('*', (_, res) => {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
});


module.exports = app;