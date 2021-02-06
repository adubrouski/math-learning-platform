import { postLogin, postRegister, getUser } from '../../api/index';
import { login } from '../actions/user';

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
    } catch (e) {
      localStorage.removeItem('token');
    }
  };
};

export { attemptLogin, attemptRegister, auth };
