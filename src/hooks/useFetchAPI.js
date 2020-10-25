import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../services/auth';

const useFetchAPI = ({ endpoint }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const user = getUser();
        const result = await axios({
          url: endpoint,
          headers: { Authorization: `Bearer ${user.token}` },
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
