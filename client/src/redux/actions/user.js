const login = (user) => ({
  type: 'LOGIN_USER',
  user,
});

const logout = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

export { login, logout };
