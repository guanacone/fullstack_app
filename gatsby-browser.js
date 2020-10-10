import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import url from './src/utils/url';

const onInitialClientRender = () => {
  Axios.defaults.baseURL = url;
};

onInitialClientRender();
