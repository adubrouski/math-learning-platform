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
