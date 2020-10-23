import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchAPI = ({ endpoint }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const userToken = JSON.parse(window.localStorage.getItem('gatsbyUser')) ? JSON.parse(window.localStorage.getItem('gatsbyUser')) : null;
        const result = await axios({
          url: endpoint,
          headers: { Authorization: `Bearer ${userToken}` },
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
