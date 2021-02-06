import React from 'react';
import Content from './Content';
import Auth from '../../components/Auth/Auth';
import { useHistory } from 'react-router-dom';
const Home = () => {
  const history = useHistory();
  return (
    <div className="home">
      {history.location.pathname === '/login' || history.location.pathname === '/register' ? (
        <Auth />
      ) : null}
      <Content />
    </div>
  );
};

export default Home;
