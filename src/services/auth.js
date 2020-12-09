import Axios from 'axios';
import { navigate } from 'gatsby';
import get from 'lodash.get';
import url from '../utils/url';

export const isBrowser = () => typeof window !== 'undefined';

export const getUser = () => {
  const user = isBrowser() && window.localStorage.getItem('gatsbyUser');
  return user ? JSON.parse(user) : {};
};

const setUser = (tokens) => window.localStorage.setItem('gatsbyUser', JSON.stringify(tokens));

export const handleLogin = async ({ email, password }) => {
  try {
    const { data } = await Axios({
      method: 'post',
      url: `${url}/user/login`,
      data: { email, password },
    });
    setUser({
      token: data.accessToken,
      refreshToken: data.refreshToken,
    });
    navigate('/user');
  } catch (err) {
    const axiosMsg = get(err, ['response', 'data', 'message']);
    console.error(err, axiosMsg);
    if (axiosMsg === 'Unactivated account') return navigate('/activateAccount');
    return alert('Invalid email/password combination');
  }
};

export const handleRefreshToken = async () => {
  try {
    const user = getUser();
    const { data } = await Axios({
      method: 'post',
      url: `${url}/user/refresh`,
      headers: { Authorization: `Bearer ${user.refreshToken}` } });
    setUser({
      token: data.accessToken,
      refreshToken: user.refreshToken,
    });
  } catch (err) {
    console.log(err);
  }
};

export const isLoggedIn = () => {
  const user = getUser();

  return !!user.token;
};

export const logout = async () => {
  try {
    const user = getUser();
    await Axios({
      method: 'post',
      url: `${url}/user/logout`,
      headers: { Authorization: `Bearer ${user.refreshToken}` } });
    setUser({});
  } catch (err) {
    console.log(err);
  }
};
