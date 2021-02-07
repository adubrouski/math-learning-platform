import React from 'react';

import { Testing } from '../../components';

const Tests = () => {
  return (
    <div className="exams">
      <h3 className="exams__title">Пройдите тест</h3>
      <div className="exams__content">
        {/* <ul className="exams__list">
          <li className="exams__list-item exams__tick">test thrth rh rthgf rth rth rthrt hrth</li>
          <li className="exams__list-item exams__cross">test thrth rh rthgf rth rth rthrt hrth</li>
          <li className="exams__list-item">test thrth rh rthgf rth rth rthrt hrth</li>
          <li className="exams__list-item">test thrth rh rthgf rth rth rthrt hrth</li>
          <li className="exams__list-item">test thrth rh rthgf rth rth rthrt hrth</li>
          <li className="exams__list-item">test thrth rh rthgf rth rth rthrt hrth</li>
        </ul> */}
        <Testing />
      </div>
    </div>
  );
};

export default Tests;
