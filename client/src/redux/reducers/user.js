const initState = {
  isAuth: false,
  userInfo: null,
};

const user = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        userInfo: action.user,
        isAuth: true,
      };
    case 'LOGOUT_USER':
      return {
        isAuth: false,
        userInfo: null,
      };
    default:
      return state;
  }
};

export default user;
