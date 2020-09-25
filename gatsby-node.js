const axios = require('axios');

const { NODE_ENV } = process.env;
const url = NODE_ENV === 'production' ? 'https://gentle-ravine-79398.herokuapp.com' : 'http://localhost:1337';

exports.createPages = async ({ actions: { createPage } }) => {
  const response = await axios.get(`${url}/api/user`);
  const users = response.data;
  createPage({
    path: '/user/',
    component: require.resolve('./src/templates/all-users.js'),
    context: { users },
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = '/app/*';

    // Update the page.
    createPage(page);
  }
};
