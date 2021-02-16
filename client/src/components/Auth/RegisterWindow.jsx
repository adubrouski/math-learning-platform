import React from 'react';

import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { attemptRegister } from '../../redux/thunks/auth';

import { crossIcon } from '../../assets/img';
import { Button } from '../../components';

const RegisterWindow = ({ title, switchText, toHome, isLoading }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const toLogin = () => {
    history.push('/login');
  };

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Минимальная длина имени - 3 символа')
      .max(20, 'Максимальная длина имени - 20 символов')
      .required('Это поле обязательно для заполнения')
      .matches(
        /[A-ZА-Я][а-яa-z]/,
        'Имя должно начинаться с заглавной буквы и может состоять из латинских или русских букв',
      ),
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

    dispatch(attemptRegister(values, toHome));
  };

  return (
    <div className="auth__window">
      <div className="auth__close" onClick={toHome}>
        <img src={crossIcon} className="auth__cross" alt="" />
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
                <Field name="name" type="text" placeholder="Как вас зовут?" />
                <ErrorMessage name="name" component="p" className="form-error" />
              </div>
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
              <Button auth disabled={!obj.isValid || !obj.dirty || !isLoading}>
                Зарегистрироваться
              </Button>
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
