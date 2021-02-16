import axios from 'axios';

axios.defaults.baseURL = 'https://api-mathplatform.herokuapp.com/api';
axios.defaults.withCredentials = true;

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
