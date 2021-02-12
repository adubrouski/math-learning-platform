import React from 'react';
import classNames from 'classnames';

const Button = ({ children, onClick, disabled, exam, auth }) => {
  return (
    <button
      className={classNames('button', {
        'button--exams': exam,
        'button--auth': auth,
      })}
      onClick={onClick}
      disabled={disabled}
      type="submit">
      {children}
    </button>
  );
};

export default Button;
