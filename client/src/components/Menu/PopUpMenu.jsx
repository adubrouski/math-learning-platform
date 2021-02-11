import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/thunks/auth';

import DropMenu from './DropMenu';

const PopUpMenu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuth, userInfo } = useSelector(({ user }) => user);

  const toLogin = () => history.push('/login');

  const logoutHandler = () => {
    dispatch(logoutUser());
    history.push('/home');
  };
  return (
    <>
      <div className="popup-menu">
        <h5 className="popup-menu__title">Онлайн-школа программирования</h5>
        {!isAuth ? (
          <p className="popup-menu__signin" onClick={toLogin}>
            Войти или зарегистрироваться
          </p>
        ) : (
          <div className="popup-menu__authorized">
            <p className="popup-menu__authorized-auth">Добро пожаловать, {userInfo.username}</p>
            <p className="popup-menu__authorized-logout" onClick={logoutHandler}>
              Выйти из аккаунта
            </p>
          </div>
        )}

        <ul className="popup-menu__nav">
          <li className="popup-menu__nav-item">
            <Link to="home">Главная</Link>
          </li>
          <li className="popup-menu__nav-item drop">
            <Link to="classrooms">Учебные классы</Link>
            <DropMenu />
          </li>
          <li className="popup-menu__nav-item">
            <Link to="topics">Материалы</Link>
          </li>
          <li className="popup-menu__nav-item">
            <Link to="exams">Тесты</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PopUpMenu;
