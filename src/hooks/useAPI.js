import { useState, useEffect } from 'react';
import axios from 'axios';

const useAPI = ({ url }) => {
  const [content, setcontent] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await axios.get(url);
      setcontent(result.data);
    })();
  }, []);

  return content;
};

export default useAPI;
