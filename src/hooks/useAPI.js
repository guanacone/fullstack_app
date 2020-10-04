import { useState, useEffect } from 'react';
import axios from 'axios';

const useAPI = ({ method, url, data }) => {
  const [content, setcontent] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await axios({
        method,
        url,
        data,
      });
      setcontent(result.data);
    })();
  }, []);

  return content;
};

export default useAPI;
