const { Router } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/auth.middleware');
const tokenCreator = require('../utils/tokenCreator');
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

        res.cookie('hashed', refreshToken, {
          maxAge: 3600 * 1000 * 24 * 30,
          httpOnly: true,
          signed: true,
        });
        res.status(200).json({ message: 'Вы успешно вошли в профиль', token, userData });
      } else {
        res.status(401).json({ message: 'Неверный пароль' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так...' });
    }
  }
  res.end('placeholder');
});

router.post('/register', async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email }).exec();

  if (candidate) {
    res.status(409).json({ message: 'Такой пользователь уже существует' });
  } else {
    try {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username: req.body.name,
        email: req.body.email,
        password: hashPassword,
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
});

router.get('/', authMiddleware, async (req, res) => {
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
        question: 'Сколько сторон у куба?',
        answers: ['Одна', 'Две', 'Три', 'Восемь'],
        rightAnswer: 4,
      },
      {
        question: 'Сколько сторон у теугольника?',
        answers: ['Одна', 'Три', 'Две', 'Четыре'],
        rightAnswer: 2,
      },
    ],
  });
  await exams.save(); */
  try {
    res.status(200).json({
      message: 'Success',
      token: req.token,
      userData: { username: req.userData.username, userId: req.userData.userId },
    });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так...' });
  }
});

router.delete('/logout', (req, res) => {
  res.clearCookie('hashed');
  res.json({ message: 'Вы успешно вышли из профиля' });
});

module.exports = router;
