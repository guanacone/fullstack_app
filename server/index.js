const express = require('express');
const gatsby = require('gatsby-plugin-nodejs');
const mongoose = require('mongoose');
const cors = require('cors');
const userController = require('./controllers/userController');

const app = express();

const mongoDB = 'mongodb+srv://mogador:basket@cluster0.twty6.mongodb.net/fullstack_app?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());

gatsby.prepare({ app }, () => {
  app.get('/api/user', userController.userList);
  app.get('/api/user/:id', userController.userDetail);
  app.post('/api/user', userController.createUser);
});

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`listening on port ${port}`));
