import React from 'react';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Auth.sass';

import LoginWindow from './LoginWindow';
import RegisterWindow from './RegisterWindow';

const Auth = () => {
  const history = useHistory();
  const { isLoading } = useSelector(({ user }) => user);

  const toHome = () => {
    history.push('/home');
  };

  const keyDownHandler = (e) => {
    if (e.key === 'Escape') {
      toHome();
      document.removeEventListener('keydown', keyDownHandler);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
  }, []);

  return (
    <div className="auth">
      {history.location.pathname === '/login' ? (
        <LoginWindow
          title="Войдите в систему"
          switchText="Ещё не зарегистрированы? Зарегистрироваться"
          toHome={toHome}
          isLoading={isLoading}
        />
      ) : null}
      {history.location.pathname === '/register' ? (
        <RegisterWindow
          title="Зарегистрируйтесь"
          switchText="Уже зарегистрированы? Войти"
          toHome={toHome}
          isLoading={isLoading}
        />
      ) : null}
    </div>
  );
};

export default Auth;
