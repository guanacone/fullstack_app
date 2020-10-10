import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchAPI = ({ url }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(url);
        setData(result.data);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);
  return { data, error };
};

export default useFetchAPI;
