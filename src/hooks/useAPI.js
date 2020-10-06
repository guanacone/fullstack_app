import { useState, useEffect } from 'react';
import axios from 'axios';

const useAPI = ({ url }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(url);
        setContent(result.data);
      } catch (err) {
        setContent(err);
      }
    })();
  }, []);
  return { content };
};

export default useAPI;
