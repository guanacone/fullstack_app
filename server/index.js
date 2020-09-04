const express = require('express');
const gatsby = require('gatsby-plugin-nodejs');
const cors = require('cors');

const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://mogador:basket@cluster0.twty6.mongodb.net/fullstack_app?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());

gatsby.prepare({ app }, () => {
  app.get('/api', (req, res) => {
    res.json({ msg: 'Fetching from API...' });
  });
});

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`listening on port ${port}`));
