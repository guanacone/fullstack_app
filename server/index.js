const express = require('express');
const gatsby = require('gatsby-plugin-nodejs');
const mongoose = require('mongoose');
const cors = require('cors');

const mongoDB = 'mongodb+srv://mogador:basket@cluster0.twty6.mongodb.net/fullstack_app?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const user = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());

require('./auth');

gatsby.prepare({ app }, () => {
  app.get('/api', (req, res) => {
    res.json({ msg: 'Fetching data from API...' });
  });
  app.use('/api/user', user);
  //eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.log(err);
    return res
      .status(err.status || 500)
      .json({ message: 'Internal Server Error' });
  });
});

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`listening on port ${port}`));