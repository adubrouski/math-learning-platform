import React from 'react';

import { useHistory } from 'react-router-dom';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import http from '../../services/httpService';

import crossImg from '../../assets/img/tests/cross.svg';

const LoginWindow = ({ title, switchText }) => {
  const history = useHistory();
  const toRegister = () => {
    history.push('/register');
  };
  const toHome = () => {
    history.push('/home');
  };

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

  const onSubmit = async (e, values) => {
    e.preventDefault();
    try {
      await http.post('/auth/login', values);
    } catch (e) {
      console.log('!!!!');
    }
  };

  return (
    <div className="auth__window">
      <div className="auth__close" onClick={toHome}>
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
      <p className="auth__window-switch" onClick={toRegister}>
        {switchText}
      </p>
    </div>
  );
};

export default LoginWindow;
