import Axios from 'axios';
import url from '../utils/url';

export const isBrowser = () => typeof window !== 'undefined';

export const getUser = () => (isBrowser() && window.localStorage.getItem('gatsbyUser') ? JSON.parse(window.localStorage.getItem('gatsbyUser')) : {});

const setUser = (token) => window.localStorage.setItem('gatsbyUser', JSON.stringify(token));

export const handleLogin = async ({ email, password }) => {
  try {
    const { data } = await Axios({
      method: 'post',
      url: `${url}/user/login`,
      data: { email, password } });
    setUser({ token: data.token });
  } catch (err) {
    console.log(err);
  }
};

export const isLoggedIn = () => {
  const user = getUser();

  return !!user.token;
};

export const logout = () => {
  setUser({});
};
