import React from 'react';

import { useHistory } from 'react-router-dom';

import LoginWindow from './LoginWindow';
import RegisterWindow from './RegisterWindow';

const Auth = () => {
  const history = useHistory();

  const toHome = () => {
    history.push('/home');
  };

  return (
    <div className="auth">
      {history.location.pathname === '/login' ? (
        <LoginWindow
          title="Войдите в систему"
          switchText="Ещё не зарегистрированы? Зарегистрироваться"
          toHome={toHome}
        />
      ) : null}
      {history.location.pathname === '/register' ? (
        <RegisterWindow
          title="Зарегистрируйтесь"
          switchText="Уже зарегистрированы? Войти"
          toHome={toHome}
        />
      ) : null}
    </div>
  );
};

export default Auth;
