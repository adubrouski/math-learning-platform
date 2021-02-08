const { Router } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/auth.middleware');
const tokenCreator = require('../utils/tokenCreator');
const Topics = require('../models/topics');
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
    topics: [{ name: 'test', type: 'algebra', markup: '<p>Testttt</p>' }],
  });
  await topics.save(); */
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
