const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const mongoDB = 'mongodb+srv://mogador:basket@cluster0.twty6.mongodb.net/fullstack_app?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const user = require('./routes/user');
const createHttpError = require('http-errors');

const app = express();

app.use(cors());
app.use(express.json());

require('./auth');

app.use(express.static('public'));

app.get('/api', (req, res) => {
  res.json({ msg: 'Fetching data from API...' });
});
app.use('/api/user', user);
//eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);
  if(createHttpError.isHttpError(err)) {
    return res
      .status(err.status)
      .json({ message: err.message });
  }
  return res
    .status(500)
    .json({ message: 'Internal server error' });
});


const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`listening on port ${port}`));