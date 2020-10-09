import Axios from 'axios';
import url from './url';

const submitToAPI = async (method, endpoint, data) => {
  const response = await Axios({
    method,
    url: `${url}/${endpoint}`,
    data,
  });

  return response;
};

export default submitToAPI;
