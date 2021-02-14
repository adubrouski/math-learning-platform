import React from 'react';

import './Banner.sass';

const Banner = ({ img, title }) => {
  return (
    <div className="banner">
      <img src={img} alt="" />
      <h3>{title}</h3>
    </div>
  );
};

export default Banner;
