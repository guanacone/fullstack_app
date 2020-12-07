import Axios from 'axios';
import { getUser } from '../services/auth';

const handleSubmit = async ({ evt, method, endpoint, data }) => {
  evt.preventDefault();
  try {
    const user = getUser();
    await Axios({
      method,
      url: endpoint,
      data,
      headers: { Authorization: `Bearer ${user.token}` } });
  } catch (err) {
    const { response } = err;
    alert(response.data.message);
  }
};

export default handleSubmit;
