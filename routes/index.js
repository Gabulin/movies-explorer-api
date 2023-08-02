const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { logout } = require('../controllers/Users');

// Подключение маршрутов
router.use(require('./auth'));
router.use(require('./users'));
router.use(require('./movies'));

// Подключение auth middleware
router.use(auth);

// Роут для выхода из системы
router.post('/signout', logout);

// Обработка несуществующих маршрутов
router.use('*', (req, res, next) => {
  next(new NotFoundError('Ссылка не найдена'));
});

module.exports = router;
