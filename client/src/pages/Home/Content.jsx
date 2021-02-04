import React from 'react';

import { bannerIcon1, bannerIcon2, bannerIcon3 } from '../../assets/img';

const Content = () => {
  return (
    <div className="home__content">
      <div className="content-banner">
        <img className="content-img-1" src={bannerIcon1} alt="" />
        <h3>Решай</h3>
      </div>
      <div className="content-items">
        <div className="content-card"></div>
        <div className="content-card"></div>
        <div className="content-card"></div>
      </div>
      <div className="content-banner">
        <img className="content-img-2" src={bannerIcon2} alt="" />
        <h3>Размышляй</h3>
      </div>
      <div className="content-items">
        <div className="content-card"></div>
        <div className="content-card"></div>
        <div className="content-card"></div>
      </div>
      <div className="content-banner">
        <img className="content-img-3" src={bannerIcon3} alt="" />
        <h3>Развивайся</h3>
      </div>
      <div className="content-items">
        <div className="content-card"></div>
        <div className="content-card"></div>
        <div className="content-card"></div>
      </div>
    </div>
  );
};

export default Content;
