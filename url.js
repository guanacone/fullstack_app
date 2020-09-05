const { NODE_ENV } = process.env;
const url = NODE_ENV === 'production' ? 'https://gentle-ravine-79398.herokuapp.com/api' : 'http://localhost:1337/api/user';

export default url;
