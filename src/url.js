const { NODE_ENV } = process.env;
const url = NODE_ENV === 'production' ? 'https://gentle-ravine-79398.herokuapp.com' : 'http://localhost:1337';

export default url;
