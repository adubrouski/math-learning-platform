import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import user from './user';

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    user,
  });
};

export default createRootReducer;
