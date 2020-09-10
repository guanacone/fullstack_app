const { NODE_ENV } = process.env;
const url = NODE_ENV === 'production' ? { url: 'https://gentle-ravine-79398.herokuapp.com/api' } : { url: 'http://localhost:1337/api' };

export default url;
