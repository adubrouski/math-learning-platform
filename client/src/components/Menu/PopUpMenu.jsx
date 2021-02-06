import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import DropMenu from './DropMenu';

const PopUpMenu = () => {
  const history = useHistory();

  const toLogin = () => history.push('/login');

  return (
    <>
      <div className="popup-menu">
        <h5 className="popup-menu__title">Онлайн-школа программирования</h5>
        <p className="popup-menu__auth" onClick={toLogin}>
          Войти или зарегистрироваться
        </p>
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
