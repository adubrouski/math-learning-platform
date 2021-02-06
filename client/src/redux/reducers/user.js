const initState = {
  isAuth: false,
  user: null,
};

const user = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        user: action.user,
        isAuth: true,
      };
    case 'LOGOUT_USER':
      return {
        isAuth: false,
        user: null,
      };
    default:
      return state;
  }
};

export default user;
