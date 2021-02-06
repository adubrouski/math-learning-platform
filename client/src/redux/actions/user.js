const login = (user) => ({
  type: 'LOGIN_USER',
  user,
});

const logout = () => {
  localStorage.removeItem('token');
  return {
    type: 'LOGOUT_USER',
  };
};

export { login, logout };
