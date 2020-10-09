import { navigate } from 'gatsby';
import submitToAPI from './submitToAPI';

const handleSubmit = async ({ evt, method, endpoint, data }) => {
  evt.preventDefault();
  try {
    const response = await submitToAPI(method, endpoint, data);
    navigate(`/user/${response.data._id}`);
  } catch (err) {
    console.log(err);
  }
};

export default handleSubmit;
