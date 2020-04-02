const express = require('express');
var cors = require('cors');
const path = require('path');

const UserRouter = require('./routes/user');
const AuthRouter = require('./routes/auth');
const PriceRouter = require('./routes/price');

const app = express();
app.use(cors());

app.use(express.static(path.join(process.cwd(), 'build')));
app.use(express.json({
  limit: '10mb',
}));

app.use('/user', UserRouter);
app.use('/auth', AuthRouter);
app.use('/price', PriceRouter);

app.get('/', (_, res) => {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
});


module.exports = app;