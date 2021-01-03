import Axios from 'axios';

const handleSubmit = async ({ method, endpoint, data, token }) => {
  await Axios({
    method,
    url: endpoint,
    data,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default handleSubmit;
