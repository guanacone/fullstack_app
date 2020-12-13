const { NODE_ENV } = process.env;
const url = NODE_ENV === 'production' ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/api` : 'http://localhost:1337/api';
export default url;
