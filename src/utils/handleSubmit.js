import Axios from 'axios';
import { navigate } from 'gatsby';
import { getUser } from '../services/auth';

const handleSubmit = async ({ evt, method, endpoint, data }) => {
  evt.preventDefault();
  try {
    const user = getUser();
    const response = await Axios({
      method,
      url: endpoint,
      data,
      headers: { Authorization: `Bearer ${user.token}` } });
    navigate(`/user/${response.data._id}`);
  } catch (err) {
    const { response } = err;
    alert(response.data.message);
  }
};

export default handleSubmit;
