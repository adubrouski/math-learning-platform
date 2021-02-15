const { Router } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const checkToken = require('../middleware/checkToken');
const tokenCreator = require('../utils/tokenCreator');
const { check, validationResult } = require('express-validator');
const Topics = require('../models/topics');
const Exams = require('../models/exams');
const router = Router();

router.post('/login', async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email }).exec();
  if (!candidate) {
    res.status(404).json({ message: 'Пользователь не найден' });
  } else {
    try {
      if (await bcrypt.compare(req.body.password, candidate.password)) {
        const userData = { userId: candidate._id, username: candidate.username };
        const token = tokenCreator.createAccessToken({
          userId: candidate._id,
          username: candidate.username,
        });
        const refreshToken = tokenCreator.createRefreshToken({
          userId: candidate._id,
          username: candidate.username,
        });

        res.cookie('hashRefresh', refreshToken, {
          maxAge: 3600 * 1000 * 24 * 30,
          signed: true,
          sameSite: 'none',
          secure: true,
        });
        res.status(200).json({ message: 'Вы успешно вошли в профиль', token, ...userData });
      } else {
        res.status(401).json({ message: 'Неверный пароль' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так...' });
    }
  }
});

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароль - 6 символов').trim().isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Вы ввели некорректные данные при регистрации',
      });
    }
    const candidate = await User.findOne({ email: req.body.email }).exec();

    if (candidate) {
      res.status(409).json({ message: 'Такой пользователь уже существует' });
    } else {
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ message: 'Пароли не совпадают' });
      }
      try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
          username: req.body.name,
          email: req.body.email,
          password: hashPassword,
          examsResults: [],
        });
        try {
          await user.save();
          res.status(201).json({ message: 'Пользователь успешно создан!' });
        } catch (e) {
          res.status(500).json({ message: 'Что-то пошло не так...' });
        }
      } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так...' });
      }
    }
  },
);

router.get('/', checkToken, async (req, res) => {
  /* const topics = new Topics({
    topics: [
      { name: 'Какая-то тема по алгебре', type: 'algebra', markup: '<p>Testtе</p>', grade: 2 },
      { name: 'Алгебра класс', type: 'algebra', markup: '<p>Testtеркtt</p>', grade: 7 },
      { name: 'Геометрия', type: 'geometry', markup: '<p>Testtрtt</p>', grade: 6 },
      { name: 'Чёт странное по алгебре', type: 'algebra', markup: '<p>Testttt</p>', grade: 7 },
      { name: 'Не знаю как назвать тему', type: 'geometry', markup: '<p>Testttt</p>', grade: 2 },
      { name: 'Теорема Пифагора', type: 'algebra', markup: '<p>Tesиtttt</p>', grade: 5 },
      { name: 'Теорема Виета', type: 'algebra', markup: '<p>Testttt</p>', grade: 3 },
      { name: 'Забыл все темы по геометрии', type: 'geometry', markup: '<p>Testttt</p>', grade: 6 },
      { name: 'Линейные уровнения', type: 'algebra', markup: '<p>Testttt</p>', grade: 6 },
      {
        name: 'Я тупенький, не знаю как назвать',
        type: 'algebra',
        markup: '<p>Testttt</p>',
        grade: 7,
      },
      { name: 'Окружность', type: 'geometry', markup: '<p>Testеttt</p>', grade: 3 },
      { name: 'Овал', type: 'geometry', markup: '<p>Testttt</p>', grade: 3 },
      { name: 'Ещё тема по алгебре', type: 'algebra', markup: '<p>Tesкtttt</p>', grade: 2 },
      { name: 'Ромб не знаю чё писать', type: 'geometry', markup: '<p>Teпstttt</p>', grade: 3 },
      { name: '2 + 2 = 22', type: 'algebra', markup: '<p>Testttt</p>', grade: 5 },
      { name: 'Устал', type: 'algebra', markup: '<p>Testиttt</p>', grade: 4 },
      { name: 'Тест тест тест', type: 'geometry', markup: '<p>Testttt</p>', grade: 4 },
      { name: 'Рофлан тест', type: 'algebra', markup: '<p>Testttt</p>', grade: 4 },
      { name: 'Слишком много алгебры', type: 'algebra', markup: '<p>Testttt</p>', grade: 3 },
      { name: 'Последняя тема по геометрии', type: 'geometry', markup: '<p>Testttt</p>', grade: 5 },
      { name: 'Всё ещё алгебра', type: 'algebra', markup: '<p>Testttt</p>', grade: 5 },
      { name: 'Закончил придумывать', type: 'algebra', markup: '<p>Testttt</p>', grade: 7 },
    ],
  });
  await topics.save(); */
  /* const exams = new Exams({
    exams: [
      {
        topic: 'Геометрия',
        questions: [
          {
            question: 'Сколько сторон у куба?',
            answers: ['Семь', 'Пять', 'Шесть', 'Восемь'],
            rightAnswer: 4,
          },
          {
            question: 'Сколько сторон у треугольника?',
            answers: ['Шесть', 'Три', 'Пять', 'Четыре'],
            rightAnswer: 2,
          },
          {
            question: 'Какова сумма всех углов треугольника?',
            answers: ['180 градусов', '360 градусов', '90 градусов', '135 градусов'],
            rightAnswer: 1,
          },
          {
            question: 'Периметр - это...',
            answers: [
              'Произведение всех сторон тругольника',
              'Произведение ширины и высоты фигуры',
              'Полусумма всех сторон фигуры',
              'Сумма длин всех сторон фигуры',
            ],
            rightAnswer: 4,
          },
          {
            question: 'Площадь фигуры - это...',
            answers: [
              'Произведение всех сторон тругольника',
              'Полусумма всех сторон фигуры',
              'Произведение ширины и длины фигуры',
              'Сумма длин всех сторон фигуры',
            ],
            rightAnswer: 3,
          },
          {
            question: 'Полупериметр фигуры - это...',
            answers: [
              'Полусумма всех сторон фигуры',
              'Произведение всех сторон тругольника',
              'Произведение ширины и длины фигуры',
              'Сумма длин всех сторон фигуры',
            ],
            rightAnswer: 1,
          },
          {
            question: 'Дан прямоугольник, длина равна 5, ширина равна 20. Площадь равна...',
            answers: ['40', '100', '50', '200'],
            rightAnswer: 2,
          },
          {
            question: 'Найдите периметр квадрата, у которого сторона равна 10.',
            answers: ['60', '100', '40', '120'],
            rightAnswer: 3,
          },
        ],
      },
      {
        topic: 'Алгебра',
        questions: [
          {
            question: 'Решите уравнение x + 5 = 8',
            answers: ['x = 4', 'x = 1', 'x = 3', 'x = 9'],
            rightAnswer: 3,
          },
          {
            question: 'Решите уравнение 5 * x = 35',
            answers: ['x = 7', 'x = 3', 'x = 0', 'x = 5'],
            rightAnswer: 1,
          },
          {
            question: 'Решите уравнение x / 11 = 8',
            answers: ['x = 3', 'x = 88', 'x = 23', 'x = 8'],
            rightAnswer: 2,
          },
          {
            question: 'Решите уравнение (5 * x) + 5 = 20',
            answers: ['x = 7', 'x = 5', 'x = x', 'x = 3'],
            rightAnswer: 4,
          },
          {
            question: 'Решите уравнение 5 * x + 15 = 40',
            answers: ['x = 2', 'x = 5', 'x = 40', 'x = 3'],
            rightAnswer: 2,
          },
          {
            question: 'Решите уравнение x * x + 5 = 14',
            answers: ['x = 5', 'x = 2', 'x = 3', 'x = 7'],
            rightAnswer: 3,
          },
          {
            question: 'Решите уравнение x * 3 / 7 = 3',
            answers: ['x = 7', 'x = 3', 'x = 21', 'x = 5'],
            rightAnswer: 1,
          },
        ],
      },
    ],
  });
  await exams.save(); */
  if (req.token) {
    res.status(200).json({
      message: 'Success',
      token: req.token,
      userData: { username: req.userData.username, userId: req.userData.userId },
    });
  } else {
    res.status(500).json({ message: 'Что-то пошло не так...' });
  }
});

router.delete('/logout', (req, res) => {
  res.cookie('hashRefresh', '', {
    maxAge: 1000,
    sameSite: 'none',
    secure: true,
  });
  res.json({ message: 'Вы успешно вышли из профиля' });
});

module.exports = router;
