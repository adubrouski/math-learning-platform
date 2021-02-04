import React from 'react';
import { Link } from 'react-router-dom';

const DropMenu = () => {
  return (
    <div className="drop-menu">
      <ul className="drop-menu__wrapper">
        <li className="drop-menu__item">
          <Link to="classrooms?class=2">2 класс</Link>
        </li>
        <li className="drop-menu__item">
          <Link to="classrooms?class=3">3 класс</Link>
        </li>
        <li className="drop-menu__item">
          <Link to="classrooms?class=4">4 класс</Link>
        </li>
        <li className="drop-menu__item">
          <Link to="classrooms?class=5">5 класс</Link>
        </li>
        <li className="drop-menu__item">
          <Link to="classrooms?class=6">6 класс</Link>
        </li>
        <li className="drop-menu__item">
          <Link to="classrooms?class=7">7 класс</Link>
        </li>
      </ul>
    </div>
  );
};

export default DropMenu;
