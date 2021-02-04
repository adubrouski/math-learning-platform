const { Router } = require('express');

const router = Router();

router.post('/login', (req, res) => {
  res.end('Login success');
});

router.post('/register', (req, res) => {
  res.end('Register');
});

module.exports = router;
