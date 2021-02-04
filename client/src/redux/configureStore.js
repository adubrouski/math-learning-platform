import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers';

const configureStore = (history, initState = {}) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [routerMiddleware(history), thunk];

  return createStore(
    createRootReducer(history),
    initState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
};

export default configureStore;
