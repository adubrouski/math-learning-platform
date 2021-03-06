import React from 'react';

import './Task.sass';

const Task = ({ children, title, img }) => {
  return (
    <div className="task">
      <div className="frontside" style={{ backgroundImage: `url(${img})` }}></div>
      <div className="backside">
        {title && <p className="backside__title">{title}</p>}
        <div className="backside__wrapper">{children}</div>
      </div>
    </div>
  );
};

export default Task;
