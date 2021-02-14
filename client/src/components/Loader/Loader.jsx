import React from 'react';

import './Loader.sass';

import { loader } from '../../assets/img';

const Loader = () => {
  return <img className="loader" src={loader} alt="loader-svg" />;
};

export default Loader;
