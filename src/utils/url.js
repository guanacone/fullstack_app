export const isBrowser = () => typeof window !== 'undefined';

const { NODE_ENV } = process.env;

const url = (NODE_ENV === 'production') && isBrowser() ? '/api' : 'http://localhost:1337/api';
export default url;
