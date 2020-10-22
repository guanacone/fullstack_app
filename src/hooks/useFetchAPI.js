import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchAPI = ({ endpoint }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const authUser = await JSON.parse(window.localStorage.getItem('gatsbyUser'));
        const result = await axios({
          url: endpoint,
          headers: { Authorization: `Bearer ${authUser.token}` },
        });
        setData(result.data);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);
  return { data, error };
};

export default useFetchAPI;
