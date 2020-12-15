exports.getFrontEndURL = () => {
  const url = process.env.NODE_ENV === 'production' ? 'https://gentle-ravine-79398.herokuapp.com' : 'http://localhost:8000';
  return url;
};