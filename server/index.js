const express = require('express');
const gatsby = require('gatsby-plugin-nodejs');
const cors = require('cors');
const userController = require('./controllers/userController');

const app = express();

app.use(cors());

gatsby.prepare({ app }, () => {
  app.get('/api', (req, res) => {res.json({ msg: 'Fetching from API...' });
  });
  app.get('/api/user', userController.userList);
  app.get('/api/user/:id', userController.userDetail);
});

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`listening on port ${port}`));
