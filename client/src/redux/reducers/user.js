const initState = {
  isLoading: true,
  isAuth: false,
  userInfo: null,
};

const user = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        userInfo: action.user,
        isAuth: true,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        isAuth: false,
        userInfo: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.status,
      };
    default:
      return state;
  }
};

export default user;
