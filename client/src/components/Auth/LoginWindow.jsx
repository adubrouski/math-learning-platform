import React from 'react';

import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import RegisterWindow from './RegisterWindow';

import crossImg from '../../assets/img/tests/cross.svg';

const LoginWindow = ({ title, setRegister, isRegister, switchText, setAuthVisible }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Некорректный email')
      .max(60, 'Максимальная длина Email - 60 символов')
      .required('Это поле обязательно для заполнения'),
    password: Yup.string()
      .min(6, 'Минимальная длина пароля - 6 символов')
      .max(40, 'Максимальная длина пароля - 40 символов')
      .required('Это поле обязательно для заполнения'),
  });

  const onSubmit = (e, values) => {
    e.preventDefault();
    fetch('api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(values),
    });
    setAuthVisible(false);
  };

  return isRegister ? (
    <RegisterWindow />
  ) : (
    <div className="auth__window">
      <div className="auth__close">
        <img src={crossImg} className="auth__cross" alt="" />
      </div>
      <h4 className="auth__title">{title}</h4>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {(obj) => {
          return (
            <form action="api/auth/login" method="POST" onSubmit={(e) => onSubmit(e, obj.values)}>
              <div className="field-wrapper">
                <Field name="email" type="text" placeholder="Введите email" />
                <ErrorMessage name="email" component="p" className="form-error" />
              </div>
              <div className="field-wrapper">
                <Field name="password" type="password" placeholder="Введите пароль" />
                <ErrorMessage name="password" component="p" className="form-error" />
              </div>
              <button type="submit" disabled={!obj.isValid || !obj.dirty}>
                Войти
              </button>
            </form>
          );
        }}
      </Formik>
      <p className="auth__window-switch" onClick={setRegister}>
        {switchText}
      </p>
    </div>
  );
};

export default LoginWindow;
