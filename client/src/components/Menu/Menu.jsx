import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../Auth/Auth';
import PopUpMenu from './PopUpMenu';

import {
  logoIcon,
  manIcon,
  teacherIcon,
  homeIcon,
  bookIcon,
  clipboardIcon,
} from '../../assets/img';

const Menu = () => {
  const [isPopUpVisible, setPopUpVisible] = React.useState(false);
  const [isAuthVisible, setAuthVisible] = React.useState(false);

  const authClickHandler = () => {
    setAuthVisible(true);
  };

  const iconsClickHandler = () => {
    setPopUpVisible(!isPopUpVisible);
  };

  React.useEffect(() => {
    const foo = (e) => {
      const classes = e.target.classList;
      if (
        !classes.contains('left-menu__icon') &&
        !classes.contains('man-icon') &&
        !classes.contains('popup__menu-auth')
      ) {
        setPopUpVisible(false);
      }
      if (classes.contains('auth') || classes.contains('auth__cross')) {
        setAuthVisible(false);
        document.removeEventListener('click', foo);
      }
    };
    document.addEventListener('click', foo);
  });

  return (
    <>
      {isAuthVisible ? <Auth setAuthVisible={setAuthVisible} /> : null}
      <div className="menu">
        <>
          <Link to="/">
            <div className="menu__logo">
              <img src={logoIcon} alt="logo" />
            </div>
          </Link>
          <div className="menu__icon" onClick={iconsClickHandler}>
            <img src={manIcon} className="man-icon" alt="logo" />
          </div>
          <Link to="/">
            <div className="menu__icon">
              <img src={homeIcon} alt="icon" />
            </div>
          </Link>
          <Link to="/classroom">
            <div className="menu__icon">
              <img src={teacherIcon} alt="icon" />
            </div>
          </Link>
          <Link to="/theory">
            <div className="menu__icon">
              <img src={bookIcon} alt="icon" />
            </div>
          </Link>
          <Link to="/tests">
            <div className="menu__icon">
              <img src={clipboardIcon} alt="icon" />
            </div>
          </Link>
        </>
        {isPopUpVisible ? <PopUpMenu authClickHandler={authClickHandler} /> : null}
      </div>
    </>
  );
};

export default Menu;
