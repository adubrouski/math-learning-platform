import { postLogin, postRegister, getUser, deleteCookies } from '../../api/index';
import { login, logout } from '../actions/user';

import { toast } from 'react-toastify';

const attemptLogin = (candidate, redirect) => async (dispatch) => {
  try {
    const { data } = await postLogin(candidate);

    dispatch(login(data.userData));

    toast.success(data.message);
    localStorage.setItem('token', data.token);

    redirect();
  } catch ({ response }) {
    toast.error(response.data.message);
  }
};

const attemptRegister = (candidate, redirect) => async () => {
  try {
    const { data } = await postRegister(candidate);

    toast.success(data.message);

    redirect();
  } catch ({ response }) {
    toast.error(response.data.message);
  }
};

const auth = () => {
  return async (dispatch) => {
    try {
      const { data } = await getUser();

      dispatch(login(data.userData));

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userData.userId);
    } catch (e) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  };
};

const logoutUser = () => {
  return async (dispatch) => {
    try {
      const { data } = await deleteCookies();
      localStorage.removeItem('token');
      dispatch(logout());
      toast.success(data.message);
    } catch (e) {
      toast.error('Что-то пошло не так...');
    }
  };
};

export { attemptLogin, attemptRegister, auth, logoutUser };
