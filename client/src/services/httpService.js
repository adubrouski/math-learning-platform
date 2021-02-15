import axios from 'axios';

axios.defaults.baseURL = 'https://stormy-stream-22494.herokuapp.com/api';
axios.defaults.withCredentials = true;
/* https://stormy-stream-22494.herokuapp.com */
const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
