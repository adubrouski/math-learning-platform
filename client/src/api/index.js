import http from '../services/httpService';

const postLogin = (candidate) => http.post('/auth/login', candidate);
const postRegister = (candidate) => http.post('/auth/register', candidate);
const deleteCookies = () => http.delete('/auth/logout');
const getUser = () =>
  http.get('/auth', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });

export { postLogin, postRegister, getUser, deleteCookies };
