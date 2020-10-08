import Axios from 'axios';
import { navigate } from 'gatsby';
import url from './url';

const submitToAPI = async (method, endpoint, data) => {
  const response = await Axios({
    method,
    url: `${url}/${endpoint}`,
    data,
  });
  const id = response.data._id;
  navigate(`/user/${id}`);
};

export default submitToAPI;
