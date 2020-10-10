import Axios from 'axios';
import { navigate } from 'gatsby';

const handleSubmit = async ({ evt, method, endpoint, data }) => {
  evt.preventDefault();
  try {
    const response = await Axios({ method, url: endpoint, data });
    navigate(`/user/${response.data._id}`);
  } catch (err) {
    console.log(err);
  }
};

export default handleSubmit;
