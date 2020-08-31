const express = require('express');
const gatsby = require('gatsby-plugin-nodejs');
const cors = require('cors');

const app = express();

app.use(cors());

gatsby.prepare({ app }, () => {
  app.get('/api', (req, res) => {
    res.json({ msg: 'Fetching from API...' });
  });
});

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`listening on port ${port}`));
