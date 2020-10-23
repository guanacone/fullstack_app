import Axios from 'axios';
import { navigate } from 'gatsby';

const handleSubmit = async ({ evt, method, endpoint, data }) => {
  evt.preventDefault();
  try {
    const userToken = JSON.parse(window.localStorage.getItem('gatsbyUser')) ? JSON.parse(window.localStorage.getItem('gatsbyUser')) : null;
    const response = await Axios({
      method,
      url: endpoint,
      data,
      headers: { Authorization: `Bearer ${userToken}` } });
    navigate(`/user/${response.data._id}`);
  } catch (err) {
    console.log(err);
  }
};

export default handleSubmit;
