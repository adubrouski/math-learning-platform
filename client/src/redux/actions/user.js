const login = (user) => ({
  type: 'LOGIN_USER',
  user,
});

const setLoading = (status) => ({
  type: 'SET_LOADING',
  status,
});

const logout = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

export { login, logout, setLoading };
