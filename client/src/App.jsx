import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from './pages';
import { auth } from './redux/thunks/auth';
import { useRoutes } from './hooks/routes';

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(({ user }) => user);
  const routes = useRoutes(isAuth);

  React.useEffect(() => {
    dispatch(auth());
  }, [isAuth]);

  return <Layout>{routes}</Layout>;
};

export default App;
