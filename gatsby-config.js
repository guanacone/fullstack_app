/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/user/*'] },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-use-query-params',
  ],
};
