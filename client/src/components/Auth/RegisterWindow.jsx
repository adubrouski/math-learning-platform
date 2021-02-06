import React from 'react';

import { useHistory } from 'react-router-dom';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import http from '../../services/httpService';

import crossImg from '../../assets/img/tests/cross.svg';

const RegisterWindow = ({ title, switchText }) => {
  const history = useHistory();

  const toLogin = () => {
    history.push('/login');
  };

  const toHome = () => {
    history.push('/home');
  };

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Некорректный email')
      .max(60, 'Максимальная длина Email - 60 символов')
      .required('Это поле обязательно для заполнения'),
    password: Yup.string()
      .min(6, 'Минимальная длина пароля - 6 символов')
      .max(40, 'Максимальная длина пароля - 40 символов')
      .required('Это поле обязательно для заполнения')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
        'Пароль должен состоять из заглавных и строчных букв латинского алфавита, а также цифр 0-9',
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Это поле обязательно для заполнения'),
  });

  const onSubmit = async (e, values) => {
    e.preventDefault();
    http
      .post('/auth/register', values)
      .then((resp) => console.log(resp))
      .catch((e) => toast.error(e.response.data.message));
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
            <form
              action="api/auth/register"
              method="POST"
              onSubmit={(e) => onSubmit(e, obj.values)}>
              <div className="field-wrapper">
                <Field name="email" type="text" placeholder="Введите email" />
                <ErrorMessage name="email" component="p" className="form-error" />
              </div>
              <div className="field-wrapper">
                <Field name="password" type="password" placeholder="Введите пароль" />
                <ErrorMessage name="password" component="p" className="form-error" />
              </div>
              <div className="field-wrapper">
                <Field name="confirmPassword" type="password" placeholder="Подтвердите пароль" />
                <ErrorMessage name="confirmPassword" component="p" className="form-error" />
              </div>
              <button type="submit" disabled={!obj.isValid || !obj.dirty}>
                Зарегистрироваться
              </button>
            </form>
          );
        }}
      </Formik>
      <p className="auth__window-switch" onClick={toLogin}>
        {switchText}
      </p>
    </div>
  );
};

export default RegisterWindow;
