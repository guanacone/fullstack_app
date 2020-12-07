import Axios from 'axios';
import { navigate } from 'gatsby';
import { getUser } from '../services/auth';

const handleSubmit = async ({ evt, method, endpoint, data, destination }) => {
  evt.preventDefault();
  try {
    const user = getUser();
    await Axios({
      method,
      url: endpoint,
      data,
      headers: { Authorization: `Bearer ${user.token}` },
    });
    navigate(destination);
  } catch (err) {
    const { response } = err;
    alert(response.data.message);
  }
};

export default handleSubmit;
