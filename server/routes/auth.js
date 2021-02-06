const { Router } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const authMiddleware = require('../middleware/auth.middleware');

const router = Router();

router.post('/login', async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email }).exec();

  if (!candidate) {
    res.status(404).json({ message: 'Пользователь не найден' });
  } else {
    try {
      if (await bcrypt.compare(req.body.password, candidate.password)) {
        const userData = { userId: candidate._id, username: candidate.username };
        const token = jwt.sign(
          {
            userId: candidate._id,
          },
          config.get('jwt-key'),
          { expiresIn: '1h' },
        );
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
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const token = jwt.sign({ userId: user._id }, config.get('jwt-key'), {
      expiresIn: '1h',
    });
    res.status(200).json({
      token,
      userData: {
        userId: user._id,
        username: user.username,
      },
    });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
