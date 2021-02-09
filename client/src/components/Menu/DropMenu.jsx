import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setGrade } from '../../redux/actions/classrooms';

const DropMenu = () => {
  const dispatch = useDispatch();
  return (
    <div className="drop-menu">
      <ul className="drop-menu__wrapper">
        <li className="drop-menu__item">
          <Link to="/classrooms/classroom?grade=2" onClick={() => dispatch(setGrade(2))}>
            2 класс
          </Link>
        </li>
        <li className="drop-menu__item">
          <Link to="/classrooms/classroom?grade=3" onClick={() => dispatch(setGrade(3))}>
            3 класс
          </Link>
        </li>
        <li className="drop-menu__item">
          <Link to="/classrooms/classroom?grade=4" onClick={() => dispatch(setGrade(4))}>
            4 класс
          </Link>
        </li>
        <li className="drop-menu__item">
          <Link to="/classrooms/classroom?grade=5" onClick={() => dispatch(setGrade(5))}>
            5 класс
          </Link>
        </li>
        <li className="drop-menu__item">
          <Link to="/classrooms/classroom?grade=6" onClick={() => dispatch(setGrade(6))}>
            6 класс
          </Link>
        </li>
        <li className="drop-menu__item">
          <Link to="/classrooms/classroom?grade=7" onClick={() => dispatch(setGrade(7))}>
            7 класс
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DropMenu;
