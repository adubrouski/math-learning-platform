import React from 'react';

import LoginWindow from './LoginWindow';
import RegisterWindow from './RegisterWindow';

const Auth = ({ setAuthVisible }) => {
  const [isRegister, setRegister] = React.useState(false);

  return (
    <div className="auth">
      {isRegister ? (
        <RegisterWindow
          setAuthVisible={setAuthVisible}
          title="Зарегистрируйтесь"
          isRegister={isRegister}
          switchText="Уже зарегистрированы? Войти"
          setRegister={() => setRegister(false)}
        />
      ) : (
        <LoginWindow
          setAuthVisible={setAuthVisible}
          title="Войдите в систему"
          isRegister={isRegister}
          switchText="Ещё не зарегистрированы? Зарегистрироваться"
          setRegister={() => setRegister(true)}
        />
      )}
    </div>
  );
};

export default Auth;
