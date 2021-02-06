const { Router } = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const router = Router();

router.post('/login', async (req, res) => {
  const candidate = await User.findOne({ email: req.body.email }).exec();

  if (!candidate) {
    res.status(404).json({ message: 'Пользователь не найден' });
  } else {
    // Запилить авторизацию
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

module.exports = router;
