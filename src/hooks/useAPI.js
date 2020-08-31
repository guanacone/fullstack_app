import { useState, useEffect } from 'react';
import axios from 'axios';

const useAPI = ({ url, defaultData = null }) => {
  const [data, setdata] = useState(defaultData);

  useEffect(() => {
    (async () => {
      const result = await axios.get(url);
      setdata(result.data);
    })();
  }, [url]);

  return data;
};

export default useAPI;
