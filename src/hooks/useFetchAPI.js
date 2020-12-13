import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchAPI = ({ endpoint, token }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // const user = getUser();
        const result = await axios({
          url: endpoint,
          headers: { Authorization: `Bearer ${token}` },
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
